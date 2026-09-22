import { useAuthStore } from '../stores/authStore';
import { useSyncStore, persistSyncNow } from '../stores/syncStore';
import { getDeviceId, extractEntityFromUrl, methodToSyncType } from '../utils/deviceId';

// Normalisation : le backend monte son API sous /api. On tolère un
// VITE_API_URL sans le suffixe (ex. "https://api.example.com") en
// l'ajoutant automatiquement — évite un build de prod cassé (404 sur
// toutes les routes) si la variable Render est incomplète.
const normalizeApiBase = (raw: string | undefined): string => {
  if (!raw) return '';
  const trimmed = raw.replace(/\/+$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

const BASE_URL = normalizeApiBase(import.meta.env.VITE_API_URL);

export const unwrapApiData = <T>(payload: unknown): T => {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload as Record<string, unknown>).data as T;
  }
  return payload as T;
};

const normalizeErrorPayload = (payload: unknown) => {
  const p = payload as {
    error?: { message?: unknown; code?: unknown };
    message?: unknown;
  } | null;

  if (p?.error && typeof p.error === 'object' && p.error !== null && 'message' in p.error) return payload;

  const fallbackMessage =
    p?.message ||
    p?.error ||
    'Une erreur est survenue.';

  return {
    success: false,
    error: {
      message: String(fallbackMessage),
      code: p?.error?.code
    }
  };
};

export interface ApiRequestConfig {
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  data?: unknown;
  signal?: AbortSignal;
  timeout?: number;
  /** Marque une requête interne de synchronisation (à ne pas re-enfiler). */
  _isSync?: boolean;
  _retry?: boolean;
}

export interface ApiErrorData {
  success?: boolean;
  message?: string;
  error?: { message?: string; code?: string | null };
}

export class ApiClientError extends Error {
  code?: string;
  config?: Pick<ApiRequestConfig, 'headers' | '_isSync' | '_retry'> & { method?: string; url?: string; data?: unknown };
  response?: {
    status: number;
    data: ApiErrorData;
  };

  constructor(message: string, options?: { code?: string; config?: ApiClientError['config']; response?: ApiClientError['response'] }) {
    super(message);
    this.name = 'ApiClientError';
    this.code = options?.code;
    this.config = options?.config;
    this.response = options?.response;
  }
}

export const isApiError = (err: unknown): err is ApiClientError => err instanceof ApiClientError;

interface ResponseBody<T> {
  data: T;
  status: number;
}

// ─── BUILD URL ───
const buildUrl = (
  url: string,
  params?: Record<string, string | number | boolean | undefined>,
): string => {
  if (!params) return url;
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `${url}?${qs}` : url;
};

const NETWORK_ERROR_MESSAGE = 'Network Error';
const NETWORK_ERROR_CODE = 'ERR_NETWORK';

const asNetworkError = (config: ApiRequestConfig & { method: string; url: string }): ApiClientError =>
  new ApiClientError(NETWORK_ERROR_MESSAGE, {
    code: NETWORK_ERROR_CODE,
    config,
  });

// ─── FETCH CORE ───
const doFetch = (
  url: string,
  method: string,
  config: ApiRequestConfig & { data?: unknown },
  accessToken?: string,
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), config.timeout ?? 10000);
  const onCallerAbort = () => controller.abort();
  config.signal?.addEventListener('abort', onCallerAbort);

  const headers: Record<string, string> = { ...config.headers };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  const hasBody = config.data !== undefined && method !== 'GET';
  if (hasBody) headers['Content-Type'] = 'application/json';

  return fetch(`${BASE_URL}${url}`, {
    method,
    headers,
    credentials: 'include', // nécessaire pour recevoir le cookie de refresh token
    body: hasBody ? JSON.stringify(config.data) : undefined,
    signal: controller.signal,
  }).finally(() => {
    window.clearTimeout(timeoutId);
    config.signal?.removeEventListener('abort', onCallerAbort);
  });
};

const parseBody = async (response: Response): Promise<unknown> => {
  if (response.status === 204) return {};
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
};

// ─── SINGLE-FLIGHT REFRESH ───
// Une seule requête de refresh à la fois : si plusieurs requêtes reçoivent
// un 401 en parallèle, elles attendent toutes la même promesse au lieu de
// déclencher des rotations concurrentes (qui feraient échouer le refresh).
let refreshPromise: Promise<string> | null = null;

const performRefresh = async (): Promise<string> => {
  const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!response.ok) throw new ApiClientError('Refresh token invalide ou expiré');
  const body = await parseBody(response);
  const { accessToken } = unwrapApiData<{ accessToken: string }>(body);
  useAuthStore.getState().setTokens({ accessToken });
  return accessToken;
};

const refreshAccessToken = (): Promise<string> => {
  if (!refreshPromise) {
    refreshPromise = performRefresh().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

// Extrait l'id distant d'une URL du type /tasks/{id} — indispensable pour
// que les UPDATE/DELETE mis en file ciblent la bonne entité côté backend.
const extractRemoteIdFromUrl = (url: string | undefined): string | undefined => {
  if (!url) return undefined;
  const match = url.match(/^\/?(?:tasks|events|grades|works|courses)\/([^/?#]+)/);
  return match?.[1];
};

// La file de sync ne sait rejouer que les mutations CRUD canoniques des
// 5 entités synchronisables : POST sur la collection, PATCH/PUT/DELETE sur
// une instance. Toute sous-route d'action (start/pause/complete/reorder/
// board/search/work-types/average/recalculate-points…) n'est PAS une
// mutation d'entité réplicable : hors ligne elle échoue simplement, sans
// polluer la file avec de faux CREATE/UPDATE que le backend rejetterait.
const SYNC_ACTION_SEGMENT_RE =
  /^(?:start|pause|complete|reorder|board|search|init|average|statistics|work-types|recalculate-points|sync-history)$/i;

const isSyncableMutation = (method: string | undefined, url: string | undefined): boolean => {
  if (!url) return false;
  const m = method?.toLowerCase();
  if (!m || !['post', 'put', 'patch', 'delete'].includes(m)) return false;

  const match = url.match(/^\/?(tasks|events|grades|works|courses)(?:\/([^/?#]+))?/i);
  if (!match) return false;

  const segment = match[2];
  if (segment && SYNC_ACTION_SEGMENT_RE.test(segment)) return false;

  // POST sans segment = création de collection ; segment = mutation d'instance.
  if (!segment) return m === 'post';
  return m === 'patch' || m === 'put' || m === 'delete';
};

// Demande au service worker de vider la file même si l'onglet est fermé.
const requestBackgroundSync = () => {
  try {
    navigator.serviceWorker?.ready
      .then((reg) =>
        (reg as ServiceWorkerRegistration & {
          sync?: { register: (tag: string) => Promise<void> };
        }).sync?.register('studyflow-sync'),
      )
      .catch(() => undefined);
  } catch {
    // Background Sync non supporté → la vidange se fera via useNetworkSync.
  }
};

// ─── WRITE-AHEAD ───
// Philosophie offline-first : une mutation syncable est TOUJOURS enregistrée
// (file de synchronisation persistée en IndexedDB) AVANT tout envoi réseau.
// Succès serveur → on retire l'action de la file. Échec réseau → l'action
// reste en file (drainée plus tard) et on renvoie un faux succès pour que
// l'optimistic UI déjà appliquée ne soit pas cassée. Rejet 4xx/5xx → on
// jette l'enregistrement provisoire et on propage l'erreur au hook.

// Fausse réponse de succès pour les mutations enregistrées hors-ligne.
const offlineSuccess = <T,>(identity?: string): Promise<ResponseBody<T>> =>
  Promise.resolve({ data: { success: true, offline: true, _temporaryId: identity } as T, status: 200 });

const request = async <T = unknown>(
  method: string,
  url: string,
  config: ApiRequestConfig = {},
): Promise<ResponseBody<T>> => {
  const tokens = useAuthStore.getState().tokens;
  const fullUrl = buildUrl(url, config.params);
  const isSyncable = !config._isSync && isSyncableMutation(method, url);

  // ─── ENREGISTREMENT PRÉALABLE (write-ahead) ───
  let record: { id: string | null; localOnly: boolean } | undefined;
  let syncPayloadData: Record<string, unknown> | undefined;
  let identity: string | undefined;
  const recordType = methodToSyncType(method);

  if (isSyncable) {
    const payload = (config.data ?? {}) as Record<string, unknown>;
    identity =
      (typeof payload.id === 'string' ? payload.id : undefined)
      ?? extractRemoteIdFromUrl(url)
      ?? crypto.randomUUID();

    syncPayloadData = { ...payload, id: identity, localId: identity };
    record = useSyncStore.getState().enqueueAction({
      type: methodToSyncType(method),
      entity: extractEntityFromUrl(url),
      // localId est aussi transmis DANS data : le backend le stocke dans la
      // colonne dédiée (Task/Event/Grade/Work) pour le remap
      // offline→online multi-appareils.
      data: syncPayloadData,
      deviceId: getDeviceId(),
      localId: identity,
    });

    // Entité jamais créée côté serveur (CREATE en attente) : l'appel direct
    // ne peut pas aboutir — le drain de sync créera l'entité fusionnée.
    if (record.localOnly) {
      requestBackgroundSync();
      return offlineSuccess<T>(identity);
    }

    // Durabilité : file écrite en IndexedDB AVANT d'interroger le serveur.
    await persistSyncNow().catch(() => undefined);

    // Hors-ligne connu → pas la peine d'attendre le timeout réseau.
    if (!navigator.onLine) {
      requestBackgroundSync();
      return offlineSuccess<T>(identity);
    }
  }

  // ─── ENVOI RÉSEAU ───
  let response: Response;
  try {
    response = await doFetch(fullUrl, method, config, tokens?.accessToken);
  } catch {
    // Échec réseau : l'action est déjà en file (durable) → faux succès.
    if (record) {
      requestBackgroundSync();
      return offlineSuccess<T>(identity);
    }
    throw asNetworkError({ ...config, method, url });
  }

  // ─── RETRY 401 ───
  if (response.status === 401 && !config._retry) {
    try {
      // Le refresh token est envoyé automatiquement via le cookie httpOnly.
      const accessToken = await refreshAccessToken();
      response = await doFetch(fullUrl, method, { ...config, _retry: true }, accessToken);
    } catch {
      useAuthStore.getState().logout();
      window.location.href = '/login';
      throw asNetworkError({ ...config, method, url });
    }
  }

  const body = await parseBody(response);

  if (!response.ok) {
    // Rejet serveur : on retire l'enregistrement provisoire (l'UI affichera
    // l'erreur via onError du hook).
    if (record?.id) useSyncStore.getState().removeAction(record.id);
    throw new ApiClientError(`Request failed with status code ${response.status}`, {
      config: { ...config, method, url },
      response: {
        status: response.status,
        data: normalizeErrorPayload(body) as ApiErrorData,
      },
    });
  }

  // ─── SUCCÈS ───
  // On retire l'action de la file UNIQUEMENT si rien n'a été fusionné dedans
  // pendant l'attente réseau (sinon le drain appliquera l'état fusionné).
  if (record?.id) {
    const sentData = JSON.stringify(syncPayloadData);
    const current = useSyncStore.getState().queue.find((a) => a.id === record?.id);

    if (!current) {
      // Action déjà drainée (SW/autre onglet) : rien à faire.
    } else if (JSON.stringify(current.data) === sentData) {
      // Aucune fusion : la mutation est partie via l'appel direct → file clean.
      useSyncStore.getState().removeAction(record.id);
    } else if (recordType === 'CREATE' && current.type === 'CREATE') {
      // Le CREATE a réussi en direct mais un update a été fusionné pendant
      // l'attente : on transforme l'action en UPDATE ciblant l'id serveur,
      // pour éviter qu'un drain ultérieur ne recrée une entité en double.
      const created = unwrapApiData<{ id?: unknown }>(body);
      const serverId = typeof created?.id === 'string' ? created.id : undefined;
      if (serverId) {
        const delta: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(current.data)) {
          if (syncPayloadData?.[key] !== value) delta[key] = value;
        }
        useSyncStore.getState().removeAction(current.id);
        useSyncStore.getState().enqueueAction({
          type: 'UPDATE',
          entity: current.entity,
          data: { ...delta, id: serverId, localId: serverId },
          deviceId: getDeviceId(),
          localId: serverId,
        });
        await persistSyncNow().catch(() => undefined);
      }
    }
    // Pour un UPDATE fusionné dans une action en attente : on laisse la file
    // intacte — le drain appliquera l'état fusionné (idempotent, pas de doublon).
  }

  return { data: body as T, status: response.status };
};

export const apiClient = {
  get: <T = unknown>(url: string, config?: ApiRequestConfig): Promise<ResponseBody<T>> =>
    request<T>('GET', url, config),
  post: <T = unknown>(url: string, data?: unknown, config?: ApiRequestConfig): Promise<ResponseBody<T>> =>
    request<T>('POST', url, { ...config, data }),
  put: <T = unknown>(url: string, data?: unknown, config?: ApiRequestConfig): Promise<ResponseBody<T>> =>
    request<T>('PUT', url, { ...config, data }),
  patch: <T = unknown>(url: string, data?: unknown, config?: ApiRequestConfig): Promise<ResponseBody<T>> =>
    request<T>('PATCH', url, { ...config, data }),
  delete: <T = unknown>(url: string, config?: ApiRequestConfig): Promise<ResponseBody<T>> =>
    request<T>('DELETE', url, config),
};