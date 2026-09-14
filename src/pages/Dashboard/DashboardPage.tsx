import { MapPin, CalendarX, Check } from 'lucide-react';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAuthStore } from '../../stores/authStore';
import { useTasks, useUpdateTask } from '../../hooks/useTasks';
import { useEvents } from '../../hooks/useEvents';
import { useCourses } from '../../hooks/useCourses';
import { useGrades } from '../../hooks/useGrades';
import { useDashboardStats } from '../../hooks/useRisks';
import type { Task, Event } from '../../types';

const formatTime = (dateStr: string) =>
  new Date(dateStr).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });

const isTodayEvent = (event: Event): boolean => {
  const today = new Date();
  const start = new Date(event.startDate);
  return (
    start.getDate() === today.getDate()
    && start.getMonth() === today.getMonth()
    && start.getFullYear() === today.getFullYear()
  );
};

interface TodayEventProps {
  event: Event;
  courseName?: string;
}

const TodayEvent = ({ event, courseName }: TodayEventProps) => {
  const isExam = event.type === 'EXAM' || event.type === 'EXAMEN';

  return (
    <div className="relative pl-6">
      <div className={`absolute w-2 h-2 rounded-full left-[-4.5px] top-1.5 border-2 border-white ${isExam ? 'bg-error' : 'bg-outline'}`} />
      <div className="text-label-sm font-label-sm text-on-surface-variant mb-1">
        {formatTime(event.startDate)} - {formatTime(event.endDate)}
      </div>
      <div className="text-body-md font-body-md text-on-surface font-medium">
        {courseName ? `${courseName} ` : ''}{event.title}
      </div>
      <div className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-1 mt-1">
        <MapPin />
        {event.location ?? 'Salle non définie'}
      </div>
    </div>
  );
};

interface TaskItemProps {
  task: Task;
  courseName?: string;
  onToggle: (task: Task) => void;
}

const TaskItem = ({ task, courseName, onToggle }: TaskItemProps) => {
  const isCompleted = task.status === 'COMPLETED';
  const isUrgent = task.priority === 'HIGH' || task.priority === 'CRITICAL';
  const isLate = task.dueDate && new Date(task.dueDate) < new Date() && !isCompleted;

  const priorityColors = {
    HIGH: { bg: 'bg-error-container', text: 'text-on-error-container' },
    CRITICAL: { bg: 'bg-error-container', text: 'text-on-error-container' },
    MEDIUM: { bg: 'bg-tertiary-container/20', text: 'text-tertiary' },
    LOW: { bg: 'bg-surface-container-highest', text: 'text-on-surface-variant' },
  };

  const colors = priorityColors[task.priority];

  return (
    <div className={`p-card-padding hover:bg-surface-container-low transition-colors flex items-center justify-between ${isCompleted ? 'opacity-80' : ''}`}>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onToggle(task)}
          className={`w-4 h-4 rounded-sm border flex-shrink-0 cursor-pointer ${isCompleted ? 'bg-primary border-primary' : 'border-outline hover:border-primary'}`}
          aria-label={isCompleted ? 'Marquer comme à faire' : 'Marquer comme terminé'}
        >
          {isCompleted && (
            <Check className="text-on-primary text-[16px]" />
          )}
        </button>
        <div>
          <h3 className={`text-body-md font-body-md text-on-surface font-medium ${isCompleted ? 'line-through' : ''}`}>
            {task.title}
          </h3>
          <div className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-2 mt-1">
            <span>{courseName || 'Général'}</span>
            <span className="w-1 h-1 bg-outline-variant rounded-full" />
            <span className={isLate ? 'text-error' : isUrgent ? 'text-error' : ''}>
              {task.dueDate
                ? format(new Date(task.dueDate), isLate ? "'En retard' - dd MMM" : "dd MMM", { locale: fr })
                : 'Sans date'}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-[10px] font-label-caps px-2 py-1 rounded ${colors.bg} ${colors.text}`}>
          {task.priority === 'HIGH' || task.priority === 'CRITICAL' ? 'Urgent' : task.priority === 'MEDIUM' ? 'Moyen' : 'Faible'}
        </span>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { data: tasks = [], isLoading: tasksLoading } = useTasks();
  const { data: events = [], isLoading: eventsLoading } = useEvents();
  const { data: courses = [] } = useCourses();
  const { data: grades = [] } = useGrades();
  const { overallAverage, riskCoursesCount } = useDashboardStats(grades, courses);
  const updateTask = useUpdateTask();

  const handleToggleTask = (task: Task) => {
    if (updateTask.isPending) return;
    updateTask.mutate({
      id: task.id,
      payload: { status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' },
    });
  };

  const courseDict = useMemo(
    () =>
      courses.reduce((acc, c) => {
        acc[c.id] = c.name;
        return acc;
      }, {} as Record<string, string>),
    [courses],
  );

  const todayEvents = useMemo(
    () =>
      events
        .filter(isTodayEvent)
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()),
    [events],
  );

  const activeTasks = useMemo(
    () =>
      tasks
        .filter((t) => !t.isDeleted && t.status !== 'COMPLETED' && t.status !== 'CANCELED')
        .sort((a, b) => {
          const aUrgent = a.priority === 'HIGH' || a.priority === 'CRITICAL' ? 0 : 1;
          const bUrgent = b.priority === 'HIGH' || b.priority === 'CRITICAL' ? 0 : 1;
          if (aUrgent !== bUrgent) return aUrgent - bUrgent;
          if (a.dueDate && b.dueDate) return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          return 0;
        }),
    [tasks],
  );

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <header className="mb-2">
        <h1 className="text-display-lg font-display-lg text-on-surface">Bonjour {user?.name?.split(' ')[0] ?? 'Lucas'}</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant mt-2">Voici ce qui mérite ton attention aujourd'hui.</p>
      </header>

      {/* Overview Indicators */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-8" aria-label="Indicateurs de vue d'ensemble">
        <div className="card card-padded flex flex-col justify-between">
          <span className="text-label-caps font-label-caps text-on-surface-variant mb-4">Moyenne Générale</span>
          <div className="flex items-end gap-2">
            <span className="text-display-lg font-display-lg text-primary">
              {overallAverage !== null ? overallAverage.toFixed(1) : '-'}
            </span>
            <span className="text-body-md font-body-md text-on-surface-variant pb-1">/ 20</span>
          </div>
        </div>
        <div className="card card-padded flex flex-col justify-between">
          <span className="text-label-caps font-label-caps text-on-surface-variant mb-4">Risque Académique</span>
          <div className="flex items-end justify-between w-full">
            <div className="flex items-end gap-2">
              <span className="text-display-lg font-display-lg text-on-surface">
                {riskCoursesCount}
              </span>
              <span className="text-body-md font-body-md text-on-surface-variant pb-1">/ 100</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-surface-container text-on-surface px-2 py-1 rounded-sm mb-1">
              {riskCoursesCount < 30 ? 'Faible' : riskCoursesCount < 60 ? 'Moyen' : 'Élevé'}
            </span>
          </div>
        </div>
        <div className="card card-padded flex flex-col justify-between">
          <span className="text-label-caps font-label-caps text-on-surface-variant mb-4">Tâches À Faire</span>
          <div className="flex items-end gap-2">
            <span className="text-display-lg font-display-lg text-on-surface">
              {activeTasks.length}
            </span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-gutter">
        {/* Main Content: Tasks */}
        <div className="space-y-8">
          {/* À Faire */}
          <section className="card overflow-hidden" aria-label="Tâches à faire">
            <div className="p-card-padding border-b border-outline-variant bg-surface-bright">
              <h2 className="text-label-caps font-label-caps text-on-surface-variant">À Faire</h2>
            </div>
            <div className="divide-y divide-outline-variant">
              {tasksLoading ? (
                [1, 2, 3].map((i) => (
                  <div key={i} className="p-card-padding animate-pulse">
                    <div className="h-4 bg-surface-container-highest rounded w-3/4 mb-2" />
                    <div className="h-3 bg-surface-container-highest rounded w-1/2" />
                  </div>
                ))
              ) : activeTasks.length === 0 ? (
                <div className="p-card-padding text-center text-on-surface-variant">
                  Aucune tâche en cours. Profites-en pour avancer !
                </div>
              ) : (
                activeTasks.slice(0, 5).map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    courseName={task.courseId ? courseDict[task.courseId] : undefined}
                    onToggle={handleToggleTask}
                  />
                ))
              )}
            </div>
          </section>

          {/* Progression Académique */}
          <section className="card card-padded">
            <h2 className="text-label-caps font-label-caps text-on-surface-variant mb-6 border-b border-outline-variant pb-2">Progression Académique</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.slice(0, 4).map((course) => {
                const courseGrades = grades.filter(g => g.courseId === course.id);
                const avg = courseGrades.length > 0
                  ? courseGrades.reduce((sum, g) => sum + (g.percentage ?? (g.score / g.maxScore) * 100), 0) / courseGrades.length
                  : 0;
                const isRisk = avg < 50;

                return (
                  <div key={course.id}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-label-sm font-label-sm font-medium text-on-surface">{course.name}</span>
                      <span className="text-label-sm font-label-sm text-on-surface-variant">{Math.round(avg)}%</span>
                    </div>
                    <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${isRisk ? 'bg-error' : 'bg-primary'}`} style={{ width: `${Math.min(avg, 100)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Sidebar: Aujourd'hui Timeline */}
        <aside className="lg:sticky lg:top-24">
          <div className="card card-padded h-full">
            <h2 className="text-label-caps font-label-caps text-on-surface-variant mb-6 border-b border-outline-variant pb-2">Aujourd'hui</h2>
            <div className="relative border-l border-outline-variant ml-3 space-y-6">
              {eventsLoading ? (
                [1, 2].map((i) => (
                  <div key={i} className="relative pl-6 h-20">
                    <div className="absolute w-2 h-2 bg-outline rounded-full left-[-4.5px] top-1.5 border-2 border-white" />
                    <div className="h-4 bg-surface-container-highest rounded w-1/2 mb-1" />
                    <div className="h-3 bg-surface-container-highest rounded w-1/3" />
                  </div>
                ))
              ) : todayEvents.length === 0 ? (
                <div className="text-center py-8 text-on-surface-variant">
                  <CalendarX className="text-4xl mb-2 block" />
                  <p className="text-body-md font-body-md">Aucun événement aujourd'hui</p>
                  <p className="text-label-sm font-label-sm mt-1">Profites-en pour avancer sur tes tâches.</p>
                </div>
              ) : (
                todayEvents.map((event) => (
                  <TodayEvent
                    key={event.id}
                    event={event}
                    courseName={event.courseId ? courseDict[event.courseId] : undefined}
                  />
                ))
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}