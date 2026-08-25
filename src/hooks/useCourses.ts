import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coursesAPI } from '../api/course.api';
import { insertEntityInCaches, isOfflineMutationResult, removeEntityFromCaches } from '../sync/offlineCaches';
import type { Course } from '../types';

export const courseKeys = {
    all: ['courses'] as const,
    one: (id: string) => ['courses', id] as const,
};

export const useCourses = () => {
    return useQuery({
        queryKey: courseKeys.all,
        queryFn: coursesAPI.getAll,
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

export const useCourseWorkTypes = (courseId?: string) => {
    return useQuery({
        queryKey: ['courses', courseId, 'work-types'],
        queryFn: () => coursesAPI.getWorkTypes(courseId as string),
        enabled: !!courseId,
    });
};

const buildOptimisticCourse = (id: string, payload: Partial<Course>): Course => ({
    id,
    code: payload.code ?? '',
    name: payload.name ?? '',
    description: payload.description ?? null,
    color: payload.color ?? '#607d8b',
    credits: payload.credits ?? null,
    userId: payload.userId ?? '',
    isDeleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    syncStatus: 'PENDING',
});

export const useCreateCourse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: Partial<Course>) => {
            const localId = payload.id ?? crypto.randomUUID();
            insertEntityInCaches(queryClient, 'Course', buildOptimisticCourse(localId, payload));
            return coursesAPI.create({ ...payload, id: localId });
        },
        onSuccess: (created) => {
            if (isOfflineMutationResult(created)) return;
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
        mutationFn: (id: string) => {
            removeEntityFromCaches(queryClient, 'Course', id);
            return coursesAPI.delete(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: courseKeys.all });
        },
    });
};
