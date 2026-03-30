import { apiClient, unwrapApiData } from './client';
import type { Task } from '../types';

export const tasksApi = {

    getAll: async (): Promise<Task[]> => {
        const { data } = await apiClient.get('/tasks');
        return unwrapApiData(data);
    },

    getBoard: async (): Promise<Task[]> => {
        const { data } = await apiClient.get('/tasks/board');
        return unwrapApiData(data);
    },

    create: async (payload: Partial<Task>): Promise<Task> => {
        const { data } = await apiClient.post('/tasks', payload);
        return unwrapApiData(data);
    },

    update: async (id: string, payload: Partial<Task>): Promise<Task> => {
        const { data } = await apiClient.patch(`/tasks/${id}`, payload);
        return unwrapApiData(data);
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/tasks/${id}`);
    },

};
