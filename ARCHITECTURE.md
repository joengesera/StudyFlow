# Architecture Decision Records (ADR)

## ADR-001 : Offline-First avec TanStack Query comme store unique

**Date** : 2025-08-20
**Statut** : Accepté

### Contexte
L'application doit fonctionner pleinement hors ligne (création, édition, suppression d'entités). Le cache serveur doit être la source de vérité unique pour l'UI, sans store Redux/Zustand supplémentaire pour les données domaine.

### Décision
Utiliser **TanStack Query v5** comme :
- Cache serveur (queries + mutations)
- Store offline persité via `@tanstack/query-async-storage-persister` vers IndexedDB
- Source unique pour l'affichage (optimistic updates via `onMutate` / `setQueryData`)

### Conséquences
- ✅ Pas de duplication état (pas de `tasksStore`, `coursesStore`…)
- ✅ Persistance automatique (configurée dans `queryClient.ts`)
- ✅ Invalidation centralisée (`queryClient.invalidateQueries`)
- ⚠️ Besoin d'helpers pour manipuler les caches listes (`offlineCaches.ts`)
- ⚠️ Mutations optimistes requièrent pattern `onMutate` + `onError` rollback

### Alternatives rejetées
- Redux Toolkit + RTK Query : plus verbeux, persistance offline moins native
- Zustand pour données domaine : duplication avec cache RQ, sync complexe

---

## ADR-002 : Account-Scoped Encrypted IndexedDB

**Date** : 2025-08-20
**Statut** : Accepté

### Contexte
Multi-compte : un utilisateur peut se déconnecter, un autre se connecter sur le même navigateur. Les données offline (queue sync + cache RQ) doivent être **isolées** par compte.

### Décision
- Namespace IndexedDB par compte : `user-{fnv1a(userId)}` ou `guest`
- Chiffrement **AES-GCM** par scope (clé stockée dans `scope_secrets`)
- `accountScopedIndexedDbStorage` wrapper zustand + RQ persister
- Changement de compte → `setSyncAccountScope` : flush ancien scope + réhydratation nouveau

### Conséquences
- ✅ Isolation forte (même device, comptes différents = données séparées)
- ✅ Conforme RGPD (données chiffrées au repos)
- ✅ Pas de fuite inter-comptes
- ⚠️ Complexité : rotation clés, migration scope, rehydration async
- ⚠️ `guest` scope pour utilisateurs non connectés (données non persistées cross-session)

### Alternatives rejetées
- Un seul IndexedDB + préfixe clés : pas d'isolation chiffrée, risque fuite
- localStorage : quota 5Mo, pas de chiffrement natif, pas de background sync

---

## ADR-003 : Coalescing Mutation Queue avec Dead-Letter

**Date** : 2025-08-22
**Statut** : Accepté

### Contexte
Hors ligne, l'utilisateur peut enchaîner : créer → modifier → supprimer la même entité. La queue de sync ne doit pas envoyer d'opérations redondantes ou contradictoires au backend.

### Décision
`syncStore.enqueueAction` implémente du **coalescing** :
- `CREATE` + `UPDATE` même `localId` → fusion en un seul `CREATE` avec données finales
- `UPDATE` + `UPDATE` même cible → fusion (dernier gagne)
- `DELETE` après `CREATE` non-sync → **annule le CREATE** (entité jamais créée serveur)
- `DELETE` après `UPDATE` → garde le `DELETE`

Échecs serveur (4xx) → **dead-letter** (`failedActions`) : UI dédiée pour retry/discard.
Échecs transitoires (5xx, réseau) → retry max 3x (`attempts` persisté).

### Conséquences
- ✅ Queue minimale, pas d'opérations inutiles
- ✅ UX : utilisateur voit erreurs définitives (validation, permissions) et peut corriger
- ✅ Idempotence via `Idempotency-Key` (header + action.id)
- ⚠️ Logique coalescing complexe à maintenir (tests unitaires requis)

### Alternatives rejetées
- Queue naïve (FIFO simple) : enverrait CREATE puis DELETE → erreur 404 serveur
- Pas de dead-letter : échecs silencieux, perte de données utilisateur

---

## ADR-004 : Single-Flight Refresh Token

**Date** : 2025-08-20
**Statut** : Accepté

### Contexte
Refresh token dans cookie httpOnly (non accessible JS). Plusieurs requêtes parallèles peuvent recevoir 401 simultanément → risquent de déclencher des refresh concurrents qui s'invalident mutuellement (rotation token).

### Décision
Variable `refreshPromise` (Promise unique) dans `client.ts` :
- Premier 401 lance `performRefresh()` → stocke la promesse
- Requêtes suivantes attendent `refreshPromise`
- `finally` reset `refreshPromise = null`
- Échec → logout global + redirect `/login`

### Conséquences
- ✅ Pas de race condition sur rotation refresh token
- ✅ Une seule requête `/auth/refresh-token` par série de 401
- ⚠️ Si refresh échoue (token révoqué, expiré) → toutes les requêtes en attente échouent ensemble (comportement souhaité)

### Alternatives rejetées
- Queue de promesses : plus complexe, même résultat
- Pas de déduplication : risquerait d'invalider le refresh token côté serveur

---

## ADR-005 : Service Worker pour Background Sync + Push

**Date** : 2025-08-22
**Statut** : Accepté

### Contexte
La queue de sync doit être vidée même si **aucun onglet n'est ouvert** (utilisateur ferme le navigateur après actions offline). Les notifications push doivent arriver application fermée.

### Décision
Service Worker (`sw.js`) Workbox :
- **Precaching** : tous assets statiques + navigation fallback (`/index.html`)
- **Background Sync** : event `sync` tag `studyflow-sync`
  - Lit queue chiffrée dans IndexedDB (scope actif via `__active_scope__`)
  - Appelle `/sync/push` avec `Authorization: Bearer <accessToken>` (refresh via cookie)
  - `Idempotency-Key` = `action.id` pour déduplication
  - Succès/4xx → retire de la queue, 5xx → break + relance navigateur
  - Échec lecture DB/token → `postMessage({ type: 'TRIGGER_SYNC' })` vers onglets ouverts
- **Push Notifications** : event `push` → `showNotification` + `notificationclick` → focus/ouvre URL

### Conséquences
- ✅ Sync fiable sans onglet ouvert
- ✅ Push notifications natives
- ⚠️ SW ne peut pas accéder au store Zustand (contexte différent) → lecture directe IndexedDB
- ⚠️ Chiffrement : SW doit importer clé AES-GCM depuis `scope_secrets` (même logique que main thread)
- ⚠️ `navigator.serviceWorker.sync` non supporté Safari (fallback : `useNetworkSync` au focus/online)

### Alternatives rejetées
- Sync uniquement au `window.ononline` : perd les actions si onglet fermé
- Pas de SW : pas de PWA installable, pas de push, pas de precache

---

## ADR-006 : Optimistic UI Pattern Unifié

**Date** : 2025-08-20
**Statut** : Accepté

### Contexte
Toutes les mutations (Tasks, Events, Courses, Grades, Works) suivent le même pattern offline-first.

### Décision
Chaque hook `useCreateX / useUpdateX / useDeleteX` suit ce pattern :

```typescript
// CREATE
mutationFn: (payload) => {
  const localId = payload.id ?? crypto.randomUUID();
  insertEntityInCaches(queryClient, 'Entity', buildOptimisticEntity(localId, payload));
  return api.create({ ...payload, id: localId });
},
onSuccess: (created) => {
  if (isOfflineMutationResult(created)) return; // garde entrée optimiste
  queryClient.invalidateQueries({ queryKey: entityKeys.all });
}

// UPDATE
onMutate: async ({ id, payload }) => {
  await queryClient.cancelQueries({ queryKey: entityKeys.all });
  const previous = queryClient.getQueryData(entityKeys.all);
  queryClient.setQueryData(entityKeys.all, (old) =>
    old?.map((e) => e.id === id ? { ...e, ...payload } : e) ?? []
  );
  return { previous };
},
onError: (_err, _vars, context) => {
  if (context?.previous) queryClient.setQueryData(entityKeys.all, context.previous);
},
onSettled: () => queryClient.invalidateQueries({ queryKey: entityKeys.all });

// DELETE
mutationFn: (id) => {
  removeEntityFromCaches(queryClient, 'Entity', id);
  return api.delete(id);
}
```

Helpers partagés dans `offlineCaches.ts` :
- `insertEntityInCaches` : déduplication par id
- `removeEntityFromCaches` : filtre tous caches listes
- `remapLocalIdInCaches` : localId → serverId + `syncStatus: 'SYNCED'`
- `isOfflineMutationResult` : détection réponse intercepteur offline

### Conséquences
- ✅ Cohérence totale entre domaines
- ✅ Réutilisation code (helpers + pattern)
- ✅ Tests faciles (même structure)
- ⚠️ Boilerplate par entité (pourrait être factorisé en factory hook)

---

## ADR-007 : Calcul Risque Local + API

**Date** : 2025-08-22
**Statut** : Accepté

### Contexte
L'analyse de risque (moyenne < 10/20 = cours à risque) doit être affichée sur le Dashboard pour **tous les cours** sans faire N appels API.

### Décision
- `useDashboardStats(grades, courses)` : calcul **local** (memoized) à partir des grades déjà en cache RQ
- `useRisk(courseId)` : appel API `/risk/course/:id` pour analyse détaillée (score, détails performance/procrastination/pression)
- Dashboard utilise le local, page Risk utilise l'API

### Conséquences
- ✅ Dashboard instantané (pas d'attente API)
- ✅ Cohérence : même données grades → même résultat
- ⚠️ Duplication logique (local + serveur) → maintenir en sync

### Alternatives rejetées
- Tout via API : N appels pour N cours → lent, charge serveur
- Tout local : pas de détails avancés (procrastination, pression)

---

## ADR-008 : Lazy Loading Routes + ProtectedRoute Wrapper

**Date** : 2025-08-20
**Statut** : Accepté

### Contexte
Code splitting pour réduire bundle initial. Routes protégées nécessitent authentification.

### Décision
- `React.lazy` + `Suspense` pour **toutes** les pages (même Dashboard)
- `ProtectedRoute` wrapper : vérifie `isAuthenticated` (authStore) → redirect `/login` si non
- Routes publiques : `/login`, `/register`, `/forgot-password`, `/reset-password`
- Routes protégées : enfants de `<ProtectedRoute />` avec `<AppLayout />` commun

### Conséquences
- ✅ Bundle initial minimal (~vendor + router + auth)
- ✅ Chargement à la demande
- ⚠️ `Suspense` fallback requis (PageLoader spinner)
- ⚠️ `ProtectedRoute` doit lire store synchronement (Zustand `getState()`)

---

## ADR-009 : Device ID pour Idempotence Sync

**Date** : 2025-08-22
**Statut** : Accepté

### Contexte
Le backend `/sync/push` doit pouvoir dédupliquer des actions envoyées plusieurs fois (retry, background sync + onglet ouvert).

### Décision
- `deviceId` : fingerprint navigateur (stocké dans `localStorage` `studyflow-device-id`, généré via `crypto.randomUUID()`)
- Chaque `SyncAction` porte `deviceId` + `localId` (identité mutation)
- Backend utilise `(deviceId, localId)` comme clé d'idempotence
- `Idempotency-Key` header = `action.id` (UUID unique par enqueue)

### Conséquences
- ✅ Déduplication robuste (même action envoyée 2x = 1 seule application)
- ✅ Fonctionne cross-onglets (même deviceId)
- ⚠️ Si utilisateur nettoie localStorage → nouveau deviceId (pas grave, nouvelles mutations)

---

## ADR-010 : Tailwind 4 + DaisyUI via Vite Plugin

**Date** : 2025-08-20
**Statut** : Accepté

### Contexte
Styling utilitaire + composants pré-stylés, sans configuration PostCSS complexe.

### Décision
- `@tailwindcss/vite` (plugin officiel Tailwind 4 pour Vite)
- `daisyui` importé dans `index.css` : `@plugin "daisyui";`
- Classes utilitaires + composants DaisyUI (`btn`, `card`, `modal`, `loading`, `dropdown`…)
- Material Symbols via `@font-face` (local `material-symbols-outlined.woff2` dans `dist/assets/`)

### Conséquences
- ✅ Zero config PostCSS
- ✅ Bundle CSS minimal (JIT)
- ✅ Thèmes DaisyUI (light/dark via `data-theme`)
- ⚠️ Tailwind 4 encore en évolution (breaking changes possibles)

---

## Résumé des décisions

| ADR | Sujet | Impact |
|-----|-------|--------|
| 001 | TanStack Query store unique | Architecture data layer |
| 002 | IndexedDB scoped chiffré | Sécurité multi-compte |
| 003 | Coalescing queue + dead-letter | Fiabilité sync offline |
| 004 | Single-flight refresh | Stabilité auth |
| 005 | SW Background Sync + Push | UX offline/push |
| 006 | Pattern optimistic unifié | Maintenabilité hooks |
| 007 | Risque local + API | Perf Dashboard |
| 008 | Lazy routes + ProtectedRoute | Bundle size + auth |
| 009 | Device ID idempotence | Déduplication backend |
| 010 | Tailwind 4 + DaisyUI | DX styling |