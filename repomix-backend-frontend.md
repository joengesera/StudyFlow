This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: **/.git/**, **/node_modules/**, **/dist/**, **/build/**, **/.next/**, **/coverage/**, **/repomix-backend-frontend.md, **/repomix-backend-frontend.xml, **/repomix-output.*, Bck3/**, frontendV2/**, **/*.zip
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded

# Directory Structure
```
backend/.gitignore
backend/API_ENDPOINTS.md
backend/jest.config.js
backend/package.json
backend/perf/project-load.k6.ts
backend/prisma/migrations/20251222065851_init_db/migration.sql
backend/prisma/migrations/20251231213504_init/migration.sql
backend/prisma/migrations/20260212091004_init/migration.sql
backend/prisma/migrations/20260217081309_add_course_work_types/migration.sql
backend/prisma/migrations/20260217134052_add_event_task_board_focus/migration.sql
backend/prisma/migrations/20260221160521_add_work_events_and_grade_percentage/migration.sql
backend/prisma/migrations/20260221190000_split_work_from_events/migration.sql
backend/prisma/migrations/20260306125214_add_role_and_professor/migration.sql
backend/prisma/migrations/migration_lock.toml
backend/prisma/schema.prisma
backend/src/__tests__/auth-dashboard.e2e.test.ts
backend/src/app.ts
backend/src/config/jwt.config.ts
backend/src/controllers/AuthController.ts
backend/src/controllers/CourseController.ts
backend/src/controllers/EventController.ts
backend/src/controllers/GradeController.ts
backend/src/controllers/ProfessorController.ts
backend/src/controllers/ProfileController.ts
backend/src/controllers/RiskController.ts
backend/src/controllers/SyncController.ts
backend/src/controllers/TaskController.ts
backend/src/controllers/WorkController.ts
backend/src/errors/AppError.ts
backend/src/errors/http.errors.ts
backend/src/index.ts
backend/src/lib/db.ts
backend/src/lib/prisma-extensions.ts
backend/src/middlewares/__tests__/auth.middleware.test.ts
backend/src/middlewares/auth.middleware.ts
backend/src/middlewares/error.middleware.ts
backend/src/middlewares/professor.middleware.ts
backend/src/middlewares/sanitize.middleware.ts
backend/src/middlewares/validate.middleware.ts
backend/src/repositories/professor.repository.ts
backend/src/routes/auth.routes.ts
backend/src/routes/course.routes.ts
backend/src/routes/event.routes.ts
backend/src/routes/grade.routes.ts
backend/src/routes/professor.routes.ts
backend/src/routes/profile.routes.ts
backend/src/routes/risk.routes.ts
backend/src/routes/sync.routes.ts
backend/src/routes/task.routes.ts
backend/src/routes/test.routes.ts
backend/src/routes/work.routes.ts
backend/src/scripts/fix-task-defaults.ts
backend/src/scripts/seedUsers.ts
backend/src/services/__tests__/auth.integration.test.ts
backend/src/services/__tests__/AuthService.perf.test.ts
backend/src/services/__tests__/AuthService.test.ts
backend/src/services/__tests__/AuthServicesPerso.test.ts
backend/src/services/__tests__/CourseSyncService.test.ts
backend/src/services/__tests__/EventSyncService.test.ts
backend/src/services/__tests__/GradeService.test.ts
backend/src/services/__tests__/GradeSyncService.test.ts
backend/src/services/__tests__/PointsEngineService.test.ts
backend/src/services/__tests__/ProfessorService.test.ts
backend/src/services/__tests__/TaskService.test.ts
backend/src/services/__tests__/TaskSyncService.test.ts
backend/src/services/AuditService.ts
backend/src/services/AuthServices.ts
backend/src/services/CacheService.ts
backend/src/services/CourseSyncService.ts
backend/src/services/courseWorkTypeService.ts
backend/src/services/emailService.ts
backend/src/services/EventService.ts
backend/src/services/EventSyncService.ts
backend/src/services/GradeService.ts
backend/src/services/GradeSyncService.ts
backend/src/services/PointsEngineService.ts
backend/src/services/ProfessorService.ts
backend/src/services/ResetPasswordService.ts
backend/src/services/RiskService.ts
backend/src/services/TaskService.ts
backend/src/services/TaskSyncBatchService.ts
backend/src/services/TaskSyncService.ts
backend/src/services/UserService.ts
backend/src/services/WorkService.ts
backend/src/services/WorkSyncService.ts
backend/src/stores/networkStore.ts
backend/src/types/professor.types.ts
backend/src/types/user.types.ts
backend/src/utils/_test_utils_/sqlite-test-db.ts
backend/src/utils/apiResponse.ts
backend/src/utils/bcrypt.utils.ts
backend/src/utils/catchAsync.ts
backend/src/utils/jwt.utils.ts
backend/src/utils/logger.ts
backend/src/utils/pagination.ts
backend/src/validators/auth.validators.ts
backend/src/validators/event.validators.ts
backend/src/validators/professor.validators.ts
backend/src/validators/task.validators.ts
backend/src/validators/work.validators.ts
backend/test_api.js
backend/test_output.txt
backend/test_sync_error.js
backend/test.k6.ts
backend/tsconfig.json
frontend/.npmrc
frontend/AUTHENTIFICATION_DIAGRAMMES.md
frontend/eslint.config.js
frontend/GUIDE_APPROPRIATION_APP.md
frontend/index.html
frontend/package.json
frontend/public/pwa-192x192.png
frontend/public/pwa-512x192.png
frontend/public/vite.svg
frontend/README.md
frontend/REFERENCE.md
frontend/src/api/auth.api.ts
frontend/src/api/client.ts
frontend/src/api/course.api.ts
frontend/src/api/events.api.ts
frontend/src/api/grade.api.ts
frontend/src/api/risk.api.ts
frontend/src/api/tasks.api.ts
frontend/src/api/works.api.ts
frontend/src/App.css
frontend/src/assets/Fichier1.svg
frontend/src/assets/hero.png
frontend/src/assets/react.svg
frontend/src/assets/vite.svg
frontend/src/components/Courses/CourseFormModal.tsx
frontend/src/hooks/useAuth.ts
frontend/src/hooks/useCourses.ts
frontend/src/hooks/useEvents.ts
frontend/src/hooks/useGrades.ts
frontend/src/hooks/useNetworkSync.ts
frontend/src/hooks/usePomodoro.ts
frontend/src/hooks/useRisks.ts
frontend/src/hooks/useTasks.ts
frontend/src/hooks/useTheme.ts
frontend/src/hooks/useWorks.ts
frontend/src/index.css
frontend/src/layouts/AppLayout.tsx
frontend/src/main.tsx
frontend/src/pages/Agenda/AgendaPage.tsx
frontend/src/pages/Auth/ForgotPasswordPage.tsx
frontend/src/pages/Auth/LoginPage.tsx
frontend/src/pages/Auth/RegisterPage.tsx
frontend/src/pages/Auth/ResetPassword.tsx
frontend/src/pages/Courses/CoursesDetailPage.tsx
frontend/src/pages/Courses/CoursesPage.tsx
frontend/src/pages/Dashboard/DashboardPage.tsx
frontend/src/pages/Profile/ProfilePage.tsx
frontend/src/pages/Risk/RiskPage.tsx
frontend/src/pages/Tasks/TaskPage.tsx
frontend/src/pages/Works/WorksPage.tsx
frontend/src/router/index.tsx
frontend/src/router/ProtectedRouter.tsx
frontend/src/stores/authStore.ts
frontend/src/stores/syncStore.ts
frontend/src/types/index.ts
frontend/src/vite-env.d.ts
frontend/tsconfig.app.json
frontend/tsconfig.json
frontend/tsconfig.node.json
frontend/vite.config.ts
```

# Files

## File: backend/.gitignore
````
node_modules/
dist/
build/
coverage/
*.log
*.tsbuildinfo

.env
.env.*
env.txt
password
password.txt

tests/
documentation/
.idea/
.vscode/
.DS_Store
*.pem
*.key
*.crt
````

## File: backend/API_ENDPOINTS.md
````markdown
# API Endpoints Documentation

Base URL: `http://localhost:3000`

## Authentication Endpoints

### 1. Register
**POST** `/api/auth/register`

**Request:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "StrongP@ssw0rd"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2026-02-24T10:00:00Z",
    "updatedAt": "2026-02-24T10:00:00Z"
  },
  "tokens": {
    "accessToken": "jwt_token",
    "refreshToken": "jwt_refresh_token"
  }
}
```

---

### 2. Login
**POST** `/api/auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "StrongP@ssw0rd"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "tokens": {
    "accessToken": "jwt_token",
    "refreshToken": "jwt_refresh_token"
  }
}
```

---

### 3. Refresh Token
**POST** `/api/auth/refresh-token`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

**Response (200):**
```json
{
  "accessToken": "new_jwt_token",
  "refreshToken": "new_jwt_refresh_token"
}
```

---

### 4. Logout
**POST** `/api/auth/logout`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

**Response (200):**
```json
{
  "message": "Déconnexion réussie"
}
```

---

### 5. Forgot Password
**POST** `/api/auth/forgot-password`

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "message": "Si ce compte existe, un email de réinitialisation a été envoyé"
}
```

---

### 6. Reset Password
**POST** `/api/auth/reset-password`

**Request:**
```json
{
  "token": "reset_token_from_email",
  "newPassword": "NewStrongP@ssw0rd"
}
```

**Response (200):**
```json
{
  "message": "Mot de passe réinitialisé avec succès"
}
```

---

## Course Endpoints

### 1. Get All Courses
**GET** `/api/courses`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "code": "MAT101",
    "name": "Mathematics",
    "description": "Basic mathematics",
    "color": "#FF5733",
    "credits": 3,
    "isDeleted": false,
    "createdAt": "2026-02-24T10:00:00Z",
    "updatedAt": "2026-02-24T10:00:00Z"
  }
]
```

---

### 2. Create Course
**POST** `/api/courses`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "code": "MAT101",
  "name": "Mathematics",
  "description": "Basic mathematics",
  "color": "#FF5733",
  "credits": 3,
  "workTypes": [
    {
      "type": "EXAMEN",
      "weightPercent": 50
    },
    {
      "type": "INTERRO",
      "weightPercent": 25
    },
    {
      "type": "TP",
      "weightPercent": 25
    }
  ]
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "code": "MAT101",
  "name": "Mathematics",
  "description": "Basic mathematics",
  "color": "#FF5733",
  "credits": 3
}
```

---

### 3. Update Course
**PATCH** `/api/courses/:id`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "code": "MAT102",
  "name": "Advanced Mathematics",
  "description": "Advanced topics",
  "color": "#FF5733",
  "credits": 4
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "code": "MAT102",
  "name": "Advanced Mathematics",
  "description": "Advanced topics",
  "color": "#FF5733",
  "credits": 4
}
```

---

### 4. Delete Course
**DELETE** `/api/courses/:id`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "message": "Cours supprimé avec succès"
}
```

---

### 5. Get Course Work Types
**GET** `/api/courses/:id/work-types`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
[
  {
    "id": "uuid",
    "courseId": "uuid",
    "type": "EXAMEN",
    "weightPercent": 50
  }
]
```

---

### 6. Update Course Work Types
**PUT** `/api/courses/:id/work-types`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "workTypes": [
    { "type": "EXAMEN", "weightPercent": 60 },
    { "type": "PROJET", "weightPercent": 40 }
  ]
}
```

**Response (200):**
```json
{
  "message": "Types de travaux mis à jour"
}
```

---

## Task Endpoints

### 1. Get All Tasks
**GET** `/api/tasks?courseId=optional&eventId=optional`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Query Parameters:**
- `courseId` (optional): Filter by course
- `eventId` (optional): Filter by event

**Response (200):**
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "title": "Complete assignment",
    "description": "Math homework",
    "status": "PENDING",
    "priority": "HIGH",
    "dueDate": "2026-02-28T23:59:59Z",
    "courseId": "uuid",
    "eventId": null,
    "durationMinutes": 60,
    "timeSpentMinutes": 0,
    "position": 0,
    "startedAt": null,
    "completedAt": null,
    "isDeleted": false,
    "createdAt": "2026-02-24T10:00:00Z",
    "updatedAt": "2026-02-24T10:00:00Z"
  }
]
```

---

### 2. Create Task
**POST** `/api/tasks`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "title": "Complete assignment",
  "description": "Math homework",
  "status": "PENDING",
  "priority": "HIGH",
  "dueDate": "2026-02-28T23:59:59Z",
  "courseId": "uuid",
  "eventId": null,
  "durationMinutes": 60
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "title": "Complete assignment",
  "description": "Math homework",
  "status": "PENDING",
  "priority": "HIGH",
  "dueDate": "2026-02-28T23:59:59Z",
  "courseId": "uuid",
  "eventId": null,
  "durationMinutes": 60,
  "timeSpentMinutes": 0,
  "position": 0,
  "startedAt": null,
  "completedAt": null,
  "createdAt": "2026-02-24T10:00:00Z"
}
```

---

### 3. Update Task
**PATCH** `/api/tasks/:id`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "IN_PROGRESS",
  "priority": "MEDIUM",
  "dueDate": "2026-03-01T23:59:59Z",
  "durationMinutes": 90
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "title": "Updated title",
  "status": "IN_PROGRESS",
  "priority": "MEDIUM",
  "updatedAt": "2026-02-24T11:00:00Z"
}
```

---

### 4. Delete Task
**DELETE** `/api/tasks/:id`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

---

### 5. Start Task
**POST** `/api/tasks/:id/start`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "id": "uuid",
  "status": "IN_PROGRESS",
  "startedAt": "2026-02-24T11:05:00Z"
}
```

---

### 6. Pause Task
**POST** `/api/tasks/:id/pause`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "PAUSED",
    "timeSpentMinutes": 15
  }
}
```

---

### 7. Complete Task
**POST** `/api/tasks/:id/complete`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "id": "uuid",
  "status": "COMPLETED",
  "completedAt": "2026-02-24T11:20:00Z"
}
```

---

### 8. Get Board Tasks
**GET** `/api/tasks/board?from=optional&to=optional`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Query Parameters:**
- `from` (optional): Start date (ISO format)
- `to` (optional): End date (ISO format)

**Response (200):**
```json
{
  "events": [
    {
      "id": "uuid",
      "title": "Math Exam",
      "startDate": "2026-02-28T09:00:00Z",
      "endDate": "2026-02-28T11:00:00Z",
      "tasks": [
        {
          "id": "uuid",
          "title": "Prepare notes",
          "status": "COMPLETED"
        }
      ]
    }
  ]
}
```

---

### 9. Get Focus Task
**GET** `/api/tasks/focus/current`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "id": "uuid",
  "title": "Current focus task",
  "status": "IN_PROGRESS",
  "startedAt": "2026-02-24T10:00:00Z"
}
```

---

### 10. Get Tasks by Event
**GET** `/api/tasks/event/:eventId`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
[
  {
    "id": "uuid",
    "title": "Prepare exam",
    "eventId": "uuid",
    "status": "PENDING"
  }
]
```

---

### 11. Create Task for Event
**POST** `/api/tasks/event/:eventId`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "title": "Prepare exam",
  "description": "Study notes",
  "status": "PENDING",
  "priority": "HIGH",
  "durationMinutes": 120
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "title": "Prepare exam",
  "eventId": "uuid",
  "status": "PENDING"
}
```

---

### 12. Reorder Tasks
**POST** `/api/tasks/reorder`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "items": [
    { "id": "task-1", "position": 0 },
    { "id": "task-2", "position": 1 },
    { "id": "task-3", "position": 2 }
  ]
}
```

**Response (200):**
```json
{
  "success": true
}
```

---

## Event Endpoints

### 1. Get All Events
**GET** `/api/events`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "title": "Math Exam",
    "description": "Final exam",
    "type": "EXAM",
    "courseId": "uuid",
    "startDate": "2026-02-28T09:00:00Z",
    "endDate": "2026-02-28T11:00:00Z",
    "color": "#FF5733",
    "isDeleted": false,
    "createdAt": "2026-02-24T10:00:00Z"
  }
]
```

---

### 2. Create Event
**POST** `/api/events`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "title": "Math Exam",
  "description": "Final exam",
  "type": "EXAM",
  "courseId": "uuid",
  "startDate": "2026-02-28T09:00:00Z",
  "endDate": "2026-02-28T11:00:00Z",
  "color": "#FF5733"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "title": "Math Exam",
  "type": "EXAM",
  "startDate": "2026-02-28T09:00:00Z",
  "endDate": "2026-02-28T11:00:00Z"
}
```

---

### 3. Update Event
**PATCH** `/api/events/:id`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "title": "Midterm Exam",
  "description": "Midterm exam",
  "type": "EXAM",
  "startDate": "2026-03-01T09:00:00Z",
  "endDate": "2026-03-01T11:00:00Z"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "title": "Midterm Exam",
  "updatedAt": "2026-02-24T11:00:00Z"
}
```

---

### 4. Delete Event
**DELETE** `/api/events/:id`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "message": "Événement supprimé avec succès"
}
```

---

## Grade Endpoints

### 1. Get All Grades
**GET** `/api/grades?courseId=optional&startDate=optional&endDate=optional`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Query Parameters:**
- `courseId` (optional): Filter by course
- `startDate` (optional): Filter from date
- `endDate` (optional): Filter to date

**Response (200):**
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "courseId": "uuid",
    "name": "Quiz 1",
    "score": 85,
    "maxScore": 100,
    "percentage": 85,
    "createdAt": "2026-02-24T10:00:00Z"
  }
]
```

---

### 2. Create Grade
**POST** `/api/grades`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "courseId": "uuid",
  "name": "Quiz 1",
  "score": 85,
  "maxScore": 100
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "courseId": "uuid",
  "name": "Quiz 1",
  "score": 85,
  "maxScore": 100,
  "percentage": 85
}
```

---

### 3. Update Grade
**PATCH** `/api/grades/:id`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "score": 90,
  "maxScore": 100
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "score": 90,
  "percentage": 90,
  "updatedAt": "2026-02-24T11:00:00Z"
}
```

---

### 4. Delete Grade
**DELETE** `/api/grades/:id`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "message": "Note supprimée avec succès"
}
```

---

### 5. Get General Average
**GET** `/api/grades/average`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "average": 82.5,
  "totalGrades": 10
}
```

---

### 6. Get Grade Statistics
**GET** `/api/grades/statistics`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "totalGrades": 10,
  "average": 82.5,
  "highestScore": 95,
  "lowestScore": 70,
  "standardDeviation": 8.2
}
```

---

### 7. Get Course Average
**GET** `/api/grades/course/:courseId/average`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "courseId": "uuid",
  "courseName": "Mathematics",
  "average": 85.5,
  "totalGrades": 5
}
```

---

## Work Endpoints

### 1. Get All Works
**GET** `/api/works?courseId=optional&status=optional&startDate=optional&endDate=optional`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Query Parameters:**
- `courseId` (optional): Filter by course
- `status` (optional): Filter by status (PENDING, SUBMITTED, GRADED)
- `startDate` (optional): Filter from date
- `endDate` (optional): Filter to date

**Response (200):**
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "courseId": "uuid",
    "title": "Assignment 1",
    "description": "Complete homework",
    "status": "PENDING",
    "dueDate": "2026-02-28T23:59:59Z",
    "pointsEarned": 0,
    "pointsPossible": 20,
    "percentage": 0,
    "workTypeId": "uuid",
    "workTypeLabel": "TRAVAIL",
    "createdAt": "2026-02-24T10:00:00Z"
  }
]
```

---

### 2. Create Work
**POST** `/api/works`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "courseId": "uuid",
  "title": "Assignment 1",
  "description": "Complete homework",
  "dueDate": "2026-02-28T23:59:59Z",
  "pointsPossible": 20,
  "workTypeId": "uuid"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "courseId": "uuid",
  "title": "Assignment 1",
  "status": "PENDING",
  "pointsPossible": 20,
  "pointsEarned": 0
}
```

---

### 3. Update Work
**PATCH** `/api/works/:id`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "title": "Assignment 1 (Revised)",
  "status": "SUBMITTED",
  "pointsEarned": 18
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "title": "Assignment 1 (Revised)",
  "status": "SUBMITTED",
  "pointsEarned": 18,
  "percentage": 90
}
```

---

### 4. Delete Work
**DELETE** `/api/works/:id`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "message": "Work deleted successfully"
}
```

---

### 5. Recalculate Work Points
**POST** `/api/works/:id/recalculate-points`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "id": "uuid",
  "pointsEarned": 18,
  "pointsPossible": 20,
  "percentage": 90
}
```

---

## Sync Endpoints

### 1. Push Changes
**POST** `/api/sync/push`

**Headers:**
```
Authorization: Bearer <accessToken>
X-Device-ID: device-uuid
```

**Request:**
```json
{
  "type": "CREATE",
  "entity": "Task",
  "data": {
    "id": "uuid",
    "title": "New task",
    "description": "Task description",
    "status": "PENDING",
    "priority": "HIGH",
    "dueDate": "2026-02-28T23:59:59Z",
    "courseId": "uuid",
    "eventId": null,
    "durationMinutes": 60,
    "timeSpentMinutes": 0,
    "position": 0,
    "startedAt": null,
    "completedAt": null,
    "syncStatus": "PENDING",
    "version": 1,
    "localId": "local-uuid"
  },
  "deviceId": "device-uuid"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "New task",
    "status": "PENDING",
    "syncStatus": "SYNCED",
    "version": 1
  },
  "syncedAt": "2026-02-24T11:00:00Z"
}
```

---

### 2. Pull Changes
**GET** `/api/sync/pull?lastPulledAt=optional&deviceId=optional`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Query Parameters:**
- `lastPulledAt` (optional): ISO timestamp of last sync
- `deviceId` (optional): Device identifier

**Response (200):**
```json
{
  "tasks": [
    {
      "id": "uuid",
      "title": "Task 1",
      "status": "PENDING",
      "syncStatus": "SYNCED",
      "version": 1
    }
  ],
  "events": [
    {
      "id": "uuid",
      "title": "Event 1",
      "type": "EXAM",
      "status": "SYNCED"
    }
  ],
  "courses": [
    {
      "id": "uuid",
      "code": "MAT101",
      "name": "Mathematics"
    }
  ],
  "grades": [],
  "works": [],
  "syncedAt": "2026-02-24T11:00:00Z"
}
```

---

## Risk Analysis Endpoints

### 1. Get Course Risk Analysis
**GET** `/api/risk/course/:courseId`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "courseId": "uuid",
  "courseName": "Mathematics",
  "riskLevel": "HIGH",
  "score": 65,
  "factors": {
    "averageGrade": 70,
    "missedDeadlines": 2,
    "incompleteWorks": 3,
    "averageWorkTime": 45
  },
  "recommendations": [
    "Augmentez le temps d'étude",
    "Complétez les travaux en retard"
  ]
}
```

---

## Profile Endpoints

### 1. Get Profile
**GET** `/api/profile`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2026-02-24T10:00:00Z",
  "updatedAt": "2026-02-24T10:00:00Z"
}
```

---

### 2. Update Profile
**PUT** `/api/updateprofile`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "email": "jane@example.com",
  "name": "Jane Doe",
  "updatedAt": "2026-02-24T11:00:00Z"
}
```

---

## Health Check Endpoints

### 1. Health Status
**GET** `/api/health`

**Response (200):**
```json
{
  "status": "ok"
}
```

---

### 2. Server Status
**GET** `/`

**Response (200):**
```
Backend running
```

---

## Test Endpoints (Development Only)

### 1. Auth Test
**GET** `/api/test/auth-test`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Authentication successful",
  "userId": "uuid",
  "tokenPayload": {
    "userId": "uuid"
  }
}
```

---

## Error Responses

All endpoints may return error responses:

**400 Bad Request:**
```json
{
  "error": "Validation failed"
}
```

**401 Unauthorized:**
```json
{
  "error": "Access token required" | "Token expired" | "Invalid token"
}
```

**403 Forbidden:**
```json
{
  "error": "Forbidden"
}
```

**404 Not Found:**
```json
{
  "error": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error message"
}
```

---

## Common Headers

All protected endpoints require:
```
Authorization: Bearer <accessToken>
Content-Type: application/json
X-Device-ID: <device-uuid> (for sync endpoints)
```

---

## Status Codes

- **200 OK**: Successful GET, PATCH, DELETE
- **201 CREATED**: Successful POST
- **400 Bad Request**: Validation error
- **401 Unauthorized**: Missing or invalid token
- **403 Forbidden**: User not allowed to access resource
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error
````

## File: backend/jest.config.js
````javascript
const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
};
````

## File: backend/package.json
````json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "jest",
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "perf": "k6 run perf/project-load.k6.ts",
    "perf:stages": "k6 run perf/project-load.k6.ts",
    "perf:10k": "k6 run --vus 10000 --duration 1m perf/project-load.k6.ts",
    "generate": "prisma generate",
    "migrate": "prisma migrate dev --name init",
    "studio": "prisma studio"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "@prisma/client": "^6.19.1",
    "@prisma/config": "^7.2.0",
    "@types/cors": "^2.8.19",
    "@types/pino-http": "^5.8.4",
    "bcrypt": "^6.0.0",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.2.1",
    "express-rate-limit": "^8.2.1",
    "helmet": "^8.1.0",
    "jsonwebtoken": "^9.0.3",
    "nodemailer": "^8.0.5",
    "pino": "^10.3.1",
    "pino-http": "^11.0.0",
    "prisma": "^6.19.1",
    "ts-node": "^10.9.2",
    "zod": "^4.2.1"
  },
  "devDependencies": {
    "@testcontainers/postgresql": "^11.14.0",
    "@types/bcrypt": "^6.0.0",
    "@types/express": "^5.0.6",
    "@types/jest": "^30.0.0",
    "@types/jsonwebtoken": "^9.0.10",
    "@types/k6": "^1.7.0",
    "@types/node": "^25.0.3",
    "@types/nodemailer": "^7.0.4",
    "@types/supertest": "^6.0.3",
    "jest": "^30.3.0",
    "pino-pretty": "^13.1.3",
    "sqlite3": "^6.0.1",
    "supertest": "^7.2.2",
    "ts-jest": "^29.4.9",
    "ts-node-dev": "^2.0.0",
    "typescript": "^6.0.2"
  }
}
````

## File: backend/perf/project-load.k6.ts
````typescript
import http from 'k6/http';
import { check, group, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const TEST_EMAIL = __ENV.TEST_EMAIL || '';
const TEST_PASSWORD = __ENV.TEST_PASSWORD || '';

export const options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '1m', target: 1000 },
    { duration: '2m', target: 5000 },
    { duration: '1m', target: 10000 },
    { duration: '2m', target: 10000 },
    { duration: '1m', target: 1000 },
    { duration: '30s', target: 0 },
  ],
};

function authHeaders(token?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

function getHealth() {
  const res = http.get(`${BASE_URL}/api/health`, { headers: authHeaders() });
  check(res, {
    'health status is 200': (r) => r.status === 200,
  });
}

function login() {
  if (!TEST_EMAIL || !TEST_PASSWORD) {
    console.log('⚠️  TEST_EMAIL and TEST_PASSWORD are required for protected endpoint tests.');
    return '';
  }

  const body = JSON.stringify({
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
  });

  const res = http.post(`${BASE_URL}/api/auth/login`, body, {
    headers: authHeaders(),
  });

  const token = res.json('accessToken');
  const success = check(res, {
    'login status is 200': (r) => r.status === 200,
    'login response has token': (_) => typeof token === 'string' && token.length > 0,
  });

  return success && typeof token === 'string' ? token : '';
}

function fetchProtected(path: string, token: string) {
  const res = http.get(`${BASE_URL}${path}`, {
    headers: authHeaders(token),
  });

  check(res, {
    [`${path} status is 200`]: (r) => r.status === 200,
  });
}

export default function () {
  group('Project performance smoke test', () => {
    getHealth();

    const token = login();

    if (token) {
      fetchProtected('/api/courses', token);
      fetchProtected('/api/tasks', token);
      fetchProtected('/api/events', token);
      fetchProtected('/api/works', token);
      fetchProtected('/api/grades', token);
      fetchProtected('/api/profile', token);
    }

    sleep(1);
  });
}
````

## File: backend/prisma/migrations/20251222065851_init_db/migration.sql
````sql
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "teacher" TEXT,
    "credits" INTEGER NOT NULL DEFAULT 0,
    "coefficient" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimetableEvent" (
    "id" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "location" TEXT,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "TimetableEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "grade" DOUBLE PRECISION,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyGoal" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DailyGoal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimetableEvent" ADD CONSTRAINT "TimetableEvent_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyGoal" ADD CONSTRAINT "DailyGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
````

## File: backend/prisma/migrations/20251231213504_init/migration.sql
````sql
/*
  Warnings:

  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DailyGoal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TimetableEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('CLASS', 'EXAM', 'QUIZ', 'ASSIGNMENT', 'STUDY', 'PERSONAL', 'MEETING');

-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('PENDING', 'SYNCED', 'CONFLICT');

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_userId_fkey";

-- DropForeignKey
ALTER TABLE "DailyGoal" DROP CONSTRAINT "DailyGoal_userId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_courseId_fkey";

-- DropForeignKey
ALTER TABLE "TimetableEvent" DROP CONSTRAINT "TimetableEvent_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_userId_fkey";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "DailyGoal";

-- DropTable
DROP TABLE "Exam";

-- DropTable
DROP TABLE "TimetableEvent";

-- DropTable
DROP TABLE "Todo";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "language" TEXT NOT NULL DEFAULT 'fr',
    "timezone" TEXT NOT NULL DEFAULT 'Europe/Paris',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastSyncedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT NOT NULL DEFAULT '#3B82F6',
    "credits" INTEGER DEFAULT 3,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "localId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM',
    "dueDate" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT,
    "syncStatus" "SyncStatus" NOT NULL DEFAULT 'SYNCED',
    "lastModifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "localId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "EventType" NOT NULL DEFAULT 'CLASS',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isAllDay" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "recurrence" TEXT,
    "userId" TEXT NOT NULL,
    "courseId" TEXT,
    "syncStatus" "SyncStatus" NOT NULL DEFAULT 'SYNCED',
    "lastModifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grades" (
    "id" TEXT NOT NULL,
    "localId" TEXT,
    "name" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "maxScore" DOUBLE PRECISION NOT NULL DEFAULT 20.0,
    "weight" DOUBLE PRECISION DEFAULT 1.0,
    "date" TIMESTAMP(3),
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "syncStatus" "SyncStatus" NOT NULL DEFAULT 'SYNCED',
    "lastModifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "grades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sync_histories" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "syncType" TEXT NOT NULL,
    "itemsPushed" INTEGER NOT NULL DEFAULT 0,
    "itemsPulled" INTEGER NOT NULL DEFAULT 0,
    "conflicts" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "error" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "sync_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "courses_userId_idx" ON "courses"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "courses_userId_code_key" ON "courses"("userId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- CreateIndex
CREATE INDEX "refresh_tokens_token_idx" ON "refresh_tokens"("token");

-- CreateIndex
CREATE INDEX "refresh_tokens_userId_idx" ON "refresh_tokens"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_localId_key" ON "tasks"("localId");

-- CreateIndex
CREATE INDEX "tasks_userId_status_idx" ON "tasks"("userId", "status");

-- CreateIndex
CREATE INDEX "tasks_userId_dueDate_idx" ON "tasks"("userId", "dueDate");

-- CreateIndex
CREATE INDEX "tasks_userId_syncStatus_idx" ON "tasks"("userId", "syncStatus");

-- CreateIndex
CREATE INDEX "tasks_userId_courseId_idx" ON "tasks"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "events_localId_key" ON "events"("localId");

-- CreateIndex
CREATE INDEX "events_userId_startDate_idx" ON "events"("userId", "startDate");

-- CreateIndex
CREATE INDEX "events_userId_type_idx" ON "events"("userId", "type");

-- CreateIndex
CREATE INDEX "events_userId_syncStatus_idx" ON "events"("userId", "syncStatus");

-- CreateIndex
CREATE UNIQUE INDEX "grades_localId_key" ON "grades"("localId");

-- CreateIndex
CREATE INDEX "grades_userId_courseId_idx" ON "grades"("userId", "courseId");

-- CreateIndex
CREATE INDEX "grades_userId_date_idx" ON "grades"("userId", "date");

-- CreateIndex
CREATE INDEX "sync_histories_userId_startedAt_idx" ON "sync_histories"("userId", "startedAt");

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sync_histories" ADD CONSTRAINT "sync_histories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
````

## File: backend/prisma/migrations/20260212091004_init/migration.sql
````sql
/*
  Warnings:

  - You are about to drop the column `createAt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "resetPasswordExpiresAt" TIMESTAMP(3),
ADD COLUMN     "resetPasswordToken" TEXT;
````

## File: backend/prisma/migrations/20260217081309_add_course_work_types/migration.sql
````sql
-- CreateEnum
CREATE TYPE "WorkType" AS ENUM ('EXAMEN', 'INTERRO', 'PROJET', 'TD', 'TP', 'EXERCICES');

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "syncStatus" "SyncStatus" NOT NULL DEFAULT 'SYNCED';

-- AlterTable
ALTER TABLE "grades" ADD COLUMN     "workTypeId" TEXT;

-- CreateTable
CREATE TABLE "course_work_types" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "type" "WorkType" NOT NULL,
    "weightPercent" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_work_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "course_work_types_courseId_idx" ON "course_work_types"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "course_work_types_courseId_type_key" ON "course_work_types"("courseId", "type");

-- CreateIndex
CREATE INDEX "grades_courseId_workTypeId_idx" ON "grades"("courseId", "workTypeId");

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_workTypeId_fkey" FOREIGN KEY ("workTypeId") REFERENCES "course_work_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_work_types" ADD CONSTRAINT "course_work_types_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
````

## File: backend/prisma/migrations/20260217134052_add_event_task_board_focus/migration.sql
````sql
-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "durationMinutes" INTEGER,
ADD COLUMN     "eventId" TEXT,
ADD COLUMN     "position" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "startedAt" TIMESTAMP(3),
ADD COLUMN     "timeSpentMinutes" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "TaskSession" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "durationSeconds" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;
````

## File: backend/prisma/migrations/20260221160521_add_work_events_and_grade_percentage/migration.sql
````sql
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EventType" ADD VALUE 'EXAMEN';
ALTER TYPE "EventType" ADD VALUE 'INTERRO';
ALTER TYPE "EventType" ADD VALUE 'TP';
ALTER TYPE "EventType" ADD VALUE 'AUTRE';

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "isWorkItem" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "workTypeLabel" TEXT;

-- AlterTable
ALTER TABLE "grades" ADD COLUMN     "percentage" DOUBLE PRECISION,
ADD COLUMN     "workTypeLabel" TEXT;

-- CreateIndex
CREATE INDEX "TaskSession_taskId_idx" ON "TaskSession"("taskId");

-- CreateIndex
CREATE INDEX "tasks_userId_eventId_idx" ON "tasks"("userId", "eventId");

-- CreateIndex
CREATE INDEX "tasks_eventId_position_idx" ON "tasks"("eventId", "position");

-- AddForeignKey
ALTER TABLE "TaskSession" ADD CONSTRAINT "TaskSession_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
````

## File: backend/prisma/migrations/20260221190000_split_work_from_events/migration.sql
````sql
-- CreateEnum
CREATE TYPE "WorkStatus" AS ENUM ('PLANNED', 'SUBMITTED', 'GRADED', 'CANCELLED');

-- AlterTable
ALTER TABLE "events" DROP COLUMN IF EXISTS "isWorkItem",
DROP COLUMN IF EXISTS "workTypeLabel";

-- AlterTable
ALTER TABLE "grades" ADD COLUMN IF NOT EXISTS "workId" TEXT;

-- CreateTable
CREATE TABLE "works" (
    "id" TEXT NOT NULL,
    "localId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "WorkStatus" NOT NULL DEFAULT 'PLANNED',
    "dueDate" TIMESTAMP(3),
    "submittedAt" TIMESTAMP(3),
    "gradedAt" TIMESTAMP(3),
    "pointsEarned" DOUBLE PRECISION,
    "pointsPossible" DOUBLE PRECISION NOT NULL DEFAULT 20.0,
    "percentage" DOUBLE PRECISION,
    "comment" TEXT,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "eventId" TEXT,
    "workTypeId" TEXT,
    "workTypeLabel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "syncStatus" "SyncStatus" NOT NULL DEFAULT 'SYNCED',
    "lastModifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "works_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "works_localId_key" ON "works"("localId");
CREATE INDEX "works_userId_courseId_idx" ON "works"("userId", "courseId");
CREATE INDEX "works_userId_dueDate_idx" ON "works"("userId", "dueDate");
CREATE INDEX "works_userId_status_idx" ON "works"("userId", "status");
CREATE INDEX "works_userId_syncStatus_idx" ON "works"("userId", "syncStatus");
CREATE INDEX "works_courseId_workTypeId_idx" ON "works"("courseId", "workTypeId");
CREATE INDEX "grades_userId_workId_idx" ON "grades"("userId", "workId");

-- AddForeignKey
ALTER TABLE "works" ADD CONSTRAINT "works_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "works" ADD CONSTRAINT "works_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "works" ADD CONSTRAINT "works_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "works" ADD CONSTRAINT "works_workTypeId_fkey" FOREIGN KEY ("workTypeId") REFERENCES "course_work_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "grades" ADD CONSTRAINT "grades_workId_fkey" FOREIGN KEY ("workId") REFERENCES "works"("id") ON DELETE SET NULL ON UPDATE CASCADE;
````

## File: backend/prisma/migrations/20260306125214_add_role_and_professor/migration.sql
````sql
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'PROFESSOR');

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "professorId" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STUDENT';

-- CreateTable
CREATE TABLE "professors" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "professors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "professors_userId_key" ON "professors"("userId");

-- CreateIndex
CREATE INDEX "courses_professorId_idx" ON "courses"("professorId");

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professors" ADD CONSTRAINT "professors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
````

## File: backend/prisma/migrations/migration_lock.toml
````toml
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "postgresql"
````

## File: backend/prisma/schema.prisma
````prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id                     String         @id @default(uuid())
  email                  String         @unique
  name                   String
  passwordHash           String
  avatarUrl              String?
  language               String         @default("fr")
  timezone               String         @default("Europe/Paris")
  updatedAt              DateTime       @updatedAt
  lastSyncedAt           DateTime?
  createdAt              DateTime       @default(now())
  resetPasswordExpiresAt DateTime?
  resetPasswordToken     String?
  courses                Course[]
  events                 Event[]
  works                  Work[]
  grades                 Grade[]
  refreshTokens          RefreshToken[]
  syncHistories          SyncHistory[]
  tasks                  Task[]
  role                   Role           @default(STUDENT)
  professor              Professor?

  @@index([email])
  @@map("users")
}

model RefreshToken {
  id        String    @id @default(uuid())
  token     String    @unique
  userId    String
  expiresAt DateTime
  createdAt DateTime  @default(now())
  revokedAt DateTime?
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([token])
  @@index([userId])
  @@map("refresh_tokens")
}

model Course {
  id          String           @id @default(uuid())
  code        String
  name        String
  description String?
  color       String           @default("#3B82F6")
  credits     Int?             @default(3)
  userId      String
  professorId String?
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
  isDeleted   Boolean          @default(false)
  deletedAt   DateTime?
  user        User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  professor   Professor?       @relation(fields: [professorId], references: [id], onDelete: SetNull)
  events      Event[]
  works       Work[]
  grades      Grade[]
  tasks       Task[]
  workTypes   CourseWorkType[]
  syncStatus  SyncStatus       @default(SYNCED)

  @@unique([userId, code])
  @@index([userId])
  @@index([professorId])
  @@map("courses")
}

model Task {
  id               String       @id @default(uuid())
  localId          String?      @unique
  title            String
  description      String?
  status           TaskStatus   @default(PENDING)
  priority         TaskPriority @default(MEDIUM)
  dueDate          DateTime?
  completedAt      DateTime?
  createdAt        DateTime     @default(now())
  updatedAt        DateTime     @updatedAt
  userId           String
  courseId         String?
  eventId          String?
  durationMinutes  Int?
  startedAt        DateTime?
  timeSpentMinutes Int          @default(0)
  syncStatus       SyncStatus   @default(SYNCED)
  lastModifiedAt   DateTime     @default(now())
  version          Int          @default(1)
  deletedAt        DateTime?
  position         Int          @default(0)
  isDeleted        Boolean      @default(false)
  course           Course?      @relation(fields: [courseId], references: [id], onDelete: Cascade)
  user             User         @relation(fields: [userId], references: [id], onDelete: Cascade)

  event    Event?        @relation(fields: [eventId], references: [id], onDelete: SetNull)
  sessions TaskSession[]

  @@index([userId, status])
  @@index([userId, dueDate])
  @@index([userId, syncStatus])
  @@index([userId, courseId])
  @@index([userId, eventId])
  @@index([eventId, position])
  @@map("tasks")
}

model TaskSession {
  id              String    @id @default(uuid())
  taskId          String
  startedAt       DateTime
  endDate         DateTime?
  durationSeconds Int       @default(0)
  createdAt       DateTime  @default(now())
  task            Task      @relation(fields: [taskId], references: [id], onDelete: Cascade)

  @@index([taskId])
}

model Event {
  id             String     @id @default(uuid())
  localId        String?    @unique
  title          String
  description    String?
  type           EventType  @default(CLASS)
  startDate      DateTime
  endDate        DateTime
  isAllDay       Boolean    @default(false)
  location       String?
  recurrence     String?
  userId         String
  courseId       String?
  syncStatus     SyncStatus @default(SYNCED)
  lastModifiedAt DateTime   @default(now())
  version        Int        @default(1)
  course         Course?    @relation(fields: [courseId], references: [id], onDelete: Cascade)
  user           User       @relation(fields: [userId], references: [id], onDelete: Cascade)

  tasks Task[]
  works Work[]

  @@index([userId, startDate])
  @@index([userId, type])
  @@index([userId, syncStatus])
  @@map("events")
}

model Grade {
  id             String          @id @default(uuid())
  localId        String?         @unique
  name           String
  score          Float
  maxScore       Float           @default(20.0)
  percentage     Float?
  weight         Float?          @default(1.0)
  workTypeLabel  String?
  workId         String?
  date           DateTime?
  comment        String?
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
  userId         String
  courseId       String
  workTypeId     String?
  syncStatus     SyncStatus      @default(SYNCED)
  lastModifiedAt DateTime        @default(now())
  version        Int             @default(1)
  course         Course          @relation(fields: [courseId], references: [id], onDelete: Cascade)
  workType       CourseWorkType? @relation(fields: [workTypeId], references: [id], onDelete: SetNull)
  work           Work?           @relation(fields: [workId], references: [id], onDelete: SetNull)
  user           User            @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, courseId])
  @@index([userId, date])
  @@index([userId, workId])
  @@index([courseId, workTypeId])
  @@map("grades")
}

model CourseWorkType {
  id            String   @id @default(uuid())
  courseId      String
  type          WorkType
  weightPercent Float
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  course        Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  grades        Grade[]
  works         Work[]

  @@unique([courseId, type])
  @@index([courseId])
  @@map("course_work_types")
}

model Work {
  id             String          @id @default(uuid())
  localId        String?         @unique
  title          String
  description    String?
  status         WorkStatus      @default(PLANNED)
  dueDate        DateTime?
  submittedAt    DateTime?
  gradedAt       DateTime?
  pointsEarned   Float?
  pointsPossible Float           @default(20.0)
  percentage     Float?
  comment        String?
  userId         String
  courseId       String
  eventId        String?
  workTypeId     String?
  workTypeLabel  String?
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
  syncStatus     SyncStatus      @default(SYNCED)
  lastModifiedAt DateTime        @default(now())
  version        Int             @default(1)
  course         Course          @relation(fields: [courseId], references: [id], onDelete: Cascade)
  event          Event?          @relation(fields: [eventId], references: [id], onDelete: SetNull)
  workType       CourseWorkType? @relation(fields: [workTypeId], references: [id], onDelete: SetNull)
  user           User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  grades         Grade[]

  @@index([userId, courseId])
  @@index([userId, dueDate])
  @@index([userId, status])
  @@index([userId, syncStatus])
  @@index([courseId, workTypeId])
  @@map("works")
}

model SyncHistory {
  id          String    @id @default(uuid())
  userId      String
  deviceId    String
  syncType    String
  itemsPushed Int       @default(0)
  itemsPulled Int       @default(0)
  conflicts   Int       @default(0)
  status      String
  error       String?
  startedAt   DateTime  @default(now())
  completedAt DateTime?
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, startedAt])
  @@map("sync_histories")
}

enum TaskStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
  CANCELED
}

enum TaskPriority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum EventType {
  CLASS
  EXAM
  EXAMEN
  INTERRO
  TP
  QUIZ
  ASSIGNMENT
  STUDY
  AUTRE
  PERSONAL
  MEETING
}

enum SyncStatus {
  PENDING
  SYNCED
  CONFLICT
}

enum WorkType {
  EXAMEN
  INTERRO
  PROJET
  TD
  TP
  EXERCICES
}

enum WorkStatus {
  PLANNED
  SUBMITTED
  GRADED
  CANCELLED
}

enum Role {
  STUDENT
  PROFESSOR
}

model Professor {
  id      String   @id @default(uuid())
  userId  String   @unique
  user    User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  courses Course[]

  @@map("professors")
}
````

## File: backend/src/__tests__/auth-dashboard.e2e.test.ts
````typescript
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';
import { AuthService } from '../services/AuthServices';
import { db } from '../lib/db';

jest.mock('../lib/db', () => ({
  db: {
    course: {
      findMany: jest.fn()
    }
  }
}));

describe('E2E auth -> dashboard data', () => {
  const loginPayload = {
    email: 'student@test.com',
    password: 'password123'
  };

  beforeEach(() => {
    process.env.JWT_SECRET = 'test-secret';
    process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
    jest.clearAllMocks();
  });

  it('should login then access protected courses endpoint', async () => {
    const accessToken = jwt.sign({ userId: 'user-1' }, process.env.JWT_SECRET as string, { expiresIn: '15m' });

    jest.spyOn(AuthService, 'login').mockResolvedValue({
      user: {
        id: 'user-1',
        email: 'student@test.com',
        name: 'Student',
        role: 'STUDENT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      tokens: {
        accessToken,
        refreshToken: 'refresh-token-value'
      }
    });

    (db.course.findMany as jest.Mock).mockResolvedValue([
      {
        id: 'course-1',
        code: 'MATH101',
        name: 'Math',
        color: '#3B82F6',
        credits: 3,
        userId: 'user-1',
        isDeleted: false
      }
    ]);

    const loginResponse = await request(app).post('/api/auth/login').send(loginPayload);

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.success).toBe(true);
    expect(loginResponse.body.data.tokens.accessToken).toBeDefined();

    const dashboardResponse = await request(app)
      .get('/api/courses')
      .set('Authorization', `Bearer ${loginResponse.body.data.tokens.accessToken}`);

    expect(dashboardResponse.status).toBe(200);
    expect(dashboardResponse.body.success).toBe(true);
    expect(Array.isArray(dashboardResponse.body.data)).toBe(true);
    expect(dashboardResponse.body.data).toHaveLength(1);
  });

  it('should block dashboard endpoint without token', async () => {
    const response = await request(app).get('/api/courses');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toBeDefined();
  });
});
````

## File: backend/src/app.ts
````typescript
import express from "express";
import cors from "cors";
import helmet from "helmet";
import syncRoutes from "./routes/sync.routes";
import riskRoutes from "./routes/risk.routes";
import authRoutes from "./routes/auth.routes";
import courseRoutes from "./routes/course.routes";
import taskRoutes from "./routes/task.routes";
import eventRoutes from "./routes/event.routes";
import workRoutes from "./routes/work.routes";
import gradeRoutes from "./routes/grade.routes";
import testRoutes from "./routes/test.routes";
import profileRoutes from "./routes/profile.routes";
import { globalErrorHandler } from "./middlewares/error.middleware";
import rateLimit from "express-rate-limit";
import { pinoHttp } from 'pino-http';
import { logger } from './utils/logger';

const app = express();

app.use(pinoHttp({ logger }));

const allowedOrigins = (
  process.env.CORS_ORIGINS ||
  "http://localhost:5173,localhost:4173,http://localhost:3000,localhost:3000,https://rehnqfuoyxmbzrxoxroc.supabase.co,https://study-flow-ebon.vercel.app/"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5000,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.method === "OPTIONS",
  message: "Trop de requetes provenant de cette IP, veuillez reessayer plus tard."
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5000,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: "Trop de tentatives de connexion provenant de cette IP, veuillez reessayer plus tard."
});

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) {
      return callback(null, true);
    }

    // Check if origin is in allowed list or if * is allowed
    const isAllowed = allowedOrigins.includes("*") || allowedOrigins.includes(origin);

    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`CORS rejected origin: ${origin}. Allowed: ${allowedOrigins.join(", ")}`);
      callback(new Error(`Origin not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "X-Device-ID", "x-device-id"],
  exposedHeaders: ["Content-Length", "X-JSON-Response-Time"]
};

// IMPORTANT: CORS middleware must run early, before routes and limiters
app.use(cors(corsOptions));


app.options(/.*/, cors(corsOptions));

app.use(globalLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
//app.use(sanitizeInput);

app.get("/", (_req, res) => {
  res.send("Backend running");
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/sync", syncRoutes);
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/courses", globalLimiter, courseRoutes);
app.use("/api/tasks", globalLimiter, taskRoutes);
app.use("/api/events", globalLimiter, eventRoutes);
app.use("/api/works", globalLimiter, workRoutes);
app.use("/api/grades", globalLimiter, gradeRoutes);
app.use("/api/risk", globalLimiter, riskRoutes);
app.use("/api/professors", globalLimiter, (_req, res) => {
  res.status(403).json({
    success: false,
    error: {
      code: "FEATURE_DISABLED",
      message: "Espace professeur indisponible."
    }
  });
});
app.use("/api", globalLimiter, profileRoutes);

if (process.env.NODE_ENV !== "production") {
  app.use("/api/test", testRoutes);
}

app.use(globalErrorHandler);

export default app;
````

## File: backend/src/config/jwt.config.ts
````typescript
export const jwtConfig = {
    accessToken :{
        secret: process.env.JWT_SECRET,
        expireIn: process.env.JWT_EXPIRE || '2m'
    },
    refreshToken :{
        secret: process.env.JWT_REFRESH_SECRET,
        expireIn: process.env.JWT_REFRESH_EXPIRE || '2m'
    }
}

if (!process.env.JWT_SECRET){
    throw new Error ('JWT_SECRET must be defined')
}
````

## File: backend/src/controllers/AuthController.ts
````typescript
import { Request, Response } from 'express';
import { AuthService } from '../services/AuthServices';
import { sendSuccess, sendError } from '../utils/apiResponse';

// CORRECTIF: register ne devait pas appeler generateTokens manuellement —
// login() le fait déjà en interne. On appelle login() après le register
// pour obtenir les tokens en une seule passe.

export const register = async (req: Request, res: Response) => {
    try {
        const { email, name, password } = req.body;
        const user = await AuthService.register(email, name, password);
        const tokens = await AuthService.generateTokens(user.id);
        sendSuccess(res, { user, tokens }, 201);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Erreur interne';
        if (message.toLowerCase().includes('unique') || message.toLowerCase().includes('already')) {
            return sendError(res, 'Un compte avec cet email existe déjà.', 409, 'EMAIL_TAKEN');
        }
        sendError(res, message, 500);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { user, tokens } = await AuthService.login(email, password);
        sendSuccess(res, { user, tokens });
    } catch (error: unknown) {
        sendError(res, 'Identifiants invalides.', 401, 'INVALID_CREDENTIALS');
    }
};

export const RefreshToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return sendError(res, 'Refresh token requis.', 400, 'MISSING_REFRESH_TOKEN');
        }
        const tokens = await AuthService.refreshToken(refreshToken);
        sendSuccess(res, tokens);
    } catch {
        sendError(res, 'Refresh token invalide ou expiré.', 401, 'INVALID_REFRESH_TOKEN');
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        if (refreshToken) {
            await AuthService.logout(refreshToken);
        }
        // CORRECTIF: logout silencieux même si le token est déjà révoqué
        sendSuccess(res, { message: 'Déconnexion réussie.' });
    } catch {
        sendSuccess(res, { message: 'Déconnexion réussie.' });
    }
};

// CORRECTIF: le service ne doit plus throw sur user introuvable (cf. AuthServices.ts corrigé).
// Le contrôleur reste uniforme — même réponse qu'il y ait un compte ou non.
export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        await AuthService.forgotPassword(email);
    } catch {
        // Intentionnellement silencieux
    } finally {
        sendSuccess(res, {
            message: "Si ce compte existe, un email de réinitialisation a été envoyé.",
        });
    }
};

export const ResetPassword = async (req: Request, res: Response) => {
    try {
        const { token, newPassword } = req.body;
        await AuthService.resetPassword(token, newPassword);
        sendSuccess(res, { message: 'Mot de passe réinitialisé avec succès.' });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Requête invalide';
        sendError(res, message, 400, 'INVALID_RESET_TOKEN');
    }
};
````

## File: backend/src/controllers/CourseController.ts
````typescript
import { Request, Response } from 'express';
import { db } from '../lib/db';
import { normalizeWorkTypes } from '../services/courseWorkTypeService';
import { sendError, sendSuccess } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

const getUserId = (req: Request): string | undefined =>
  (req as AuthenticatedRequest).user?.userId;

export const getCourses = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const courses = await db.course.findMany({
      where: { userId, isDeleted: false },
      orderBy: { updatedAt: 'desc' }
    });

    sendSuccess(res, courses);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const id = String(req.params.id);
    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const course = await db.course.findFirst({
      where: { id, userId, isDeleted: false }
    });

    if (!course) return sendError(res, 'Cours introuvable.', 404, 'COURSE_NOT_FOUND');

    sendSuccess(res, course);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const searchCourses = async (req: Request, res: Response) => {
  try {
    const query = String(req.query.q || '').trim();
    if (!query) return sendSuccess(res, []);

    const courses = await db.course.findMany({
      where: {
        OR: [
          { code: { contains: query, mode: 'insensitive' } },
          { name: { contains: query, mode: 'insensitive' } }
        ],
        isDeleted: false
      },
      distinct: ['code'],
      take: 10
    });

    sendSuccess(res, courses);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const { code, name, description, color, credits, workTypes } = req.body;

    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const normalized = normalizeWorkTypes(workTypes);
    if (!normalized.ok) return sendError(res, normalized.error, 400, 'INVALID_WORK_TYPES');

    const course = await db.$transaction(async (tx) => {
      const created = await tx.course.create({
        data: { userId, code, name, description, color, credits }
      });

      await tx.courseWorkType.createMany({
        data: normalized.items.map((item) => ({
          courseId: created.id,
          type: item.type,
          weightPercent: item.weightPercent
        }))
      });

      return created;
    });

    sendSuccess(res, course, 201);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const getCourseWorkTypes = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const courseId = String(req.params.id);

    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const course = await db.course.findUnique({ where: { id: courseId } });
    if (!course || course.userId !== userId) {
      return sendError(res, 'Cours introuvable.', 404, 'COURSE_NOT_FOUND');
    }

    const workTypes = await db.courseWorkType.findMany({
      where: { courseId },
      orderBy: { type: 'asc' }
    });

    sendSuccess(res, workTypes);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const updateCourseWorkTypes = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const courseId = String(req.params.id);
    const { workTypes } = req.body as { workTypes?: unknown };

    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const course = await db.course.findUnique({ where: { id: courseId } });
    if (!course || course.userId !== userId) {
      return sendError(res, 'Cours introuvable.', 404, 'COURSE_NOT_FOUND');
    }

    const normalized = normalizeWorkTypes(workTypes);
    if (!normalized.ok) return sendError(res, normalized.error, 400, 'INVALID_WORK_TYPES');

    const existing = await db.courseWorkType.findMany({ where: { courseId } });
    const keepTypes = new Set(normalized.items.map((item) => item.type));
    const toDelete = existing.filter((item) => !keepTypes.has(item.type));

    if (toDelete.length > 0) {
      const [usedByGrades, usedByWorks] = await db.$transaction([
        db.grade.count({ where: { courseId, workTypeId: { in: toDelete.map((item) => item.id) } } }),
        db.work.count({ where: { courseId, workTypeId: { in: toDelete.map((item) => item.id) } } })
      ]);

      if (usedByGrades > 0 || usedByWorks > 0) {
        return sendError(
          res,
          'Impossible de supprimer un type deja utilise par des notes ou des travaux.',
          400,
          'WORK_TYPE_IN_USE'
        );
      }
    }

    await db.$transaction([
      db.courseWorkType.deleteMany({ where: { id: { in: toDelete.map((item) => item.id) } } }),
      ...normalized.items.map((item) =>
        db.courseWorkType.upsert({
          where: { courseId_type: { courseId, type: item.type } },
          update: { weightPercent: item.weightPercent },
          create: { courseId, type: item.type, weightPercent: item.weightPercent }
        })
      )
    ]);

    const updated = await db.courseWorkType.findMany({
      where: { courseId },
      orderBy: { type: 'asc' }
    });

    sendSuccess(res, updated);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const initCourseWorkTypes = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const courses = await db.course.findMany({
      where: { userId, isDeleted: false },
      select: { id: true }
    });

    if (courses.length === 0) return sendSuccess(res, { created: 0 });

    const courseIds = courses.map((course) => course.id);
    const existing = await db.courseWorkType.findMany({
      where: { courseId: { in: courseIds } },
      select: { courseId: true }
    });

    const existingSet = new Set(existing.map((item) => item.courseId));
    const missing = courseIds.filter((id) => !existingSet.has(id));

    if (missing.length === 0) return sendSuccess(res, { created: 0 });

    const defaults = normalizeWorkTypes();
    if (!defaults.ok) {
      return sendError(res, "Impossible d'initialiser les types de travaux.", 500, 'INIT_WORK_TYPES_FAILED');
    }

    await db.courseWorkType.createMany({
      data: missing.flatMap((courseId) =>
        defaults.items.map((item) => ({
          courseId,
          type: item.type,
          weightPercent: item.weightPercent
        }))
      )
    });

    sendSuccess(res, { created: missing.length });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const id = String(req.params.id);
    const data = req.body;

    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const course = await db.course.findUnique({ where: { id } });
    if (!course || course.userId !== userId) {
      return sendError(res, 'Cours introuvable.', 404, 'COURSE_NOT_FOUND');
    }

    const updated = await db.course.update({
      where: { id },
      data: { ...data, updatedAt: new Date() }
    });

    sendSuccess(res, updated);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const id = String(req.params.id);

    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const course = await db.course.findUnique({ where: { id } });
    if (!course || course.userId !== userId) {
      return sendError(res, 'Cours introuvable.', 404, 'COURSE_NOT_FOUND');
    }

    await db.course.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() }
    });

    sendSuccess(res, { message: 'Cours supprime avec succes.' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};
````

## File: backend/src/controllers/EventController.ts
````typescript
import { Request, Response } from 'express';
import { db } from '../lib/db';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { createEventSchema, updateEventSchema } from '../validators/event.validators';
import { z } from 'zod';
import { EventService } from '../services/EventService';
import { sendError, sendSuccess } from '../utils/apiResponse';

const getUserId = (req: Request) => (req as AuthenticatedRequest).user?.userId;

const parseZodError = (error: z.ZodError): string =>
  error.issues.map((issue) => issue.message).join(', ');

export const getEvents = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const { startDate, endDate } = req.query;

    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const where: Record<string, unknown> = { userId };
    if (startDate && endDate) {
      where.startDate = {
        gte: new Date(String(startDate)),
        lte: new Date(String(endDate))
      };
    }

    const events = await db.event.findMany({
      where,
      orderBy: { startDate: 'asc' }
    });

    sendSuccess(res, events);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const payload = createEventSchema.parse(req.body);

    const eventData = {
      userId,
      title: payload.title,
      description: payload.description,
      type: payload.type || 'CLASS',
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
      isAllDay: !!payload.isAllDay,
      location: payload.location,
      recurrence: payload.recurrence,
      courseId: payload.courseId || undefined // Utilisation directe du scalaire
    };

    const event = await EventService.createEvent(userId, eventData, payload.generateDefaultTasks);
    sendSuccess(res, event, 201);
  } catch (error: unknown) {
    console.error('[EventController] Create Error:', error); // Log crucial pour le terminal
    if (error instanceof z.ZodError) {
      return sendError(res, parseZodError(error), 400, 'VALIDATION_ERROR');
    }
    const message = error instanceof Error ? error.message : 'Erreur interne lors de la création de l\'événement';
    sendError(res, message);
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const id = String(req.params.id);

    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const payload = updateEventSchema.parse(req.body);

    const event = await db.event.findUnique({ where: { id } });
    if (!event || event.userId !== userId) {
      return sendError(res, 'Evenement introuvable.', 404, 'EVENT_NOT_FOUND');
    }

    const dataToUpdate: Record<string, unknown> = { ...payload };
    if (payload.startDate) dataToUpdate.startDate = new Date(payload.startDate);
    if (payload.endDate) dataToUpdate.endDate = new Date(payload.endDate);
    if (payload.courseId) dataToUpdate.courseId = payload.courseId;

    Object.keys(dataToUpdate).forEach((key) => {
      if (dataToUpdate[key] === undefined) delete dataToUpdate[key];
    });

    const updated = await db.event.update({
      where: { id },
      data: dataToUpdate
    });

    sendSuccess(res, updated);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return sendError(res, parseZodError(error), 400, 'VALIDATION_ERROR');
    }
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const id = String(req.params.id);

    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const event = await db.event.findUnique({ where: { id } });
    if (!event || event.userId !== userId) {
      return sendError(res, 'Evenement introuvable.', 404, 'EVENT_NOT_FOUND');
    }

    await db.event.delete({ where: { id } });
    sendSuccess(res, { message: 'Evenement supprime avec succes.' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};
````

## File: backend/src/controllers/GradeController.ts
````typescript
import { Request, Response } from 'express';
import { db } from '../lib/db';
import { GradeService } from '../services/GradeService';
import { sendError, sendSuccess } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

const getUserId = (req: Request): string | undefined =>
  (req as AuthenticatedRequest).user?.userId;

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

const validateScoreRange = (score: number, maxScore: number) => {
  if (!isFiniteNumber(score) || !isFiniteNumber(maxScore)) {
    return 'Score et maximum doivent etre des nombres valides';
  }
  if (maxScore <= 0) return 'Le maximum doit etre superieur a 0';
  if (score < 0 || score > maxScore) return 'Le score doit etre compris entre 0 et le maximum';
  return null;
};

const resolveWorkTypeId = async (courseId: string, workType?: string) => {
  const configured = await db.courseWorkType.findMany({
    where: { courseId },
    select: { id: true, type: true }
  });

  if (configured.length === 0 || !workType) return undefined;
  const normalized = String(workType).trim().toUpperCase();
  const match = configured.find((item) => item.type.toUpperCase() === normalized);
  return match ? match.id : undefined;
};

export const getGrades = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const { courseId } = req.query;

    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const where: { userId: string; courseId?: string } = { userId };
    if (courseId) where.courseId = String(courseId);

    const grades = await db.grade.findMany({
      where,
      orderBy: { date: 'desc' },
      include: {
        workType: { select: { type: true, weightPercent: true } },
        work: { select: { id: true, title: true } }
      }
    });

    sendSuccess(res, grades);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const createGrade = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const { localId, name, score, maxScore, date, comment, courseId, workId, workType, workTypeLabel, percentage } = req.body;

    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');
    if (!name || !courseId) return sendError(res, 'Nom et cours sont requis.', 400, 'MISSING_FIELDS');

    const course = await db.course.findUnique({ where: { id: courseId }, select: { id: true, userId: true } });
    if (!course) return sendError(res, 'Cours introuvable.', 404, 'COURSE_NOT_FOUND');
    if (course.userId !== userId) return sendError(res, 'Acces refuse.', 403, 'FORBIDDEN');

    const scoreNum = Number(score);
    const maxScoreNum = maxScore === undefined ? 20 : Number(maxScore);
    const percentageNum = percentage === undefined || percentage === null || percentage === '' ? undefined : Number(percentage);

    const rangeError = validateScoreRange(scoreNum, maxScoreNum);
    if (rangeError) return sendError(res, rangeError, 400, 'INVALID_SCORE_RANGE');
    if (percentageNum !== undefined && (!Number.isFinite(percentageNum) || percentageNum < 0 || percentageNum > 100)) {
      return sendError(res, 'Le pourcentage doit etre compris entre 0 et 100.', 400, 'INVALID_PERCENTAGE');
    }

    const normalizedLabel = String(workTypeLabel || workType || '').trim().toUpperCase() || null;
    let resolvedWorkId: string | undefined;
    let resolvedWorkTypeId = await resolveWorkTypeId(courseId, normalizedLabel || undefined);

    if (workId) {
      const work = await db.work.findUnique({
        where: { id: String(workId) },
        select: { id: true, userId: true, courseId: true, workTypeId: true }
      });

      if (!work) return sendError(res, 'Travail introuvable.', 404, 'WORK_NOT_FOUND');
      if (work.userId !== userId) return sendError(res, 'Acces refuse.', 403, 'FORBIDDEN');
      if (work.courseId !== courseId) {
        return sendError(res, 'Le travail doit appartenir au meme cours.', 400, 'INVALID_WORK_COURSE');
      }

      resolvedWorkId = work.id;
      resolvedWorkTypeId = resolvedWorkTypeId || work.workTypeId || undefined;
    }

    const grade = await db.grade.create({
      data: {
        localId,
        userId,
        name,
        score: scoreNum,
        maxScore: maxScoreNum,
        percentage: percentageNum,
        workTypeLabel: normalizedLabel,
        workId: resolvedWorkId,
        date: date ? new Date(date) : undefined,
        comment,
        courseId,
        workTypeId: resolvedWorkTypeId || undefined
      },
      include: {
        workType: { select: { type: true, weightPercent: true } },
        work: { select: { id: true, title: true } }
      }
    });

    sendSuccess(res, grade, 201);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const updateGrade = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const { id } = req.params as { id: string };
    const data = { ...req.body };

    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const grade = await db.grade.findUnique({ where: { id } });
    if (!grade || grade.userId !== userId) {
      return sendError(res, 'Note introuvable.', 404, 'GRADE_NOT_FOUND');
    }

    if (data.courseId !== undefined) delete data.courseId;
    if (data.weight !== undefined) delete data.weight;

    const nextScore = data.score !== undefined ? Number(data.score) : grade.score;
    const nextMaxScore = data.maxScore !== undefined ? Number(data.maxScore) : grade.maxScore;
    const rangeError = validateScoreRange(nextScore, nextMaxScore);
    if (rangeError) return sendError(res, rangeError, 400, 'INVALID_SCORE_RANGE');

    if (data.score !== undefined) data.score = nextScore;
    if (data.maxScore !== undefined) data.maxScore = nextMaxScore;
    if (data.date) data.date = new Date(data.date);

    if (data.percentage !== undefined && data.percentage !== null && data.percentage !== '') {
      const p = Number(data.percentage);
      if (!Number.isFinite(p) || p < 0 || p > 100) {
        return sendError(res, 'Le pourcentage doit etre compris entre 0 et 100.', 400, 'INVALID_PERCENTAGE');
      }
      data.percentage = p;
    }

    const incomingWorkType = data.workTypeLabel || data.workType;
    if (incomingWorkType !== undefined) {
      const normalized = String(incomingWorkType || '').trim().toUpperCase();
      data.workTypeLabel = normalized || null;
      data.workTypeId = normalized ? await resolveWorkTypeId(grade.courseId, normalized) : null;
      delete data.workType;
    }

    if (data.workId !== undefined) {
      if (data.workId === null || data.workId === '') {
        data.workId = null;
      } else {
        const work = await db.work.findUnique({
          where: { id: String(data.workId) },
          select: { id: true, userId: true, courseId: true, workTypeId: true }
        });

        if (!work) return sendError(res, 'Travail introuvable.', 404, 'WORK_NOT_FOUND');
        if (work.userId !== userId) return sendError(res, 'Acces refuse.', 403, 'FORBIDDEN');
        if (work.courseId !== grade.courseId) {
          return sendError(res, 'Le travail doit appartenir au meme cours.', 400, 'INVALID_WORK_COURSE');
        }

        if (!data.workTypeId && !data.workTypeLabel) {
          data.workTypeId = work.workTypeId || null;
        }
        data.workId = work.id;
      }
    }

    const updated = await db.grade.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
      include: {
        workType: { select: { type: true, weightPercent: true } },
        work: { select: { id: true, title: true } }
      }
    });

    sendSuccess(res, updated);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const deleteGrade = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const { id } = req.params as { id: string };

    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const grade = await db.grade.findUnique({ where: { id } });
    if (!grade || grade.userId !== userId) {
      return sendError(res, 'Note introuvable.', 404, 'GRADE_NOT_FOUND');
    }

    await db.grade.delete({ where: { id } });
    sendSuccess(res, { message: 'Note supprimee avec succes.' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const getGeneralAverage = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const result = await GradeService.getGeneralAverage(userId);
    sendSuccess(res, result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const getCourseAverage = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const courseId = req.params.courseId as string;

    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const result = await GradeService.getCourseAverage(userId, courseId);
    if (!result) return sendError(res, 'Aucune note trouvee pour ce cours.', 404, 'NO_GRADES');

    sendSuccess(res, result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const getGradeStatistics = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const result = await GradeService.getGradeStatistics(userId);
    sendSuccess(res, result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};
````

## File: backend/src/controllers/ProfessorController.ts
````typescript
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { ProfessorService } from '../services/ProfessorService';
import { ProfessorRepository } from '../repositories/professor.repository';
import { ConsoleAuditService } from '../services/AuditService';
import { InMemoryCacheService } from '../services/CacheService';
import { UserService } from '../services/UserService';
import { UnauthorizedError, ValidationError } from '../errors/http.errors';
import { sendSuccess } from '../utils/apiResponse';

const auditService = new ConsoleAuditService();
const cacheService = new InMemoryCacheService();
const userService = new UserService();
const repository = new ProfessorRepository();
const professorService = new ProfessorService(repository, auditService, cacheService, userService);

const getUserIdFromRequest = (req: AuthenticatedRequest) => req.user?.userId;
const getSinglePathParam = (param: string | string[] | undefined) =>
  Array.isArray(param) ? param[0] : param;

export const updateGrade = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const professorId = getUserIdFromRequest(req);
    if (!professorId) throw new UnauthorizedError('Utilisateur non authentifie.');

    const grade = await professorService.updateGrade(professorId, req.body);
    sendSuccess(res, grade);
  } catch (error) {
    next(error);
  }
};

export const updateSchedule = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const professorId = getUserIdFromRequest(req);
    if (!professorId) throw new UnauthorizedError('Utilisateur non authentifie.');

    const courseId = getSinglePathParam(req.params.courseId);
    if (!courseId) throw new ValidationError('courseId est requis dans l URL.');

    const events = req.body.events;
    if (!Array.isArray(events)) throw new ValidationError('events doit etre un tableau.');

    const updatedEvents = await professorService.updateSchedule(professorId, courseId, events);
    sendSuccess(res, updatedEvents);
  } catch (error) {
    next(error);
  }
};

export const assignCourse = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const professorId = getUserIdFromRequest(req);
    if (!professorId) throw new UnauthorizedError('Utilisateur non authentifie.');

    const courseId = getSinglePathParam(req.params.courseId);
    if (!courseId) throw new ValidationError('courseId est requis dans l URL.');

    const professor = await professorService.assignToCourse(professorId, courseId);
    sendSuccess(res, { message: 'Cours assigne au professeur.', professor });
  } catch (error) {
    next(error);
  }
};

export const getMyCourses = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const professorId = getUserIdFromRequest(req);
    if (!professorId) throw new UnauthorizedError('Utilisateur non authentifie.');

    const courses = await professorService.getMyCourses(professorId);
    sendSuccess(res, courses);
  } catch (error) {
    next(error);
  }
};

export const getStudentsByCourseCode = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const professorId = getUserIdFromRequest(req);
    const code = getSinglePathParam(req.params.code);
    if (!professorId) throw new UnauthorizedError('Utilisateur non authentifie.');
    if (!code) throw new ValidationError('code est requis.');

    const students = await professorService.getStudentsInCourse(professorId, code);
    sendSuccess(res, students);
  } catch (error) {
    next(error);
  }
};
````

## File: backend/src/controllers/ProfileController.ts
````typescript
import { Request, Response } from 'express';
import { db } from '../lib/db';
import { sendError, sendSuccess } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

const getUserId = (req: Request): string | undefined =>
  (req as AuthenticatedRequest).user?.userId;

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return sendError(res, 'Non authentifie.', 401, 'UNAUTHORIZED');

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        language: true,
        timezone: true
      }
    });

    if (!user) return sendError(res, 'Utilisateur introuvable.', 404, 'USER_NOT_FOUND');

    sendSuccess(res, user);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur serveur';
    sendError(res, message);
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return sendError(res, 'Non authentifie.', 401, 'UNAUTHORIZED');

    const { name, email, language, timezone, avatarUrl } = req.body;

    if (!name || !email) return sendError(res, 'Nom et email sont requis.', 400, 'MISSING_FIELDS');
    if (!String(email).includes('@')) return sendError(res, 'Email invalide.', 400, 'INVALID_EMAIL');
    if (language !== undefined && String(language).trim().length === 0) return sendError(res, 'Langue invalide.', 400, 'INVALID_LANGUAGE');
    if (timezone !== undefined && String(timezone).trim().length === 0) return sendError(res, 'Fuseau horaire invalide.', 400, 'INVALID_TIMEZONE');
    if (avatarUrl !== undefined && avatarUrl !== null && String(avatarUrl).trim().length > 500) {
      return sendError(res, 'Avatar URL trop long.', 400, 'INVALID_AVATAR');
    }

    const existing = await db.user.findUnique({ where: { email }, select: { id: true } });
    if (existing && existing.id !== userId) return sendError(res, 'Email deja utilise.', 400, 'EMAIL_TAKEN');

    const user = await db.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        language: language !== undefined ? String(language) : undefined,
        timezone: timezone !== undefined ? String(timezone) : undefined,
        avatarUrl: avatarUrl === undefined ? undefined : (avatarUrl ? String(avatarUrl) : null)
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        language: true,
        timezone: true
      }
    });

    sendSuccess(res, user);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur lors de la mise a jour du profil';
    sendError(res, message);
  }
};
````

## File: backend/src/controllers/RiskController.ts
````typescript
import { Request, Response } from 'express';
import { RiskService } from '../services/RiskService';
import { sendError, sendSuccess } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

const getCourseRisk = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const userId = (req as AuthenticatedRequest).user?.userId;

  if (!courseId) return sendError(res, 'courseId est requis.', 400, 'MISSING_COURSE_ID');
  if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

  try {
    const analysis = await RiskService.analyzeCourse(String(courseId), userId);
    sendSuccess(res, analysis);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export default { getCourseRisk };
````

## File: backend/src/controllers/SyncController.ts
````typescript
import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { db } from '../lib/db';
import { catchAsync } from '../utils/catchAsync';
import { ValidationError, UnauthorizedError } from '../errors/http.errors';
import { logger } from '../utils/logger';
import { syncPushTask, syncDeleteTask, syncPullTasks, ensureTaskCompatibility } from '../services/TaskSyncService';
import { EventSyncService } from '../services/EventSyncService';
import { GradeSyncService } from '../services/GradeSyncService';
import { WorkSyncService } from '../services/WorkSyncService';
import { CourseSyncService } from '../services/CourseSyncService';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const isValidUuid = (value: unknown) => typeof value === 'string' && UUID_REGEX.test(value);
const isPrismaDataError = (error: any) => typeof error?.code === 'string' && /^P2\d{3}$/.test(error.code);

/**
 * Handle PUSH synchronization from client
 */
export const handleSyncPush = catchAsync(async (req: Request, res: Response) => {
    const { type, entity, data, deviceId } = req.body;
    const userId = (req as any).user?.userId;

    if (!userId) throw new UnauthorizedError();
    if (!isValidUuid(userId)) throw new UnauthorizedError('Token utilisateur invalide');
    if (!entity || !data?.id) throw new ValidationError('Entite ou ID manquant');
    if (!['CREATE', 'UPDATE', 'DELETE'].includes(type)) {
        throw new ValidationError('Type de synchronisation invalide');
    }

    const normalizedData = { ...data };
    if (!isValidUuid(normalizedData.id)) {
        if (type === 'CREATE') {
            normalizedData.id = randomUUID();
        } else {
            throw new ValidationError(`ID invalide pour ${entity}`);
        }
    }

    try {
        await db.syncHistory.create({
            data: {
                userId,
                deviceId: deviceId || 'unknown',
                syncType: 'PUSH',
                status: 'STARTED',
                itemsPushed: 1
            }
        });
    } catch (error) {
        logger.warn({ msg: 'syncHistory PUSH skipped', error });
    }

    let result: any;

    try {
        switch (entity) {
            case 'Task':
                if (type === 'DELETE') {
                    const deleteResult = await syncDeleteTask(normalizedData.id, userId);
                    if (!deleteResult.success) throw new ValidationError(deleteResult.error);
                    result = { id: normalizedData.id };
                } else {
                    const pushResult = await syncPushTask(normalizedData, userId, type);
                    if (!pushResult.success) throw new ValidationError(pushResult.error);
                    result = pushResult.data;
                }
                break;

            case 'Event':
                result = await EventSyncService.push(normalizedData, userId, type);
                break;

            case 'Grade':
                result = await GradeSyncService.push(normalizedData, userId, type);
                break;

            case 'Work':
                result = await WorkSyncService.push(normalizedData, userId, type);
                break;

            case 'Course':
                result = await CourseSyncService.push(normalizedData, userId, type);
                break;

            default:
                throw new ValidationError(`Entite non supportee: ${entity}`);
        }
    } catch (error: any) {
        if (isPrismaDataError(error)) {
            throw new ValidationError(error.message || 'Donnees de synchronisation invalides');
        }
        throw error;
    }

    res.status(200).json({
        success: true,
        data: {
            id: result?.id || normalizedData.id,
            syncedAt: new Date(),
            entity: result
        }
    });
});

/**
 * Handle PULL synchronization from client
 */
export const handleSyncPull = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    if (!userId) throw new UnauthorizedError();
    if (!isValidUuid(userId)) throw new UnauthorizedError('Token utilisateur invalide');

    const candidateDate = req.query.lastPulledAt ? new Date(String(req.query.lastPulledAt)) : new Date(0);
    const lastPulledAt = Number.isNaN(candidateDate.getTime()) ? new Date(0) : candidateDate;
    const deviceId = (req.query.deviceId as string) || 'unknown';

    const safePull = async <T>(label: string, fn: () => Promise<T[]>): Promise<T[]> => {
        try {
            return await fn();
        } catch (error) {
            logger.error({ msg: `sync pull failed for ${label}`, error, userId });
            return [];
        }
    };

    const [tasks, events, grades, works, courses] = await Promise.all([
        safePull('tasks', () => syncPullTasks(userId, lastPulledAt)),
        safePull('events', () => EventSyncService.pull(userId, lastPulledAt)),
        safePull('grades', () => GradeSyncService.pull(userId, lastPulledAt)),
        safePull('works', () => WorkSyncService.pull(userId, lastPulledAt)),
        safePull('courses', () => CourseSyncService.pull(userId, lastPulledAt))
    ]);

    const formattedTasks = tasks.map(ensureTaskCompatibility);

    try {
        await db.syncHistory.create({
            data: {
                userId,
                deviceId,
                syncType: 'PULL',
                status: 'COMPLETED',
                itemsPulled: formattedTasks.length + events.length + grades.length + works.length + courses.length
            }
        });
    } catch (error) {
        logger.warn({ msg: 'syncHistory PULL skipped', error });
    }

    res.status(200).json({
        success: true,
        data: {
            changes: {
                tasks: formattedTasks,
                events,
                grades,
                works,
                courses
            },
            timestamp: new Date()
        }
    });
});
````

## File: backend/src/controllers/TaskController.ts
````typescript
import { Request, Response } from 'express';
import { db } from '../lib/db';
import { TaskService } from '../services/TaskService';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { createTaskSchema, updateTaskSchema, reorderTasksSchema } from '../validators/task.validators';
import { z } from 'zod';
import { sendError, sendSuccess } from '../utils/apiResponse';

const getUserId = (req: Request) => (req as AuthenticatedRequest).user?.userId;

const toDateOrUndefined = (value: unknown) => {
  if (!value) return undefined;
  const parsed = new Date(String(value));
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

const parseZodError = (error: z.ZodError): string =>
  error.issues.map((issue) => issue.message).join(', ');

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const { courseId, eventId } = req.query;

    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const where: { userId: string; isDeleted: boolean; courseId?: string; eventId?: string } = {
      userId,
      isDeleted: false
    };
    if (courseId) where.courseId = String(courseId);
    if (eventId) where.eventId = String(eventId);

    const tasks = await db.task.findMany({
      where,
      orderBy: [{ position: 'asc' }, { dueDate: 'asc' }]
    });

    sendSuccess(res, tasks);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const payload = createTaskSchema.parse(req.body);

    if (payload.eventId) {
      const event = await db.event.findUnique({ where: { id: payload.eventId } });
      if (!event || event.userId !== userId) return sendError(res, 'Evenement introuvable.', 404, 'EVENT_NOT_FOUND');
    }

    const maxPositionTask = await db.task.findFirst({
      where: { userId, eventId: payload.eventId ?? null, isDeleted: false },
      orderBy: { position: 'desc' },
      select: { position: true }
    });

    const task = await db.task.create({
      data: {
        userId,
        title: payload.title,
        description: payload.description,
        status: payload.status ?? 'PENDING',
        priority: payload.priority ?? 'MEDIUM',
        dueDate: payload.dueDate ? new Date(payload.dueDate) : undefined,
        courseId: payload.courseId,
        eventId: payload.eventId,
        durationMinutes: payload.durationMinutes,
        position: (maxPositionTask?.position ?? -1) + 1
      }
    });

    sendSuccess(res, task, 201);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) return sendError(res, parseZodError(error), 400, 'VALIDATION_ERROR');
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const id = String(req.params.id);

    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const payload = updateTaskSchema.parse(req.body);

    const task = await db.task.findUnique({ where: { id } });
    if (!task || task.userId !== userId) {
      return sendError(res, 'Tache introuvable.', 404, 'TASK_NOT_FOUND');
    }

    if (payload.eventId) {
      const event = await db.event.findUnique({ where: { id: payload.eventId } });
      if (!event || event.userId !== userId) return sendError(res, 'Evenement introuvable.', 404, 'EVENT_NOT_FOUND');
    }

    const updated = await db.task.update({
      where: { id },
      data: {
        ...payload,
        dueDate: payload.dueDate ? new Date(payload.dueDate) : undefined,
        updatedAt: new Date()
      }
    });

    sendSuccess(res, updated);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) return sendError(res, parseZodError(error), 400, 'VALIDATION_ERROR');
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const id = String(req.params.id);

    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const task = await db.task.findUnique({ where: { id } });
    if (!task || task.userId !== userId) {
      return sendError(res, 'Tache introuvable.', 404, 'TASK_NOT_FOUND');
    }

    await db.task.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() }
    });

    sendSuccess(res, { message: 'Tache supprimee avec succes.' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const getBoardTasks = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const { from, to } = req.query;
    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const where: { userId: string; startDate?: { gte?: Date; lte?: Date } } = { userId };
    if (from || to) {
      where.startDate = {};
      const fromDate = toDateOrUndefined(from);
      const toDate = toDateOrUndefined(to);
      if (from && !fromDate) return sendError(res, 'Date from invalide.', 400, 'INVALID_FROM_DATE');
      if (to && !toDate) return sendError(res, 'Date to invalide.', 400, 'INVALID_TO_DATE');
      if (fromDate) where.startDate.gte = fromDate;
      if (toDate) where.startDate.lte = toDate;
    }

    const events = await db.event.findMany({
      where,
      orderBy: { startDate: 'asc' },
      include: {
        tasks: {
          where: { isDeleted: false },
          orderBy: [{ position: 'asc' }, { dueDate: 'asc' }]
        }
      }
    });

    sendSuccess(res, events);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const getTasksByEvent = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const eventId = String(req.params.eventId);
    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const event = await db.event.findUnique({ where: { id: eventId } });
    if (!event || event.userId !== userId) {
      return sendError(res, 'Evenement introuvable.', 404, 'EVENT_NOT_FOUND');
    }

    const tasks = await db.task.findMany({
      where: { userId, eventId, isDeleted: false },
      orderBy: [{ position: 'asc' }, { dueDate: 'asc' }]
    });

    sendSuccess(res, tasks);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const createTaskForEvent = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const eventId = String(req.params.eventId);
    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const event = await db.event.findUnique({ where: { id: eventId } });
    if (!event || event.userId !== userId) {
      return sendError(res, 'Evenement introuvable.', 404, 'EVENT_NOT_FOUND');
    }

    const bodyWithEvent = { ...req.body, eventId };
    const validated = createTaskSchema.parse(bodyWithEvent);

    const last = await db.task.findFirst({
      where: { userId, eventId, isDeleted: false },
      orderBy: { position: 'desc' },
      select: { position: true }
    });

    const task = await db.task.create({
      data: {
        userId,
        eventId,
        title: validated.title,
        description: validated.description,
        priority: validated.priority ?? 'MEDIUM',
        dueDate: validated.dueDate ? new Date(validated.dueDate) : undefined,
        durationMinutes: validated.durationMinutes,
        courseId: validated.courseId ?? event.courseId ?? undefined,
        position: (last?.position ?? -1) + 1
      }
    });

    sendSuccess(res, task, 201);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) return sendError(res, parseZodError(error), 400, 'VALIDATION_ERROR');
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const reorderTasks = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const payload = reorderTasksSchema.parse(req.body);
    await TaskService.reorderTasks(userId, payload.items);

    sendSuccess(res, { message: 'Ordre des taches mis a jour.' });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) return sendError(res, parseZodError(error), 400, 'VALIDATION_ERROR');
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const startTask = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const id = String(req.params.id);
    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const updated = await TaskService.startTask(id, userId);
    sendSuccess(res, updated);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    const status = message === 'Task not found' ? 404 : 400;
    sendError(res, message, status, status === 404 ? 'TASK_NOT_FOUND' : 'BAD_REQUEST');
  }
};

export const pauseTask = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const id = String(req.params.id);
    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const result = await TaskService.pauseTask(id, userId);
    sendSuccess(res, result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    const status = message === 'Task not found' ? 404 : 400;
    sendError(res, message, status, status === 404 ? 'TASK_NOT_FOUND' : 'BAD_REQUEST');
  }
};

export const completeTask = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const id = String(req.params.id);
    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const updated = await TaskService.completeTask(id, userId);
    sendSuccess(res, updated);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    const status = message === 'Task not found' ? 404 : 400;
    sendError(res, message, status, status === 404 ? 'TASK_NOT_FOUND' : 'BAD_REQUEST');
  }
};

export const getCurrentFocusTask = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return sendError(res, 'Non autorise.', 401, 'UNAUTHORIZED');

    const task = await db.task.findFirst({
      where: { userId, startedAt: { not: null }, isDeleted: false },
      orderBy: { startedAt: 'desc' }
    });

    sendSuccess(res, task);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};
````

## File: backend/src/controllers/WorkController.ts
````typescript
import { Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../lib/db';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { createWorkSchema, updateWorkSchema } from '../validators/work.validators';
import { PointsEngineService } from '../services/PointsEngineService';
import { WorkService } from '../services/WorkService';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { Prisma } from '@prisma/client';

// CORRECTIF: helper typé pour éviter le cast répété
const getUserId = (req: Request): string | undefined =>
  (req as AuthenticatedRequest).user?.userId;

const toDateOrNull = (value: unknown): Date | null | undefined => {
  if (value === undefined) return undefined;
  if (value === null || value === '') return null;
  return new Date(String(value));
};

export const getWorks = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return sendError(res, 'Non autorisé.', 401, 'UNAUTHORIZED');

    const { courseId, status, startDate, endDate } = req.query;

    // CORRECTIF: type explicite à la place de any
    const where: Prisma.WorkWhereInput = { userId };
    if (courseId) where.courseId = String(courseId);
    if (status) where.status = String(status) as any;
    if (startDate || endDate) {
      where.dueDate = {};
      if (startDate) where.dueDate.gte = new Date(String(startDate));
      if (endDate) where.dueDate.lte = new Date(String(endDate));
    }

    const works = await db.work.findMany({
      where,
      include: { workType: { select: { type: true, weightPercent: true } } },
      orderBy: [{ dueDate: 'asc' }, { createdAt: 'desc' }],
    });

    // CORRECTIF: format uniforme { success, data }
    sendSuccess(res, works);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const createWork = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return sendError(res, 'Non autorisé.', 401, 'UNAUTHORIZED');

    const payload = createWorkSchema.parse(req.body);

    const course = await db.course.findUnique({ where: { id: payload.courseId } });
    if (!course || course.userId !== userId) {
      return sendError(res, 'Cours introuvable.', 404, 'COURSE_NOT_FOUND');
    }

    if (payload.eventId) {
      const event = await db.event.findUnique({ where: { id: payload.eventId } });
      if (!event || event.userId !== userId) {
        return sendError(res, 'Événement introuvable.', 404, 'EVENT_NOT_FOUND');
      }
    }

    const pointsPossible = Number(payload.pointsPossible ?? 20);
    const pointsEarned = payload.pointsEarned === undefined ? null : Number(payload.pointsEarned);
    const pointsError = WorkService.validatePointsRange(pointsEarned, pointsPossible);
    if (pointsError) return sendError(res, pointsError, 400, 'INVALID_POINTS');

    const label = String(payload.workTypeLabel || '').trim().toUpperCase() || null;
    let workTypeId = payload.workTypeId ?? undefined;
    if (!workTypeId && label) {
      workTypeId = await WorkService.resolveWorkTypeId(payload.courseId, label);
    }
    if (workTypeId) {
      const workType = await db.courseWorkType.findUnique({ where: { id: workTypeId } });
      if (!workType || workType.courseId !== payload.courseId) {
        return sendError(res, 'Type de travail invalide pour ce cours.', 400, 'INVALID_WORK_TYPE');
      }
    }

    const work = await db.work.create({
      data: {
        userId,
        localId: payload.localId,
        title: payload.title,
        description: payload.description,
        status: payload.status ?? 'PLANNED',
        dueDate: payload.dueDate ? new Date(payload.dueDate) : undefined,
        submittedAt: payload.submittedAt ? new Date(payload.submittedAt) : undefined,
        gradedAt: payload.gradedAt ? new Date(payload.gradedAt) : undefined,
        pointsEarned,
        pointsPossible,
        percentage: payload.percentage,
        comment: payload.comment,
        courseId: payload.courseId,
        eventId: payload.eventId,
        workTypeId,
        workTypeLabel: label,
      },
      include: { workType: { select: { type: true, weightPercent: true } } },
    });

    if (work.status === 'GRADED' && work.pointsEarned !== null) {
      await db.grade.create({
        data: {
          userId,
          courseId: work.courseId,
          workId: work.id,
          score: work.pointsEarned,
          maxScore: work.pointsPossible,
          percentage: work.percentage,
          workTypeLabel: work.workTypeLabel,
          workTypeId: work.workTypeId,
          date: work.gradedAt || new Date(),
          name: work.title,
        }
      });
    }

    sendSuccess(res, work, 201);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return sendError(res, error.issues.map((i) => i.message).join(', '), 400, 'VALIDATION_ERROR');
    }
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const updateWork = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const id = String(req.params.id);
    if (!userId) return sendError(res, 'Non autorisé.', 401, 'UNAUTHORIZED');

    const payload = updateWorkSchema.parse(req.body);

    const existing = await db.work.findUnique({ where: { id } });
    if (!existing || existing.userId !== userId) {
      return sendError(res, 'Travail introuvable.', 404, 'WORK_NOT_FOUND');
    }

    const nextPointsPossible =
      payload.pointsPossible !== undefined
        ? Number(payload.pointsPossible)
        : Number(existing.pointsPossible);
    const nextPointsEarned =
      payload.pointsEarned !== undefined
        ? payload.pointsEarned === null
          ? null
          : Number(payload.pointsEarned)
        : existing.pointsEarned;
    const pointsError = WorkService.validatePointsRange(nextPointsEarned, nextPointsPossible);
    if (pointsError) return sendError(res, pointsError, 400, 'INVALID_POINTS');

    if (payload.eventId) {
      const event = await db.event.findUnique({ where: { id: payload.eventId } });
      if (!event || event.userId !== userId) {
        return sendError(res, 'Événement introuvable.', 404, 'EVENT_NOT_FOUND');
      }
    }

    const workTypeLabel =
      typeof payload.workTypeLabel === 'string'
        ? payload.workTypeLabel.trim().toUpperCase() || null
        : payload.workTypeLabel;

    const workTypeId =
      payload.workTypeId === undefined
        ? undefined
        : payload.workTypeId ?? null;

    if (workTypeId) {
      const workType = await db.courseWorkType.findUnique({ where: { id: workTypeId } });
      if (!workType || workType.courseId !== existing.courseId) {
        return sendError(res, 'Type de travail invalide pour ce cours.', 400, 'INVALID_WORK_TYPE');
      }
    }

    // CORRECTIF: plus de spread ...payload avec any — champs explicites
    const resolvedWorkTypeId =
      !workTypeId && workTypeLabel
        ? await WorkService.resolveWorkTypeId(existing.courseId, workTypeLabel)
        : workTypeId;

    const updated = await db.work.update({
      where: { id },
      data: {
        title: payload.title,
        description: payload.description,
        status: payload.status,
        dueDate: toDateOrNull(payload.dueDate),
        submittedAt: toDateOrNull(payload.submittedAt),
        gradedAt: toDateOrNull(payload.gradedAt),
        pointsEarned: nextPointsEarned,
        pointsPossible: nextPointsPossible,
        percentage: payload.percentage,
        comment: payload.comment,
        eventId: payload.eventId,
        workTypeId: resolvedWorkTypeId ?? null,
        workTypeLabel,
        lastModifiedAt: new Date(),
      },
      include: { workType: { select: { type: true, weightPercent: true } } },
    });

    if (updated.status === 'GRADED' && updated.pointsEarned !== null) {
      const existingGrade = await db.grade.findFirst({ where: { workId: updated.id, userId } });
      if (existingGrade) {
        await db.grade.update({
          where: { id: existingGrade.id },
          data: {
            score: updated.pointsEarned,
            maxScore: updated.pointsPossible,
            percentage: updated.percentage,
            workTypeLabel: updated.workTypeLabel,
            workTypeId: updated.workTypeId,
            date: updated.gradedAt || updated.lastModifiedAt,
            name: updated.title,
            courseId: updated.courseId,
          }
        });
      } else {
        await db.grade.create({
          data: {
            userId,
            courseId: updated.courseId,
            workId: updated.id,
            score: updated.pointsEarned,
            maxScore: updated.pointsPossible,
            percentage: updated.percentage,
            workTypeLabel: updated.workTypeLabel,
            workTypeId: updated.workTypeId,
            date: updated.gradedAt || updated.lastModifiedAt,
            name: updated.title,
          }
        });
      }
    } else {
      await db.grade.deleteMany({
        where: { workId: updated.id, userId }
      });
    }

    sendSuccess(res, updated);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return sendError(res, error.issues.map((i) => i.message).join(', '), 400, 'VALIDATION_ERROR');
    }
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const deleteWork = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const id = String(req.params.id);
    if (!userId) return sendError(res, 'Non autorisé.', 401, 'UNAUTHORIZED');

    const work = await db.work.findUnique({ where: { id } });
    if (!work || work.userId !== userId) {
      return sendError(res, 'Travail introuvable.', 404, 'WORK_NOT_FOUND');
    }

    await db.grade.deleteMany({ where: { workId: id, userId } });
    await db.work.delete({ where: { id } });
    sendSuccess(res, { message: 'Travail supprimé avec succès.' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};

export const recalculateWorkPoints = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const id = String(req.params.id);
    if (!userId) return sendError(res, 'Non autorisé.', 401, 'UNAUTHORIZED');

    const work = await db.work.findUnique({
      where: { id },
      include: { workType: { select: { type: true, weightPercent: true } } },
    });
    if (!work || work.userId !== userId) {
      return sendError(res, 'Travail introuvable.', 404, 'WORK_NOT_FOUND');
    }

    const normalized =
      work.pointsEarned === null
        ? null
        : Math.round(
          PointsEngineService.normalizeToTwenty(
            Number(work.pointsEarned),
            Number(work.pointsPossible)
          ) * 100
        ) / 100;

    const courseSnapshot = await WorkService.recalculateForCourse(userId, work.courseId);

    sendSuccess(res, {
      workId: work.id,
      normalizedOn20: normalized,
      percentage: work.percentage ?? null,
      courseAverage: courseSnapshot.average,
      gradedWorkCount: courseSnapshot.gradedWorkCount,
      workCount: courseSnapshot.workCount,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};
````

## File: backend/src/errors/AppError.ts
````typescript
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
````

## File: backend/src/errors/http.errors.ts
````typescript
import { AppError } from './AppError';

export class HttpError extends AppError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}

export class ValidationError extends HttpError {
  constructor(message: string = 'Validation échouée') {
    super(message, 400);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Non autorisé') {
    super(message, 401);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string = 'Accès interdit') {
    super(message, 403);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = 'Ressource introuvable') {
    super(message, 404);
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string = 'Erreur interne du serveur') {
    super(message, 500);
  }
}
````

## File: backend/src/index.ts
````typescript
import dotenv from "dotenv";
dotenv.config(); // ← DOIT être en premier, avant tout autre import qui utilise process.env

import app from "./app";

const PORT = process.env.PORT || 3000;
const dbHost = process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] ?? 'NON DÉFINI';

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`🗄️  DB host: ${dbHost}`);
});
````

## File: backend/src/lib/db.ts
````typescript
// src/lib/db.ts
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: PrismaClient | undefined
}

export const db = global.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') global.prisma = db
````

## File: backend/src/lib/prisma-extensions.ts
````typescript
import { PrismaClient } from "@prisma/client";

/**
 * Prisma Extension to handle Soft Delete automatically
 * This will intercept find/update/delete operations for models that have a 'deletedAt' field.
 */
export const softDeleteExtension = (prisma: PrismaClient) => {
  return prisma.$extends({
    name: 'softDelete',
    query: {
      $allModels: {
        async delete({ model, args }) {
          // Instead of actual delete, we do an update
          return (prisma as any)[model].update({
            ...args,
            data: { deletedAt: new Date(), isDeleted: true },
          });
        },
        async deleteMany({ model, args }) {
          return (prisma as any)[model].updateMany({
            ...args,
            data: { deletedAt: new Date(), isDeleted: true },
          });
        },
        async findUnique({ model, args, query }) {
          if (args.where && !(args.where as any).isDeleted) {
            (args.where as any).isDeleted = false;
          }
          return query(args);
        },
        async findFirst({ model, args, query }) {
          if (args.where && !(args.where as any).isDeleted) {
            (args.where as any).isDeleted = false;
          }
          return query(args);
        },
        async findMany({ model, args, query }) {
          if (args.where && !(args.where as any).isDeleted) {
            (args.where as any).isDeleted = false;
          }
          return query(args);
        },
        async count({ model, args, query }) {
          if (args.where && !(args.where as any).isDeleted) {
            (args.where as any).isDeleted = false;
          }
          return query(args);
        },
      }
    }
  });
};
````

## File: backend/src/middlewares/__tests__/auth.middleware.test.ts
````typescript
import { authenticateToken } from "../auth.middleware";
import jwt from "jsonwebtoken";

// Mock jwt
jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

describe("authenticateToken", () => {
  let mockReq: any;
  let mockRes: any;
  let next: jest.Mock;

  beforeEach(() => {
    mockReq = {
      headers: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    process.env.JWT_SECRET = "test-secret";
    jest.clearAllMocks();
  });

  it("should set user id on request if token is valid", () => {
    mockReq.headers.authorization = "Bearer valid-token";
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(null, { userId: "user-123" });
    });

    authenticateToken(mockReq, mockRes, next);

    expect(mockReq.user).toEqual({ userId: "user-123" });
    expect(next).toHaveBeenCalled();
  });

  it("should return 401 if no authorization header is present", () => {
    authenticateToken(mockReq, mockRes, next);
    expect(mockRes.status).toHaveBeenCalledWith(401);
  });

  it("should return 401 if token is invalid", () => {
    mockReq.headers.authorization = "Bearer invalid-token";
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(new Error("Invalid token"), null);
    });

    authenticateToken(mockReq, mockRes, next);
    expect(mockRes.status).toHaveBeenCalledWith(401);
  });
});
````

## File: backend/src/middlewares/auth.middleware.ts
````typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendError } from '../utils/apiResponse';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email?: string;
  };
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return sendError(res, 'Access token requis.', 401, 'MISSING_ACCESS_TOKEN');

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET is not defined');
    return sendError(res, 'Configuration serveur invalide.', 500, 'SERVER_CONFIG_ERROR');
  }

  jwt.verify(token, secret, (err: any, user: any) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return sendError(res, 'Token expire.', 401, 'TOKEN_EXPIRED');
      }
      return sendError(res, 'Token invalide.', 401, 'INVALID_TOKEN');
    }

    (req as AuthenticatedRequest).user = user;
    next();
  });
};
````

## File: backend/src/middlewares/error.middleware.ts
````typescript
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error({
      msg: 'Global Error Captured',
      path: req.path,
      method: req.method,
      error: err instanceof Error ? err.message : err,
      stack: err instanceof Error ? err.stack : undefined
    });

    if (res.headersSent) {
        return next(err);
    }

    const status = err.statusCode || err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        success: false,
        error: {
            message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        }
    });
};
````

## File: backend/src/middlewares/professor.middleware.ts
````typescript
import { Request, Response, NextFunction } from 'express';
import { db } from '../lib/db';
import { AuthenticatedRequest } from './auth.middleware';
import { sendError } from '../utils/apiResponse';

export const requireProfessorRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user?.userId;

    if (!userId) return sendError(res, 'Non authentifie.', 401, 'UNAUTHORIZED');

    const user = await db.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    if (!user || user.role !== 'PROFESSOR') {
      return sendError(res, 'Acces reserve aux professeurs.', 403, 'FORBIDDEN');
    }

    next();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    sendError(res, message);
  }
};
````

## File: backend/src/middlewares/sanitize.middleware.ts
````typescript
import { Request, Response, NextFunction } from 'express';

/**
 * Basic XSS sanitization middleware.
 * It recursively cleans all string properties in the provided value.
 */
const sanitizeValue = (value: any): any => {
    if (typeof value === 'string') {
        // Remove script tags and other potentially dangerous patterns
        return value
            .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, '')
            .replace(/on\w+="[^"]*"/gim, '')
            .replace(/on\w+='[^']*'/gim, '')
            .replace(/javascript:/gim, '');
    }
    
    if (Array.isArray(value)) {
        return value.map(sanitizeValue);
    }
    
    if (value !== null && typeof value === 'object') {
        const sanitized: any = {};
        for (const key in value) {
            sanitized[key] = sanitizeValue(value[key]);
        }
        return sanitized;
    }
    
    return value;
};

/**
 * Middleware to sanitize request input (body, query, params).
 * Note: In some Express versions (like Express 5), req.query and req.params 
 * might be read-only getters. We use try-catch to safely handle these.
 */
export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
    if (req.body) {
        try {
            req.body = sanitizeValue(req.body);
        } catch (e) {
            // If body is read-only for some reason, we can't sanitize it this way
        }
    }
    
    // For query and params in Express 5, these are getters. 
    // We use Object.defineProperty to override them if they need sanitization.
    try {
        const sanitizedQuery = sanitizeValue(req.query);
        Object.defineProperty(req, 'query', {
            value: sanitizedQuery,
            writable: true,
            configurable: true,
            enumerable: true
        });
    } catch (e) {
        // Skip if we can't redefine
    }

    try {
        const sanitizedParams = sanitizeValue(req.params);
        Object.defineProperty(req, 'params', {
            value: sanitizedParams,
            writable: true,
            configurable: true,
            enumerable: true
        });
    } catch (e) {
        // Skip if we can't redefine
    }

    next();
};
````

## File: backend/src/middlewares/validate.middleware.ts
````typescript
import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';
import { AppError } from '../errors/AppError';

/**
 * Middleware to validate request data using Zod.
 * Checks body, query, and params.
 */
export const validate = (schema: {
  body?: ZodObject<any>;
  query?: ZodObject<any>;
  params?: ZodObject<any>;
}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }
      if (schema.query) {
        const parsedQuery = await schema.query.parseAsync(req.query);
        Object.defineProperty(req, 'query', {
          value: parsedQuery,
          writable: true,
          configurable: true,
          enumerable: true
        });
      }
      if (schema.params) {
        const parsedParams = await schema.params.parseAsync(req.params);
        Object.defineProperty(req, 'params', {
          value: parsedParams,
          writable: true,
          configurable: true,
          enumerable: true
        });
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues.map((i) => i.message).join(', ');
        return next(new AppError(`Validation échouée: ${message}`, 400));
      }
      next(error);
    }
  };
};
````

## File: backend/src/repositories/professor.repository.ts
````typescript
import { db } from '../lib/db';
import { Prisma } from '@prisma/client';

export type GradeWithRelations = any & {
  work?: any | null;
  workType?: any | null;
};

export class ProfessorRepository {
  async findGradeById(id: string) {
    return db.grade.findUnique({
      where: { id },
      include: { work: true }
    });
  }

  async findGradeByWork(userId: string, courseId: string, workId: string) {
    return db.grade.findFirst({
      where: { userId, courseId, workId },
      include: { work: true }
    });
  }

  async findWork(id: string) {
    return db.work.findUnique({
      where: { id }
    });
  }

  async createGrade(data: any) {
    return db.grade.create({
      data,
      include: { work: true }
    });
  }

  async updateGrade(id: string, data: any) {
    return db.grade.update({
      where: { id },
      data,
      include: { work: true }
    });
  }

  async findEvent(id: string) {
    return db.event.findUnique({
      where: { id }
    });
  }

  async updateEvent(id: string, data: any) {
    return db.event.update({
      where: { id },
      data
    });
  }

  async findCourse(id: string) {
    return db.course.findUnique({
      where: { id }
    });
  }

  async findProfessorWithCourses(userId: string) {
    // Return the professor profile linked to the user
    return db.professor.findUnique({
      where: { userId },
      include: { courses: true }
    });
  }

  async assignCourse(professorId: string, courseId: string) {
    return db.professor.update({
      where: { id: professorId },
      data: {
        courses: {
          connect: { id: courseId }
        }
      }
    });
  }

  async listCoursesForProfessor(professorId: string) {
    const professor = await db.professor.findUnique({
      where: { id: professorId },
      include: { courses: true }
    });
    return professor?.courses || [];
  }

  async countStudentsInCourse(code: string) {
    return db.course.count({
      where: { code, isDeleted: false }
    });
  }
}
````

## File: backend/src/routes/auth.routes.ts
````typescript
import { Router } from 'express';
import { register, login, ResetPassword, forgotPassword, logout, RefreshToken } from '../controllers/AuthController';
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  logoutSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} from '../validators/auth.validators';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

router.post('/register', validate({ body: registerSchema }), register);
router.post('/login', validate({ body: loginSchema }), login);
router.post('/refresh-token', validate({ body: refreshTokenSchema }), RefreshToken);
router.post('/logout', validate({ body: logoutSchema }), logout);
router.post('/forgot-password', validate({ body: forgotPasswordSchema }), forgotPassword);
router.post('/reset-password', validate({ body: resetPasswordSchema }), ResetPassword);

export default router;
````

## File: backend/src/routes/course.routes.ts
````typescript
import { Router } from 'express';
import * as CourseController from '../controllers/CourseController';
import { authenticateToken } from '../middlewares/auth.middleware'; 

const router = Router();

router.use(authenticateToken); // Protect all course routes

router.get('/', CourseController.getCourses);
router.get('/search', CourseController.searchCourses);
router.post('/work-types/init', CourseController.initCourseWorkTypes);
router.get('/:id/work-types', CourseController.getCourseWorkTypes);
router.get('/:id', CourseController.getCourseById);
router.post('/', CourseController.createCourse);
router.put('/:id/work-types', CourseController.updateCourseWorkTypes);
router.patch('/:id', CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);

export default router;
````

## File: backend/src/routes/event.routes.ts
````typescript
import { Router } from 'express';
import * as EventController from '../controllers/EventController';
import { authenticateToken } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createEventSchema, updateEventSchema } from '../validators/event.validators';

const router = Router();

router.use(authenticateToken);

router.get('/', EventController.getEvents);
router.post('/', validate({ body: createEventSchema }), EventController.createEvent);
router.patch('/:id', validate({ body: updateEventSchema }), EventController.updateEvent);
router.delete('/:id', EventController.deleteEvent);

export default router;
````

## File: backend/src/routes/grade.routes.ts
````typescript
import { Router } from 'express';
import * as GradeController from '../controllers/GradeController';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/', GradeController.getGrades);
router.get('/average', GradeController.getGeneralAverage);
router.get('/statistics', GradeController.getGradeStatistics);
router.get('/course/:courseId/average', GradeController.getCourseAverage);
router.post('/', GradeController.createGrade);
router.patch('/:id', GradeController.updateGrade);
router.delete('/:id', GradeController.deleteGrade);

export default router;
````

## File: backend/src/routes/professor.routes.ts
````typescript
import { Router } from 'express';
import * as ProfessorController from '../controllers/ProfessorController';
import { authenticateToken } from '../middlewares/auth.middleware';
import { requireProfessorRole } from '../middlewares/professor.middleware';

const router = Router();

router.use(authenticateToken);
router.use(requireProfessorRole);

router.post('/grades', ProfessorController.updateGrade);
router.get('/courses', ProfessorController.getMyCourses);
router.get('/courses/:code/students', ProfessorController.getStudentsByCourseCode);
router.patch('/courses/:courseId/events', ProfessorController.updateSchedule);
router.post('/courses/:courseId/assign', ProfessorController.assignCourse);

export default router;
````

## File: backend/src/routes/profile.routes.ts
````typescript
import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/ProfileController";
import { authenticateToken } from "../middlewares/auth.middleware";
const router = Router();

router.use(authenticateToken);

router.get("/profile", getProfile);
router.put("/updateprofile", updateProfile);

export default router;
````

## File: backend/src/routes/risk.routes.ts
````typescript
// src/routes/risk.routes.ts
// CORRECTIF: code mort (bloc commenté) supprimé — import RiskService inutilisé retiré
import { Router } from 'express';
import RiskController from '../controllers/RiskController';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/course/:courseId', RiskController.getCourseRisk);

export default router;
````

## File: backend/src/routes/sync.routes.ts
````typescript
import { Router } from "express";
import { handleSyncPush, handleSyncPull } from "../controllers/SyncController";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticateToken);

router.post('/push', handleSyncPush);
router.get('/pull', handleSyncPull);

export default router;
````

## File: backend/src/routes/task.routes.ts
````typescript
import { Router } from 'express';
import * as TaskController from '../controllers/TaskController';
import { authenticateToken } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createTaskSchema, updateTaskSchema } from '../validators/task.validators';

const router = Router();

router.use(authenticateToken);

// Specific static routes first
router.get('/board', TaskController.getBoardTasks);
router.get('/focus/current', TaskController.getCurrentFocusTask);
router.post('/reorder', TaskController.reorderTasks);

// Specific parameterized routes
router.get('/event/:eventId', TaskController.getTasksByEvent);
router.post('/event/:eventId', TaskController.createTaskForEvent);
router.post('/:id/start', TaskController.startTask);
router.post('/:id/pause', TaskController.pauseTask);
router.post('/:id/complete', TaskController.completeTask);

// Generic routes last
router.get('/', TaskController.getTasks);
router.post('/', validate({ body: createTaskSchema }), TaskController.createTask);
router.patch('/:id', validate({ body: updateTaskSchema }), TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);


export default router;
````

## File: backend/src/routes/test.routes.ts
````typescript
import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/auth-test', authenticateToken, (req, res) => {
    const user = (req as any).user;
    res.json({
        success: true,
        message: 'Authentication successful',
        userId: user?.userId,
        tokenPayload: user
    });
});

export default router;
````

## File: backend/src/routes/work.routes.ts
````typescript
import { Router } from 'express';
import * as WorkController from '../controllers/WorkController';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/', WorkController.getWorks);
router.post('/', WorkController.createWork);
router.patch('/:id', WorkController.updateWork);
router.delete('/:id', WorkController.deleteWork);
router.post('/:id/recalculate-points', WorkController.recalculateWorkPoints);

export default router;
````

## File: backend/src/scripts/fix-task-defaults.ts
````typescript
import { db } from "../lib/db";
import { ensureTaskDefaults } from "../services/TaskSyncService";

async function main() {
  console.log("Starting task defaults migration...");
  
  const users = await db.user.findMany({ select: { id: true } });
  
  for (const user of users) {
    console.log(`Processing user ${user.id}...`);
    const result = await ensureTaskDefaults(user.id);
    console.log(`Updated ${result.updated} tasks for user ${user.id}`);
  }
  
  console.log("Migration complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
````

## File: backend/src/scripts/seedUsers.ts
````typescript
import { AuthService } from "../services/AuthServices";
import { db } from "../lib/db";

async function main() {
    const users = [
        { email: "test1@example.com", name: "Test User 1", password: "password123" },
        { email: "test2@example.com", name: "Test User 2", password: "password123" }
    ];

    console.log("Seeding test users...");

    for (const u of users) {
        try {
            const existing = await db.user.findUnique({ where: { email: u.email } });
            if (existing) {
                console.log(`User ${u.email} already exists.`);
            } else {
                await AuthService.register(u.email, u.name, u.password);
                console.log(`Created user: ${u.email}`);
            }
        } catch (error: any) {
            console.error(`Error creating user ${u.email}:`, error.message);
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
````

## File: backend/src/services/__tests__/auth.integration.test.ts
````typescript
import { PrismaClient } from '@prisma/client';
import { AuthService } from '../AuthServices';

// On garde une référence au client de test
let testPrisma: PrismaClient;

// URL de ta base MySQL locale (à adapter)
const MYSQL_TEST_URL = 'mysql://root:root@localhost:3306/studyflow_test';

// Mock du module db : on remplace le db exporté par notre client de test
jest.mock('../../lib/db', () => ({
    get db() {
        return testPrisma;
    }
}));

describe('AuthService - Tests avec MySQL local', () => {

    // 1. AVANT TOUS LES TESTS : initialiser la base MySQL
    beforeAll(async () => {
        // Change la variable d'environnement (optionnel si on utilise l'URL directement)
        process.env.DATABASE_URL = MYSQL_TEST_URL;

        // Crée un nouveau client Prisma pointant vers MySQL
        testPrisma = new PrismaClient({
            datasources: { db: { url: MYSQL_TEST_URL } },
        });

        // Pousse le schéma Prisma actuel dans MySQL (crée les tables)
        // ⚠️ Nécessite que ton schema.prisma soit compatible MySQL
        // Alternative : exécute "npx prisma db push" en ligne de commande avant le test
        // Pour l'exemple, on suppose que les tables existent déjà.
    });

    // 2. APRÈS TOUS LES TESTS : nettoyer et déconnecter
    afterAll(async () => {
        // Supprime toutes les données de test
        await testPrisma.refreshToken.deleteMany({});
        await testPrisma.professor.deleteMany({});
        await testPrisma.user.deleteMany({});
        await testPrisma.$disconnect();
    });

    // 3. AVANT CHAQUE TEST : repartir d'une base propre
    beforeEach(async () => {
        await testPrisma.refreshToken.deleteMany({});
        await testPrisma.professor.deleteMany({});
        await testPrisma.user.deleteMany({});
    });

    // 4. LE TEST (à toi de l'écrire !)
    it('devrait enregistrer et connecter un utilisateur rapidement', async () => {
        // === À COMPLÉTER ===
        // 1. Générer un email unique (avec Date.now())
        // 2. Mesurer le temps de register avec performance.now()
        // 3. Mesurer le temps de login
        // 4. Vérifier que les temps sont inférieurs à 200 ms
        // 5. Afficher les durées avec console.log
    });

});
````

## File: backend/src/services/__tests__/AuthService.perf.test.ts
````typescript
import { AuthService } from "../AuthServices";
import { db } from "../../lib/db"; // vrai client Prisma PostgreSQL

// On n'utilise PAS de mock ici : c'est la vraie connexion à ta base de dev
jest.unmock("../../lib/db");

describe("AuthService - Performance (PostgreSQL local)", () => {
    beforeAll(() => {
        process.env.JWT_SECRET = "test-secret";
        process.env.JWT_REFRESH_SECRET = "test-refresh-secret";
    });

    // Nettoyer après chaque test
    afterEach(async () => {
        // On supprime les données créées pendant le test
        // (tu peux améliorer en gardant une liste d'IDs)
        await db.refreshToken.deleteMany({});
        await db.professor.deleteMany({});
        await db.user.deleteMany({
            where: { email: { contains: "perf-test-" } },
        });
    });

    afterAll(async () => {
        await db.$disconnect();
    });

    it("mesure le temps réel du flux register + login + refreshToken", async () => {
        const timestamp = Date.now();
        const email = `perf-test-${timestamp}@example.com`;
        const password = "Test1234!";

        // 1. REGISTER
        const registerStart = performance.now();
        const user = await AuthService.register(email, "Perf User", password);
        const registerTime = performance.now() - registerStart;
        console.log(`[PERF-PG] register : ${registerTime.toFixed(2)} ms`);

        // 2. LOGIN
        const loginStart = performance.now();
        const { tokens } = await AuthService.login(email, password);
        const loginTime = performance.now() - loginStart;
        console.log(`[PERF-PG] login    : ${loginTime.toFixed(2)} ms`);

        // 3. REFRESH TOKEN
        const refreshStart = performance.now();
        const newTokens = await AuthService.refreshToken(tokens.refreshToken);
        const refreshTime = performance.now() - refreshStart;
        console.log(`[PERF-PG] refresh  : ${refreshTime.toFixed(2)} ms`);

        // Assertions minimales
        expect(user.id).toBeDefined();
        expect(tokens.accessToken).toBeDefined();
        expect(newTokens.accessToken).toBeDefined();

        // Seuils de performance indicatifs (à ajuster selon ta machine)
        expect(registerTime).toBeLessThan(500);
        expect(loginTime).toBeLessThan(300);
        expect(refreshTime).toBeLessThan(200);
    });
});
````

## File: backend/src/services/__tests__/AuthService.test.ts
````typescript
// Mock de la base de données
jest.mock("../../lib/db", () => ({
  db: {
    refreshToken: {
      create: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    },
    professor: {
      create: jest.fn(),
    },
  },
}));

// Mock de bcrypt
jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

// Mock de jsonwebtoken
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

// Mock du service d'email
jest.mock("../emailService", () => ({
  EmailService: {
    sendResetPasswordEmail: jest.fn(),
  },
}));

// Mock de crypto (plus complet que celui de l'IA)
jest.mock("crypto", () => ({
  randomBytes: jest.fn().mockReturnValue({
    toString: jest.fn().mockReturnValue("mocked-reset-token"),
  }),
  createHash: jest.fn().mockReturnValue({
    update: jest.fn().mockReturnValue({
      digest: jest.fn().mockReturnValue("mocked-hash"),
    }),
  }),
}));

// ============================================================
// 2. IMPORTS
// ============================================================
import { AuthService } from "../AuthServices";
import { db } from "../../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { EmailService } from "../emailService";

// ============================================================
// 3. DONNÉES DE TEST RÉUTILISABLES
// ============================================================
const userId = "user-123";
const email = "test@example.com";
const password = "Password123!";
const hashedPassword = "$2b$12$hashedpassword...";
const accessToken = "access-token-mock";
const refreshToken = "refresh-token-mock";

// ============================================================
// 4. SUITE DE TESTS PRINCIPALE
// ============================================================
describe("AuthService", () => {
  // Avant chaque test : nettoyage et configuration d'environnement
  beforeEach(() => {
    process.env.JWT_SECRET = "test-jwt-secret";
    process.env.JWT_REFRESH_SECRET = "test-refresh-secret";
    jest.clearAllMocks();
  });

  // Helper pour mesurer le temps d'exécution
  const measurePerformance = async (name: string, fn: () => Promise<any>) => {
    const start = performance.now();
    const result = await fn();
    const duration = performance.now() - start;
    console.log(`[PERF] ${name}: ${duration.toFixed(2)} ms`);
    return { result, duration };
  };

  // ==========================================================
  // 5. TESTS UNITAIRES (toutes les méthodes)
  // ==========================================================

  describe("generateTokens", () => {
    it("✅ génère un access token et un refresh token, et sauvegarde le refresh token en base", async () => {
      // Arrange : on prépare les retours des mocks
      (jwt.sign as jest.Mock)
        .mockReturnValueOnce(accessToken)   // premier appel : access token
        .mockReturnValueOnce(refreshToken); // deuxième appel : refresh token

      // Act + mesure de performance
      const { result, duration } = await measurePerformance(
        "generateTokens",
        () => AuthService.generateTokens(userId)
      );

      // Assert : vérifications
      expect(result).toEqual({ accessToken, refreshToken });
      expect(jwt.sign).toHaveBeenCalledTimes(2);
      expect(db.refreshToken.create).toHaveBeenCalledWith({
        data: {
          token: refreshToken,
          userId,
          expiresAt: expect.any(Date),
        },
      });

      // Seuil de performance
      expect(duration).toBeLessThan(100);
    });

    it("❌ lance une erreur si JWT_SECRET est manquant", () => {
      delete process.env.JWT_SECRET;
      expect(() => AuthService.generateTokens(userId)).rejects.toThrow("JWT_SECRET must be defined");
    });
  });

  describe("register", () => {
    it("✅ hache le mot de passe et crée un utilisateur STUDENT", async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      (db.user.create as jest.Mock).mockResolvedValue({
        id: userId,
        email,
        name: "John Doe",
        role: "STUDENT",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const { result, duration } = await measurePerformance(
        "register (STUDENT)",
        () => AuthService.register(email, "John Doe", password)
      );

      expect(bcrypt.hash).toHaveBeenCalledWith(password, 12);
      expect(db.user.create).toHaveBeenCalledWith({
        data: {
          email,
          name: "John Doe",
          passwordHash: hashedPassword,
          role: "STUDENT",
        },
        select: expect.any(Object),
      });
      expect(db.professor.create).not.toHaveBeenCalled();
      expect(result).toMatchObject({ id: userId, email, role: "STUDENT" });
      expect(duration).toBeLessThan(200);
    });

  });

  describe("login", () => {
    it("✅ retourne utilisateur et tokens si identifiants valides", async () => {
      const mockUser = {
        id: userId,
        email,
        name: "Test User",
        passwordHash: hashedPassword,
        role: "STUDENT",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (db.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock)
        .mockReturnValueOnce(accessToken)
        .mockReturnValueOnce(refreshToken);
      (db.refreshToken.create as jest.Mock).mockResolvedValue({});

      const { result, duration } = await measurePerformance(
        "login",
        () => AuthService.login(email, password)
      );

      expect(result.user).toMatchObject({
        id: userId,
        email,
        name: mockUser.name,
        role: mockUser.role,
      });
      expect(result.tokens).toEqual({ accessToken, refreshToken });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(duration).toBeLessThan(150);
    });

    it("❌ lance 'Identifiants invalides' si utilisateur inconnu (protection timing attack)", async () => {
      (db.user.findUnique as jest.Mock).mockResolvedValue(null);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(AuthService.login(email, password)).rejects.toThrow("Identifiants invalides");
      // Même sans utilisateur, compare doit être appelé (dummy hash)
      expect(bcrypt.compare).toHaveBeenCalled();
    });

    it("❌ lance 'Identifiants invalides' si mot de passe incorrect", async () => {
      (db.user.findUnique as jest.Mock).mockResolvedValue({ id: userId, passwordHash: hashedPassword });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(AuthService.login(email, password)).rejects.toThrow("Identifiants invalides");
    });

    it("❌ lance 'Identifiants invalides' si le compte n'est pas STUDENT", async () => {
      (db.user.findUnique as jest.Mock).mockResolvedValue({
        id: userId,
        email,
        name: "Prof User",
        passwordHash: hashedPassword,
        role: "PROFESSOR",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await expect(AuthService.login(email, password)).rejects.toThrow("Identifiants invalides");
    });
  });

  describe("refreshToken", () => {
    it("✅ génère de nouveaux tokens si le refresh token est valide", async () => {
      (db.refreshToken.findUnique as jest.Mock).mockResolvedValue({
        token: refreshToken,
        userId,
        expiresAt: new Date(Date.now() + 10000),
      });
      (jwt.verify as jest.Mock).mockReturnValue({ userId });
      (jwt.sign as jest.Mock)
        .mockReturnValueOnce("new-access-token")
        .mockReturnValueOnce("new-refresh-token");
      (db.refreshToken.delete as jest.Mock).mockResolvedValue({});
      (db.refreshToken.create as jest.Mock).mockResolvedValue({});

      const { result, duration } = await measurePerformance(
        "refreshToken",
        () => AuthService.refreshToken(refreshToken)
      );

      expect(result).toEqual({ accessToken: "new-access-token", refreshToken: "new-refresh-token" });
      expect(db.refreshToken.delete).toHaveBeenCalledWith({ where: { token: refreshToken } });
      expect(duration).toBeLessThan(150);
    });

    it("❌ lance une erreur si le token est expiré ou absent", async () => {
      (db.refreshToken.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(AuthService.refreshToken("invalid")).rejects.toThrow("Token invalide ou expiré");
    });

    it("❌ supprime le token et lance une erreur si signature JWT invalide", async () => {
      (db.refreshToken.findUnique as jest.Mock).mockResolvedValue({
        token: refreshToken,
        userId,
        expiresAt: new Date(Date.now() + 10000),
      });
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error("invalid signature");
      });

      await expect(AuthService.refreshToken(refreshToken)).rejects.toThrow("Token invalide");
      expect(db.refreshToken.delete).toHaveBeenCalledWith({ where: { token: refreshToken } });
    });
  });

  describe("logout", () => {
    it("✅ supprime le refresh token sans erreur même si inexistant", async () => {
      (db.refreshToken.deleteMany as jest.Mock).mockResolvedValue({ count: 0 });

      await expect(AuthService.logout(refreshToken)).resolves.toBeUndefined();
      expect(db.refreshToken.deleteMany).toHaveBeenCalledWith({ where: { token: refreshToken } });
    });
  });

  describe("forgotPassword", () => {
    it("✅ génère un token de reset, le stocke hashé et envoie un email", async () => {
      (db.user.findUnique as jest.Mock).mockResolvedValue({ id: userId, email });
      (db.user.update as jest.Mock).mockResolvedValue({});

      await AuthService.forgotPassword(email);

      expect(crypto.randomBytes).toHaveBeenCalledWith(32);
      expect(crypto.createHash).toHaveBeenCalledWith("sha256");
      expect(db.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: {
          resetPasswordToken: "mocked-hash",
          resetPasswordExpiresAt: expect.any(Date),
        },
      });
      expect(EmailService.sendResetPasswordEmail).toHaveBeenCalledWith(email, "mocked-reset-token");
    });

    it("✅ ne fait rien si l'utilisateur n'existe pas (protection user enumeration)", async () => {
      (db.user.findUnique as jest.Mock).mockResolvedValue(null);

      await AuthService.forgotPassword(email);

      expect(db.user.update).not.toHaveBeenCalled();
      expect(EmailService.sendResetPasswordEmail).not.toHaveBeenCalled();
    });
  });

  describe("resetPassword", () => {
    const resetToken = "valid-reset-token";
    const newPassword = "NewPassword123!";

    it("✅ met à jour le mot de passe et supprime tous les refresh tokens", async () => {
      (db.user.findFirst as jest.Mock).mockResolvedValue({ id: userId });
      (bcrypt.hash as jest.Mock).mockResolvedValue("new-hashed-password");
      (db.user.update as jest.Mock).mockResolvedValue({});
      (db.refreshToken.deleteMany as jest.Mock).mockResolvedValue({ count: 2 });

      await AuthService.resetPassword(resetToken, newPassword);

      expect(db.user.findFirst).toHaveBeenCalledWith({
        where: {
          resetPasswordToken: "mocked-hash",
          resetPasswordExpiresAt: { gte: expect.any(Date) },
        },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(newPassword, 12);
      expect(db.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: {
          passwordHash: "new-hashed-password",
          resetPasswordToken: null,
          resetPasswordExpiresAt: null,
        },
      });
      expect(db.refreshToken.deleteMany).toHaveBeenCalledWith({ where: { userId } });
    });

    it("❌ lance une erreur si le token est invalide ou expiré", async () => {
      (db.user.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(AuthService.resetPassword(resetToken, newPassword)).rejects.toThrow("Token invalide ou expiré");
      expect(db.user.update).not.toHaveBeenCalled();
    });
  });

  // ==========================================================
  // 6. BILAN PERFORMANCE
  // ==========================================================
  afterAll(() => {
    console.log("\n=== BILAN PERFORMANCE AuthService ===");
    console.log("Les logs [PERF] ci-dessus montrent les temps d'exécution.");
    console.log("Seuils recommandés :");
    console.log("  - generateTokens < 100ms");
    console.log("  - register < 200ms");
    console.log("  - login < 150ms");
    console.log("  - refreshToken < 150ms");
  });
});
````

## File: backend/src/services/__tests__/AuthServicesPerso.test.ts
````typescript
// src/services/__tests__/AuthService.test.ts

// 1. On dit à Jest de remplacer le module db par un faux
jest.mock("../../lib/db", () => ({
    db: {
        refreshToken: {
            create: jest.fn(),
            findUnique: jest.fn(),
            delete: jest.fn(),
            deleteMany: jest.fn(),
        },
        user: {
            findUnique: jest.fn(),
            findFirst: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
        },
        professor: {
            create: jest.fn(),
        },
    },
}));

// 2. Idem pour bcrypt
jest.mock("bcrypt", () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));

// 3. Idem pour jsonwebtoken
jest.mock("jsonwebtoken", () => ({
    sign: jest.fn(),
    verify: jest.fn(),
}));

// 4. Idem pour le service d'email
jest.mock("../emailService", () => ({
    EmailService: {
        sendResetPasswordEmail: jest.fn(),
    },
}));

// 5. On importe le service qu'on va tester (juste pour vérifier que ça compile)
import { AuthService } from "../AuthServices";
import { db } from "../../lib/db";
import jwt from "jsonwebtoken";

// 6. Un test bidon juste pour voir que Jest tourne
// describe("AuthService", () => {
//     it("test factice pour vérifier la configuration", () => {
//         expect(true).toBe(true);
//     });
// });

// Generate tokens
// Dans le bloc describe("AuthService")

describe("generateTokens", () => {
    it("génère un access token et un refresh token, et les sauvegarde", async () => {
        // 1. On prépare les mocks pour qu'ils retournent ce qu'on veut
        (jwt.sign as jest.Mock)
            .mockReturnValueOnce("fake-access-token")   // premier appel
            .mockReturnValueOnce("fake-refresh-token"); // deuxième appel

        // 2. On appelle la vraie méthode qu'on teste
        const result = await AuthService.generateTokens("user-123");

        // 3. On vérifie que le résultat a la bonne forme
        expect(result).toEqual({
            accessToken: "fake-access-token",
            refreshToken: "fake-refresh-token",
        });

        // 4. On vérifie que jwt.sign a bien été appelé deux fois
        expect(jwt.sign).toHaveBeenCalledTimes(2);

        // 5. On vérifie que la sauvegarde en base a été faite avec les bons paramètres
        expect(db.refreshToken.create).toHaveBeenCalledWith({
            data: {
                token: "fake-refresh-token",
                userId: "user-123",
                expiresAt: expect.any(Date), // on accepte n'importe quelle Date
            },
        });
    });
});
````

## File: backend/src/services/__tests__/CourseSyncService.test.ts
````typescript
import { CourseSyncService } from "../CourseSyncService";
import { db } from "../../lib/db";

// Mock the database
jest.mock("../../lib/db", () => ({
  db: {
    course: {
      findUnique: jest.fn(),
      update: jest.fn(),
      upsert: jest.fn(),
      findMany: jest.fn(),
    },
    courseWorkType: {
      deleteMany: jest.fn(),
      createMany: jest.fn(),
    },
    $transaction: jest.fn(async (cb) => {
      const tx = {
        course: {
          upsert: jest.fn().mockResolvedValue({ id: "course-123", workTypes: [] }),
        },
        courseWorkType: {
          deleteMany: jest.fn(),
          createMany: jest.fn(),
        },
      };
      return await cb(tx);
    }),
  },
}));

describe("CourseSyncService", () => {
  const userId = "user-123";
  const courseId = "course-456";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("push", () => {
    it("should soft delete a course if type is DELETE", async () => {
      (db.course.findUnique as jest.Mock).mockResolvedValue({ id: courseId, userId });
      
      await CourseSyncService.push({ id: courseId }, userId, "DELETE");

      expect(db.course.update).toHaveBeenCalledWith({
        where: { id: courseId },
        data: expect.objectContaining({ isDeleted: true }),
      });
    });

    it("should throw error if the user is not the owner during DELETE", async () => {
      (db.course.findUnique as jest.Mock).mockResolvedValue({ id: courseId, userId: "other-user" });

      await expect(CourseSyncService.push({ id: courseId }, userId, "DELETE")).rejects.toThrow();
    });

    it("should create or update a course within a transaction", async () => {
      const payload = {
        id: courseId,
        code: "CS101",
        name: "Computer Science",
      };

      (db.course.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await CourseSyncService.push(payload, userId, "CREATE");

      expect(db.$transaction).toHaveBeenCalled();
      expect(result.id).toBe("course-123");
    });
  });

  describe("pull", () => {
    it("should fetch courses for the user modified since a date", async () => {
      const since = new Date("2024-01-01");
      (db.course.findMany as jest.Mock).mockResolvedValue([]);

      await CourseSyncService.pull(userId, since);

      expect(db.course.findMany).toHaveBeenCalledWith({
        where: {
          userId,
          updatedAt: { gt: since },
        },
        include: { workTypes: true },
      });
    });
  });
});
````

## File: backend/src/services/__tests__/EventSyncService.test.ts
````typescript
import { EventSyncService } from "../EventSyncService";
import { db } from "../../lib/db";
import { ForbiddenError } from "../../errors/http.errors";

// Mock the database
jest.mock("../../lib/db", () => ({
  db: {
    event: {
      findUnique: jest.fn(),
      delete: jest.fn(),
      upsert: jest.fn(),
      findMany: jest.fn(),
    },
    course: {
      findUnique: jest.fn(),
    },
  },
}));

describe("EventSyncService", () => {
  const userId = "user-123";
  const eventId = "event-456";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("push", () => {
    describe("DELETE", () => {
      it("should delete an event if the user is the owner", async () => {
        (db.event.findUnique as jest.Mock).mockResolvedValue({ id: eventId, userId });
        
        await EventSyncService.push({ id: eventId }, userId, "DELETE");

        expect(db.event.delete).toHaveBeenCalledWith({ where: { id: eventId } });
      });

      it("should throw ForbiddenError if the user is not the owner", async () => {
        (db.event.findUnique as jest.Mock).mockResolvedValue({ id: eventId, userId: "other-user" });

        await expect(EventSyncService.push({ id: eventId }, userId, "DELETE")).rejects.toThrow();
      });

      it("should return early if the event does not exist", async () => {
        (db.event.findUnique as jest.Mock).mockResolvedValue(null);

        const result = await EventSyncService.push({ id: eventId }, userId, "DELETE");

        expect(result).toEqual({ id: eventId });
        expect(db.event.delete).not.toHaveBeenCalled();
      });
    });

    describe("CREATE / UPDATE", () => {
      it("should upsert an event and normalize the type", async () => {
        const payload = {
          id: eventId,
          title: "Test Lecture",
          type: "LECTURE", // Should be normalized to CLASS
          startDate: "2024-01-01T10:00:00Z",
          version: 1,
        };

        (db.event.upsert as jest.Mock).mockResolvedValue({ ...payload, type: "CLASS" });

        const result = await EventSyncService.push(payload, userId, "CREATE");

        expect(db.event.upsert).toHaveBeenCalledWith(expect.objectContaining({
          create: expect.objectContaining({
            type: "CLASS",
            userId,
          }),
        }));
        expect(result.type).toBe("CLASS");
      });

      it("should nullify courseId if the course does not belong to the user", async () => {
        const payload = {
          id: eventId,
          courseId: "course-789",
        };

        (db.course.findUnique as jest.Mock).mockResolvedValue({ id: "course-789", userId: "other-user" });
        (db.event.upsert as jest.Mock).mockResolvedValue({});

        await EventSyncService.push(payload, userId, "CREATE");

        expect(db.event.upsert).toHaveBeenCalledWith(expect.objectContaining({
          create: expect.objectContaining({
            courseId: null,
          }),
        }));
      });
    });
  });

  describe("pull", () => {
    it("should fetch events for the user modified since a date", async () => {
      const since = new Date("2024-01-01");
      (db.event.findMany as jest.Mock).mockResolvedValue([]);

      await EventSyncService.pull(userId, since);

      expect(db.event.findMany).toHaveBeenCalledWith({
        where: {
          userId,
          lastModifiedAt: { gt: since },
        },
      });
    });
  });
});
````

## File: backend/src/services/__tests__/GradeService.test.ts
````typescript
import { GradeService } from "../GradeService";
import { db } from "../../lib/db";
import { PointsEngineService } from "../PointsEngineService";

// Mock the database
jest.mock("../../lib/db", () => ({
  db: {
    grade: {
      findMany: jest.fn(),
    },
  },
}));

// Mock PointsEngineService
jest.mock("../PointsEngineService", () => ({
  PointsEngineService: {
    calculatePercentageBasedAverage: jest.fn(),
    normalizeToTwenty: jest.fn(),
    getTypeLabel: jest.fn(),
  },
}));

describe("GradeService", () => {
  const userId = "user-123";
  const courseId = "course-456";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getCourseAverage", () => {
    it("should calculate and return course average", async () => {
      const mockGrades = [
        { name: "Test 1", score: 15, maxScore: 20, course: { id: courseId, name: "Math", code: "M1" } },
      ];
      (db.grade.findMany as jest.Mock).mockResolvedValue(mockGrades);
      (PointsEngineService.calculatePercentageBasedAverage as jest.Mock).mockReturnValue(15);
      (PointsEngineService.normalizeToTwenty as jest.Mock).mockReturnValue(15);
      (PointsEngineService.getTypeLabel as jest.Mock).mockReturnValue("EXAM");

      const result = await GradeService.getCourseAverage(userId, courseId);

      expect(result?.average).toBe(15);
      expect(result?.grades).toHaveLength(1);
      expect(db.grade.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: { userId, courseId } }));
    });

    it("should return null if no grades found", async () => {
      (db.grade.findMany as jest.Mock).mockResolvedValue([]);
      const result = await GradeService.getCourseAverage(userId, courseId);
      expect(result).toBeNull();
    });
  });

  describe("getGeneralAverage", () => {
    it("should group grades by course and calculate general average", async () => {
      const mockGrades = [
        { courseId: "c1", score: 10, maxScore: 20, course: { name: "C1", code: "CC1", credits: 1 } },
        { courseId: "c2", score: 20, maxScore: 20, course: { name: "C2", code: "CC2", credits: 3 } },
      ];
      (db.grade.findMany as jest.Mock).mockResolvedValue(mockGrades);
      (PointsEngineService.calculatePercentageBasedAverage as jest.Mock)
        .mockReturnValueOnce(10)
        .mockReturnValueOnce(20);

      const result = await GradeService.getGeneralAverage(userId);

      expect(result.generalAverage).toBe(17.5);
      expect(result.courseAverages).toHaveLength(2);
      expect(result.courseAverages[0]).toEqual(expect.objectContaining({ credits: 1 }));
      expect(result.courseAverages[1]).toEqual(expect.objectContaining({ credits: 3 }));
    });
  });

  describe("getGradeStatistics", () => {
    it("should calculate correct statistics", async () => {
      const mockGrades = [
        { score: 10, maxScore: 20 },
        { score: 20, maxScore: 20 },
      ];
      (db.grade.findMany as jest.Mock).mockResolvedValue(mockGrades);

      const result = await GradeService.getGradeStatistics(userId);

      expect(result.stats?.mean).toBe(15);
      expect(result.stats?.min).toBe(10);
      expect(result.stats?.max).toBe(20);
    });
  });
});
````

## File: backend/src/services/__tests__/GradeSyncService.test.ts
````typescript
import { GradeSyncService } from "../GradeSyncService";
import { db } from "../../lib/db";

jest.mock("../../lib/db", () => ({
  db: {
    grade: {
      findUnique: jest.fn(),
      delete: jest.fn(),
      upsert: jest.fn(),
      findMany: jest.fn(),
    },
    course: {
      findUnique: jest.fn(),
    },
    work: {
      findUnique: jest.fn(),
    },
  },
}));

describe("GradeSyncService", () => {
  const userId = "user-123";
  const gradeId = "grade-456";
  const courseId = "course-789";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("push", () => {
    it("should delete a grade if type is DELETE", async () => {
      (db.grade.findUnique as jest.Mock).mockResolvedValue({ id: gradeId, userId });
      
      await GradeSyncService.push({ id: gradeId, courseId, score: 0 } as any, userId, "DELETE");

      expect(db.grade.delete).toHaveBeenCalledWith({ where: { id: gradeId } });
    });

    it("should validate and upsert a grade", async () => {
      const payload = {
        id: gradeId,
        courseId,
        score: 15,
        maxScore: 20,
      };

      (db.course.findUnique as jest.Mock).mockResolvedValue({ id: courseId, userId });
      (db.grade.upsert as jest.Mock).mockResolvedValue({ ...payload, userId });

      const result = await GradeSyncService.push(payload as any, userId, "CREATE") as any;

      expect(db.grade.upsert).toHaveBeenCalled();
      expect(result.score).toBe(15);
    });
  });

  describe("pull", () => {
    it("should fetch grades for the user", async () => {
      const since = new Date("2024-01-01");
      (db.grade.findMany as jest.Mock).mockResolvedValue([]);

      await GradeSyncService.pull(userId, since);

      expect(db.grade.findMany).toHaveBeenCalled();
    });
  });
});
````

## File: backend/src/services/__tests__/PointsEngineService.test.ts
````typescript
import { PointsEngineService } from "../PointsEngineService";

describe("PointsEngineService", () => {
    describe("normalizeToTwenty", () => {
        it("should normalize score correcty", () => {
            expect(PointsEngineService.normalizeToTwenty(10, 20)).toBe(10);
            expect(PointsEngineService.normalizeToTwenty(15, 20)).toBe(15);
            expect(PointsEngineService.normalizeToTwenty(5, 5)).toBe(20);
        });

        it("should return 0 for invalid maxScore", () => {
            expect(PointsEngineService.normalizeToTwenty(10, 0)).toBe(0);
            expect(PointsEngineService.normalizeToTwenty(10, -5)).toBe(0);
        });
    });

    describe("getTypeLabel", () => {
        it("should return workTypeLabel if present", () => {
            expect(PointsEngineService.getTypeLabel({ workTypeLabel: "Examen" })).toBe("EXAMEN");
        });

        it("should return workType.type if workTypeLabel is missing", () => {
            expect(PointsEngineService.getTypeLabel({ workType: { type: "TP" } })).toBe("TP");
        });

        it("should return AUTRE if both are missing", () => {
            expect(PointsEngineService.getTypeLabel({})).toBe("AUTRE");
        });
    });

    describe("calculatePercentageBasedAverage", () => {
        it("should calculate average with manual percentages", () => {
            const items = [
                { score: 10, maxScore: 20, percentage: 40 }, // 10/20 * 40% = 4
                { score: 20, maxScore: 20, percentage: 60 }  // 20/20 * 60% = 12
            ];
            expect(PointsEngineService.calculatePercentageBasedAverage(items)).toBe(16);
        });

        it("should distribute remaining percentage among automatic items", () => {
            const items = [
                { score: 10, maxScore: 20 }, // Should take 100% / 1 = 100%
            ];
            expect(PointsEngineService.calculatePercentageBasedAverage(items)).toBe(10);
        });

        it("should use default distribution with EXAMEN", () => {
            const items = [
                { score: 20, maxScore: 20, workTypeLabel: "EXAMEN" }, // Should take 50%
                { score: 10, maxScore: 20, workTypeLabel: "TP" }      // Should take 50%
            ];
            // EXAMEN: 20 * 0.5 = 10
            // TP: 10 * 0.5 = 5
            // Total: 15
            expect(PointsEngineService.calculatePercentageBasedAverage(items)).toBe(15);
        });

        it("should prioritize configured course workType percentages when available", () => {
            const items = [
                { score: 20, maxScore: 20, workType: { type: "EXAMEN", weightPercent: 70 } },
                { score: 10, maxScore: 20, workType: { type: "TP", weightPercent: 30 } }
            ];
            // EXAMEN: 20 * 0.7 = 14
            // TP: 10 * 0.3 = 3
            // Total: 17
            expect(PointsEngineService.calculatePercentageBasedAverage(items)).toBe(17);
        });
    });
});
````

## File: backend/src/services/__tests__/ProfessorService.test.ts
````typescript
import { ProfessorService } from "../ProfessorService";
import { ProfessorAction } from "../../types/professor.types";
import { ForbiddenError, NotFoundError } from "../../errors/http.errors";

// Define mocks
const mockRepo = {
  findGradeById: jest.fn(),
  findGradeByWork: jest.fn(),
  findWork: jest.fn(),
  updateGrade: jest.fn(),
  createGrade: jest.fn(),
  findEvent: jest.fn(),
  updateEvent: jest.fn(),
  findProfessorWithCourses: jest.fn(),
  findCourse: jest.fn(),
  assignCourse: jest.fn(),
  listCoursesForProfessor: jest.fn(),
};

const mockAudit = {
  log: jest.fn(),
};

const mockCache = {
  invalidate: jest.fn(),
};

const mockUser = {
  getUser: jest.fn(),
};

describe("ProfessorService", () => {
  let service: ProfessorService;
  const professorId = "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d"; // Fake but should pass UUID regex
  const studentId = "8b2f19cf-9a0d-44ef-afbb-4b715fa12782"; 
  const courseId = "7c1e5d9a-4b2a-46e7-afdb-b6f0a83386c8"; 

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ProfessorService(
      mockRepo as any,
      mockAudit as any,
      mockCache as any,
      mockUser as any
    );
  });

  describe("updateGrade", () => {
    it("should create a new grade if user has permission and is assigned to course", async () => {
      const payload = {
        studentId,
        courseId,
        score: 15,
        maxScore: 20,
      };

      // Mock permissions
      mockUser.getUser.mockResolvedValue({ 
        id: professorId,
        permissions: [ProfessorAction.UPDATE_GRADE] 
      });
      mockRepo.findProfessorWithCourses.mockResolvedValue({ 
        id: "p1", 
        courses: [{ id: courseId }] 
      });

      // Mock creation
      mockRepo.findGradeById.mockResolvedValue(null);
      mockRepo.createGrade.mockResolvedValue({ 
        id: "00000000-0000-0000-0000-000000000001",
        score: 15,
        maxScore: 20,
        updatedAt: new Date(),
        name: "Note",
        percentage: null,
        comment: null,
        workId: null,
        work: null,
        workType: null,
        date: null
      });

      const result = await service.updateGrade(professorId, payload);

      expect(mockRepo.createGrade).toHaveBeenCalled();
      expect(result.score).toBe(15);
    });

    it("should throw ForbiddenError if professor is not assigned to course", async () => {
      const payload = { 
        studentId, 
        courseId, 
        score: 15 
      };
      
      mockUser.getUser.mockResolvedValue({ permissions: [ProfessorAction.UPDATE_GRADE] });
      mockRepo.findProfessorWithCourses.mockResolvedValue({ id: "p1", courses: [] });

      await expect(service.updateGrade(professorId, payload)).rejects.toThrow();
    });
  });

  describe("assignToCourse", () => {
    it("should assign professor to course if they have permission", async () => {
      mockUser.getUser.mockResolvedValue({ permissions: [ProfessorAction.ASSIGN_COURSE] });
      mockRepo.findProfessorWithCourses.mockResolvedValue({ id: "p1", userId: professorId });
      mockRepo.findCourse.mockResolvedValue({ id: courseId });
      mockRepo.assignCourse.mockResolvedValue(null);
      mockRepo.listCoursesForProfessor.mockResolvedValue([{ id: courseId }]);

      const result = await service.assignToCourse(professorId, courseId);

      expect(mockRepo.assignCourse).toHaveBeenCalledWith("p1", courseId);
      expect(result.courses).toHaveLength(1);
    });
  });
});
````

## File: backend/src/services/__tests__/TaskService.test.ts
````typescript
import { TaskService } from "../TaskService";
import { db } from "../../lib/db";

// Mock the database
jest.mock("../../lib/db", () => ({
  db: {
    task: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
    },
    taskSession: {
      create: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
    },
    $transaction: jest.fn((promises) => Promise.all(promises)),
  },
}));

describe("TaskService", () => {
  const userId = "user-123";
  const taskId = "task-456";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("startTask", () => {
    it("should start a task if ownership is verified and no other task is running", async () => {
      const mockTask = { id: taskId, userId, isDeleted: false };
      (db.task.findUnique as jest.Mock).mockResolvedValue(mockTask);
      (db.task.findFirst as jest.Mock).mockResolvedValue(null); // No active task
      (db.task.update as jest.Mock).mockResolvedValue({ ...mockTask, status: "IN_PROGRESS" });

      const result = await TaskService.startTask(taskId, userId);

      expect(db.task.update).toHaveBeenCalledWith({
        where: { id: taskId },
        data: expect.objectContaining({ status: "IN_PROGRESS" }),
      });
      expect(db.taskSession.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ taskId }),
      });
      expect(result.status).toBe("IN_PROGRESS");
    });

    it("should throw error if task not found or not owned", async () => {
      (db.task.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(TaskService.startTask("wrong-id", userId)).rejects.toThrow("Task not found");
    });

    it("should throw error if another task is already running", async () => {
      (db.task.findUnique as jest.Mock).mockResolvedValue({ id: taskId, userId, isDeleted: false });
      (db.task.findFirst as jest.Mock).mockResolvedValue({ id: "other-task-id" });

      await expect(TaskService.startTask(taskId, userId)).rejects.toThrow("Another task is already running");
    });
  });

  describe("pauseTask", () => {
    it("should pause a running task and update timeSpent", async () => {
      const startTime = new Date(Date.now() - 10 * 60 * 1000); // 10 minutes ago
      const mockTask = { id: taskId, userId, startedAt: startTime, timeSpentMinutes: 5 };
      (db.task.findUnique as jest.Mock).mockResolvedValue(mockTask);
      (db.task.update as jest.Mock).mockResolvedValue({ ...mockTask, timeSpentMinutes: 15, startedAt: null });
      (db.taskSession.findFirst as jest.Mock).mockResolvedValue({ id: "session-1" });

      const result = await TaskService.pauseTask(taskId, userId);

      expect(result.addedMinutes).toBe(10);
      expect(result.timeSpentMinutes).toBe(15);
      expect(db.taskSession.update).toHaveBeenCalled();
    });

    it("should throw error if task is not running", async () => {
      (db.task.findUnique as jest.Mock).mockResolvedValue({ id: taskId, userId, startedAt: null });
      await expect(TaskService.pauseTask(taskId, userId)).rejects.toThrow("Task is not running");
    });
  });

  describe("reorderTasks", () => {
    it("should reorder tasks in a transaction after verifying ownership", async () => {
      const items = [
        { taskId: "t1", eventId: null, position: 1 },
        { taskId: "t2", eventId: "e1", position: 2 },
      ];
      (db.task.count as jest.Mock).mockResolvedValue(2);

      await TaskService.reorderTasks(userId, items);

      expect(db.task.count).toHaveBeenCalled();
      expect(db.$transaction).toHaveBeenCalled();
      expect(db.task.update).toHaveBeenCalledTimes(2);
    });

    it("should throw error if one or more tasks do not belong to user", async () => {
      const items = [{ taskId: "t1", eventId: null, position: 1 }];
      (db.task.count as jest.Mock).mockResolvedValue(0);

      await expect(TaskService.reorderTasks(userId, items)).rejects.toThrow("One or more tasks do not belong to user");
    });
  });
});
````

## File: backend/src/services/__tests__/TaskSyncService.test.ts
````typescript
import * as TaskSyncService from "../TaskSyncService";
import { db } from "../../lib/db";
import type { Task } from "@prisma/client";

// Mock the database
jest.mock("../../lib/db", () => ({
  db: {
    task: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      upsert: jest.fn(),
    },
    event: {
      findUnique: jest.fn(),
    },
    course: {
      findUnique: jest.fn(),
    },
    $transaction: jest.fn((promises) => Promise.all(promises)),
  },
}));

describe("TaskSyncService", () => {
  const userId = "user-123";
  const taskId = "task-456";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("mapTaskToSync", () => {
    it("should correctly map a database task to sync response", () => {
      const dbTask: Task = {
        id: taskId,
        userId,
        title: "Test Task",
        description: "Desc",
        status: "PENDING",
        priority: "MEDIUM",
        dueDate: new Date("2024-01-01"),
        courseId: "c1",
        eventId: "e1",
        durationMinutes: 30,
        timeSpentMinutes: 10,
        position: 1,
        startedAt: new Date("2024-01-01T10:00:00Z"),
        completedAt: null,
        createdAt: new Date("2024-01-01T09:00:00Z"),
        updatedAt: new Date("2024-01-01T11:00:00Z"),
        lastModifiedAt: new Date("2024-01-01T11:00:00Z"),
        deletedAt: null,
        isDeleted: false,
        localId: "local-1",
        version: 1,
        syncStatus: "SYNCED",
      };

      const result = TaskSyncService.mapTaskToSync(dbTask);

      expect(result.id).toBe(taskId);
      expect(result.dueDate).toBe(dbTask.dueDate!.toISOString());
      expect(result.startedAt).toBe(dbTask.startedAt!.toISOString());
    });
  });

  describe("syncPushTask", () => {
    it("should push a new task successfully", async () => {
      const payload = {
        id: taskId,
        title: "New Task",
        version: 1,
      };

      (db.task.findUnique as jest.Mock).mockResolvedValue(null);
      (db.task.upsert as jest.Mock).mockResolvedValue({
        ...payload,
        userId,
        status: "PENDING",
        priority: "MEDIUM",
        timeSpentMinutes: 0,
        position: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await TaskSyncService.syncPushTask(payload, userId, "CREATE");

      expect(result.success).toBe(true);
      expect(db.task.upsert).toHaveBeenCalled();
    });

    it("should return error if title is empty", async () => {
      const payload = { id: taskId, title: "" };
      const result = await TaskSyncService.syncPushTask(payload, userId, "CREATE");
      expect(result.success).toBe(false);
      expect(result.error).toBe("Title is required");
    });

    it("should return error if task exists and belongs to another user on CREATE", async () => {
      const payload = { id: taskId, title: "Title" };
      (db.task.findUnique as jest.Mock).mockResolvedValue({ id: taskId, userId: "other-user" });
      
      const result = await TaskSyncService.syncPushTask(payload, userId, "CREATE");
      
      expect(result.success).toBe(false);
      expect(result.error).toBe("Task already exists");
    });
  });

  describe("syncDeleteTask", () => {
    it("should soft delete the task if owned by user", async () => {
      (db.task.findUnique as jest.Mock).mockResolvedValue({ id: taskId, userId });
      
      const result = await TaskSyncService.syncDeleteTask(taskId, userId);

      expect(result.success).toBe(true);
      expect(db.task.update).toHaveBeenCalledWith({
        where: { id: taskId },
        data: expect.objectContaining({ isDeleted: true }),
      });
    });

    it("should return error if task not found or not owned", async () => {
      (db.task.findUnique as jest.Mock).mockResolvedValue(null);
      const result = await TaskSyncService.syncDeleteTask(taskId, userId);
      expect(result.success).toBe(false);
      expect(result.error).toBe("Task not found or forbidden");
    });
  });
});
````

## File: backend/src/services/AuditService.ts
````typescript
import { logger } from '../utils/logger';

export interface AuditLog {
  action: string;
  userId: string;
  resourceId?: string;
  metadata?: any;
}

export interface AuditService {
  log(entry: AuditLog): Promise<void>;
}

export class ConsoleAuditService implements AuditService {
  async log(entry: AuditLog): Promise<void> {
    logger.info({ msg: 'AUDIT_LOG', ...entry });
  }
}
````

## File: backend/src/services/AuthServices.ts
````typescript
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { db } from '../lib/db';
import { EmailService } from './emailService';

function getBcryptSaltRounds(): number {
    const rawRounds = process.env.BCRYPT_SALT_ROUNDS||'12';
    if (!rawRounds) {
        throw new Error('BCRYPT_SALT_ROUNDS must be defined');
    }

    const rounds = Number.parseInt(rawRounds, 10);
    if (!Number.isInteger(rounds) || rounds < 10 || rounds > 15) {
        throw new Error('BCRYPT_SALT_ROUNDS must be an integer between 10 and 15');
    }

    return rounds;
}

const SALT_ROUNDS: number = getBcryptSaltRounds();

function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET must be defined');
    return secret;
}

function getRefreshJwtSecret(): string {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) throw new Error('JWT_REFRESH_SECRET must be defined');
    return secret;
}

function hashResetToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
}

export class AuthService {
    static async generateTokens(userId: string) {
        const accessToken = jwt.sign({ userId }, getJwtSecret(), { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId }, getRefreshJwtSecret(), { expiresIn: '10d' });

        await db.refreshToken.create({
            data: {
                token: refreshToken,
                userId,
                expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            },
        });

        return { accessToken, refreshToken };
    }

    static async refreshToken(refreshToken: string) {
        const dbToken = await db.refreshToken.findUnique({
            where: { token: refreshToken },
        });

        if (!dbToken || dbToken.expiresAt < new Date()) {
            throw new Error('Token invalide ou expiré');
        }

        let payload: jwt.JwtPayload;
        try {
            payload = jwt.verify(refreshToken, getRefreshJwtSecret()) as jwt.JwtPayload;
        } catch {
            await db.refreshToken.delete({ where: { token: refreshToken } });
            throw new Error('Token invalide');
        }

        if (!payload.userId || typeof payload.userId !== 'string') {
            throw new Error('Token invalide');
        }

        await db.refreshToken.delete({ where: { token: refreshToken } });
        return this.generateTokens(payload.userId);
    }

    static async logout(refreshToken: string): Promise<void> {
        await db.refreshToken.deleteMany({ where: { token: refreshToken } });
    }

    static async register(
        email: string,
        name: string,
        password: string
    ) {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await db.user.create({
            data: { email, name, passwordHash: hashedPassword, role: 'STUDENT' },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return user;
    }

    static async login(email: string, password: string) {
        const user = await db.user.findUnique({ where: { email } });

        const DUMMY_HASH = '$2b$12$invalidhashfortimingprotectiononly.........';
        const isValid = user
            ? await bcrypt.compare(password, user.passwordHash)
            : await bcrypt.compare(password, DUMMY_HASH).then(() => false);

        if (!user || !isValid || user.role !== 'STUDENT') {
            throw new Error('Identifiants invalides');
        }

        const tokens = await this.generateTokens(user.id);

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
            tokens,
        };
    }

    static async forgotPassword(email: string): Promise<void> {
        const user = await db.user.findUnique({ where: { email } });
        if (!user) return;

        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedResetToken = hashResetToken(resetToken);
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

        await db.user.update({
            where: { id: user.id },
            data: { resetPasswordToken: hashedResetToken, resetPasswordExpiresAt: expiresAt },
        });

        await EmailService.sendResetPasswordEmail(email, resetToken);
    }

    static async resetPassword(token: string, newPassword: string): Promise<void> {
        const hashedToken = hashResetToken(token);

        const user = await db.user.findFirst({
            where: {
                resetPasswordToken: hashedToken,
                resetPasswordExpiresAt: { gte: new Date() },
            },
        });

        if (!user) throw new Error('Token invalide ou expiré');

        const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

        await db.user.update({
            where: { id: user.id },
            data: {
                passwordHash: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpiresAt: null,
            },
        });

        await db.refreshToken.deleteMany({ where: { userId: user.id } });
    }
}
````

## File: backend/src/services/CacheService.ts
````typescript
import { logger } from '../utils/logger';

export interface CacheService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  invalidate(key: string): Promise<void>;
}

export class InMemoryCacheService implements CacheService {
  private cache = new Map<string, { value: any; expiry: number }>();

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    return item.value;
  }

  async set<T>(key: string, value: T, ttlSeconds: number = 300): Promise<void> {
    this.cache.set(key, {
      value,
      expiry: Date.now() + ttlSeconds * 1000
    });
  }

  async invalidate(key: string): Promise<void> {
    // Basic implementation: if key ends with colon, invalidate all starting with it
    if (key.endsWith(':')) {
      for (const k of this.cache.keys()) {
        if (k.startsWith(key)) this.cache.delete(k);
      }
    } else {
      this.cache.delete(key);
    }
    logger.debug({ msg: 'CACHE_INVALIDATED', key });
  }
}
````

## File: backend/src/services/CourseSyncService.ts
````typescript
import { db } from '../lib/db';
import { ForbiddenError, ValidationError } from '../errors/http.errors';
import { normalizeWorkTypes } from './courseWorkTypeService';

export interface CourseSyncPayload {
    id: string;
    code?: string;
    name?: string;
    description?: string | null;
    color?: string;
    credits?: number | null;
    isDeleted?: boolean;
    workTypes?: any[];
    version?: number;
}

export class CourseSyncService {
    static async push(payload: CourseSyncPayload, userId: string, type: 'CREATE' | 'UPDATE' | 'DELETE') {
        const existing = await db.course.findUnique({ where: { id: payload.id }, select: { userId: true } });
        
        if (type === 'DELETE' || payload.isDeleted) {
            if (!existing) return { id: payload.id };
            if (existing.userId !== userId) throw new ForbiddenError();
            
            await db.course.update({
                where: { id: payload.id },
                data: { isDeleted: true, deletedAt: new Date(), syncStatus: 'SYNCED' }
            });
            return { id: payload.id };
        }

        if (existing && existing.userId !== userId) throw new ForbiddenError();

        const data: any = {
            userId,
            code: payload.code,
            name: payload.name,
            description: payload.description,
            color: payload.color,
            credits: payload.credits,
            syncStatus: 'SYNCED',
            updatedAt: new Date(),
            version: payload.version ? { increment: 1 } : 1
        };

        const result = await db.$transaction(async (tx: any) => {
            const course = await tx.course.upsert({
                where: { id: payload.id },
                create: { id: payload.id, ...data, version: 1 },
                update: data,
                include: { workTypes: true }
            });

            if (payload.workTypes !== undefined) {
                const normalized = normalizeWorkTypes(payload.workTypes);
                if (normalized.ok) {
                    await tx.courseWorkType.deleteMany({ where: { courseId: course.id } });
                    await tx.courseWorkType.createMany({
                        data: normalized.items.map((item: any) => ({
                            courseId: course.id,
                            type: item.type,
                            weightPercent: item.weightPercent
                        }))
                    });
                }
            } else if (course.workTypes.length === 0) {
                // Initialize default work types if none exist
                const defaults = normalizeWorkTypes();
                if (defaults.ok) {
                    await tx.courseWorkType.createMany({
                        data: defaults.items.map((item: any) => ({
                            courseId: course.id,
                            type: item.type,
                            weightPercent: item.weightPercent
                        }))
                    });
                }
            }

            return course;
        });

        return result;
    }

    static async pull(userId: string, since: Date) {
        return db.course.findMany({
            where: {
                userId,
                updatedAt: { gt: since }
            },
            include: { workTypes: true }
        });
    }
}
````

## File: backend/src/services/courseWorkTypeService.ts
````typescript
export const ALL_WORK_TYPES: any[] = [
    'EXAMEN',
    'INTERRO',
    'PROJET',
    'TD',
    'TP',
    'EXERCICES'
];

export const normalizeWorkTypes = (input?: unknown) => {
    const items: any[] = Array.isArray(input)
        ? input.map((item: any) =>
            typeof item === 'string' ? { type: item } : item
        )
        : [];

    const rawTypes = items.map((item) => item?.type).filter(Boolean);
    const requested = rawTypes.filter((type): type is any => !!type && ALL_WORK_TYPES.includes(type));
    
    if (rawTypes.length > 0 && requested.length !== rawTypes.length) {
        return {
            ok: false as const,
            error: "Type de travail invalide"
        };
    }

    const uniqueTypes = Array.from(new Set(requested));
    if (uniqueTypes.length === 0) {
        return {
            ok: true as const,
            items: [
                { type: 'EXAMEN', weightPercent: 50 },
                { type: 'INTERRO', weightPercent: 25 },
                { type: 'TP', weightPercent: 25 }
            ]
        };
    }

    const providedWeights = items.filter((item) => item?.weightPercent !== undefined);
    const hasAnyWeight = providedWeights.length > 0;

    if (hasAnyWeight) {
        const weightsByType = new Map<any, number>();
        for (const item of items) {
            if (!item?.type || item.weightPercent === undefined) {
                return { ok: false as const, error: "Tous les types doivent avoir un pourcentage si un est fourni" };
            }
            if (!ALL_WORK_TYPES.includes(item.type)) {
                return { ok: false as const, error: "Type de travail invalide" };
            }
            weightsByType.set(item.type, item.weightPercent);
        }

        const missing = uniqueTypes.filter((type) => !weightsByType.has(type));
        if (missing.length > 0) {
            return { ok: false as const, error: "Tous les types doivent avoir un pourcentage" };
        }

        const total = uniqueTypes.reduce((sum, type) => sum + (weightsByType.get(type) || 0), 0);
        if (Math.abs(total - 100) > 0.01) {
            return { ok: false as const, error: "La somme des pourcentages doit être égale à 100" };
        }

        return {
            ok: true as const,
            items: uniqueTypes.map((type) => ({
                type,
                weightPercent: weightsByType.get(type) as number
            }))
        };
    }

    if (uniqueTypes.length === 1) {
        return {
            ok: true as const,
            items: [{ type: uniqueTypes[0], weightPercent: 100 }]
        };
    }

    const hasExam = uniqueTypes.includes('EXAMEN');
    if (hasExam) {
        const otherTypes = uniqueTypes.filter((type) => type !== 'EXAMEN');
        const otherWeight = otherTypes.length > 0 ? 50 / otherTypes.length : 0;
        return {
            ok: true as const,
            items: [
                { type: 'EXAMEN', weightPercent: 50 },
                ...otherTypes.map((type) => ({ type, weightPercent: otherWeight }))
            ]
        };
    }

    const equalWeight = 100 / uniqueTypes.length;
    return {
        ok: true as const,
        items: uniqueTypes.map((type) => ({ type, weightPercent: equalWeight }))
    };
};
````

## File: backend/src/services/emailService.ts
````typescript
import nodemailer from 'nodemailer';

const frontendBaseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

export class EmailService {
  private static transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: 2525,
    secure: false,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });

  static async sendResetPasswordEmail(email: string, token: string) {
    const resetLink = `${frontendBaseUrl.replace(/\/$/, '')}/reset-password?token=${token}`;

    const mailOptions = {
      from: 'StudyFlow <no-reply@studyflow.local>',
      to: email,
      subject: 'Mot de passe oublie',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
          <h2 style="color: #3B82F6; text-align: center;">StudyFlow</h2>
          <p>Bonjour,</p>
          <p>Vous avez demande la reinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe :</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #3B82F6; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reinitialiser mon mot de passe</a>
          </div>
          <p>Ce lien est valable pendant 1 heure. Si vous n'etes pas a l'origine de cette demande, ignorez cet email.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #888; text-align: center;">StudyFlow</p>
        </div>
      `
    };

    return this.transporter.sendMail(mailOptions);
  }
}
````

## File: backend/src/services/EventService.ts
````typescript
import { db } from "../lib/db";
import { Prisma } from "@prisma/client";

export class EventService {
  /**
   * Create an event with optional default tasks
   */
  static async createEvent(
    userId: string,
    data: any,
    generateDefaultTasks?: boolean
  ) {
    return db.$transaction(async (tx: any) => {
      const createdEvent = await tx.event.create({
        data,
      });

      if (generateDefaultTasks) {
        const templates = [
          { title: "Préparer le plan de révision", durationMinutes: 25 },
          { title: "Réviser les chapitres clés", durationMinutes: 45 },
          { title: "Faire un entraînement", durationMinutes: 60 },
          { title: "Relecture finale", durationMinutes: 25 },
        ];

        await tx.task.createMany({
          data: templates.map((item, index) => ({
            userId,
            eventId: createdEvent.id,
            courseId: (data.courseId || data.course?.connect?.id) || null, // Best effort
            title: item.title,
            durationMinutes: item.durationMinutes,
            position: index,
          })),
        });
      }

      return createdEvent;
    });
  }
}
````

## File: backend/src/services/EventSyncService.ts
````typescript
import { db } from '../lib/db';
import { NotFoundError, ForbiddenError } from '../errors/http.errors';

export interface EventSyncPayload {
    id: string;
    title?: string;
    description?: string | null;
    type?: string;
    startDate?: string | Date;
    endDate?: string | Date;
    isAllDay?: boolean;
    location?: string | null;
    recurrence?: string | null;
    courseId?: string | null;
    localId?: string | null;
    version?: number;
}

const EVENT_TYPE_ALIAS_MAP: Record<string, any> = {
    LECTURE: 'CLASS',
    CLASSROOM: 'CLASS',
    COURS: 'CLASS',
    COURSE: 'CLASS',
    TEST: 'QUIZ',
    HOMEWORK: 'ASSIGNMENT',
    DEVOIR: 'ASSIGNMENT',
    OTHER: 'AUTRE'
};

const EVENT_TYPE_VALUES = new Set<string>([
    'CLASS', 'EXAM', 'EXAMEN', 'INTERRO', 'TP', 'QUIZ', 
    'ASSIGNMENT', 'STUDY', 'AUTRE', 'PERSONAL', 'MEETING'
]);

export class EventSyncService {
    private static normalizeEventType(value: any): any {
        const raw = String(value || '').trim().toUpperCase();
        const normalized = EVENT_TYPE_ALIAS_MAP[raw] || raw;
        return EVENT_TYPE_VALUES.has(normalized) ? normalized : 'CLASS';
    }

    static async push(payload: EventSyncPayload, userId: string, type: 'CREATE' | 'UPDATE' | 'DELETE'): Promise<any> {
        if (type === 'DELETE') {
            const existing = await db.event.findUnique({ where: { id: payload.id }, select: { userId: true } });
            if (!existing) return { id: payload.id };
            if (existing.userId !== userId) throw new ForbiddenError();
            
            await db.event.delete({ where: { id: payload.id } });
            return { id: payload.id };
        }

        // Validate Course Ownership
        let courseId = payload.courseId;
        if (courseId) {
            const course = await db.course.findUnique({ where: { id: courseId }, select: { userId: true } });
            if (!course || course.userId !== userId) courseId = null;
        }

        const data: any = {
            userId,
            title: payload.title,
            description: payload.description,
            type: this.normalizeEventType(payload.type),
            startDate: payload.startDate ? new Date(payload.startDate) : undefined,
            endDate: payload.endDate ? new Date(payload.endDate) : undefined,
            isAllDay: payload.isAllDay,
            location: payload.location,
            recurrence: payload.recurrence,
            courseId,
            version: payload.version ? { increment: 1 } : 1,
            syncStatus: 'SYNCED',
            lastModifiedAt: new Date()
        };

        // Remove undefined fields for update
        if (type === 'UPDATE') {
            Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);
        }

        const result = await db.event.upsert({
            where: { id: payload.id },
            create: { id: payload.id, ...data, version: 1 },
            update: data
        });

        return result;
    }

    static async pull(userId: string, since: Date) {
        return db.event.findMany({
            where: {
                userId,
                lastModifiedAt: { gt: since }
            }
        });
    }
}
````

## File: backend/src/services/GradeService.ts
````typescript
import { db } from '../lib/db';
import { PointsEngineService } from './PointsEngineService';

export class GradeService {
    private static getGradeTypeLabel(grade: any): string {
        return PointsEngineService.getTypeLabel(grade);
    }
    /**
     * Calculate weighted average for a specific course
     */
    static async getCourseAverage(userId: string, courseId: string) {
        const grades = await db.grade.findMany({
            where: { userId, courseId },
            include: { course: true, workType: true }
        });

        if (grades.length === 0) {
            return null;
        }

        const average = PointsEngineService.calculatePercentageBasedAverage(grades);

        return {
            courseId,
            courseName: grades[0].course?.name || 'Unknown',
            courseCode: grades[0].course?.code || 'N/A',
            average: Math.round(average * 100) / 100,
            gradeCount: grades.length,
            grades: grades.map((g: any) => ({
                name: g.name,
                score: g.score,
                maxScore: g.maxScore,
                workType: this.getGradeTypeLabel(g),
                workTypePercent: g.percentage ?? null,
                normalized: Math.round(PointsEngineService.normalizeToTwenty(g.score, g.maxScore) * 100) / 100
            }))
        };
    }

    /**
     * Calculate general average across all courses
     */
    static async getGeneralAverage(userId: string) {
        const grades = await db.grade.findMany({
            where: { userId },
            include: { course: true, workType: true }
        });

        if (grades.length === 0) {
            return {
                generalAverage: null,
                courseAverages: [],
                totalCourses: 0,
                totalGrades: 0,
                message: "No grades found"
            };
        }

        // Group grades by course
        const gradesByCourse = grades.reduce((acc: any, grade: any) => {
            const courseId = grade.courseId;
            if (!acc[courseId]) {
                acc[courseId] = [];
            }
            acc[courseId].push(grade);
            return acc;
        }, {} as Record<string, typeof grades>);

        const courseIds = Object.keys(gradesByCourse);
        // Calculate average for each course
        const courseAverages = Object.entries(gradesByCourse).map(([courseId, courseGrades]) => {
            const average = PointsEngineService.calculatePercentageBasedAverage(courseGrades as any[]);
            const rawCredits = Number((courseGrades as any)[0].course?.credits);
            const credits = Number.isFinite(rawCredits) && rawCredits > 0 ? rawCredits : 3;

            return {
                courseId,
                courseName: (courseGrades as any)[0].course?.name || 'Unknown',
                courseCode: (courseGrades as any)[0].course?.code || 'N/A',
                average: Math.round(average * 100) / 100,
                gradeCount: (courseGrades as any).length,
                credits
            };
        });

        // Calculate general average weighted by course credits
        const totalWeightedAverage = courseAverages.reduce(
            (sum, course) => sum + (course.average * course.credits),
            0
        );
        const totalCredits = courseAverages.reduce((sum, course) => sum + course.credits, 0);
        const generalAverage = totalCredits > 0
            ? Math.round((totalWeightedAverage / totalCredits) * 100) / 100
            : 0;

        return {
            generalAverage,
            courseAverages,
            totalCourses: courseAverages.length,
            totalGrades: grades.length
        };
    }

    /**
     * Get statistics for a user's grades
     */
    static async getGradeStatistics(userId: string) {
        const grades = await db.grade.findMany({
            where: { userId },
            include: { course: true }
        });

        if (grades.length === 0) {
            return {
                message: "No grades found",
                stats: null
            };
        }

        // Normalize all grades to /20
        const normalizedGrades = grades.map((g: any) => (g.score / g.maxScore) * 20);

        // Calculate statistics
        const sorted = [...normalizedGrades].sort((a: any, b: any) => a - b);
        const sum = normalizedGrades.reduce((a: any, b: any) => a + b, 0);
        const mean = sum / normalizedGrades.length;
        
        const median = sorted.length % 2 === 0
            ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
            : sorted[Math.floor(sorted.length / 2)];

        const min = Math.min(...normalizedGrades);
        const max = Math.max(...normalizedGrades);

        // Standard deviation
        const variance = normalizedGrades.reduce((acc: any, val: any) => acc + Math.pow(val - mean, 2), 0) / normalizedGrades.length;
        const standardDeviation = Math.sqrt(variance);

        // Grade distribution
        const distribution = {
            excellent: normalizedGrades.filter((g: any) => g >= 16).length,  // 16-20
            good: normalizedGrades.filter((g: any) => g >= 14 && g < 16).length,  // 14-16
            average: normalizedGrades.filter((g: any) => g >= 12 && g < 14).length,  // 12-14
            passing: normalizedGrades.filter((g: any) => g >= 10 && g < 12).length,  // 10-12
            failing: normalizedGrades.filter((g: any) => g < 10).length  // <10
        };

        return {
            stats: {
                mean: Math.round(mean * 100) / 100,
                median: Math.round(median * 100) / 100,
                min: Math.round(min * 100) / 100,
                max: Math.round(max * 100) / 100,
                standardDeviation: Math.round(standardDeviation * 100) / 100,
                totalGrades: grades.length,
                distribution
            }
        };
    }
}
````

## File: backend/src/services/GradeSyncService.ts
````typescript
import { db } from '../lib/db';
import { ForbiddenError, ValidationError } from '../errors/http.errors';

export interface GradeSyncPayload {
    id: string;
    name?: string;
    score: number;
    maxScore?: number;
    percentage?: number | null;
    courseId: string;
    workId?: string | null;
    workTypeLabel?: string | null;
    workTypeId?: string | null;
    date?: string | Date | null;
    comment?: string | null;
    version?: number;
}

export class GradeSyncService {
    static async validateAndNormalize(payload: GradeSyncPayload, userId: string) {
        // Validate Course
        const course = await db.course.findUnique({
            where: { id: payload.courseId },
            select: { userId: true }
        });
        if (!course) throw new ValidationError('Cours introuvable');
        if (course.userId !== userId) throw new ForbiddenError();

        // Validate Score
        const maxScore = payload.maxScore ?? 20;
        if (maxScore <= 0) throw new ValidationError('Le score maximum doit être supérieur à 0');
        if (payload.score < 0 || payload.score > maxScore) {
            throw new ValidationError(`Le score (${payload.score}) doit être entre 0 et ${maxScore}`);
        }

        // Validate Work if present
        let workTypeId = payload.workTypeId;
        if (payload.workId) {
            const work = await db.work.findUnique({
                where: { id: payload.workId },
                select: { userId: true, courseId: true, workTypeId: true }
            });
            if (!work || work.userId !== userId) throw new ValidationError('Travail introuvable');
            if (work.courseId !== payload.courseId) throw new ValidationError('Le travail doit appartenir au même cours');
            workTypeId = workTypeId || work.workTypeId;
        }

        return {
            ...payload,
            maxScore,
            workTypeId,
            date: payload.date ? new Date(payload.date) : null
        };
    }

    static async push(payload: GradeSyncPayload, userId: string, type: 'CREATE' | 'UPDATE' | 'DELETE') {
        if (type === 'DELETE') {
            const existing = await db.grade.findUnique({ where: { id: payload.id }, select: { userId: true } });
            if (!existing) return { id: payload.id };
            if (existing.userId !== userId) throw new ForbiddenError();
            await db.grade.delete({ where: { id: payload.id } });
            return { id: payload.id };
        }

        const normalized = await this.validateAndNormalize(payload, userId);

        const data: any = {
            userId,
            courseId: normalized.courseId,
            name: normalized.name || 'Note',
            score: normalized.score,
            maxScore: normalized.maxScore,
            percentage: normalized.percentage,
            workId: normalized.workId,
            workTypeId: normalized.workTypeId,
            workTypeLabel: normalized.workTypeLabel,
            date: normalized.date,
            comment: normalized.comment,
            syncStatus: 'SYNCED',
            lastModifiedAt: new Date(),
            version: payload.version ? { increment: 1 } : 1
        };

        const result = await db.grade.upsert({
            where: { id: payload.id },
            create: { id: payload.id, ...data, version: 1 },
            update: data,
            include: {
                workType: { select: { type: true, weightPercent: true } },
                work: { select: { id: true, title: true } }
            }
        });

        return result;
    }

    static async pull(userId: string, since: Date) {
        return db.grade.findMany({
            where: {
                userId,
                lastModifiedAt: { gt: since }
            },
            include: {
                workType: { select: { type: true, weightPercent: true } },
                work: { select: { id: true, title: true } }
            }
        });
    }
}
````

## File: backend/src/services/PointsEngineService.ts
````typescript
type PointItem = {
  score: number;
  maxScore: number;
  percentage?: number | null;
  workTypeLabel?: string | null;
  workType?: { type?: string | null; weightPercent?: number | null } | null;
};

export class PointsEngineService {
  static normalizeToTwenty(score: number, maxScore: number) {
    if (!Number.isFinite(score) || !Number.isFinite(maxScore) || maxScore <= 0) return 0;
    return (score / maxScore) * 20;
  }

  static getTypeLabel(item: Pick<PointItem, 'workTypeLabel' | 'workType'>): string {
    return String(item.workTypeLabel || item.workType?.type || 'AUTRE').trim().toUpperCase();
  }

  private static getDefaultTypePools(autoItems: PointItem[], remainingPercent: number) {
    const configuredByType = new Map<string, number>();
    for (const item of autoItems) {
      const type = this.getTypeLabel(item);
      const configuredWeight = Number(item.workType?.weightPercent);
      if (Number.isFinite(configuredWeight) && configuredWeight > 0) {
        configuredByType.set(type, configuredWeight);
      }
    }

    if (configuredByType.size > 0) {
      const configuredTotal = Array.from(configuredByType.values()).reduce((sum, w) => sum + w, 0);
      if (configuredTotal > 0) {
        const pools = new Map<string, number>();
        for (const [type, weight] of configuredByType.entries()) {
          pools.set(type, (remainingPercent * weight) / configuredTotal);
        }
        return pools;
      }
    }

    const types = Array.from(new Set(autoItems.map((i) => this.getTypeLabel(i))));
    const hasExam = types.includes('EXAMEN');
    const otherTypes = types.filter((type) => type !== 'EXAMEN');

    const pools = new Map<string, number>();
    const examPool = hasExam ? remainingPercent * 0.5 : 0;
    if (hasExam) pools.set('EXAMEN', examPool);

    const remainingPool = remainingPercent - examPool;
    if (otherTypes.length > 0) {
      const each = remainingPool / otherTypes.length;
      otherTypes.forEach((type) => pools.set(type, each));
    }

    return pools;
  }

  static calculatePercentageBasedAverage(items: PointItem[]) {
    if (items.length === 0) return 0;

    const manualItems = items.filter((i) => Number.isFinite(i.percentage));
    const autoItems = items.filter((i) => !Number.isFinite(i.percentage));

    const manualPercent = manualItems.reduce((sum, i) => sum + Number(i.percentage || 0), 0);
    const remainingPercent = Math.max(0, 100 - manualPercent);
    const typePools = this.getDefaultTypePools(autoItems, remainingPercent);

    const autoByType = new Map<string, PointItem[]>();
    autoItems.forEach((i) => {
      const type = this.getTypeLabel(i);
      if (!autoByType.has(type)) autoByType.set(type, []);
      autoByType.get(type)!.push(i);
    });

    let weightedSum = 0;
    let totalPercent = 0;

    for (const item of manualItems) {
      const p = Number(item.percentage || 0);
      weightedSum += this.normalizeToTwenty(item.score, item.maxScore) * p;
      totalPercent += p;
    }

    for (const [type, list] of autoByType.entries()) {
      const pool = typePools.get(type) || 0;
      if (pool <= 0 || list.length === 0) continue;
      const each = pool / list.length;
      for (const item of list) {
        weightedSum += this.normalizeToTwenty(item.score, item.maxScore) * each;
        totalPercent += each;
      }
    }

    if (totalPercent <= 0) {
      return items.reduce((acc, i) => acc + this.normalizeToTwenty(i.score, i.maxScore), 0) / items.length;
    }

    return weightedSum / totalPercent;
  }
}
````

## File: backend/src/services/ProfessorService.ts
````typescript
import { ZodError } from 'zod';
import { db } from '../lib/db';
import { ProfessorRepository, GradeWithRelations } from '../repositories/professor.repository';
import {
  ProfessorAction,
  UpdateGradeDTO,
  UpdateScheduleDTO,
  EventUpdatePayload,
  GradeResponse,
  ProfessorAssignmentResponse
} from '../types/professor.types';
import { logger } from '../utils/logger';
import { AuditService } from './AuditService';
import { CacheService } from './CacheService';
import { UserService } from './UserService';
import { updateGradeSchema, updateScheduleSchema, assignCourseSchema } from '../validators/professor.validators';
import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  ValidationError,
  HttpError
} from '../errors/http.errors';

export class ProfessorService {
  constructor(
    private readonly repository: ProfessorRepository,
    private readonly auditService: AuditService,
    private readonly cache: CacheService,
    private readonly userService: UserService
  ) {}

  async updateGrade(professorId: string, payload: UpdateGradeDTO): Promise<GradeResponse> {
    try {
      const validated = updateGradeSchema.parse(payload);
      const normalizedMaxScore = validated.maxScore ?? 20;
      const parsedDate = validated.date ? new Date(validated.date) : undefined;
      const comment = validated.comment?.trim();
      const name = validated.name?.trim() || 'Note du professeur';

      await this.checkPermissions(professorId, ProfessorAction.UPDATE_GRADE);
      await this.ensureProfessorAssignment(professorId, validated.courseId);

      const existingGrade = validated.gradeId
        ? await this.repository.findGradeById(validated.gradeId)
        : null;
      const workGrade = !existingGrade && validated.workId
        ? await this.repository.findGradeByWork(validated.studentId, validated.courseId, validated.workId)
        : null;

      const resolvedGrade = existingGrade ?? workGrade;

      let resolvedWorkTypeId: string | null | undefined = undefined;
      if (validated.workId) {
        const work = await this.repository.findWork(validated.workId);
        if (!work) {
          throw new NotFoundError('Travail introuvable.');
        }
        if (work.courseId !== validated.courseId) {
          throw new ForbiddenError('Le travail doit appartenir au même cours.');
        }
        resolvedWorkTypeId = work.workTypeId ?? null;
      }

      const baseData: any = {
        score: validated.score,
        maxScore: normalizedMaxScore,
        comment: comment || undefined,
        percentage: validated.percentage ?? undefined,
        name,
        date: parsedDate,
        updatedAt: new Date()
      };

      if (validated.workId !== undefined) {
        baseData.workId = validated.workId;
      }
      if (resolvedWorkTypeId !== undefined) {
        baseData.workTypeId = resolvedWorkTypeId;
      }

      const grade = resolvedGrade
        ? await this.repository.updateGrade(resolvedGrade.id, baseData)
        : await this.repository.createGrade({
            ...baseData,
            userId: validated.studentId,
            courseId: validated.courseId
          });

      await this.cache.invalidate('grades:course:');
      await this.auditService.log({
        action: 'GRADE_UPSERT',
        userId: professorId,
        resourceId: grade.id,
        metadata: {
          courseId: validated.courseId,
          studentId: validated.studentId
        }
      });

      logger.info({
        msg: 'Grade enregistrée',
        gradeId: grade.id,
        courseId: validated.courseId,
        professorId
      });

      return this.mapGradeResponse(grade);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError(error.issues[0]?.message ?? 'Données de note invalides.');
      }
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error({ msg: 'Mise à jour de note échouée', error, professorId });
      throw new InternalServerError('Impossible de mettre à jour la note.');
    }
  }

  async updateSchedule(professorId: string, courseId: string, events: EventUpdatePayload[]): Promise<any[]> {
    try {
      const validated: UpdateScheduleDTO = updateScheduleSchema.parse({ courseId, events });
      await this.checkPermissions(professorId, ProfessorAction.UPDATE_SCHEDULE);
      await this.ensureProfessorAssignment(professorId, validated.courseId);

      const updates: any[] = [];

      for (const eventPayload of validated.events) {
        const existingEvent = await this.repository.findEvent(eventPayload.id);
        if (!existingEvent || existingEvent.courseId !== validated.courseId) {
          throw new NotFoundError('Événement invalide ou non lié au cours.');
        }

        const eventData: any = {};
        if (eventPayload.title !== undefined) eventData.title = eventPayload.title;
        if (eventPayload.description !== undefined) eventData.description = eventPayload.description;
        if (eventPayload.location !== undefined) eventData.location = eventPayload.location;
        if (eventPayload.startDate !== undefined)
          eventData.startDate = new Date(eventPayload.startDate);
        if (eventPayload.endDate !== undefined)
          eventData.endDate = new Date(eventPayload.endDate);
        if (eventPayload.isAllDay !== undefined) eventData.isAllDay = eventPayload.isAllDay;
        if (eventPayload.recurrence !== undefined) eventData.recurrence = eventPayload.recurrence;
        if (eventPayload.type !== undefined) eventData.type = eventPayload.type as any;

        if (Object.keys(eventData).length === 0) {
          continue;
        }

        const updatedEvent = await this.repository.updateEvent(eventPayload.id, eventData);
        updates.push(updatedEvent);
      }

      if (updates.length > 0) {
        await this.cache.invalidate('events:course:');
        await this.auditService.log({
          action: 'EVENTS_UPDATED',
          userId: professorId,
          metadata: { courseId: validated.courseId, updatedCount: updates.length }
        });
        logger.info({
          msg: 'Événements mis à jour',
          courseId: validated.courseId,
          professorId,
          updatedCount: updates.length
        });
      }

      return updates;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError(error.issues[0]?.message ?? 'Données d’événement invalides.');
      }
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error({ msg: 'Mise à jour du planning échouée', error, professorId, courseId });
      throw new InternalServerError('Impossible de mettre à jour le planning.');
    }
  }

  async getMyCourses(professorId: string): Promise<any[]> {
    const professor = await this.repository.findProfessorWithCourses(professorId);
    if (!professor) {
      throw new NotFoundError('Profil professeur introuvable.');
    }
    
    // Enrich with student counts
    const courses: any[] = professor.courses;
    const enriched = await Promise.all(courses.map(async (course) => {
      const count = await this.repository.countStudentsInCourse(course.code);
      return { ...course, studentCount: count };
    }));

    return enriched;
  }

  async getStudentsInCourse(professorId: string, courseCode: string): Promise<any[]> {
    await this.checkPermissions(professorId, ProfessorAction.UPDATE_GRADE);
    
    const studentCourses = await db.course.findMany({
      where: { code: courseCode, isDeleted: false },
      include: {
        user: {
          select: { id: true, name: true, email: true, avatarUrl: true }
        },
        grades: {
          orderBy: { date: 'desc' },
          take: 5
        }
      }
    });

    return studentCourses.map(sc => ({
      courseId: sc.id,
      student: sc.user,
      lastGrades: sc.grades
    }));
  }

  async assignToCourse(professorId: string, courseId: string): Promise<ProfessorAssignmentResponse> {
    try {
      assignCourseSchema.parse({ courseId });
      await this.checkPermissions(professorId, ProfessorAction.ASSIGN_COURSE);

      const professor = await this.repository.findProfessorWithCourses(professorId);
      if (!professor) {
        throw new NotFoundError('Profil professeur introuvable.');
      }

      const course = await this.repository.findCourse(courseId);
      if (!course) {
        throw new NotFoundError('Cours introuvable.');
      }

      await this.repository.assignCourse(professor.id, courseId);
      const courses = await this.repository.listCoursesForProfessor(professor.id);

      await this.cache.invalidate('professor::courses');
      await this.auditService.log({
        action: 'COURSE_ASSIGNED',
        userId: professorId,
        resourceId: courseId,
        metadata: { professorId: professor.id }
      });

      logger.info({ msg: 'Cours assigné au professeur', professorId, courseId });

      return {
        id: professor.id,
        userId: professor.userId,
        courses
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError(error.issues[0]?.message ?? 'courseId invalide.');
      }
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error({ msg: 'Assignment de cours échoué', error, professorId, courseId });
      throw new InternalServerError('Impossible d’assigner le cours.');
    }
  }

  private async ensureProfessorAssignment(professorId: string, courseId: string) {
    const professor = await this.repository.findProfessorWithCourses(professorId);

    if (!professor || !professor.courses.some((course: any) => course.id === courseId)) {
      throw new ForbiddenError('Vous n’êtes pas autorisé à modifier ce cours.');
    }

    return professor;
  }

  private async checkPermissions(userId: string, action: ProfessorAction) {
    const user = await this.userService.getUser(userId);
    if (!user || !user.permissions.includes(action)) {
      throw new ForbiddenError('Permissions insuffisantes.');
    }
  }

  private mapGradeResponse(grade: GradeWithRelations): GradeResponse {
    return {
      id: grade.id,
      name: grade.name,
      score: grade.score,
      maxScore: grade.maxScore,
      percentage: grade.percentage ?? null,
      comment: grade.comment ?? null,
      workId: grade.workId ?? null,
      work: grade.work as any ?? null,
      workType: grade.workType as any ?? null,
      date: grade.date ?? null,
      updatedAt: grade.updatedAt
    };
  }
}
````

## File: backend/src/services/ResetPasswordService.ts
````typescript
import { db } from "../lib/db";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { EmailService } from "./emailService";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const RESET_PASSWORD_EXPIRES_IN = process.env.RESET_PASSWORD_EXPIRES_IN;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_REFRESH_EXPIRE=process.env.JWT_REFRESH_EXPIRE;


export class ResetPasswordService {
    private static async VerifyEmail(email:string){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Email invalide");
        }
        const user = await db.user.findUnique({ where: { email } });
        if (!user) throw new Error("Utilisateur non trouvé");
        return user;
    }   
}
````

## File: backend/src/services/RiskService.ts
````typescript
// src/services/RiskService.ts
// CORRECTIFS:
// - Filtre isDeleted réactivé sur les tasks
// - Plus de "as any" pour bypasser Prisma — types explicites
// - Calcul urgencyScore assaini (diffDays négatif si examen passé → score max)

import { db } from '../lib/db';
import { PointsEngineService } from './PointsEngineService';

type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

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

export class RiskService {
  static async analyzeCourse(courseId: string, userId: string): Promise<RiskAnalysis> {
    const course = await db.course.findUnique({
      where: { id: courseId },
      include: {
        grades: { include: { workType: true } },
        works: {
          include: { workType: true },
          where: { status: { in: ['PLANNED', 'SUBMITTED'] } },
          orderBy: { dueDate: 'asc' },
        },
        workTypes: true,
        tasks: {
          where: {
            userId,
            isDeleted: false, // CORRECTIF: filtre réactivé — les tâches supprimées ne comptent pas
          },
        },
        events: {
          where: { type: { in: ['EXAM', 'EXAMEN'] } },
          orderBy: { startDate: 'asc' },
          take: 1,
        },
      },
    });

    if (!course || course.userId !== userId) {
      throw new Error('Cours introuvable ou accès non autorisé');
    }

    const grades = course.grades;
    const tasks = course.tasks;
    const nextExamEvent = course.events[0] ?? null;

    // Prochain examen via les works planifiés/soumis
    const nextExamWork =
      course.works.find(
        (w) =>
          String(w.workTypeLabel ?? w.workType?.type ?? '').toUpperCase() === 'EXAMEN' && !!w.dueDate
      ) ?? null;

    const gradeFactor = this.calculateGradeScore(course.grades);
    const workloadFactor = this.calculateWorkloadScore(tasks);
    const urgencyFactor = this.calculateUrgencyScore(
      nextExamWork?.dueDate ?? nextExamEvent?.startDate ?? null
    );

    const finalScore = gradeFactor * 0.4 + workloadFactor * 0.3 + urgencyFactor * 0.3;

    return {
      courseId: course.id,
      courseName: course.name,
      overallScore: Math.round(finalScore),
      level: this.getRiskLevel(finalScore),
      details: {
        performance: Math.round(gradeFactor),
        procrastination: Math.round(workloadFactor),
        pressure: Math.round(urgencyFactor),
      },
    };
  }

  private static calculateGradeScore(grades: { score: number; maxScore: number; percentage?: number | null; weight?: number | null; workType?: { type: string; weightPercent: number } | null }[]): number {
    if (grades.length === 0) return 40; // Score neutre si pas de notes
    const averageOn20 = PointsEngineService.calculatePercentageBasedAverage(grades);
    return Math.max(0, (1 - averageOn20 / 20) * 100);
  }

  private static calculateWorkloadScore(tasks: { status: string }[]): number {
    const pending = tasks.filter((t) => t.status !== 'COMPLETED' && t.status !== 'CANCELED').length;
    // CORRECTIF: on exclut aussi les tâches CANCELED du workload
    return Math.min(100, pending * 20);
  }

  private static calculateUrgencyScore(nextExamDate: Date | string | null): number {
    if (!nextExamDate) return 20;

    const now = new Date();
    const examDate = new Date(nextExamDate);
    const diffDays = Math.ceil((examDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    // CORRECTIF: examen passé (diffDays <= 0) → score max d'urgence
    if (diffDays <= 0) return 100;
    if (diffDays <= 2) return 100;
    if (diffDays <= 7) return 70;
    if (diffDays <= 14) return 40;
    return 10;
  }

  private static getRiskLevel(score: number): RiskLevel {
    if (score < 30) return 'LOW';
    if (score < 60) return 'MEDIUM';
    if (score < 85) return 'HIGH';
    return 'CRITICAL';
  }
}
````

## File: backend/src/services/TaskService.ts
````typescript
import { db } from "../lib/db";
import { Prisma } from "@prisma/client";

export class TaskService {
  /**
   * Calculate time spent in minutes from milliseconds
   */
  private static roundMinutesFromMs(ms: number) {
    return Math.max(0, Math.round(ms / 60000));
  }

  private static roundSecondsFromMs(ms: number) {
    return Math.max(0, Math.round(ms / 1000));
  }

  /**
   * Start a task (Focus mode)
   */
  static async startTask(taskId: string, userId: string) {
    const task = await db.task.findUnique({ where: { id: taskId } });
    if (!task || task.userId !== userId || task.isDeleted) {
      throw new Error("Task not found");
    }

    // Check if another task is running
    const active = await db.task.findFirst({
      where: { userId, startedAt: { not: null }, isDeleted: false },
    });
    if (active && active.id !== taskId) {
      throw new Error("Another task is already running");
    }

    const now = new Date();
    const updated = await db.task.update({
      where: { id: taskId },
      data: { startedAt: now, status: "IN_PROGRESS", updatedAt: now },
    });

    await db.taskSession.create({
      data: { taskId: taskId, startedAt: now },
    });

    return updated;
  }

  /**
   * Pause a task
   */
  static async pauseTask(taskId: string, userId: string) {
    const task = await db.task.findUnique({ where: { id: taskId } });
    if (!task || task.userId !== userId || task.isDeleted) {
      throw new Error("Task not found");
    }
    if (!task.startedAt) {
      throw new Error("Task is not running");
    }

    const now = new Date();
    const diffMs = now.getTime() - new Date(task.startedAt).getTime();
    const addedMinutes = this.roundMinutesFromMs(diffMs);

    const updated = await db.task.update({
      where: { id: taskId },
      data: {
        startedAt: null,
        timeSpentMinutes: (task.timeSpentMinutes || 0) + addedMinutes,
        updatedAt: now,
      },
    });

    const openSession = await db.taskSession.findFirst({
      where: { taskId: taskId, endDate: null },
      orderBy: { startedAt: "desc" },
    });

    if (openSession) {
      await db.taskSession.update({
        where: { id: openSession.id },
        data: { endDate: now, durationSeconds: this.roundSecondsFromMs(diffMs) },
      });
    }

    return {
      taskId,
      addedMinutes,
      timeSpentMinutes: updated.timeSpentMinutes,
    };
  }

  /**
   * Complete a task
   */
  static async completeTask(taskId: string, userId: string) {
    const task = await db.task.findUnique({ where: { id: taskId } });
    if (!task || task.userId !== userId || task.isDeleted) {
      throw new Error("Task not found");
    }

    const now = new Date();
    let addedMinutes = 0;

    if (task.startedAt) {
      const diffMs = now.getTime() - new Date(task.startedAt).getTime();
      addedMinutes = this.roundMinutesFromMs(diffMs);

      const openSession = await db.taskSession.findFirst({
        where: { taskId: taskId, endDate: null },
        orderBy: { startedAt: "desc" },
      });
      if (openSession) {
        await db.taskSession.update({
          where: { id: openSession.id },
          data: { endDate: now, durationSeconds: this.roundSecondsFromMs(diffMs) },
        });
      }
    }

    const updated = await db.task.update({
      where: { id: taskId },
      data: {
        status: "COMPLETED",
        completedAt: now,
        startedAt: null,
        timeSpentMinutes: (task.timeSpentMinutes || 0) + addedMinutes,
        updatedAt: now,
      },
    });

    return updated;
  }

  /**
   * Reorder tasks in batch
   */
  static async reorderTasks(
    userId: string,
    items: { taskId: string; eventId: string | null; position: number }[]
  ) {
    if (!items.length) return;

    // Verify ownership
    const taskIds = items.map((i) => i.taskId);
    const count = await db.task.count({
      where: { id: { in: taskIds }, userId },
    });
    if (count !== taskIds.length) {
      throw new Error("One or more tasks do not belong to user");
    }

    // Transactional update
    await db.$transaction(
      items.map((item) =>
        db.task.update({
          where: { id: item.taskId },
          data: {
            eventId: item.eventId || null,
            position: item.position,
            updatedAt: new Date(),
          },
        })
      )
    );
  }

  /**
   * Create a task
   */
  static async createTask(userId: string, data: any) {
    // Logic to calculate position if not provided could go here
    return db.task.create({ data });
  }
}
````

## File: backend/src/services/TaskSyncBatchService.ts
````typescript
/**
 * TaskSyncBatchService
 * Service pour gérer les opérations de sync en batch
 * Optimise les performances pour les sync push/pull multiples
 */

import { db } from '../lib/db';
import {
    syncPushTask,
    syncDeleteTask,
    mapTaskToSync,
    ensureTaskCompatibility,
    TaskSyncPayload
} from './TaskSyncService';

export interface BatchSyncResult {
    successful: string[];
    failed: Array<{ taskId: string; error: string }>;
    summary: {
        total: number;
        successCount: number;
        failCount: number;
    };
}

/**
 * 3.2: Batch PUSH - Multiple tasks sync
 * Envoie plusieurs tasks en une seule transaction
 */
export async function batchPushTasks(
    payloads: Array<{ payload: TaskSyncPayload; type: 'CREATE' | 'UPDATE' | 'DELETE' }>,
    userId: string
): Promise<BatchSyncResult> {
    const result: BatchSyncResult = {
        successful: [],
        failed: [],
        summary: { total: payloads.length, successCount: 0, failCount: 0 }
    };

    for (const { payload, type } of payloads) {
        try {
            if (type === 'DELETE') {
                const deleteResult = await syncDeleteTask(payload.id, userId);
                if (deleteResult.success) {
                    result.successful.push(payload.id);
                    result.summary.successCount++;
                } else {
                    result.failed.push({ taskId: payload.id, error: deleteResult.error || 'Unknown error' });
                    result.summary.failCount++;
                }
            } else {
                const pushResult = await syncPushTask(payload, userId, type);
                if (pushResult.success) {
                    result.successful.push(payload.id);
                    result.summary.successCount++;
                } else {
                    result.failed.push({ taskId: payload.id, error: pushResult.error || 'Unknown error' });
                    result.summary.failCount++;
                }
            }
        } catch (error: any) {
            result.failed.push({ taskId: payload.id, error: error.message });
            result.summary.failCount++;
        }
    }

    return result;
}

/**
 * 3.2: Batch PULL + MERGE
 * Récupère les changes et les merge avec une stratégie smart
 * 
 * Stratégie de merge (Last Write Wins):
 * - Si une task locale est en PENDING et plus récente que le serveur → garder la locale
 * - Sinon → utiliser la version serveur
 */
export async function batchPullAndMerge(
    userId: string,
    lastPulledAt: Date,
    localTaskSnapshots?: Record<string, TaskSyncPayload>
): Promise<{
    tasks: any[];
    mergedTasks: any[];
    conflicts: Array<{ taskId: string; reason: string }>;
}> {
    const tasks = await db.task.findMany({
        where: {
            userId,
            lastModifiedAt: { gt: lastPulledAt },
            isDeleted: false
        },
        orderBy: { lastModifiedAt: 'desc' }
    });

    const formattedTasks = tasks.map((task: any) => {
        const mapped = mapTaskToSync(task);
        return ensureTaskCompatibility(mapped);
    });

    const conflictTasks: Array<{ taskId: string; reason: string }> = [];
    const mergedTasks = formattedTasks.map((remoteTask: any) => {
        // Si pas de snapshot local, retourner la version serveur
        if (!localTaskSnapshots || !localTaskSnapshots[remoteTask.id]) {
            return remoteTask;
        }

        const localTask = localTaskSnapshots[remoteTask.id];

        // Strategy: Last Write Wins
        // Si local est PENDING et version locale > version serveur, garder local
        if (
            localTask.syncStatus === 'PENDING' &&
            (localTask.version ?? 0) > (remoteTask.version ?? 0)
        ) {
            conflictTasks.push({
                taskId: remoteTask.id,
                reason: 'Local version is newer and pending - keeping local'
            });
            return { ...remoteTask, ...localTask, version: localTask.version };
        }

        // Sinon retourner la version serveur (dernière mise à jour gagne)
        return remoteTask;
    });

    return {
        tasks: formattedTasks,
        mergedTasks,
        conflicts: conflictTasks
    };
}

/**
 * 3.2: Smart sync - Combine PUSH et PULL
 * 1. Push les changes locaux
 * 2. Pull les changes serveur
 * 3. Merge intelligemment
 */
export async function smartSync(
    userId: string,
    lastPulledAt: Date,
    localChanges: Array<{
        payload: TaskSyncPayload;
        type: 'CREATE' | 'UPDATE' | 'DELETE';
    }>,
    localSnapshots?: Record<string, TaskSyncPayload>
): Promise<{
    pushResult: BatchSyncResult;
    pullResult: {
        tasks: any[];
        mergedTasks: any[];
        conflicts: Array<{ taskId: string; reason: string }>;
    };
}> {
    // Step 1: Push
    const pushResult = await batchPushTasks(localChanges, userId);

    // Step 2 & 3: Pull and Merge
    const pullResult = await batchPullAndMerge(userId, lastPulledAt, localSnapshots);

    return { pushResult, pullResult };
}

/**
 * 3.2: Compatibility check - Ensure old tasks are upgraded
 * Ajoute les champs manquants aux anciennes tasks
 */
export async function upgradeTasksCompatibility(userId: string): Promise<number> {
    // Find old tasks missing new fields (backward compatibility)
    const oldTasks = await db.task.findMany({
        where: {
            userId,
            OR: [
                { durationMinutes: null },
                { startedAt: null }, // Old tasks won't have startedAt field
            ]
        }
    });

    if (oldTasks.length === 0) return 0;

    // Batch update avec valeurs par défaut
    const updates = oldTasks.map((task: any) =>
        db.task.update({
            where: { id: task.id },
            data: {
                durationMinutes: task.durationMinutes,
                timeSpentMinutes: task.timeSpentMinutes ?? 0,
                position: task.position ?? 0,
                lastModifiedAt: new Date()
            }
        })
    );

    await db.$transaction(updates);
    return oldTasks.length;
}
````

## File: backend/src/services/TaskSyncService.ts
````typescript
/**
 * TaskSyncService — synchronisation offline-first des tasks.
 * CORRECTIFS:
 * - ensureTaskDefaults: updateMany à la place de N updates en transaction
 * - mergeTaskStates: retour typé sans cast non sûr
 * - syncPushTask: validation de titre cohérente entre CREATE et UPDATE
 * - types explicites à la place de any
 */

import { db } from '../lib/db';
import { Task } from '@prisma/client';

export interface TaskSyncPayload {
    id: string;
    title?: string;
    description?: string | null;
    status?: string;
    priority?: string;
    dueDate?: string | null;
    courseId?: string | null;
    eventId?: string | null;
    durationMinutes?: number | null;
    timeSpentMinutes?: number;
    position?: number;
    startedAt?: string | null;
    localId?: string | null;
    syncStatus?: string;
    version?: number;
}

export interface TaskSyncResponse {
    id: string;
    title: string;
    description: string | null;
    status: string;
    priority: string;
    dueDate: string | null;
    courseId: string | null;
    eventId: string | null;
    durationMinutes: number | null;
    timeSpentMinutes: number;
    position: number;
    startedAt: string | null;
    completedAt: string | null;
    createdAt: string;
    updatedAt: string;
    localId: string | null;
    version: number;
    syncStatus: string;
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type UuidResult =
    | { ok: true; value: string | null | undefined }
    | { ok: false; error: string };

const normalizeOptionalUuid = (value: string | null | undefined): UuidResult => {
    if (value === undefined) return { ok: true, value: undefined };
    if (value === null || value === '') return { ok: true, value: null };
    if (!UUID_REGEX.test(value)) return { ok: false, error: 'Format identifiant invalide' };
    return { ok: true, value };
};

export function mapTaskToSync(task: Task): TaskSyncResponse {
    return {
        id: task.id,
        title: task.title,
        description: task.description ?? null,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate?.toISOString() ?? null,
        courseId: task.courseId ?? null,
        eventId: task.eventId ?? null,
        durationMinutes: task.durationMinutes ?? null,
        timeSpentMinutes: task.timeSpentMinutes,
        position: task.position,
        startedAt: task.startedAt?.toISOString() ?? null,
        completedAt: task.completedAt?.toISOString() ?? null,
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt.toISOString(),
        localId: task.localId ?? null,
        version: task.version,
        syncStatus: task.syncStatus,
    };
}

function mapSyncToTask(
    payload: TaskSyncPayload,
    userId: string,
    existingTask: Task | null
): Omit<Task, 'id' | 'createdAt' | 'updatedAt'> {
    return {
        userId,
        title: payload.title ?? existingTask?.title ?? '',
        description:
            payload.description !== undefined ? payload.description ?? null : existingTask?.description ?? null,
        status: (payload.status ?? existingTask?.status ?? 'PENDING') as Task['status'],
        priority: (payload.priority ?? existingTask?.priority ?? 'MEDIUM') as Task['priority'],
        dueDate:
            payload.dueDate !== undefined
                ? payload.dueDate ? new Date(payload.dueDate) : null
                : existingTask?.dueDate ?? null,
        courseId:
            payload.courseId !== undefined ? payload.courseId ?? null : existingTask?.courseId ?? null,
        eventId:
            payload.eventId !== undefined ? payload.eventId ?? null : existingTask?.eventId ?? null,
        durationMinutes:
            payload.durationMinutes !== undefined
                ? payload.durationMinutes ?? null
                : existingTask?.durationMinutes ?? null,
        timeSpentMinutes: payload.timeSpentMinutes ?? existingTask?.timeSpentMinutes ?? 0,
        position: payload.position ?? existingTask?.position ?? 0,
        startedAt:
            payload.startedAt !== undefined
                ? payload.startedAt ? new Date(payload.startedAt) : null
                : existingTask?.startedAt ?? null,
        completedAt: existingTask?.completedAt ?? null,
        localId: payload.localId ?? existingTask?.localId ?? null,
        syncStatus: 'SYNCED' as Task['syncStatus'],
        lastModifiedAt: new Date(),
        version: (payload.version ?? existingTask?.version ?? 0) + 1,
        isDeleted: existingTask?.isDeleted ?? false,
        deletedAt: existingTask?.deletedAt ?? null,
    };
}

/**
 * CORRECTIF: updateMany à la place de N updates séparés en transaction.
 * Plus efficace : une seule requête SQL.
 */
export async function ensureTaskDefaults(userId: string): Promise<{ updated: number }> {
    const result = await db.task.updateMany({
        where: {
            userId,
            OR: [
                { timeSpentMinutes: 0, position: 0 },
            ],
        },
        data: {
            timeSpentMinutes: 0,
            position: 0,
            lastModifiedAt: new Date(),
        },
    });

    return { updated: result.count };
}

export async function syncPushTask(
    payload: TaskSyncPayload,
    userId: string,
    type: 'CREATE' | 'UPDATE'
): Promise<{ success: boolean; data?: TaskSyncResponse; error?: string }> {
    try {
        const normalizedEventId = normalizeOptionalUuid(payload.eventId);
        if (!normalizedEventId.ok) return { success: false, error: 'eventId invalide' };

        const normalizedCourseId = normalizeOptionalUuid(payload.courseId);
        if (!normalizedCourseId.ok) return { success: false, error: 'courseId invalide' };

        // CORRECTIF: validation de titre uniforme pour CREATE et UPDATE
        const title = payload.title?.trim();
        if (type === 'CREATE' && !title) {
            return { success: false, error: 'Le titre est requis pour la création.' };
        }

        const existingTask = await db.task.findUnique({ where: { id: payload.id } });

        if (existingTask && existingTask.userId !== userId) {
            return { success: false, error: 'Tâche introuvable ou accès refusé.' };
        }
        if (type === 'UPDATE' && !existingTask && !title) {
            return { success: false, error: 'Le titre est requis pour créer une tâche manquante via update.' };
        }

        // Validation silencieuse des références — on nullifie au lieu de rejeter
        let validEventId = normalizedEventId.value as string | null | undefined;
        let validCourseId = normalizedCourseId.value as string | null | undefined;

        if (validEventId) {
            const event = await db.event.findUnique({ where: { id: validEventId }, select: { userId: true } });
            if (!event || event.userId !== userId) validEventId = null;
        }
        if (validCourseId) {
            const course = await db.course.findUnique({ where: { id: validCourseId }, select: { userId: true } });
            if (!course || course.userId !== userId) validCourseId = null;
        }

        const validatedPayload: TaskSyncPayload = {
            ...payload,
            eventId: validEventId,
            courseId: validCourseId,
        };

        const syncData = mapSyncToTask(validatedPayload, userId, existingTask);

        const task = await db.task.upsert({
            where: { id: payload.id },
            update: syncData,
            create: { id: payload.id, ...syncData },
        });

        return { success: true, data: mapTaskToSync(task) };
    } catch (error: unknown) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Sync push échoué',
        };
    }
}

export async function syncDeleteTask(
    taskId: string,
    userId: string
): Promise<{ success: boolean; error?: string }> {
    try {
        const task = await db.task.findUnique({ where: { id: taskId }, select: { userId: true } });
        if (!task || task.userId !== userId) {
            return { success: false, error: 'Tâche introuvable ou accès refusé.' };
        }

        await db.task.update({
            where: { id: taskId },
            data: {
                isDeleted: true,
                deletedAt: new Date(),
                syncStatus: 'SYNCED',
                lastModifiedAt: new Date(),
            },
        });

        return { success: true };
    } catch (error: unknown) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Sync delete échoué',
        };
    }
}

export async function syncPullTasks(userId: string, lastPulledAt: Date): Promise<TaskSyncResponse[]> {
    const tasks = await db.task.findMany({
        where: { userId, lastModifiedAt: { gt: lastPulledAt } },
        orderBy: { lastModifiedAt: 'desc' },
    });
    return tasks.map(mapTaskToSync);
}

/**
 * CORRECTIF: retour typé sans cast non sûr (as TaskSyncResponse).
 * Si local est PENDING, on merge champ par champ de façon explicite.
 */
export function mergeTaskStates(
    local: TaskSyncPayload,
    remote: TaskSyncResponse
): TaskSyncResponse {
    if (local.syncStatus === 'PENDING') {
        return {
            id: local.id ?? remote.id,
            title: local.title ?? remote.title,
            description: local.description !== undefined ? local.description ?? null : remote.description,
            status: local.status ?? remote.status,
            priority: local.priority ?? remote.priority,
            dueDate: local.dueDate !== undefined ? local.dueDate ?? null : remote.dueDate,
            courseId: local.courseId !== undefined ? local.courseId ?? null : remote.courseId,
            eventId: local.eventId !== undefined ? local.eventId ?? null : remote.eventId,
            durationMinutes:
                local.durationMinutes !== undefined ? local.durationMinutes ?? null : remote.durationMinutes,
            timeSpentMinutes: local.timeSpentMinutes ?? remote.timeSpentMinutes,
            position: local.position ?? remote.position,
            startedAt: local.startedAt !== undefined ? local.startedAt ?? null : remote.startedAt,
            completedAt: remote.completedAt,
            createdAt: remote.createdAt,
            updatedAt: remote.updatedAt,
            localId: local.localId !== undefined ? local.localId ?? null : remote.localId,
            version: local.version ?? remote.version,
            syncStatus: 'PENDING',
        };
    }

    return remote;
}

export function ensureTaskCompatibility(task: Partial<TaskSyncResponse>): TaskSyncResponse {
    const now = new Date().toISOString();
    return {
        id: task.id!,
        title: task.title!,
        description: task.description ?? null,
        status: task.status ?? 'PENDING',
        priority: task.priority ?? 'MEDIUM',
        dueDate: task.dueDate ?? null,
        courseId: task.courseId ?? null,
        eventId: task.eventId ?? null,
        durationMinutes: task.durationMinutes ?? null,
        timeSpentMinutes: task.timeSpentMinutes ?? 0,
        position: task.position ?? 0,
        startedAt: task.startedAt ?? null,
        completedAt: task.completedAt ?? null,
        createdAt: task.createdAt ?? now,
        updatedAt: task.updatedAt ?? now,
        localId: task.localId ?? null,
        version: task.version ?? 1,
        syncStatus: task.syncStatus ?? 'SYNCED',
    };
}
````

## File: backend/src/services/UserService.ts
````typescript
import { db } from '../lib/db';
import { NotFoundError } from '../errors/http.errors';

export class UserService {
  async getUser(id: string) {
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        // Mock permissions for now based on role
        // In a real app, this would be a separate table or field
      }
    });

    if (!user) {
      throw new NotFoundError('Utilisateur introuvable');
    }

    // Assigning permissions based on role
    const permissions = user.role === 'PROFESSOR' 
      ? ['UPDATE_GRADE', 'UPDATE_SCHEDULE', 'ASSIGN_COURSE']
      : [];

    return { ...user, permissions };
  }
}
````

## File: backend/src/services/WorkService.ts
````typescript
import { db } from '../lib/db';
import { PointsEngineService } from './PointsEngineService';

export class WorkService {
  static validatePointsRange(pointsEarned: number | null | undefined, pointsPossible: number) {
    if (!Number.isFinite(pointsPossible) || pointsPossible <= 0) {
      return 'Le maximum de points doit etre superieur a 0';
    }
    if (pointsEarned === null || pointsEarned === undefined) return null;
    if (!Number.isFinite(pointsEarned) || pointsEarned < 0 || pointsEarned > pointsPossible) {
      return 'Les points obtenus doivent etre compris entre 0 et le maximum';
    }
    return null;
  }

  static async resolveWorkTypeId(courseId: string, workType?: string | null) {
    if (!workType) return undefined;
    const configured = await db.courseWorkType.findMany({
      where: { courseId },
      select: { id: true, type: true }
    });
    if (configured.length === 0) return undefined;
    const normalized = String(workType).trim().toUpperCase();
    const match = configured.find((item: any) => item.type.toUpperCase() === normalized);
    return match ? match.id : undefined;
  }

  static async recalculateForCourse(userId: string, courseId: string) {
    const works = await db.work.findMany({
      where: { userId, courseId },
      include: { workType: { select: { type: true, weightPercent: true } } }
    });

    const gradedWorks = works.filter((work: any) =>
      work.pointsEarned !== null && Number.isFinite(work.pointsEarned) && Number.isFinite(work.pointsPossible)
    );

    if (gradedWorks.length === 0) {
      return {
        courseId,
        workCount: works.length,
        gradedWorkCount: 0,
        average: null
      };
    }

    const average = PointsEngineService.calculatePercentageBasedAverage(
      gradedWorks.map((work: any) => ({
        score: Number(work.pointsEarned),
        maxScore: Number(work.pointsPossible),
        percentage: work.percentage,
        workTypeLabel: work.workTypeLabel,
        workType: work.workType
      }))
    );

    return {
      courseId,
      workCount: works.length,
      gradedWorkCount: gradedWorks.length,
      average: Math.round(average * 100) / 100
    };
  }
}
````

## File: backend/src/services/WorkSyncService.ts
````typescript
import { db } from '../lib/db';
import { WorkService } from './WorkService';
import { ForbiddenError, ValidationError } from '../errors/http.errors';

export interface WorkSyncPayload {
    id: string;
    title?: string;
    description?: string | null;
    status?: any;
    dueDate?: string | Date | null;
    submittedAt?: string | Date | null;
    gradedAt?: string | Date | null;
    pointsEarned?: number | null;
    pointsPossible?: number;
    courseId: string;
    eventId?: string | null;
    workTypeId?: string | null;
    workTypeLabel?: string | null;
    comment?: string | null;
    version?: number;
}

export class WorkSyncService {
    static async validateAndNormalize(payload: WorkSyncPayload, userId: string) {
        // Course validation
        const course = await db.course.findUnique({
            where: { id: payload.courseId },
            select: { userId: true }
        });
        if (!course) throw new ValidationError('Cours introuvable');
        if (course.userId !== userId) throw new ForbiddenError();

        // Event validation
        if (payload.eventId) {
            const event = await db.event.findUnique({
                where: { id: payload.eventId },
                select: { userId: true }
            });
            if (!event || event.userId !== userId) throw new ValidationError('Événement introuvable');
        }

        const pointsPossible = payload.pointsPossible ?? 20;
        const pointsEarned = payload.pointsEarned ?? null;
        const rangeError = WorkService.validatePointsRange(pointsEarned, pointsPossible);
        if (rangeError) throw new ValidationError(rangeError);

        return {
            ...payload,
            pointsPossible,
            pointsEarned,
            dueDate: payload.dueDate ? new Date(payload.dueDate) : null,
            submittedAt: payload.submittedAt ? new Date(payload.submittedAt) : null,
            gradedAt: payload.gradedAt ? new Date(payload.gradedAt) : null
        };
    }

    static async push(payload: WorkSyncPayload, userId: string, type: 'CREATE' | 'UPDATE' | 'DELETE') {
        if (type === 'DELETE') {
            const existing = await db.work.findUnique({ where: { id: payload.id }, select: { userId: true } });
            if (!existing) return { id: payload.id };
            if (existing.userId !== userId) throw new ForbiddenError();
            await db.work.delete({ where: { id: payload.id } });
            return { id: payload.id };
        }

        const normalized = await this.validateAndNormalize(payload, userId);

        const data: any = {
            userId,
            courseId: normalized.courseId,
            eventId: normalized.eventId,
            title: normalized.title || 'Travail',
            description: normalized.description,
            status: normalized.status || 'PLANNED',
            dueDate: normalized.dueDate,
            submittedAt: normalized.submittedAt,
            gradedAt: normalized.gradedAt,
            pointsEarned: normalized.pointsEarned,
            pointsPossible: normalized.pointsPossible,
            workTypeId: normalized.workTypeId,
            workTypeLabel: normalized.workTypeLabel,
            comment: normalized.comment,
            syncStatus: 'SYNCED',
            lastModifiedAt: new Date(),
            version: payload.version ? { increment: 1 } : 1
        };

        const result = await db.work.upsert({
            where: { id: payload.id },
            create: { id: payload.id, ...data, version: 1 },
            update: data,
            include: {
                workType: { select: { type: true, weightPercent: true } }
            }
        });

        return result;
    }

    static async pull(userId: string, since: Date) {
        return db.work.findMany({
            where: {
                userId,
                lastModifiedAt: { gt: since }
            },
            include: {
                workType: { select: { type: true, weightPercent: true } }
            }
        });
    }
}
````

## File: backend/src/stores/networkStore.ts
````typescript

````

## File: backend/src/types/professor.types.ts
````typescript
import { Prisma } from '@prisma/client';

export enum ProfessorAction {
  UPDATE_GRADE = 'UPDATE_GRADE',
  UPDATE_SCHEDULE = 'UPDATE_SCHEDULE',
  ASSIGN_COURSE = 'ASSIGN_COURSE'
}

export interface UpdateGradeDTO {
  gradeId?: string;
  studentId: string;
  courseId: string;
  workId?: string;
  score: number;
  maxScore?: number;
  percentage?: number;
  comment?: string;
  name?: string;
  date?: string | Date;
}

export interface EventUpdatePayload {
  id: string;
  title?: string;
  description?: string;
  location?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  isAllDay?: boolean;
  recurrence?: string;
  type?: string;
}

export interface UpdateScheduleDTO {
  courseId: string;
  events: EventUpdatePayload[];
}

export interface GradeResponse {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  percentage: number | null;
  comment: string | null;
  workId: string | null;
  work: any | null;
  workType: any | null;
  date: Date | null;
  updatedAt: Date;
}

export interface ProfessorAssignmentResponse {
  id: string;
  userId: string;
  courses: any[];
}
````

## File: backend/src/types/user.types.ts
````typescript

````

## File: backend/src/utils/_test_utils_/sqlite-test-db.ts
````typescript
import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";

let prisma: PrismaClient | null = null;

export async function setupTestDb(): Promise<PrismaClient> {
    const url = 'file::memory:?cache=shared';

    prisma = new PrismaClient({
        datasources: { db: { url } },
        log:['error', 'warn'],
    })

await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS User (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      passwordHash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'STUDENT',
      resetPasswordToken TEXT,
      resetPasswordExpiresAt DATETIME,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS Professor (
      id TEXT PRIMARY KEY,
      userId TEXT UNIQUE NOT NULL,
      FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS RefreshToken (
      id TEXT PRIMARY KEY,
      token TEXT UNIQUE NOT NULL,
      userId TEXT NOT NULL,
      expiresAt DATETIME NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
    );
  `);

return prisma;
}

export async function teardownTestDb() {
    if (prisma) {
        await prisma.$disconnect();
        prisma = null;
    }
}

export function getTestDb(): PrismaClient {
    if (!prisma) throw new Error('Test DB not initialized');
    return prisma;
}
````

## File: backend/src/utils/apiResponse.ts
````typescript
import { Response } from 'express';

export interface ApiSuccess<T> {
    success: true;
    data: T;
}

export interface ApiError {
    success: false;
    error: {
        message: string;
        code?: string;
    };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export const sendSuccess = <T>(res: Response, data: T, status = 200): void => {
    res.status(status).json({ success: true, data } satisfies ApiSuccess<T>);
};

export const sendError = (
    res: Response,
    message: string,
    status = 500,
    code?: string
): void => {
    res.status(status).json({
        success: false,
        error: { message, ...(code ? { code } : {}) },
    } satisfies ApiError);
};
````

## File: backend/src/utils/bcrypt.utils.ts
````typescript
import bcrypt from 'bcrypt';

export class PasswordService {
    private static readonly SALT_ROUNDS= parseInt (
        process.env.BCRYPT_SALT_ROUNDS || '12'
    );

    static async hash (password: string): Promise<string>{
        return await bcrypt.hash(password, this.SALT_ROUNDS);
    }

    static async compare(
        password: string,
        hash: string
    ): Promise<boolean>{
        return await bcrypt.compare(password, hash);
    }

    static validateStrength(password: string):{
        isValid:boolean;
        errors: string[];
    }{
        const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Le mot de passe doit contenir au moins 8 caractères');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Le mot de passe doit contenir une majuscule');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Le mot de passe doit contenir une minuscule');
    }
    
    if (!/[0-9]/.test(password)) {
      errors.push('Le mot de passe doit contenir un chiffre');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Le mot de passe doit contenir un caractère spécial');
    }
    return{
        isValid: errors.length ===0,
        errors
    };
    }
}
````

## File: backend/src/utils/catchAsync.ts
````typescript
import { Request, Response, NextFunction } from "express";

/**
 * Wraps an async express middleware/controller function to catch errors and pass them to the next() function.
 * Removes the need for try/catch blocks in every controller method.
 */
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
````

## File: backend/src/utils/jwt.utils.ts
````typescript
// src/utils/jwt.utils.ts
import jwt, { JwtPayload, SignOptions, VerifyOptions } from 'jsonwebtoken';

export interface TokenPayload extends JwtPayload {
  userId: string;
  email: string;
  role?: string;
}

// ========== CONFIGURATION DEPUIS L'ENVIRONNEMENT ==========

// Récupération des variables d'environnement
const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRES_IN = process.env.JWT_EXPIRES|| '15m';
const REFRESH_TOKEN_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRE || '7d';

// Validation des secrets au démarrage (facultatif mais recommandé)
if (!ACCESS_TOKEN_SECRET) {
  console.error('❌ ERREUR: JWT_ACCESS_SECRET non défini dans les variables d\'environnement');
  // Ne pas throw en développement pour pouvoir tester
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_ACCESS_SECRET must be defined in environment variables');
  }
}

if (!REFRESH_TOKEN_SECRET) {
  console.error('⚠️ AVERTISSEMENT: JWT_REFRESH_SECRET non défini, utilisation de JWT_SECRET ou secret par défaut');
}

// ========== FONCTIONS DE VALIDATION ==========

function getAccessTokenSecret(): string {
  const secret = ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new Error('JWT_ACCESS_SECRET environment variable is not set');
  }
  return secret;
}

function getRefreshTokenSecret(): string {
  const secret = REFRESH_TOKEN_SECRET;
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET environment variable is not set');
  }
  return secret;
}

// ========== TYPE GUARD ==========

function isTokenPayload(decoded: string | JwtPayload): decoded is TokenPayload {
  if (typeof decoded === 'string') {
    return false;
  }
  
  const payload = decoded as any;
  return (
    typeof payload === 'object' &&
    payload !== null &&
    typeof payload.userId === 'string' &&
    typeof payload.email === 'string'
    // role est optionnel, pas besoin de vérifier
  );
}

// ========== CLASSE JWTService ==========

export class JWTService {
  // Générer un token d'accès
  static generateAccessToken(payload: TokenPayload, options?: SignOptions): string {
    const secret = getAccessTokenSecret();
    return jwt.sign(payload, secret, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN as any,
      ...options
    });
  }

  // Générer un refresh token
  static generateRefreshToken(payload: TokenPayload, options?: SignOptions): string {
    const secret = getRefreshTokenSecret();
    return jwt.sign(payload, secret, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN as any,
      ...options
    });
  }

  // Vérifier un token d'accès
  static verifyAccessToken(token: string, options?: VerifyOptions): TokenPayload {
    const secret = getAccessTokenSecret();
    const decoded = jwt.verify(token, secret, options);
    
    if (!isTokenPayload(decoded)) {
      throw new Error('Invalid access token payload');
    }
    
    return decoded;
  }

  // Vérifier un refresh token
  static verifyRefreshToken(token: string, options?: VerifyOptions): TokenPayload {
    const secret = getRefreshTokenSecret();
    const decoded = jwt.verify(token, secret, options);
    
    if (!isTokenPayload(decoded)) {
      throw new Error('Invalid refresh token payload');
    }
    
    return decoded;
  }

  // Décoder un token sans vérification
  static decodeToken(token: string): TokenPayload | null {
    try {
      const decoded = jwt.decode(token);
      
      if (decoded && isTokenPayload(decoded)) {
        return decoded;
      }
      return null;
    } catch {
      return null;
    }
  }

  // ========== MÉTHODES UTILITAIRES ==========

  static extractUserId(token: string): string | null {
    const payload = this.decodeToken(token);
    return payload?.userId ?? null;
  }

  static createTokenPair(user: { userId: string; email: string; role?: string }): {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  } {
    const payload: TokenPayload = {
      userId: user.userId,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000)
    };

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);
    
    // Convertir la durée en secondes (ex: '15m' → 900 secondes)
    const expiresIn = this.parseExpiresIn(ACCESS_TOKEN_EXPIRES_IN);

    return {
      accessToken,
      refreshToken,
      expiresIn
    };
  }

  // Convertir une chaîne comme '15m', '2h', '7d' en secondes
  private static parseExpiresIn(expiresIn: string): number {
    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (!match) {
      return 900; // 15 minutes par défaut
    }
    
    const value = parseInt(match[1]);
    const unit = match[2];
    
    switch (unit) {
      case 's': return value; // secondes
      case 'm': return value * 60; // minutes
      case 'h': return value * 60 * 60; // heures
      case 'd': return value * 24 * 60 * 60; // jours
      default: return 900;
    }
  }

  // Vérifier si un token est expiré
  static isTokenExpired(token: string): boolean {
    try {
      this.verifyAccessToken(token);
      return false;
    } catch (error: any) {
      return error.message.includes('expired') || error.name === 'TokenExpiredError';
    }
  }

  // Obtenir la date d'expiration
  static getTokenExpiry(token: string): Date | null {
    const payload = this.decodeToken(token);
    if (payload?.exp) {
      return new Date(payload.exp * 1000);
    }
    return null;
  }
}

// ========== EXPORT DES FONCTIONS INDIVIDUELLES (compatibilité) ==========

export function generateToken(payload: TokenPayload, options?: SignOptions): string {
  return JWTService.generateAccessToken(payload, options);
}

export function generateRefreshToken(payload: TokenPayload, options?: SignOptions): string {
  return JWTService.generateRefreshToken(payload, options);
}

export function verifyToken(token: string, options?: VerifyOptions): TokenPayload {
  return JWTService.verifyAccessToken(token, options);
}

export function decodeToken(token: string): TokenPayload | null {
  return JWTService.decodeToken(token);
}

export function extractUserIdFromToken(token: string): string | null {
  return JWTService.extractUserId(token);
}
````

## File: backend/src/utils/logger.ts
````typescript
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV !== 'production' 
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      } 
    : undefined,
});
````

## File: backend/src/utils/pagination.ts
````typescript
import { Prisma } from "@prisma/client";

/**
 * Utility for cursor-based pagination with Prisma
 */
export async function paginate<T, K extends keyof T>(
  model: any,
  args: any = {},
  options: {
    limit: number;
    cursorField: K;
    cursorValue?: any;
    order?: "asc" | "desc";
  }
) {
  const { limit, cursorField, cursorValue, order = "desc" } = options;

  const queryArgs: any = {
    ...args,
    take: limit + 1, // Fetch one extra to check if there is a next page
    orderBy: { [cursorField]: order },
  };

  if (cursorValue) {
    queryArgs.cursor = { [cursorField]: cursorValue };
    queryArgs.skip = 1; // Skip the cursor itself
  }

  const items = await model.findMany(queryArgs);
  
  const hasNextPage = items.length > limit;
  const results = hasNextPage ? items.slice(0, limit) : items;
  const nextCursor = hasNextPage ? results[results.length - 1][cursorField] : null;

  return {
    data: results,
    meta: {
      limit,
      hasNextPage,
      nextCursor,
    },
  };
}
````

## File: backend/src/validators/auth.validators.ts
````typescript
import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email('Email invalide').min(5).max(255),
    name: z.string().min(2, 'Nom trop court').max(100, 'Nom trop long'),
    password: z.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caracteres')
        .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
        .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
        .regex(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir au moins un caractere special'),
    deviceId: z.string().uuid('deviceId invalide').optional()
});

export const loginSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(1, 'Mot de passe requis'),
    deviceId: z.string().uuid('deviceId invalide').optional()
});

export const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1, 'Le refresh token est requis'),
    deviceId: z.string().uuid('deviceId invalide').optional()
});

export const logoutSchema = z.object({
    refreshToken: z.string().min(1).optional(),
    deviceId: z.string().uuid('deviceId invalide').optional()
});

export const forgotPasswordSchema = z.object({
    email: z.string().email('Email invalide')
});

export const resetPasswordSchema = z.object({
    token: z.string().min(1, 'Le token est requis'),
    newPassword: z.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caracteres')
        .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
        .regex(/[0-9]/, 'Le mot de passe doit contenir au least un chiffre')
        .regex(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir au moins un caractere special')
});
````

## File: backend/src/validators/event.validators.ts
````typescript
import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  type: z.enum(["CLASS", "EXAM", "EXAMEN", "INTERRO", "TP", "QUIZ", "ASSIGNMENT", "STUDY", "AUTRE", "PERSONAL", "MEETING"]).optional(),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()),
  isAllDay: z.boolean().optional(),
  location: z.string().optional(),
  recurrence: z.string().optional(),
  courseId: z.string().uuid().optional(),
  generateDefaultTasks: z.boolean().optional(),
});

export const updateEventSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  type: z.enum(["CLASS", "EXAM", "EXAMEN", "INTERRO", "TP", "QUIZ", "ASSIGNMENT", "STUDY", "AUTRE", "PERSONAL", "MEETING"]).optional(),
  startDate: z.string().or(z.date()).optional(),
  endDate: z.string().or(z.date()).optional(),
  isAllDay: z.boolean().optional(),
  location: z.string().optional(),
  recurrence: z.string().optional(),
  courseId: z.string().uuid().optional(), // Can move event to another course?
});
````

## File: backend/src/validators/professor.validators.ts
````typescript
import { z } from 'zod';

export const updateGradeSchema = z.object({
  gradeId: z.string().uuid().optional(),
  studentId: z.string().uuid(),
  courseId: z.string().uuid(),
  workId: z.string().uuid().optional(),
  score: z.number().min(0),
  maxScore: z.number().min(0).optional(),
  percentage: z.number().min(0).max(100).optional(),
  comment: z.string().max(500).optional(),
  name: z.string().max(100).optional(),
  date: z.string().or(z.date()).optional()
});

export const updateScheduleSchema = z.object({
  courseId: z.string().uuid(),
  events: z.array(z.object({
    id: z.string().uuid(),
    title: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    startDate: z.string().or(z.date()).optional(),
    endDate: z.string().or(z.date()).optional(),
    isAllDay: z.boolean().optional(),
    recurrence: z.string().optional(),
    type: z.string().optional()
  }))
});

export const assignCourseSchema = z.object({
  courseId: z.string().uuid()
});
````

## File: backend/src/validators/task.validators.ts
````typescript
import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELED"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
  dueDate: z.string().or(z.date()).optional(),
  courseId: z.string().uuid().optional(),
  eventId: z.string().uuid().optional(),
  durationMinutes: z.number().int().positive().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELED"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
  dueDate: z.string().or(z.date()).optional(),
  courseId: z.string().uuid().optional(),
  eventId: z.string().uuid().nullable().optional(), // Nullable allowing detachment
  durationMinutes: z.number().int().positive().optional(),
});

// For reordering
export const reorderTasksSchema = z.object({
  items: z.array(
    z.object({
      taskId: z.string().uuid(),
      eventId: z.string().uuid().nullable(),
      position: z.number().int().nonnegative(),
    })
  ).min(1),
});
````

## File: backend/src/validators/work.validators.ts
````typescript
import { z } from "zod";

const workStatus = z.enum(["PLANNED", "SUBMITTED", "GRADED", "CANCELLED"]);

export const createWorkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: workStatus.optional(),
  dueDate: z.string().or(z.date()).optional(),
  submittedAt: z.string().or(z.date()).optional(),
  gradedAt: z.string().or(z.date()).optional(),
  pointsEarned: z.number().min(0).optional(),
  pointsPossible: z.number().positive().optional(),
  percentage: z.number().min(0).max(100).optional(),
  comment: z.string().optional(),
  courseId: z.string().uuid(),
  eventId: z.string().uuid().optional(),
  workTypeId: z.string().uuid().optional(),
  workTypeLabel: z.string().min(1).max(60).optional(),
  localId: z.string().optional()
});

export const updateWorkSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: workStatus.optional(),
  dueDate: z.string().or(z.date()).nullable().optional(),
  submittedAt: z.string().or(z.date()).nullable().optional(),
  gradedAt: z.string().or(z.date()).nullable().optional(),
  pointsEarned: z.number().min(0).nullable().optional(),
  pointsPossible: z.number().positive().optional(),
  percentage: z.number().min(0).max(100).nullable().optional(),
  comment: z.string().nullable().optional(),
  eventId: z.string().uuid().nullable().optional(),
  workTypeId: z.string().uuid().nullable().optional(),
  workTypeLabel: z.string().min(1).max(60).nullable().optional(),
  localId: z.string().nullable().optional()
});
````

## File: backend/test_api.js
````javascript
const API_URL = 'http://localhost:3000/api';

async function test() {
    try {
        console.log('--- Testing Health ---');
        const healthRes = await fetch(`${API_URL}/health`);
        const healthData = await healthRes.json();
        console.log('Health:', healthData);

        const email = `test_${Date.now()}@example.com`;
        const password = 'Password123!';

        console.log('\n--- Testing Registration ---');
        const regRes = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                name: 'Test User',
                password,
                role: 'STUDENT'
            })
        });
        const regData = await regRes.json();
        console.log('Registration Status:', regRes.status);
        console.log('Registration Data:', JSON.stringify(regData, null, 2));

        console.log('\n--- Testing Login ---');
        const loginRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const loginData = await loginRes.json();
        console.log('Login Status:', loginRes.status);
        if (loginRes.status === 200) {
            console.log('Login Success:', loginData.success);
            const tokens = loginData.data.tokens;
            
            console.log('\n--- Testing Refresh Token ---');
            const refreshRes = await fetch(`${API_URL}/auth/refresh-token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: tokens.refreshToken })
            });
            const refreshData = await refreshRes.json();
            console.log('Refresh Status:', refreshRes.status);
            console.log('Refresh Success:', refreshData.success);
        } else {
            console.log('Login Failed:', loginData);
        }

    } catch (error) {
        console.error('\n!!! Test failed !!!');
        console.error(error.message);
    }
}

test();
````

## File: backend/test_output.txt
````
node.exe : FAIL src/services/_
_tests__/ProfessorService.test
.ts
Au caractère C:\Program 
Files\nodejs\npx.ps1:29 : 3
+   & $NODE_EXE $NPX_CLI_JS 
$args
+   
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : 
    NotSpecified: (FAIL src/  
  servic...Service.test.ts:   
 String) [], RemoteExcepti    
on
    + FullyQualifiedErrorId : 
    NativeCommandError
 
  ProfessorService
    updateGrade
      ├ù should create a new 
grade if user has permission 
and is assigned to course (8 
ms)
      ├ù should throw 
ForbiddenError if professor 
is not assigned to course (32 
ms)
      ├ù should update an 
existing grade if gradeId is 
provided (2 ms)
    assignToCourse
      ├ù should assign 
professor to course if they 
have permission (4 ms)

  ÔùÅ ProfessorService ÔÇ║ 
updateGrade ÔÇ║ should create 
a new grade if user has 
permission and is assigned to 
course

    Invalid UUID

    [0m [90m 3 |[39m 
[36mexport[39m 
[36mclass[39m 
[33mHttpError[39m 
[36mextends[39m 
[33mAppError[39m {
     [90m 4 |[39m   construc
tor(message[33m:[39m 
string[33m,[39m 
statusCode[33m:[39m number) 
{
    [31m[1m>[22m[39m[90m 
5 |[39m     [36msuper[39m(m
essage[33m,[39m 
statusCode)[33m;[39m
     [90m   |[39m     
[31m[1m^[22m[39m
     [90m 6 |[39m   }
     [90m 7 |[39m }
     [90m 8 |[39m[0m

      at new HttpError (src/er
rors/http.errors.ts:5:5)
      at new ValidationError (
src/errors/http.errors.ts:11:5
)
      at 
ProfessorService.updateGrade (
src/services/ProfessorService.
ts:111:15)
      at Object.<anonymous> (s
rc/services/__tests__/Professo
rService.test.ts:79:36)

  ÔùÅ ProfessorService ÔÇ║ 
updateGrade ÔÇ║ should throw 
ForbiddenError if professor 
is not assigned to course

    expect(received).rejects.t
oThrow(expected)

    Expected constructor: 
ForbiddenError
    Received constructor: 
AppError

    Received message: 
"Invalid UUID"

        [0m [90m 3 |[39m 
[36mexport[39m 
[36mclass[39m 
[33mHttpError[39m 
[36mextends[39m 
[33mAppError[39m {
         [90m 4 |[39m   cons
tructor(message[33m:[39m 
string[33m,[39m 
statusCode[33m:[39m number) 
{
        
[31m[1m>[22m[39m[90m 5 
|[39m     [36msuper[39m(mes
sage[33m,[39m 
statusCode)[33m;[39m
         [90m   |[39m     
[31m[1m^[22m[39m
         [90m 6 |[39m   }
         [90m 7 |[39m }
         [90m 8 |[39m[0m

      at new HttpError (src/er
rors/http.errors.ts:5:5)
      at new ValidationError (
src/errors/http.errors.ts:11:5
)
      at 
ProfessorService.updateGrade (
src/services/ProfessorService.
ts:111:15)
      at Object.<anonymous> (s
rc/services/__tests__/Professo
rService.test.ts:92:28)
      at Object.toThrow (node_
modules/expect/build/index.js:
2155:20)
      at Object.<anonymous> (s
rc/services/__tests__/Professo
rService.test.ts:92:71)

  ÔùÅ ProfessorService ÔÇ║ 
updateGrade ÔÇ║ should update 
an existing grade if gradeId 
is provided

    Invalid UUID

    [0m [90m 3 |[39m 
[36mexport[39m 
[36mclass[39m 
[33mHttpError[39m 
[36mextends[39m 
[33mAppError[39m {
     [90m 4 |[39m   construc
tor(message[33m:[39m 
string[33m,[39m 
statusCode[33m:[39m number) 
{
    [31m[1m>[22m[39m[90m 
5 |[39m     [36msuper[39m(m
essage[33m,[39m 
statusCode)[33m;[39m
     [90m   |[39m     
[31m[1m^[22m[39m
     [90m 6 |[39m   }
     [90m 7 |[39m }
     [90m 8 |[39m[0m

      at new HttpError (src/er
rors/http.errors.ts:5:5)
      at new ValidationError (
src/errors/http.errors.ts:11:5
)
      at 
ProfessorService.updateGrade (
src/services/ProfessorService.
ts:111:15)
      at Object.<anonymous> (s
rc/services/__tests__/Professo
rService.test.ts:121:36)

  ÔùÅ ProfessorService ÔÇ║ 
assignToCourse ÔÇ║ should 
assign professor to course if 
they have permission

    Invalid UUID

    [0m [90m 3 |[39m 
[36mexport[39m 
[36mclass[39m 
[33mHttpError[39m 
[36mextends[39m 
[33mAppError[39m {
     [90m 4 |[39m   construc
tor(message[33m:[39m 
string[33m,[39m 
statusCode[33m:[39m number) 
{
    [31m[1m>[22m[39m[90m 
5 |[39m     [36msuper[39m(m
essage[33m,[39m 
statusCode)[33m;[39m
     [90m   |[39m     
[31m[1m^[22m[39m
     [90m 6 |[39m   }
     [90m 7 |[39m }
     [90m 8 |[39m[0m

      at new HttpError (src/er
rors/http.errors.ts:5:5)
      at new ValidationError (
src/errors/http.errors.ts:11:5
)
      at ProfessorService.assi
gnToCourse (src/services/Profe
ssorService.ts:218:15)
      at Object.<anonymous> (s
rc/services/__tests__/Professo
rService.test.ts:136:36)

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
Snapshots:   0 total
Time:        4.706 s
Ran all test suites matching s
rc\services\__tests__\Professo
rService.test.ts.
````

## File: backend/test_sync_error.js
````javascript
const API_URL = 'http://localhost:3000/api';

async function testSync() {
    try {
        const email = `test_sync_${Date.now()}@example.com`;
        const password = 'Password123!';

        console.log('--- Registering ---');
        const regRes = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                name: 'Sync Test User',
                password,
                role: 'STUDENT'
            })
        });
        const regData = await regRes.json();
        if (regRes.status !== 201) {
            console.error('Registration failed:', regData);
            return;
        }

        console.log('--- Logging In ---');
        const loginRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const loginData = await loginRes.json();
        if (loginRes.status !== 200) {
            console.error('Login failed:', loginData);
            return;
        }

        const token = loginData.data.tokens.accessToken;
        console.log('--- Testing Pull ---');
        const pullRes = await fetch(`${API_URL}/sync/pull?deviceId=test-device`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        console.log('Pull Status:', pullRes.status);
        const pullData = await pullRes.json();
        console.log('Pull Response:', JSON.stringify(pullData, null, 2));

        console.log('\n--- Testing Push ---');
        const pushRes = await fetch(`${API_URL}/sync/push`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                type: 'CREATE',
                entity: 'Task',
                deviceId: 'test-device',
                data: {
                    id: '00000000-0000-4000-a000-000000000001',
                    title: 'Test Task',
                    status: 'TODO'
                }
            })
        });
        console.log('Push Status:', pushRes.status);
        const pushData = await pushRes.json();
        console.log('Push Response:', JSON.stringify(pushData, null, 2));

    } catch (error) {
        console.error('Error:', error);
    }
}

testSync();
````

## File: backend/test.k6.ts
````typescript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    iterations:10,
}

export default function () {
    http.get('https://quickpizza.grafana.com');
    sleep(1);
}
````

## File: backend/tsconfig.json
````json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "Node16",
    "moduleResolution": "Node16",
    "rootDir": "./src",
    "outDir": "./dist",
    "types": ["node", "jest"],
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "prisma.config.ts.old",
    "documentation",
  ]
}
````

## File: frontend/.npmrc
````
legacy-peer-deps=true
````

## File: frontend/AUTHENTIFICATION_DIAGRAMMES.md
````markdown
# Authentification - Texte Ajuste Et Diagrammes

Le flux est le suivant : l’etudiant saisit son email et son mot de passe dans l’interface, puis l’application envoie la requete de connexion au service d’authentification. Si la connexion reussit, le service renvoie l’utilisateur et les jetons, la session est enregistree cote client, puis l’utilisateur est redirige vers le Dashboard. Si la connexion echoue, le service renvoie une erreur (401/400) et l’interface affiche un message d’erreur.

## Figure 4 - Diagramme De Sequence (Mermaid)

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "background": "#f3f3f3",
    "primaryColor": "#e8e4f8",
    "primaryBorderColor": "#c9bdf2",
    "primaryTextColor": "#2f2f2f",
    "secondaryColor": "#f5f2ff",
    "secondaryBorderColor": "#d8cdf7",
    "lineColor": "#8f84c8",
    "tertiaryColor": "#f8f8f8"
  }
}}%%
sequenceDiagram
    autonumber
    actor E as Etudiant
    participant UI as Interface (PWA)
    participant API as Service Auth API
    participant S as Session (client)

    E->>UI: Saisir email + mot de passe
    UI->>API: POST /auth/login

    alt Succes
        API-->>UI: user + accessToken + refreshToken
        UI->>S: Enregistrer session
        UI-->>E: Redirection vers Dashboard
    else Echec
        API-->>UI: 401/400 + message generique
        UI-->>E: Afficher message d'erreur
    end
```

## Diagramme D’activites (Mermaid)

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "background": "#f3f3f3",
    "primaryColor": "#e8e4f8",
    "primaryBorderColor": "#c9bdf2",
    "primaryTextColor": "#2f2f2f",
    "secondaryColor": "#f5f2ff",
    "secondaryBorderColor": "#d8cdf7",
    "lineColor": "#8f84c8",
    "tertiaryColor": "#f8f8f8"
  }
}}%%
flowchart TD
    A([Debut]) --> B[Saisie des identifiants]
    B --> C[POST /auth/login]
    C --> D{Authentification valide\net role STUDENT ?}
    D -- Oui --> E[Retour user + tokens]
    E --> F[Stockage session client]
    F --> G[Redirection Dashboard]
    D -- Non --> H[Retour 401/400]
    H --> I[Afficher message d'erreur generique]
    G --> J([Fin])
    I --> J
```
````

## File: frontend/eslint.config.js
````javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
````

## File: frontend/GUIDE_APPROPRIATION_APP.md
````markdown
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
````

## File: frontend/index.html
````html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>StudyFlow</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
````

## File: frontend/package.json
````json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@tailwindcss/vite": "^4.2.2",
    "@tanstack/react-query": "^5.90.21",
    "@tanstack/react-query-devtools": "^5.91.3",
    "axios": "^1.13.6",
    "daisyui": "^5.5.19",
    "date-fns": "^4.1.0",
    "lucide-react": "^1.7.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.13.1",
    "zod": "^4.3.6",
    "zustand": "^5.0.12"
  },
  "devDependencies": {
    "@eslint/js": "^9.25.0",
    "@types/node": "^25.5.0",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "@vitejs/plugin-react": "^4.4.1",
    "eslint": "^9.25.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^16.0.0",
    "typescript": "~5.8.3",
    "typescript-eslint": "^8.30.1",
    "vite": "^6.3.5",
    "vite-plugin-pwa": "^0.19.8"
  }
}
````

## File: frontend/public/vite.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"></stop><stop offset="8.333%" stop-color="#FFDD35"></stop><stop offset="100%" stop-color="#FFA800"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>
````

## File: frontend/README.md
````markdown
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
````

## File: frontend/REFERENCE.md
````markdown
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
````

## File: frontend/src/api/auth.api.ts
````typescript
import { apiClient, unwrapApiData } from './client';
import type {User, Tokens} from '../stores/authStore';

interface RegisterPayload {
  email: string;
  name: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface AuthResponse {
  user: User;
  tokens: Tokens;
}

export const authAPI = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/auth/register', payload);
    return unwrapApiData<AuthResponse>(data);
  },
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/auth/login', payload);
    return unwrapApiData<AuthResponse>(data);
  },
  resetPassword: async (payload: ResetPasswordPayload): Promise<{ message: string }> => {
    const { data } = await apiClient.post('/auth/reset-password', payload);
    return unwrapApiData<{ message: string }>(data);
  },
  logout: async (refreshToken: string): Promise<{ message: string }> => {
    const { data } = await apiClient.post('/auth/logout', { refreshToken });
    return unwrapApiData<{ message: string }>(data);
  },
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const { data } = await apiClient.post('/auth/forgot-password', { email });
    return unwrapApiData<{ message: string }>(data);
  }
};
````

## File: frontend/src/api/client.ts
````typescript
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { useSyncStore } from '../stores/syncStore';

const BASE_URL = import.meta.env.VITE_API_URL;

export const unwrapApiData = <T>(payload: any): T => {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return payload.data as T;
  }
  return payload as T;
};

const normalizeErrorPayload = (payload: any) => {
  if (payload?.error?.message) return payload;

  const fallbackMessage =
    payload?.message ||
    payload?.error ||
    'Une erreur est survenue.';

  return {
    success: false,
    error: {
      message: String(fallbackMessage),
      code: payload?.error?.code
    }
  };
};

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const refreshClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

apiClient.interceptors.request.use((config) => {
  const tokens = useAuthStore.getState().tokens;
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // ─── OFFLINE INTERCEPTOR ───
    if (!error.response && (error.message === 'Network Error' || error.code === 'ERR_NETWORK') || !navigator.onLine) {
      const config = error.config as any;

      // Si c'est une requête de synchronisation (background), on rejette l'erreur directement
      // pour éviter de l'ajouter à nouveau dans la file.
      if (config?._isSync) {
        return Promise.reject(error);
      }

      if (config && config.method && ['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
        
        // On push la mutation en file d'attente
        useSyncStore.getState().enqueueAction({
          method: config.method.toUpperCase(),
          url: config.url || '',
          payload: config.data ? JSON.parse(config.data as string) : undefined
        });

        // Fausse réponse de succès pour éviter que l'UI plante et permettre l'Optmistic UI
        return Promise.resolve({ data: { success: true, offline: true, _temporaryId: crypto.randomUUID() } });
      }
    }

    // ─── RETRY 401 INTERCEPTOR ───
    const originalRequest = error.config || {};

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const currentTokens = useAuthStore.getState().tokens;
        if (!currentTokens?.refreshToken) throw new Error('Pas de refresh token');

        const { data } = await refreshClient.post('/auth/refresh-token', { refreshToken: currentTokens.refreshToken });
        const newTokens = unwrapApiData<{ accessToken: string; refreshToken: string }>(data);

        useAuthStore.getState().setTokens(newTokens);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        return apiClient(originalRequest);
      } catch {
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    if (error.response) {
      error.response.data = normalizeErrorPayload(error.response.data);
    }

    return Promise.reject(error);
  }
);
````

## File: frontend/src/api/course.api.ts
````typescript
import { apiClient, unwrapApiData } from './client';
import type { Course } from '../types';

export interface CourseWorkType {
    id: string;
    courseId: string;
    type: string;
    weightPercent: number;
}

export const coursesAPI = {

    getAll: async (): Promise<Course[]> => {
        const { data } = await apiClient.get('/courses');
        return unwrapApiData(data);
    },

    getOne: async (id: string): Promise<Course> => {
        const { data } = await apiClient.get(`/courses/${id}`);
        return unwrapApiData(data);
    },

    create: async (payload: Partial<Course>): Promise<Course> => {
        const { data } = await apiClient.post('/courses', payload);
        return unwrapApiData(data);
    },

    update: async (id: string, payload: Partial<Course>): Promise<Course> => {
        const { data } = await apiClient.patch(`/courses/${id}`, payload);
        return unwrapApiData(data);
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/courses/${id}`);
    },

    getWorkTypes: async (id: string): Promise<CourseWorkType[]> => {
        const { data } = await apiClient.get(`/courses/${id}/work-types`);
        return unwrapApiData(data);
    },

};
````

## File: frontend/src/api/events.api.ts
````typescript
import { apiClient, unwrapApiData } from './client';
import type { Event } from '../types';

export const eventsApi = {

    getAll: async (): Promise<Event[]> => {
        const { data } = await apiClient.get('/events');
        return unwrapApiData(data);
    },

    create: async (payload: Partial<Event>): Promise<Event> => {
        const { data } = await apiClient.post('/events', payload);
        return unwrapApiData(data);
    },

    update: async (id: string, payload: Partial<Event>): Promise<Event> => {
        const { data } = await apiClient.patch(`/events/${id}`, payload);
        return unwrapApiData(data);
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/events/${id}`);
    },

};
````

## File: frontend/src/api/grade.api.ts
````typescript
import { apiClient, unwrapApiData } from './client';
import type { Grade } from '../types';

export const gradesApi = {

    getAll: async (courseId?: string): Promise<Grade[]> => {
        const { data } = await apiClient.get('/grades', {
            params: courseId ? { courseId } : {},
        });
        return unwrapApiData(data);
    },

    create: async (payload: Partial<Grade>): Promise<Grade> => {
        const { data } = await apiClient.post('/grades', payload);
        return unwrapApiData(data);
    },

    update: async (id: string, payload: Partial<Grade>): Promise<Grade> => {
        const { data } = await apiClient.patch(`/grades/${id}`, payload);
        return unwrapApiData(data);
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/grades/${id}`);
    },

    getCourseAverage: async (courseId: string): Promise<{ average: number }> => {
        const { data } = await apiClient.get(`/grades/course/${courseId}/average`);
        return unwrapApiData(data);
    },

};
````

## File: frontend/src/api/risk.api.ts
````typescript
import { apiClient, unwrapApiData } from './client';
import type { RiskAnalysis } from '../types';

export const riskApi = {

    getCourseRisk: async (courseId: string): Promise<RiskAnalysis> => {
        const { data } = await apiClient.get(`/risk/course/${courseId}`);
        return unwrapApiData(data);
    },

};
````

## File: frontend/src/api/tasks.api.ts
````typescript
import { apiClient, unwrapApiData } from './client';
import type { Task } from '../types';

export const tasksApi = {

    getAll: async (): Promise<Task[]> => {
        const { data } = await apiClient.get('/tasks');
        return unwrapApiData(data);
    },

    getBoard: async (): Promise<Task[]> => {
        const { data } = await apiClient.get('/tasks/board');
        return unwrapApiData(data);
    },

    create: async (payload: Partial<Task>): Promise<Task> => {
        const { data } = await apiClient.post('/tasks', payload);
        return unwrapApiData(data);
    },

    update: async (id: string, payload: Partial<Task>): Promise<Task> => {
        const { data } = await apiClient.patch(`/tasks/${id}`, payload);
        return unwrapApiData(data);
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/tasks/${id}`);
    },

};
````

## File: frontend/src/api/works.api.ts
````typescript
import { apiClient, unwrapApiData } from './client';
import type { Work } from '../types';

export const worksAPI = {
    getAll: async (): Promise<Work[]> => {
        const { data } = await apiClient.get('/works');
        return unwrapApiData(data);
    },
    getOne: async (id: string): Promise<Work> => {
        const { data } = await apiClient.get(`/works/${id}`);
        return unwrapApiData(data);
    },
    create: async (payload: Partial<Work>): Promise<Work> => {
        const { data } = await apiClient.post('/works', payload);
        return unwrapApiData(data);
    },
    update: async (id: string, payload: Partial<Work>): Promise<Work> => {
        const { data } = await apiClient.patch(`/works/${id}`, payload);
        return unwrapApiData(data);
    },
    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/works/${id}`);
    },
};
````

## File: frontend/src/App.css
````css
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}
````

## File: frontend/src/assets/Fichier1.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 436.42 634.34"><defs><style>.cls-1{fill:#fff;}</style></defs><g id="Calque_2" data-name="Calque 2"><g id="Calque_1-2" data-name="Calque 1"><path class="cls-1" d="M150.23,474.28c-25.63,54.75-25.65,105.24-3.44,121,23.46,16.64,68.23-8,94.93-22.7a255.89,255.89,0,0,0,76.36-64.66c47.49-54.92,62.42-106.8,44.71-126.58-3-3.38-14.27-13.93-48.15-8.11A490.37,490.37,0,0,1,175,422.61a484.33,484.33,0,0,1-75.66,8.25c-11.16.34-60.88-9.39-84.62-49.53C2.34,360.4.93,337.18.27,326.3A147.43,147.43,0,0,1,3,287.78,350.42,350.42,0,0,1,137.85,93.1,336,336,0,0,1,310.51,3.68c5.39-1.63,35.41-10.17,59.16,6.19,27.71,19.09,37,65.29,13.76,106.62A383.57,383.57,0,0,1,347,179.09a383.13,383.13,0,0,1-50.22,57.1,348.16,348.16,0,0,0,37.84-64.67,348.86,348.86,0,0,0,26.82-92.17c1.45-18.9-3.38-27-8.25-31-25.85-20.75-105.91,35-147.21,70.85a438.18,438.18,0,0,0-54.34,56.41A309.77,309.77,0,0,0,80.75,308.42c-.64,7.46-.76,22.49,8.94,33,8.4,9.11,22,12.46,44.8,10.53,56.95-4.83,127.77-38.88,154.7-52.5,6.84-2.58,52.23-18.86,94.24,5.51,41.48,24.06,62.5,77.8,48.84,131.39a300.58,300.58,0,0,1-78.42,121.07c-57,53.33-119.45,69.58-146.52,75-26.89,5.35-47.42-1.38-62.6-8.95-16-8-21.86-16.81-23.39-19.26-6.23-9.94-8.15-22.06-5.44-41.94C120.79,526.34,136.67,495.4,150.23,474.28Z"/></g></g></svg>
````

## File: frontend/src/assets/react.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
````

## File: frontend/src/assets/vite.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" width="77" height="47" fill="none" aria-labelledby="vite-logo-title" viewBox="0 0 77 47"><title id="vite-logo-title">Vite</title><style>.parenthesis{fill:#000}@media (prefers-color-scheme:dark){.parenthesis{fill:#fff}}</style><path fill="#9135ff" d="M40.151 45.71c-.663.844-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.493c-.92 0-1.457-1.04-.92-1.788l7.479-10.471c1.07-1.498 0-3.578-1.842-3.578H15.443c-.92 0-1.456-1.04-.92-1.788l9.696-13.576c.213-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.472c-1.07 1.497 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.087.89 1.83L40.153 45.712z"/><mask id="a" width="48" height="47" x="14" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M40.047 45.71c-.663.843-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.389c-.92 0-1.457-1.04-.92-1.788l7.479-10.472c1.07-1.497 0-3.578-1.842-3.578H15.34c-.92 0-1.456-1.04-.92-1.788l9.696-13.575c.213-.297.556-.474.92-.474H53.93c.92 0 1.456 1.04.92 1.788L47.37 13.03c-1.07 1.498 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.088.89 1.831L40.049 45.712z"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#eee6ff" rx="5.508" ry="14.704" transform="rotate(269.814 20.96 11.29)scale(-1 1)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#eee6ff" rx="10.399" ry="29.851" transform="rotate(89.814 -16.902 -8.275)scale(1 -1)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#8900ff" rx="5.508" ry="30.487" transform="rotate(89.814 -19.197 -7.127)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.928 4.177)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.738 5.52)scale(1 -1)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#eee6ff" rx="14.072" ry="22.078" transform="rotate(93.35 31.245 55.578)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx="14.592" cy="9.743" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(39.51 14.592 9.743)"/></g><g filter="url(#k)"><ellipse cx="61.728" cy="-5.321" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 61.728 -5.32)"/></g><g filter="url(#l)"><ellipse cx="55.618" cy="7.104" fill="#00c2ff" rx="5.971" ry="9.665" transform="rotate(37.892 55.618 7.104)"/></g><g filter="url(#m)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#n)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#o)"><ellipse cx="49.857" cy="30.678" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 49.857 30.678)"/></g><g filter="url(#p)"><ellipse cx="52.623" cy="33.171" fill="#00c2ff" rx="5.971" ry="15.297" transform="rotate(37.892 52.623 33.17)"/></g></g><path d="M6.919 0c-9.198 13.166-9.252 33.575 0 46.789h6.215c-9.25-13.214-9.196-33.623 0-46.789zm62.424 0h-6.215c9.198 13.166 9.252 33.575 0 46.789h6.215c9.25-13.214 9.196-33.623 0-46.789" class="parenthesis"/><defs><filter id="b" width="60.045" height="41.654" x="-5.564" y="16.92" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-40.407" y="-6.762" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-35.435" y="2.801" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-30.84" y="20.8" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-29.307" y="21.949" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="29.961" y="-17.13" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-13.43" y="-22.082" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="34.321" y="-37.644" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="38.847" y="-10.552" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="22.45" y="-1.645" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="32.919" y="11.36" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter></defs></svg>
````

## File: frontend/src/components/Courses/CourseFormModal.tsx
````typescript
import React, { useState } from 'react';
import { addDays, startOfWeek } from 'date-fns';
import { useCreateCourse, useUpdateCourse, useDeleteCourse } from '../../hooks/useCourses';
import { useCreateEvent } from '../../hooks/useEvents';
import type { Course, EventType } from '../../types';

// ─── Constants ──────────────────────────────────────────────
const COLORS = [
    '#3B82F6', '#F59E0B', '#10B981',
    '#8B5CF6', '#EF4444', '#EC4899', '#14B8A6',
];

const WEEK_DAYS = [
    { label: 'Lun', value: 1 },
    { label: 'Mar', value: 2 },
    { label: 'Mer', value: 3 },
    { label: 'Jeu', value: 4 },
    { label: 'Ven', value: 5 },
];

const SLOT_TYPES = ['CM', 'TD', 'TP'];

// ─── Interfaces ─────────────────────────────────────────────
interface Slot {
    id: string;
    type: string;
    days: number[]; // 1=Lun, 2=Mar, etc.
    startTime: string;
    endTime: string;
}

interface CourseFormModalProps {
    course?: Course | null;
    onClose: () => void;
}

export default function CourseFormModal({ course, onClose }: CourseFormModalProps) {
    const isEditMode = !!course;
    const { mutateAsync: createCourse, isPending: isCreatingCourse } = useCreateCourse();
    const { mutateAsync: updateCourse, isPending: isUpdatingCourse } = useUpdateCourse();
    const { mutate: deleteCourse } = useDeleteCourse();
    const { mutateAsync: createEvent } = useCreateEvent();

    const [form, setForm] = useState({
        name: course?.name || '',
        code: course?.code || '',
        credits: course?.credits || 3,
        color: course?.color || COLORS[0],
    });

    const [addToSchedule, setAddToSchedule] = useState(false);
    const [slots, setSlots] = useState<Slot[]>([
        { id: Math.random().toString(), type: 'CM', days: [1], startTime: '08:00', endTime: '10:00' }
    ]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSlot = () => {
        setSlots(prev => [
            ...prev,
            { id: Math.random().toString(), type: 'TD', days: [], startTime: '14:00', endTime: '16:00' }
        ]);
    };

    const handleUpdateSlot = (id: string, updates: Partial<Slot>) => {
        setSlots(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    const handleToggleDay = (slotId: string, dayValue: number) => {
        setSlots(prev => prev.map(s => {
            if (s.id !== slotId) return s;
            const hasDay = s.days.includes(dayValue);
            return {
                ...s,
                days: hasDay ? s.days.filter(d => d !== dayValue) : [...s.days, dayValue]
            };
        }));
    };

    const handleDeleteSlot = (id: string) => {
        setSlots(prev => prev.filter(s => s.id !== id));
    };

    const getPreviewEvents = () => {
        const previews: { day: number; str: string; type: string }[] = [];
        slots.forEach(slot => {
            slot.days.forEach(day => {
                const dayLabel = WEEK_DAYS.find(d => d.value === day)?.label;
                const formatTime = (t: string) => t.replace(':', 'h').replace('h00', 'h');
                previews.push({
                    day,
                    type: slot.type,
                    str: `${dayLabel} ${formatTime(slot.startTime)}–${formatTime(slot.endTime)} (${slot.type})`
                });
            });
        });
        previews.sort((a, b) => a.day - b.day);
        return previews;
    };

    const previewItems = getPreviewEvents();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            let courseId = course?.id;

            if (isEditMode && courseId) {
                await updateCourse({ id: courseId, payload: { ...form, credits: Number(form.credits) } });
            } else {
                const newCourse = await createCourse({ ...form, credits: Number(form.credits) });
                courseId = newCourse.id;

                if (addToSchedule && slots.length > 0) {
                    const WEEKS_TO_GENERATE = 15;
                    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
                    const eventPromises: Promise<any>[] = [];

                    for (let week = 0; week < WEEKS_TO_GENERATE; week++) {
                        for (const slot of slots) {
                            for (const dayValue of slot.days) {
                                const targetDate = addDays(startDate, (week * 7) + (dayValue - 1));
                                const [startH, startM] = slot.startTime.split(':');
                                const [endH, endM] = slot.endTime.split(':');

                                const start = new Date(targetDate);
                                start.setHours(Number(startH), Number(startM), 0, 0);

                                const end = new Date(targetDate);
                                end.setHours(Number(endH), Number(endM), 0, 0);

                                let eventType: EventType = 'CLASS';
                                if (slot.type === 'TP') eventType = 'TP';

                                eventPromises.push(
                                    createEvent({
                                        courseId,
                                        title: `${form.name} - ${slot.type}`,
                                        type: eventType,
                                        startDate: start.toISOString(),
                                        endDate: end.toISOString(),
                                        isAllDay: false
                                    })
                                );
                            }
                        }
                    }
                    await Promise.allSettled(eventPromises);
                }
            }
            onClose();
        } catch (error) {
            console.error("Erreur lors de la soumission du cours:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex justify-center items-center p-4 sm:p-6 bg-black/30 backdrop-blur-[2px]">
            <div className="bg-white w-full max-w-[560px] max-h-[95vh] overflow-y-auto rounded-[24px] p-8 shadow-2xl relative scrollbar-hide">
                
                <h2 className="text-[22px] font-bold text-[#1A1A1A] mb-8">
                    {isEditMode ? 'Modifier le cours' : 'Nouveau cours'}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* TOP SECTION: Name and Code */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                                Nom du cours
                            </label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Algorithmique"
                                required
                                className="w-full h-[46px] px-4 rounded-xl border border-[#E5E5E5] text-[15px] font-medium text-[#1A1A1A] outline-none focus:border-[#A3A3A3] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                                Code
                            </label>
                            <input
                                name="code"
                                value={form.code}
                                onChange={handleChange}
                                placeholder="ALGO201"
                                required
                                className="w-full h-[46px] px-4 rounded-xl border border-[#E5E5E5] text-[15px] font-medium text-[#1A1A1A] outline-none focus:border-[#A3A3A3] transition-colors"
                            />
                        </div>
                    </div>

                    {/* MID SECTION: Credits and Color */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                                Crédits
                            </label>
                            <input
                                name="credits"
                                type="number"
                                min={1}
                                max={10}
                                value={form.credits}
                                onChange={handleChange}
                                className="w-full h-[46px] px-4 rounded-xl border border-[#E5E5E5] text-[15px] font-medium text-[#1A1A1A] outline-none focus:border-[#A3A3A3] transition-colors"
                            />
                        </div>
                        <div className="md:col-span-2 gap-4">
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                                Couleur
                            </label>
                            <div className="flex items-center h-[46px] gap-3">
                                {COLORS.map((c) => (
                                    <button
                                        key={c}
                                        type="button"
                                        onClick={() => setForm(prev => ({ ...prev, color: c }))}
                                        className="w-[20px] h-[20px] rounded-full transition-all relative flex items-center justify-center shrink-0"
                                        style={{ background: c }}
                                    >
                                        {/* Outer black border if selected */}
                                        {form.color === c && (
                                            <div className="absolute -inset-[3px] rounded-full border border-[#1A1A1A]" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {!isEditMode && (
                        <>
                            <div className="w-full h-px bg-[#E5E5E5] my-2" />

                            {/* SCHEDULE TOGGLE */}
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-[15px] font-bold text-[#1A1A1A] mb-0.5">Ajouter à l'emploi du temps</div>
                                    <div className="text-[13px] text-[#737373]">Crée les événements récurrents dans l'agenda</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        value="" 
                                        className="sr-only peer" 
                                        checked={addToSchedule}
                                        onChange={(e) => setAddToSchedule(e.target.checked)}
                                    />
                                    <div className="w-[42px] h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                                </label>
                            </div>

                            {/* SLOTS LIST */}
                            {addToSchedule && (
                                <div className="flex flex-col gap-4">
                                    
                                    {slots.map((slot) => (
                                        <div key={slot.id} className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[16px] p-5 relative flex items-center gap-6">
                                            
                                            {/* Type */}
                                            <div className="w-6 shrink-0 text-center">
                                                <select 
                                                    value={slot.type}
                                                    onChange={(e) => handleUpdateSlot(slot.id, { type: e.target.value })}
                                                    className="appearance-none bg-transparent text-[13px] font-bold text-[#737373] outline-none cursor-pointer w-full text-center"
                                                >
                                                    {SLOT_TYPES.map(st => <option key={st}>{st}</option>)}
                                                </select>
                                            </div>

                                            {/* Days (Grid) */}
                                            <div className="grid grid-cols-2 gap-2 w-[110px]">
                                                {WEEK_DAYS.map(day => {
                                                    const isActive = slot.days.includes(day.value);
                                                    return (
                                                        <button
                                                            key={day.value}
                                                            type="button"
                                                            onClick={() => handleToggleDay(slot.id, day.value)}
                                                            className={`h-8 text-[13px] font-medium rounded-lg border transition-colors flex items-center justify-center
                                                                ${isActive 
                                                                    ? 'bg-white text-[#1A1A1A] border-[#A3A3A3] shadow-sm' 
                                                                    : 'bg-transparent text-[#1A1A1A] border-[#E5E5E5] hover:border-[#A3A3A3]'}
                                                            `}
                                                        >
                                                            {day.label}
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            {/* Flex spacing */}
                                            <div className="flex-1" />

                                            {/* Time block */}
                                            <div className="flex items-center gap-2">
                                                <div className="relative flex items-center bg-white border border-[#E5E5E5] rounded-lg h-9 w-[80px] px-3">
                                                    <input 
                                                        type="time" 
                                                        value={slot.startTime} 
                                                        onChange={(e) => handleUpdateSlot(slot.id, { startTime: e.target.value })}
                                                        className="w-full text-[14px] font-medium text-[#1A1A1A] bg-transparent outline-none z-10"
                                                    />
                                                    <svg className="absolute right-2 w-4 h-4 text-[#1A1A1A] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 7v5l3 2" />
                                                    </svg>
                                                </div>
                                                <span className="text-[#A3A3A3] text-sm">→</span>
                                                <div className="relative flex items-center bg-white border border-[#E5E5E5] rounded-lg h-9 w-[80px] px-3">
                                                    <input 
                                                        type="time" 
                                                        value={slot.endTime} 
                                                        onChange={(e) => handleUpdateSlot(slot.id, { endTime: e.target.value })}
                                                        className="w-full text-[14px] font-medium text-[#1A1A1A] bg-transparent outline-none z-10"
                                                    />
                                                    <svg className="absolute right-2 w-4 h-4 text-[#1A1A1A] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 7v5l3 2" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Delete Slot Btn */}
                                            <button 
                                                type="button" 
                                                onClick={() => handleDeleteSlot(slot.id)}
                                                className="absolute right-3.5 text-[#A3A3A3] hover:text-[#E74C3C] text-lg w-5 h-5 flex items-center justify-center transition-colors pb-0.5"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={handleAddSlot}
                                        className="w-full py-3.5 rounded-xl border border-[#E5E5E5] text-[15px] font-medium text-[#1A1A1A] hover:bg-gray-50 transition-colors"
                                    >
                                        + Ajouter un créneau
                                    </button>

                                    {/* Aperçu */}
                                    {previewItems.length > 0 && (
                                        <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[16px] p-4 mt-2">
                                            <div className="text-[12px] text-[#737373] font-medium mb-3">Aperçu — événements générés</div>
                                            <div className="flex flex-wrap gap-2.5 mb-2">
                                                {previewItems.map((item, idx) => (
                                                    <div key={idx} className="bg-[#EFF6FF] text-[#3B82F6] px-2.5 py-1 rounded-[6px] text-[13px] font-bold border border-[#DBEAFE]">
                                                        {item.str}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="text-[12px] text-[#737373]">· chaque semaine</div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    <div className="w-full h-px bg-[#E5E5E5] mt-4" />

                    {/* ACTIONS */}
                    <div className="flex justify-between items-center mt-2">
                        {isEditMode ? (
                            <button 
                                type="button" 
                                onClick={() => {
                                    if (confirm(`Supprimer le cours "${course?.name}" ? Toutes les données associées seront perdues.`)) {
                                        deleteCourse(course!.id);
                                        onClose();
                                    }
                                }}
                                className="text-[13px] font-bold text-[#EF4444] hover:opacity-70 px-2"
                            >
                                Supprimer
                            </button>
                        ) : (
                            <button 
                                type="button" 
                                onClick={onClose}
                                className="w-[42px] h-[42px] flex items-center justify-center rounded-full border border-[#E5E5E5] text-[#737373] hover:bg-gray-50 transition-colors font-bold text-lg"
                            >
                                ↓
                            </button>
                        )}
                        <div className="flex gap-3">
                            <button 
                                type="button" 
                                onClick={onClose} 
                                className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] text-[15px] font-medium text-[#1A1A1A] hover:bg-gray-50 bg-white shadow-sm transition-colors"
                            >
                                Annuler
                            </button>
                            <button 
                                type="submit" 
                                disabled={isSubmitting || isCreatingCourse || isUpdatingCourse} 
                                className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] text-[15px] font-medium text-[#1A1A1A] hover:bg-gray-50 bg-white shadow-sm transition-colors flex items-center justify-center min-w-[140px]"
                            >
                                {isSubmitting || isCreatingCourse || isUpdatingCourse
                                    ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    : isEditMode ? 'Enregistrer' : 'Créer le cours'
                                }
                            </button>
                        </div>
                    </div>

                </form>
            </div>
            
            {/* Global style to hide native time picker icons */}
            <style>{`
                input[type="time"]::-webkit-calendar-picker-indicator {
                    opacity: 0;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}
````

## File: frontend/src/hooks/useAuth.ts
````typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth.api';
import { useAuthStore } from '../stores/authStore.ts';
import { useSyncStore } from '../stores/syncStore.ts';

export const useAuth = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { login, logout, user, isAuthenticated } = useAuthStore();

    // ─── Login ────────────────────────────────────────────────
    // ... (skipped for brevity but assuming it stays same)

    // ─── Logout ───────────────────────────────────────────────
    const logoutMutation = useMutation({
        mutationFn: () => {
            const tokens = useAuthStore.getState().tokens;
            return authAPI.logout(tokens?.refreshToken ?? '');
        },
        onSettled: () => {
            // 1. Vider le store d'authentification
            logout();

            // 2. Vider le store de synchronisation (cache local offline)
            const syncStore = useSyncStore.getState();
            syncStore.clearCache();
            syncStore.clearQueue();

            // 3. Vider le cache de React Query
            queryClient.clear();

            // 4. Redirection vers login
            navigate('/login');
        }
    });
    const loginMutation = useMutation({
        mutationFn: authAPI.login,
        onSuccess: (data) => {
            login(data.user, data.tokens);
            // Petit délai pour laisser Zustand persister avant la navigation
            setTimeout(() => navigate('/dashboard'), 50);
        },
        onError : ()=>{
            logout ()
            navigate ('/login')
        }
    });

    const registerMutation = useMutation({
        mutationFn: authAPI.register,
        onSuccess: (data) => {
            login(data.user, data.tokens);
            setTimeout(() => navigate('/dashboard'), 50);
        },
    });

    // ─── Forgot password ──────────────────────────────────────
    const forgotPasswordMutation = useMutation({
        mutationFn: authAPI.forgotPassword,
    });

    // ─── Reset password ───────────────────────────────────────
    const resetPasswordMutation = useMutation({
        mutationFn: authAPI.resetPassword,
        onSuccess: () => {
            navigate('/login');
        },
    });

    return {
        // État
        user,
        isAuthenticated,

        // Actions
        login: loginMutation.mutate,
        register: registerMutation.mutate,
        logout: logoutMutation.mutate,
        forgotPassword: forgotPasswordMutation.mutate,
        resetPassword: resetPasswordMutation.mutate,

        // États de chargement
        isLoginLoading: loginMutation.isPending,
        isRegisterLoading: registerMutation.isPending,

        // Erreurs
        loginError: loginMutation.error,
        registerError: registerMutation.error,
    };
};
````

## File: frontend/src/hooks/useCourses.ts
````typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coursesAPI } from '../api/course.api';
import { useSyncStore } from '../stores/syncStore';
import type { Course } from '../types';

export const courseKeys = {
    all: ['courses'] as const,
    one: (id: string) => ['courses', id] as const,
};

export const useCourses = () => {
    const setCacheCourses = useSyncStore((s) => s.setCacheCourses);
    const cachedCourses = useSyncStore((s) => s.cache.courses);

    return useQuery({
        queryKey: courseKeys.all,
        queryFn: async () => {
            const courses = await coursesAPI.getAll();
            // Persiste dans le browser store pour usage offline
            setCacheCourses(courses);
            return courses;
        },
        initialData: cachedCourses.length > 0 ? cachedCourses : undefined,
        staleTime: 30_000,
    });
};

export const useCourse = (id: string) => {
    return useQuery({
        queryKey: courseKeys.one(id),
        queryFn: () => coursesAPI.getOne(id),
        enabled: !!id,
    });
};

export const useCourseWorkTypes = (courseId?: string) => {
    return useQuery({
        queryKey: ['courses', courseId, 'work-types'],
        queryFn: () => coursesAPI.getWorkTypes(courseId as string),
        enabled: !!courseId,
    });
};

export const useCreateCourse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: coursesAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: courseKeys.all });
        },
    });
};

export const useUpdateCourse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<Course> }) =>
            coursesAPI.update(id, payload),
        onSuccess: (_data, { id }) => {
            queryClient.invalidateQueries({ queryKey: courseKeys.all });
            queryClient.invalidateQueries({ queryKey: courseKeys.one(id) });
        },
    });
};

export const useDeleteCourse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: coursesAPI.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: courseKeys.all });
        },
    });
};
````

## File: frontend/src/hooks/useEvents.ts
````typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventsApi } from '../api/events.api';
import { useSyncStore } from '../stores/syncStore';
import type { Event } from '../types';

export const eventKeys = {
    all: ['events'] as const,
};

export const useEvents = () => {
    const setCacheEvents = useSyncStore((s) => s.setCacheEvents);
    const cachedEvents = useSyncStore((s) => s.cache.events);

    return useQuery({
        queryKey: eventKeys.all,
        queryFn: async () => {
            const events = await eventsApi.getAll();
            // Persiste dans le browser store pour usage offline
            setCacheEvents(events);
            return events;
        },
        // initialData sert le cache local UNIQUEMENT si React Query n'a encore aucune donnée fraîche
        // (contrairement à placeholderData qui est remplacé dès que React Query a des données)
        initialData: cachedEvents.length > 0 ? cachedEvents : undefined,
        // On invalide le cache React Query régulièrement pour forcer un refetch
        staleTime: 30_000, // 30 secondes
    });
};

export const useCreateEvent = () => {
    const queryClient = useQueryClient();
    const setCacheEvents = useSyncStore((s) => s.setCacheEvents);

    return useMutation({
        mutationFn: eventsApi.create,

        // Mise à jour optimiste : ajoute l'event localement avant la réponse du serveur
        onMutate: async (newEvent) => {
            await queryClient.cancelQueries({ queryKey: eventKeys.all });
            const previous = queryClient.getQueryData<Event[]>(eventKeys.all);

            const optimisticEvent: Event = {
                id: `temp-${crypto.randomUUID()}`,
                title: newEvent.title ?? '',
                type: newEvent.type ?? 'CLASS',
                startDate: newEvent.startDate ?? new Date().toISOString(),
                endDate: newEvent.endDate ?? new Date().toISOString(),
                isAllDay: newEvent.isAllDay ?? false,
                location: newEvent.location,
                courseId: newEvent.courseId,
                description: newEvent.description,
                version: 0,
                syncStatus: 'PENDING',
            };

            queryClient.setQueryData<Event[]>(eventKeys.all, (old = []) => [...old, optimisticEvent]);

            return { previous };
        },

        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(eventKeys.all, context.previous);
            }
        },

        onSuccess: () => {
            // Refetch pour remplacer l'event temporaire par les vraies données serveur
            queryClient.invalidateQueries({ queryKey: eventKeys.all });
        },

        onSettled: (_data, _err, _vars, _ctx) => {
            // Met à jour aussi le cache store local après succès ou echec
            const fresh = queryClient.getQueryData<Event[]>(eventKeys.all);
            if (fresh) setCacheEvents(fresh);
        },
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<Event> }) =>
            eventsApi.update(id, payload),

        onMutate: async ({ id, payload }) => {
            await queryClient.cancelQueries({ queryKey: eventKeys.all });
            const previous = queryClient.getQueryData<Event[]>(eventKeys.all);

            queryClient.setQueryData<Event[]>(eventKeys.all, (old) =>
                old?.map((e) => e.id === id ? { ...e, ...payload } : e) ?? []
            );

            return { previous };
        },

        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(eventKeys.all, context.previous);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: eventKeys.all });
        },
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: eventsApi.delete,

        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: eventKeys.all });
            const previous = queryClient.getQueryData<Event[]>(eventKeys.all);

            queryClient.setQueryData<Event[]>(eventKeys.all, (old) =>
                old?.filter((e) => e.id !== id) ?? []
            );

            return { previous };
        },

        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(eventKeys.all, context.previous);
            }
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: eventKeys.all });
        },
    });
};
````

## File: frontend/src/hooks/useGrades.ts
````typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { gradesApi } from '../api/grade.api';
import { useSyncStore } from '../stores/syncStore';
import type { Grade } from '../types';

export const gradeKeys = {
    all: ['grades'] as const,
    byCourse: (courseId: string) => ['grades', 'course', courseId] as const,
    average: (courseId: string) => ['grades', 'average', courseId] as const,
};

export const useGrades = (courseId?: string) => {
    const setCacheGrades = useSyncStore((s) => s.setCacheGrades);
    const cachedGrades = useSyncStore((s) => s.cache.grades);

    return useQuery({
        queryKey: courseId ? gradeKeys.byCourse(courseId) : gradeKeys.all,
        queryFn: async () => {
            const grades = await gradesApi.getAll(courseId);
            // Persiste toutes les notes dans le cache local (uniquement pour les requêtes globales)
            if (!courseId) {
                setCacheGrades(grades);
            }
            return grades;
        },
        // Fallback sur le cache local (filtré par courseId si besoin)
        placeholderData: !courseId && cachedGrades.length > 0
            ? cachedGrades
            : courseId && cachedGrades.length > 0
                ? cachedGrades.filter((g) => g.courseId === courseId)
                : undefined,
    });
};

export const useCourseAverage = (courseId: string) => {
    return useQuery({
        queryKey: gradeKeys.average(courseId),
        queryFn: () => gradesApi.getCourseAverage(courseId),
        enabled: !!courseId,
    });
};

export const useCreateGrade = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: gradesApi.create,
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: gradeKeys.all });
            if (variables.courseId) {
                queryClient.invalidateQueries({
                    queryKey: gradeKeys.byCourse(variables.courseId),
                });
                queryClient.invalidateQueries({
                    queryKey: gradeKeys.average(variables.courseId),
                });
            }
        },
    });
};

export const useUpdateGrade = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<Grade> }) =>
            gradesApi.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: gradeKeys.all });
        },
    });
};

export const useDeleteGrade = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: gradesApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: gradeKeys.all });
        },
    });
};
````

## File: frontend/src/hooks/useNetworkSync.ts
````typescript
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
````

## File: frontend/src/hooks/usePomodoro.ts
````typescript
import { useState, useEffect, useRef } from 'react';
import { useUpdateTask } from './useTasks';
import { useSyncStore } from '../stores/syncStore';

type PomodoroPhase = 'work' | 'break';

const WORK_DURATION = 25 * 60;  // 25 minutes en secondes
const BREAK_DURATION = 5 * 60;  // 5 minutes en secondes

export const usePomodoro = (taskId: string | null) => {
    const [phase, setPhase] = useState<PomodoroPhase>('work');
    const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
    const [isRunning, setIsRunning] = useState(false);
    const [sessions, setSessions] = useState(0);
    const elapsedRef = useRef(0);
    const { mutate: updateTask } = useUpdateTask();

    // On stocke taskId et une méthode pour le commit
    const taskIdRef = useRef(taskId);
    useEffect(() => {
        // Optionnel : ne pas réinitialiser si on est en train de courir ?
        // Pour l'instant on garde la liaison
        taskIdRef.current = taskId;
    }, [taskId]);

    // Timer effect
    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) return 0;
                return prev - 1;
            });
            if (phase === 'work') {
                elapsedRef.current += 1;
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, phase]);

    // Phase end effect
    useEffect(() => {
        if (timeLeft === 0 && isRunning) {
            handlePhaseEnd();
        }
    }, [timeLeft, isRunning]); // eslint-disable-line react-hooks/exhaustive-deps

    const handlePhaseEnd = () => {
        setIsRunning(false);

        if (phase === 'work') {
            setSessions((prev) => prev + 1);

            const currentTaskId = taskIdRef.current;
            if (currentTaskId) {
                // On récupère la tâche actuelle pour ne pas écraser le temps passé
                const currentTask = useSyncStore.getState().cache.tasks.find(t => t.id === currentTaskId);
                const previousMinutes = currentTask?.timeSpentMinutes ?? 0;
                const newMinutesToAdd = Math.floor(elapsedRef.current / 60);

                if (newMinutesToAdd > 0) {
                    updateTask({
                        id: currentTaskId,
                        payload: {
                            timeSpentMinutes: previousMinutes + newMinutesToAdd,
                        },
                    });
                    // On ne réinitialise elapsed que si on a au moins 1 minute à committer
                    elapsedRef.current = 0;
                }
            }

            setPhase('break');
            setTimeLeft(BREAK_DURATION);
        } else {
            setPhase('work');
            setTimeLeft(WORK_DURATION);
        }
    };

    const start = () => setIsRunning(true);
    const pause = () => setIsRunning(false);

    const reset = () => {
        setIsRunning(false);
        setPhase('work');
        setTimeLeft(WORK_DURATION);
        elapsedRef.current = 0;
    };

    const skip = () => {
        setIsRunning(false);
        handlePhaseEnd();
    };

    const formatted = `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`;

    const progress = phase === 'work'
        ? ((WORK_DURATION - timeLeft) / WORK_DURATION) * 100
        : ((BREAK_DURATION - timeLeft) / BREAK_DURATION) * 100;

    return {
        phase,
        timeLeft,
        formatted,
        progress,
        isRunning,
        sessions,
        start,
        pause,
        reset,
        skip,
    };
};
````

## File: frontend/src/hooks/useRisks.ts
````typescript
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { riskApi } from '../api/risk.api';
import type { Grade, Course } from '../types';

export const riskKeys = {
    course: (courseId: string) => ['risk', courseId] as const,
};

export const useRisk = (courseId: string) => {
    return useQuery({
        queryKey: riskKeys.course(courseId),
        queryFn: () => riskApi.getCourseRisk(courseId),
        enabled: !!courseId,
    });
};

/**
 * Calcule localement les statistiques de risque à partir des notes disponibles,
 * sans dépendre de l'API risk (évite N appels pour N cours).
 *
 * Logique : un cours est "à risque" si sa moyenne est < 10/20.
 */
export const useDashboardStats = (grades: Grade[], courses: Course[]) => {
    return useMemo(() => {
        // ── Moyenne générale ──────────────────────────────────────────
        const validGrades = grades.filter(
            (g) => g.score !== undefined && g.maxScore !== undefined && g.maxScore > 0
        );

        const overallAverage =
            validGrades.length > 0
                ? validGrades.reduce(
                      (acc, g) => acc + (g.score / g.maxScore) * 20,
                      0
                  ) / validGrades.length
                : null; // null = pas encore de notes, ne pas afficher de valeur fictive

        // ── Cours à risque ────────────────────────────────────────────
        // Regroupement des notes par cours
        const notesByCourse: Record<string, Grade[]> = {};
        for (const g of validGrades) {
            if (g.courseId) {
                if (!notesByCourse[g.courseId]) notesByCourse[g.courseId] = [];
                notesByCourse[g.courseId].push(g);
            }
        }

        // Un cours est à risque si sa moyenne pondérée est < 10/20
        const riskCourseIds = courses
            .filter((course) => {
                const courseGrades = notesByCourse[course.id];
                if (!courseGrades || courseGrades.length === 0) return false;

                const avg =
                    courseGrades.reduce(
                        (acc, g) => acc + (g.score / g.maxScore) * 20,
                        0
                    ) / courseGrades.length;

                return avg < 10;
            })
            .map((c) => c.id);

        return {
            overallAverage,
            riskCoursesCount: riskCourseIds.length,
            riskCourseIds,
        };
    }, [grades, courses]);
};
````

## File: frontend/src/hooks/useTasks.ts
````typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksApi } from '../api/tasks.api';
import { useSyncStore } from '../stores/syncStore';
import type { Task } from '../types';

// Clés de cache — un seul endroit pour les nommer
export const taskKeys = {
    all: ['tasks'] as const,
    board: ['tasks', 'board'] as const,
};

export const useTasks = () => {
    const setCacheTasks = useSyncStore((s) => s.setCacheTasks);
    const cachedTasks = useSyncStore((s) => s.cache.tasks);

    return useQuery({
        queryKey: taskKeys.all,
        queryFn: async () => {
            const tasks = await tasksApi.getAll();
            // Persiste dans le browser store pour usage offline
            setCacheTasks(tasks);
            return tasks;
        },
        initialData: cachedTasks.length > 0 ? cachedTasks : undefined,
        staleTime: 30_000,
    });
};

export const useBoardTasks = () => {
    return useQuery({
        queryKey: taskKeys.board,
        queryFn: tasksApi.getBoard,
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    const updateCacheTask = useSyncStore((s) => s.updateCacheTask);

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<Task> }) =>
            tasksApi.update(id, payload),

        // Mise à jour optimiste — on met à jour le cache React Query ET le cache local
        // avant que le serveur réponde pour que l'UI soit instantanée
        onMutate: async ({ id, payload }) => {
            await queryClient.cancelQueries({ queryKey: taskKeys.all });
            const previous = queryClient.getQueryData<Task[]>(taskKeys.all);

            // Optimistic update dans React Query
            queryClient.setQueryData<Task[]>(taskKeys.all, (old) =>
                old?.map((t) => t.id === id ? { ...t, ...payload } : t) ?? []
            );

            // Optimistic update dans le store local (pour offline)
            updateCacheTask(id, payload);

            return { previous };
        },

        // Si erreur — on remet les données d'avant
        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(taskKeys.all, context.previous);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: taskKeys.all });
        },
    });
};

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: tasksApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: taskKeys.all });
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: tasksApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: taskKeys.all });
        },
    });
};
````

## File: frontend/src/hooks/useTheme.ts
````typescript
import { useState, useEffect } from 'react';

type Theme = 'lofi' | 'night';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('studyflow-theme');
    if (stored === 'lofi' || stored === 'night') return stored;
    
    // Fallback to system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'night';
    }
    return 'lofi';
  });

  useEffect(() => {
    localStorage.setItem('studyflow-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'lofi' ? 'night' : 'lofi'));
  };

  return { theme, toggleTheme };
}
````

## File: frontend/src/hooks/useWorks.ts
````typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { worksAPI } from '../api/works.api';
import type { Work } from '../types';

export const useWorks = () => {
    return useQuery({
        queryKey: ['works'],
        queryFn: worksAPI.getAll,
    });
};

export const useCreateWork = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: worksAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['works'] });
        },
    });
};

export const useUpdateWork = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<Work> }) =>
            worksAPI.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['works'] });
        },
    });
};

export const useDeleteWork = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: worksAPI.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['works'] });
        },
    });
};
````

## File: frontend/src/index.css
````css
@import "tailwindcss";
@plugin "daisyui";

@theme {
  --font-sans: "Segoe UI", "Helvetica Neue", Arial, ui-sans-serif, system-ui, sans-serif;
}
````

## File: frontend/src/layouts/AppLayout.tsx
````typescript
import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    CalendarDays,
    CheckSquare,
    ClipboardList,
    AlertTriangle,
    User,
    LogOut,
    Bell,
    Menu,
    RefreshCw,
    WifiOff,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNetworkSync } from '../hooks/useNetworkSync';
import logo from '@/assets/Fichier1.svg'

const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/courses', icon: BookOpen, label: 'Cours' },
    { to: '/agenda', icon: CalendarDays, label: 'Planning' },
    { to: '/tasks', icon: CheckSquare, label: 'Tâches' },
    { to: '/works', icon: ClipboardList, label: 'Works' },
    { to: '/risk', icon: AlertTriangle, label: 'Risque' },
];

const routeTitles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/courses': 'Mes cours',
    '/agenda': 'Planning',
    '/tasks': 'Tâches',
    '/works': 'Travaux',
    '/risk': 'Analyse de risque',
    '/profile': 'Mon profil',
};

export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { logout } = useAuth();
    const location = useLocation();
    const { isOnline, isSyncing } = useNetworkSync();

    // Fermeture de la sidebar sur mobile après navigation
    useEffect(() => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    }, [location.pathname]);

    const handleLogout = () => {
        logout();
    };

    // Obtenir le titre de la route actuelle
    const currentPath = location.pathname;
    const routeTitle = routeTitles[Object.keys(routeTitles).find(k => currentPath.startsWith(k)) || '/dashboard'] || 'Dashboard';

    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const dateFormatted = new Date().toLocaleDateString('fr-FR', dateOptions);

    return (
        <div className="flex h-screen bg-[#FAF9F6] overflow-hidden font-sans text-base">
            
            {/* ── OVERLAY mobile ── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ── SIDEBAR ── */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-50 
                w-[260px] md:w-[90px] bg-white md:bg-[#FAF9F6] 
                flex flex-col items-start md:items-center py-6 shrink-0 
                transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
                shadow-2xl md:shadow-none
            `}>
                {/* Logo */}
                <div className="w-12 h-12 rounded-[14px] bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-[18px] mb-8 shadow-sm tracking-tighter ml-6 md:ml-0 shrink-0">
                    <img src={logo} alt="logo" className="w-8 h-8" />
                </div>

                {/* Bouton fermeture mobile */}
                <button 
                    className="md:hidden absolute top-7 right-6 w-10 h-10 flex items-center justify-center bg-[#FAF9F6] rounded-full text-[#1A1A1A]"
                    onClick={() => setSidebarOpen(false)}
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>

                {/* Navigation principale */}
                <nav className="flex flex-col gap-2 w-full">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                title={item.label}
                                className={() => `
                                    relative flex items-center md:justify-center w-full h-[60px] cursor-pointer group px-6 md:px-0
                                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        {/* Indicateur actif vertical */}
                                        {isActive && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-[#1A1A1A] rounded-r-md transition-all" />
                                        )}

                                        {/* Icone */}
                                        <div className={`
                                            w-[44px] h-[44px] rounded-[14px] flex items-center justify-center transition-all duration-200 shrink-0
                                            ${isActive 
                                                ? 'bg-[#FAF9F6] md:bg-white md:shadow-sm' 
                                                : 'opacity-40 group-hover:bg-[#E5E5E5] group-hover:opacity-100'
                                            }
                                        `}>
                                            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className="text-[#1A1A1A]" />
                                        </div>

                                        {/* Label Mobile */}
                                        <span className={`md:hidden ml-4 text-[15px] font-bold ${isActive ? 'text-[#1A1A1A]' : 'text-[#737373] opacity-60'}`}>
                                            {item.label}
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Navigation secondaire (Bottom) */}
                <div className="mt-auto flex flex-col md:items-center gap-2 md:gap-4 w-full px-6 md:px-0 pb-4 md:pb-0">
                    <NavLink
                        to="/profile"
                        title="Profil"
                        className={() => `
                            relative flex items-center md:justify-center w-full h-[60px] cursor-pointer group
                        `}
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <div className="absolute left-[-24px] md:left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-[#1A1A1A] rounded-r-md" />
                                )}
                                <div className={`
                                    w-[44px] h-[44px] rounded-[14px] flex items-center justify-center transition-all duration-200 shrink-0
                                    ${isActive ? 'bg-[#FAF9F6] md:bg-white md:shadow-sm' : 'opacity-40 group-hover:bg-[#E5E5E5] group-hover:opacity-100'}
                                `}>
                                    <User size={20} strokeWidth={2} className="text-[#1A1A1A]" />
                                </div>
                                <span className={`md:hidden ml-4 text-[15px] font-bold ${isActive ? 'text-[#1A1A1A]' : 'text-[#737373] opacity-60'}`}>
                                    Profil
                                </span>
                            </>
                        )}
                    </NavLink>

                    <button
                        onClick={handleLogout}
                        className="relative flex items-center md:justify-center w-full h-[60px] cursor-pointer group px-6 md:px-0"
                        title="Se déconnecter"
                    >
                        <div className="w-[44px] h-[44px] rounded-[14px] md:rounded-full flex items-center justify-center bg-[#FEF2F2] md:bg-[#1A1A1A] text-[#EF4444] md:text-white shrink-0 group-hover:bg-[#FECACA] md:group-hover:opacity-80 transition-all md:shadow-sm md:group-hover:scale-105">
                            <LogOut size={18} strokeWidth={2.5} className="ml-0.5" />
                        </div>
                        <span className="md:hidden ml-4 text-[15px] font-bold text-[#EF4444]">
                            Déconnexion
                        </span>
                    </button>
                </div>
            </aside>

            {/* ── CONTENU PRINCIPAL ── */}
            <main className="flex-1 flex flex-col h-screen md:py-4 md:pr-4 overflow-hidden w-full relative z-10">

                {/* Mobile Header (hors cadre blanc) */}
                <div className="md:hidden flex items-center justify-between p-4 bg-[#FAF9F6]">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm border border-[#E5E5E5]"
                        >
                            <Menu size={18} className="text-[#1A1A1A]" />
                        </button>
                        <div className="font-bold text-[#1A1A1A] text-[18px]">{routeTitle}</div>
                    </div>
                </div>

                {/* Grand Cadre Blanc (Application Content) */}
                <div className="flex-1 bg-white md:rounded-[24px] md:border border-[#E5E5E5] shadow-sm flex flex-col overflow-hidden relative">
                    
                    {/* Header Interne */}
                    <header className="px-6 md:px-8 py-5 border-b border-[#E5E5E5] flex justify-between items-center bg-white z-10 shrink-0">
                        {/* Titre (masqué sur mobile car déjà dans le mobile header hors cadre) */}
                        <h1 className="text-[20px] font-bold text-[#1A1A1A] tracking-tight hidden md:block">
                            {routeTitle}
                        </h1>
                        
                        <div className="flex-1 md:hidden" />

                        {/* Actions à droite */}
                        <div className="flex items-center gap-5">
                            <div className="text-[13px] font-bold text-[#737373] capitalize truncate max-w-[150px] sm:max-w-none">
                                {dateFormatted}
                            </div>

                            {/* Indicateurs de synchronisation */}
                            {!isOnline && (
                                <span className="bg-[#FEF2F2] text-[#EF4444] px-2.5 py-1 rounded-[6px] text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
                                    <WifiOff size={12} />
                                    Hors ligne
                                </span>
                            )}
                            {isOnline && isSyncing && (
                                <span className="bg-[#FEF3C7] text-[#F59E0B] px-2.5 py-1 rounded-[6px] text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
                                    <RefreshCw size={12} className="animate-spin" />
                                    Sync...
                                </span>
                            )}

                            {/* Notification Bell */}
                            <button className="relative hover:opacity-80 transition-opacity flex items-center justify-center cursor-pointer w-9 h-9">
                                <Bell size={20} className="text-[#1A1A1A]" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-[#F59E0B] rounded-full border-2 border-white shadow-sm" />
                            </button>
                        </div>
                    </header>

                    {/* Zone d'affichage des Pages */}
                    <div className="flex-1 overflow-y-auto scrollbar-thin">
                        <div className="h-full">
                            <Outlet />
                        </div>
                    </div>

                </div>

            </main>

        </div>
    );
}
````

## File: frontend/src/main.tsx
````typescript
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './router';
import './index.css';

const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-query-devtools').then((module) => ({
        default: module.ReactQueryDevtools,
      }))
    )
  : null;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {ReactQueryDevtools && (
        <Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      )}
    </QueryClientProvider>
  </StrictMode>
);
````

## File: frontend/src/pages/Agenda/AgendaPage.tsx
````typescript
import { useState } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    addMonths,
    subMonths,
    addWeeks,
    subWeeks,
    isSameMonth,
    isSameDay,
    isToday,
    parseISO,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import {
    Clock,
    MapPin,
    FileText,
    ChevronLeft,
    ChevronRight,
    Plus,
} from 'lucide-react';
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from '../../hooks/useEvents';
import { useCourses } from '../../hooks/useCourses';
import type { Event } from '../../types';

// ─── Helpers ──────────────────────────────────────────────

const eventTypeBadge: Record<string, string> = {
    CLASS: 'bg-[#EFF6FF] text-[#3B82F6]', // bleu
    EXAM: 'bg-[#FEF2F2] text-[#EF4444]',  // rouge
    EXAMEN: 'bg-[#FEF2F2] text-[#EF4444]',
    INTERRO: 'bg-[#FFF7ED] text-[#F59E0B]', // orange
    TP: 'bg-[#F0FDF4] text-[#10B981]',   // vert
    STUDY: 'bg-[#F0FDF4] text-[#10B981]',
    QUIZ: 'bg-[#FFF7ED] text-[#F59E0B]',
    ASSIGNMENT: 'bg-[#EFF6FF] text-[#3B82F6]',
    MEETING: 'bg-[#F3F4F6] text-[#1A1A1A]', // gris
    PERSONAL: 'bg-[#F3F4F6] text-[#1A1A1A]',
    AUTRE: 'bg-[#F3F4F6] text-[#1A1A1A]',
};

const eventTypeLabel: Record<string, string> = {
    CLASS: 'Cours',
    EXAM: 'Examen',
    EXAMEN: 'Examen',
    INTERRO: 'Interro',
    TP: 'TP',
    STUDY: 'Étude',
    QUIZ: 'Quiz',
    ASSIGNMENT: 'Devoir',
    MEETING: 'Réunion',
    PERSONAL: 'Personnel',
    AUTRE: 'Autre',
};

// ─── Modal détail / édition event ─────────────────────────

interface EventModalProps {
    event: Event;
    courseColor?: string;
    onClose: () => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, payload: Partial<Event>) => void;
}

const EventModal = ({
    event,
    courseColor,
    onClose,
    onDelete,
    onUpdate,
}: EventModalProps) => {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        title: event.title,
        type: event.type,
        startDate: event.startDate.slice(0, 16),
        endDate: event.endDate.slice(0, 16),
        location: event.location ?? '',
        description: event.description ?? '',
    });

    const handleSave = () => {
        onUpdate(event.id, {
            title: form.title,
            type: form.type as Event['type'],
            startDate: new Date(form.startDate).toISOString(),
            endDate: new Date(form.endDate).toISOString(),
            location: form.location || undefined,
            description: form.description || undefined,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex justify-center items-center p-4 sm:p-6 bg-black/20 backdrop-blur-[2px]">
            <div className="bg-white w-full max-w-[480px] max-h-[90vh] overflow-y-auto rounded-[24px] p-8 shadow-2xl relative scrollbar-hide">
                {/* Header */}
                <div className="flex items-start gap-3 mb-6">
                    <div
                        className="w-3.5 h-3.5 rounded-full mt-1.5 shrink-0"
                        style={{ background: courseColor ?? '#1A1A1A' }}
                    />
                    <div className="flex-1">
                        {editing ? (
                            <input
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className="w-full h-10 px-3 rounded-xl border border-[#E5E5E5] text-[15px] font-bold text-[#1A1A1A] outline-none mb-2"
                            />
                        ) : (
                            <h3 className="font-bold text-[20px] text-[#1A1A1A] mb-1 leading-tight">
                                {event.title}
                            </h3>
                        )}
                        <span className={`px-2.5 py-1 rounded-[6px] text-[11px] font-bold ${eventTypeBadge[event.type] ?? 'bg-[#F3F4F6] text-[#1A1A1A]'}`}>
                            {eventTypeLabel[event.type] ?? event.type}
                        </span>
                    </div>
                </div>

                {editing ? (
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Type</label>
                                <select
                                    value={form.type}
                                    onChange={(e) => setForm({ ...form, type: e.target.value as Event['type'] })}
                                    className="w-full h-11 px-3 rounded-xl border border-[#E5E5E5] text-[15px] font-medium text-[#1A1A1A] bg-transparent outline-none"
                                >
                                    {Object.entries(eventTypeLabel).map(([key, label]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1" />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Début</label>
                                <input
                                    type="datetime-local"
                                    value={form.startDate}
                                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                                    className="w-full h-11 px-3 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Fin</label>
                                <input
                                    type="datetime-local"
                                    value={form.endDate}
                                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                                    className="w-full h-11 px-3 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Lieu</label>
                            <input
                                value={form.location}
                                onChange={(e) => setForm({ ...form, location: e.target.value })}
                                placeholder="ex: Amphi B"
                                className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[15px] font-medium text-[#1A1A1A] outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Description</label>
                            <textarea
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                className="w-full rounded-xl border border-[#E5E5E5] text-[15px] p-3 font-medium text-[#1A1A1A] outline-none min-h-[80px]"
                                rows={2}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 text-[15px] font-medium text-[#1A1A1A] mt-2 mb-4 bg-[#FAF9F6] p-5 rounded-[16px]">
                        <div className="flex gap-3 items-start">
                            <Clock size={16} className="text-[#737373] mt-0.5 shrink-0" />
                            <div>
                                <div className="font-bold">{format(parseISO(event.startDate), 'EEEE d MMMM', { locale: fr })}</div>
                                <div className="text-[#737373]">{format(parseISO(event.startDate), 'HHhmm', { locale: fr })} – {format(parseISO(event.endDate), 'HHhmm', { locale: fr })}</div>
                            </div>
                        </div>
                        {event.location && (
                            <div className="flex gap-3 items-center">
                                <MapPin size={16} className="text-[#737373] shrink-0" />
                                <span>{event.location}</span>
                            </div>
                        )}
                        {event.description && (
                            <div className="flex gap-3 items-start">
                                <FileText size={16} className="text-[#737373] mt-0.5 shrink-0" />
                                <span className="whitespace-pre-line text-[14px] text-[#737373]">{event.description}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center mt-8 pt-4 border-t border-[#E5E5E5]">
                    <button
                        type="button"
                        onClick={() => {
                            if (confirm('Supprimer cet événement ?')) {
                                onDelete(event.id);
                                onClose();
                            }
                        }}
                        className="text-[13px] font-bold text-[#EF4444] hover:opacity-70 px-2"
                    >
                        Supprimer
                    </button>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] text-[15px] font-bold text-[#1A1A1A] hover:bg-gray-50 bg-white">
                            Fermer
                        </button>
                        {editing ? (
                            <button onClick={handleSave} className="px-5 py-2.5 rounded-xl border border-[#1A1A1A] bg-[#1A1A1A] text-white text-[15px] font-bold hover:opacity-90 transition-opacity">
                                Enregistrer
                            </button>
                        ) : (
                            <button onClick={() => setEditing(true)} className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] text-[15px] font-bold text-[#1A1A1A] hover:bg-gray-50 bg-white shadow-sm">
                                Modifier
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

// ─── Modal création event ──────────────────────────────────

interface CreateEventModalProps {
    defaultDate: Date;
    courses: { id: string; name: string; color: string }[];
    onClose: () => void;
    onCreate: (payloads: Partial<Event>[]) => void;
    isLoading: boolean;
}

const CreateEventModal = ({
    defaultDate,
    courses,
    onClose,
    onCreate,
    isLoading,
}: CreateEventModalProps) => {
    const [form, setForm] = useState({
        title: '',
        type: 'CLASS' as Event['type'],
        startDate: format(defaultDate, "yyyy-MM-dd'T'HH:mm"),
        endDate: format(new Date(defaultDate.getTime() + 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm"),
        location: '',
        courseId: '',
    });

    const [isRecurring, setIsRecurring] = useState(false);
    const [recurrenceEndDate, setRecurrenceEndDate] = useState(format(addMonths(defaultDate, 1), "yyyy-MM-dd"));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const baseStart = new Date(form.startDate);
        const baseEnd = new Date(form.endDate);
        const payloads: Partial<Event>[] = [];

        payloads.push({
            title: form.title,
            type: form.type,
            startDate: baseStart.toISOString(),
            endDate: baseEnd.toISOString(),
            location: form.location || undefined,
            courseId: form.courseId || undefined,
            isAllDay: false,
        });

        if (isRecurring && recurrenceEndDate) {
            const endRecurrence = new Date(recurrenceEndDate);
            endRecurrence.setHours(23, 59, 59, 999);
            let nextStart = addDays(baseStart, 7);
            let nextEnd = addDays(baseEnd, 7);
            
            while (nextStart <= endRecurrence) {
                payloads.push({
                    title: form.title,
                    type: form.type,
                    startDate: nextStart.toISOString(),
                    endDate: nextEnd.toISOString(),
                    location: form.location || undefined,
                    courseId: form.courseId || undefined,
                    isAllDay: false,
                });
                nextStart = addDays(nextStart, 7);
                nextEnd = addDays(nextEnd, 7);
            }
        }
        
        onCreate(payloads);
    };

    return (
        <div className="fixed inset-0 z-[100] flex justify-center items-center p-4 sm:p-6 bg-black/20 backdrop-blur-[2px]">
            <div className="bg-white w-full max-w-[480px] max-h-[90vh] overflow-y-auto rounded-[24px] p-8 shadow-2xl relative scrollbar-hide">

                <h2 className="text-[22px] font-bold text-[#1A1A1A] mb-8">Nouvel événement</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    <div>
                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Titre</label>
                        <input
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="ex: Cours de Maths"
                            required
                            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[15px] font-medium text-[#1A1A1A] outline-none"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Type</label>
                            <select
                                value={form.type}
                                onChange={(e) => setForm({ ...form, type: e.target.value as Event['type'] })}
                                className="w-full h-11 px-3 rounded-xl border border-[#E5E5E5] text-[15px] font-medium bg-transparent text-[#1A1A1A] outline-none"
                            >
                                {Object.entries(eventTypeLabel).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Cours lié</label>
                            <select
                                value={form.courseId}
                                onChange={(e) => setForm({ ...form, courseId: e.target.value })}
                                className="w-full h-11 px-3 rounded-xl border border-[#E5E5E5] text-[15px] font-medium bg-transparent text-[#1A1A1A] outline-none"
                            >
                                <option value="">Aucun</option>
                                {courses.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Début</label>
                            <input
                                type="datetime-local"
                                value={form.startDate}
                                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                                required
                                className="w-full h-11 px-3 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Fin</label>
                            <input
                                type="datetime-local"
                                value={form.endDate}
                                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                                required
                                className="w-full h-11 px-3 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Lieu (optionnel)</label>
                        <input
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                            placeholder="ex: Amphi B"
                            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[15px] font-medium text-[#1A1A1A] outline-none"
                        />
                    </div>

                    <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[16px] p-5">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={isRecurring}
                                onChange={(e) => setIsRecurring(e.target.checked)}
                                className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black accent-black"
                            />
                            <span className="text-[15px] font-bold text-[#1A1A1A]">Répéter toutes les semaines</span>
                        </label>
                        {isRecurring && (
                            <div className="mt-4 pt-4 border-t border-[#E5E5E5]">
                                <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Jusqu'au</label>
                                <input
                                    type="date"
                                    value={recurrenceEndDate}
                                    onChange={(e) => setRecurrenceEndDate(e.target.value)}
                                    required={isRecurring}
                                    className="w-[180px] h-10 px-3 rounded-xl border border-[#E5E5E5] text-[14px] font-medium outline-none"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] text-[15px] font-bold text-[#1A1A1A] hover:bg-gray-50 bg-white">
                            Annuler
                        </button>
                        <button type="submit" disabled={isLoading} className="px-5 py-2.5 rounded-xl border border-[#1A1A1A] bg-[#1A1A1A] text-white text-[15px] font-bold hover:opacity-90 flex items-center justify-center min-w-[120px]">
                            {isLoading
                                ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                : 'Créer'
                            }
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

// ─── Grille calendrier ─────────────────────────────────────

interface CalendarGridProps {
    currentMonth: Date;
    events: Event[];
    courses: { id: string; name: string; color: string }[];
    selectedDay: Date;
    onSelectDay: (day: Date) => void;
}

const CalendarGrid = ({
    currentMonth,
    events,
    courses,
    selectedDay,
    onSelectDay,
}: CalendarGridProps) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days: Date[] = [];
    let day = startDate;
    while (day <= endDate) {
        days.push(day);
        day = addDays(day, 1);
    }

    const getEventsForDay = (d: Date) =>
        events.filter((e) => isSameDay(parseISO(e.startDate), d));

    const getCourseColor = (courseId: string | null | undefined) =>
        courses.find((c) => c.id === courseId)?.color ?? '#1A1A1A';

    const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    return (
        <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-4 md:p-6 mb-8 mt-5 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-6">
            <div className="min-w-[320px]">
                {/* Noms des jours */}
                <div className="grid grid-cols-7 mb-4">
                    {dayNames.map((d) => (
                        <div key={d} className="text-[12px] md:text-[13px] text-center text-[#737373] font-bold">
                            {d}
                        </div>
                    ))}
                </div>

                {/* Cases */}
                <div className="grid grid-cols-7 gap-y-3 gap-x-1">
                {days.map((d) => {
                    const dayEvents = getEventsForDay(d);
                    const isSelected = isSameDay(d, selectedDay);
                    const isCurrentMonth = isSameMonth(d, currentMonth);

                    return (
                        <div
                            key={d.toString()}
                            onClick={() => onSelectDay(d)}
                            className="min-h-[64px] flex flex-col items-center justify-start cursor-pointer group"
                        >
                            <div className={`
                                w-9 h-9 flex items-center justify-center rounded-full text-[15px] font-bold mb-[6px] transition-colors
                                ${!isCurrentMonth ? 'text-[#D4D4D4]' : isSelected ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A] hover:bg-[#E5E5E5]'}
                            `}>
                                {format(d, 'd')}
                            </div>

                            <div className="flex gap-1 justify-center flex-wrap px-1 w-full max-w-[28px]">
                                {dayEvents.slice(0, 4).map((e) => (
                                    <div
                                        key={e.id}
                                        className="w-1.5 h-1.5 rounded-full"
                                        style={{ background: getCourseColor(e.courseId) }}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
                </div>
            </div>
        </div>
    );
};

// ─── Planner hebdomadaire (Emploi du temps) ────────────────
// Restauration de l'affichage hebdo adapté au nouveau style

interface WeeklyPlannerProps {
    currentDate: Date;
    events: Event[];
    courses: { id: string; name: string; color: string }[];
    onSelectEvent: (event: Event) => void;
}

const WeeklyPlanner = ({ currentDate, events, courses, onSelectEvent }: WeeklyPlannerProps) => {
    // Affiche du Lundi au Vendredi (5 jours + Sam), de 08:00 à 19:00 (11 blocs)
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const days = Array.from({ length: 6 }).map((_, i) => addDays(weekStart, i)); // Lun-Sam
    const hours = Array.from({ length: 12 }).map((_, i) => i + 8); // 8h à 19h

    const getCourseColor = (courseId: string | null | undefined) =>
        courses.find((c) => c.id === courseId)?.color ?? '#1A1A1A';

    return (
        <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] overflow-hidden flex flex-col mb-8 mt-5 shadow-sm -mx-4 md:mx-0">
            {/* Conteneur scrollable horizontal */}
            <div className="overflow-x-auto scrollbar-hide">
                <div className="min-w-[770px] flex flex-col">
                    
                    {/* Conteneur scrollable vertical unique pour le header et la grille */}
                    <div className="h-[500px] overflow-y-auto scrollbar-thin relative bg-white">
                        
                        {/* Header des jours - Collant au sommet du scroll vertical */}
                        <div className="flex border-b border-[#E5E5E5] bg-white sticky top-0 z-40">
                            <div className="w-[50px] shrink-0 border-r border-[#E5E5E5] bg-white"></div>
                            {days.map(d => (
                                <div key={d.toString()} className="flex-1 min-w-[120px] text-center py-3 border-r border-[#E5E5E5] last:border-none bg-white">
                                    <div className={`text-[12px] font-bold uppercase tracking-widest ${isToday(d) ? 'text-[#1A1A1A]' : 'text-[#737373]'}`}>
                                        {format(d, 'EEEE', { locale: fr })}
                                    </div>
                                    <div className={`text-[18px] font-bold mt-1 ${isToday(d) ? 'text-[#1A1A1A] bg-[#E5E5E5] inline-block px-2 rounded-lg' : 'text-[#1A1A1A]'}`}>
                                        {format(d, 'd')}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Grille */}
                        <div className="flex relative bg-white">
                            <div className="w-[50px] shrink-0 border-r border-[#E5E5E5] flex flex-col relative z-20 bg-white">
                                {hours.map((h, idx) => (
                                    <div key={h} className={`h-[55px] relative ${idx < hours.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}>
                                        <span className="absolute -top-2.5 right-2 text-[11px] font-bold text-[#A3A3A3] bg-white px-1">{h}h</span>
                                    </div>
                                ))}
                            </div>

                            {days.map(d => {
                                const dayEvents = events.filter(e => isSameDay(parseISO(e.startDate), d));
                                return (
                                    <div key={d.toString()} className="flex-1 min-w-[120px] border-r border-[#E5E5E5] last:border-none relative">
                                        {hours.map((h, idx) => (
                                            <div key={h} className={`h-[55px] pointer-events-none ${idx < hours.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`} />
                                        ))}
                                        {dayEvents.map(event => {
                                            const start = parseISO(event.startDate);
                                            const end = parseISO(event.endDate);
                                            const startHour = start.getHours() + start.getMinutes() / 60;
                                            const endHour = end.getHours() + end.getMinutes() / 60;
                                            
                                            const top = (startHour - 8) * 55;
                                            let height = (endHour - startHour) * 55;
                                            if (height < 20) height = 20;
                                            if (top < -55 || top > hours.length * 55) return null;

                                            const color = getCourseColor(event.courseId);

                                            return (
                                                <div
                                                    key={event.id}
                                                    onClick={() => onSelectEvent(event)}
                                                    className="absolute left-[3px] right-[3px] rounded-[6px] p-2 overflow-hidden cursor-pointer hover:shadow-md transition-shadow z-30 border"
                                                    style={{
                                                        top: `${top}px`,
                                                        height: `${height}px`,
                                                        backgroundColor: color + '1A', 
                                                        borderColor: color + '40', 
                                                        borderLeft: `4px solid ${color}` 
                                                    }}
                                                    title={`${event.title} (${format(start, 'HH:mm')} - ${format(end, 'HH:mm')})`}
                                                >
                                                    <div className="text-[12px] font-bold leading-tight text-[#1A1A1A]">
                                                        {event.title}
                                                    </div>
                                                    {height >= 40 && (
                                                        <div className="text-[10px] font-medium text-[#737373] mt-0.5 truncate bg-white/60 px-1 rounded max-w-max">
                                                            {format(start, 'HH:mm')} - {format(end, 'HH:mm')}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Page principale ───────────────────────────────────────

export default function AgendaPage() {
    const { data: events = [], isLoading: eventsLoading } = useEvents();
    const { data: courses = [] } = useCourses();
    const { mutateAsync: createEventAsync, isPending: isCreating } = useCreateEvent();
    const { mutate: updateEvent } = useUpdateEvent();
    const { mutate: deleteEvent } = useDeleteEvent();

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [activeCourseFilter, setActiveCourseFilter] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

    const activeCourses = courses
        .filter((c) => !c.isDeleted)
        .map((c) => ({ id: c.id, name: c.name, color: c.color }));

    const filteredEvents = activeCourseFilter
        ? events.filter((e) => e.courseId === activeCourseFilter)
        : events;

    const selectedDayEvents = filteredEvents
        .filter((e) => isSameDay(parseISO(e.startDate), selectedDay))
        .sort((a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime());

    return (
        <div className="max-w-[1400px] mx-auto flex flex-col px-4 md:px-6 pb-20 md:pb-10 pt-2 md:pt-4">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2 mt-2">
                
                <div className="flex items-center justify-between md:justify-start gap-2 md:gap-4">
                    <button 
                        onClick={() => setCurrentDate(viewMode === 'month' ? subMonths(currentDate, 1) : subWeeks(currentDate, 1))} 
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#E5E5E5] text-[#1A1A1A] hover:bg-gray-50 transition-colors bg-white shadow-sm"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <span className="text-[26px] font-bold text-[#1A1A1A] capitalize tracking-tight min-w-[160px] text-center">
                        {viewMode === 'month' 
                            ? format(currentDate, 'MMMM yyyy', { locale: fr })
                            : `Sem. du ${format(startOfWeek(currentDate, { weekStartsOn: 1 }), 'd MMM', { locale: fr })}`
                        }
                    </span>
                    <button 
                        onClick={() => setCurrentDate(viewMode === 'month' ? addMonths(currentDate, 1) : addWeeks(currentDate, 1))} 
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#E5E5E5] text-[#1A1A1A] hover:bg-gray-50 transition-colors bg-white shadow-sm"
                    >
                        <ChevronRight size={18} />
                    </button>
                    
                    <button 
                        onClick={() => {
                            setCurrentDate(new Date());
                            setSelectedDay(new Date());
                        }} 
                        className="px-4 h-10 ml-2 rounded-xl border border-[#E5E5E5] text-[#1A1A1A] font-bold text-[14px] hover:bg-gray-50 bg-white shadow-sm transition-colors"
                    >
                        Aujourd'hui
                    </button>
                </div>
                
                <div className="flex items-center gap-4">
                     <div className="flex rounded-xl border border-[#E5E5E5] overflow-hidden bg-[#FAF9F6] p-1 gap-1">
                          {['Mois', 'Semaine', 'Jour'].map(view => {
                              const vKey = view === 'Mois' ? 'month' : view === 'Semaine' ? 'week' : 'day';
                              return (
                                  <button 
                                      key={vKey}
                                      onClick={() => setViewMode(vKey as any)} 
                                      className={`px-4 py-[6px] rounded-[8px] text-[13px] font-bold transition-colors ${viewMode === vKey ? 'bg-white text-[#1A1A1A] shadow-sm' : 'bg-transparent text-[#737373] hover:text-[#1A1A1A]'}`}
                                  >
                                      {view}
                                  </button>
                              );
                          })}
                     </div>
                     <button
                         onClick={() => setShowCreateModal(true)}
                         className="px-4 py-2.5 md:px-5 rounded-xl border border-[#E5E5E5] bg-white text-[15px] font-bold text-[#1A1A1A] hover:bg-gray-50 shadow-sm transition-colors whitespace-nowrap flex items-center justify-center gap-2"
                     >
                         <Plus size={16} />
                         <span className="hidden md:inline">Événement</span>
                     </button>
                </div>

            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2.5 mt-5 mb-2">
                <button
                    onClick={() => setActiveCourseFilter(null)}
                    className={`px-4 py-[6px] rounded-full text-[13px] font-bold transition-colors ${activeCourseFilter === null ? 'bg-[#1A1A1A] text-white' : 'bg-transparent border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#A3A3A3]'}`}
                >
                    Tous
                </button>
                {activeCourses.map((c) => (
                    <button
                        key={c.id}
                        onClick={() => setActiveCourseFilter(activeCourseFilter === c.id ? null : c.id)}
                        className={`px-3.5 py-[6px] rounded-full text-[13px] font-bold transition-colors flex items-center gap-2 border ${activeCourseFilter === c.id ? 'bg-[#FAF9F6] border-[#A3A3A3] text-[#1A1A1A]' : 'bg-transparent border-[#E5E5E5] text-[#1A1A1A] hover:border-[#A3A3A3]'}`}
                    >
                        <span className="w-2.5 h-2.5 rounded-full mt-0.5" style={{ background: c.color }} />
                        {c.name}
                    </button>
                ))}
            </div>

            {/* Calendrier / Planner */}
            {eventsLoading ? (
                <div className="h-[500px] w-full bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] mt-6 animate-pulse" />
            ) : viewMode === 'month' ? (
                <CalendarGrid
                    currentMonth={currentDate}
                    events={filteredEvents}
                    courses={activeCourses}
                    selectedDay={selectedDay}
                    onSelectDay={setSelectedDay}
                />
            ) : (
                <WeeklyPlanner
                    currentDate={currentDate}
                    events={filteredEvents}
                    courses={activeCourses}
                    onSelectEvent={setSelectedEvent}
                />
            )}

            {/* Events du jour (Vue Mois uniquement) */}
            {viewMode === 'month' && (
                <div className="flex flex-col">
                    <div className="text-[12px] font-bold text-[#737373] uppercase tracking-widest mb-4 ml-1">
                        {format(selectedDay, 'EEEE d MMMM', { locale: fr })} — {selectedDayEvents.length} ÉVÉNEMENT{selectedDayEvents.length !== 1 ? 'S' : ''}
                    </div>

                    {selectedDayEvents.length === 0 ? (
                        <div className="bg-[#FAF9F6] rounded-[24px] border border-[#E5E5E5] p-6 text-[14px] text-[#A3A3A3] text-center font-bold">
                            Aucun événement pour cette journée.
                        </div>
                    ) : (
                        <div className="bg-[#FAF9F6] rounded-[24px] border border-[#E5E5E5] flex flex-col overflow-hidden">
                            {selectedDayEvents.map((event, i) => {
                                const isNotLast = i !== selectedDayEvents.length - 1;
                                const course = courses.find((c) => c.id === event.courseId);
                                const color = course?.color ?? '#A3A3A3';
                                
                                return (
                                <div key={event.id} onClick={() => setSelectedEvent(event)} className={`flex items-center p-4 relative cursor-pointer hover:bg-white transition-colors ${isNotLast ? 'border-b border-[#E5E5E5]' : ''}`}>
                                    <div className="absolute left-5 top-4 bottom-4 w-1 rounded-full" style={{ background: color }} />
                                    
                                    <div className="w-[130px] shrink-0 pl-8 text-[13px] font-medium text-[#737373]">
                                        {format(parseISO(event.startDate), 'HHh\x00mm')} – {format(parseISO(event.endDate), 'HHh\x00mm')}
                                    </div>

                                    <div className="flex-1 min-w-0 pr-4">
                                        <div className="text-[15px] font-bold text-[#1A1A1A] truncate">
                                            {course ? `${course.name} — ` : ''}{event.title}
                                        </div>
                                        <div className="text-[12px] font-medium text-[#737373] mt-0.5 truncate">
                                            {event.location || event.description || ' '}
                                        </div>
                                    </div>
                                    
                                    <div className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide shrink-0 ${eventTypeBadge[event.type] ?? 'bg-[#E5E5E5] text-[#1A1A1A]'}`}>
                                        {eventTypeLabel[event.type] ?? event.type}
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* Modals existantes */}
            {selectedEvent && (
                <EventModal
                    event={selectedEvent}
                    courseColor={activeCourses.find((c) => c.id === selectedEvent.courseId)?.color}
                    onClose={() => setSelectedEvent(null)}
                    onDelete={deleteEvent}
                    onUpdate={(id, payload) => updateEvent({ id, payload })}
                />
            )}

            {showCreateModal && (
                <CreateEventModal
                    defaultDate={selectedDay}
                    courses={activeCourses}
                    onClose={() => setShowCreateModal(false)}
                    onCreate={async (payloads) => {
                        try {
                            for (const p of payloads) {
                                await createEventAsync(p as Omit<Event, 'id'>);
                            }
                            setShowCreateModal(false);
                        } catch (error) {
                            console.error("Erreur lors de la création multiple:", error);
                        }
                    }}
                    isLoading={isCreating}
                />
            )}
        </div>
    );
}
````

## File: frontend/src/pages/Auth/ForgotPasswordPage.tsx
````typescript
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useAuth } from '../../hooks/useAuth';

export default function ForgotPasswordPage() {
    const { forgotPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await forgotPassword(email);
            setSubmitted(true);
        } catch (err) {
            if (isAxiosError(err)) {
                setError(err.response?.data?.error?.message ?? 'Une erreur est survenue.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // ── Vue succès ──────────────────────────────────────────
    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
                <div className="bg-base-100 rounded-2xl p-10 w-full max-w-md text-center shadow-lg">
                    <div className="text-4xl mb-4">📬</div>
                    <h1 className="text-lg font-medium text-base-content mb-2">
                        Email envoyé
                    </h1>
                    <p className="text-sm text-base-content/50 mb-6">
                        Si un compte existe pour <strong>{email}</strong>, tu recevras
                        un lien de réinitialisation dans quelques minutes.
                    </p>
                    <Link to="/login" className="btn btn-neutral btn-sm w-full">
                        Retour à la connexion
                    </Link>
                </div>
            </div>
        );
    }

    // ── Vue formulaire ──────────────────────────────────────
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
            <div className="bg-base-100 rounded-2xl p-10 w-full max-w-md shadow-lg">

                <div className="mb-7">
                    <h1 className="text-xl font-medium text-base-content">
                        Mot de passe oublié
                    </h1>
                    <p className="text-sm text-base-content/50 mt-1">
                        Entre ton email pour recevoir un lien de réinitialisation
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                    <div>
                        <label className="text-xs text-base-content/50 mb-1 block">Email</label>
                        <input
                            type="email"
                            placeholder="lucas@univ.fr"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input input-bordered input-sm w-full"
                        />
                    </div>

                    {error && (
                        <div className="text-xs text-error">{error}</div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-neutral btn-sm w-full mt-1"
                    >
                        {isLoading
                            ? <span className="loading loading-spinner loading-xs" />
                            : 'Envoyer le lien'
                        }
                    </button>

                </form>

                <p className="text-xs text-center text-base-content/40 mt-5">
                    Tu te souviens ?{' '}
                    <Link to="/login" className="text-base-content font-medium">
                        Se connecter
                    </Link>
                </p>

            </div>
        </div>
    );
}
````

## File: frontend/src/pages/Auth/LoginPage.tsx
````typescript
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useAuth } from '../../hooks/useAuth';
import logo from '@/assets/Fichier1.svg'

export default function LoginPage() {
    const { login, isLoginLoading, loginError } = useAuth();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login({ email: form.email, password: form.password });
    };

    const backendError = loginError && isAxiosError(loginError)
        ? loginError.response?.data?.error?.message ?? 'Une erreur est survenue.'
        : null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
            <div className="flex w-full max-w-3xl rounded-2xl overflow-hidden shadow-lg">

                {/* ── GAUCHE : Formulaire ── */}
                <div className="flex-1 bg-base-100 p-10 flex flex-col justify-center">

                    <div className="mb-7">
                        <h1 className="text-xl font-medium text-base-content">Bon retour 👋</h1>
                        <p className="text-sm text-base-content/50 mt-1">
                            Connecte-toi pour accéder à ton espace
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                        <div>
                            <label className="text-xs text-base-content/50 mb-1 block">Email</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="lucas@univ.fr"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="input input-bordered input-sm w-full"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-base-content/50 mb-1 block">Mot de passe</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="input input-bordered input-sm w-full"
                            />
                        </div>

                        {/* Lien mot de passe oublié */}
                        <div className="text-right">
                            <Link
                                to="/forgot-password"
                                className="text-xs text-base-content/40 hover:text-base-content"
                            >
                                Mot de passe oublié ?
                            </Link>
                        </div>

                        {/* Erreur backend */}
                        {backendError && (
                            <div className="text-xs text-error">{backendError}</div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoginLoading}
                            className="btn btn-neutral btn-sm w-full mt-1"
                        >
                            {isLoginLoading
                                ? <span className="loading loading-spinner loading-xs" />
                                : 'Se connecter'
                            }
                        </button>

                    </form>

                    <p className="text-xs text-center text-base-content/40 mt-5">
                        Pas encore de compte ?{' '}
                        <Link to="/register" className="text-base-content font-medium">
                            Créer un compte
                        </Link>
                    </p>

                </div>

                {/* ── DROITE : Visuel ── */}
                <div className="w-64 bg-neutral flex flex-col items-center justify-center p-8 shrink-0">

                    <div className="text-4xl mb-3"><img src={logo} alt="logo" className="w-20 h-20" /></div>
                    <div className="text-sm font-medium text-neutral-content mb-1">StudyFlow</div>
                    <div className="text-xs text-neutral-content/40 text-center mb-8">
                        Ton assistant académique
                    </div>

                </div>

            </div>
        </div>
    );
}
````

## File: frontend/src/pages/Auth/RegisterPage.tsx
````typescript
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { isAxiosError } from 'axios';

export default function RegisterPage() {
    const { register, isRegisterLoading, registerError } = useAuth();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [localError, setLocalError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setLocalError('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');

        // Validation locale avant d'appeler l'API
        if (form.password !== form.confirmPassword) {
            setLocalError('Les mots de passe ne correspondent pas.');
            return;
        }
        if (form.password.length < 8) {
            setLocalError('Le mot de passe doit contenir au moins 8 caractères.');
            return;
        }

        register({
            name: `${form.firstName} ${form.lastName}`.trim(),
            email: form.email,
            password: form.password
        });
    };

    // Erreur venant du backend
    const backendError = registerError && isAxiosError(registerError)
        ? registerError.response?.data?.error?.message ?? 'Une erreur est survenue.'
        : null;

    const error = localError || backendError;

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
            <div className="flex w-full max-w-3xl rounded-2xl overflow-hidden shadow-lg">

                {/* ── GAUCHE : Formulaire ── */}
                <div className="flex-1 bg-base-100 p-10 flex flex-col justify-center">

                    <div className="mb-7">
                        <h1 className="text-xl font-medium text-base-content">Créer un compte</h1>
                        <p className="text-sm text-base-content/50 mt-1">
                            Commence à gérer tes cours et tâches
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                        {/* Prénom + Nom */}
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="text-xs text-base-content/50 mb-1 block">Prénom</label>
                                <input
                                    name="firstName"
                                    type="text"
                                    placeholder="Lucas"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    required
                                    className="input input-bordered input-sm w-full"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-base-content/50 mb-1 block">Nom</label>
                                <input
                                    name="lastName"
                                    type="text"
                                    placeholder="Martin"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    required
                                    className="input input-bordered input-sm w-full"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-xs text-base-content/50 mb-1 block">Email universitaire</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="lucas@univ.fr"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="input input-bordered input-sm w-full"
                            />
                        </div>

                        {/* Mot de passe */}
                        <div>
                            <label className="text-xs text-base-content/50 mb-1 block">Mot de passe</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="8 caractères minimum"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="input input-bordered input-sm w-full"
                            />
                        </div>

                        {/* Confirmer */}
                        <div>
                            <label className="text-xs text-base-content/50 mb-1 block">Confirmer le mot de passe</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                                className="input input-bordered input-sm w-full"
                            />
                        </div>

                        {/* Erreur */}
                        {error && (
                            <div className="text-xs text-error">{error}</div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isRegisterLoading}
                            className="btn btn-neutral btn-sm w-full mt-1"
                        >
                            {isRegisterLoading
                                ? <span className="loading loading-spinner loading-xs" />
                                : 'Créer mon compte'
                            }
                        </button>

                    </form>

                    <p className="text-xs text-center text-base-content/40 mt-5">
                        Déjà un compte ?{' '}
                        <Link to="/login" className="text-base-content font-medium">
                            Se connecter
                        </Link>
                    </p>

                </div>

                {/* ── DROITE : Visuel ── */}
                <div className="w-64 bg-neutral flex flex-col items-center justify-center p-8 shrink-0">

                    <div className="text-4xl mb-3">📚</div>
                    <div className="text-sm font-medium text-neutral-content mb-1">StudentApp</div>
                    <div className="text-xs text-neutral-content/40 text-center mb-8">
                        Ton assistant académique
                    </div>

                    {[
                        { icon: '📅', title: 'Agenda intelligent', sub: 'Cours, examens, révisions' },
                        { icon: '✅', title: 'Gestion des tâches', sub: 'Board Kanban + Pomodoro' },
                        { icon: '📊', title: 'Suivi des notes', sub: 'Moyennes et statistiques' },
                        { icon: '⚠️', title: 'Analyse de risque', sub: 'Anticipe les difficultés' },
                    ].map((f) => (
                        <div key={f.title} className="flex items-start gap-3 mb-5 last:mb-0">
                            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-sm shrink-0">
                                {f.icon}
                            </div>
                            <div>
                                <div className="text-xs font-medium text-neutral-content">{f.title}</div>
                                <div className="text-xs text-neutral-content/40">{f.sub}</div>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
}
````

## File: frontend/src/pages/Auth/ResetPassword.tsx
````typescript
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { isAxiosError } from 'axios';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { authAPI } from '../../api/auth.api';

interface FormValues {
    password: string;
    confirmPassword: string;
}

const initialForm: FormValues = {
    password: '',
    confirmPassword: '',
};

export default function ResetPasswordPage() {
    const [form, setForm] = useState<FormValues>(initialForm);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get('token')?.trim() ?? '';

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError('');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!token) {
            setError('Lien invalide: token manquant.');
            return;
        }

        if (form.password.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caracteres.');
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        setIsLoading(true);
        try {
            await authAPI.resetPassword({
                token,
                newPassword: form.password,
            });

            setSuccess('Mot de passe reinitialise avec succes. Redirection...');
            setForm(initialForm);
            setTimeout(() => navigate('/login'), 1200);
        } catch (err) {
            if (isAxiosError(err)) {
                setError(err.response?.data?.error?.message ?? 'Impossible de reinitialiser le mot de passe.');
            } else {
                setError('Une erreur inattendue est survenue.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
                <div className="bg-base-100 rounded-2xl p-10 w-full max-w-md text-center shadow-lg">
                    <div className="text-4xl mb-3">⚠️</div>
                    <h1 className="text-lg font-medium text-base-content mb-2">Lien invalide</h1>
                    <p className="text-sm text-base-content/50 mb-6">
                        Ce lien de reinitialisation est incomplet ou invalide.
                    </p>
                    <Link to="/forgot-password" className="btn btn-neutral btn-sm w-full">
                        Demander un nouveau lien
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
            <div className="bg-base-100 rounded-2xl p-10 w-full max-w-md shadow-lg">
                <div className="mb-7">
                    <h1 className="text-xl font-medium text-base-content">Nouveau mot de passe</h1>
                    <p className="text-sm text-base-content/50 mt-1">
                        Definis un nouveau mot de passe pour ton compte
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div>
                        <label className="text-xs text-base-content/50 mb-1 block">Nouveau mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            placeholder="8 caracteres minimum"
                            className="input input-bordered input-sm w-full"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-base-content/50 mb-1 block">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            className="input input-bordered input-sm w-full"
                        />
                    </div>

                    {error && <div className="text-xs text-error">{error}</div>}
                    {success && <div className="text-xs text-success">{success}</div>}

                    <button type="submit" disabled={isLoading} className="btn btn-neutral btn-sm w-full mt-1">
                        {isLoading ? <span className="loading loading-spinner loading-xs" /> : 'Reinitialiser le mot de passe'}
                    </button>
                </form>

                <p className="text-xs text-center text-base-content/40 mt-5">
                    Retour a{' '}
                    <Link to="/login" className="text-base-content font-medium">
                        la connexion
                    </Link>
                </p>
            </div>
        </div>
    );
}
````

## File: frontend/src/pages/Courses/CoursesDetailPage.tsx
````typescript
import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useCourse, useCourseWorkTypes } from '../../hooks/useCourses';
import { useGrades, useCreateGrade } from '../../hooks/useGrades';
import { useEvents } from '../../hooks/useEvents';
import { useTasks, useUpdateTask } from '../../hooks/useTasks';
import { useRisk } from '../../hooks/useRisks';
import CourseFormModal from '../../components/Courses/CourseFormModal';
import type { Grade } from '../../types';

// Tab Definitions
type Tab = 'notes' | 'travaux' | 'taches' | 'evenements' | 'risque';

// Risk Styles
const riskStyles = {
    LOW: { text: "text-[#3B8A44]", bg: "bg-[#E8F2E8]" },
    MEDIUM: { text: "text-[#A36D16]", bg: "bg-[#F5EDDF]" },
    HIGH: { text: "text-[#B22A2A]", bg: "bg-[#F5E2E2]" },
    CRITICAL: { text: "text-[#B22A2A]", bg: "bg-[#F5E2E2]" }
};

// ─── Helpers ──────────────────────────────────────────────
const typeToLabel = (grade: Grade): string => {
    if (grade.workTypeLabel) return grade.workTypeLabel;
    const nameStr = grade.name.toLowerCase();
    if (nameStr.includes('interro')) return 'Interro';
    if (nameStr.includes('tp')) return 'TP';
    if (nameStr.includes('projet')) return 'Projet';
    return 'Examen';
};

const getBadgeStyle = (label: string) => {
    if (label === 'Examen') return 'bg-[#FDF2F2] text-[#E74C3C]';
    if (label === 'Interro') return 'bg-[#EFF6FF] text-[#3B82F6]';
    if (label === 'TP' || label === 'Projet') return 'bg-[#F0FDF4] text-[#22C55E]';
    return 'bg-gray-100 text-gray-600';
};

const getScoreColor = (score: number, max: number) => {
    const ratio = score / max;
    if (ratio >= 0.7) return 'text-[#22C55E]';
    if (ratio >= 0.45) return 'text-[#F59E0B]'; // orange
    return 'text-[#E74C3C]';
};

const simulateGrade = (grades: Grade[], target: number, nextWeight: number = 1): number | null => {
    if (grades.length === 0) return target;
    const totalWeight = grades.reduce((sum, g) => sum + (g.weight ?? 1), 0) + nextWeight;
    const currentSum = grades.reduce((sum, g) => sum + ((g.score / g.maxScore) * 20) * (g.weight ?? 1), 0);
    const needed = (target * totalWeight - currentSum) / nextWeight;
    return Math.round(needed * 100) / 100;
};

// ─── Onglet Notes ──────────────────────────────────────────

const NotesTab = ({ courseId }: { courseId: string }) => {
    const { data: grades = [], isLoading } = useGrades(courseId);
    const { data: courseWorkTypes = [] } = useCourseWorkTypes(courseId);
    const { mutate: createGrade, isPending: isCreating } = useCreateGrade();
    const [showForm, setShowForm] = useState(false);
    const [simulatorTarget, setSimulatorTarget] = useState<number | ''>(10);
    const [form, setForm] = useState({ name: '', score: '', maxScore: '20', weight: '1', workTypeLabel: 'Examen' });

    const workTypeOptions = useMemo(() => {
        if (courseWorkTypes.length > 0) {
            return courseWorkTypes.map((item) => ({
                value: item.type,
                label: `${item.type} (${item.weightPercent}%)`,
                weightPercent: item.weightPercent
            }));
        }
        return [
            { value: 'EXAMEN', label: 'EXAMEN', weightPercent: null as number | null },
            { value: 'INTERRO', label: 'INTERRO', weightPercent: null as number | null },
            { value: 'TP', label: 'TP', weightPercent: null as number | null }
        ];
    }, [courseWorkTypes]);

    const normalizedFormType = String(form.workTypeLabel || '').trim().toUpperCase();
    const currentTypeValue = workTypeOptions.some((option) => option.value === normalizedFormType)
        ? normalizedFormType
        : (workTypeOptions[0]?.value ?? 'EXAMEN');

    const average = grades.length === 0 ? null :
        grades.reduce((sum, g) => sum + ((g.score / g.maxScore) * 20) * (g.weight ?? 1), 0) /
        grades.reduce((sum, g) => sum + (g.weight ?? 1), 0);

    const needed = simulateGrade(grades, Number(simulatorTarget));

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        const selectedType = workTypeOptions.find((option) => option.value === currentTypeValue);
        createGrade(
            {
                ...form,
                score: Number(form.score),
                maxScore: Number(form.maxScore),
                weight: Number(form.weight),
                workTypeLabel: currentTypeValue,
                percentage: selectedType?.weightPercent ?? undefined,
                courseId
            },
            {
                onSuccess: () => {
                    setShowForm(false);
                    setForm({
                        name: '',
                        score: '',
                        maxScore: '20',
                        weight: '1',
                        workTypeLabel: workTypeOptions[0]?.value ?? 'EXAMEN'
                    });
                }
            }
        );
    };

    if (isLoading) return <div className="h-40 bg-gray-100 rounded-[20px] animate-pulse" />;

    return (
        <div className="flex flex-col gap-5 mt-5">
            {/* Notes Header Section */}
            <div className="flex justify-between items-end mb-2">
                <div>
                    <div className="text-[11px] font-bold text-[#A3A3A3] uppercase tracking-wider mb-2">
                        Notes du cours
                    </div>
                    <div className="text-[14px] font-medium text-[#737373]">
                        Moyenne pondérée : <span className="text-[#1A1A1A] font-bold">{average !== null ? `${average.toFixed(1)} / 20` : '— / 20'}</span>
                    </div>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-white border border-[#E5E5E5] text-[#1A1A1A] rounded-xl text-[14px] font-medium px-4 py-2 hover:bg-gray-50 flex items-center gap-2 transition-colors shadow-sm"
                >
                    + Ajouter une note
                </button>
            </div>

            {/* Ajout Form dropdown */}
            {showForm && (
                <form onSubmit={handleCreate} className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[20px] p-5 flex flex-col gap-4">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        <div className="col-span-2">
                            <label className="text-xs text-[#737373] mb-1.5 block font-medium">Nom</label>
                            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full h-10 px-3 border border-[#E5E5E5] rounded-xl bg-white text-[14px] font-medium outline-none" />
                        </div>
                        <div>
                            <label className="text-xs text-[#737373] mb-1.5 block font-medium">Note</label>
                            <input type="number" step="0.5" value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} required min={0} className="w-full h-10 px-3 border border-[#E5E5E5] rounded-xl bg-white text-[14px] font-medium outline-none" />
                        </div>
                        <div>
                            <label className="text-xs text-[#737373] mb-1.5 block font-medium">Sur</label>
                            <input type="number" value={form.maxScore} onChange={(e) => setForm({ ...form, maxScore: e.target.value })} min={1} className="w-full h-10 px-3 border border-[#E5E5E5] rounded-xl bg-white text-[14px] font-medium outline-none" />
                        </div>
                        <div>
                            <label className="text-xs text-[#737373] mb-1.5 block font-medium">Coeff.</label>
                            <input type="number" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} min={0.5} step="0.5" className="w-full h-10 px-3 border border-[#E5E5E5] rounded-xl bg-white text-[14px] font-medium outline-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-[#737373] mb-1.5 block font-medium">Type de note</label>
                            <select
                                value={currentTypeValue}
                                onChange={(e) => setForm({ ...form, workTypeLabel: e.target.value })}
                                className="w-full h-10 px-3 border border-[#E5E5E5] rounded-xl bg-white text-[14px] font-medium outline-none"
                            >
                                {workTypeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-[#737373] mb-1.5 block font-medium">Pondération appliquée</label>
                            <input
                                readOnly
                                value={`${workTypeOptions.find((option) => option.value === currentTypeValue)?.weightPercent ?? '-'}%`}
                                className="w-full h-10 px-3 border border-[#E5E5E5] rounded-xl bg-[#F3F4F6] text-[14px] font-medium outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-2">
                        <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-[14px] text-[#737373] font-medium hover:text-[#1A1A1A]">Annuler</button>
                        <button type="submit" disabled={isCreating} className="bg-[#1A1A1A] text-white px-5 py-2 rounded-xl text-[14px] font-medium hover:bg-black">
                            {isCreating ? 'En cours...' : 'Enregistrer'}
                        </button>
                    </div>
                </form>
            )}

            {/* Notes List */}
            {grades.length === 0 ? (
                <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-10 text-center text-[#737373] text-[15px]">
                    Aucune note enregistrée.
                </div>
            ) : (
                <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] flex flex-col pt-2 pb-2">
                    {grades.map((grade, i) => {
                        const typeLabel = typeToLabel(grade);
                        const bStyle = getBadgeStyle(typeLabel);
                        const numScoreColor = getScoreColor(grade.score, grade.maxScore);

                        return (
                            <div key={grade.id} className={`flex justify-between items-center px-6 py-4 ${i < grades.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}>
                                <div>
                                    <div className="text-[15px] font-bold text-[#1A1A1A] mb-1">{grade.name}</div>
                                    <div className="text-[13px] text-[#737373]">
                                        {typeLabel} · coeff. {grade.weight ?? 1}{grade.date ? ` ·  ${new Date(grade.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '')}` : ''}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className={`px-2.5 py-0.5 rounded text-[12px] font-bold tracking-wide ${bStyle}`}>
                                        {typeLabel}
                                    </div>
                                    <div className={`text-[17px] font-bold w-20 text-right ${numScoreColor}`}>
                                        {grade.score} / {grade.maxScore}
                                    </div>
                                    <button className="w-8 h-8 flex items-center justify-center border border-[#E5E5E5] rounded-lg hover:bg-white transition-colors">
                                        {/* Crayon rouge ico */}
                                        <svg className="w-3.5 h-3.5 text-[#E74C3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Simulateur Container */}
            <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-6 mt-2">
                <div className="text-[15px] font-bold text-[#1A1A1A] mb-2">Simulateur de moyenne</div>
                <div className="text-[15px] text-[#737373] mb-5">Quelle note faut-il avoir au prochain examen pour atteindre {simulatorTarget || 10} / 20 ?</div>
                
                <div className="flex items-center gap-4">
                    <span className="text-[15px] text-[#1A1A1A]">Objectif :</span>
                    <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.5"
                        value={simulatorTarget === '' ? '' : simulatorTarget}
                        onChange={(e) => setSimulatorTarget(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-[70px] h-[44px] border border-[#E5E5E5] bg-[#FAF9F6] rounded-xl text-center text-[15px] font-medium outline-none focus:border-[#A3A3A3] transition-colors"
                    />
                    <span className="text-[15px] text-[#1A1A1A] ml-2">→ Il te faut au moins</span>
                    <span className="text-[17px] font-bold text-[#1A1A1A]">
                        {needed !== null 
                            ? needed > 20 
                                ? 'Impossible — trop haut' 
                                : needed < 0 
                                    ? 'Déjà atteint !' 
                                    : `${needed} / 20`
                            : '— / 20'}
                    </span>
                </div>
            </div>

        </div>
    );
};

const TasksTab = ({ courseId }: { courseId: string }) => {
    const { data: tasks = [], isLoading } = useTasks();
    const { mutate: updateTask } = useUpdateTask();

    const courseTasks = tasks.filter((t) => t.courseId === courseId && !t.isDeleted);

    if (isLoading) return <div className="h-40 bg-gray-100 rounded-[20px] animate-pulse mt-5" />;

    if (courseTasks.length === 0) {
        return (
            <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-10 text-center text-[#737373] text-[15px] mt-5">
                Aucune tâche pour ce cours.
            </div>
        );
    }

    return (
        <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] flex flex-col pt-2 pb-2 mt-5">
            {courseTasks.map((task, i) => (
                <div key={task.id} className={`flex items-center gap-4 px-6 py-4 ${i < courseTasks.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}>
                    <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A] cursor-pointer"
                        checked={task.status === 'COMPLETED'}
                        onChange={() => updateTask({ id: task.id, payload: { status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' } })}
                    />
                    <div className="flex-1">
                        <div className={`text-[15px] font-bold ${task.status === 'COMPLETED' ? 'line-through text-[#A3A3A3]' : 'text-[#1A1A1A]'}`}>
                            {task.title}
                        </div>
                        {task.dueDate && (
                            <div className="text-[13px] text-[#737373] mt-0.5">
                                {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                            </div>
                        )}
                    </div>
                    <div className={`px-2.5 py-0.5 rounded text-[12px] font-bold tracking-wide ${
                        task.priority === 'CRITICAL' ? 'bg-[#FDF2F2] text-[#E74C3C]' :
                        task.priority === 'HIGH' ? 'bg-[#FFF3E0] text-[#F97316]' :
                        task.priority === 'MEDIUM' ? 'bg-[#FEF9C3] text-[#EAB308]' :
                        'bg-[#F0FDF4] text-[#22C55E]'
                    }`}>
                        {task.priority}
                    </div>
                </div>
            ))}
        </div>
    );
};

// ─── Onglet Événements ─────────────────────────────────────

const EventsTab = ({ courseId }: { courseId: string }) => {
    const { data: events = [], isLoading } = useEvents();

    const courseEvents = events
        .filter((e) => e.courseId === courseId)
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    if (isLoading) return <div className="h-40 bg-gray-100 rounded-[20px] animate-pulse mt-5" />;

    if (courseEvents.length === 0) {
        return (
            <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-10 text-center text-[#737373] text-[15px] mt-5">
                Aucun événement pour ce cours.
            </div>
        );
    }

    return (
        <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] flex flex-col pt-2 pb-2 mt-5">
            {courseEvents.map((event, i) => (
                <div key={event.id} className={`flex items-center gap-4 px-6 py-4 ${i < courseEvents.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}>
                    <div className="w-1.5 self-stretch rounded-full shrink-0" style={{ background: '#1A1A1A' }} />
                    <div className="flex-1">
                        <div className="text-[15px] font-bold text-[#1A1A1A]">{event.title}</div>
                        <div className="text-[13px] text-[#737373] mt-0.5">
                            {new Date(event.startDate).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                            {' · '}
                            {new Date(event.startDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            {' – '}
                            {new Date(event.endDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                    <div className="px-2.5 py-0.5 rounded text-[12px] font-bold tracking-wide bg-[#F3F4F6] text-[#4B5563]">
                        {event.type}
                    </div>
                </div>
            ))}
        </div>
    );
};

// ─── Onglet Risque ─────────────────────────────────────────

const RiskTab = ({ courseId }: { courseId: string }) => {
    const { data: risk, isLoading } = useRisk(courseId);

    if (isLoading) return <div className="h-40 bg-gray-100 rounded-[20px] animate-pulse mt-5" />;

    if (!risk) {
        return (
            <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-10 text-center text-[#737373] text-[15px] mt-5">
                Données insuffisantes pour calculer le risque.
            </div>
        );
    }

    const factors = [
        { label: 'Performance', value: risk.details.performance },
        { label: 'Procrastination', value: risk.details.procrastination },
        { label: 'Pression examen', value: risk.details.pressure },
    ];

    const riskLevel = risk.level || 'LOW';
    const rStyle = riskStyles[riskLevel as keyof typeof riskStyles] || riskStyles.LOW;

    return (
        <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-6 mt-5 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <div className="text-[13px] text-[#737373] font-medium mb-1">Score de risque global</div>
                    <div className={`text-[36px] font-bold ${rStyle.text} leading-none`}>
                        {risk.overallScore}
                        <span className="text-[17px] text-[#A3A3A3] ml-1">/ 100</span>
                    </div>
                </div>
                <div className={`px-3 py-1 rounded-lg text-[13px] font-bold tracking-widest uppercase ${rStyle.bg} ${rStyle.text}`}>
                    {risk.level}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {factors.map((f) => (
                    <div key={f.label}>
                        <div className="flex justify-between items-end mb-1.5">
                            <span className="text-[14px] text-[#737373] font-medium">{f.label}</span>
                            <span className="text-[14px] font-bold text-[#1A1A1A]">{f.value}%</span>
                        </div>
                        <div className="h-2 bg-[#E5E5E5] rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                    width: `${f.value}%`,
                                    background: f.value >= 70 ? '#E74C3C' : f.value >= 40 ? '#F59E0B' : '#22C55E'
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Onglets génériques pour le moment ─────────────────────

const placeholderSection = (text: string) => (
    <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-10 text-center text-[#737373] text-[15px] mt-6">
        {text}
    </div>
);

// ─── Page principale (Détails) ─────────────────────────────

export default function CourseDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('notes');
    const [showEditModal, setShowEditModal] = useState(false);

    const { data: course, isLoading } = useCourse(id ?? '');
    const { data: grades = [] } = useGrades(id ?? '');
    const { data: tasks = [] } = useTasks();
    const { data: risk } = useRisk(id ?? '');

    const courseTasks = tasks.filter(t => t.courseId === id && !t.isDeleted);
    
    // Average
    const average = grades.length === 0 ? null :
        grades.reduce((sum, g) => sum + ((g.score / g.maxScore) * 20) * (g.weight ?? 1), 0) /
        grades.reduce((sum, g) => sum + (g.weight ?? 1), 0);

    const riskLevel = risk?.level || 'LOW';
    const rStyle = riskStyles[riskLevel as keyof typeof riskStyles] || riskStyles.LOW;

    if (isLoading) return <div className="max-w-4xl mx-auto h-[300px] bg-gray-50 rounded-[20px] animate-pulse" />;
    
    if (!course) {
        return (
            <div className="text-center py-16 text-[#737373]">
                <div className="flex justify-center mb-3">
                    <Search size={36} className="opacity-20" />
                </div>
                <div className="text-sm">Cours introuvable</div>
                <button onClick={() => navigate('/courses')} className="mt-4 text-[#1A1A1A] underline">← Retour aux cours</button>
            </div>
        );
    }

    const tabs: { key: Tab; label: string }[] = [
        { key: 'notes', label: 'Notes' },
        { key: 'travaux', label: 'Travaux' },
        { key: 'taches', label: 'Tâches' },
        { key: 'evenements', label: 'Événements' },
        { key: 'risque', label: 'Risque' },
    ];

    return (
        <div className="max-w-[900px] mx-auto pb-10 px-2 lg:px-4">

            {/* Back action */}
            <button
                onClick={() => navigate('/courses')}
                className="text-[14px] font-medium text-[#737373] hover:text-[#1A1A1A] transition-colors mb-4 flex items-center gap-1.5"
            >
                ← Mes cours
            </button>

            {/* Title Section */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-3.5 h-3.5 rounded-full shrink-0" style={{ background: course.color }} />
                        <h1 className="text-[26px] font-semibold text-[#1A1A1A] tracking-tight">{course.name}</h1>
                    </div>
                    <div className="text-[14px] text-[#737373] font-medium ml-6.5">
                        {course.code} · {course.credits ?? 3} crédits
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-widest uppercase ${rStyle.bg} ${rStyle.text}`}>
                        {riskLevel}
                    </div>
                    <button 
                        onClick={() => setShowEditModal(true)}
                        className="bg-white border border-[#E5E5E5] text-[#1A1A1A] text-[15px] font-medium rounded-xl px-5 py-2 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        Modifier
                    </button>
                </div>
            </div>

            {/* Top 4 Stats Columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {/* Moyenne */}
                <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[18px] py-4 flex flex-col items-center justify-center">
                    <div className="text-[26px] font-medium text-[#1A1A1A] leading-tight">
                        {average !== null ? average.toFixed(1) : '-'}
                    </div>
                    <div className="text-[13px] text-[#737373] mt-0.5 font-medium">Moyenne</div>
                </div>
                {/* Notes */}
                <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[18px] py-4 flex flex-col items-center justify-center">
                    <div className="text-[26px] font-medium text-[#1A1A1A] leading-tight">
                        {grades.length}
                    </div>
                    <div className="text-[13px] text-[#737373] mt-0.5 font-medium">Notes</div>
                </div>
                {/* Tâches */}
                <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[18px] py-4 flex flex-col items-center justify-center">
                    <div className="text-[26px] font-medium text-[#1A1A1A] leading-tight">
                        {courseTasks.length}
                    </div>
                    <div className="text-[13px] text-[#737373] mt-0.5 font-medium">Tâches</div>
                </div>
                {/* Score risque */}
                <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[18px] py-4 flex flex-col items-center justify-center">
                    <div className="text-[26px] font-medium text-[#E74C3C] leading-tight">
                        {Math.round(risk?.overallScore || 0)}
                    </div>
                    <div className="text-[13px] text-[#737373] mt-0.5 font-medium">Score risque</div>
                </div>
            </div>

            {/* Nav Tabs */}
            <div className="flex border-b border-[#E5E5E5] overflow-x-auto select-none no-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-5 py-3 text-[15px] font-medium transition-colors border-b-2 whitespace-nowrap ${
                            activeTab === tab.key 
                            ? 'text-[#1A1A1A] border-[#1A1A1A]' 
                            : 'text-[#737373] border-transparent hover:text-[#1A1A1A]'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
                {/* Espace flexible pour aller jusqu'au bout */}
                <div className="flex-1"></div>
            </div>

            {/* Tab content */}
            <div>
                {activeTab === 'notes' && <NotesTab courseId={id ?? ''} />}
                {activeTab === 'travaux' && placeholderSection("L'onglet Travaux sera bientôt implémenté.")}
                {activeTab === 'taches' && <TasksTab courseId={id ?? ''} />}
                {activeTab === 'evenements' && <EventsTab courseId={id ?? ''} />}
                {activeTab === 'risque' && <RiskTab courseId={id ?? ''} />}
            </div>

            {showEditModal && course && (
                <CourseFormModal course={course} onClose={() => setShowEditModal(false)} />
            )}

        </div>
    );
}
````

## File: frontend/src/pages/Courses/CoursesPage.tsx
````typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '../../hooks/useCourses';
import { useGrades } from '../../hooks/useGrades';
import { useTasks } from '../../hooks/useTasks';
import { useEvents } from '../../hooks/useEvents';
import { useRisk } from '../../hooks/useRisks';
import type { Course, Task, Event } from '../../types';
import CourseFormModal from '../../components/Courses/CourseFormModal';

// ─── Helpers ──────────────────────────────────────────────
const riskStyles = {
    LOW: { text: "text-[#3B8A44]", bg: "bg-[#E8F2E8]" },
    MEDIUM: { text: "text-[#A36D16]", bg: "bg-[#F5EDDF]" },
    HIGH: { text: "text-[#B22A2A]", bg: "bg-[#F5E2E2]" },
    CRITICAL: { text: "text-[#B22A2A]", bg: "bg-[#F5E2E2]" }
};

// ─── Composant carte cours ─────────────────────────────────

interface CourseCardProps {
    course: Course;
    tasks: Task[];
    events: Event[];
    onClick: (id: string) => void;
}

const CourseCard = ({ course, tasks, events, onClick }: CourseCardProps) => {
    const { data: grades = [] } = useGrades(course.id);
    const { data: risk } = useRisk(course.id);

    const courseTasks = tasks.filter(t => t.courseId === course.id && !t.isDeleted);
    const courseEvents = events.filter(e => e.courseId === course.id);

    const average = grades.length === 0 ? null :
        grades.reduce((sum, g) => sum + ((g.score / g.maxScore) * 20) * (g.weight ?? 1), 0) /
        grades.reduce((sum, g) => sum + (g.weight ?? 1), 0);

    const riskLevel = risk?.level || 'LOW';
    const rStyle = riskStyles[riskLevel as keyof typeof riskStyles] || riskStyles.LOW;

    const progressValue = average !== null ? (average / 20) * 100 : 0;

    return (
        <div
            className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[20px] p-5 cursor-pointer hover:shadow-md transition-all flex flex-col relative min-h-[170px]"
            onClick={() => onClick(course.id)}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full shrink-0" style={{ background: course.color }} />
                    <div className="font-bold text-[17px] text-[#1A1A1A] tracking-tight">{course.name}</div>
                </div>
                <div className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-widest uppercase ${rStyle.bg} ${rStyle.text}`}>
                    {riskLevel}
                </div>
            </div>

            {/* Subtitle */}
            <div className="text-[13px] text-[#737373] mb-5 font-medium">
                {course.code} · {course.credits ?? 3} crédits
            </div>

            {/* Stats Row */}
            <div className="flex items-center text-center mt-auto mb-5 px-1">
                <div className="flex-1">
                    <div className="text-[19px] font-bold text-[#1A1A1A]">{average !== null ? average.toFixed(1) : '-'}</div>
                    <div className="text-[11px] text-[#737373] font-medium mt-0.5">Moyenne</div>
                </div>
                <div className="w-px h-8 bg-[#E5E5E5]" />
                <div className="flex-1">
                    <div className="text-[19px] font-bold text-[#1A1A1A]">{grades.length}</div>
                    <div className="text-[11px] text-[#737373] font-medium mt-0.5">Notes</div>
                </div>
                <div className="w-px h-8 bg-[#E5E5E5]" />
                <div className="flex-1">
                    <div className="text-[19px] font-bold text-[#1A1A1A]">{courseTasks.length}</div>
                    <div className="text-[11px] text-[#737373] font-medium mt-0.5">Tâches</div>
                </div>
                <div className="w-px h-8 bg-[#E5E5E5]" />
                <div className="flex-1">
                    <div className="text-[19px] font-bold text-[#1A1A1A]">{courseEvents.length}</div>
                    <div className="text-[11px] text-[#737373] font-medium mt-0.5">Events</div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 rounded-full bg-[#E5E5E5] overflow-hidden mt-auto mx-1">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progressValue}%`, background: course.color }} />
            </div>
        </div>
    );
};

// ─── Add Course Component ──────────────────────────────────

const AddCourseCard = ({ onClick }: { onClick: () => void }) => (
    <div
        onClick={onClick}
        className="border border-dashed border-[#D4D4D4] rounded-[20px] p-5 cursor-pointer hover:bg-gray-50 transition-all flex flex-col items-center justify-center min-h-[170px]"
    >
        <div className="text-2xl text-[#737373] mb-2 font-light">+</div>
        <div className="text-[14px] font-medium text-[#737373]">Ajouter un cours</div>
    </div>
);

// ─── Page principale ───────────────────────────────────────

export default function CoursesPage() {
    const navigate = useNavigate();
    const { data: courses = [], isLoading } = useCourses();
    const { data: tasks = [] } = useTasks();
    const { data: events = [] } = useEvents();

    const [showModal, setShowModal] = useState(false);
    const [riskFilter, setRiskFilter] = useState('Tous les risques');

    const activeCourses = courses.filter((c) => !c.isDeleted);

    return (
        <div className="max-w-5xl mx-auto px-4 md:px-6 pt-4 pb-10">

            {/* Header select (Filter imitation) */}
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-[28px] font-bold text-[#1A1A1A] tracking-tight">Cours</h1>
                <div className="border border-[#E5E5E5] bg-[#FAF9F6] rounded-xl flex items-center pr-3 max-w-[200px]">
                    <select
                        value={riskFilter}
                        onChange={(e) => setRiskFilter(e.target.value)}
                        className="flex-1 bg-transparent p-3 text-[14px] font-medium text-[#1A1A1A] outline-none cursor-pointer appearance-none"
                    >
                        <option>Tous les risques</option>
                        <option>LOW</option>
                        <option>MEDIUM</option>
                        <option>HIGH</option>
                        <option>CRITICAL</option>
                    </select>
                    {/* Flèche SVG pour le select personnalisé */}
                    <svg className="w-4 h-4 text-[#737373] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-44 bg-gray-100 rounded-[20px] animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                    {activeCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            tasks={tasks}
                            events={events}
                            onClick={(id) => navigate(`/courses/${id}`)}
                        />
                    ))}
                    {/* Toujours le bouton ajouter à la fin */}
                    <AddCourseCard onClick={() => setShowModal(true)} />
                </div>
            )}

            {/* Modal de création */}
            {showModal && (
                <CourseFormModal onClose={() => setShowModal(false)} />
            )}

        </div>
    );
}
````

## File: frontend/src/pages/Dashboard/DashboardPage.tsx
````typescript
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useTasks, useUpdateTask } from '../../hooks/useTasks';
import { useEvents } from '../../hooks/useEvents';
import { useCourses } from '../../hooks/useCourses';
import { useGrades } from '../../hooks/useGrades';
import { useDashboardStats } from '../../hooks/useRisks';
import { ArrowRight, Check } from 'lucide-react';
import type { Task, Event } from '../../types';

// ─── Helpers ──────────────────────────────────────────────

const priorityColor: Record<string, string> = {
    CRITICAL: '#8B5CF6',
    HIGH: '#EF4444',
    MEDIUM: '#F59E0B',
    LOW: '#10B981',
};

const eventTypeLabel: Record<string, string> = {
    CLASS: 'Cours',
    EXAM: 'Examen',
    EXAMEN: 'Examen',
    INTERRO: 'Interro',
    TP: 'TP',
    STUDY: 'Révision',
    QUIZ: 'Quiz',
    ASSIGNMENT: 'Devoir',
    MEETING: 'Réunion',
    PERSONAL: 'Personnel',
    AUTRE: 'Autre',
};

const eventTypeBadge: Record<string, string> = {
    CLASS: 'bg-[#EFF6FF] text-[#3B82F6]',
    EXAM: 'bg-[#FEF2F2] text-[#EF4444]',
    EXAMEN: 'bg-[#FEF2F2] text-[#EF4444]',
    INTERRO: 'bg-[#FFF7ED] text-[#F59E0B]',
    TP: 'bg-[#F0FDF4] text-[#10B981]',
    STUDY: 'bg-[#F0FDF4] text-[#10B981]',
    QUIZ: 'bg-[#FFF7ED] text-[#F59E0B]',
    ASSIGNMENT: 'bg-[#EFF6FF] text-[#3B82F6]',
    MEETING: 'bg-[#F3F4F6] text-[#1A1A1A]',
    PERSONAL: 'bg-[#F3F4F6] text-[#1A1A1A]',
    AUTRE: 'bg-[#F3F4F6] text-[#1A1A1A]',
};

const priorityOrder: Record<string, number> = {
    CRITICAL: 0,
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3,
};

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
});

const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    }).replace(':', 'h');

const formatDueDate = (dateStr: string | null | undefined): string => {
    if (!dateStr) return '';
    const due = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.ceil(
        (due.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24)
    );
    if (diffDays < 0) return 'en retard';
    if (diffDays === 0) return "aujourd'hui";
    if (diffDays === 1) return 'demain';
    return `dans ${diffDays} jours`;
};

const isUrgent = (dateStr: string | null | undefined): boolean => {
    if (!dateStr) return false;
    const due = new Date(dateStr);
    const now = new Date();
    return (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) <= 2;
};

const isTodayEvent = (event: Event): boolean => {
    const today = new Date();
    const start = new Date(event.startDate);
    return (
        start.getDate() === today.getDate() &&
        start.getMonth() === today.getMonth() &&
        start.getFullYear() === today.getFullYear()
    );
};

// ─── Composants ───────────────────────────────────────────

interface TaskRowProps {
    task: Task;
    courseName?: string;
    onComplete: (id: string) => void;
    isLast: boolean;
}

const TaskRow = ({ task, courseName, onComplete, isLast }: TaskRowProps) => {
    const due = formatDueDate(task.dueDate);
    const urgent = isUrgent(task.dueDate);
    const isCompleted = task.status === 'COMPLETED';

    return (
        <div className={`flex items-center gap-4 py-4 ${!isLast ? 'border-b border-[#E5E5E5]' : ''}`}>
            {/* Checkbox */}
            <div
                onClick={() => onComplete(task.id)}
                className={`w-[20px] h-[20px] rounded-[6px] border cursor-pointer flex justify-center items-center transition-colors shrink-0 shadow-sm ${isCompleted ? 'bg-[#10B981] border-[#10B981]' : 'bg-white border-[#A3A3A3] hover:border-[#1A1A1A]'}`}
            >
                {isCompleted && (
                    <Check size={12} strokeWidth={3} className="text-white" />
                )}
            </div>

            {/* Point de priorité */}
            <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: isCompleted ? '#E5E5E5' : (priorityColor[task.priority] || '#A3A3A3') }}
            />

            {/* Infos de la tâche */}
            <div className="flex-1 flex justify-between items-center min-w-0">
                <div className="truncate pr-4">
                    <div className={`text-[14px] font-bold truncate ${isCompleted ? 'text-[#A3A3A3] line-through' : 'text-[#1A1A1A]'}`}>
                        {task.title}
                    </div>
                    {due && (
                        <div className={`text-[12px] font-medium mt-[2px] truncate ${isCompleted ? 'text-[#A3A3A3] line-through' : 'text-[#737373]'}`}>
                            {courseName ? `${courseName} - ` : ''}{due}
                        </div>
                    )}
                </div>
                {urgent && !isCompleted && (
                    <span className="bg-[#FEF2F2] text-[#EF4444] px-2 py-[2px] rounded-[6px] text-[10px] font-bold shrink-0">
                        Urgent
                    </span>
                )}
            </div>
        </div>
    );
};

interface EventCardProps {
    event: Event;
    courseName?: string;
}

const EventCard = ({ event, courseName }: EventCardProps) => {
    const isExam = event.type === 'EXAM' || event.type === 'EXAMEN';
    
    return (
        <div className={`
            shrink-0 min-w-[240px] max-w-[280px] bg-[#FAF9F6] border rounded-[16px] p-4 
            cursor-pointer hover:bg-white transition-colors shadow-sm
            ${isExam ? 'border-[#991B1B]' : 'border-[#E5E5E5]'}
        `}>
            <div className="flex justify-between items-center mb-4">
                <span className={`px-2 py-[2px] rounded-[6px] text-[10px] font-bold tracking-wider ${eventTypeBadge[event.type] ?? 'bg-[#F3F4F6] text-[#1A1A1A]'}`}>
                    {eventTypeLabel[event.type] ?? event.type}
                </span>
                <span className="text-[12px] font-medium text-[#737373]">
                    {formatTime(event.startDate)} - {formatTime(event.endDate)}
                </span>
            </div>
            <div className="text-[15px] font-bold text-[#1A1A1A] mb-1 truncate">
                {courseName ? `${courseName} ` : ''}{event.title && courseName ? `— ${event.title}` : event.title}
            </div>
            <div className="text-[12px] font-medium text-[#737373] truncate">
                {event.location ? `${event.location} - ` : ''}
                {Math.max(1, Math.round((new Date(event.endDate).getTime() - new Date(event.startDate).getTime()) / (1000 * 60 * 60)))}h
            </div>
        </div>
    );
};

// ─── Page principale ───────────────────────────────────────

export default function DashboardPage() {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const { data: tasks = [], isLoading: tasksLoading } = useTasks();
    const { data: events = [], isLoading: eventsLoading } = useEvents();
    const { data: courses = [] } = useCourses();
    const { data: grades = [] } = useGrades();
    const { mutate: updateTask } = useUpdateTask();

    const courseDict = useMemo(
        () =>
            courses.reduce((acc, c) => {
                acc[c.id] = c.name;
                return acc;
            }, {} as Record<string, string>),
        [courses]
    );

    const todayEvents = useMemo(
        () =>
            events
                .filter(isTodayEvent)
                .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()),
        [events]
    );

    const activeTasks = useMemo(
        () =>
            tasks
                .filter((t) => !t.isDeleted && t.status !== 'COMPLETED' && t.status !== 'CANCELED')
                .sort((a, b) => (priorityOrder[a.priority] ?? 3) - (priorityOrder[b.priority] ?? 3)),
        [tasks]
    );

    // Calculs de moyennes et de risques — entièrement dynamiques
    const { overallAverage, riskCoursesCount } = useDashboardStats(grades, courses);

    const dateFormatted = useMemo(() => dateFormatter.format(new Date()), []);

    const handleComplete = useCallback(
        (id: string) => {
            const task = tasks.find((t) => t.id === id);
            if (!task) return;
            updateTask({
                id,
                payload: {
                    status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED',
                },
            });
        },
        [tasks, updateTask]
    );

    return (
        <div className="max-w-[800px] mx-auto flex flex-col px-4 md:px-0 pb-20 pt-2 md:pt-6">

            {/* ── HERO ── */}
            <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-6 md:p-8 mb-8 mt-2 md:mt-5 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="text-[11px] font-bold text-[#737373] mb-2 capitalize">
                            {dateFormatted}
                        </div>
                        <div className="text-[26px] font-bold text-[#1A1A1A] tracking-tight mb-2">
                            Bonjour, {user?.name?.split(' ')[0] ?? 'Lucas'} !
                        </div>
                        <div className="text-[14px] font-medium text-[#1A1A1A]">
                            Tu as <span className="font-bold">{todayEvents.length} events</span> aujourd'hui et <span className="font-bold">{activeTasks.length} tâches</span> en cours.
                        </div>
                    </div>
                    
                    <div className="flex gap-6 items-center w-full md:w-auto md:pt-4">
                        <div className="text-center flex-1 md:flex-none">
                            <div className="text-[24px] font-bold text-[#1A1A1A] leading-none mb-[2px]">
                                {overallAverage !== null ? overallAverage.toFixed(1) : '—'}
                            </div>
                            <div className="text-[11px] font-bold text-[#737373] uppercase tracking-wide">
                                Moy. générale
                            </div>
                        </div>
                        <div className="w-[1px] h-10 bg-[#E5E5E5]" />
                        <div className="text-center flex-1 md:flex-none">
                            <div className="text-[24px] font-bold text-[#EF4444] leading-none mb-[2px]">
                                {riskCoursesCount}
                            </div>
                            <div className="text-[11px] font-bold text-[#737373] uppercase tracking-wide">
                                Cours à risque
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── EVENTS DU JOUR ── */}
            <div className="mb-6">
                <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-4 ml-1">
                    Aujourd'hui
                </div>
                
                <div className="min-h-[136px]">
                {eventsLoading ? (
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="min-w-[240px] h-[120px] bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] animate-pulse shrink-0" />
                        ))}
                    </div>
                ) : todayEvents.length === 0 ? (
                    <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-6 text-center shadow-sm min-h-[120px] flex flex-col justify-center">
                        <div className="flex justify-center mb-2 opacity-30">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 14h.01"/><path d="M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
                        </div>
                        <div className="text-[14px] font-bold text-[#1A1A1A]">Aucun événement aujourd'hui</div>
                        <div className="text-[12px] font-medium text-[#737373]">Profites-en pour avancer sur tes tâches.</div>
                    </div>
                ) : (
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                        {todayEvents.map((event) => (
                            <EventCard 
                                key={event.id} 
                                event={event} 
                                courseName={event.courseId ? courseDict[event.courseId] : undefined}
                            />
                        ))}
                    </div>
                )}
                </div>
            </div>

            {/* ── TACHES ── */}
            <div className="bg-[#FAF9F6] rounded-[16px] border border-[#E5E5E5] p-6 shadow-sm">
                
                <div className="flex justify-between items-center mb-2">
                    <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest">
                        Tâches en cours
                    </div>
                    <button
                        onClick={() => navigate('/tasks')}
                        className="text-[12px] font-bold text-[#737373] hover:text-[#1A1A1A] transition-colors flex items-center gap-1"
                    >
                        Voir tout <ArrowRight size={14} />
                    </button>
                </div>

                <div className="flex flex-col">
                    {tasksLoading ? (
                        <div className="flex flex-col gap-4 py-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-4 w-full bg-[#E5E5E5] rounded animate-pulse" />
                            ))}
                        </div>
                    ) : activeTasks.length === 0 ? (
                        <div className="text-center py-6">
                            <div className="text-[13px] font-bold text-[#1A1A1A] mb-1">Tout est à jour !</div>
                            <div className="text-[12px] font-medium text-[#737373]">Tu n'as aucune tâche en attente.</div>
                        </div>
                    ) : (
                        activeTasks.slice(0, 5).map((task, idx) => {
                            const isLast = idx === Math.min(activeTasks.length, 5) - 1;
                            return (
                                <TaskRow 
                                    key={task.id} 
                                    task={task} 
                                    courseName={task.courseId ? courseDict[task.courseId] : undefined}
                                    onComplete={handleComplete}
                                    isLast={isLast}
                                />
                            );
                        })
                    )}
                </div>

            </div>

        </div>
    );
}
````

## File: frontend/src/pages/Profile/ProfilePage.tsx
````typescript
import { useState, useEffect } from 'react';
import { isAxiosError } from 'axios';
import { useAuthStore } from '../../stores/authStore';
import { apiClient } from '../../api/client';

// ─── Hook install PWA ──────────────────────────────────────

const usePwaInstall = () => {
    const [prompt, setPrompt] = useState<Event & { prompt?: () => void } | null>(null);
    const [installed, setInstalled] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setPrompt(e as Event & { prompt?: () => void });
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const install = async () => {
        if (!prompt?.prompt) return;
        prompt.prompt();
        setInstalled(true);
        setPrompt(null);
    };

    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);

    return { canInstall: !!prompt, install, installed, isIos };
};

// ─── Section : Informations personnelles ──────────────────

const PersonalInfoSection = () => {
    const { user, updateUser } = useAuthStore();
    const [form, setForm] = useState({
        name: user?.name ?? '',
        email: user?.email ?? '',
        language: user?.language ?? 'fr',
        timezone: 'UTC+2'
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setIsLoading(true);

        try {
            const { data } = await apiClient.put('/updateprofile', form);
            updateUser(data.data);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            if (isAxiosError(err)) {
                setError(err.response?.data?.error?.message ?? 'Une erreur est survenue.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#FAF9F6] rounded-[16px] border border-[#E5E5E5] p-6">
            <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-6">
                Informations personnelles
            </div>

            {/* Avatar section */}
            <div className="flex items-center gap-5 mb-8">
                <div className="w-[64px] h-[64px] rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center text-[24px] font-bold text-[#1A1A1A] shrink-0">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                    <div className="text-[15px] font-bold text-[#1A1A1A]">{user?.name}</div>
                    <div className="text-[13px] font-medium text-[#737373] mb-1">{user?.email}</div>
                    <button type="button" className="border border-[#E5E5E5] rounded-[8px] bg-transparent px-3 py-1 text-[11px] font-bold text-[#1A1A1A] hover:bg-white transition-colors mt-0.5">
                        Changer la photo
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex-1">
                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                            Nom complet
                        </label>
                        <input
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none bg-white focus:border-[#A3A3A3] transition-colors shadow-sm"
                        />
                    </div>

                    <div className="flex-1">
                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                            Email
                        </label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none bg-white focus:border-[#A3A3A3] transition-colors shadow-sm"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex-1 relative">
                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                            Langue
                        </label>
                        <select 
                            value={form.language}
                            onChange={(e) => setForm({ ...form, language: e.target.value })}
                            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none bg-white appearance-none cursor-pointer focus:border-[#A3A3A3] transition-colors shadow-sm"
                        >
                            <option value="fr">Français</option>
                            <option value="en">Anglais</option>
                        </select>
                        <div className="absolute right-4 top-[38px] pointer-events-none text-[#737373]">
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                            Fuseau horaire
                        </label>
                        <select 
                            value={form.timezone}
                            onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none bg-white appearance-none cursor-pointer focus:border-[#A3A3A3] transition-colors shadow-sm"
                        >
                            <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                            <option value="UTC">UTC</option>
                            <option value="America/New_York">America/New_York (EST)</option>
                        </select>
                        <div className="absolute right-4 top-[38px] pointer-events-none text-[#737373]">
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>

                {error && <div className="text-[12px] font-bold text-[#EF4444] mt-1">{error}</div>}
                {success && <div className="text-[12px] font-bold text-[#10B981] mt-1">Profil mis à jour avec succès.</div>}

                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="h-10 px-5 rounded-xl border border-[#E5E5E5] text-[14px] font-bold text-[#1A1A1A] bg-transparent hover:bg-white transition-colors flex items-center justify-center min-w-[120px]"
                    >
                        {isLoading ? <span className="w-4 h-4 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin" /> : 'Enregistrer'}
                    </button>
                </div>
            </form>
        </div>
    );
};

// ─── Section : Sécurité ────────────────────────────────────

const SecuritySection = () => {
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (form.newPassword !== form.confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }
        if (form.newPassword.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères.');
            return;
        }

        setIsLoading(true);
        try {
            await apiClient.put('/updateprofile', {
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
            });
            setSuccess(true);
            setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            if (isAxiosError(err)) {
                setError(err.response?.data?.error?.message ?? 'Une erreur est survenue.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#FAF9F6] rounded-[16px] border border-[#E5E5E5] p-6">
            <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-6">
                Sécurité
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                    <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                        Mot de passe actuel
                    </label>
                    <input
                        type="password"
                        value={form.currentPassword}
                        onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                        placeholder="••••••••"
                        required
                        className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[16px] font-mono tracking-[0.2em] text-[#A3A3A3] outline-none bg-white focus:border-[#A3A3A3] focus:text-[#1A1A1A] transition-colors shadow-sm placeholder:tracking-[0.2em] placeholder:text-[#D4D4D4] pt-1"
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex-1">
                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                            Nouveau mot de passe
                        </label>
                        <input
                            type="password"
                            value={form.newPassword}
                            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                            placeholder="••••••••"
                            required
                            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[16px] font-mono tracking-[0.2em] text-[#A3A3A3] outline-none bg-white focus:border-[#A3A3A3] focus:text-[#1A1A1A] transition-colors shadow-sm placeholder:tracking-[0.2em] placeholder:text-[#D4D4D4] pt-1"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                            Confirmer
                        </label>
                        <input
                            type="password"
                            value={form.confirmPassword}
                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                            placeholder="••••••••"
                            required
                            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[16px] font-mono tracking-[0.2em] text-[#A3A3A3] outline-none bg-white focus:border-[#A3A3A3] focus:text-[#1A1A1A] transition-colors shadow-sm placeholder:tracking-[0.2em] placeholder:text-[#D4D4D4] pt-1"
                        />
                    </div>
                </div>

                {error && <div className="text-[12px] font-bold text-[#EF4444] mt-1">{error}</div>}
                {success && <div className="text-[12px] font-bold text-[#10B981] mt-1">Mot de passe modifié avec succès.</div>}

                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="h-10 px-5 rounded-xl border border-[#E5E5E5] text-[14px] font-bold text-[#1A1A1A] bg-transparent hover:bg-white transition-colors flex items-center justify-center min-w-[200px]"
                    >
                        {isLoading ? <span className="w-4 h-4 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin" /> : 'Changer le mot de passe'}
                    </button>
                </div>
            </form>
        </div>
    );
};

// ─── Section : Notifications ───────────────────────────────

const NotificationsSection = () => {
    const [settings, setSettings] = useState({
        examReminder: false,
        lateTasks: false,
        highRisk: false,
        weeklySummary: false,
    });
    
    const [permissionStatus, setPermissionStatus] = useState(
        'Notification' in window ? Notification.permission : 'denied'
    );

    const toggle = async (key: keyof typeof settings) => {
        if (!settings[key] && permissionStatus !== 'granted') {
            if ('Notification' in window) {
                const result = await Notification.requestPermission();
                setPermissionStatus(result);
                if (result !== 'granted') return;
            } else {
                alert("Ce navigateur ne supporte pas les notifications desktop.");
                return;
            }
        }
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
        
        // Exemple de scheduling direct d'une notification de test (10 sec plus tard)
        if (!settings[key] && permissionStatus === 'granted') {
            // (import dynamically or use window for tests)
            try {
                const reg = await navigator.serviceWorker.ready;
                // Si showTrigger est dispo
                if ('showTrigger' in Notification.prototype) {
                    await reg.showNotification('Notifications Activées !', {
                        body: `L'alerte "${key}" est active.`,
                        icon: '/pwa-192x192.png',
                        // @ts-ignore
                        showTrigger: new (window.TimestampTrigger as any)(Date.now() + 5000)
                    });
                } else {
                    // Fallback local timeout si app ouverte
                    setTimeout(() => {
                        reg.showNotification('Notifications Activées !', {
                            body: `L'alerte "${key}" est active.`,
                            icon: '/pwa-192x192.png',
                        });
                    }, 5000);
                }
            } catch (e) {
                console.warn('Erreur test notification locale:', e);
            }
        }
    };

    const items = [
        {
            key: 'examReminder' as const,
            label: 'Rappel avant un examen',
            sub: '24h et 1h avant',
        },
        {
            key: 'lateTasks' as const,
            label: 'Tâches en retard',
            sub: 'Notification quotidienne',
        },
        {
            key: 'highRisk' as const,
            label: 'Cours à risque élevé',
            sub: 'Quand le score dépasse HIGH',
        },
        {
            key: 'weeklySummary' as const,
            label: 'Résumé hebdomadaire',
            sub: 'Chaque lundi matin',
        },
    ];

    return (
        <div className="bg-[#FAF9F6] rounded-[16px] border border-[#E5E5E5] p-6">
            <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2">
                Notifications
            </div>

            <div className="flex flex-col">
                {items.map((item, i) => (
                    <div
                        key={item.key}
                        className={`flex justify-between items-center py-4 ${i < items.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}
                    >
                        <div>
                            <div className="text-[14px] font-bold text-[#1A1A1A]">{item.label}</div>
                            <div className="text-[12px] font-medium text-[#737373] mt-0.5">{item.sub}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={settings[item.key]}
                                onChange={() => toggle(item.key)}
                            />
                            <div className="w-[44px] h-[24px] bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Section : Statistiques ────────────────────────────────

const StatsSection = () => {
    const { user } = useAuthStore();

    const stats = [
        { label: 'Tâches complétées', value: '47' },
        { label: 'Sessions Pomodoro', value: '23' },
        { label: 'Cours suivis', value: '6' },
        {
            label: 'Membre depuis', value: user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString('fr-FR', {
                    month: 'short', year: 'numeric',
                }).replace('.', '')
                : '—'
        },
        { label: 'Dernière synchronisation', value: 'il y a 2 min' },
    ];

    return (
        <div className="bg-[#FAF9F6] rounded-[16px] border border-[#E5E5E5] p-6">
            <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-1">
                Statistiques du compte
            </div>

            <div className="flex flex-col">
                {stats.map((s, i) => (
                    <div
                        key={s.label}
                        className={`flex justify-between items-center py-3.5 ${i < stats.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}
                    >
                        <span className="text-[13px] font-bold text-[#737373]">{s.label}</span>
                        <span className="text-[14px] font-bold text-[#1A1A1A]">{s.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Section : PWA Install ─────────────────────────────────

const PwaSection = () => {
    const { canInstall, install, installed, isIos } = usePwaInstall();

    return (
        <div className="bg-[#FAF9F6] rounded-[16px] border border-[#E5E5E5] p-6">
            <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-5">
                Application
            </div>

            <div className="flex items-center gap-4">
                <div className="w-[50px] h-[50px] rounded-[12px] bg-[#1A1A1A] flex items-center justify-center text-white text-[16px] font-bold shrink-0 tracking-tighter">
                    SF
                </div>
                <div className="flex-1">
                    <div className="text-[14px] font-bold text-[#1A1A1A] mb-0.5">
                        Installer l'application
                    </div>
                    <div className="text-[12px] font-medium text-[#737373]">
                        Accédez à l'app depuis ton bureau ou écran d'accueil
                    </div>
                </div>
                {installed ? (
                    <span className="bg-[#E5E5E5] text-[#1A1A1A] px-2 py-1 rounded-[6px] text-[11px] font-bold border border-[#D4D4D4]">Installée</span>
                ) : isIos ? (
                    <span className="text-[11px] font-bold text-[#737373] max-w-[120px] text-right leading-tight">
                        Appuie sur Partager → "Sur l'écran d'accueil"
                    </span>
                ) : canInstall ? (
                    <button onClick={install} className="h-9 px-4 rounded-xl border border-[#E5E5E5] text-[13px] font-bold text-[#1A1A1A] bg-white hover:bg-gray-50 transition-colors shrink-0">
                        Installer
                    </button>
                ) : (
                    <span className="text-[12px] font-bold text-[#A3A3A3]">Déjà installée</span>
                )}
            </div>
        </div>
    );
};

// ─── Section : Danger zone ─────────────────────────────────

const DangerZone = () => {
    const [confirm, setConfirm] = useState(false);

    return (
        <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-[16px] p-6 mb-8 relative">
            <div className="text-[11px] font-bold text-[#EF4444] uppercase tracking-widest mb-6">
                Zone dangereuse
            </div>

            <div className="flex justify-between items-center">
                <div>
                    <div className="text-[14px] font-bold text-[#EF4444]">
                        Supprimer mon compte
                    </div>
                    <div className="text-[12px] font-medium text-[#EF4444]/80 mt-1">
                        Toutes les données seront supprimées définitivement
                    </div>
                </div>
                {confirm ? (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setConfirm(false)}
                            className="h-10 px-4 rounded-xl text-[13px] font-bold text-[#1A1A1A] bg-transparent hover:bg-[#F3F4F6] transition-colors"
                        >
                            Annuler
                        </button>
                        <button className="h-10 px-4 rounded-xl border border-[#FECACA] text-[13px] font-bold text-[#EF4444] bg-[#FEE2E2] hover:bg-[#FECACA] transition-colors shadow-sm">
                            Confirmer
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setConfirm(true)}
                        className="h-10 px-5 rounded-xl border border-[#FECACA] text-[14px] font-bold text-[#EF4444] bg-transparent hover:bg-[#FEE2E2] transition-colors"
                    >
                        Supprimer
                    </button>
                )}
            </div>

            {/* Simulated scroll arrow icon from design snippet positioned at center bottom layout roughly */}
            <div className="absolute -bottom-[22px] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center text-[#737373] shadow-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V20M12 20L5 13M12 20L19 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    );
};

// ─── Page principale ───────────────────────────────────────

export default function ProfilePage() {
    return (
        <div className="max-w-[700px] mx-auto flex flex-col gap-5 px-2 md:px-0 pt-2 pb-16">
            {/* Header */}
            <div className="flex justify-between items-center mb-1">
                <h1 className="text-[22px] font-bold text-[#1A1A1A] tracking-tight">Mon profil</h1>
                <button className="text-[24px] font-bold text-[#A3A3A3] hover:text-[#1A1A1A] transition-colors leading-[0.5] pb-2 px-1 tracking-widest cursor-pointer">
                    ...
                </button>
            </div>

            <PersonalInfoSection />
            <SecuritySection />
            <NotificationsSection />
            <StatsSection />
            <PwaSection />
            <DangerZone />
        </div>
    );
}
````

## File: frontend/src/pages/Risk/RiskPage.tsx
````typescript
import { useNavigate } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { PartyPopper, BookOpen } from 'lucide-react';
import { riskApi } from '../../api/risk.api';
import { useCourses } from '../../hooks/useCourses';
import { riskKeys, useRisk } from '../../hooks/useRisks';
import type { Course, RiskAnalysis } from '../../types';

// ─── Styles et Couleurs ───────────────────────────────────

const riskTheme: Record<string, { container: string; score: string; badge: string }> = {
    CRITICAL: {
        container: 'bg-[#FAF5FF] border-[#E9D5FF]',
        score: 'text-[#A855F7]',
        badge: 'bg-[#F3E8FF] text-[#A855F7]',
    },
    HIGH: {
        container: 'bg-[#FEF2F2] border-[#FECACA]',
        score: 'text-[#EF4444]',
        badge: 'bg-[#FEE2E2] text-[#EF4444]',
    },
    MEDIUM: {
        container: 'bg-[#FAF9F6] border-[#E5E5E5]',
        score: 'text-[#F59E0B]',
        badge: 'bg-[#FEF3C7] text-[#92400E]',
    },
    LOW: {
        container: 'bg-[#FAF9F6] border-[#E5E5E5]',
        score: 'text-[#10B981]',
        badge: 'bg-[#D1FAE5] text-[#047857]',
    },
};

const getFactorStyle = (val: number) => {
    if (val >= 85) return { bg: '#EF4444', text: 'text-[#EF4444]' };
    if (val >= 40) return { bg: '#F59E0B', text: 'text-[#F59E0B]' };
    return { bg: '#10B981', text: 'text-[#10B981]' };
};

// ─── Carte risque par cours ────────────────────────────────

interface RiskCardProps {
    course: Course;
    onClick: () => void;
}

const RiskCard = ({ course, onClick }: RiskCardProps) => {
    const { data: risk, isLoading } = useRisk(course.id);

    if (isLoading) {
        return <div className="h-[72px] bg-[#FAF9F6] border border-[#E5E5E5] rounded-[16px] animate-pulse" />;
    }

    if (!risk) {
        return (
            <div
                onClick={onClick}
                className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[16px] p-5 cursor-pointer hover:bg-white transition-colors"
            >
                <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full" style={{ background: course.color }} />
                    <span className="text-[15px] font-bold text-[#1A1A1A]">{course.name}</span>
                </div>
                <div className="text-[12px] font-medium text-[#A3A3A3] mt-1 ml-6">Données insuffisantes</div>
            </div>
        );
    }

    const theme = riskTheme[risk.level] ?? riskTheme.LOW;

    const factors = [
        { label: 'Performance', val: risk.details.performance },
        { label: 'Procrastination', val: risk.details.procrastination },
        { label: 'Pression examen', val: risk.details.pressure },
    ];

    return (
        <div
            onClick={onClick}
            className={`${theme.container} border rounded-[16px] p-5 cursor-pointer hover:opacity-90 transition-opacity`}
        >
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full" style={{ background: course.color }} />
                    <span className="text-[15px] font-bold text-[#1A1A1A]">{course.name}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`text-[16px] font-bold ${theme.score}`}>
                        {risk.overallScore}
                    </span>
                    <span className={`px-2 py-0.5 rounded-[6px] text-[10px] font-bold uppercase tracking-wider ${theme.badge}`}>
                        {risk.level}
                    </span>
                </div>
            </div>

            {/* Facteurs (Barres) - Caché si LOW */}
            {risk.level !== 'LOW' && (
                <div className="mt-5 flex flex-col gap-3 ml-1 mr-1">
                    {factors.map((f) => {
                        const facStyle = getFactorStyle(f.val);
                        return (
                            <div key={f.label} className="flex items-center gap-4">
                                <span className="text-[12px] font-medium text-[#737373] w-[130px] shrink-0">
                                    {f.label}
                                </span>
                                <div className="flex-1 h-[5px] bg-white/60 rounded-full overflow-hidden relative">
                                    <div
                                        className="absolute top-0 bottom-0 left-0 rounded-full"
                                        style={{ width: `${f.val}%`, backgroundColor: facStyle.bg }}
                                    />
                                </div>
                                <span className={`text-[12px] font-bold w-[28px] text-right shrink-0 ${facStyle.text}`}>
                                    {f.val}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

// ─── Résumé global ─────────────────────────────────────────

interface GlobalSummaryProps {
    risks: (RiskAnalysis | undefined)[];
}

const GlobalSummary = ({ risks }: GlobalSummaryProps) => {
    const defined = risks.filter((r): r is RiskAnalysis => !!r);
    
    // Si aucun risque, on affiche des 0 pour la maquette vide
    const avg = defined.length > 0 ? Math.round(defined.reduce((sum, r) => sum + r.overallScore, 0) / defined.length) : 0;

    const counts = {
        CRITICAL_HIGH: defined.filter((r) => r.level === 'CRITICAL' || r.level === 'HIGH').length,
        MEDIUM: defined.filter((r) => r.level === 'MEDIUM').length,
        LOW: defined.filter((r) => r.level === 'LOW').length,
    };

    return (
        <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[16px] p-6 mb-8 mt-6 shadow-sm">
            <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-8">
                Vue globale
            </div>

            <div className="flex justify-between items-center sm:px-6 mb-8">
                <div className="flex-1 flex flex-col items-center">
                    <div className="text-[26px] font-bold text-[#1A1A1A] leading-none mb-2">{avg}</div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-[#737373] uppercase tracking-wider text-center">Score global</div>
                </div>
                <div className="w-[1px] h-12 bg-[#E5E5E5]" />
                <div className="flex-1 flex flex-col items-center">
                    <div className="text-[26px] font-bold text-[#EF4444] leading-none mb-2">{counts.CRITICAL_HIGH}</div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-[#737373] uppercase tracking-wider text-center">Cours HIGH+</div>
                </div>
                <div className="w-[1px] h-12 bg-[#E5E5E5]" />
                <div className="flex-1 flex flex-col items-center">
                    <div className="text-[26px] font-bold text-[#F59E0B] leading-none mb-2">{counts.MEDIUM}</div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-[#737373] uppercase tracking-wider text-center">Cours MEDIUM</div>
                </div>
                <div className="w-[1px] h-12 bg-[#E5E5E5]" />
                <div className="flex-1 flex flex-col items-center">
                    <div className="text-[26px] font-bold text-[#10B981] leading-none mb-2">{counts.LOW}</div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-[#737373] uppercase tracking-wider text-center">Cours LOW</div>
                </div>
            </div>

            {/* Barre de score globale */}
            <div className="sm:px-2">
                <div className="flex justify-between text-[11px] font-bold mb-2">
                    <span className="text-[#737373]">Risque global</span>
                    <span className="text-[#1A1A1A]">{avg} / 100</span>
                </div>
                <div className="h-[6px] w-full rounded-full bg-gradient-to-r from-[#10B981] via-[#F59E0B] to-[#EF4444] relative overflow-hidden">
                    <div 
                        className="absolute right-0 top-0 bottom-0 bg-[#E5E5E5] transition-all duration-700 ease-out" 
                        style={{ width: `${Math.max(0, 100 - avg)}%` }} 
                    />
                </div>
                <div className="flex justify-between text-[9px] font-bold text-[#1A1A1A] mt-2 uppercase tracking-wide px-0.5">
                    <span>Low</span>
                    <span className="ml-[12%]">Medium</span>
                    <span className="mr-[12%]">High</span>
                    <span>Critical</span>
                </div>
            </div>
        </div>
    );
};

// ─── Conseils prioritaires ────────────────────────────────

interface TipsProps {
    courses: Course[];
    risks: (RiskAnalysis | undefined)[];
}

const Tips = ({ courses, risks }: TipsProps) => {
    // Trier les risques décroissants et prendre les pires (!= LOW)
    const worstRisks = [...risks]
        .filter((r): r is RiskAnalysis => !!r && r.level !== 'LOW')
        .sort((a, b) => b.overallScore - a.overallScore)
        .slice(0, 3)
        .map((r) => ({
            risk: r,
            course: courses.find((c) => c.id === r.courseId),
        }));

    if (worstRisks.length === 0) {
        return (
            <div className="bg-[#FAF9F6] rounded-[16px] border border-[#E5E5E5] p-6 text-center text-[#A3A3A3] mt-8">
                <div className="flex justify-center mb-2">
                    <PartyPopper size={28} className="opacity-40" />
                </div>
                <div className="text-[14px] font-bold">Aucun cours à risque. Tout va bien !</div>
            </div>
        );
    }

    return (
        <div className="bg-[#FAF9F6] rounded-[16px] border border-[#E5E5E5] p-6 mb-8 mt-8 shadow-sm">
            <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-6">
                Conseils prioritaires
            </div>
            
            <div className="flex flex-col">
                {worstRisks.map(({ risk, course }, i) => {
                    const isLast = i === worstRisks.length - 1;
                    
                    // Couleur du point liée au niveau de risque pour attirer l'attention
                    let circleColor = '#EF4444';
                    if (risk.level === 'HIGH') circleColor = '#F97316';
                    if (risk.level === 'MEDIUM') circleColor = '#FBBF24';

                    // Mock générique ressemblant à la maquette
                    let title = `${course?.name || 'Cours'}`;
                    let subTitle = '';
                    let message = '';

                    if (risk.details.pressure >= 70) {
                        subTitle = " — examen dans 2 jours";
                        message = "Concentre-toi sur les révisions maintenant. Toutes les autres tâches peuvent attendre.";
                    } else if (risk.details.procrastination >= 60) {
                        subTitle = " — 4 tâches en attente";
                        message = "Tu accumules du retard. Planifie au moins 1h aujourd'hui.";
                    } else {
                        subTitle = " — moyenne à 11.0";
                        message = "Correcte mais fragile. Un mauvais examen suffit à faire basculer le cours.";
                    }

                    return (
                        <div
                            key={risk.courseId}
                            className={`flex gap-4 py-4 ${!isLast ? 'border-b border-[#E5E5E5]' : ''}`}
                        >
                            <div 
                                className="w-3.5 h-3.5 rounded-full shrink-0 mt-1"
                                style={{
                                    background: `radial-gradient(circle at 30% 30%, ${circleColor}80, ${circleColor})`, 
                                    boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.1)' 
                                }}
                            />
                            <div className="flex-1">
                                <div className="text-[13px] font-bold text-[#1A1A1A] mb-1">
                                    {title}<span className="text-[#1A1A1A]">{subTitle}</span>
                                </div>
                                <div className="text-[12px] font-medium text-[#737373] leading-relaxed">
                                    {message}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// ─── Composant interne de contenu ──────────────────────────

const RiskPageContent = ({
    courses,
    onCourseClick,
}: {
    courses: Course[];
    onCourseClick: (id: string) => void;
}) => {
    const riskQueries = useQueries({
        queries: courses.map((course) => ({
            queryKey: riskKeys.course(course.id),
            queryFn: () => riskApi.getCourseRisk(course.id),
            enabled: !!course.id,
        })),
    });

    const risks = riskQueries.map((query) => query.data);

    // On s'assure que les cours sont ordonnés par risque du plus élevé au moins élevé (en simulant si données pas encore chargées)
    const sortedCourses = [...courses].sort((a, b) => {
        const riskA = risks.find(r => r?.courseId === a.id);
        const riskB = risks.find(r => r?.courseId === b.id);
        return (riskB?.overallScore || 0) - (riskA?.overallScore || 0);
    });

    return (
        <>
            <GlobalSummary risks={risks} />

            <div>
                <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-4">
                    Par cours
                </div>
                <div className="flex flex-col gap-3.5">
                    {sortedCourses.map((course) => (
                        <RiskCard
                            key={course.id}
                            course={course}
                            onClick={() => onCourseClick(course.id)}
                        />
                    ))}
                </div>
            </div>

            <Tips courses={courses} risks={risks} />
        </>
    );
};

// ─── Page principale ───────────────────────────────────────

export default function RiskPage() {
    const navigate = useNavigate();
    const { data: courses = [], isLoading } = useCourses();

    const activeCourses = courses.filter((c) => !c.isDeleted);

    if (isLoading) {
        return (
            <div className="max-w-[800px] mx-auto flex flex-col gap-4 sm:px-2 pt-6">
                <div className="skeleton h-10 w-48 mb-6 bg-[#FAF9F6]" />
                <div className="skeleton h-48 rounded-[16px] bg-[#FAF9F6] border border-[#E5E5E5]" />
                <div className="flex flex-col gap-4 mt-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="skeleton h-28 rounded-[16px] bg-[#FAF9F6] border border-[#E5E5E5]" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[700px] mx-auto flex flex-col sm:px-2 pb-16 pt-2">
            
            {/* Header */}
            <div className="mb-2">
                <h1 className="text-[24px] font-bold text-[#1A1A1A] tracking-tight mb-[2px]">Analyse de risque</h1>
                <p className="text-[12px] font-medium text-[#737373]">
                    Mis à jour il y a 3 min - semestre en cours
                </p>
            </div>

            {activeCourses.length === 0 ? (
                <div className="text-center py-20 border border-[#E5E5E5] rounded-[24px] bg-[#FAF9F6] mt-8 shadow-sm">
                    <div className="flex justify-center mb-4">
                        <BookOpen size={40} className="opacity-20" />
                    </div>
                    <div className="text-[15px] font-bold text-[#1A1A1A] mb-2">Aucun cours trouvé</div>
                    <div className="text-[13px] text-[#737373] max-w-[300px] mx-auto mb-6">Ajoute tes cours pour afficher ton niveau de risque en temps réel.</div>
                    <button
                        onClick={() => navigate('/courses')}
                        className="h-10 px-5 rounded-xl border border-[#E5E5E5] bg-white text-[14px] font-bold text-[#1A1A1A] hover:bg-gray-50 shadow-sm transition-colors"
                    >
                        Aller aux cours
                    </button>
                </div>
            ) : (
                <RiskPageContent
                    courses={activeCourses}
                    onCourseClick={(id) => navigate(`/courses/${id}`)}
                />
            )}

        </div>
    );
}
````

## File: frontend/src/pages/Tasks/TaskPage.tsx
````typescript
import { useState, useEffect } from 'react';
import {
    DndContext,
   type DragEndEvent,
    DragOverlay,
   type DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
    useDroppable,
} from '@dnd-kit/core';
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTasks, useUpdateTask, useCreateTask, useDeleteTask } from '../../hooks/useTasks';
import { useCreateEvent } from '../../hooks/useEvents';
import { useCourses } from '../../hooks/useCourses';
import { usePomodoro } from '../../hooks/usePomodoro';
import { format, isToday, isTomorrow, differenceInDays, startOfWeek, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Task } from '../../types';

// ─── Helpers ──────────────────────────────────────────────

type Column = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';

const columns: { key: Column; label: string; dot: string; border: string; bg: string }[] = [
    { key: 'PENDING', label: 'À faire', dot: '#737373', border: 'border-[#E5E5E5]', bg: 'bg-[#FAF9F6]' },
    { key: 'IN_PROGRESS', label: 'En cours', dot: '#F59E0B', border: 'border-[#F59E0B]', bg: 'bg-[#FAF9F6]' },
    { key: 'COMPLETED', label: 'Terminées', dot: '#10B981', border: 'border-[#E5E5E5]', bg: 'bg-[#FAF9F6]' },
];

const priorityColor: Record<string, string> = {
    CRITICAL: '#8B5CF6',
    HIGH: '#EF4444',
    MEDIUM: '#F59E0B',
    LOW: '#10B981',
};

function formatDueDate(dueDateStr: string | null) {
    if (!dueDateStr) return null;
    const date = new Date(dueDateStr);
    if (isToday(date)) return "aujourd'hui";
    if (isTomorrow(date)) return "demain";
    const diff = differenceInDays(date, new Date());
    if (diff > 0 && diff < 15) return `dans ${diff}j`;
    return format(date, 'd MMM', { locale: fr });
}

function getDueDateColor(dueDateStr: string | null) {
    if (!dueDateStr) return 'text-[#737373]';
    const diff = differenceInDays(new Date(dueDateStr), new Date());
    if (diff < 0) return 'text-[#EF4444]'; // en retard
    if (diff <= 2) return 'text-[#EF4444]'; // bientôt (rouge)
    return 'text-[#737373]'; // gris
}

// ─── Composant carte tâche draggable ──────────────────────

interface TaskCardProps {
    task: Task;
    courseName?: string;
    onSelect: (task: Task) => void;
    isSelected: boolean;
}

const TaskCard = ({ task, courseName, onSelect, isSelected }: TaskCardProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging,
    } = useSortable({ id: task.id });

    const isCompleted = task.status === 'COMPLETED';
    let opacity = isDragging ? 0.3 : 1;

    // Effet de fondu progressif les 2 dernières secondes avant de disparaître
    if (isCompleted && task.completedAt) {
        const diff = Date.now() - new Date(task.completedAt).getTime();
        if (diff > 8000) {
            opacity = Math.max(0, (10000 - diff) / 2000);
        }
    }

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: 'all 0.2s ease',
        opacity: opacity,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => onSelect(task)}
            className={`
                bg-white rounded-[16px] p-4 mb-3 border cursor-grab active:cursor-grabbing select-none transition-shadow hover:shadow-sm
                ${isSelected ? 'ring-2 ring-blue-500 border-transparent' : task.status === 'IN_PROGRESS' ? 'border-[#F59E0B]' : 'border-[#E5E5E5]'}
            `}
        >
            {/* Haut : Titre + Dot + Temps */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2.5">
                    {isCompleted ? (
                        <div className="w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center shrink-0">
                            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 14 14" fill="none">
                                <path d="M2 7L6 11L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    ) : (
                        <div 
                            className="w-2.5 h-2.5 rounded-full shrink-0" 
                            style={{ background: priorityColor[task.priority] || '#A3A3A3' }} 
                        />
                    )}
                    <div className={`text-[14px] font-bold mt-0.5 leading-tight ${isCompleted ? 'text-[#A3A3A3] line-through' : 'text-[#1A1A1A]'}`}>
                        {task.title}
                    </div>
                </div>
                {task.timeSpentMinutes > 0 && (
                    <div className="text-[11px] font-medium text-[#A3A3A3] shrink-0 whitespace-nowrap ml-2 mt-0.5">
                        <span className="mr-1">⏱</span>{task.timeSpentMinutes}min
                    </div>
                )}
            </div>
            
            {/* Bas : Tags + Date */}
            <div className="flex items-center justify-between">
                <div className={`px-2.5 py-1 rounded-[6px] text-[11px] font-bold ${isCompleted ? 'bg-[#FAF9F6] text-[#A3A3A3]' : 'bg-[#FAF9F6] text-[#737373]'}`}>
                    {courseName || 'Général'}
                </div>
                {task.dueDate && !isCompleted && (
                    <div className={`text-[11px] font-bold ${getDueDateColor(task.dueDate)}`}>
                        {formatDueDate(task.dueDate)}
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Colonne droppable ────────────────────────────────────

interface KanbanColumnProps {
    column: typeof columns[number];
    tasks: Task[];
    courses: Record<string, string>;
    onSelect: (task: Task) => void;
    selectedTaskId: string | null;
    onAddTask: (status: Column) => void;
}

const KanbanColumn = ({
    column,
    tasks,
    courses,
    onSelect,
    selectedTaskId,
    onAddTask,
}: KanbanColumnProps) => {
    const { setNodeRef } = useDroppable({ id: column.key });

    return (
        <div className={`flex flex-col flex-1 min-w-[300px] rounded-[24px] border border-[#E5E5E5] p-2.5 pt-4 ${column.bg}`}>
            
            {/* Header colonne */}
            <div className="flex items-center gap-2 mb-4 px-3">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: column.dot }} />
                <span className="text-[15px] font-bold text-[#1A1A1A]">{column.label}</span>
                <span className="bg-white border border-[#E5E5E5] text-xs font-bold text-[#1A1A1A] px-2 py-0.5 rounded-full ml-1">
                    {tasks.length}
                </span>
            </div>

            {/* Cartes */}
            <div ref={setNodeRef} className="flex flex-col flex-1 min-h-[150px] overflow-y-auto scrollbar-hide px-1">
                <SortableContext
                    items={tasks.map((t) => t.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            courseName={task.courseId ? courses[task.courseId] : undefined}
                            onSelect={onSelect}
                            isSelected={selectedTaskId === task.id}
                        />
                    ))}
                </SortableContext>

                <button 
                    onClick={() => onAddTask(column.key)}
                    className="w-full py-3 rounded-[12px] border border-[#E5E5E5] text-[14px] font-medium text-[#737373] mt-2 mb-2 bg-transparent hover:bg-white transition-colors"
                >
                    + Ajouter
                </button>
            </div>
        </div>
    );
};

// ─── Pomodoro widget ──────────────────────────────────────
// (Gardé mais stylisé discrètement pour s'intégrer)

interface PomodoroWidgetProps {
    taskId: string | null;
    taskTitle: string | null;
}

const PomodoroWidget = ({ taskId, taskTitle }: PomodoroWidgetProps) => {
    const {
        phase,
        formatted,
        progress,
        isRunning,
        sessions,
        start,
        pause,
        reset,
        skip,
    } = usePomodoro(taskId);

    return (
        <div className="bg-white rounded-[24px] border border-[#E5E5E5] p-6 flex flex-col items-center gap-4 sticky top-6 shadow-sm">
            <div className="text-center w-full">
                <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2">
                    {phase === 'work' ? 'Travail' : 'Pause'}
                </div>
                {taskTitle ? (
                    <div className="text-[14px] font-bold text-[#1A1A1A] truncate w-full">
                        {taskTitle}
                    </div>
                ) : (
                    <div className="text-[14px] font-medium text-[#A3A3A3]">
                        Sélectionne une tâche
                    </div>
                )}
            </div>

            <div className="relative w-32 h-32 my-2">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50" cy="50" r="44"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        className="text-[#F1F1F1]"
                    />
                    <circle
                        cx="50" cy="50" r="44"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeDasharray={`${2 * Math.PI * 44}`}
                        strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`}
                        strokeLinecap="round"
                        className={phase === 'work' ? 'text-[#1A1A1A]' : 'text-[#10B981]'}
                        style={{ transition: 'stroke-dashoffset 1s linear' }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[26px] font-bold text-[#1A1A1A] tabular-nums tracking-tight">
                        {formatted}
                    </span>
                </div>
            </div>

            <div className="text-[12px] font-medium text-[#737373]">
                {sessions} session{sessions !== 1 ? 's' : ''} complétée{sessions !== 1 ? 's' : ''}
            </div>

            <div className="flex gap-2 w-full mt-2">
                <button onClick={reset} className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#FAF9F6] border border-[#E5E5E5] text-[#737373] hover:bg-gray-50 text-lg">↺</button>
                <button
                    onClick={isRunning ? pause : start}
                    disabled={!taskId}
                    className="flex-1 h-10 rounded-xl bg-white border border-[#E5E5E5] text-[#1A1A1A] text-[14px] font-bold hover:bg-gray-50 shadow-sm disabled:opacity-50"
                >
                    {isRunning ? 'Pause' : 'Démarrer'}
                </button>
                <button onClick={skip} className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#FAF9F6] border border-[#E5E5E5] text-[#737373] hover:bg-gray-50 text-xl">⏭</button>
            </div>
        </div>
    );
};

// ─── Modal détail tâche ───────────────────────────────────

interface TaskModalProps {
    task: Task;
    onClose: () => void;
    onUpdate: (id: string, payload: Partial<Task>) => void;
    onDelete: (id: string) => void;
}

const TaskModal = ({ task, onClose, onUpdate, onDelete }: TaskModalProps) => {
    const [title, setTitle] = useState(task.title);
    const [priority, setPriority] = useState(task.priority);
    const [status, setStatus] = useState(task.status);
    const [dueDate, setDueDate] = useState(
        task.dueDate ? task.dueDate.slice(0, 16) : ''
    );

    const handleSave = () => {
        onUpdate(task.id, {
            title,
            priority,
            status,
            dueDate: dueDate ? new Date(dueDate).toISOString() : null,
            completedAt: status === 'COMPLETED' 
                ? (task.status === 'COMPLETED' ? task.completedAt : new Date().toISOString()) 
                : null
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[24px] p-8 w-full max-w-[440px] shadow-2xl relative">
                <h2 className="text-[22px] font-bold text-[#1A1A1A] mb-6">Modifier la tâche</h2>
                
                <div className="flex flex-col gap-5">
                    <div>
                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">Titre</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">Priorité</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value as Task['priority'])}
                                className="w-full h-11 px-3 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none bg-transparent"
                            >
                                <option value="LOW">Faible</option>
                                <option value="MEDIUM">Moyenne</option>
                                <option value="HIGH">Haute</option>
                                <option value="CRITICAL">Critique</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">Statut</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as Task['status'])}
                                className="w-full h-11 px-3 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none bg-transparent"
                            >
                                <option value="PENDING">À faire</option>
                                <option value="IN_PROGRESS">En cours</option>
                                <option value="COMPLETED">Terminée</option>
                                <option value="CANCELED">Annulée</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">Échéance</label>
                        <input
                            type="datetime-local"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none"
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center mt-8 pt-4 border-t border-[#E5E5E5]">
                    <button 
                        onClick={() => {
                            if (confirm('Supprimer cette tâche ?')) {
                                onDelete(task.id);
                                onClose();
                            }
                        }}
                        className="text-[13px] font-bold text-[#EF4444] hover:opacity-70 px-2"
                    >
                        Supprimer
                    </button>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] text-[14px] font-bold text-[#1A1A1A] bg-white hover:bg-gray-50">
                            Annuler
                        </button>
                        <button onClick={handleSave} className="px-5 py-2.5 rounded-xl border border-[#1A1A1A] text-[14px] font-bold text-white bg-[#1A1A1A]">
                            Enregistrer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Page principale ───────────────────────────────────────

export default function TasksPage() {
    const { data: tasks = [], isLoading } = useTasks();
    const { data: courses = [] } = useCourses();
    const { mutate: updateTask } = useUpdateTask();
    const { mutate: createTask, isPending: isCreating } = useCreateTask();
    const { mutate: deleteTask } = useDeleteTask();
    const { mutate: createEvent, isPending: isCreatingEvent } = useCreateEvent();

    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [pomodoroTask, setPomodoroTask] = useState<Task | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [quickInput, setQuickInput] = useState('');
    const [showModal, setShowModal] = useState(false);

    // ─── Parsing universel ───────────────────────────────────
    const parseSmartInput = (text: string) => {
        if (!text.trim()) return null;

        let type: 'TASK' | 'EVENT' = 'TASK';
        let dueDate: string | null = null;
        let endDate: string | null = null;
        let recurrence: string | null = null;
        
        const base = new Date();
        const lowerText = text.toLowerCase();

        // ─── Type ─────────────────────────────────────────────
        if (/(cours|examen|interro|tp|td|réunion|rdv|rendez-vous|meet|planning|agenda|soirée|déjeuner|midi|sport)/i.test(lowerText)) {
            type = 'EVENT';
        }

        // ─── Date Logic ────────────────────────────────────────
        if (/après.demain/i.test(lowerText)) {
             base.setDate(base.getDate() + 2);
        } else if (/demain/i.test(lowerText)) {
             base.setDate(base.getDate() + 1);
        }

        const inDays = lowerText.match(/dans (\d+) ?j(ours)?/i);
        if (inDays) base.setDate(base.getDate() + parseInt(inDays[1]));

        const inWeeks = lowerText.match(/dans (\d+) ?semaine/i);
        if (inWeeks) base.setDate(base.getDate() + parseInt(inWeeks[1]) * 7);

        // ─── Time Range ────────────────────────────────────────
        const rangeMatch = lowerText.match(/de (\d{1,2})[h:]?(\d{2})? (à|-) (\d{1,2})[h:]?(\d{2})?/i);
        const singleTimeMatch = lowerText.match(/à (\d{1,2})h(\d{2})?/i);

        if (rangeMatch) {
            const startH = parseInt(rangeMatch[1]);
            const startM = parseInt(rangeMatch[2] ?? '0');
            const endH = parseInt(rangeMatch[4]);
            const endM = parseInt(rangeMatch[5] ?? '0');
            
            const startDate = new Date(base);
            startDate.setHours(startH, startM, 0, 0);
            
            const endDateObj = new Date(base);
            endDateObj.setHours(endH, endM, 0, 0);
            
            dueDate = startDate.toISOString();
            endDate = endDateObj.toISOString();
            type = 'EVENT';
        } else if (singleTimeMatch) {
            base.setHours(parseInt(singleTimeMatch[1]), parseInt(singleTimeMatch[2] ?? '0'), 0, 0);
            dueDate = base.toISOString();
        }

        // ─── Recurrence / Range Logic (Simplified) ──────────────
        const dayRangeMatch = lowerText.match(/du (\w+) au (\w+)/i);
        if (dayRangeMatch) {
            recurrence = `Répétition: ${dayRangeMatch[1]} au ${dayRangeMatch[2]}`;
            type = 'EVENT';
        }

        let priority: Task['priority'] = 'MEDIUM';
        if (/urgent|critique/i.test(lowerText)) priority = 'CRITICAL';
        else if (/important/i.test(lowerText)) priority = 'HIGH';

        // ─── Title Cleaning ────────────────────────────────────
        const title = text
            .replace(/demain|après.demain|dans \d+ ?j(ours)?|dans \d+ ?semaine|à \d{1,2}h\d{0,2}|de \d{1,2}[h:]?\d{0,2} (à|-) \d{1,2}[h:]?\d{0,2}|du \w+ au \w+|urgent|important|critique|cours|examen|interro|tp|td|réunion|rdv|rendez-vous|meet|planning|agenda/gi, '')
            .replace(/\s+/g, ' ')
            .trim() || text;

        return { type, title, dueDate, endDate, priority, recurrence };
    };

    const smartPreview = parseSmartInput(quickInput);

    // Map course id to course name
    const courseDict = courses.reduce((acc, c) => {
        acc[c.id] = c.name;
        return acc;
    }, {} as Record<string, string>);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        })
    );

    const [now, setNow] = useState(Date.now());

    // Timer pour rafraîchir le filtre des tâches terminées toutes les secondes
    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval);
    }, []);

    const tasksByColumn = (col: Column) =>
        tasks
            .filter((t) => {
                if (t.isDeleted) return false;
                if (t.status !== col) return false;
                
                // Si la tâche est terminée, on ne l'affiche que si elle l'a été il y a moins de 10 secondes
                if (col === 'COMPLETED') {
                    if (!t.completedAt) return false;
                    const completedTime = new Date(t.completedAt).getTime();
                    return (now - completedTime) < 10000;
                }
                
                return true;
            })
            .sort((a, b) => a.position - b.position);

    const activeDragTask = activeId
        ? tasks.find((t) => t.id === activeId)
        : null;

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(String(event.active.id));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);
        if (!over) return;

        const taskId = String(active.id);
        const overId = String(over.id);

        const targetColumn = columns.find((c) => c.key === overId);
        if (targetColumn) {
            const task = tasks.find((t) => t.id === taskId);
            if (task && task.status !== targetColumn.key) {
                updateTask({
                    id: taskId,
                    payload: { 
                        status: targetColumn.key,
                        completedAt: targetColumn.key === 'COMPLETED' ? new Date().toISOString() : null
                    },
                });
            }
            return;
        }

        const overTask = tasks.find((t) => t.id === overId);
        const dragTask = tasks.find((t) => t.id === taskId);
        if (overTask && dragTask && overTask.status === dragTask.status) {
            updateTask({
                id: taskId,
                payload: {
                    status: overTask.status,
                    position: overTask.position,
                },
            });
        }
    };

    const handleQuickCreate = (e: React.FormEvent) => {
        e.preventDefault();
        const parsed = parseSmartInput(quickInput);
        if (!parsed) return;

        if (parsed.type === 'EVENT') {
            const dayRangeMatch = quickInput.toLowerCase().match(/du (\w+) au (\w+)/i);
            
            if (dayRangeMatch) {
                const dayMap: Record<string, number> = {
                    'dimanche': 0, 'lundi': 1, 'mardi': 2, 'mercredi': 3, 'jeudi': 4, 'vendredi': 5, 'samedi': 6
                };
                const startDay = dayMap[dayRangeMatch[1]];
                const endDay = dayMap[dayRangeMatch[2]];

                if (startDay !== undefined && endDay !== undefined) {
                    const today = new Date();
                    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
                    
                    // On itère sur les 7 jours de la semaine en cours
                    for (let i = 0; i < 7; i++) {
                        const currentDay = addDays(weekStart, i);
                        const dayIdx = currentDay.getDay();
                        
                        // Vérifier si le jour est dans la plage (gestion circulaire simplifiée)
                        let isInRange = false;
                        if (startDay <= endDay) {
                            isInRange = dayIdx >= startDay && dayIdx <= endDay;
                        } else {
                            // Cas du type "du samedi au mardi"
                            isInRange = dayIdx >= startDay || dayIdx <= endDay;
                        }

                        if (isInRange) {
                            const start = new Date(currentDay);
                            const end = new Date(currentDay);
                            
                            const hourSource = parsed.dueDate ? new Date(parsed.dueDate) : new Date();
                            if (!parsed.dueDate) hourSource.setHours(12, 0, 0, 0);

                            start.setHours(hourSource.getHours(), hourSource.getMinutes(), 0, 0);

                            if (parsed.endDate) {
                                const ed = new Date(parsed.endDate);
                                end.setHours(ed.getHours(), ed.getMinutes(), 0, 0);
                            } else {
                                end.setHours(start.getHours() + 1, start.getMinutes(), 0, 0);
                            }

                            createEvent({
                                title: parsed.title,
                                startDate: start.toISOString(),
                                endDate: end.toISOString(),
                                type: 'CLASS'
                            });
                        }
                    }
                }
            } else {
                createEvent({
                    title: parsed.title,
                    startDate: parsed.dueDate ?? new Date().toISOString(),
                    endDate: parsed.endDate ?? (parsed.dueDate 
                        ? new Date(new Date(parsed.dueDate).getTime() + 60 * 60 * 1000).toISOString() 
                        : new Date(new Date().getTime() + 60 * 60 * 1000).toISOString()),
                    type: 'TP'
                });
            }
        } else {
            createTask({
                title: parsed.title,
                priority: parsed.priority,
                status: 'PENDING',
                ...(parsed.dueDate ? { dueDate: parsed.dueDate } : {}),
            });
        }

        setQuickInput('');
    };

    if (isLoading) {
        return (
            <div className="flex gap-4 p-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex-1 h-96 bg-[#FAF9F6] rounded-[24px] border border-[#E5E5E5] animate-pulse" />
                ))}
            </div>
        );
    }

    const urgentCount = tasks.filter(t => !t.isDeleted && (t.priority === 'HIGH' || t.priority === 'CRITICAL')).length;
    const totalCount = tasks.filter(t => !t.isDeleted).length;

    return (
        <div className="flex flex-col gap-8 max-w-[1400px] mx-auto pb-10">

            {/* Header */}
            <div className="flex justify-between items-center sm:px-2">
                <div>
                    <h1 className="text-[28px] font-bold text-[#1A1A1A] tracking-tight">Tâches</h1>
                    <p className="text-[15px] text-[#737373] mt-1 font-medium">
                        {totalCount} tâches · {urgentCount} urgentes
                    </p>
                </div>
                <button 
                    onClick={() => createTask({ title: 'Nouvelle tâche', status: 'PENDING', priority: 'MEDIUM' })}
                    className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] bg-white text-[15px] font-bold text-[#1A1A1A] hover:bg-gray-50 shadow-sm transition-colors"
                >
                    + Nouvelle tâche <span className="text-[#A3A3A3] ml-1">...</span>
                </button>
            </div>

            {/* Smart Input & Navigation */}
            <div className="flex flex-col gap-2 sm:px-2">
                <form onSubmit={handleQuickCreate} className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                        <span className="text-lg opacity-40">✨</span>
                    </div>
                    <input
                        value={quickInput}
                        onChange={(e) => setQuickInput(e.target.value)}
                        placeholder="Décris ta tâche... ex: demain à 14h rendre le TP de réseau"
                        className="w-full h-14 pl-12 pr-4 bg-white border border-[#E5E5E5] rounded-xl text-[15px] font-medium text-[#1A1A1A] outline-none placeholder:text-[#A3A3A3] focus:border-[#737373] transition-colors shadow-sm"
                        disabled={isCreating || isCreatingEvent}
                    />
                </form>
                
                {/* Aperçu Dynamique */}
                <div className="min-h-[32px] flex items-center mb-4">
                    {smartPreview ? (
                        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                             <span className={`text-[10px] uppercase tracking-wider font-bold py-1 px-2 rounded-lg border ${smartPreview.type === 'EVENT' ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
                                {smartPreview.type === 'EVENT' ? '📅 Événement' : '✅ Tâche'}
                             </span>
                             <span className="text-[13px] font-medium text-[#1A1A1A] truncate max-w-[300px]">
                                {smartPreview.title}
                             </span>
                             {smartPreview.dueDate && (
                                 <span className="text-[12px] font-bold text-[#737373] bg-[#FAF9F6] border border-[#E5E5E5] px-2 py-0.5 rounded-md">
                                    ⏰ {format(new Date(smartPreview.dueDate), 'HH:mm', { locale: fr })}
                                    {smartPreview.endDate && ` - ${format(new Date(smartPreview.endDate), 'HH:mm', { locale: fr })}`}
                                    {` (${format(new Date(smartPreview.dueDate), 'd MMM', { locale: fr })})`}
                                 </span>
                             )}
                              {smartPreview.recurrence && (
                                 <span className="text-[12px] font-bold text-[#10B981] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-md">
                                    🔄 {smartPreview.recurrence}
                                 </span>
                             )}
                              {smartPreview.priority !== 'MEDIUM' && (
                                 <span className="text-[11px] font-bold text-[#EF4444]">
                                    🔥 {smartPreview.priority}
                                 </span>
                             )}
                        </div>
                    ) : (
                        <div className="text-[13px] text-[#737373] font-medium">
                            Écris naturellement — la date, l'heure et l'élément sont détectés automatiquement.
                        </div>
                    )}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2.5">
                    <button className="bg-[#1A1A1A] text-white px-4 py-[6px] rounded-full text-[13px] font-bold">Toutes</button>
                    <button className="bg-transparent border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#A3A3A3] px-4 py-[6px] rounded-full text-[13px] font-bold transition-colors">Urgent</button>
                    <button className="bg-transparent border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#A3A3A3] px-4 py-[6px] rounded-full text-[13px] font-bold transition-colors">Aujourd'hui</button>
                    
                    {courses.slice(0, 5).map(c => (
                        <button key={c.id} className="bg-transparent border border-[#E5E5E5] hover:border-[#A3A3A3] text-[#1A1A1A] px-3.5 py-[6px] rounded-full text-[13px] font-bold transition-colors flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full mt-0.5" style={{ background: c.color }} />
                            {c.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Kanban & Pomodoro */}
            <div className="flex items-start gap-6 sm:px-2 overflow-x-auto pb-4 no-scrollbar">
                
                {/* Board */}
                <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex gap-4 flex-1">
                        {columns.map((col) => (
                            <KanbanColumn
                                key={col.key}
                                column={col}
                                tasks={tasksByColumn(col.key)}
                                courses={courseDict}
                                onSelect={(task) => {
                                    setSelectedTask(task);
                                    setPomodoroTask(task);
                                    setShowModal(true);
                                }}
                                selectedTaskId={selectedTask?.id ?? pomodoroTask?.id ?? null}
                                onAddTask={(status) => {
                                    createTask({ title: 'Nouvelle tâche', status, priority: 'MEDIUM' });
                                }}
                            />
                        ))}
                    </div>

                    <DragOverlay>
                        {activeDragTask && (
                            <div className="bg-white rounded-[16px] p-4 border border-blue-500 shadow-xl opacity-90 scale-105">
                                <div className="text-[14px] font-bold text-[#1A1A1A] mb-3">{activeDragTask.title}</div>
                                <div className="flex gap-2">
                                    <div className="bg-[#FAF9F6] w-12 h-4 rounded-lg"></div>
                                </div>
                            </div>
                        )}
                    </DragOverlay>
                </DndContext>

                {/* Pomodoro Widget */}
                <div className="w-[300px] shrink-0 hidden lg:block">
                    <PomodoroWidget
                        taskId={pomodoroTask?.id ?? null}
                        taskTitle={pomodoroTask?.title ?? null}
                    />
                </div>

            </div>

            {/* Modal Modification */}
            {showModal && selectedTask && (
                <TaskModal
                    task={selectedTask}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedTask(null);
                    }}
                    onUpdate={(id, payload) =>
                        updateTask({ id, payload })
                    }
                    onDelete={(id) => deleteTask(id)}
                />
            )}
        </div>
    );
}
````

## File: frontend/src/pages/Works/WorksPage.tsx
````typescript
import { useEffect, useMemo, useState } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { useWorks, useCreateWork, useUpdateWork, useDeleteWork } from '../../hooks/useWorks';
import { useCourseWorkTypes, useCourses } from '../../hooks/useCourses';
import type { Work, WorkStatus } from '../../types';
import { format, differenceInDays, isToday, isTomorrow } from 'date-fns';
import { fr } from 'date-fns/locale';

// ─── Helpers ──────────────────────────────────────────────

function formatDueDate(dueDateStr: string | null | undefined) {
    if (!dueDateStr) return 'sans date';
    const date = new Date(dueDateStr);
    if (isToday(date)) return "rendu aujourd'hui";
    if (isTomorrow(date)) return "rendu demain";
    const diff = differenceInDays(date, new Date());
    if (diff > 0 && diff < 15) return `dans ${diff}j`;
    if (diff < 0) return `en retard`;
    return format(date, 'd MMM yyyy', { locale: fr });
}

const getScoreColor = (earned: number | null | undefined, possible: number | null | undefined) => {
    if (earned == null || possible == null) return 'text-[#A3A3A3]'; // gris
    const ratio = earned / possible;
    if (ratio >= 0.5) return 'text-[#16A34A]'; // vert
    return 'text-[#DC2626]'; // rouge
};

// ─── Modal Création/Édition ───────────────────────────────

const WorkModal = ({ work, courses, onClose, onSave, onDelete }: any) => {
    const [form, setForm] = useState<Partial<Work>>(
        work || {
            title: '',
            courseId: courses[0]?.id || '',
            status: 'PLANNED',
            pointsPossible: 20,
            workTypeLabel: 'PROJET',
            description: '',
            dueDate: '',
        }
    );
    const selectedCourseId = typeof form.courseId === 'string' ? form.courseId : undefined;
    const { data: configuredWorkTypes = [] } = useCourseWorkTypes(selectedCourseId);

    const workTypeOptions = useMemo(() => {
        if (configuredWorkTypes.length > 0) {
            return configuredWorkTypes.map((item) => ({
                value: item.type,
                label: `${item.type} (${item.weightPercent}%)`,
                weightPercent: item.weightPercent
            }));
        }

        return [
            { value: 'EXAMEN', label: 'EXAMEN', weightPercent: null as number | null },
            { value: 'INTERRO', label: 'INTERRO', weightPercent: null as number | null },
            { value: 'TP', label: 'TP', weightPercent: null as number | null },
            { value: 'TD', label: 'TD', weightPercent: null as number | null },
            { value: 'PROJET', label: 'PROJET', weightPercent: null as number | null },
            { value: 'EXERCICES', label: 'EXERCICES', weightPercent: null as number | null }
        ];
    }, [configuredWorkTypes]);

    useEffect(() => {
        if (workTypeOptions.length === 0) return;

        setForm((prev) => {
            const normalized = String(prev.workTypeLabel || '').trim().toUpperCase();
            const exists = workTypeOptions.some((option) => option.value === normalized);
            if (exists) return prev;

            const first = workTypeOptions[0];
            return {
                ...prev,
                workTypeLabel: first.value,
                percentage: first.weightPercent ?? prev.percentage
            };
        });
    }, [workTypeOptions]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const normalizedType = String(form.workTypeLabel || '').trim().toUpperCase();
        const selectedType = workTypeOptions.find((option) => option.value === normalizedType);
        onSave({
            ...form,
            workTypeLabel: normalizedType || null,
            percentage: selectedType?.weightPercent ?? form.percentage
        });
    };

    return (
        <dialog open className="modal modal-open">
            <div className="modal-box bg-white rounded-2xl shadow-xl max-w-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-lg text-[#1A1A1A]">
                        {work ? 'Modifier le travail' : 'Nouveau travail'}
                    </h3>
                    {work && (
                        <button type="button" onClick={() => { if(confirm('Supprimer ce travail ?')) onDelete(work.id); }} className="btn btn-ghost btn-sm text-[#EF4444] hover:bg-[#FEF2F2]">
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <input
                            required
                            placeholder="Titre du projet / devoir"
                            className="input input-bordered w-full bg-[#FAF9F6] border-[#E5E5E5] text-[#1A1A1A] font-medium"
                            value={form.title}
                            onChange={e => setForm({ ...form, title: e.target.value })}
                        />
                    </div>

                    <div className="flex gap-3">
                        <select
                            required
                            className="select select-bordered w-full bg-[#FAF9F6] border-[#E5E5E5] text-sm text-[#1A1A1A]"
                            value={form.courseId}
                            onChange={e => setForm({ ...form, courseId: e.target.value, workTypeLabel: '' })}
                        >
                            <option value="" disabled>Sélectionner un cours...</option>
                            {courses.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        
                        <div className="w-1/3">
                            <input
                                type="number"
                                required
                                placeholder="Sur /20"
                                className="input input-bordered w-full bg-[#FAF9F6] border-[#E5E5E5] text-sm text-[#1A1A1A]"
                                value={form.pointsPossible}
                                onChange={e => setForm({ ...form, pointsPossible: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <input
                            type="date"
                            className="input input-bordered w-full bg-[#FAF9F6] border-[#E5E5E5] text-sm text-[#1A1A1A]"
                            value={form.dueDate ? new Date(form.dueDate).toISOString().split('T')[0] : ''}
                            onChange={e => setForm({ ...form, dueDate: e.target.value ? new Date(e.target.value).toISOString() : '' })}
                        />
                        <select
                            className="select select-bordered w-full bg-[#FAF9F6] border-[#E5E5E5] text-sm text-[#1A1A1A]"
                            value={String(form.workTypeLabel || '').toUpperCase()}
                            onChange={e => {
                                const selected = workTypeOptions.find((option) => option.value === e.target.value);
                                setForm({
                                    ...form,
                                    workTypeLabel: e.target.value,
                                    percentage: selected?.weightPercent ?? form.percentage
                                });
                            }}
                        >
                            {workTypeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[12px] font-bold text-[#737373] mb-1">Statut</label>
                        <select
                            className="select select-bordered w-full bg-[#FAF9F6] border-[#E5E5E5] text-sm text-[#1A1A1A]"
                            value={form.status}
                            onChange={e => setForm({ ...form, status: e.target.value as WorkStatus })}
                        >
                            <option value="PLANNED">Planifié (À rendre)</option>
                            <option value="SUBMITTED">Soumis</option>
                            <option value="GRADED">Noté</option>
                        </select>
                    </div>

                    {form.status === 'GRADED' && (
                        <div className="flex items-center gap-3 p-3 bg-[#F0FDF4] rounded-xl border border-[#D1FAE5]">
                            <span className="text-sm font-bold text-[#166534]">Note obtenue :</span>
                            <input
                                type="number"
                                step="any"
                                placeholder="ex: 15"
                                className="input input-bordered w-24 bg-white border-[#A7F3D0] text-[#166534] font-bold text-lg text-center px-1"
                                value={form.pointsEarned || ''}
                                onChange={e => setForm({ ...form, pointsEarned: Number(e.target.value) })}
                            />
                        </div>
                    )}

                    <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-[#E5E5E5]">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-[14px] font-bold text-[#737373] hover:bg-gray-50 hover:text-[#1A1A1A] transition-colors">
                            Annuler
                        </button>
                        <button type="submit" className="px-5 py-2.5 rounded-xl border border-[#1A1A1A] text-[14px] font-bold text-white bg-[#1A1A1A] hover:opacity-90 transition-opacity">
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
            <div className="modal-backdrop bg-black/20 backdrop-blur-sm" onClick={onClose} />
        </dialog>
    );
};

// ─── Works Page ───────────────────────────────────────────

export default function WorksPage() {
    const { data: works = [], isLoading } = useWorks();
    const { data: courses = [] } = useCourses();
    const { mutate: createWork } = useCreateWork();
    const { mutate: updateWork } = useUpdateWork();
    const { mutate: deleteWork } = useDeleteWork();

    const [selectedWork, setSelectedWork] = useState<Work | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const [statusFilter, setStatusFilter] = useState<'ALL' | 'PLANNED' | 'SUBMITTED' | 'GRADED'>('ALL');
    const [courseFilter, setCourseFilter] = useState<string | null>(null);

    // Calculs de stats
    const stats = useMemo(() => {
        let planned = 0;
        let submitted = 0;
        let graded = 0;
        let sumScore20 = 0;

        works.forEach(w => {
            if (w.status === 'PLANNED') planned++;
            if (w.status === 'SUBMITTED') submitted++;
            if (w.status === 'GRADED') {
                graded++;
                if (w.pointsEarned != null && w.pointsPossible != null && w.pointsPossible > 0) {
                    sumScore20 += (w.pointsEarned / w.pointsPossible) * 20;
                }
            }
        });

        const avg = graded > 0 ? (sumScore20 / graded).toFixed(1) : '-';

        return {
            total: works.length,
            planned,
            submitted,
            graded,
            avg
        };
    }, [works]);

    const filteredWorks = useMemo(() => {
        return works
            .filter(w => statusFilter === 'ALL' || w.status === statusFilter)
            .filter(w => !courseFilter || w.courseId === courseFilter)
            .sort((a, b) => {
                // Tri par date si dueDate existe, sinon ceux sans date à la fin
                if (a.dueDate && b.dueDate) {
                    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                }
                if (a.dueDate && !b.dueDate) return -1;
                if (!a.dueDate && b.dueDate) return 1;
                // Sinon par date de crétation descendante par défault
                return (b.createdAt || '').localeCompare(a.createdAt || '');
            });
    }, [works, statusFilter, courseFilter]);

    if (isLoading) {
        return <div className="p-8 text-center text-[#A3A3A3]">Chargement des travaux...</div>;
    }

    const handleSave = (form: Partial<Work>) => {
        if (selectedWork) {
            updateWork({ id: selectedWork.id, payload: form });
        } else {
            createWork(form);
        }
        setSelectedWork(null);
        setIsCreating(false);
    };

    const handleDelete = (id: string) => {
        deleteWork(id);
        setSelectedWork(null);
        setIsCreating(false);
    };

    return (
        <div className="flex flex-col max-w-[900px] mx-auto pb-12 pt-4 px-2 sm:px-4">
            
            {/* ── Entête ── */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-[28px] font-bold text-[#1A1A1A] tracking-tight mb-1">
                        Travaux
                    </h1>
                    <div className="text-[14px] font-medium text-[#737373]">
                        {stats.total} travaux · {stats.planned} à rendre
                    </div>
                </div>
                <button
                    onClick={() => { setSelectedWork(null); setIsCreating(true); }}
                    className="h-[44px] px-5 bg-white border border-[#E5E5E5] rounded-[12px] flex items-center justify-center gap-2 hover:bg-[#FAF9F6] transition-colors shadow-sm text-[14px] font-bold text-[#1A1A1A]"
                >
                    <Plus size={18} />
                    Ajouter un travail
                </button>
            </div>

            {/* ── Stats Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[16px] py-5 flex flex-col items-center justify-center">
                    <div className="text-[26px] font-bold text-[#1A1A1A] leading-tight">
                        {stats.avg}
                    </div>
                    <div className="text-[13px] font-medium text-[#737373] mt-1">Moy. générale</div>
                </div>
                <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[16px] py-5 flex flex-col items-center justify-center">
                    <div className="text-[26px] font-bold text-[#B45309] leading-tight">
                        {stats.planned}
                    </div>
                    <div className="text-[13px] font-medium text-[#737373] mt-1">À rendre</div>
                </div>
                <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[16px] py-5 flex flex-col items-center justify-center">
                    <div className="text-[26px] font-bold text-[#15803D] leading-tight">
                        {stats.graded}
                    </div>
                    <div className="text-[13px] font-medium text-[#737373] mt-1">Notés</div>
                </div>
                <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[16px] py-5 flex flex-col items-center justify-center">
                    <div className="text-[26px] font-bold text-[#1D4ED8] leading-tight">
                        {stats.submitted}
                    </div>
                    <div className="text-[13px] font-medium text-[#737373] mt-1">Soumis</div>
                </div>
            </div>

            {/* ── Filters (Badges/Pills) ── */}
            <div className="flex flex-wrap gap-2 mb-8">
                {/* Status */}
                <button 
                    onClick={() => setStatusFilter('ALL')}
                    className={`px-4 py-[6px] rounded-full text-[13px] font-bold transition-colors ${statusFilter === 'ALL' ? 'bg-[#1A1A1A] text-white' : 'bg-transparent border border-[#E5E5E5] text-[#1A1A1A] hover:bg-gray-50'}`}
                >
                    Tous
                </button>
                <button 
                    onClick={() => setStatusFilter('PLANNED')}
                    className={`px-4 py-[6px] rounded-full text-[13px] font-bold transition-colors ${statusFilter === 'PLANNED' ? 'bg-[#1A1A1A] text-white' : 'bg-transparent border border-[#E5E5E5] text-[#1A1A1A] hover:bg-gray-50'}`}
                >
                    Planifiés
                </button>
                <button 
                    onClick={() => setStatusFilter('SUBMITTED')}
                    className={`px-4 py-[6px] rounded-full text-[13px] font-bold transition-colors ${statusFilter === 'SUBMITTED' ? 'bg-[#1A1A1A] text-white' : 'bg-transparent border border-[#E5E5E5] text-[#1A1A1A] hover:bg-gray-50'}`}
                >
                    Soumis
                </button>
                <button 
                    onClick={() => setStatusFilter('GRADED')}
                    className={`px-4 py-[6px] rounded-full text-[13px] font-bold transition-colors ${statusFilter === 'GRADED' ? 'bg-[#1A1A1A] text-white' : 'bg-transparent border border-[#E5E5E5] text-[#1A1A1A] hover:bg-gray-50'}`}
                >
                    Notés
                </button>

                <div className="w-[1px] h-6 bg-[#E5E5E5] self-center mx-1" />

                {/* Courses */}
                {courses.slice(0, 5).map(c => (
                    <button 
                        key={c.id} 
                        onClick={() => setCourseFilter(courseFilter === c.id ? null : c.id)}
                        className={`px-3.5 py-[6px] rounded-full text-[13px] font-bold transition-colors flex items-center gap-2 border ${courseFilter === c.id ? 'bg-[#FAF9F6] border-[#A3A3A3]' : 'bg-transparent border-[#E5E5E5] text-[#1A1A1A] hover:bg-gray-50'}`}
                    >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                        {c.name}
                    </button>
                ))}
            </div>

            {/* ── List ── */}
            <div className="bg-white rounded-[16px] border border-[#E5E5E5] flex flex-col pt-1 pb-1 mb-6">
                {filteredWorks.length === 0 ? (
                    <div className="p-8 text-center text-[#A3A3A3] text-[14px] font-medium">
                        Aucun travail trouvé.
                    </div>
                ) : (
                    filteredWorks.map((work, index) => {
                        const course = courses.find(c => c.id === work.courseId);
                        const isLast = index === filteredWorks.length - 1;

                        let statusBadgeClass = '';
                        let statusLabel = '';

                        if (work.status === 'GRADED') {
                            statusBadgeClass = 'bg-[#DCFCE7] text-[#166534]';
                            statusLabel = 'Noté';
                        } else if (work.status === 'SUBMITTED') {
                            statusBadgeClass = 'bg-[#DBEAFE] text-[#1E3A8A]';
                            statusLabel = 'Soumis';
                        } else {
                            statusBadgeClass = 'bg-[#F3F4F6] text-[#4B5563]';
                            statusLabel = 'Planifié';
                        }

                        const scoreDisplay = work.status === 'GRADED' && work.pointsEarned != null && work.pointsPossible != null
                            ? `${work.pointsEarned.toFixed(1)} / ${work.pointsPossible}`
                            : '—';

                        const numScoreColor = work.status === 'GRADED' 
                            ? getScoreColor(work.pointsEarned, work.pointsPossible) 
                            : 'text-[#A3A3A3]';

                        return (
                            <div 
                                key={work.id}
                                onClick={() => setSelectedWork(work)}
                                className={`flex items-center px-5 py-4 cursor-pointer hover:bg-[#FAF9F6] transition-colors ${!isLast ? 'border-b border-[#E5E5E5]' : ''}`}
                            >
                                {/* Course Dot */}
                                <div className="w-2.5 h-2.5 rounded-full shrink-0 mr-4" style={{ backgroundColor: course?.color || '#A3A3A3' }} />
                                
                                {/* Info */}
                                <div className="flex-1 min-w-0 pr-4">
                                    <div className="text-[15px] font-bold text-[#1A1A1A] truncate mb-0.5">
                                        {work.title}
                                    </div>
                                    <div className="text-[13px] font-medium text-[#737373] truncate">
                                        {course?.name || 'Général'} · {work.workTypeLabel || 'PROJET'} · {formatDueDate(work.dueDate)}
                                    </div>
                                </div>
                                
                                {/* Status & Score */}
                                <div className="flex items-center gap-4 shrink-0">
                                    <div className={`px-2.5 py-1 rounded-[6px] text-[11px] font-bold tracking-wide ${statusBadgeClass}`}>
                                        {statusLabel}
                                    </div>
                                    <div className={`text-[17px] font-bold w-[72px] text-right ${numScoreColor}`}>
                                        {scoreDisplay}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* ── Progress Bar ── */}
            {stats.total > 0 && (
                <div className="border border-[#E5E5E5] rounded-[16px] p-5 pb-6">
                    <div className="flex justify-between items-center text-[13px] font-medium text-[#737373] mb-3">
                        <span>Progression du semestre</span>
                        <span>{stats.graded} / {stats.total} notés</span>
                    </div>
                    <div className="h-[6px] w-full bg-[#E5E5E5] rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-[#1A1A1A] rounded-full transition-all duration-700"
                            style={{ width: `${Math.round((stats.graded / stats.total) * 100)}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Modal Edit/Create */}
            {(selectedWork || isCreating) && (
                <WorkModal
                    work={selectedWork}
                    courses={courses}
                    onClose={() => { setSelectedWork(null); setIsCreating(false); }}
                    onSave={handleSave}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
````

## File: frontend/src/router/index.tsx
````typescript
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRouter';
import { lazy, Suspense } from 'react';
import AppLayout from '../layouts/AppLayout';
import DashboardPage from '../pages/Dashboard/DashboardPage';


const LoginPage = lazy(() => import('../pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/Auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../pages/Auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/Auth/ResetPassword'));
const CoursesPage = lazy(() => import('../pages/Courses/CoursesPage'));
const CourseDetailPage = lazy(() => import('../pages/Courses/CoursesDetailPage'));
const AgendaPage = lazy(() => import('../pages/Agenda/AgendaPage'));
const TasksPage = lazy(() => import('../pages/Tasks/TaskPage'));
const WorksPage = lazy(() => import('../pages/Works/WorksPage'));
const RiskPage = lazy(() => import('../pages/Risk/RiskPage'));
const ProfilePage = lazy(() => import('../pages/Profile/ProfilePage'));

const PageLoader = () => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    }}>
        <span className="loading loading-spinner loading-lg"></span>
    </div>
);

export const router = createBrowserRouter([

    // ─── Routes publiques ──────────────────────────────────
    {
        path: '/login',
        element: <Suspense fallback={<PageLoader />}><LoginPage /></Suspense>,
    },
    {
        path: '/register',
        element: <Suspense fallback={<PageLoader />}><RegisterPage /></Suspense>,
    },
    {
        path: '/forgot-password',
        element: <Suspense fallback={<PageLoader />}><ForgotPasswordPage /></Suspense>,
    },
    {
        path: '/reset-password',
        element: <Suspense fallback={<PageLoader />}><ResetPasswordPage /></Suspense>,
    },
   

    // ─── Routes protégées ──────────────────────────────────
    {
        element: <ProtectedRoute />,
        children: [
            {
                // AppLayout enveloppe toutes les pages protégées
                // Il affiche la sidebar + topbar
                // Les pages s'affichent via Outlet à l'intérieur
                element: <AppLayout />,
                children: [
                    {
                        path: '/dashboard',
                        element: <DashboardPage />,
                    },
                    {
                        path: '/courses',
                        element: <Suspense fallback={<PageLoader />}><CoursesPage /></Suspense>,
                    },
                    {
                        path: '/courses/:id',
                        element: <Suspense fallback={<PageLoader />}><CourseDetailPage /></Suspense>,
                    },
                    {
                        path: '/agenda',
                        element: <Suspense fallback={<PageLoader />}><AgendaPage /></Suspense>,
                    },
                    {
                        path: '/tasks',
                        element: <Suspense fallback={<PageLoader />}><TasksPage /></Suspense>,
                    },
                    {
                        path: '/works',
                        element: <Suspense fallback={<PageLoader />}><WorksPage /></Suspense>,
                    },
                    {
                        path: '/risk',
                        element: <Suspense fallback={<PageLoader />}><RiskPage /></Suspense>,
                    },
                    {
                        path: '/profile',
                        element: <Suspense fallback={<PageLoader />}><ProfilePage /></Suspense>,
                    },
                ],
            },
        ],
    },

    // ─── Redirections par défaut ───────────────────────────
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
    },
    {
        path: '*',
        element: <Navigate to="/dashboard" replace />,
    },

]);
````

## File: frontend/src/router/ProtectedRouter.tsx
````typescript
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore.ts';

export const ProtectedRoute = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    // Non connecté → on redirige vers login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Connecté → on affiche la page demandée
    // Outlet = la page enfant définie dans le router
    return <Outlet />;
};
````

## File: frontend/src/stores/authStore.ts
````typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useSyncStore } from './syncStore';

// ─── Types ────────────────────────────────────────────────

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'STUDENT' | 'PROFESSOR';
    language?: string;
    timezone?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Tokens {
    refreshToken: string;
    accessToken:string
}

interface AuthState {
    user: User | null;
    tokens: Tokens | null;
    isAuthenticated: boolean;
    login: (user: User, tokens: Tokens) => void;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
    setTokens: (tokens: Tokens) => void;
}

// ─── Store ────────────────────────────────────────────────

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            tokens: null,
            isAuthenticated: false,

            login: (user, tokens) => set({
                user,
                tokens,
                isAuthenticated: true,
            }),

            logout: () => {
                // On s'assure que le cache local offline est vidé
                useSyncStore.getState().clearCache();
                useSyncStore.getState().clearQueue();
                
                set({
                    user: null,
                    tokens: null,
                    isAuthenticated: false,
                });
            },

            updateUser: (partial) => set((state) => ({
                user: state.user ? { ...state.user, ...partial } : null,
            })),

            setTokens: (tokens) => set({ tokens }),
        }),
        {
            name: 'auth-storage',
        }
    )
);
````

## File: frontend/src/stores/syncStore.ts
````typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, Event, Course, Grade } from '../types';

// ─── Types ────────────────────────────────────────────────

export interface SyncAction {
  id: string;
  method: string;
  url: string;
  payload?: any;
  timestamp: number;
}

// Cache local des entités (offline-first)
interface EntityCache {
  tasks: Task[];
  events: Event[];
  courses: Course[];
  grades: Grade[];
  lastUpdated: Record<string, number>; // clé => timestamp de dernière mise à jour
}

interface SyncState {
  // ── File d'attente de mutations à envoyer au serveur
  queue: SyncAction[];
  isSyncing: boolean;

  // ── Cache local des entités (persiste dans le browser store)
  cache: EntityCache;

  // ── Actions sur la queue
  enqueueAction: (action: Omit<SyncAction, 'id' | 'timestamp'>) => void;
  removeAction: (id: string) => void;
  clearQueue: () => void;
  setSyncing: (isSyncing: boolean) => void;

  // ── Actions sur le cache local
  setCacheTasks: (tasks: Task[]) => void;
  setCacheEvents: (events: Event[]) => void;
  setCacheCourses: (courses: Course[]) => void;
  setCacheGrades: (grades: Grade[]) => void;
  updateCacheTask: (id: string, update: Partial<Task>) => void;
  clearCache: () => void;
}

const emptyCache: EntityCache = {
  tasks: [],
  events: [],
  courses: [],
  grades: [],
  lastUpdated: {},
};

export const useSyncStore = create<SyncState>()(
  persist(
    (set) => ({
      queue: [],
      isSyncing: false,
      cache: emptyCache,

      // ── Queue ──────────────────────────────────────────────

      enqueueAction: (action) =>
        set((state) => ({
          queue: [
            ...state.queue,
            {
              ...action,
              id: crypto.randomUUID(),
              timestamp: Date.now(),
            },
          ],
        })),

      removeAction: (id) =>
        set((state) => ({
          queue: state.queue.filter((a) => a.id !== id),
        })),

      clearQueue: () => set({ queue: [] }),

      setSyncing: (isSyncing) => set({ isSyncing }),

      // ── Cache local ────────────────────────────────────────

      setCacheTasks: (tasks) =>
        set((state) => ({
          cache: {
            ...state.cache,
            tasks,
            lastUpdated: { ...state.cache.lastUpdated, tasks: Date.now() },
          },
        })),

      setCacheEvents: (events) =>
        set((state) => ({
          cache: {
            ...state.cache,
            events,
            lastUpdated: { ...state.cache.lastUpdated, events: Date.now() },
          },
        })),

      setCacheCourses: (courses) =>
        set((state) => ({
          cache: {
            ...state.cache,
            courses,
            lastUpdated: { ...state.cache.lastUpdated, courses: Date.now() },
          },
        })),

      setCacheGrades: (grades) =>
        set((state) => ({
          cache: {
            ...state.cache,
            grades,
            lastUpdated: { ...state.cache.lastUpdated, grades: Date.now() },
          },
        })),

      // Mise à jour optimiste d'une tâche dans le cache local
      updateCacheTask: (id, update) =>
        set((state) => ({
          cache: {
            ...state.cache,
            tasks: state.cache.tasks.map((t) =>
              t.id === id ? { ...t, ...update } : t
            ),
          },
        })),

      clearCache: () => set({ cache: emptyCache }),
    }),
    {
      name: 'sync-storage',
      // On persiste à la fois la queue et le cache local
      partialize: (state) => ({
        queue: state.queue,
        cache: state.cache,
      }),
    }
  )
);
````

## File: frontend/src/types/index.ts
````typescript
// ─── Enums ────────────────────────────────────────────────

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type EventType =
    | 'CLASS' | 'EXAM' | 'EXAMEN' | 'INTERRO'
    | 'TP' | 'QUIZ' | 'ASSIGNMENT' | 'STUDY'
    | 'AUTRE' | 'PERSONAL' | 'MEETING';
export type WorkStatus = 'PLANNED' | 'SUBMITTED' | 'GRADED' | 'CANCELLED';
export type WorkType = 'EXAMEN' | 'INTERRO' | 'PROJET' | 'TD' | 'TP' | 'EXERCICES';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type SyncStatus = 'PENDING' | 'SYNCED' | 'CONFLICT';

// ─── Modèles ──────────────────────────────────────────────

export interface Task {
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

export interface Event {
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

export interface Course {
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

export interface Grade {
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

export interface Work {
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

export interface RiskAnalysis {
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

export interface Token {
    accessToken:string,
    refreshToken:string
}
````

## File: frontend/src/vite-env.d.ts
````typescript
/// <reference types="vite/client" />
````

## File: frontend/tsconfig.app.json
````json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
````

## File: frontend/tsconfig.json
````json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
````

## File: frontend/tsconfig.node.json
````json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}
````

## File: frontend/vite.config.ts
````typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
    VitePWA(
      {
        registerType: 'autoUpdate',
        injectRegister: 'script-defer',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: "StudyFlow",
          short_name: "StudyFlow",
          description: "A productivity app for students to manage their study sessions and tasks.",
          theme_color: "#ffffff",
          icons: [
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png"
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png"
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable"
            }
          ]
        }
      }
    )
  ],
  resolve: {
    alias:{
      "@": path.resolve(__dirname, "./src"),
    }
  }
})
````
