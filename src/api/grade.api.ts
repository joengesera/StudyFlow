import { apiClient, unwrapApiData } from './client';
import type { Grade } from '../types';

export const gradesApi = {

    getAll: async (courseId?: string): Promise<Grade[]> => {
        const { data } = await apiClient.get('/grades', {
            params: courseId ? { courseId } : {},
        });
        return unwrapApiData(data);
    },

    create: async (payload: Partial<Grade>): Promise<Grade> => {
        const { data } = await apiClient.post('/grades', payload);
        return unwrapApiData(data);
    },

    update: async (id: string, payload: Partial<Grade>): Promise<Grade> => {
        const { data } = await apiClient.patch(`/grades/${id}`, payload);
        return unwrapApiData(data);
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/grades/${id}`);
    },

    getCourseAverage: async (courseId: string): Promise<{ average: number }> => {
        const { data } = await apiClient.get(`/grades/course/${courseId}/average`);
        return unwrapApiData(data);
    },

};
