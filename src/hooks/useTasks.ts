import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksApi } from '../api/tasks.api';
import { insertEntityInCaches, isOfflineMutationResult, removeEntityFromCaches } from '../sync/offlineCaches';
import type { Task } from '../types';

// Clés de cache — un seul endroit pour les nommer
export const taskKeys = {
    all: ['tasks'] as const,
    board: ['tasks', 'board'] as const,
};

export const useTasks = () => {
    return useQuery({
        queryKey: taskKeys.all,
        queryFn: tasksApi.getAll,
        staleTime: 30_000,
    });
};

export const useBoardTasks = () => {
    return useQuery({
        queryKey: taskKeys.board,
        queryFn: tasksApi.getBoard,
    });
};

const buildOptimisticTask = (id: string, payload: Partial<Task>): Task => ({
    id,
    title: payload.title ?? '',
    description: payload.description ?? null,
    status: payload.status ?? 'PENDING',
    priority: payload.priority ?? 'MEDIUM',
    dueDate: payload.dueDate ?? null,
    completedAt: payload.completedAt ?? null,
    courseId: payload.courseId ?? null,
    eventId: null,
    durationMinutes: payload.durationMinutes ?? null,
    timeSpentMinutes: payload.timeSpentMinutes ?? 0,
    position: payload.position ?? Date.now(),
    startedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: 0,
    syncStatus: 'PENDING',
    isDeleted: false,
});

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: Partial<Task>) => {
            // L'id est généré ici UNE SEULE FOIS : il sert d'identité à la
            // tâche optimiste ET au payload envoyé — l'intercepteur offline
            // le réutilise comme localId dans la file de synchronisation.
            const localId = payload.id ?? crypto.randomUUID();
            insertEntityInCaches(queryClient, 'Task', buildOptimisticTask(localId, payload));
            return tasksApi.create({ ...payload, id: localId });
        },
        onSuccess: (created) => {
            // Hors ligne : on garde l'entrée optimiste telle quelle, la file
            // de sync se chargera du remap localId → id serveur.
            if (isOfflineMutationResult(created)) return;
            queryClient.invalidateQueries({ queryKey: taskKeys.all });
            queryClient.invalidateQueries({ queryKey: taskKeys.board });
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<Task> }) =>
            tasksApi.update(id, payload),

        // Mise à jour optimiste — l'UI est instantanée et le cache persisté
        // sert de source offline.
        onMutate: async ({ id, payload }) => {
            await queryClient.cancelQueries({ queryKey: taskKeys.all });
            const previous = queryClient.getQueryData<Task[]>(taskKeys.all);

            queryClient.setQueryData<Task[]>(taskKeys.all, (old) =>
                old?.map((t) => t.id === id ? { ...t, ...payload } : t) ?? []
            );

            return { previous };
        },

        // Si erreur — on remet les données d'avant
        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(taskKeys.all, context.previous);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: taskKeys.all });
            queryClient.invalidateQueries({ queryKey: taskKeys.board });
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => {
            removeEntityFromCaches(queryClient, 'Task', id);
            return tasksApi.delete(id);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: taskKeys.all });
            queryClient.invalidateQueries({ queryKey: taskKeys.board });
        },
    });
};
