import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventsApi } from '../api/events.api';
import type { Event } from '../types';

export const eventKeys = {
    all: ['events'] as const,
};

export const useEvents = () => {
    return useQuery({
        queryKey: eventKeys.all,
        queryFn: eventsApi.getAll,
    });
};

export const useCreateEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: eventsApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: eventKeys.all });
        },
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<Event> }) =>
            eventsApi.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: eventKeys.all });
        },
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: eventsApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: eventKeys.all });
        },
    });
};