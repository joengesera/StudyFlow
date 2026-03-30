import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SyncAction {
  id: string;
  method: string;
  url: string;
  payload?: any;
  timestamp: number;
}

interface SyncState {
  queue: SyncAction[];
  isSyncing: boolean;
  enqueueAction: (action: Omit<SyncAction, 'id' | 'timestamp'>) => void;
  removeAction: (id: string) => void;
  clearQueue: () => void;
  setSyncing: (isSyncing: boolean) => void;
}

export const useSyncStore = create<SyncState>()(
  persist(
    (set) => ({
      queue: [],
      isSyncing: false,

      enqueueAction: (action) => set((state) => ({
        queue: [...state.queue, {
          ...action,
          id: crypto.randomUUID(),
          timestamp: Date.now()
        }]
      })),

      removeAction: (id) => set((state) => ({
        queue: state.queue.filter((a) => a.id !== id)
      })),

      clearQueue: () => set({ queue: [] }),
      
      setSyncing: (isSyncing) => set({ isSyncing })
    }),
    {
      name: 'sync-storage'
    }
  )
);
