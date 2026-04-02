import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '../../hooks/useCourses';
import { useGrades } from '../../hooks/useGrades';
import { useTasks } from '../../hooks/useTasks';
import { useEvents } from '../../hooks/useEvents';
import { useRisk } from '../../hooks/useRisks';
import type { Course, Task, Event } from '../../types';
import CourseFormModal from '../../components/Courses/CourseFormModal';

// ─── Helpers ──────────────────────────────────────────────
const riskStyles = {
    LOW: { text: "text-[#3B8A44]", bg: "bg-[#E8F2E8]" },
    MEDIUM: { text: "text-[#A36D16]", bg: "bg-[#F5EDDF]" },
    HIGH: { text: "text-[#B22A2A]", bg: "bg-[#F5E2E2]" },
    CRITICAL: { text: "text-[#B22A2A]", bg: "bg-[#F5E2E2]" }
};

// ─── Composant carte cours ─────────────────────────────────

interface CourseCardProps {
    course: Course;
    tasks: Task[];
    events: Event[];
    onClick: (id: string) => void;
}

const CourseCard = ({ course, tasks, events, onClick }: CourseCardProps) => {
    const { data: grades = [] } = useGrades(course.id);
    const { data: risk } = useRisk(course.id);

    const courseTasks = tasks.filter(t => t.courseId === course.id && !t.isDeleted);
    const courseEvents = events.filter(e => e.courseId === course.id);

    const average = grades.length === 0 ? null :
        grades.reduce((sum, g) => sum + ((g.score / g.maxScore) * 20) * (g.weight ?? 1), 0) /
        grades.reduce((sum, g) => sum + (g.weight ?? 1), 0);

    const riskLevel = risk?.level || 'LOW';
    const rStyle = riskStyles[riskLevel as keyof typeof riskStyles] || riskStyles.LOW;

    const progressValue = average !== null ? (average / 20) * 100 : 0;

    return (
        <div
            className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[20px] p-5 cursor-pointer hover:shadow-md transition-all flex flex-col relative min-h-[170px]"
            onClick={() => onClick(course.id)}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full shrink-0" style={{ background: course.color }} />
                    <div className="font-bold text-[17px] text-[#1A1A1A] tracking-tight">{course.name}</div>
                </div>
                <div className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-widest uppercase ${rStyle.bg} ${rStyle.text}`}>
                    {riskLevel}
                </div>
            </div>

            {/* Subtitle */}
            <div className="text-[13px] text-[#737373] mb-5 font-medium">
                {course.code} · {course.credits ?? 3} crédits
            </div>

            {/* Stats Row */}
            <div className="flex items-center text-center mt-auto mb-5 px-1">
                <div className="flex-1">
                    <div className="text-[19px] font-bold text-[#1A1A1A]">{average !== null ? average.toFixed(1) : '-'}</div>
                    <div className="text-[11px] text-[#737373] font-medium mt-0.5">Moyenne</div>
                </div>
                <div className="w-px h-8 bg-[#E5E5E5]" />
                <div className="flex-1">
                    <div className="text-[19px] font-bold text-[#1A1A1A]">{grades.length}</div>
                    <div className="text-[11px] text-[#737373] font-medium mt-0.5">Notes</div>
                </div>
                <div className="w-px h-8 bg-[#E5E5E5]" />
                <div className="flex-1">
                    <div className="text-[19px] font-bold text-[#1A1A1A]">{courseTasks.length}</div>
                    <div className="text-[11px] text-[#737373] font-medium mt-0.5">Tâches</div>
                </div>
                <div className="w-px h-8 bg-[#E5E5E5]" />
                <div className="flex-1">
                    <div className="text-[19px] font-bold text-[#1A1A1A]">{courseEvents.length}</div>
                    <div className="text-[11px] text-[#737373] font-medium mt-0.5">Events</div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 rounded-full bg-[#E5E5E5] overflow-hidden mt-auto mx-1">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progressValue}%`, background: course.color }} />
            </div>
        </div>
    );
};

// ─── Add Course Component ──────────────────────────────────

const AddCourseCard = ({ onClick }: { onClick: () => void }) => (
    <div
        onClick={onClick}
        className="border border-dashed border-[#D4D4D4] rounded-[20px] p-5 cursor-pointer hover:bg-gray-50 transition-all flex flex-col items-center justify-center min-h-[170px]"
    >
        <div className="text-2xl text-[#737373] mb-2 font-light">+</div>
        <div className="text-[14px] font-medium text-[#737373]">Ajouter un cours</div>
    </div>
);

// ─── Page principale ───────────────────────────────────────

export default function CoursesPage() {
    const navigate = useNavigate();
    const { data: courses = [], isLoading } = useCourses();
    const { data: tasks = [] } = useTasks();
    const { data: events = [] } = useEvents();

    const [showModal, setShowModal] = useState(false);
    const [riskFilter, setRiskFilter] = useState('Tous les risques');

    const activeCourses = courses.filter((c) => !c.isDeleted);

    return (
        <div className="max-w-5xl mx-auto px-4 md:px-6 pt-4 pb-10">

            {/* Header select (Filter imitation) */}
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-[28px] font-bold text-[#1A1A1A] tracking-tight">Cours</h1>
                <div className="border border-[#E5E5E5] bg-[#FAF9F6] rounded-xl flex items-center pr-3 max-w-[200px]">
                    <select
                        value={riskFilter}
                        onChange={(e) => setRiskFilter(e.target.value)}
                        className="flex-1 bg-transparent p-3 text-[14px] font-medium text-[#1A1A1A] outline-none cursor-pointer appearance-none"
                    >
                        <option>Tous les risques</option>
                        <option>LOW</option>
                        <option>MEDIUM</option>
                        <option>HIGH</option>
                        <option>CRITICAL</option>
                    </select>
                    {/* Flèche SVG pour le select personnalisé */}
                    <svg className="w-4 h-4 text-[#737373] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-44 bg-gray-100 rounded-[20px] animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                    {activeCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            tasks={tasks}
                            events={events}
                            onClick={(id) => navigate(`/courses/${id}`)}
                        />
                    ))}
                    {/* Toujours le bouton ajouter à la fin */}
                    <AddCourseCard onClick={() => setShowModal(true)} />
                </div>
            )}

            {/* Modal de création */}
            {showModal && (
                <CourseFormModal onClose={() => setShowModal(false)} />
            )}

        </div>
    );
}