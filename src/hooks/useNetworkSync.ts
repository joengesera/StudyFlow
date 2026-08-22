import { useState, useEffect, useRef, useCallback } from 'react';
import { useSyncStore } from '../stores/syncStore';
import { apiClient } from '../api/client';
import { useQueryClient } from '@tanstack/react-query';
import { taskKeys } from '../hooks/useTasks';

interface SyncResponse {
  data?: {
    entity?: {
      id: string;
    };
  };
}

interface ApiError {
  message?: string;
  code?: string;
  response?: {
    status?: number;
  };
}

const MAX_RETRIES = 3;

export function useNetworkSync() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const retryCountRef = useRef<Record<string, number>>({});
  const isProcessingRef = useRef(false);
  const queryClient = useQueryClient();

  const { queue, isSyncing, setSyncing, removeAction } = useSyncStore();

  const processQueue = useCallback(async () => {
    if (!navigator.onLine) return;
    if (isProcessingRef.current) return;

    const currentQueue = useSyncStore.getState().queue;
    if (currentQueue.length === 0) return;

    isProcessingRef.current = true;
    setSyncing(true);

    for (const action of currentQueue) {
      if (!navigator.onLine) break;

      try {
        const response = await apiClient.post<SyncResponse>('/sync/push', action, {
          _isSync: true,
        });

        const result = response.data?.data;

        if (result?.entity?.id && action.data?.localId) {
          const localId = action.data.localId;
          const serverId = result.entity.id;

          queryClient.setQueryData(taskKeys.all, (old: unknown[]) =>
            old?.map((t) => (t && typeof t === 'object' && 'id' in t && t.id === localId
              ? { ...t, id: serverId, localId: undefined }
              : t)) ?? []
          );
          queryClient.setQueryData(taskKeys.board, (old: unknown[]) =>
            old?.map((t) => (t && typeof t === 'object' && 'id' in t && t.id === localId
              ? { ...t, id: serverId, localId: undefined }
              : t)) ?? []
          );
        }

        removeAction(action.id);
        delete retryCountRef.current[action.id];

      } catch (error: unknown) {
        const err = error as ApiError;
        const retries = (retryCountRef.current[action.id] ?? 0) + 1;
        retryCountRef.current[action.id] = retries;

        if (
          !navigator.onLine ||
          err.message === 'Network Error' ||
          err.code === 'ERR_NETWORK'
        ) {
          break;
        }

        if (err.response?.status && err.response.status >= 400 && err.response.status < 500) {
          console.warn('[sync] Action rejetée (4xx), supprimée de la file :', action, err.response.status);
          removeAction(action.id);
          delete retryCountRef.current[action.id];
          continue;
        }

        if (retries >= MAX_RETRIES) {
          console.error(`[sync] Action abandonnée après ${MAX_RETRIES} tentatives :`, action);
          removeAction(action.id);
          delete retryCountRef.current[action.id];
        } else {
          console.warn(`[sync] Tentative ${retries}/${MAX_RETRIES} échouée pour :`, action.id);
          break;
        }
      }
    }

    setSyncing(false);
    isProcessingRef.current = false;
  }, [queryClient, removeAction, setSyncing]);

  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true);
      await processQueue();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (navigator.onLine && queue.length > 0 && !isProcessingRef.current) {
      processQueue();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [queue.length, processQueue]);

  return { isOnline, isSyncing, queueCount: queue.length };
}