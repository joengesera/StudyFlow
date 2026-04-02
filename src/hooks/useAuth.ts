import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth.api';
import { useAuthStore } from '../stores/authStore.ts';
import { useSyncStore } from '../stores/syncStore.ts';

export const useAuth = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { login, logout, user, isAuthenticated } = useAuthStore();

    // ─── Login ────────────────────────────────────────────────
    // ... (skipped for brevity but assuming it stays same)

    // ─── Logout ───────────────────────────────────────────────
    const logoutMutation = useMutation({
        mutationFn: () => {
            const tokens = useAuthStore.getState().tokens;
            return authAPI.logout(tokens?.refreshToken ?? '');
        },
        onSettled: () => {
            // 1. Vider le store d'authentification
            logout();

            // 2. Vider le store de synchronisation (cache local offline)
            const syncStore = useSyncStore.getState();
            syncStore.clearCache();
            syncStore.clearQueue();

            // 3. Vider le cache de React Query
            queryClient.clear();

            // 4. Redirection vers login
            navigate('/login');
        }
    });
    const loginMutation = useMutation({
        mutationFn: authAPI.login,
        onSuccess: (data) => {
            login(data.user, data.tokens);
            // Petit délai pour laisser Zustand persister avant la navigation
            setTimeout(() => navigate('/dashboard'), 50);
        },
        onError : ()=>{
            logout ()
            navigate ('/login')
        }
    });

    const registerMutation = useMutation({
        mutationFn: authAPI.register,
        onSuccess: (data) => {
            login(data.user, data.tokens);
            setTimeout(() => navigate('/dashboard'), 50);
        },
    });

    // ─── Forgot password ──────────────────────────────────────
    const forgotPasswordMutation = useMutation({
        mutationFn: authAPI.forgotPassword,
    });

    // ─── Reset password ───────────────────────────────────────
    const resetPasswordMutation = useMutation({
        mutationFn: authAPI.resetPassword,
        onSuccess: () => {
            navigate('/login');
        },
    });

    return {
        // État
        user,
        isAuthenticated,

        // Actions
        login: loginMutation.mutate,
        register: registerMutation.mutate,
        logout: logoutMutation.mutate,
        forgotPassword: forgotPasswordMutation.mutate,
        resetPassword: resetPasswordMutation.mutate,

        // États de chargement
        isLoginLoading: loginMutation.isPending,
        isRegisterLoading: registerMutation.isPending,

        // Erreurs
        loginError: loginMutation.error,
        registerError: registerMutation.error,
    };
};