# StudyFlow

Application web de gestion académique (cours, tâches, planning, travaux, notes, analyse de risque) — **offline-first**, **PWA**, **multi-compte**.

## Stack

| Couche | Technologie |
|--------|-------------|
| Frontend | React 19 + TypeScript + Vite 6 |
| Routing | React Router 7 (lazy routes, protected routes) |
| State local | Zustand (authStore, syncStore) |
| State serveur / Cache offline | TanStack Query v5 (React Query) |
| Persistance offline | IndexedDB chiffré (AES-GCM) + Service Worker (Workbox) |
| Background Sync | Service Worker + `navigator.serviceWorker.sync` |
| UI | Tailwind CSS 4 + DaisyUI 5 + Material Symbols |
| Auth | Access token (mémoire) + Refresh token (cookie httpOnly) |
| Dates | date-fns 4 |
| Drag & Drop | @dnd-kit (kanban tâches) |
| Notifications Push | Web Push API + VAPID |

## Fonctionnalités

- **Cours** : CRUD, code, couleur, crédits, types de travaux
- **Tâches** : Kanban (PENDING / IN_PROGRESS / COMPLETED / CANCELED), priorités, drag & drop
- **Planning (Agenda)** : Événements (cours, examens, TP, révisions…), vue calendrier
- **Travaux** : Suivi des rendus, statuts (PLANNED / SUBMITTED / GRADED / CANCELLED), filtres, stats
- **Notes** : Saisie par cours, moyennes pondérées, types de travaux
- **Analyse de risque** : Score global + détection cours à risque (< 10/20), calcul local + API
- **Profil** : Paramètres utilisateur, déconnexion
- **Mode offline** : Création/édition/suppression fonctionnelles sans réseau, synchronisation automatique au retour online
- **Multi-compte** : Isolation complète des données par utilisateur (IndexedDB + cache React Query chiffrés par scope)

## Architecture en bref

```
┌─────────────────────────────────────────────────────────────┐
│                      React App                              │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Pages   │──│  Hooks RQ    │──│  API Client (axios)  │  │
│  │ (lazy)   │  │ (optimistic) │  │  + interceptors      │  │
│  └──────────┘  └──────────────┘  └──────────┬───────────┘  │
│                                              │              │
│  ┌──────────────────────────────────────────▼──────────┐  │
│  │              Sync Engine (Zustand)                   │  │
│  │  Queue mutations offline → coalescing → dead-letter  │  │
│  └────────────────────────────┬────────────────────────┘  │
│                               │                            │
│  ┌────────────────────────────▼────────────────────────┐  │
│  │         IndexedDB chiffré (AES-GCM) par scope        │  │
│  │  - sync-storage (queue + failed)                     │  │
│  │  - query-cache (React Query persister)               │  │
│  │  - scope_secrets (clés de chiffrement)               │  │
│  └────────────────────────────┬────────────────────────┘  │
│                               │                            │
│  ┌────────────────────────────▼────────────────────────┐  │
│  │            Service Worker (Workbox)                  │  │
│  │  - Precaching + Navigation fallback                  │  │
│  │  - Background Sync (drain queue sans onglet ouvert)  │  │
│  │  - Push Notifications                                │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Démarrage rapide

```bash
# Installation
npm install

# Développement (HMR)
npm run dev

# Build production (inclut PWA manifest + SW)
npm run build

# Preview build
npm run preview

# Lint
npm run lint
```

## Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `VITE_API_URL` | URL de base de l'API backend | `https://api.studyflow.app` |

Copier `.env.example` vers `.env` et adapter.

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de dev Vite avec HMR |
| `npm run build` | `tsc -b` + `vite build` (sortie dans `dist/`) |
| `npm run preview` | Aperçu du build production |
| `npm run lint` | ESLint (TypeScript + React Hooks + React Refresh) |

## Structure du projet

```
src/
├── api/                 # Clients API (1 par domaine)
│   ├── auth.api.ts
│   ├── course.api.ts
│   ├── tasks.api.ts
│   ├── events.api.ts
│   ├── grade.api.ts
│   ├── works.api.ts
│   ├── risk.api.ts
│   └── client.ts        # Axios instance + interceptors (auth, offline, refresh)
├── components/          # Composants UI réutilisables
│   ├── SyncStatus/      # Indicateur de synchronisation (header)
│   └── Works/           # Composants page Works (Stats, Filters, List, Modal)
├── hooks/               # Hooks React Query (CRUD + optimistic UI)
│   ├── useAuth.ts
│   ├── useCourses.ts
│   ├── useTasks.ts
│   ├── useEvents.ts
│   ├── useGrades.ts
│   ├── useWorks.ts
│   ├── useRisks.ts
│   ├── useNetworkSync.ts   # Moteur de sync (online/offline)
│   ├── usePomodoro.ts
│   ├── usePushNotifications.ts
│   ├── useTheme.ts
│   └── useVisualComfort.ts
├── layouts/
│   └── AppLayout.tsx    # Sidebar responsive + header + SyncStatus
├── lib/
│   └── queryClient.ts   # QueryClient + Persister IndexedDB scoped
├── pages/               # Pages (lazy-loaded)
│   ├── Auth/            # Login, Register, Forgot/Reset Password
│   ├── Dashboard/
│   ├── Courses/
│   ├── Agenda/
│   ├── Tasks/
│   ├── Works/
│   ├── Risk/
│   └── Profile/
├── router/
│   ├── index.tsx        # Routes publiques + protégées (ProtectedRoute)
│   └── ProtectedRouter.tsx
├── stores/
│   ├── authStore.ts     # User + tokens (persisté localStorage v2)
│   └── syncStore.ts     # Queue mutations offline (persisté IndexedDB scoped)
├── storage/
│   └── accountScopedIndexedDbStorage.ts  # IndexedDB chiffré par compte
├── sync/
│   ├── offlineCaches.ts # Helpers cache RQ (remap localId→serverId, insert, remove)
│   └── useNetworkSync.ts
├── types/
│   └── index.ts         # Types domaine (Task, Event, Course, Grade, Work, Risk…)
├── utils/
│   ├── accountScope.ts  # Scope user-{hash} / guest
│   ├── deviceId.ts      # Device fingerprint pour sync
│   └── courseMeta.ts
├── sw.js                # Service Worker (precache + background sync + push)
├── main.tsx             # Entry point (PersistQueryClientProvider + Router)
├── index.css            # Styles globaux (Tailwind + DaisyUI)
└── vite-env.d.ts
```

## Principes clés

### Offline-First / Optimistic UI
- Toute mutation (create/update/delete) met à jour **immédiatement** le cache React Query
- L'intercepteur axios détecte l'absence de réseau → place la mutation dans la **queue de sync** (Zustand + IndexedDB)
- Au retour online, `useNetworkSync` draine la queue vers `/sync/push`
- Succès : `remapLocalIdInCaches` remplace le `localId` par l'`id` serveur dans tous les caches listes

### Account-Scoped Persistence
- Chaque compte a son **namespace IndexedDB** : `user-{fnv1a(userId)}` ou `guest`
- Clé de chiffrement AES-GCM dérivée par scope (stockée dans `scope_secrets`)
- Changement de compte → flush cache ancien + réhydratation nouveau scope

### Coalescing Queue
- `UPDATE` fusionne dans `CREATE` existant (même `localId`)
- `DELETE` après `CREATE` non-sync → annule le CREATE (entité n'existe pas serveur)
- `DELETE` après `UPDATE` → garde le DELETE
- Échecs 4xx → **dead-letter** (UI pour retry/discard), 5xx → retry limité (3x)

### Single-Flight Token Refresh
- Un seul `refreshAccessToken` en vol (`refreshPromise`)
- Requêtes 401 parallèles attendent la même promesse
- Échec refresh → logout + redirect `/login`

### Background Sync (Service Worker)
- `sync` event tag `studyflow-sync`
- Lit queue chiffrée dans IndexedDB, appelle `/sync/push` avec `Idempotency-Key`
- Si SW ne peut pas drainer (pas de token, DB verrouillée) → `postMessage` vers onglets ouverts (`TRIGGER_SYNC`)
- Erreur → relance planifiée par le navigateur

## Déploiement PWA

Le build génère dans `dist/` :
- `manifest.webmanifest` (icônes 192/512, theme color, display standalone)
- `sw.js` + `registerSW.js` (Workbox precache + runtime)
- Assets hashés

Servir `dist/` via n'importe quel serveur statique (nginx, Vercel, Netlify, Cloudflare Pages…). HTTPS requis pour Service Worker + Push.

## Licence

Projet privé — StudyFlow.