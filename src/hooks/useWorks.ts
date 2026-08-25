import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { worksAPI } from '../api/works.api';
import { insertEntityInCaches, isOfflineMutationResult, removeEntityFromCaches } from '../sync/offlineCaches';
import type { Work } from '../types';

export const workKeys = {
    all: ['works'] as const,
};

export const useWorks = () => {
    return useQuery({
        queryKey: workKeys.all,
        queryFn: worksAPI.getAll,
    });
};

const buildOptimisticWork = (id: string, payload: Partial<Work>): Work => ({
    id,
    title: payload.title ?? '',
    description: payload.description ?? null,
    status: payload.status ?? 'PLANNED',
    dueDate: payload.dueDate ?? null,
    submittedAt: payload.submittedAt ?? null,
    gradedAt: payload.gradedAt ?? null,
    pointsEarned: payload.pointsEarned ?? null,
    pointsPossible: payload.pointsPossible ?? 20,
    percentage: payload.percentage ?? null,
    comment: payload.comment ?? null,
    courseId: payload.courseId ?? '',
    eventId: payload.eventId ?? null,
    workTypeId: payload.workTypeId ?? null,
    workTypeLabel: payload.workTypeLabel ?? null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
});

export const useCreateWork = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: Partial<Work>) => {
            const localId = payload.id ?? crypto.randomUUID();
            insertEntityInCaches(queryClient, 'Work', buildOptimisticWork(localId, payload));
            return worksAPI.create({ ...payload, id: localId });
        },
        onSuccess: (created) => {
            if (isOfflineMutationResult(created)) return;
            queryClient.invalidateQueries({ queryKey: workKeys.all });
        },
    });
};

export const useUpdateWork = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<Work> }) =>
            worksAPI.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: workKeys.all });
        },
    });
};

export const useDeleteWork = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => {
            removeEntityFromCaches(queryClient, 'Work', id);
            return worksAPI.delete(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: workKeys.all });
        },
    });
};
