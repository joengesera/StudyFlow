import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { useSyncStore } from '../stores/syncStore';

const BASE_URL = import.meta.env.VITE_API_URL;

export const unwrapApiData = <T>(payload: any): T => {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return payload.data as T;
  }
  return payload as T;
};

const normalizeErrorPayload = (payload: any) => {
  if (payload?.error?.message) return payload;

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
    if (!error.response && (error.message === 'Network Error' || error.code === 'ERR_NETWORK') || !navigator.onLine) {
      const config = error.config;
      if (config && config.method && ['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
        
        // On push la mutation en file d'attente
        useSyncStore.getState().enqueueAction({
          method: config.method.toUpperCase(),
          url: config.url || '',
          payload: config.data ? JSON.parse(config.data as string) : undefined
        });

        // Fausse réponse de succès pour éviter que l'UI plante et permettre l'Optmistic UI
        return Promise.resolve({ data: { success: true, offline: true, _temporaryId: crypto.randomUUID() } });
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
