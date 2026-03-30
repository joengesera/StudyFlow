import { apiClient, unwrapApiData } from './client';
import type {User, Tokens} from '../stores/authStore';

interface RegisterPayload {
  email: string;
  name: string;
  password: string;
  role: 'STUDENT' | 'PROFESSOR';
}

interface LoginPayload {
  email: string;
  password: string;
}

interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface AuthResponse {
  user: User;
  tokens: Tokens;
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
  logout: async (refreshToken: string): Promise<{ message: string }> => {
    const { data } = await apiClient.post('/auth/logout', { refreshToken });
    return unwrapApiData<{ message: string }>(data);
  },
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const { data } = await apiClient.post('/auth/forgot-password', { email });
    return unwrapApiData<{ message: string }>(data);
  }
};
