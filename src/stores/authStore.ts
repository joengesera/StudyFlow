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

// Le refresh token vit dans un cookie httpOnly posé par le backend :
// il n'est jamais manipulé en JavaScript.
export interface Tokens {
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
            version: 2,
            // v2 : le refresh token ne vit plus côté JS (cookie httpOnly),
            // on purge les données persistées des versions précédentes.
            migrate: (persisted) => {
                const state = (persisted ?? {}) as Partial<AuthState> & {
                    tokens?: { accessToken?: string; refreshToken?: string };
                };
                return {
                    ...state,
                    tokens: state.tokens?.accessToken
                        ? { accessToken: state.tokens.accessToken }
                        : null,
                } as AuthState;
            },
        },
    ),
);
