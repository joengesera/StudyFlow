import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createAccountScopedIndexedDbStorage } from '../storage/accountScopedIndexedDbStorage';
import { getActiveQueryScope } from '../lib/queryClient';

export type NotificationKind = 'LATE_TASK' | 'EXAM_REMINDER' | 'HIGH_RISK' | 'WEEKLY_SUMMARY';

export interface AppNotification {
  /** Clé stable de déduplication (ex. « late-tasks:2026-08-25 »). */
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  url: string;
  createdAt: number;
  read: boolean;
}

interface NotificationState {
  notifications: AppNotification[];
  addNotifications: (notifications: AppNotification[]) => number;
  markRead: (id: string) => void;
  markAllRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const MAX_NOTIFICATIONS = 100;

// Historique local des notifications, scopé par compte et chiffré en
// IndexedDB — même stockage que le cache requêtes. Le scope est résolu
// dynamiquement pour suivre les changements de compte.
const indexedDbStorage = createAccountScopedIndexedDbStorage(getActiveQueryScope);

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: [],

      // Insertion dédupliquée par id : un détecteur peut rejouer les mêmes
      // clés à chaque passage sans créer de doublons ni réveiller les
      // entrées déjà lues.
      addNotifications: (incoming) => {
        let added = 0;
        set((state) => {
          const knownIds = new Set(state.notifications.map((n) => n.id));
          const fresh = incoming.filter((n) => !knownIds.has(n.id));
          if (fresh.length === 0) return {};
          added = fresh.length;
          return {
            notifications: [...fresh, ...state.notifications]
              .sort((a, b) => b.createdAt - a.createdAt)
              .slice(0, MAX_NOTIFICATIONS),
          };
        });
        return added;
      },

      markRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n,
          ),
        })),

      markAllRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearAll: () => set({ notifications: [] }),
    }),
    {
      name: 'notification-storage',
      storage: createJSONStorage(() => indexedDbStorage),
      partialize: (state) => ({ notifications: state.notifications }),
    },
  ),
);

// Appelé par setSyncAccountScope APRÈS bascule du scope actif : reset puis
// rechargement de l'historique du nouveau compte depuis IndexedDB.
export const switchNotificationStoreScope = async () => {
  useNotificationStore.setState({ notifications: [] });
  await useNotificationStore.persist.rehydrate();
};
