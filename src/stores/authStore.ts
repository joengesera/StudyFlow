import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setSyncAccountScope } from './syncStore';

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
    accessToken: string;
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

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            tokens: null,
            isAuthenticated: false,

            login: (user, tokens) => {
                void setSyncAccountScope(user.id);
                set({
                    user,
                    tokens,
                    isAuthenticated: true,
                });
            },

            logout: () => {
                void setSyncAccountScope(null);
                set({
                    user: null,
                    tokens: null,
                    isAuthenticated: false,
                });
            },

            updateUser: (partial) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...partial } : null,
                })),

            setTokens: (tokens) => set({ tokens }),
        }),
        {
            name: 'auth-storage',
        },
    ),
);
