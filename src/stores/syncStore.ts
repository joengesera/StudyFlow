import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, Event, Course, Grade } from '../types';

// ─── Types ────────────────────────────────────────────────

export interface SyncAction {
  id: string;
  method: string;
  url: string;
  payload?: any;
  timestamp: number;
}

// Cache local des entités (offline-first)
interface EntityCache {
  tasks: Task[];
  events: Event[];
  courses: Course[];
  grades: Grade[];
  lastUpdated: Record<string, number>; // clé => timestamp de dernière mise à jour
}

interface SyncState {
  // ── File d'attente de mutations à envoyer au serveur
  queue: SyncAction[];
  isSyncing: boolean;

  // ── Cache local des entités (persiste dans le browser store)
  cache: EntityCache;

  // ── Actions sur la queue
  enqueueAction: (action: Omit<SyncAction, 'id' | 'timestamp'>) => void;
  removeAction: (id: string) => void;
  clearQueue: () => void;
  setSyncing: (isSyncing: boolean) => void;

  // ── Actions sur le cache local
  setCacheTasks: (tasks: Task[]) => void;
  setCacheEvents: (events: Event[]) => void;
  setCacheCourses: (courses: Course[]) => void;
  setCacheGrades: (grades: Grade[]) => void;
  updateCacheTask: (id: string, update: Partial<Task>) => void;
  clearCache: () => void;
}

const emptyCache: EntityCache = {
  tasks: [],
  events: [],
  courses: [],
  grades: [],
  lastUpdated: {},
};

export const useSyncStore = create<SyncState>()(
  persist(
    (set) => ({
      queue: [],
      isSyncing: false,
      cache: emptyCache,

      // ── Queue ──────────────────────────────────────────────

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

      // ── Cache local ────────────────────────────────────────

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

      // Mise à jour optimiste d'une tâche dans le cache local
      updateCacheTask: (id, update) =>
        set((state) => ({
          cache: {
            ...state.cache,
            tasks: state.cache.tasks.map((t) =>
              t.id === id ? { ...t, ...update } : t
            ),
          },
        })),

      clearCache: () => set({ cache: emptyCache }),
    }),
    {
      name: 'sync-storage',
      // On persiste à la fois la queue et le cache local
      partialize: (state) => ({
        queue: state.queue,
        cache: state.cache,
      }),
    }
  )
);
