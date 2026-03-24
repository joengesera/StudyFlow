import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth.api';
import { useAuthStore } from '../stores/authStore.ts';

export const useAuth = () => {
    const navigate = useNavigate();
    const { login, logout, user, isAuthenticated } = useAuthStore();

    // ─── Login ────────────────────────────────────────────────
    // const loginMutation = useMutation({
    //     mutationFn: authAPI.login,
    //     onSuccess: (data) => {
    //         // On range user + tokens dans le store
    //         login(data.user, data.tokens);
    //         // On redirige vers le dashboard
    //         navigate('/dashboard');
    //     },
    // });

    // ─── Register ─────────────────────────────────────────────
    // const registerMutation = useMutation({
    //     mutationFn: authAPI.register,
    //     onSuccess: (data) => {
    //         login(data.user, data.tokens);
    //         navigate('/dashboard');
    //     },
    // });

    // ─── Logout ───────────────────────────────────────────────
    const logoutMutation = useMutation({
        mutationFn: () => {
            const tokens = useAuthStore.getState().tokens;
            return authAPI.logout(tokens?.refreshToken ?? '');
        },
        onSettled: () => {
            logout ();
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