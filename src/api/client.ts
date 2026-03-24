import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// intercepteur de requetes
apiClient.interceptors.request.use(
    (config) => {
        const raw = localStorage.getItem('auth-storage');
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                const token = parsed?.state?.accessToken;
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
            } catch  {
                // localStorage corrompu, on le nettoie
               // localStorage.removeItem('auth-storage');
            }
        }
        return config;
    }
);

// intercepteur de réponses pour gérer les erreurs d'authentification
apiClient.interceptors.response.use(
    // Réponse OK — on lit toujours body.data (format uniforme du backend)
    (response) => response,

    // Réponse erreur
    async (error) => {
        const originalRequest = error.config;

        // 401 + pas déjà tenté = on essaie de refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const raw = localStorage.getItem('auth-storage');
                if (!raw) throw new Error('Pas de session');

                const parsed = JSON.parse(raw);
                const refreshToken = parsed?.state?.tokens?.refreshToken;
                if (!refreshToken) throw new Error('Pas de refresh token');

                // Appel refresh avec l'instance secondaire (sans intercepteur)
                const { data } = await refreshClient.post('/auth/refresh-token', {
                    refreshToken,
                });

                // Mise à jour des tokens dans le localStorage
                parsed.state.tokens = data.data;
                localStorage.setItem('auth-storage', JSON.stringify(parsed));

                // On rejoue la requête originale avec le nouveau token
                originalRequest.headers.Authorization =
                    `Bearer ${data.data.accessToken}`;
                return apiClient(originalRequest);

            } catch {
                // Refresh échoué — on vide le localStorage et on redirige
                localStorage.removeItem('auth-storage');
                window.location.href = '/login';
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);