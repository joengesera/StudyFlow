import { apiClient, unwrapApiData } from './client';
import type { Work } from '../types';

export const worksAPI = {
    getAll: async (): Promise<Work[]> => {
        const { data } = await apiClient.get('/works');
        return unwrapApiData(data);
    },
    getOne: async (id: string): Promise<Work> => {
        const { data } = await apiClient.get(`/works/${id}`);
        return unwrapApiData(data);
    },
    create: async (payload: Partial<Work>): Promise<Work> => {
        const { data } = await apiClient.post('/works', payload);
        return unwrapApiData(data);
    },
    update: async (id: string, payload: Partial<Work>): Promise<Work> => {
        const { data } = await apiClient.patch(`/works/${id}`, payload);
        return unwrapApiData(data);
    },
    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/works/${id}`);
    },
};
