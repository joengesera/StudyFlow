import { useQuery } from '@tanstack/react-query';
import { riskApi } from '../api/risk.api';

export const riskKeys = {
    course: (courseId: string) => ['risk', courseId] as const,
};

export const useRisk = (courseId: string) => {
    return useQuery({
        queryKey: riskKeys.course(courseId),
        queryFn: () => riskApi.getCourseRisk(courseId),
        enabled: !!courseId,
    });
};