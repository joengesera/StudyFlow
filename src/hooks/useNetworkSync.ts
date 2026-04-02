import { useState, useEffect, useRef } from 'react';
import { useSyncStore } from '../stores/syncStore';
import { apiClient } from '../api/client';

// Nombre maximum de tentatives avant de considérer une action comme définitivement échouée
const MAX_RETRIES = 3;

export function useNetworkSync() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  // Suivi des tentatives par action (clé = action.id)
  const retryCountRef = useRef<Record<string, number>>({});
  // Verrou pour éviter des processQueue concurrents
  const isProcessingRef = useRef(false);

  const { queue, isSyncing, setSyncing, removeAction } = useSyncStore();

  useEffect(() => {
    const processQueue = async () => {
      // Pas de réseau ou déjà en cours → on ne fait rien
      if (!navigator.onLine) return;
      if (isProcessingRef.current) return;

      const currentQueue = useSyncStore.getState().queue;
      if (currentQueue.length === 0) return;

      isProcessingRef.current = true;
      setSyncing(true);

      for (const action of currentQueue) {
        // Vérifier à nouveau le réseau à chaque action
        if (!navigator.onLine) break;

        try {
          await apiClient({
            method: action.method,
            url: action.url,
            data: action.payload,
            _isSync: true,
          } as any);

          // Succès → retirer de la file et réinitialiser le compteur
          removeAction(action.id);
          delete retryCountRef.current[action.id];

        } catch (error: any) {
          const retries = (retryCountRef.current[action.id] ?? 0) + 1;
          retryCountRef.current[action.id] = retries;

          // Erreur réseau → on arrête d'essayer pour cette session
          if (
            !navigator.onLine ||
            error.message === 'Network Error' ||
            error.code === 'ERR_NETWORK'
          ) {
            break;
          }

          // Erreur client 4xx : la requête est invalide côté serveur, on la supprime
          // pour ne pas bloquer la queue indéfiniment
          if (error.response?.status >= 400 && error.response?.status < 500) {
            console.warn('[sync] Action rejetée (4xx), supprimée de la file :', action, error.response.status);
            removeAction(action.id);
            delete retryCountRef.current[action.id];
            continue;
          }

          // Erreur serveur 5xx ou autre : on compte les tentatives
          if (retries >= MAX_RETRIES) {
            console.error(`[sync] Action abandonnée après ${MAX_RETRIES} tentatives :`, action);
            removeAction(action.id);
            delete retryCountRef.current[action.id];
          } else {
            console.warn(`[sync] Tentative ${retries}/${MAX_RETRIES} échouée pour :`, action.id);
            // On arrête ce cycle pour ré-essayer plus tard (au prochain 'online' ou mount)
            break;
          }
        }
      }

      setSyncing(false);
      isProcessingRef.current = false;
    };

    const handleOnline = async () => {
      setIsOnline(true);
      await processQueue();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Lancement initial si on est en ligne et qu'il y a des actions en attente
    if (navigator.onLine && queue.length > 0 && !isProcessingRef.current) {
      processQueue();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
    // On écoute uniquement les changements de longueur de queue
    // (stable entre les renders grâce au ref pour le verrou)
  }, [queue.length]); // eslint-disable-line react-hooks/exhaustive-deps

  return { isOnline, isSyncing, queueCount: queue.length };
}
