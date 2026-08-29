import { useState, useEffect, useRef, useCallback } from 'react';
import { useSyncStore, type SyncAction } from '../stores/syncStore';
import { apiClient } from '../api/client';
import { useQueryClient } from '@tanstack/react-query';
import { mergePullIntoCaches, remapLocalIdInCaches, type PullChanges } from '../sync/offlineCaches';
import { getDeviceId } from '../utils/deviceId';

interface SyncResponse {
  data?: {
    entity?: {
      id: string;
    };
  };
}

interface PullResponse {
  data?: {
    changes?: PullChanges;
    timestamp?: string;
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

  // Pull incrémental : GET /sync/pull?lastPulledAt=…&deviceId=…, merge dans
  // les caches, puis mémorise le timestamp serveur comme nouveau cursor.
  const pullAndMerge = useCallback(async () => {
    if (!navigator.onLine) return;
    try {
      const cursor = useSyncStore.getState().lastPulledAt;
      const params: Record<string, string> = { deviceId: getDeviceId() };
      if (cursor) params.lastPulledAt = cursor;

      const response = await apiClient.get<PullResponse>('/sync/pull', {
        params,
        _isSync: true,
      });
      const result = response.data?.data;
      if (!result?.changes) return;

      mergePullIntoCaches(queryClient, result.changes);

      if (result.timestamp) {
        useSyncStore.getState().setLastPulledAt(String(result.timestamp));
      }
    } catch (error) {
      // Best-effort : un échec de pull est non destructif. La tentative
      // suivante (online / mount / message SW) réessaiera avec le même cursor.
      console.debug('[sync] pull failed', error);
    }
  }, [queryClient]);

  const processQueue = useCallback(async () => {
    if (!navigator.onLine) return;
    if (isProcessingRef.current) return;

    isProcessingRef.current = true;

    const currentQueue = useSyncStore.getState().queue;
    if (currentQueue.length > 0) {
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
    }

    // Après vidange de la file : on rapatrie les changements serveur
    // (pull incrémental, cursor persistant).
    await pullAndMerge();

    isProcessingRef.current = false;
  }, [bumpAttempts, clearFailed, markFailed, pullAndMerge, queryClient, removeAction, setSyncing]);

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

    if (navigator.onLine && !isProcessingRef.current) {
      void processQueue();
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
