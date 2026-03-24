import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ─── Types ────────────────────────────────────────────────

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'STUDENT' | 'PROFESSOR';
    createdAt: string;
    updatedAt: string;
}

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

interface AuthState {
    user: User | null;
    tokens: Tokens | null;
    isAuthenticated: boolean;
    login: (user: User, tokens: Tokens) => void;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
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

            logout: () => set({
                user: null,
                tokens: null,
                isAuthenticated: false,
            }),

            updateUser: (partial) => set((state) => ({
                user: state.user ? { ...state.user, ...partial } : null,
            })),
        }),
        {
            name: 'auth-storage',
        }
    )
);