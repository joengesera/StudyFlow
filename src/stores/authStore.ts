import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useSyncStore } from './syncStore';

// ─── Types ────────────────────────────────────────────────

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'STUDENT' | 'PROFESSOR';
    language?: string;
    timezone?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Tokens {
    refreshToken: string;
    accessToken:string
}

interface AuthState {
    user: User | null;
    tokens: Tokens | null;
    isAuthenticated: boolean;
    login: (user: User, tokens: Tokens) => void;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
    setTokens: (tokens: Tokens) => void;
}

// ─── Store ────────────────────────────────────────────────

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            tokens: null,
            isAuthenticated: false,

            login: (user, tokens) => set({
                user,
                tokens,
                isAuthenticated: true,
            }),

            logout: () => {
                // On s'assure que le cache local offline est vidé
                useSyncStore.getState().clearCache();
                useSyncStore.getState().clearQueue();
                
                set({
                    user: null,
                    tokens: null,
                    isAuthenticated: false,
                });
            },

            updateUser: (partial) => set((state) => ({
                user: state.user ? { ...state.user, ...partial } : null,
            })),

            setTokens: (tokens) => set({ tokens }),
        }),
        {
            name: 'auth-storage',
        }
    )
);