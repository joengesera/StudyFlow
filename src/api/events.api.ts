import { apiClient } from './client';
import type { Event } from '../types';

export const eventsApi = {

    getAll: async (): Promise<Event[]> => {
        const { data } = await apiClient.get('/events');
        return data.data;
    },

    create: async (payload: Partial<Event>): Promise<Event> => {
        const { data } = await apiClient.post('/events', payload);
        return data.data;
    },

    update: async (id: string, payload: Partial<Event>): Promise<Event> => {
        const { data } = await apiClient.patch(`/events/${id}`, payload);
        return data.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/events/${id}`);
    },

};