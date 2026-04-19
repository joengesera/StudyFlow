import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Course, Event, Grade, Task } from '../types';
import { createAccountScopedIndexedDbStorage } from '../storage/accountScopedIndexedDbStorage';

export interface SyncAction {
  id: string;
  method: string;
  url: string;
  payload?: any;
  timestamp: number;
}

interface EntityCache {
  tasks: Task[];
  events: Event[];
  courses: Course[];
  grades: Grade[];
  lastUpdated: Record<string, number>;
}

interface SyncState {
  queue: SyncAction[];
  isSyncing: boolean;
  isReady: boolean;
  cache: EntityCache;

  enqueueAction: (action: Omit<SyncAction, 'id' | 'timestamp'>) => void;
  removeAction: (id: string) => void;
  clearQueue: () => void;
  setSyncing: (isSyncing: boolean) => void;
  setReady: (isReady: boolean) => void;

  setCacheTasks: (tasks: Task[]) => void;
  setCacheEvents: (events: Event[]) => void;
  setCacheCourses: (courses: Course[]) => void;
  setCacheGrades: (grades: Grade[]) => void;
  updateCacheTask: (id: string, update: Partial<Task>) => void;
  clearCache: () => void;
}

const AUTH_STORAGE_KEY = 'auth-storage';
const GUEST_SCOPE = 'guest';

const emptyCache: EntityCache = {
  tasks: [],
  events: [],
  courses: [],
  grades: [],
  lastUpdated: {},
};

const getPersistedAccountId = (): string | null => {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as { state?: { user?: { id?: string | null } | null } };
    return parsed?.state?.user?.id ?? null;
  } catch {
    return null;
  }
};

const hashScope = (value: string): string => {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return (hash >>> 0).toString(16);
};

const toAccountScope = (accountId: string | null) =>
  accountId ? `user-${hashScope(accountId)}` : GUEST_SCOPE;

let activeSyncScope = toAccountScope(getPersistedAccountId());

const indexedDbStorage = createAccountScopedIndexedDbStorage(() => activeSyncScope);

export const useSyncStore = create<SyncState>()(
  persist(
    (set) => ({
      queue: [],
      isSyncing: false,
      isReady: false,
      cache: emptyCache,

      enqueueAction: (action) =>
        set((state) => ({
          queue: [
            ...state.queue,
            {
              ...action,
              id: crypto.randomUUID(),
              timestamp: Date.now(),
            },
          ],
        })),

      removeAction: (id) =>
        set((state) => ({
          queue: state.queue.filter((a) => a.id !== id),
        })),

      clearQueue: () => set({ queue: [] }),
      setSyncing: (isSyncing) => set({ isSyncing }),
      setReady: (isReady) => set({ isReady }),

      setCacheTasks: (tasks) =>
        set((state) => ({
          cache: {
            ...state.cache,
            tasks,
            lastUpdated: { ...state.cache.lastUpdated, tasks: Date.now() },
          },
        })),

      setCacheEvents: (events) =>
        set((state) => ({
          cache: {
            ...state.cache,
            events,
            lastUpdated: { ...state.cache.lastUpdated, events: Date.now() },
          },
        })),

      setCacheCourses: (courses) =>
        set((state) => ({
          cache: {
            ...state.cache,
            courses,
            lastUpdated: { ...state.cache.lastUpdated, courses: Date.now() },
          },
        })),

      setCacheGrades: (grades) =>
        set((state) => ({
          cache: {
            ...state.cache,
            grades,
            lastUpdated: { ...state.cache.lastUpdated, grades: Date.now() },
          },
        })),

      updateCacheTask: (id, update) =>
        set((state) => ({
          cache: {
            ...state.cache,
            tasks: state.cache.tasks.map((task) =>
              task.id === id ? { ...task, ...update } : task,
            ),
          },
        })),

      clearCache: () => set({ cache: emptyCache }),
    }),
    {
      name: 'sync-storage',
      storage: createJSONStorage(() => indexedDbStorage),
      partialize: (state) => ({
        queue: state.queue,
        cache: state.cache,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setReady(true);
      },
    },
  ),
);

export const getActiveSyncScope = () => activeSyncScope;

export const setSyncAccountScope = async (accountId: string | null) => {
  const nextScope = toAccountScope(accountId);

  if (nextScope === activeSyncScope && useSyncStore.getState().isReady) {
    return;
  }

  activeSyncScope = nextScope;

  useSyncStore.setState({
    queue: [],
    cache: emptyCache,
    isSyncing: false,
    isReady: false,
  });

  try {
    await useSyncStore.persist.rehydrate();
  } catch (error) {
    console.error('[sync-store] account scope rehydrate failed', error);
    useSyncStore.getState().setReady(true);
  }
};
