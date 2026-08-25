import type { QueryClient } from '@tanstack/react-query';
import type { SyncEntity } from '../utils/deviceId';

// Racines des caches React Query contenant des listes d'entités.
// findAll({ queryKey: racine }) couvre aussi les clés dérivées
// (ex. ['tasks'] matche ['tasks','board']) — les requêtes non-listes
// (objets simples) sont ignorées via le garde Array.isArray.
const rootKeyByEntity: Record<SyncEntity, readonly unknown[] | null> = {
  Task: ['tasks'],
  Event: ['events'],
  Grade: ['grades'],
  Work: ['works'],
  Course: ['courses'],
  Unknown: null,
};

export interface OfflineMutationResult {
  success: true;
  offline: true;
  _temporaryId: string;
}

export const isOfflineMutationResult = (value: unknown): value is OfflineMutationResult =>
  typeof value === 'object'
  && value !== null
  && 'offline' in value
  && (value as { offline?: unknown }).offline === true;

const forEachListQuery = (
  queryClient: QueryClient,
  rootKey: readonly unknown[],
  transform: (list: unknown[]) => unknown[],
) => {
  queryClient.getQueryCache().findAll({ queryKey: [...rootKey] }).forEach((query) => {
    const data = queryClient.getQueryData<unknown>(query.queryKey);
    if (!Array.isArray(data)) return;
    queryClient.setQueryData(query.queryKey, (prev: unknown) =>
      Array.isArray(prev) ? transform(prev) : prev,
    );
  });
};

// Remplace l'id local d'une entité par son id serveur dans tous les caches
// listes concernés (après un CREATE poussé avec succès sur /sync/push).
export const remapLocalIdInCaches = (
  queryClient: QueryClient,
  entity: SyncEntity,
  localId: string,
  serverId: string,
) => {
  const rootKey = rootKeyByEntity[entity];
  if (!rootKey || !localId || !serverId || localId === serverId) return;

  forEachListQuery(queryClient, rootKey, (list) =>
    list.map((item) => {
      if (!item || typeof item !== 'object') return item;
      const record = item as { id?: unknown; localId?: unknown; syncStatus?: unknown };
      if (record.id !== localId) return item;
      return { ...record, id: serverId, localId: null, syncStatus: 'SYNCED' };
    }),
  );
};

// Insère une entité créée hors ligne dans tous les caches listes concernés
// (dédupliquée par id pour tolérer les doubles appels).
export const insertEntityInCaches = <T extends { id: string }>(
  queryClient: QueryClient,
  entity: SyncEntity,
  optimisticEntity: T,
) => {
  const rootKey = rootKeyByEntity[entity];
  if (!rootKey) return;

  forEachListQuery(queryClient, rootKey, (list) =>
    list.some((item) => (item as { id?: unknown } | null)?.id === optimisticEntity.id)
      ? list.map((item) => ((item as { id?: unknown } | null)?.id === optimisticEntity.id ? optimisticEntity : item))
      : [optimisticEntity, ...list],
  );
};

// Retire une entité supprimée de tous les caches listes concernés.
export const removeEntityFromCaches = (
  queryClient: QueryClient,
  entity: SyncEntity,
  id: string,
) => {
  const rootKey = rootKeyByEntity[entity];
  if (!rootKey || !id) return;

  forEachListQuery(queryClient, rootKey, (list) =>
    list.filter((item) => (item as { id?: unknown } | null)?.id !== id),
  );
};
