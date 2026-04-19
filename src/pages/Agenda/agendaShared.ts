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
    return courses.find((course) => course.id === courseId)?.color ?? '#1A1A1A';
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
