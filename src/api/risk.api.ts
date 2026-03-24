import { apiClient } from './client';
import type { RiskAnalysis } from '../types';

export const riskApi = {

    getCourseRisk: async (courseId: string): Promise<RiskAnalysis> => {
        const { data } = await apiClient.get(`/risk/course/${courseId}`);
        return data.data;
    },

};