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