import { apiClient, unwrapApiData } from './client';
import type { Course } from '../types';

export const coursesAPI = {

    getAll: async (): Promise<Course[]> => {
        const { data } = await apiClient.get('/courses');
        return unwrapApiData(data);
    },

    getOne: async (id: string): Promise<Course> => {
        const { data } = await apiClient.get(`/courses/${id}`);
        return unwrapApiData(data);
    },

    create: async (payload: Partial<Course>): Promise<Course> => {
        const { data } = await apiClient.post('/courses', payload);
        return unwrapApiData(data);
    },

    update: async (id: string, payload: Partial<Course>): Promise<Course> => {
        const { data } = await apiClient.patch(`/courses/${id}`, payload);
        return unwrapApiData(data);
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/courses/${id}`);
    },

};
