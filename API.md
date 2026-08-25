# API Reference

## Base URL
```
VITE_API_URL (ex: https://api.studyflow.app)
```

## Authentification
- **Access Token** : JWT, courte durée, envoyé header `Authorization: Bearer <token>`
- **Refresh Token** : Cookie httpOnly `refreshToken` (domaine API, `Secure; SameSite=Lax`)
- **Flow** :
  1. Login/Register → `accessToken` dans réponse + cookie `refreshToken`
  2. Requêtes authentifiées → header `Authorization`
  3. 401 → intercepteur appelle `POST /auth/refresh-token` (cookie envoyé auto)
  4. Nouveau `accessToken` stocké en mémoire, requête rejouée
  5. Échec refresh → logout + redirect `/login`

## Endpoints

### Auth
| Méthode | Endpoint | Body | Réponse |
|---------|----------|------|---------|
| POST | `/auth/register` | `{ email, name, password }` | `{ user, accessToken }` |
| POST | `/auth/login` | `{ email, password }` | `{ user, accessToken }` |
| POST | `/auth/logout` | — | `{ message }` |
| POST | `/auth/forgot-password` | `{ email }` | `{ message }` |
| POST | `/auth/reset-password` | `{ token, newPassword }` | `{ message }` |
| POST | `/auth/refresh-token` | — (cookie) | `{ accessToken }` |

### Courses
| Méthode | Endpoint | Body / Params | Réponse |
|---------|----------|---------------|---------|
| GET | `/courses` | — | `Course[]` |
| GET | `/courses/:id` | — | `Course` |
| POST | `/courses` | `Partial<Course>` (id optionnel) | `Course` |
| PATCH | `/courses/:id` | `Partial<Course>` | `Course` |
| DELETE | `/courses/:id` | — | `{ success: true }` |
| GET | `/courses/:id/work-types` | — | `WorkType[]` |

### Tasks
| Méthode | Endpoint | Body / Params | Réponse |
|---------|----------|---------------|---------|
| GET | `/tasks` | — | `Task[]` |
| GET | `/tasks/board` | — | `Task[]` (ordonnées par position) |
| POST | `/tasks` | `Partial<Task>` (id optionnel) | `Task` |
| PATCH | `/tasks/:id` | `Partial<Task>` | `Task` |
| DELETE | `/tasks/:id` | — | `{ success: true }` |

### Events
| Méthode | Endpoint | Body / Params | Réponse |
|---------|----------|---------------|---------|
| GET | `/events` | — | `Event[]` |
| POST | `/events` | `Partial<Event>` (id optionnel) | `Event` |
| PATCH | `/events/:id` | `Partial<Event>` | `Event` |
| DELETE | `/events/:id` | — | `{ success: true }` |

### Grades
| Méthode | Endpoint | Body / Params | Réponse |
|---------|----------|---------------|---------|
| GET | `/grades` | `?courseId=` (optionnel) | `Grade[]` |
| GET | `/grades/average/:courseId` | — | `{ average: number }` |
| POST | `/grades` | `Partial<Grade>` (id optionnel) | `Grade` |
| PATCH | `/grades/:id` | `Partial<Grade>` | `Grade` |
| DELETE | `/grades/:id` | — | `{ success: true }` |

### Works
| Méthode | Endpoint | Body / Params | Réponse |
|---------|----------|---------------|---------|
| GET | `/works` | — | `Work[]` |
| POST | `/works` | `Partial<Work>` (id optionnel) | `Work` |
| PATCH | `/works/:id` | `Partial<Work>` | `Work` |
| DELETE | `/works/:id` | — | `{ success: true }` |

### Risk
| Méthode | Endpoint | Body / Params | Réponse |
|---------|----------|---------------|---------|
| GET | `/risk/course/:courseId` | — | `RiskAnalysis` |

### Sync (Offline)
| Méthode | Endpoint | Body | Réponse |
|---------|----------|------|---------|
| POST | `/sync/push` | `SyncAction` | `{ entity: { id: string } }` |

**Headers requis** :
- `Authorization: Bearer <accessToken>`
- `Idempotency-Key: <action.id>` (UUID unique par mutation)

**SyncAction** :
```typescript
{
  id: string;                    // UUID unique (clé idempotence)
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  entity: 'Task' | 'Event' | 'Grade' | 'Work' | 'Course' | 'Unknown';
  data: Record<string, unknown>; // Payload complet (inclut id = localId)
  deviceId: string;              // Fingerprint navigateur
  timestamp: number;             // Date.now()
  localId?: string;              // Id local si CREATE
  attempts?: number;             // Compteur retry (persisté)
}
```

**Réponse succès** :
```json
{ "data": { "entity": { "id": "server-uuid" } } }
```
Le frontend fait `remapLocalIdInCaches(entity, localId, serverId)`.

---

## Types Partagés (src/types/index.ts)

### Enums
```typescript
type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
type EventType = 'CLASS' | 'EXAM' | 'EXAMEN' | 'INTERRO' | 'TP' | 'QUIZ' | 'ASSIGNMENT' | 'STUDY' | 'AUTRE' | 'PERSONAL' | 'MEETING';
type WorkStatus = 'PLANNED' | 'SUBMITTED' | 'GRADED' | 'CANCELLED';
type WorkType = 'EXAMEN' | 'INTERRO' | 'PROJET' | 'TD' | 'TP' | 'EXERCICES';
type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
type SyncStatus = 'PENDING' | 'SYNCED' | 'CONFLICT';
```

### Modèles
```typescript
interface Task {
  id: string;
  localId?: string | null;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string | null;
  completedAt?: string | null;
  courseId?: string | null;
  eventId?: string | null;
  durationMinutes?: number | null;
  timeSpentMinutes: number;
  position: number;
  startedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  version: number;
  syncStatus: SyncStatus;
  isDeleted: boolean;
}

interface Event {
  id: string;
  localId?: string | null;
  title: string;
  description?: string | null;
  type: EventType;
  startDate: string;
  endDate: string;
  isAllDay: boolean;
  location?: string | null;
  courseId?: string | null;
  createdAt?: string;
  updatedAt?: string;
  version: number;
  syncStatus: SyncStatus;
}

interface Course {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  color: string;
  credits?: number | null;
  userId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  syncStatus: SyncStatus;
}

interface Grade {
  id: string;
  localId?: string | null;
  name: string;
  score: number;
  maxScore: number;
  percentage?: number | null;
  weight?: number | null;
  workTypeLabel?: string | null;
  workId?: string | null;
  date?: string | null;
  comment?: string | null;
  courseId: string;
  workTypeId?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Work {
  id: string;
  localId?: string | null;
  title: string;
  description?: string | null;
  status: WorkStatus;
  dueDate?: string | null;
  submittedAt?: string | null;
  gradedAt?: string | null;
  pointsEarned?: number | null;
  pointsPossible: number;
  percentage?: number | null;
  comment?: string | null;
  courseId: string;
  eventId?: string | null;
  workTypeId?: string | null;
  workTypeLabel?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface RiskAnalysis {
  courseId: string;
  courseName: string;
  overallScore: number;
  level: RiskLevel;
  details: {
    performance: number;
    procrastination: number;
    pressure: number;
  };
}
```

---

## Hooks React Query (Client)

### Query Keys
```typescript
// Tasks
taskKeys = { all: ['tasks'], board: ['tasks', 'board'] }

// Courses
courseKeys = { all: ['courses'], one: (id) => ['courses', id] }

// Events
eventKeys = { all: ['events'] }

// Grades
gradeKeys = { all: ['grades'], byCourse: (id) => ['grades', 'course', id], average: (id) => ['grades', 'average', id] }

// Works
workKeys = { all: ['works'] }

// Risk
riskKeys = { course: (id) => ['risk', id] }
```

### Queries
| Hook | Key | StaleTime | Description |
|------|-----|-----------|-------------|
| `useTasks()` | `['tasks']` | 30s | Liste tâches |
| `useBoardTasks()` | `['tasks','board']` | — | Kanban (position) |
| `useCourses()` | `['courses']` | 30s | Liste cours |
| `useCourse(id)` | `['courses', id]` | — | Détail cours |
| `useCourseWorkTypes(courseId)` | `['courses', id, 'work-types']` | — | Types travaux |
| `useEvents()` | `['events']` | 30s | Liste événements |
| `useGrades(courseId?)` | `['grades']` ou `['grades','course',id]` | — | Notes (filtrées) |
| `useCourseAverage(courseId)` | `['grades','average',id]` | — | Moyenne pondérée |
| `useWorks()` | `['works']` | — | Liste travaux |
| `useRisk(courseId)` | `['risk', id]` | — | Analyse risque API |
| `useDashboardStats(grades, courses)` | — (memo) | — | Stats locales (moyenne globale, cours à risque) |

### Mutations (toutes optimistes + offline)

#### Pattern commun
```typescript
// CREATE
useCreateX() → mutationFn(payload) {
  localId = payload.id ?? crypto.randomUUID();
  insertEntityInCaches(queryClient, 'Entity', buildOptimisticEntity(localId, payload));
  return api.create({ ...payload, id: localId });
},
onSuccess: (created) => {
  if (isOfflineMutationResult(created)) return; // garde optimiste
  queryClient.invalidateQueries({ queryKey: entityKeys.all });
}

// UPDATE
useUpdateX() → onMutate: cache snapshot + setQueryData optimiste
onError: rollback snapshot
onSettled: invalidate

// DELETE
useDeleteX() → mutationFn: removeEntityFromCaches + api.delete
onSettled: invalidate
```

#### Hooks disponibles
| Domaine | Create | Update | Delete |
|---------|--------|--------|--------|
| Tasks | `useCreateTask()` | `useUpdateTask()` | `useDeleteTask()` |
| Courses | `useCreateCourse()` | `useUpdateCourse()` | `useDeleteCourse()` |
| Events | `useCreateEvent()` | `useUpdateEvent()` | `useDeleteEvent()` |
| Grades | `useCreateGrade()` | `useUpdateGrade()` | `useDeleteGrade()` |
| Works | `useCreateWork()` | `useUpdateWork()` | `useDeleteWork()` |

#### Retour mutations
```typescript
// Succès en ligne
{ data: Entity } // Entity avec id serveur

// Succès hors ligne (intercepteur axios)
{ success: true, offline: true, _temporaryId: "local-uuid" }
// → isOfflineMutationResult() = true
// → UI garde l'entrée optimiste, sync se chargera du remap
```

---

## Gestion Erreurs

### Format erreur backend
```json
{
  "success": false,
  "error": {
    "message": "Description lisible",
    "code": "ERROR_CODE"
  }
}
```

### Codes courants
| Code | Signification | Gestion client |
|------|---------------|----------------|
| `VALIDATION_ERROR` | Body invalide (Zod) | Afficher message champ par champ |
| `UNAUTHORIZED` | Token expiré/invalide | Intercepteur gère refresh auto |
| `FORBIDDEN` | Pas droit sur ressource | Toast erreur, pas de retry |
| `NOT_FOUND` | Entité inexistante | Retirer du cache (delete) |
| `CONFLICT` | Conflit version/état | Dead-letter queue (UI retry) |
| `RATE_LIMITED` | Trop de requêtes | Backoff exponentiel |

### Intercepteur axios (`client.ts`)
- **Offline** : network error → queue mutation + réponse `{ success: true, offline: true }`
- **401** : single-flight refresh → retry requête originale
- **4xx** : normalize payload → dead-letter si mutation sync
- **5xx** : retry limité (3x) dans `useNetworkSync`

---

## Sync Offline - Détails

### Flux CREATE offline
1. `useCreateTask.mutate({ title: 'TD React' })`
2. `localId = 'uuid-1'` généré
3. `insertEntityInCaches` → cache RQ `['tasks']` contient tâche optimiste (`syncStatus: 'PENDING'`)
4. `tasksApi.create({ ...payload, id: localId })`
5. **Online** : POST `/tasks` → 201 `{ id: 'server-uuid' }` → `onSuccess` → invalidate → refetch
6. **Offline** : intercepteur catch network error → `syncStore.enqueueAction({ type: 'CREATE', entity: 'Task', data: { ...payload, id: localId }, deviceId, localId })` → réponse `{ success: true, offline: true, _temporaryId: localId }`
7. Retour online → `useNetworkSync` draine queue → POST `/sync/push` avec `Idempotency-Key: action.id`
8. Backend répond `{ entity: { id: 'server-uuid' } }`
9. `remapLocalIdInCaches('Task', localId, serverId)` → cache RQ mis à jour (`id: server-uuid`, `syncStatus: 'SYNCED'`)

### Flux UPDATE offline
1. `useUpdateTask.mutate({ id: 'server-uuid', payload: { status: 'COMPLETED' } })`
2. `onMutate` : snapshot cache + `setQueryData` optimiste
3. `tasksApi.update('server-uuid', payload)`
4. **Offline** : queue `UPDATE` avec `data: { id: 'server-uuid', status: 'COMPLETED' }`
5. Retour online → `/sync/push` → backend applique → `remapLocalIdInCaches` (no-op car même id)

### Flux DELETE offline
1. `useDeleteTask.mutate('server-uuid')`
2. `removeEntityFromCaches` → retire du cache RQ
3. `tasksApi.delete('server-uuid')`
4. **Offline** : queue `DELETE` avec `data: { id: 'server-uuid' }`
5. Retour online → `/sync/push` → backend supprime

### Coalescing (exemple)
```
User offline:
  1. CREATE Task A (localId: 'l1')
  2. UPDATE Task A (status: 'IN_PROGRESS')
  3. UPDATE Task A (priority: 'HIGH')
  4. DELETE Task A

Queue finale après coalescing:
  - (CREATE + UPDATE + UPDATE + DELETE) → ANNULÉ (entité jamais créée serveur)
  → Queue vide, rien à sync
```

---

## Pagination / Filtres (côté backend)

Non implémenté côté client actuellement (toutes les listes sont chargées en totalité). Prévoir :
- `GET /tasks?page=1&limit=50&status=PENDING`
- `GET /grades?courseId=xxx&page=1&limit=100`
- Cursor-based pagination pour grosses listes

---

## Webhooks / Temps Réel (futur)

Prévu : Server-Sent Events ou WebSocket pour :
- Notifications nouvelles notes / travaux
- Sync temps réel multi-onglets
- Mise à jour collaborative (ex: planning partagé)

Actuellement : polling via `refetchOnWindowFocus: 'always'` + `refetchOnReconnect: 'always'`.