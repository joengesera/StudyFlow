import type { AgendaCourse } from '../agendaShared';

interface CourseFilterBarProps {
  activeCourseFilter: string | null;
  courses: AgendaCourse[];
  onSelectCourse: (courseId: string) => void;
  onReset: () => void;
}

export function CourseFilterBar({
  activeCourseFilter,
  courses,
  onSelectCourse,
  onReset,
}: CourseFilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Filtres par cours">
      <button
        onClick={onReset}
        className={`px-4 py-2 rounded-full text-label-sm font-label-sm transition-colors ${activeCourseFilter === null ? 'bg-primary text-on-primary' : 'btn-outlined'}`}
      >
        Tous
      </button>
      {courses.map((course) => (
        <button
          key={course.id}
          onClick={() => onSelectCourse(course.id)}
          className={`px-4 py-2 rounded-full text-label-sm font-label-sm transition-colors flex items-center gap-2 ${activeCourseFilter === course.id ? 'bg-primary text-on-primary' : 'btn-outlined'}`}
        >
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: course.color }} />
          {course.name}
        </button>
      ))}
    </div>
  );
}