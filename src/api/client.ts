import axios from 'axios';
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
  const p = payload as Record<string, unknown> | null;
  if (p?.error && typeof p.error === 'object' && p.error !== null && 'message' in p.error) return payload;

  const fallbackMessage =
    payload?.message ||
    payload?.error ||
    'Une erreur est survenue.';

  return {
    success: false,
    error: {
      message: String(fallbackMessage),
      code: payload?.error?.code
    }
  };
};

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
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

apiClient.interceptors.request.use((config) => {
  const tokens = useAuthStore.getState().tokens;
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // ─── OFFLINE INTERCEPTOR ───
    if ((!error.response && (error.message === 'Network Error' || error.code === 'ERR_NETWORK')) || !navigator.onLine) {
      const config = error.config as Record<string, unknown> | undefined;

      // Si c'est une requête de synchronisation (background), on rejette l'erreur directement
      // pour éviter de l'ajouter à nouveau dans la file.
      if (config?._isSync) {
        return Promise.reject(error);
      }

      if (config && config.method && ['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
        
        const payload = config.data ? JSON.parse(config.data as string) : undefined;
        const temporaryId = crypto.randomUUID();
        const syncPayload = {
          type: methodToSyncType(config.method),
          entity: extractEntityFromUrl(config.url),
          data: { ...payload, id: payload?.id ?? temporaryId, localId: temporaryId },
          deviceId: getDeviceId()
        };

        // On push la mutation en file d'attente (format backend)
        useSyncStore.getState().enqueueAction(syncPayload);

        // Fausse réponse de succès pour éviter que l'UI plante et permettre l'Optimistic UI
        return Promise.resolve({ data: { success: true, offline: true, _temporaryId: temporaryId } });
      }
    }

    // ─── RETRY 401 INTERCEPTOR ───
    const originalRequest = error.config || {};

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const currentTokens = useAuthStore.getState().tokens;
        if (!currentTokens?.refreshToken) throw new Error('Pas de refresh token');

        const { data } = await refreshClient.post('/auth/refresh-token', { refreshToken: currentTokens.refreshToken });
        const newTokens = unwrapApiData<{ accessToken: string; refreshToken: string }>(data);

        useAuthStore.getState().setTokens(newTokens);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
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
