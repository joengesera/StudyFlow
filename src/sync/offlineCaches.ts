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

// Superpose les mutations encore en file (vérité locale non poussée) par-dessus
// n'importe quel snapshot serveur (refetch onReconnect/onFocus, pull, restauration).
// Règles :
// - CREATE en file et id absent du snapshot → l'ajoute (défauts fournis par le hook) ;
// - UPDATE en file → fusionne les champs de l'action sur l'entité existante ;
// - DELETE en file → retire l'entité du rendu (tombstone local).
// Dès qu'une action est poussée et retirée de la file, la liste redevient la
// vérité serveur sans autre intervention.
export const withPendingActions = <T>(
  list: T[] | undefined,
  entity: SyncEntity,
  actions: ReadonlyArray<{
    type: 'CREATE' | 'UPDATE' | 'DELETE';
    entity: string;
    data: Record<string, unknown>;
    localId?: string;
  }>,
  buildPending: (id: string, payload: Record<string, unknown>) => T,
): T[] => {
  const base = (list ?? []) as T[];
  const target = (a: { data: Record<string, unknown>; localId?: string }) => {
    const payloadId = a.data.id;
    if (typeof payloadId === 'string' && payloadId.length > 0) return payloadId;
    return a.localId;
  };

  const pending = actions.filter((a) => a.entity === entity);
  if (pending.length === 0) return base;

  let out = base;

  for (const action of pending) {
    const id = target(action);
    if (action.type === 'DELETE') {
      if (id) out = out.filter((item) => (item as { id?: unknown } | null)?.id !== id);
      continue;
    }
    if (!id) continue;

    const data = action.data as Record<string, unknown>;
    const existing = out.find((item) => (item as { id?: unknown } | null)?.id === id);

    if (existing) {
      out = out.map((item) =>
        (item as { id?: unknown } | null)?.id === id
          ? ({ ...(item as object), ...data } as T)
          : item,
      );
    } else {
      out = [buildPending(id, data), ...out];
    }
  }

  return out;
};

export interface PullChanges {
  tasks?: Array<Record<string, unknown>>;
  events?: Array<Record<string, unknown>>;
  grades?: Array<Record<string, unknown>>;
  works?: Array<Record<string, unknown>>;
  courses?: Array<Record<string, unknown>>;
}

// Fusionne les changements reçus par /sync/pull dans les caches listes.
// Règles :
// - la vérité serveur l'emporte : une entité reçue remplace la version cache,
//   une entité absente du pull reste (le pull est incrémental, pas un full set) ;
// - les tombstones (isDeleted: true) retirent l'entité du cache.
// Le drain de la file s'exécute AVANT le pull, donc les entités locales
// fraîchement poussées (même id) sont ré-alignées sur la vérité serveur
// (syncStatus SYNCED, version réelle).
export const mergePullIntoCaches = (
  queryClient: QueryClient,
  changes: PullChanges,
) => {
  const entities: Array<[SyncEntity, Array<Record<string, unknown>> | undefined]> = [
    ['Task', changes.tasks],
    ['Event', changes.events],
    ['Grade', changes.grades],
    ['Work', changes.works],
    ['Course', changes.courses],
  ];

  for (const [entity, rows] of entities) {
    const rootKey = rootKeyByEntity[entity];
    if (!rootKey || !rows || rows.length === 0) continue;

    const live = rows.filter((r) => r?.isDeleted !== true);
    const tombstoneIds = rows
      .filter((r) => r?.isDeleted === true)
      .map((r) => r?.id)
      .filter((id): id is string => typeof id === 'string');

    const byId = new Map<string, Record<string, unknown>>(
      live
        .filter((r) => typeof r?.id === 'string')
        .map((r) => [r.id as string, r]),
    );

    forEachListQuery(queryClient, rootKey, (list) => {
      const merged: unknown[] = [];
      const present = new Set<string>();

      for (const item of list) {
        const id = (item as { id?: unknown } | null)?.id;
        if (typeof id !== 'string') {
          merged.push(item);
          continue;
        }
        if (tombstoneIds.includes(id)) continue;
        if (byId.has(id)) {
          merged.push(byId.get(id) as Record<string, unknown>);
          present.add(id);
          continue;
        }
        merged.push(item);
        present.add(id);
      }

      for (const row of live) {
        const id = row?.id as string | undefined;
        if (typeof id === 'string' && !present.has(id)) {
          merged.push(row);
          present.add(id);
        }
      }

      return merged;
    });
  }
};
