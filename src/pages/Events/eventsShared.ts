import { addDays, endOfWeek, isBefore, isSameMonth, isToday, isTomorrow, parseISO, startOfToday, startOfWeek } from 'date-fns';
import type { Event, EventType } from '../../types';
import { examEventTypes } from '../../lib/eventMeta';

export type EventsHorizonFilter = 'ALL' | 'UPCOMING' | 'TODAY' | 'PAST';

export interface EventsStats {
  total: number;
  upcoming7: number;
  month: number;
  exams: number;
  weekClassHours: string;
}

const formatHours = (value: number) =>
  value.toLocaleString('fr-FR', { maximumFractionDigits: 1 }) + ' h';

export function computeEventsStats(events: Event[]): EventsStats {
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
  const inSevenDays = addDays(now, 7);

  let upcoming7 = 0;
  let month = 0;
  let exams = 0;
  let weekClassHoursMs = 0;

  events.forEach((event) => {
    const start = parseISO(event.startDate);
    if (start >= now && start <= inSevenDays) upcoming7++;
    if (isSameMonth(start, now)) month++;
    if (examEventTypes.includes(event.type) && start >= now) exams++;
    if (event.type === 'CLASS' && start >= weekStart && start <= weekEnd) {
      weekClassHoursMs += parseISO(event.endDate).getTime() - start.getTime();
    }
  });

  return {
    total: events.length,
    upcoming7,
    month,
    exams,
    weekClassHours: formatHours(weekClassHoursMs / 3_600_000),
  };
}

export function filterAndSortEvents(
  events: Event[],
  typeFilter: EventType | 'ALL',
  courseFilter: string | null,
  horizon: EventsHorizonFilter,
): Event[] {
  return events
    .filter((event) => typeFilter === 'ALL' || event.type === typeFilter)
    .filter((event) => !courseFilter || event.courseId === courseFilter)
    .filter((event) => {
      if (horizon === 'ALL') return true;
      const start = parseISO(event.startDate);
      if (horizon === 'UPCOMING') return start >= new Date();
      if (horizon === 'TODAY') return isToday(start);
      return isBefore(start, startOfToday());
    })
    .sort(
      (left, right) => parseISO(left.startDate).getTime() - parseISO(right.startDate).getTime(),
    );
}

export type EventsGroupKey = 'today' | 'tomorrow' | 'week' | 'later' | 'past';

export const groupLabels: Record<EventsGroupKey, string> = {
  today: "Aujourd'hui",
  tomorrow: 'Demain',
  week: 'Dans les 7 jours',
  later: 'Plus tard',
  past: 'Passés',
};

export function groupEvents(events: Event[]): { key: EventsGroupKey; events: Event[] }[] {
  const groups: Record<EventsGroupKey, Event[]> = {
    today: [],
    tomorrow: [],
    week: [],
    later: [],
    past: [],
  };

  const now = new Date();
  const inSevenDays = addDays(now, 7);

  events.forEach((event) => {
    const start = parseISO(event.startDate);
    let key: EventsGroupKey;
    if (isToday(start)) key = 'today';
    else if (isTomorrow(start)) key = 'tomorrow';
    else if (start >= now && start <= inSevenDays) key = 'week';
    else if (start > inSevenDays) key = 'later';
    else key = 'past';
    groups[key].push(event);
  });

  return (['today', 'tomorrow', 'week', 'later', 'past'] as EventsGroupKey[])
    .map((key) => ({ key, events: groups[key] }))
    .filter((group) => group.events.length > 0);
}

export function formatEventDuration(event: Event): string {
  const minutes = Math.round(
    (parseISO(event.endDate).getTime() - parseISO(event.startDate).getTime()) / 60_000,
  );
  if (minutes <= 0) return '';
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest} min`;
  if (rest === 0) return `${hours} h`;
  return `${hours} h ${rest}`;
}