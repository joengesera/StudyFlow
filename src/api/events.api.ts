import { apiClient, unwrapApiData } from './client';
import type { Event } from '../types';

export const eventsApi = {

    getAll: async (): Promise<Event[]> => {
        const { data } = await apiClient.get('/events');
        return unwrapApiData(data);
    },

    create: async (payload: Partial<Event>): Promise<Event> => {
        const { data } = await apiClient.post('/events', payload);
        return unwrapApiData(data);
    },

    update: async (id: string, payload: Partial<Event>): Promise<Event> => {
        const { data } = await apiClient.patch(`/events/${id}`, payload);
        return unwrapApiData(data);
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/events/${id}`);
    },

};
