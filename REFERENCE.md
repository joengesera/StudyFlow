## Vue d’ensemble du projet

Il s’agit d’une application **React + TypeScript** (Vite) qui fonctionne comme un **assistant académique** : gestion de cours, emplois du temps, tâches, notes, livrables et analyse de risque.  

L’architecture utilise :

| Niveau | Technologie |
|--------|--------------|
| **UI** | Tailwind CSS + DaisyUI (styles, modaux, badges, etc.) |
| **État global** | **Zustand** (`authStore`, `syncStore`) |
| **Gestion des données** | **React‑Query** (`@tanstack/react-query`) pour le cache, l’invalidation et les requêtes asynchrones |
| **Persistances** | **Zustand‑persist** (localStorage) pour le token d’authentification et la file d’attente hors‑ligne |
| **Routage** | `react‑router-dom` via un router Vite, avec `ProtectedRoute` qui redirige les non‑autorisés |
| **API** | `axios` encapsulé dans `src/api/client.ts` : interceptors pour le token d’accès, rafraîchissement automatique, et gestion des erreurs/offline |
| **Date** | `date‑fns` (français) pour le formatage, calculs de semaines/mois, etc. |
| **Fonctionnalités hors‑ligne** | Interceptor qui met les mutations **POST/PUT/PATCH/DELETE** en file (`syncStore`) quand le réseau est absent, puis `useNetworkSync` les rejoue dès que la connexion revient. |


---

## Principaux dossiers et leurs responsabilités

### `src/api/`

- **client.ts** – Crée deux instances `axios`: `apiClient` (authentifié) et `refreshClient` (avec cookies).  
  - Ajoute le header `Authorization` à chaque requête.  
  - Intercepte les erreurs : si 401 → rafraîchit le token, sinon normalise les réponses d’erreur.  
  - En mode hors‑ligne, stocke les mutations dans `syncStore` et renvoie une réponse factice pour que l’UI reste réactive (optimistic UI).

- **auth.api.ts** – Endpoints d’authentification (`login`, `register`, `logout`, `forgotPassword`, `resetPassword`).

- **course.api.ts**, **event.api.ts**, **grade.api.ts**, **risk.api.ts**, **task.api.ts**, **works.api.ts** – CRUD simples vers les ressources correspondantes (GET, POST, PATCH, DELETE).  
  - Chaque fonction utilise `apiClient` et `unwrapApiData` pour ne renvoyer que la donnée réelle.

### `src/hooks/`

- **useAuth.ts** – Mutations de login/registration/forgot/reset + déclenche la navigation et la mise à jour du `authStore`.  
- **useCourses.ts**, **useEvents.ts**, **useGrades.ts**, **useTasks.ts**, **useWorks.ts**, **useRisks.ts** – Hooks basés sur React‑Query qui exposent les fonctions `useQuery`, `useMutation` et la logique d’invalidation de cache.  
- **useNetworkSync.ts** – Surveille `navigator.onLine`. Quand la connexion revient, parcourt la file d’attente (`syncStore.queue`) et rejoue chaque action via `apiClient`.  
- **usePomodoro.ts** – Timer de pomodoro (25 min travail / 5 min pause) avec stockage du temps passé dans la tâche via `useUpdateTask`.  
- **useTheme.ts** – Gestion du thème clair/obscur (`lofi`/`night`) persistant dans `localStorage`.  
- **useTheme.ts** – Gère le thème de l’application en ajoutant l’attribut `data-theme` sur le `<html>`.

### `src/stores/`

- **authStore.ts** – Store Zustand persistant qui garde l’utilisateur, les tokens et le flag `isAuthenticated`. Expose les actions `login`, `logout`, `setTokens`, `updateUser`.  
- **syncStore.ts** – File d’attente pour les actions hors‑ligne : chaque action possède `id`, `method`, `url`, `payload`, `timestamp`. Fournit `enqueueAction`, `removeAction`, `clearQueue` et un flag `isSyncing`.

### `src/types/`

Définit les **interfaces TypeScript** de toutes les entités de l’application : `Task`, `Event`, `Course`, `Grade`, `Work`, `RiskAnalysis`, ainsi que les enums (statuts, priorités, niveaux de risque, etc.).

### `src/pages/`

| Page | Fonctionnalité principale |
|------|----------------------------|
| **Auth** – `LoginPage`, `RegisterPage`, `ForgotPasswordPage`, `ResetPassword` | Authentification + navigation, gestion des messages d’erreur et d’état de chargement. |
| **Dashboard** (`DashboardPage`) | Vue d’accueil : greeting, date du jour, indicateurs (moyenne générale, cours à risque), événements du jour, liste des tâches en cours (triées par priorité/urgence). |
| **Courses** – `CoursesPage`, `CourseDetailPage` | Gestion des cours (listes, création via modal, suppression). Détail du cours avec onglets : **Notes** (grades + simulateur de moyenne), **Tâches** (liste filtrée), **Événements** (affichage simple), **Risque** (analyse de risque via `useRisk`). |
| **Agenda** (`AgendaPage`) | Calendrier mensuel interactif + planner hebdomadaire. Création/édition d’événements récurrents, aperçu des créneaux, filtres par cours. |
| **Tasks** (`TaskPage`) | Kanban complet (colonnes `PENDING / IN_PROGRESS / COMPLETED / CANCELED`) avec **drag‑and‑drop** (`@dnd-kit`). Input “quick‑create” qui parse les dates et priorités, modal d’édition de tâche et widget Pomodoro à droite. |
| **Works** (`WorksPage`) | Gestion des livrables : colonnes `PLANNED / SUBMITTED / GRADED`. Création/édition via modal incluant une checklist markdown, mise à jour du statut, affichage des points obtenus. |
| **Risk** (`RiskPage`) | Analyse de risque par cours : score global, répartition des niveaux, visualisation de chaque facteur (performance, procrastination, pression) et conseils adaptés. |
| **Profile** (`ProfilePage`) | Gestion du profil : édition des infos personnelles, changement de mot de passe, paramètres de notification, statistiques du compte, installation PWA, zone de suppression du compte. |
| **AppLayout** (`AppLayout.tsx`) | Structure principale : sidebar rétractable, top‑bar avec date, indicator offline/sync, toggle thème, navigation via `NavLink`. Wrappe toutes les pages protégées. |

### `src/router/`

- **router/index.tsx** – Déclare le `createBrowserRouter` avec routes publiques (login/inscription) et un groupe protégé (`ProtectedRoute`). Toutes les pages protégées sont imbriquées sous `AppLayout` via `<Outlet />`.  
- **ProtectedRouter.tsx** – Vérifie `authStore.isAuthenticated` ; redirige vers `/login` si l’utilisateur n’est pas connecté.

### `src/components/`

- **Courses/CourseFormModal.tsx** – Modal de création/édition de cours : saisie du nom, code, crédits, couleur, option “ajouter à l’emploi du temps” avec création de **slots** (CM/TD/TP), génération d’évènements récurrents (15 semaines) dans le calendrier.  
  - Affiche un aperçu des créneaux sous forme de badges.

### `src/api/client.ts` – Détails importants

1. **Intercepteur de requête** : injecte le `Authorization` Bearer token.  
2. **Intercepteur de réponse** :  
   - **Offline** : si aucune réponse et “Network Error” ou l’utilisateur est offline, les mutations POST/PUT/PATCH/DELETE sont enfilées dans `syncStore` et une réponse factice (`{ success:true, offline:true, _temporaryId:… }`) est renvoyée.  
   - **401** : rafraîchit le token avec le `refreshClient`; en cas d’échec, déconnecte l’utilisateur.  
   - **Gestion d’erreur normalisée** via `normalizeErrorPayload`.

### Gestion du **offline / synchronisation**

- **Enregistrement** : chaque mutation qui échoue faute de réseau est stockée dans `syncStore`.  
- **Re‑exécution** : `useNetworkSync` détecte le retour en ligne et rejoue séquentiellement chaque action. En cas d’erreur 400 + (bad‑request) on supprime l’action pour éviter une boucle infinie.

---

## Flux typique d’utilisation

1. **Connexion** – L’utilisateur se connecte (`/login`). Le token d’accès est stocké dans le `authStore` et inséré dans chaque requête `apiClient`.  
2. **Dashboard** – Après redirection (`/dashboard`) le UI charge :  
   - Tâches (`useTasks`) ;  
   - Événements du jour (`useEvents`).  
   - Moyenne générale (`useGrades`).  
   - Indicateurs de connexion : badge offline ou sync en cours.  
3. **Gestion des cours** – `/courses` affiche la grille des cours. Le bouton “+” ouvre `CourseFormModal` ; la création crée d’abord le cours via `useCreateCourse`, puis (si coché) génère les créneaux d’emploi du temps et crée les événements correspondants (`useCreateEvent`).  
4. **Détails d’un cours** – `/courses/:id` montre les onglets : notes (CRUD des grades), tâches liées, événements liés, risque. Les mutations sont optimistes (ex. `useUpdateTask` dans le tableau de tâches).  
5. **Agenda** – `/agenda` propose deux vues : calendrier mensuel (avec preview de créneaux) et planner hebdomadaire. Les événements sont créés via le modal `CreateEventModal`, incluant la réplication hebdomadaire.  
6. **Tâches Kanban** – `/tasks` montre les colonnes de statut, drag‑and‑drop (déplacement entre colonnes met à jour le statut, ré‑ordonnancement met à jour la `position`). Le Pomodoro widget se synchronise avec la tâche active et met à jour `timeSpentMinutes`.  
7. **Livrables** – `/works` propose la même logique Kanban pour les projets : création/édition via `WorkModal` avec checklist markdown.  
8. **Analyse de risque** – `/risk` récupère le `riskApi` pour chaque cours, calcule le score global, affiche des barres de niveau et des conseils.  
9. **Profil** – `/profile` permet de mettre à jour le nom/email, changer le mot de passe, configurer les notifications, installer l’application PWA, ou supprimer le compte (placeholder).  

---

## Points forts du code

- **Modularité** : chaque ressource (course, event, grade, task, work, risk) possède son *api*, ses *hooks* et ses *pages* dédiés.  
- **Gestion avancée du token** : rafraîchissement transparent, stockage persistant.  
- **Mode hors‑ligne** complet : que les mutations soient en file d’attente, que la synchronisation soit déclenchée automatiquement.  
- **UX fluide** : Loading spinners, skeletons, optimistic UI, modaux, drag‑and‑drop, pomodoro intégré, preview d’évènements.  
- **Thématisation et PWA** : switch thème, installation PWA, adaptation iOS.  
- **Internationalisation légère** via `date-fns` locale `fr`.  

---

## En résumé

L’application est un **assistant académique** tout‑en‑un :

- **Auth** (login/inscription, mot de passe oublié/réinitialisation)  
- **Dashboard** : aperçu rapide des tâches, événements, moyennes, risques.  
- **Gestion de cours** : création, édition, suppression, génération d’évènements récurrents.  
- **Calendrier** : vue mensuelle/hebdomadaire, création d’évènements récurrents.  
- **Gestion des livrables** (works) : suivi des projets, états, notes.  
- **Gestion des notes** : saisie, moyenne pondérée, simulateur de moyenne.  
- **Gestion des tâches** : Kanban, drag‑and‑drop, pomodoro.  
- **Analyse de risque** : scoring basé sur notes, tâches et pression d’examen.  
- **Profil** : édition du compte, sécurité, notifications, installation PWA.  

Tout cela repose sur **React**, **React‑Query**, **Zustand**, **Tailwind/DaisyUI** et une **API REST** avec gestion avancée du token et du mode hors‑ligne.
