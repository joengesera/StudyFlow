import { useState, useEffect, useRef, useCallback } from 'react';
import { useSyncStore, type SyncAction } from '../stores/syncStore';
import { apiClient } from '../api/client';
import { useQueryClient } from '@tanstack/react-query';
import { remapLocalIdInCaches } from '../sync/offlineCaches';

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
  const isProcessingRef = useRef(false);
  const queryClient = useQueryClient();

  const { queue, failedActions, isSyncing, setSyncing, removeAction, markFailed, clearFailed, bumpAttempts } =
    useSyncStore();

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
        // Idempotency-Key : permet au backend de dédupliquer si l'action
        // avait déjà été appliquée (ex. timeout réseau après application).
        const response = await apiClient.post<SyncResponse>('/sync/push', action, {
          _isSync: true,
          headers: { 'Idempotency-Key': action.id },
        });

        const result = response.data?.data;

        if (result?.entity?.id && action.localId) {
          remapLocalIdInCaches(queryClient, action.entity, action.localId, result.entity.id);
        }

        removeAction(action.id);
        clearFailed(action.id);

      } catch (error: unknown) {
        const err = error as ApiError;

        // Réseau toujours indisponible → on stoppe, on retentera plus tard
        // sans compter d'échec contre l'action.
        if (
          !navigator.onLine ||
          err.message === 'Network Error' ||
          err.code === 'ERR_NETWORK'
        ) {
          break;
        }

        // Rejet définitif du serveur (validation, permissions…) → dead-letter.
        if (err.response?.status && err.response.status >= 400 && err.response.status < 500) {
          console.warn('[sync] Action rejetée (4xx), mise en échec :', action, err.response.status);
          markFailed(action.id, `Rejetée par le serveur (${err.response.status})`);
          continue;
        }

        // Erreur transitoire (5xx…) → retry limité, compteur persisté.
        const attempts = bumpAttempts(action.id);
        if (attempts >= MAX_RETRIES) {
          console.error(`[sync] Action abandonnée après ${MAX_RETRIES} tentatives :`, action);
          markFailed(action.id, `Échec après ${MAX_RETRIES} tentatives`);
        } else {
          break;
        }
      }
    }

    setSyncing(false);
    isProcessingRef.current = false;
  }, [bumpAttempts, clearFailed, markFailed, queryClient, removeAction, setSyncing]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      void processQueue();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Le service worker délègue la vidange aux onglets ouverts quand le
    // drain direct en arrière-plan n'est pas possible.
    const handleSwMessage = (event: MessageEvent) => {
      if ((event.data as { type?: string } | null)?.type === 'TRIGGER_SYNC') {
        void processQueue();
      }
    };
    navigator.serviceWorker?.addEventListener('message', handleSwMessage);

    if (navigator.onLine && useSyncStore.getState().queue.length > 0 && !isProcessingRef.current) {
      processQueue();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      navigator.serviceWorker?.removeEventListener('message', handleSwMessage);
    };
  }, [processQueue]);

  const retryAllFailed = useCallback(() => {
    useSyncStore.getState().retryAllFailed();
    void processQueue();
  }, [processQueue]);

  return {
    isOnline,
    isSyncing,
    queueCount: queue.length,
    failedActions,
    retryAction: (action: SyncAction | string) => {
      const id = typeof action === 'string' ? action : action.id;
      useSyncStore.getState().retryFailed(id);
      void processQueue();
    },
    discardAction: (action: SyncAction | string) => {
      const id = typeof action === 'string' ? action : action.id;
      useSyncStore.getState().discardFailed(id);
    },
    retryAllFailed,
    discardAllFailed: () => useSyncStore.getState().discardAllFailed(),
    triggerSync: processQueue,
  };
}
