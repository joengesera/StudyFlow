import type { Course } from '../../../types';
import type { WorksStatusFilter } from '../worksShared';

interface WorksFiltersProps {
    courses: Course[];
    statusFilter: WorksStatusFilter;
    courseFilter: string | null;
    onStatusFilterChange: (value: WorksStatusFilter) => void;
    onCourseFilterToggle: (courseId: string) => void;
}

const statusButtonClass = (active: boolean) =>
    `px-4 py-[6px] rounded-full text-[13px] font-bold transition-colors ${active ? 'bg-[#1A1A1A] text-white' : 'bg-transparent border border-[#E5E5E5] text-[#1A1A1A] hover:bg-gray-50'}`;

export const WorksFilters = ({
    courses,
    statusFilter,
    courseFilter,
    onStatusFilterChange,
    onCourseFilterToggle,
}: WorksFiltersProps) => {
    return (
        <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => onStatusFilterChange('ALL')} className={statusButtonClass(statusFilter === 'ALL')}>
                Tous
            </button>
            <button onClick={() => onStatusFilterChange('PLANNED')} className={statusButtonClass(statusFilter === 'PLANNED')}>
                Planifiés
            </button>
            <button onClick={() => onStatusFilterChange('SUBMITTED')} className={statusButtonClass(statusFilter === 'SUBMITTED')}>
                Soumis
            </button>
            <button onClick={() => onStatusFilterChange('GRADED')} className={statusButtonClass(statusFilter === 'GRADED')}>
                Notés
            </button>

            <div className="w-[1px] h-6 bg-[#E5E5E5] self-center mx-1" />

            {courses.slice(0, 5).map((course) => (
                <button
                    key={course.id}
                    onClick={() => onCourseFilterToggle(course.id)}
                    className={`px-3.5 py-[6px] rounded-full text-[13px] font-bold transition-colors flex items-center gap-2 border ${courseFilter === course.id ? 'bg-[#FAF9F6] border-[#A3A3A3]' : 'bg-transparent border-[#E5E5E5] text-[#1A1A1A] hover:bg-gray-50'}`}
                >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: course.color }} />
                    {course.name}
                </button>
            ))}
        </div>
    );
};
