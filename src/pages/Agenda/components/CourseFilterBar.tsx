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
        <div className="flex flex-wrap gap-2.5 mt-5 mb-2">
            <button
                onClick={onReset}
                className={`px-4 py-[6px] rounded-full text-[13px] font-bold transition-colors ${activeCourseFilter === null ? 'bg-[#1A1A1A] text-white' : 'bg-transparent border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#A3A3A3]'}`}
            >
                Tous
            </button>
            {courses.map((course) => (
                <button
                    key={course.id}
                    onClick={() => onSelectCourse(course.id)}
                    className={`px-3.5 py-[6px] rounded-full text-[13px] font-bold transition-colors flex items-center gap-2 border ${activeCourseFilter === course.id ? 'bg-[#FAF9F6] border-[#A3A3A3] text-[#1A1A1A]' : 'bg-transparent border-[#E5E5E5] text-[#1A1A1A] hover:border-[#A3A3A3]'}`}
                >
                    <span className="w-2.5 h-2.5 rounded-full mt-0.5" style={{ background: course.color }} />
                    {course.name}
                </button>
            ))}
        </div>
    );
}
