import {
  addDays,
  endOfMonth,
  endOfWeek,
  isSameDay,
  parseISO,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import type { Course, Event } from '../../types';

export type AgendaCourse = Pick<Course, 'id' | 'name' | 'color'>;
export type AgendaViewMode = 'month' | 'week' | 'day';

export const eventTypeBadge: Record<string, string> = {
  CLASS: 'bg-primary/10 text-primary',
  EXAM: 'bg-error/10 text-error',
  EXAMEN: 'bg-error/10 text-error',
  INTERRO: 'bg-tertiary/10 text-tertiary',
  TP: 'bg-tertiary/10 text-tertiary',
  STUDY: 'bg-tertiary/10 text-tertiary',
  QUIZ: 'bg-tertiary/10 text-tertiary',
  ASSIGNMENT: 'bg-primary/10 text-primary',
  MEETING: 'bg-surface-container-highest text-on-surface-variant',
  PERSONAL: 'bg-surface-container-highest text-on-surface-variant',
  AUTRE: 'bg-surface-container-highest text-on-surface-variant',
};

export const eventTypeLabel: Record<string, string> = {
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

export const weekPlannerDays = 6;
export const weekPlannerHours = Array.from({ length: 12 }, (_, index) => index + 8);

export function getCourseColor(courses: AgendaCourse[], courseId: string | null | undefined) {
  return courses.find((course) => course.id === courseId)?.color ?? 'var(--color-on-surface)';
}

export function getEventsForDay(events: Event[], day: Date) {
  return events.filter((event) => isSameDay(parseISO(event.startDate), day));
}

export function sortEventsByStartDate(events: Event[]) {
  return [...events].sort(
    (left, right) => parseISO(left.startDate).getTime() - parseISO(right.startDate).getTime(),
  );
}

export function getMonthDays(currentMonth: Date) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days: Date[] = [];
  let cursor = calendarStart;

  while (cursor <= calendarEnd) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
  }

  return days;
}