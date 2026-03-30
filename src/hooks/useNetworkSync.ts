import { useState, useEffect } from 'react';
import { useSyncStore } from '../stores/syncStore';
import { apiClient } from '../api/client';

export function useNetworkSync() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { queue, isSyncing, setSyncing, removeAction } = useSyncStore();

  useEffect(() => {
    const processQueue = async () => {
      const currentQueue = useSyncStore.getState().queue;
      if (currentQueue.length === 0 || useSyncStore.getState().isSyncing) return;

      setSyncing(true);

      for (const action of currentQueue) {
        try {
          await apiClient({
            method: action.method,
            url: action.url,
            data: action.payload
          });
          // Si succès, on retire de la file
          removeAction(action.id);
        } catch (error: any) {
          console.error('Failed to sync action', action, error);
          // Si erreur réseau pendant le rattrapage, on arrête d'essayer
          if (!navigator.onLine || error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
            break;
          }
          // Si c'est une vraie erreur 400 (Bad request), on la retire pour ne pas bloquer éternellement
          if (error.response && error.response.status >= 400 && error.response.status < 500) {
            removeAction(action.id);
          }
        }
      }

      setSyncing(false);
    };

    const handleOnline = async () => {
      setIsOnline(true);
      await processQueue();
    };

    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check on mount
    if (navigator.onLine && queue.length > 0) {
      processQueue();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [queue.length, setSyncing, removeAction]);

  return { isOnline, isSyncing, queueCount: queue.length };
}
