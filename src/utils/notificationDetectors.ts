import { differenceInMilliseconds, startOfDay } from 'date-fns';
import type { Course, Event, Grade, Task } from '../types';
import type { NotificationPreferences } from '../hooks/usePushNotifications';

export interface NotificationDraft {
  id: string;
  kind: 'LATE_TASK' | 'EXAM_REMINDER' | 'HIGH_RISK' | 'WEEKLY_SUMMARY';
  title: string;
  body: string;
  url: string;
}

const EXAM_EVENT_TYPES = new Set(['EXAM', 'EXAMEN', 'INTERRO']);

const localDayKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

// Clé hebdomadaire approximative (semaine de 7 jours calée sur l'année) —
// suffit comme clé de déduplication pour les notifications récurrentes.
const localWeekKey = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date.getTime() - start.getTime()) / 86_400_000);
  return `${date.getFullYear()}-W${Math.floor(dayOfYear / 7)}`;
};

const plural = (count: number, singular: string, pluralForm?: string) =>
  `${count} ${count > 1 ? pluralForm ?? `${singular}s` : singular}`;

// ── Tâches en retard : un digest par jour (pas une notif par tâche) ──
export const detectLateTaskDigest = (tasks: Task[], now = new Date()): NotificationDraft[] => {
  const todayStart = startOfDay(now).getTime();
  const late = tasks.filter(
    (t) =>
      !t.isDeleted
      && (t.status === 'PENDING' || t.status === 'IN_PROGRESS')
      && t.dueDate
      && new Date(t.dueDate).getTime() < todayStart,
  );
  if (late.length === 0) return [];

  const preview = late.slice(0, 3).map((t) => `« ${t.title} »`).join(', ');
  const suffix = late.length > 3 ? ` et ${late.length - 3} autre(s)` : '';

  return [{
    id: `late-tasks:${localDayKey(now)}`,
    kind: 'LATE_TASK',
    title: 'Tâches en retard',
    body: `${plural(late.length, 'tâche')} en retard : ${preview}${suffix}`,
    url: '/tasks',
  }];
};

// ── Examens : rappels à J-1 (fenêtre de rattrapage 20–24h) et H-1 ──
export const detectExamReminders = (events: Event[], now = new Date()): NotificationDraft[] => {
  const drafts: NotificationDraft[] = [];

  for (const event of events) {
    if (!EXAM_EVENT_TYPES.has(event.type)) continue;

    const msUntil = differenceInMilliseconds(new Date(event.startDate), now);
    if (msUntil <= 0) continue;

    if (msUntil <= 24 * 3_600_000 && msUntil >= 20 * 3_600_000) {
      drafts.push({
        id: `exam-reminder-24h:${event.id}`,
        kind: 'EXAM_REMINDER',
        title: 'Examen dans 24 h',
        body: `« ${event.title} » — dernière ligne droite pour réviser.`,
        url: '/agenda',
      });
    }

    if (msUntil <= 3_600_000) {
      const minutes = Math.max(1, Math.round(msUntil / 60_000));
      drafts.push({
        id: `exam-reminder-1h:${event.id}`,
        kind: 'EXAM_REMINDER',
        title: 'Examen imminent',
        body: `« ${event.title} » commence dans ${minutes} min.`,
        url: '/agenda',
      });
    }
  }

  return drafts;
};

// ── Cours à risque : moyenne < 10/20, une notification par cours/semaine ──
export const detectHighRiskCourses = (
  courses: Course[],
  grades: Grade[],
  now = new Date(),
): NotificationDraft[] => {
  const notesByCourse: Record<string, Grade[]> = {};
  for (const g of grades) {
    if (g.courseId && g.score !== undefined && g.maxScore !== undefined && g.maxScore > 0) {
      (notesByCourse[g.courseId] ??= []).push(g);
    }
  }

  return courses
    .filter((course) => {
      if (course.isDeleted) return false;
      const courseGrades = notesByCourse[course.id];
      if (!courseGrades?.length) return false;
      const avg =
        courseGrades.reduce((acc, g) => acc + (g.score / g.maxScore) * 20, 0) / courseGrades.length;
      return avg < 10;
    })
    .map((course) => ({
      id: `high-risk:${course.id}:${localWeekKey(now)}`,
      kind: 'HIGH_RISK' as const,
      title: `Cours à risque — ${course.name}`,
      body: 'Ta moyenne est sous 10/20. Un plan de révision ?',
      url: `/courses/${course.id}`,
    }));
};

// ── Résumé hebdomadaire : le lundi uniquement ──
export const detectWeeklySummary = (
  tasks: Task[],
  events: Event[],
  now = new Date(),
): NotificationDraft[] => {
  if (now.getDay() !== 1) return [];

  const weekAgoMs = now.getTime() - 7 * 86_400_000;
  const completedLastWeek = tasks.filter(
    (t) => !t.isDeleted && t.status === 'COMPLETED' && t.completedAt && new Date(t.completedAt).getTime() >= weekAgoMs,
  ).length;

  const weekAheadMs = now.getTime() + 7 * 86_400_000;
  const upcomingExams = events.filter(
    (e) =>
      EXAM_EVENT_TYPES.has(e.type)
      && new Date(e.startDate).getTime() >= now.getTime()
      && new Date(e.startDate).getTime() <= weekAheadMs,
  ).length;

  if (completedLastWeek === 0 && upcomingExams === 0) return [];

  const parts = [
    completedLastWeek > 0 ? `${plural(completedLastWeek, 'tâche terminée', 'tâches terminées')}` : null,
    upcomingExams > 0 ? `${plural(upcomingExams, 'examen')} cette semaine` : null,
  ].filter(Boolean);

  return [{
    id: `weekly-summary:${localWeekKey(now)}`,
    kind: 'WEEKLY_SUMMARY',
    title: 'Résumé hebdomadaire',
    body: parts.join(' · '),
    url: '/dashboard',
  }];
};

export interface DetectionInput {
  tasks: Task[];
  events: Event[];
  grades: Grade[];
  courses: Course[];
  preferences: NotificationPreferences;
}

export const runDetection = ({ tasks, events, grades, courses, preferences }: DetectionInput, now = new Date()): NotificationDraft[] => [
  ...(preferences.lateTasks ? detectLateTaskDigest(tasks, now) : []),
  ...(preferences.examReminder ? detectExamReminders(events, now) : []),
  ...(preferences.highRisk ? detectHighRiskCourses(courses, grades, now) : []),
  ...(preferences.weeklySummary ? detectWeeklySummary(tasks, events, now) : []),
];
