import { apiClient } from "./client";
import type {User, Tokens} from '../stores/authStore'

interface RegisterPayload{
    email: string;
    name: string;
    password: string;
    role: 'STUDENT' | 'PROFESSOR';
}

interface LoginPayload{
    email: string;
    password: string;
}

interface ResetPasswordPayload {
    token: string;
    newPassword: string;
}

export interface AuthResponse {
    user: User;
    tokens : Tokens;
}

export const authAPI = {
    register: async (payload: RegisterPayload) => {
        const {data} = await apiClient.post('/auth/register', payload);
        return data.data;
    },
    login: async (payload: LoginPayload) => {
        const {data} = await apiClient.post('/auth/login', payload);
        return data.data;
    },
    resetPassword: async (payload: ResetPasswordPayload) => {
        const {data} = await apiClient.post('/auth/reset-password', payload);
        return data.data;
    },
    logout: async (refreshToken: string) => {
        const {data} = await apiClient.post('/auth/logout', { refreshToken });
        return data.data;
    },
    forgotPassword: async (email: string) => {
        const {data} = await apiClient.post('/auth/forgot-password', { email });
        return data.data;
    }

}