import { useAuthStore } from '../stores/authStore';
import { useSyncStore } from '../stores/syncStore';
import { getDeviceId, extractEntityFromUrl, methodToSyncType } from '../utils/deviceId';

const BASE_URL = import.meta.env.VITE_API_URL;

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

const isNetworkFailure = (error: unknown): boolean =>
  error instanceof Error &&
  (error.message === NETWORK_ERROR_MESSAGE || (error as { code?: string }).code === NETWORK_ERROR_CODE);

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

// Seul un échec réseau (ou l'état hors ligne) déclenche la mise en file ;
// un rejet du serveur (4xx/5xx) reste une erreur classique.
const handleOffline = (
  error: unknown,
  config: ApiRequestConfig & { method: string; url: string },
): Promise<ResponseBody<unknown>> | null => {
  const isOfflineCondition = isNetworkFailure(error) || !navigator.onLine;

  if (!isOfflineCondition) return null;

  // Requête interne de synchronisation (background) : on rejette pour
  // éviter de l'ajouter à nouveau dans la file.
  if (config._isSync) return Promise.reject(asNetworkError(config));

  if (isSyncableMutation(config.method, config.url)) {
    const payload = config.data ? (config.data as Record<string, unknown>) : undefined;
    // Identité cohérente pour toute la vie de la mutation :
    // id fourni par le hook (créations optimistes) > id extrait de l'URL
    // (update/delete) > uuid fraîchement généré.
    const identity =
      (typeof payload?.id === 'string' ? payload.id : undefined)
      ?? extractRemoteIdFromUrl(config.url)
      ?? crypto.randomUUID();

    const syncPayload = {
      type: methodToSyncType(config.method),
      entity: extractEntityFromUrl(config.url),
      // localId est aussi transmis DANS data : le backend le stocke dans
      // la colonne dédiée (Task/Event/Grade/Work) pour le remap
      // offline→online multi-appareils.
      data: { ...payload, id: identity, localId: identity },
      deviceId: getDeviceId(),
      localId: identity,
    };

    // On push la mutation en file d'attente (format backend)
    useSyncStore.getState().enqueueAction(syncPayload);
    requestBackgroundSync();

    // Fausse réponse de succès pour éviter que l'UI plante et permettre l'Optimistic UI
    return Promise.resolve({ data: { success: true, offline: true, _temporaryId: identity }, status: 200 });
  }

  return Promise.reject(asNetworkError(config));
};

const request = async <T = unknown>(
  method: string,
  url: string,
  config: ApiRequestConfig = {},
): Promise<ResponseBody<T>> => {
  const tokens = useAuthStore.getState().tokens;
  const fullUrl = buildUrl(url, config.params);

  let response: Response;
  try {
    response = await doFetch(fullUrl, method, config, tokens?.accessToken);
  } catch (error) {
    const offlineResult = handleOffline(error, { ...config, method, url });
    if (offlineResult) return offlineResult as Promise<ResponseBody<T>>;
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
    // → Retourne une erreur côté serveur (le false 401 non-récupéré inclus).
    throw new ApiClientError(`Request failed with status code ${response.status}`, {
      config: { ...config, method, url },
      response: {
        status: response.status,
        data: normalizeErrorPayload(body) as ApiErrorData,
      },
    });
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