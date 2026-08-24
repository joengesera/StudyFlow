import { apiClient, unwrapApiData } from './client';
import type { User } from '../stores/authStore';

interface RegisterPayload {
  email: string;
  name: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

// Le refresh token est géré par cookie httpOnly : seul l'access token
// transite dans les réponses.
export interface AuthResponse {
  user: User;
  accessToken: string;
}

export const authAPI = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/auth/register', payload);
    return unwrapApiData<AuthResponse>(data);
  },
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/auth/login', payload);
    return unwrapApiData<AuthResponse>(data);
  },
  resetPassword: async (payload: ResetPasswordPayload): Promise<{ message: string }> => {
    const { data } = await apiClient.post('/auth/reset-password', payload);
    return unwrapApiData<{ message: string }>(data);
  },
  logout: async (): Promise<{ message: string }> => {
    const { data } = await apiClient.post('/auth/logout');
    return unwrapApiData<{ message: string }>(data);
  },
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const { data } = await apiClient.post('/auth/forgot-password', { email });
    return unwrapApiData<{ message: string }>(data);
  }
};
