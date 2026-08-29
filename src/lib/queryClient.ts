import { QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { createAccountScopedIndexedDbStorage, writeActiveScopeHint } from '../storage/accountScopedIndexedDbStorage';
import { getInitialAccountScope } from '../utils/accountScope';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 30,
      retry: 1,
      networkMode: 'offlineFirst',
      refetchOnWindowFocus: 'always',
      refetchOnReconnect: 'always',
      refetchOnMount: 'always',
    },
  },
});

// Le cache React Query EST le store offline : il est persisté (chiffré,
// scopé par compte) dans IndexedDB et restauré au démarrage par
// PersistQueryClientProvider. Le scope est résolu dynamiquement pour que
// les changements de compte écrivent/lisent au bon endroit.
let activeScope = getInitialAccountScope();
void writeActiveScopeHint(activeScope);

const scopedStorage = createAccountScopedIndexedDbStorage(() => activeScope);

// Adaptation des types zustand (StateStorage) vers AsyncStorage attendu
// par le persister TanStack.
const queryCacheStorage = {
  getItem: async (key: string) => {
    try {
      const value = await scopedStorage.getItem(key);
      console.info('[query-cache] get', key, value ? `OK (${value.length} chars)` : 'MISS');
      return value;
    } catch (error) {
      console.error('[query-cache] get FAILED', key, error);
      return null;
    }
  },
  setItem: async (key: string, value: string) => {
    try {
      await scopedStorage.setItem(key, value);
      // Auto-test lecture/écriture : détecte toute corruption silencieuse
      // (chiffrement défaillant, transaction avortée…). Le déchiffrement
      // restitue exactement la valeur d'origine.
      const back = await scopedStorage.getItem(key);
      if (back !== value) {
        console.error('[query-cache] CORRUPTION: relecture != écriture', key);
      } else {
        console.info('[query-cache] persisted', key, `(${value.length} chars)`);
      }
    } catch (error) {
      console.error('[query-cache] set FAILED', key, error);
    }
  },
  removeItem: async (key: string) => {
    await scopedStorage.removeItem(key);
  },
};

export const setActiveQueryScope = (scope: string) => {
  activeScope = scope;
  void writeActiveScopeHint(scope);
};

export const getActiveQueryScope = () => activeScope;

export const queryPersister = createAsyncStoragePersister({
  key: 'query-cache',
  storage: queryCacheStorage,
  throttleTime: 1_000,
});
