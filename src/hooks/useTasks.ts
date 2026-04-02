import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksApi } from '../api/tasks.api';
import { useSyncStore } from '../stores/syncStore';
import type { Task } from '../types';

// Clés de cache — un seul endroit pour les nommer
export const taskKeys = {
    all: ['tasks'] as const,
    board: ['tasks', 'board'] as const,
};

export const useTasks = () => {
    const setCacheTasks = useSyncStore((s) => s.setCacheTasks);
    const cachedTasks = useSyncStore((s) => s.cache.tasks);

    return useQuery({
        queryKey: taskKeys.all,
        queryFn: async () => {
            const tasks = await tasksApi.getAll();
            // Persiste dans le browser store pour usage offline
            setCacheTasks(tasks);
            return tasks;
        },
        initialData: cachedTasks.length > 0 ? cachedTasks : undefined,
        staleTime: 30_000,
    });
};

export const useBoardTasks = () => {
    return useQuery({
        queryKey: taskKeys.board,
        queryFn: tasksApi.getBoard,
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    const updateCacheTask = useSyncStore((s) => s.updateCacheTask);

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<Task> }) =>
            tasksApi.update(id, payload),

        // Mise à jour optimiste — on met à jour le cache React Query ET le cache local
        // avant que le serveur réponde pour que l'UI soit instantanée
        onMutate: async ({ id, payload }) => {
            await queryClient.cancelQueries({ queryKey: taskKeys.all });
            const previous = queryClient.getQueryData<Task[]>(taskKeys.all);

            // Optimistic update dans React Query
            queryClient.setQueryData<Task[]>(taskKeys.all, (old) =>
                old?.map((t) => t.id === id ? { ...t, ...payload } : t) ?? []
            );

            // Optimistic update dans le store local (pour offline)
            updateCacheTask(id, payload);

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
        },
    });
};

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: tasksApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: taskKeys.all });
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: tasksApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: taskKeys.all });
        },
    });
};