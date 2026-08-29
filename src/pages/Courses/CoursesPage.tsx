import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '../../hooks/useCourses';
import { useGrades } from '../../hooks/useGrades';
import { useTasks } from '../../hooks/useTasks';
import { useEvents } from '../../hooks/useEvents';
import { useRisk } from '../../hooks/useRisks';
import { pointsAverage } from '../../utils/pointsEngine';
import { riskScoreStyles } from '../../utils/risk';
import type { Course, Task, Event } from '../../types';
import CourseFormModal from '../../components/Courses/CourseFormModal';

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

  const average = grades.length === 0 ? null : pointsAverage(grades);

  const riskLevel = risk?.level || 'LOW';
  const rStyle = riskScoreStyles(risk?.overallScore ?? 0);

  const progressValue = average !== null ? Math.min(average * 5, 100) : 0;

  const initial = course.code.charAt(0).toUpperCase();

  return (
    <div
      className="card card-padded flex flex-col transition-all cursor-pointer group hover:shadow-md border-t-[3px] rounded-t-xl"
      style={{ borderColor: course.color }}
      onClick={() => onClick(course.id)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg text-white"
            style={{ background: course.color }}
          >
            {initial}
          </div>
          <div>
            <h3 className="text-headline-sm font-headline-sm text-on-surface group-hover:text-primary transition-colors">{course.name}</h3>
            <span className="text-label-caps font-label-caps text-on-surface-variant">{course.code} • {course.credits ?? 3} CRÉDITS</span>
          </div>
        </div>
        <button className="text-outline hover:text-on-surface" aria-label="Plus d'options">
          <span className="material-symbols-outlined text-sm">more_vert</span>
        </button>
      </div>
      <div className="border-t border-outline-variant py-4 my-2 flex justify-between items-center">
        <div>
          <span className="text-label-sm font-label-sm text-on-surface-variant block mb-1">Moyenne actuelle</span>
          <span className="text-headline-md font-headline-md text-on-surface">
            {average !== null ? average.toFixed(1) : '-'}
            <span className="text-body-md text-on-surface-variant">/ 20</span>
          </span>
        </div>
        <div className={`px-2 py-1 rounded ${rStyle.bg} ${rStyle.text} border border-outline-variant text-label-caps font-label-caps flex items-center gap-1`}>
          <span className={`w-1.5 h-1.5 rounded-full ${rStyle.dot}`} />
          {riskLevel === 'LOW' ? 'FAIBLE' : riskLevel === 'MEDIUM' ? 'MOYEN' : 'ÉLEVÉ'}
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-label-sm font-label-sm mb-2">
          <span className="text-on-surface">Progression</span>
          <span className="text-on-surface-variant">{Math.round(progressValue)}%</span>
        </div>
        <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: `${progressValue}%` }} />
        </div>
      </div>
      <div className="mt-auto flex justify-between text-label-sm font-label-sm text-on-surface-variant pt-2 border-t border-outline-variant">
        <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">edit_document</span> {grades.length} notes</div>
        <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">task_alt</span> {courseTasks.length} tâches</div>
        <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">event</span> {courseEvents.length} évènements</div>
      </div>
    </div>
  );
};

const AddCourseCard = ({ onClick }: { onClick: () => void }) => (
  <div
    onClick={onClick}
    className="card cursor-pointer border-dashed border-outline-variant flex flex-col items-center justify-center min-h-[200px] hover:border-primary transition-colors group"
  >
    <span className="material-symbols-outlined text-4xl text-outline mb-2 group-hover:text-primary transition-colors">add</span>
    <p className="text-body-md font-body-md text-on-surface-variant text-center">Ajouter un cours</p>
  </div>
);

export default function CoursesPage() {
  const navigate = useNavigate();
  const { data: courses = [], isLoading } = useCourses();
  const { data: tasks = [] } = useTasks();
  const { data: events = [] } = useEvents();

  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('Tous');

  const activeCourses = courses.filter((c) => !c.isDeleted);
  const filteredCourses = activeCourses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = riskFilter === 'Tous' || (course as { riskLevel?: string }).riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-8">
      {/* Page Header & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-display-lg font-display-lg text-on-surface">Cours actifs</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant mt-2">Gérez vos modules et suivez vos performances académiques.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-4 py-2 bg-surface text-body-md font-body-md text-on-surface border border-outline-variant rounded focus:border-primary focus:ring-0 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex items-center bg-surface border border-outline-variant rounded p-1">
            <button
              className={`px-3 py-1 text-label-sm font-label-sm rounded transition-colors ${
                riskFilter === 'Tous'
                  ? 'bg-surface-container-high text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
              onClick={() => setRiskFilter('Tous')}
            >
              Tous
            </button>
            <button
              className={`px-3 py-1 text-label-sm font-label-sm rounded transition-colors ${
                riskFilter === 'Critiques'
                  ? 'bg-surface-container-high text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
              onClick={() => setRiskFilter('Critiques')}
            >
              Critiques
            </button>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
        {isLoading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="card card-padded animate-pulse h-[220px]">
              <div className="h-6 bg-surface-container-highest rounded w-1/2 mb-4" />
              <div className="h-4 bg-surface-container-highest rounded w-1/3 mb-4" />
              <div className="h-20 bg-surface-container-highest rounded" />
            </div>
          ))
        ) : filteredCourses.length === 0 ? (
          <div className="col-span-full border border-dashed border-outline-variant rounded-lg p-12 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-4xl text-outline mb-4">school</span>
            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">Aucun cours trouvé</h3>
            <p className="text-body-md font-body-md text-on-surface-variant max-w-md mb-6">
              Il semble que vous n'ayez pas encore ajouté de cours à votre semestre, ou qu'aucun cours ne corresponde à vos filtres.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-primary text-on-primary px-4 py-2 rounded text-label-sm font-label-sm hover:bg-primary-container transition-colors"
            >
              Ajouter un cours
            </button>
          </div>
        ) : (
          <>
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                tasks={tasks}
                events={events}
                onClick={(id) => navigate(`/courses/${id}`)}
              />
            ))}
            <AddCourseCard onClick={() => setShowModal(true)} />
          </>
        )}
      </div>

      {/* Modal de création */}
      {showModal && (
        <CourseFormModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}