import {
  addDays,
  endOfMonth,
  endOfWeek,
  isSameDay,
  parseISO,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import type { Event } from '../../types';
import { eventTypeBadge, eventTypeLabel, type EventCourse } from '../../lib/eventMeta';

export { eventTypeBadge, eventTypeLabel };

export type AgendaCourse = EventCourse;
export type AgendaViewMode = 'month' | 'week' | 'day';

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