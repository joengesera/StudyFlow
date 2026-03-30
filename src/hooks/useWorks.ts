import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { worksAPI } from '../api/works.api';
import type { Work } from '../types';

export const useWorks = () => {
    return useQuery({
        queryKey: ['works'],
        queryFn: worksAPI.getAll,
    });
};

export const useCreateWork = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: worksAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['works'] });
        },
    });
};

export const useUpdateWork = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<Work> }) =>
            worksAPI.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['works'] });
        },
    });
};

export const useDeleteWork = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: worksAPI.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['works'] });
        },
    });
};
