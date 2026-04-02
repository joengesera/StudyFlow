import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coursesAPI } from '../api/course.api';
import { useSyncStore } from '../stores/syncStore';
import type { Course } from '../types';

export const courseKeys = {
    all: ['courses'] as const,
    one: (id: string) => ['courses', id] as const,
};

export const useCourses = () => {
    const setCacheCourses = useSyncStore((s) => s.setCacheCourses);
    const cachedCourses = useSyncStore((s) => s.cache.courses);

    return useQuery({
        queryKey: courseKeys.all,
        queryFn: async () => {
            const courses = await coursesAPI.getAll();
            // Persiste dans le browser store pour usage offline
            setCacheCourses(courses);
            return courses;
        },
        initialData: cachedCourses.length > 0 ? cachedCourses : undefined,
        staleTime: 30_000,
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