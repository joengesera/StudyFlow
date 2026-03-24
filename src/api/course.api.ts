import { apiClient } from './client';
import type { Course } from '../types';

export const coursesAPI = {

    getAll: async (): Promise<Course[]> => {
        const { data } = await apiClient.get('/courses');
        return data.data;
    },

    getOne: async (id: string): Promise<Course> => {
        const { data } = await apiClient.get(`/courses/${id}`);
        return data.data;
    },

    create: async (payload: Partial<Course>): Promise<Course> => {
        const { data } = await apiClient.post('/courses', payload);
        return data.data;
    },

    update: async (id: string, payload: Partial<Course>): Promise<Course> => {
        const { data } = await apiClient.patch(`/courses/${id}`, payload);
        return data.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/courses/${id}`);
    },

};