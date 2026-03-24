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