# Contributing to StudyFlow

## Workflow Git

### Branches
```
main          # Production (protégée, CI requis)
develop       # Intégration continue (optionnel)
feature/*     # Nouvelles fonctionnalités
fix/*         # Corrections bugs
chore/*       # Maintenance (deps, config, docs)
```

### Commits (Conventional Commits)
```
<type>(<scope>): <description>

[body]

[footer]
```

**Types** :
- `feat` : nouvelle fonctionnalité
- `fix` : correction bug
- `docs` : documentation seulement
- `style` : formatage (prettier, pas de logique)
- `refactor` : refactoring sans changement comportement
- `perf` : amélioration performance
- `test` : ajout/modification tests
- `chore` : maintenance (deps, build, CI)
- `ci` : configuration CI/CD

**Exemples** :
```
feat(tasks): add drag-and-drop reordering in kanban board

fix(sync): handle DELETE after CREATE coalescing correctly

chore(deps): upgrade @tanstack/react-query to v5.102.3

refactor(api): extract unwrapApiData utility
```

### Pull Requests
1. Branche depuis `main` (ou `develop`)
2. Commits atomiques, messages clairs
3. `npm run lint` passe
4. `npm run build` passe
5. Description PR : quoi, pourquoi, comment tester
6. Review requise (1 approbation minimum)
7. Squash & merge sur `main`

---

## Standards de Code

### TypeScript
- **Strict mode** : activé (`tsconfig.json`)
- **Pas de `any`** : utiliser `unknown` + type guards
- **Types partagés** : `src/types/index.ts` (source unique)
- **Generics** : privilégier pour hooks/factories réutilisables
- **Interfaces** pour objets, `type` pour unions/primitives

### React
- **Functional components** + hooks uniquement
- **Lazy loading** : toutes les pages (`React.lazy` + `Suspense`)
- **Props destructurées** avec types explicites
- **Pas de `useEffect` pour sync état** : préférer `useMemo` / état dérivé
- **Optimistic UI** : pattern unifié (voir `useTasks.ts`, `useCourses.ts`…)

### Zustand
- **Un store par domaine** : `authStore`, `syncStore`
- **Persistance** : `persist` middleware (localStorage pour auth, IndexedDB scoped pour sync)
- **Selectors** : `useStore((state) => state.field)` pour éviter re-renders inutiles
- **Actions** : mutent `state` directement (Immer-like via `set`)

### TanStack Query
- **Query keys** : constants exportées (`taskKeys`, `courseKeys`…)
- **StaleTime** : 30s par défaut pour listes, 0 pour détails
- **Mutations** : pattern `onMutate`/`onError`/`onSettled` pour optimistic updates
- **Invalidation** : `queryClient.invalidateQueries({ queryKey })` après mutations serveur

### CSS / Tailwind
- **Tailwind 4** via `@tailwindcss/vite` (JIT)
- **DaisyUI** pour composants (`btn`, `card`, `modal`, `dropdown`, `loading`…)
- **Pas de CSS custom** sauf `index.css` (imports + variables globales)
- **Responsive** : mobile-first (`md:`, `lg:`)
- **Dark mode** : `dark:` variant (DaisyUI `data-theme`)

### Fichiers / Structure
```
src/
├── api/           # 1 fichier par domaine (auth.api.ts, tasks.api.ts…)
├── hooks/         # 1 fichier par domaine (useTasks.ts, useCourses.ts…)
├── components/    # Dossier par composant complexe (SyncStatus/, Works/)
├── pages/         # 1 dossier par route (Dashboard/, Courses/, Works/…)
├── stores/        # 1 fichier par store (authStore.ts, syncStore.ts)
├── types/         # index.ts unique pour tous types domaine
├── utils/         # Fonctions pures réutilisables
└── sync/          # Logique sync offline (offlineCaches.ts, useNetworkSync.ts)
```

---

## Linting & Formatting

### ESLint (`eslint.config.js`)
- `typescript-eslint` (recommended + strict)
- `eslint-plugin-react-hooks` (exhaustive-deps)
- `eslint-plugin-react-refresh` (HMR)
- Règles custom : pas de `console.log` en prod, imports ordonnés

### Commandes
```bash
npm run lint        # Vérifie tout le projet
npm run lint -- --fix  # Auto-fix ce qui est possible
```

### Prettier (recommandé)
Config implicite via ESLint. Formatter à la sauvegarde (VS Code) :
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

---

## Tests (à mettre en place)

### Stack suggérée
- **Vitest** : unit/integration (rapide, compatible Vite)
- **React Testing Library** : composants
- **MSW (Mock Service Worker)** : mock API pour tests intégration
- **Playwright** : E2E (critiques : auth, sync offline, PWA install)

### Structure
```
tests/
├── unit/
│   ├── hooks/         # useTasks, useCourses, useNetworkSync…
│   ├── stores/        # authStore, syncStore (coalescing, dead-letter)
│   ├── sync/          # offlineCaches (remap, insert, remove)
│   └── utils/         # accountScope, deviceId
├── integration/
│   ├── api/           # client interceptors (offline, 401, refresh)
│   └── sync/          # flux complet offline → online
└── e2e/
    ├── auth.spec.ts
    ├── offline.spec.ts
    └── pwa.spec.ts
```

### Couverture cible
- **Stores + sync logic** : 90%+ (coeur métier offline)
- **Hooks React Query** : 80% (mutations, invalidation)
- **Utils** : 100% (fonctions pures)
- **Composants UI** : 50% (snapshot + interactions clés)

---

## Développement Local

### Prérequis
- Node.js 20+ (LTS)
- npm 10+
- Backend API accessible (`VITE_API_URL` dans `.env`)

### Setup
```bash
git clone <repo>
cd StudyFlow
cp .env.example .env
# Éditer .env → VITE_API_URL
npm install
npm run dev
```

### Debugging
- **React Query DevTools** : ouvert par `Shift+Ctrl+Alt+D` (dev only)
- **Sync Status** : composant `SyncStatus` dans header (indicateur visuel)
- **IndexedDB** : DevTools Application → IndexedDB → `studyflow-offline`
- **Service Worker** : DevTools Application → Service Workers
- **Console** : logs préfixés `[sync]`, `[sw]`, `[auth]`

### Variables utiles `.env`
```env
VITE_API_URL=https://api.studyflow.app
# Optionnel : forcer mode dev pour SW
# VITE_SW_DEBUG=true
```

---

## Build & Déploiement

### Build Production
```bash
npm run build
# Sortie dans dist/
# Inclut : manifest.webmanifest, sw.js, registerSW.js, assets hashés
```

### Vérifications pre-deploy
```bash
npm run lint
npm run build
npm run preview  # Test local du build
```

### Déploiement PWA
- Servir `dist/` via HTTPS (requis pour SW + Push)
- Headers recommandés :
  ```
  Service-Worker-Allowed: /
  Cache-Control: public, max-age=31536000, immutable  # pour assets hashés
  Cache-Control: no-cache  # pour index.html, manifest, sw.js
  ```
- Vérifier : `https://www.pwabuilder.com/` ou Lighthouse PWA

### Variables build
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Injectée dans bundle (import.meta.env) |

---

## Ajout d'une Nouvelle Fonctionnalité (Checklist)

### 1. Types (`src/types/index.ts`)
- [ ] Ajouter enums/modèles
- [ ] Exporter types

### 2. API (`src/api/feature.api.ts`)
- [ ] Créer client (axios + unwrapApiData)
- [ ] Typer request/response
- [ ] Exporter `featureApi` object

### 3. Hooks (`src/hooks/useFeature.ts`)
- [ ] Query keys constants
- [ ] `useFeature` (query liste)
- [ ] `useFeatureDetail(id)` si nécessaire
- [ ] `useCreateFeature` / `useUpdateFeature` / `useDeleteFeature`
- [ ] Pattern optimistic + offline (copier `useTasks.ts`)
- [ ] `buildOptimisticFeature` helper
- [ ] Tests unitaires hooks

### 4. Sync (`src/sync/offlineCaches.ts`)
- [ ] Ajouter `Entity` dans `rootKeyByEntity`
- [ ] Vérifier `SyncEntity` type dans `deviceId.ts`

### 5. Store Sync (`src/stores/syncStore.ts`)
- [ ] `entity` dans type `SyncAction.entity` union
- [ ] Coalescing géré automatiquement (générique)

### 6. Pages (`src/pages/Feature/`)
- [ ] `FeaturePage.tsx` (lazy-loaded)
- [ ] Composants dans `components/`
- [ ] Route dans `router/index.tsx`

### 7. Navigation (`src/layouts/AppLayout.tsx`)
- [ ] Ajouter item dans `navItems` ou `bottomNavItems`
- [ ] Icône Material Symbols

### 8. Documentation
- [ ] Mettre à jour `API.md` (endpoints, types, hooks)
- [ ] Mettre à jour `ARCHITECTURE.md` si nouveau pattern
- [ ] Mettre à jour `README.md` si feature visible utilisateur

---

## Dépannage Courant

### "Hydration mismatch" / "Text content does not match"
- Cause : rendu serveur vs client différent (date, random, localStorage)
- Fix : `useEffect` pour lecture localStorage, ou `suppressHydrationWarning`

### "QueryClient not found" dans composant
- Cause : composant en dehors de `PersistQueryClientProvider`
- Fix : vérifier `main.tsx` arborescence

### Mutations ne se sync pas au retour online
- Vérifier : `useNetworkSync()` appelé dans `AppLayout.tsx`
- Vérifier : `navigator.onLine` events (onglet visible)
- Vérifier : SW `sync` event (DevTools → Application → Service Workers → "Sync" trigger)

### IndexedDB "QuotaExceededError"
- Cause : cache trop gros (beaucoup d'entités + pièces jointes futures)
- Fix : implémenter `gcTime` plus court, pagination, nettoyage manuel

### Refresh token loop (logout immédiat)
- Cause : cookie `refreshToken` non envoyé (domaine, SameSite, Secure)
- Fix : vérifier backend CORS + cookie settings, HTTPS en prod

---

## Release Process

### Versioning
[SemVer](https://semver.org/) : `MAJOR.MINOR.PATCH`
- `PATCH` : fixes, deps, docs
- `MINOR` : features rétrocompatibles
- `MAJOR` : breaking changes (API, types, schema DB)

### Étapes
1. `git checkout main && git pull`
2. `npm version patch|minor|major` (met à jour package.json + tag git)
3. `git push origin main --tags`
4. CI/CD build + deploy auto (configurer selon plateforme)
5. Générer changelog (optionnel : `conventional-changelog`)

---

## Code Review Guidelines

### Reviewer vérifie
- [ ] Types TypeScript corrects (pas de `any`, inférence ok)
- [ ] Pattern optimistic/offline respecté
- [ ] Query keys cohérentes
- [ ] Pas de console.log / debugger
- [ ] Lint passe
- [ ] Tests ajoutés (unit + integration pour logique critique)
- [ ] Documentation mise à jour (API.md, README.md si UI)
- [ ] Pas de régression visuelle (storybook ou preview)

### Auteur facilite
- PR petite (< 400 lignes si possible)
- Description claire : contexte, solution, test manuel
- Screenshots/GIF pour changements UI
- Commits atomiques (pas de "wip", "fix lint")

---

## Ressources

- [TanStack Query v5 Docs](https://tanstack.com/query/latest)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [React Router v7 Docs](https://reactrouter.com/)
- [Workbox Docs](https://developer.chrome.com/docs/workbox/)
- [Web Push Protocol](https://tools.ietf.org/html/rfc8030)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)