import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coursesAPI } from '../api/course.api';
import type { Course } from '../types';

export const courseKeys = {
    all: ['courses'] as const,
    one: (id: string) => ['courses', id] as const,
};

export const useCourses = () => {
    return useQuery({
        queryKey: courseKeys.all,
        queryFn: coursesAPI.getAll,
    });
};

export const useCourse = (id: string) => {
    return useQuery({
        queryKey: courseKeys.one(id),
        queryFn: () => coursesAPI.getOne(id),
        enabled: !!id,
    });
};

export const useCreateCourse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: coursesAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: courseKeys.all });
        },
    });
};

export const useUpdateCourse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<Course> }) =>
            coursesAPI.update(id, payload),
        onSuccess: (_data, { id }) => {
            queryClient.invalidateQueries({ queryKey: courseKeys.all });
            queryClient.invalidateQueries({ queryKey: courseKeys.one(id) });
        },
    });
};

export const useDeleteCourse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: coursesAPI.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: courseKeys.all });
        },
    });
};