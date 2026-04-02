import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventsApi } from '../api/events.api';
import { useSyncStore } from '../stores/syncStore';
import type { Event } from '../types';

export const eventKeys = {
    all: ['events'] as const,
};

export const useEvents = () => {
    const setCacheEvents = useSyncStore((s) => s.setCacheEvents);
    const cachedEvents = useSyncStore((s) => s.cache.events);

    return useQuery({
        queryKey: eventKeys.all,
        queryFn: async () => {
            const events = await eventsApi.getAll();
            // Persiste dans le browser store pour usage offline
            setCacheEvents(events);
            return events;
        },
        // initialData sert le cache local UNIQUEMENT si React Query n'a encore aucune donnée fraîche
        // (contrairement à placeholderData qui est remplacé dès que React Query a des données)
        initialData: cachedEvents.length > 0 ? cachedEvents : undefined,
        // On invalide le cache React Query régulièrement pour forcer un refetch
        staleTime: 30_000, // 30 secondes
    });
};

export const useCreateEvent = () => {
    const queryClient = useQueryClient();
    const setCacheEvents = useSyncStore((s) => s.setCacheEvents);

    return useMutation({
        mutationFn: eventsApi.create,

        // Mise à jour optimiste : ajoute l'event localement avant la réponse du serveur
        onMutate: async (newEvent) => {
            await queryClient.cancelQueries({ queryKey: eventKeys.all });
            const previous = queryClient.getQueryData<Event[]>(eventKeys.all);

            const optimisticEvent: Event = {
                id: `temp-${crypto.randomUUID()}`,
                title: newEvent.title ?? '',
                type: newEvent.type ?? 'CLASS',
                startDate: newEvent.startDate ?? new Date().toISOString(),
                endDate: newEvent.endDate ?? new Date().toISOString(),
                isAllDay: newEvent.isAllDay ?? false,
                location: newEvent.location,
                courseId: newEvent.courseId,
                description: newEvent.description,
                version: 0,
                syncStatus: 'PENDING',
            };

            queryClient.setQueryData<Event[]>(eventKeys.all, (old = []) => [...old, optimisticEvent]);

            return { previous };
        },

        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(eventKeys.all, context.previous);
            }
        },

        onSuccess: () => {
            // Refetch pour remplacer l'event temporaire par les vraies données serveur
            queryClient.invalidateQueries({ queryKey: eventKeys.all });
        },

        onSettled: (_data, _err, _vars, _ctx) => {
            // Met à jour aussi le cache store local après succès ou echec
            const fresh = queryClient.getQueryData<Event[]>(eventKeys.all);
            if (fresh) setCacheEvents(fresh);
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
        mutationFn: eventsApi.delete,

        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: eventKeys.all });
            const previous = queryClient.getQueryData<Event[]>(eventKeys.all);

            queryClient.setQueryData<Event[]>(eventKeys.all, (old) =>
                old?.filter((e) => e.id !== id) ?? []
            );

            return { previous };
        },

        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(eventKeys.all, context.previous);
            }
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: eventKeys.all });
        },
    });
};