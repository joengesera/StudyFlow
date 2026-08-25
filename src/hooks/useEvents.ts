import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventsApi } from '../api/events.api';
import { insertEntityInCaches, isOfflineMutationResult, removeEntityFromCaches } from '../sync/offlineCaches';
import type { Event } from '../types';

export const eventKeys = {
    all: ['events'] as const,
};

export const useEvents = () => {
    return useQuery({
        queryKey: eventKeys.all,
        queryFn: eventsApi.getAll,
        staleTime: 30_000,
    });
};

const buildOptimisticEvent = (id: string, payload: Partial<Event>): Event => ({
    id,
    title: payload.title ?? '',
    description: payload.description ?? null,
    type: payload.type ?? 'CLASS',
    startDate: payload.startDate ?? new Date().toISOString(),
    endDate: payload.endDate ?? new Date().toISOString(),
    isAllDay: payload.isAllDay ?? false,
    location: payload.location ?? null,
    courseId: payload.courseId ?? null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: 0,
    syncStatus: 'PENDING',
});

export const useCreateEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        // L'id est généré ici UNE SEULE FOIS et sert d'identité locale
        // (optimiste + file de sync) avant le remap serveur.
        mutationFn: (payload: Partial<Event>) => {
            const localId = payload.id ?? crypto.randomUUID();
            insertEntityInCaches(queryClient, 'Event', buildOptimisticEvent(localId, payload));
            return eventsApi.create({ ...payload, id: localId });
        },

        onError: () => {
            // Échec réel (réponse d'erreur serveur) → resynchronise depuis la source.
            queryClient.invalidateQueries({ queryKey: eventKeys.all });
        },

        onSuccess: (created) => {
            if (isOfflineMutationResult(created)) return;
            // Refetch pour remplacer l'event optimiste par les vraies données serveur.
            queryClient.invalidateQueries({ queryKey: eventKeys.all });
        },
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<Event> }) =>
            eventsApi.update(id, payload),

        onMutate: async ({ id, payload }) => {
            await queryClient.cancelQueries({ queryKey: eventKeys.all });
            const previous = queryClient.getQueryData<Event[]>(eventKeys.all);

            queryClient.setQueryData<Event[]>(eventKeys.all, (old) =>
                old?.map((e) => e.id === id ? { ...e, ...payload } : e) ?? []
            );

            return { previous };
        },

        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(eventKeys.all, context.previous);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: eventKeys.all });
        },
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => {
            removeEntityFromCaches(queryClient, 'Event', id);
            return eventsApi.delete(id);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: eventKeys.all });
        },
    });
};
