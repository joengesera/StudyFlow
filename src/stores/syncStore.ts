import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { persistQueryClientSave } from '@tanstack/react-query-persist-client';
import { createAccountScopedIndexedDbStorage, writeActiveScopeHint } from '../storage/accountScopedIndexedDbStorage';
import { getInitialAccountScope, GUEST_SCOPE, hashScope } from '../utils/accountScope';
import { queryClient, queryPersister, setActiveQueryScope } from '../lib/queryClient';
import { switchNotificationStoreScope } from './notificationStore';

export interface SyncAction {
  id: string;
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  entity: 'Task' | 'Event' | 'Grade' | 'Work' | 'Course' | 'Unknown';
  data: Record<string, unknown>;
  deviceId: string;
  timestamp: number;
  localId?: string;
  attempts?: number;
}

export interface FailedSyncAction {
  action: SyncAction;
  message: string;
  at: number;
}

interface SyncState {
  queue: SyncAction[];
  failedActions: FailedSyncAction[];
  isSyncing: boolean;
  isReady: boolean;

  enqueueAction: (action: Omit<SyncAction, 'id' | 'timestamp' | 'attempts'>) => void;
  removeAction: (id: string) => void;
  bumpAttempts: (id: string) => number;
  markFailed: (id: string, message: string) => void;
  clearFailed: (actionId: string) => void;
  retryFailed: (actionId: string) => void;
  retryAllFailed: () => void;
  discardFailed: (actionId: string) => void;
  discardAllFailed: () => void;
  clearQueue: () => void;
  setSyncing: (isSyncing: boolean) => void;
  setReady: (isReady: boolean) => void;
}

const emptyQueueState = {
  queue: [] as SyncAction[],
  failedActions: [] as FailedSyncAction[],
};

// Cible métier d'une action : l'id de l'entité visée (payload.id ou localId).
const targetIdOf = (a: SyncAction): string | undefined => {
  const d = a.data as { id?: unknown } | undefined | null;
  const id = typeof d?.id === 'string' ? d.id : undefined;
  return id ?? a.localId;
};

let activeSyncScope = getInitialAccountScope();
void writeActiveScopeHint(activeSyncScope);

const indexedDbStorage = createAccountScopedIndexedDbStorage(() => activeSyncScope);

export const useSyncStore = create<SyncState>()(
  persist(
    (set, get) => ({
      ...emptyQueueState,
      isSyncing: false,
      isReady: false,

      // Coalescing : on évite d'empiler des mutations redondantes pour une
      // même entité — UPDATE écrase le précédent / fusionne dans le CREATE,
      // DELETE suivant un CREATE non synchronisé annule tout (l'entité
      // n'existe pas encore côté serveur).
      enqueueAction: (action) =>
        set((state) => {
          const incoming: SyncAction = {
            ...action,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            attempts: 0,
          };
          const target = targetIdOf(incoming);
          const sameTarget = (a: SyncAction) =>
            a.entity === incoming.entity && a.type !== 'DELETE' && target !== undefined && targetIdOf(a) === target;

          if (incoming.type === 'DELETE') {
            const hadCreate = state.queue.some((a) => sameTarget(a) && a.type === 'CREATE');
            const remaining = state.queue.filter((a) => !sameTarget(a));
            // Entité jamais créée côté serveur → inutile de pousser le DELETE.
            if (hadCreate) return { queue: remaining };
            return { queue: [...remaining, incoming] };
          }

          if (incoming.type === 'UPDATE') {
            const queue = [...state.queue];
            const idxCreate = queue.findIndex((a) => sameTarget(a) && a.type === 'CREATE');
            if (idxCreate >= 0) {
              const created = queue[idxCreate];
              queue[idxCreate] = {
                ...created,
                data: { ...created.data, ...incoming.data },
                timestamp: incoming.timestamp,
              };
              return { queue };
            }
            const idxUpdate = queue.findIndex((a) => sameTarget(a) && a.type === 'UPDATE');
            if (idxUpdate >= 0) {
              const prev = queue[idxUpdate];
              queue[idxUpdate] = {
                ...prev,
                data: { ...prev.data, ...incoming.data },
                timestamp: incoming.timestamp,
              };
              return { queue };
            }
          }

          return { queue: [...state.queue, incoming] };
        }),

      removeAction: (id) =>
        set((state) => ({
          queue: state.queue.filter((a) => a.id !== id),
        })),

      bumpAttempts: (id) => {
        const current = get().queue.find((a) => a.id === id);
        const next = (current?.attempts ?? 0) + 1;
        set((state) => ({
          queue: state.queue.map((a) => (a.id === id ? { ...a, attempts: next } : a)),
        }));
        return next;
      },

      // Dead-letter : au lieu de supprimer silencieusement une action en
      // échec définitif, on la met de côté avec son erreur. L'utilisateur
      // peut la réessayer ou l'abandonner depuis l'UI de sync.
      markFailed: (id, message) =>
        set((state) => {
          const action = state.queue.find((a) => a.id === id);
          if (!action) return {};
          return {
            queue: state.queue.filter((a) => a.id !== id),
            failedActions: [
              { action, message, at: Date.now() },
              ...state.failedActions.filter((f) => f.action.id !== id),
            ],
          };
        }),

      clearFailed: (actionId) =>
        set((state) => ({
          failedActions: state.failedActions.filter((f) => f.action.id !== actionId),
        })),

      retryFailed: (actionId) =>
        set((state) => {
          const entry = state.failedActions.find((f) => f.action.id === actionId);
          if (!entry) return {};
          return {
            failedActions: state.failedActions.filter((f) => f.action.id !== actionId),
            queue: [...state.queue, { ...entry.action, attempts: 0 }],
          };
        }),

      retryAllFailed: () =>
        set((state) => ({
          failedActions: [],
          queue: [
            ...state.queue,
            ...state.failedActions.map((f) => ({ ...f.action, attempts: 0 })),
          ],
        })),

      discardFailed: (actionId) =>
        set((state) => ({
          failedActions: state.failedActions.filter((f) => f.action.id !== actionId),
        })),

      discardAllFailed: () => set({ failedActions: [] }),

      clearQueue: () => set({ queue: [] }),
      setSyncing: (isSyncing) => set({ isSyncing }),
      setReady: (isReady) => set({ isReady }),
    }),
    {
      name: 'sync-storage',
      storage: createJSONStorage(() => indexedDbStorage),
      partialize: (state) => ({
        queue: state.queue,
        failedActions: state.failedActions,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setReady(true);
      },
    },
  ),
);

export const getActiveSyncScope = () => activeSyncScope;

export const setSyncAccountScope = async (accountId: string | null) => {
  const nextScope = accountId ? `user-${hashScope(accountId)}` : GUEST_SCOPE;

  if (nextScope === activeSyncScope && useSyncStore.getState().isReady) {
    return;
  }

  // Flush du cache requêtes SOUS l'ancien scope avant de basculer.
  await persistQueryClientSave({ queryClient, persister: queryPersister }).catch(() => undefined);

  activeSyncScope = nextScope;
  setActiveQueryScope(nextScope);

  useSyncStore.setState({
    ...emptyQueueState,
    isSyncing: false,
    isReady: false,
  });

  try {
    await useSyncStore.persist.rehydrate();
  } catch (error) {
    console.error('[sync-store] account scope rehydrate failed', error);
    useSyncStore.getState().setReady(true);
  }

  // L'historique de notifications vit dans le même stockage scopé : on
  // recharge celui du nouveau compte (le scope actif est déjà basculé).
  try {
    await switchNotificationStoreScope();
  } catch (error) {
    console.error('[sync-store] notification store scope rehydrate failed', error);
  }

  // Le login suppose le réseau : le cache requêtes se rechargera depuis
  // le serveur. On repart de zéro pour éviter tout mélange entre comptes.
  queryClient.clear();
};
