import type { Course } from '../../../types';
import type { WorksStatusFilter } from '../worksShared';

interface WorksFiltersProps {
  courses: Course[];
  statusFilter: WorksStatusFilter;
  courseFilter: string | null;
  onStatusFilterChange: (value: WorksStatusFilter) => void;
  onCourseFilterToggle: (courseId: string) => void;
}

export const WorksFilters = ({
  courses,
  statusFilter,
  courseFilter,
  onStatusFilterChange,
  onCourseFilterToggle,
}: WorksFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Filtres">
      <button onClick={() => onStatusFilterChange('ALL')} className={`btn ${statusFilter === 'ALL' ? 'btn-primary' : 'btn-outlined'}`}>Tous</button>
      <button onClick={() => onStatusFilterChange('PLANNED')} className={`btn ${statusFilter === 'PLANNED' ? 'btn-primary' : 'btn-outlined'}`}>Planifiés</button>
      <button onClick={() => onStatusFilterChange('SUBMITTED')} className={`btn ${statusFilter === 'SUBMITTED' ? 'btn-primary' : 'btn-outlined'}`}>Soumis</button>
      <button onClick={() => onStatusFilterChange('GRADED')} className={`btn ${statusFilter === 'GRADED' ? 'btn-primary' : 'btn-outlined'}`}>Notés</button>

      <div className="w-[1px] h-6 bg-outline-variant self-center mx-1" />

      {courses.slice(0, 5).map((course) => (
        <button
          key={course.id}
          onClick={() => onCourseFilterToggle(course.id)}
          className={`btn flex items-center gap-2 ${courseFilter === course.id ? 'btn-primary' : 'btn-outlined'}`}
        >
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: course.color }} />
          {course.name}
        </button>
      ))}
    </div>
  );
};