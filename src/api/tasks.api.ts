import { apiClient } from './client';
import type { Task } from '../types';

export const tasksApi = {

    getAll: async (): Promise<Task[]> => {
        const { data } = await apiClient.get('/tasks');
        return data.data;
    },

    getBoard: async (): Promise<Task[]> => {
        const { data } = await apiClient.get('/tasks/board');
        return data.data;
    },

    create: async (payload: Partial<Task>): Promise<Task> => {
        const { data } = await apiClient.post('/tasks', payload);
        return data.data;
    },

    update: async (id: string, payload: Partial<Task>): Promise<Task> => {
        const { data } = await apiClient.patch(`/tasks/${id}`, payload);
        return data.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/tasks/${id}`);
    },

};