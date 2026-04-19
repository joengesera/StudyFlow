import { differenceInDays, format, isToday, isTomorrow } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Work, WorkStatus } from '../../types';

export type WorksStatusFilter = 'ALL' | WorkStatus;

export interface WorksStats {
    total: number;
    planned: number;
    submitted: number;
    graded: number;
    avg: string;
}

export function formatDueDate(dueDateStr: string | null | undefined) {
    if (!dueDateStr) return 'sans date';
    const date = new Date(dueDateStr);
    if (isToday(date)) return "rendu aujourd'hui";
    if (isTomorrow(date)) return 'rendu demain';
    const diff = differenceInDays(date, new Date());
    if (diff > 0 && diff < 15) return `dans ${diff}j`;
    if (diff < 0) return 'en retard';
    return format(date, 'd MMM yyyy', { locale: fr });
}

export function getScoreColor(earned: number | null | undefined, possible: number | null | undefined) {
    if (earned == null || possible == null) return 'text-[#A3A3A3]';
    const ratio = earned / possible;
    if (ratio >= 0.5) return 'text-[#16A34A]';
    return 'text-[#DC2626]';
}

export function computeWorksStats(works: Work[]): WorksStats {
    let planned = 0;
    let submitted = 0;
    let graded = 0;
    let sumScore20 = 0;

    works.forEach((work) => {
        if (work.status === 'PLANNED') planned++;
        if (work.status === 'SUBMITTED') submitted++;
        if (work.status === 'GRADED') {
            graded++;
            if (work.pointsEarned != null && work.pointsPossible != null && work.pointsPossible > 0) {
                sumScore20 += (work.pointsEarned / work.pointsPossible) * 20;
            }
        }
    });

    const avg = graded > 0 ? (sumScore20 / graded).toFixed(1) : '-';

    return {
        total: works.length,
        planned,
        submitted,
        graded,
        avg,
    };
}

export function filterAndSortWorks(
    works: Work[],
    statusFilter: WorksStatusFilter,
    courseFilter: string | null,
) {
    return works
        .filter((work) => statusFilter === 'ALL' || work.status === statusFilter)
        .filter((work) => !courseFilter || work.courseId === courseFilter)
        .sort((a, b) => {
            if (a.dueDate && b.dueDate) {
                return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            }
            if (a.dueDate && !b.dueDate) return -1;
            if (!a.dueDate && b.dueDate) return 1;
            return (b.createdAt || '').localeCompare(a.createdAt || '');
        });
}

export function getStatusBadge(workStatus: WorkStatus) {
    if (workStatus === 'GRADED') {
        return { className: 'bg-[#DCFCE7] text-[#166534]', label: 'Noté' };
    }
    if (workStatus === 'SUBMITTED') {
        return { className: 'bg-[#DBEAFE] text-[#1E3A8A]', label: 'Soumis' };
    }
    return { className: 'bg-[#F3F4F6] text-[#4B5563]', label: 'Planifié' };
}
