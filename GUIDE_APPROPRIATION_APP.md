# Guide d'appropriation - StudentApp / StudyFlow

Ce document t'aide a prendre la main sur le projet sans dependre de l'IA.
Objectif: comprendre la structure, les flux, la logique metier, et savoir ou coder chaque evolution.

## 1. Vue d'ensemble rapide

L'application est un "assistant academique" avec ces blocs metier:
- Authentification (register/login/reset password)
- Cours
- Taches (Kanban + Pomodoro)
- Agenda (events)
- Notes (grades + moyennes)
- Analyse de risque academique
- Profil utilisateur
- Synchronisation offline/online (backend)

Architecture generale:
- Frontend: React + TypeScript + React Router + TanStack Query + Zustand
- Backend: Express + TypeScript + Prisma + PostgreSQL
- Auth: JWT access + refresh token persiste en DB

## 2. Arborescence mentale du code

### Frontend
- `src/main.tsx`: bootstrap React + QueryClient + RouterProvider
- `src/router/index.tsx`: declaration des routes publiques/protegees
- `src/router/ProtectedRouter.tsx`: garde d'auth via Zustand
- `src/layouts/AppLayout.tsx`: shell app (sidebar + topbar + Outlet)
- `src/stores/authStore.ts`: session utilisateur/tokens persistes
- `src/api/*.ts`: couche HTTP (axios)
- `src/hooks/*.ts`: logique data (queries/mutations)
- `src/pages/**`: pages metier
- `src/types/index.ts`: contrats TS du domaine

### Backend
- `src/index.ts`: demarrage serveur
- `src/app.ts`: middlewares, CORS, rate-limit, montage des routes
- `src/routes/*.ts`: mapping endpoint -> controller
- `src/controllers/*.ts`: orchestration HTTP
- `src/services/*.ts`: logique metier
- `src/lib/db.ts`: client Prisma
- `prisma/schema.prisma`: modele de donnees

## 3. Flux principal de donnees

1. Une page appelle un hook (`useTasks`, `useCourses`, etc.).
2. Le hook appelle une API frontend (`tasksApi`, `coursesAPI`, ...).
3. API frontend utilise `apiClient` (`src/api/client.ts`).
4. `apiClient` ajoute automatiquement le Bearer token (depuis `auth-storage`).
5. Si `401`, interceptor tente `POST /auth/refresh-token`, met a jour le token, puis rejoue la requete.
6. Le backend verifie le JWT (`authenticateToken`) puis execute controller/service.
7. Prisma lit/ecrit PostgreSQL.
8. React Query met a jour le cache (invalidateQueries ou update optimiste).

## 4. Domaines metier et fichiers a connaitre

### 4.1 Auth
Frontend:
- `src/stores/authStore.ts`
- `src/hooks/useAuth.ts`
- `src/api/auth.api.ts`
- `src/pages/Auth/*`

Backend:
- `src/routes/auth.routes.ts`
- `src/controllers/AuthController.ts`
- `src/services/AuthServices.ts`

Logique:
- Login/register stocke `user + tokens` dans Zustand persiste.
- Refresh token stocke en DB (`refresh_tokens`) avec rotation.
- Password reset: token random hash en DB + email reset.

### 4.2 Cours
Frontend:
- `src/api/course.api.ts`
- `src/hooks/useCourses.ts`
- `src/pages/Courses/CoursesPage.tsx`
- `src/pages/Courses/CoursesDetailPage.tsx`

Backend:
- `src/routes/course.routes.ts`
- `src/controllers/CourseController.ts`
- `src/services/courseWorkTypeService.ts`

Logique:
- Soft delete (`isDeleted`) cote cours.
- Gestion des "work types" par cours (EXAMEN, TP, etc.) avec contraintes.

### 4.3 Taches + Kanban + Pomodoro
Frontend:
- `src/api/tasks.api.ts`
- `src/hooks/useTasks.ts`
- `src/hooks/usePomodoro.ts`
- `src/pages/Tasks/TaskPage.tsx`
- `src/pages/Dashboard/DashboardPage.tsx`

Backend:
- `src/routes/task.routes.ts`
- `src/controllers/TaskController.ts`
- `src/services/TaskService.ts`

Logique:
- Colonnes Kanban par `status`.
- Drag-and-drop pour changer statut/position.
- Pomodoro incrimente `timeSpentMinutes`.
- Sessions de focus tracees en `TaskSession`.

### 4.4 Agenda (events)
Frontend:
- `src/api/events.api.ts`
- `src/hooks/useEvents.ts`
- `src/pages/Agenda/AgendaPage.tsx`

Backend:
- `src/routes/event.routes.ts`
- `src/controllers/EventController.ts`
- `src/services/EventService.ts`

Logique:
- Evenements type cours/exam/revision/etc.
- Option backend pour generer des taches templates a la creation d'un event.

### 4.5 Notes / Moyennes
Frontend:
- `src/api/grade.api.ts`
- `src/hooks/useGrades.ts`
- `src/pages/Courses/CoursesDetailPage.tsx` (onglet Notes)

Backend:
- `src/routes/grade.routes.ts`
- `src/controllers/GradeController.ts`
- `src/services/GradeService.ts`
- `src/services/PointsEngineService.ts`

Logique:
- Notes heterogenes normalisees /20.
- Moyennes ponderation mixte (pourcentage explicite + repartition auto par type).

### 4.6 Risque academique
Frontend:
- `src/api/risk.api.ts`
- `src/hooks/useRisks.ts`
- `src/pages/Risk/RiskPage.tsx`
- `src/pages/Courses/CoursesDetailPage.tsx` (onglet Risque)

Backend:
- `src/routes/risk.routes.ts`
- `src/controllers/RiskController.ts`
- `src/services/RiskService.ts`

Logique:
- Score global 0-100 = performance + procrastination + pression examen.
- Niveau derive: LOW / MEDIUM / HIGH / CRITICAL.

### 4.7 Profil
Frontend:
- `src/pages/Profile/ProfilePage.tsx`
- `src/api/client.ts`

Backend:
- `src/routes/profile.routes.ts`
- `src/controllers/ProfileController.ts`

Logique:
- `GET /api/profile`
- `PUT /api/updateprofile`

### 4.8 Sync (important pour evolution mobile/offline)
Backend:
- `src/routes/sync.routes.ts`
- `src/controllers/SyncController.ts`
- `src/services/*SyncService.ts`

Logique:
- Push/Pull par entite (Task/Event/Grade/Work/Course)
- Historique sync en DB (`SyncHistory`)
- Gestion version/syncStatus/localId

## 5. Modele de donnees (Prisma) a memoriser

Fichier source: `../backend/prisma/schema.prisma`

Entites coeur:
- `User`
- `Course`
- `Task` + `TaskSession`
- `Event`
- `Grade`
- `Work`
- `CourseWorkType`
- `RefreshToken`
- `SyncHistory`

Enums cle:
- `TaskStatus`, `TaskPriority`
- `EventType`
- `WorkType`, `WorkStatus`
- `SyncStatus`
- `Role`

Patterns:
- Soft delete sur `Course` et `Task`
- Champs sync (`localId`, `version`, `syncStatus`, `lastModifiedAt`)

## 6. Incoherences / dette technique observee (priorites)

### P0 - Build frontend casse
- Fichier: `src/pages/Risk/RiskPage.tsx`
- Probleme: `GlobalRiskSummary` et `GlobalTips` utilises mais non definis.
- Impact: `npm run build` frontend echoue.

### P0 - Contrat API front/back incoherent
- Front attend majoritairement `data.data` (wrapper uniforme).
- Plusieurs controllers backend renvoient `res.json(...)` brut.
- Exemple: `CourseController`, `TaskController`, `EventController`, `GradeController`.
- Impact: `undefined` cote frontend selon endpoint.

### P1 - Routes frontend partiellement desactivees
- `src/router/index.tsx`: pages `courses/agenda/tasks/risk/profile` commentees.
- AppLayout affiche ces liens mais router actif expose surtout `dashboard`.

### P1 - Erreur potentielle forgot-password
- `src/hooks/useAuth.ts`: expose `forgotPasswordMutation.mutate` (non Promise).
- `src/pages/Auth/ForgotPasswordPage.tsx`: utilise `await forgotPassword(email)`.
- Impact: gestion erreurs/succes non fiable.

### P1 - Incoherence nommage import page cours detail
- Fichier existant: `CoursesDetailPage.tsx`
- Route commentee reference: `CourseDetailPage`.
- A corriger avant reactivation route.

### P2 - Styling possiblement incomplet
- Classes Tailwind/DaisyUI tres utilisees.
- Verifier integration Tailwind v4 effective (`@import "tailwindcss"` + plugin Vite).

### P2 - Hygiene secrets
- Le `.env` backend contient des secrets en clair.
- Action recommandee: rotation + variables securisees hors repo.

## 7. Strategie pour reprendre le dev sans IA

### Etape 1 - Stabiliser le socle
1. Corriger `RiskPage` (noms composants).
2. Choisir un contrat API unique:
   - Option A: tout backend via `sendSuccess/sendError`
   - Option B: front tolere les 2 formats (transition).
3. Reactiver progressivement routes frontend commentees.

### Etape 2 - Mettre des garde-fous
1. Tests backend deja presents dans `src/services/__tests__`.
2. Ajouter tests frontend critiques (auth + routing protege + hooks data).
3. Ajouter checks CI (`build` front + back, lint, tests).

### Etape 3 - Evoluer par verticale
Toujours developper par tranche complete:
- migration Prisma
- service backend
- route/controller
- API frontend
- hook React Query
- UI/page
- tests

## 8. Plan de lecture conseille (ordre d'appropriation)

1. `src/stores/authStore.ts`
2. `src/api/client.ts`
3. `src/router/index.tsx` + `src/layouts/AppLayout.tsx`
4. `src/hooks/useTasks.ts` + `src/pages/Tasks/TaskPage.tsx`
5. `../backend/src/app.ts`
6. `../backend/src/routes/task.routes.ts`
7. `../backend/src/controllers/TaskController.ts`
8. `../backend/src/services/TaskService.ts`
9. `../backend/prisma/schema.prisma`
10. Puis modules `grades`, `risk`, `sync`

## 9. Commandes utiles (local)

Frontend:
```bash
cd frontend
npm install
npm run dev
npm run build
```

Backend:
```bash
cd backend
npm install
npm run generate
npm run dev
npm run build
npm test
```

## 10. Ressources pour monter en competence (apres lecture du code)

React Router:
- https://reactrouter.com/en/main/start/overview

TanStack Query:
- https://tanstack.com/query/latest/docs/framework/react/overview

Zustand:
- https://zustand.docs.pmnd.rs/getting-started/introduction

Axios interceptors:
- https://axios-http.com/docs/interceptors

Dnd Kit:
- https://docs.dndkit.com/

Prisma:
- https://www.prisma.io/docs

Zod:
- https://zod.dev/

Express (routing + middleware):
- https://expressjs.com/

JWT best practices:
- https://datatracker.ietf.org/doc/html/rfc7519
- https://owasp.org/www-project-cheat-sheets/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html

## 11. Ce que tu dois retenir

Si tu bloques, pose toi ces 3 questions:
1. "Mon changement impacte quel domaine metier?"
2. "Le contrat front/back est-il coherent pour cette route?"
3. "Ai-je pense cache React Query + schema Prisma + validation backend?"

Avec cette grille, tu peux continuer le projet de maniere autonome et propre.
