import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { gradesApi } from '../api/grade.api';
import { insertEntityInCaches, isOfflineMutationResult, removeEntityFromCaches } from '../sync/offlineCaches';
import type { Grade } from '../types';

export const gradeKeys = {
    all: ['grades'] as const,
    byCourse: (courseId: string) => ['grades', 'course', courseId] as const,
    average: (courseId: string) => ['grades', 'average', courseId] as const,
};

export const useGrades = (courseId?: string) => {
    return useQuery({
        queryKey: courseId ? gradeKeys.byCourse(courseId) : gradeKeys.all,
        queryFn: () => gradesApi.getAll(courseId),
    });
};

export const useCourseAverage = (courseId: string) => {
    return useQuery({
        queryKey: gradeKeys.average(courseId),
        queryFn: () => gradesApi.getCourseAverage(courseId),
        enabled: !!courseId,
    });
};

const buildOptimisticGrade = (id: string, payload: Partial<Grade>): Grade => ({
    id,
    name: payload.name ?? '',
    score: payload.score ?? 0,
    maxScore: payload.maxScore ?? 20,
    percentage: payload.percentage ?? null,
    weight: payload.weight ?? null,
    workTypeLabel: payload.workTypeLabel ?? null,
    workId: payload.workId ?? null,
    date: payload.date ?? null,
    comment: payload.comment ?? null,
    courseId: payload.courseId ?? '',
    workTypeId: payload.workTypeId ?? null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
});

export const useCreateGrade = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: Partial<Grade>) => {
            const localId = payload.id ?? crypto.randomUUID();
            if (payload.courseId) {
                insertEntityInCaches(queryClient, 'Grade', buildOptimisticGrade(localId, payload));
            }
            return gradesApi.create({ ...payload, id: localId });
        },
        onSuccess: (created, variables) => {
            if (isOfflineMutationResult(created)) return;
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

        onMutate: async ({ id, payload }) => {
            await queryClient.cancelQueries({ queryKey: gradeKeys.all });
            const previous = queryClient.getQueryData<Grade[]>(gradeKeys.all);

            queryClient.setQueryData<Grade[]>(gradeKeys.all, (old) =>
                old?.map((g) => g.id === id ? { ...g, ...payload } : g) ?? []
            );

            return { previous };
        },

        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(gradeKeys.all, context.previous);
            }
        },

        onSettled: (updated) => {
            if (isOfflineMutationResult(updated)) return;
            queryClient.invalidateQueries({ queryKey: gradeKeys.all });
        },
    });
};

export const useDeleteGrade = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => {
            removeEntityFromCaches(queryClient, 'Grade', id);
            return gradesApi.delete(id);
        },
        onSettled: (result) => {
            if (isOfflineMutationResult(result)) return;
            queryClient.invalidateQueries({ queryKey: gradeKeys.all });
        },
    });
};
