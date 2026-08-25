import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { useSyncStore } from '../stores/syncStore';
import { getDeviceId, extractEntityFromUrl, methodToSyncType } from '../utils/deviceId';

declare module 'axios' {
  export interface AxiosRequestConfig {
    /** Marque une requête interne de synchronisation (à ne pas re-enfiler). */
    _isSync?: boolean;
  }
}

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

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true, // nécessaire pour recevoir le cookie de refresh token
  headers: {
    'Content-Type': 'application/json'
  }
});

const refreshClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// ─── SINGLE-FLIGHT REFRESH ───
// Une seule requête de refresh à la fois : si plusieurs requêtes reçoivent
// un 401 en parallèle, elles attendent toutes la même promesse au lieu de
// déclencher des rotations concurrentes (qui feraient échouer le refresh).
let refreshPromise: Promise<string> | null = null;

const performRefresh = async (): Promise<string> => {
  const { data } = await refreshClient.post('/auth/refresh-token');
  const { accessToken } = unwrapApiData<{ accessToken: string }>(data);
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

apiClient.interceptors.request.use((config) => {
  const tokens = useAuthStore.getState().tokens;
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

// Extrait l'id distant d'une URL du type /tasks/{id} — indispensable pour
// que les UPDATE/DELETE mis en file ciblent la bonne entité côté backend.
const extractRemoteIdFromUrl = (url: string | undefined): string | undefined => {
  if (!url) return undefined;
  const match = url.match(/^\/?(?:tasks|events|grades|works|courses)\/([^/?#]+)/);
  return match?.[1];
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

interface InterceptedRequestConfig {
  method?: string;
  url?: string;
  data?: string;
  headers?: Record<string, string>;
  _retry?: boolean;
  _isSync?: boolean;
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // ─── OFFLINE INTERCEPTOR ───
    if ((!error.response && (error.message === 'Network Error' || error.code === 'ERR_NETWORK')) || !navigator.onLine) {
      const config = (error.config || {}) as InterceptedRequestConfig;

      // Si c'est une requête de synchronisation (background), on rejette l'erreur directement
      // pour éviter de l'ajouter à nouveau dans la file.
      if (config._isSync) {
        return Promise.reject(error);
      }

      if (config.method && ['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {

        const payload = config.data ? JSON.parse(config.data as string) : undefined;
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
          data: { ...payload, id: identity },
          deviceId: getDeviceId(),
          localId: identity,
        };

        // On push la mutation en file d'attente (format backend)
        useSyncStore.getState().enqueueAction(syncPayload);
        requestBackgroundSync();

        // Fausse réponse de succès pour éviter que l'UI plante et permettre l'Optimistic UI
        return Promise.resolve({ data: { success: true, offline: true, _temporaryId: identity } });
      }
    }

    // ─── RETRY 401 INTERCEPTOR ───
    const originalRequest = error.config || {};

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Le refresh token est envoyé automatiquement via le cookie httpOnly.
        const accessToken = await refreshAccessToken();

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch {
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    if (error.response) {
      error.response.data = normalizeErrorPayload(error.response.data);
    }

    return Promise.reject(error);
  }
);
