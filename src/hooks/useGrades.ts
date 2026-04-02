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