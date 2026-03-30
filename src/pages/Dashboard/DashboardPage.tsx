import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useTasks, useUpdateTask } from '../../hooks/useTasks';
import { useEvents } from '../../hooks/useEvents';
import type { Task, Event } from '../../types';
import { useCourses } from '../../hooks/useCourses';
import { useGrades } from '../../hooks/useGrades';

// ─── Helpers ──────────────────────────────────────────────

const priorityColor: Record<string, string> = {
    CRITICAL: 'bg-red-500',
    HIGH: 'bg-orange-500',
    MEDIUM: 'bg-green-500',
    LOW: 'bg-blue-500',
};

const eventTypeLabel: Record<string, string> = {
    CLASS: 'Cours',
    EXAM: 'Examen',
    EXAMEN: 'Examen',
    INTERRO: 'Interro',
    TP: 'TP',
    STUDY: 'Révision',
    QUIZ: 'Quiz',
    ASSIGNMENT: 'Devoir',
    MEETING: 'Réunion',
    PERSONAL: 'Personnel',
    AUTRE: 'Autre',
};

const eventTypeBadge: Record<string, string> = {
    CLASS: 'bg-blue-100 text-blue-600',
    EXAM: 'bg-red-100 text-red-600',
    EXAMEN: 'bg-red-100 text-red-600',
    INTERRO: 'bg-orange-100 text-orange-600',
    TP: 'bg-green-100 text-green-600',
    STUDY: 'bg-green-100 text-green-600',
    QUIZ: 'bg-orange-100 text-orange-600',
    ASSIGNMENT: 'bg-blue-100 text-blue-600',
    MEETING: 'bg-gray-100 text-gray-600',
    PERSONAL: 'bg-gray-100 text-gray-600',
    AUTRE: 'bg-gray-100 text-gray-600',
};

const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    });

const formatDueDate = (dateStr: string | null | undefined): string => {
    if (!dateStr) return '';
    const due = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.ceil(
        (due.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24)
    );
    if (diffDays < 0) return 'En retard';
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return 'Demain';
    return `Dans ${diffDays}j`;
};

const isUrgent = (dateStr: string | null | undefined): boolean => {
    if (!dateStr) return false;
    const due = new Date(dateStr);
    const now = new Date();
    return (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) <= 2;
};

const isTodayEvent = (event: Event): boolean => {
    const today = new Date();
    const start = new Date(event.startDate);
    return (
        start.getDate() === today.getDate() &&
        start.getMonth() === today.getMonth() &&
        start.getFullYear() === today.getFullYear()
    );
};

// ─── Composants ───────────────────────────────────────────

interface TaskRowProps {
    task: Task;
    courseName?: string;
    onComplete: (id: string) => void;
}

const TaskRow = ({ task, courseName, onComplete }: TaskRowProps) => {
    const due = formatDueDate(task.dueDate);
    const urgent = isUrgent(task.dueDate);

    return (
        <div className="flex items-center gap-4 py-3 border-b border-base-200 last:border-none hover:bg-base-50 transition-colors px-2 -mx-2 rounded-lg">
            <input
                type="checkbox"
                className="checkbox checkbox-sm rounded-md border-base-300"
                checked={task.status === 'COMPLETED'}
                onChange={() => onComplete(task.id)}
            />
            <div
                className={`w-2.5 h-2.5 rounded-full shrink-0 ${priorityColor[task.priority]}`}
            />
            <div className="flex-1 min-w-0 flex items-center justify-between">
                <div>
                    <div className={`text-sm font-semibold ${task.status === 'COMPLETED' ? 'line-through text-base-content/30' : 'text-base-content'}`}>
                        {task.title}
                    </div>
                    {due && (
                        <div className={`text-xs mt-0.5 ${task.status === 'COMPLETED' ? 'text-base-content/30' : 'text-base-content/50'}`}>
                            {courseName ? `${courseName} · ` : ''}{due.toLowerCase()}
                        </div>
                    )}
                </div>
                {urgent && task.status !== 'COMPLETED' && (
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-red-50 text-red-600 shrink-0 uppercase tracking-wide">Urgent</span>
                )}
            </div>
        </div>
    );
};

interface EventCardProps {
    event: Event;
}

const EventCard = ({ event }: EventCardProps) => (
    <div className={`
    min-w-64 w-64 shrink-0 bg-base-100 rounded-xl p-4
    border
    ${event.type === 'EXAM' || event.type === 'EXAMEN' ? 'border-red-400' : 'border-base-200'}
  `}>
        <div className="flex justify-between items-center mb-3">
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${eventTypeBadge[event.type] ?? 'bg-gray-100 text-gray-600'}`}>
                {eventTypeLabel[event.type] ?? event.type}
            </span>
            <span className="text-xs text-base-content/50 font-medium">
                {formatTime(event.startDate)} – {formatTime(event.endDate)}
            </span>
        </div>
        <div className="text-base font-semibold text-base-content mb-1">{event.title}</div>
        <div className="text-xs text-base-content/50">
            {event.location ? `${event.location} · ` : ''}
            {Math.round((new Date(event.endDate).getTime() - new Date(event.startDate).getTime()) / (1000 * 60 * 60))}h
        </div>
    </div>
);

// ─── Page principale ───────────────────────────────────────

export default function DashboardPage() {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const { data: tasks = [], isLoading: tasksLoading } = useTasks();
    const { data: events = [], isLoading: eventsLoading } = useEvents();
    const { data: courses = [] } = useCourses();
    const { data: grades = [] } = useGrades();
    const { mutate: updateTask } = useUpdateTask();

    // Filtres
    const todayEvents = events
        .filter(isTodayEvent)
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    const activeTasks = tasks
        .filter((t) => !t.isDeleted && t.status !== 'COMPLETED' && t.status !== 'CANCELED')
        .sort((a, b) => {
            // Trier par urgence d'abord, puis par priorité
            const priorityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
            return (priorityOrder[a.priority] ?? 3) - (priorityOrder[b.priority] ?? 3);
        });

    // Calculs de moyennes et de risques
    const validGrades = grades.filter((g) => g.score !== undefined && g.maxScore !== undefined);
    const overallAverage = validGrades.length > 0
        ? validGrades.reduce((acc, curr) => acc + (curr.score / curr.maxScore) * 20, 0) / validGrades.length
        : null;
    
    // Fake risks for the presentation
    const riskCoursesCount = 2;

    // Cocher / décocher une tâche
    const handleComplete = (id: string) => {
        const task = tasks.find((t) => t.id === id);
        if (!task) return;
        updateTask({
            id,
            payload: {
                status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED',
            },
        });
    };

    return (
        <div className="max-w-2xl mx-auto flex flex-col gap-5">

            {/* ── HERO ── */}
            <div className="bg-base-100 rounded-2xl p-6 flex justify-between items-center border border-base-200">
                <div>
                    <div className="text-xs text-base-content/50 font-medium mb-1">
                        {new Date().toLocaleDateString('fr-FR', {
                            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                        })}
                    </div>
                    <div className="text-2xl font-semibold text-base-content mb-1">
                        Bonjour, {user?.name?.split(' ')[0] ?? 'Lucas'} 👋
                    </div>
                    <div className="text-sm text-base-content/50">
                        {todayEvents.length > 0
                            ? `${todayEvents.length} événement${todayEvents.length > 1 ? 's' : ''} aujourd'hui`
                            : "Aucun événement aujourd'hui"
                        }
                        {activeTasks.length > 0 && ` · ${activeTasks.length} tâche${activeTasks.length > 1 ? 's' : ''} en cours`}
                    </div>
                </div>
                <div className="flex gap-6 text-center items-center">
                    <div className="text-right">
                        <div className="text-3xl font-medium text-base-content">
                            {overallAverage ? overallAverage.toFixed(1) : '12.4'}
                        </div>
                        <div className="text-sm text-base-content/50">Moy. générale</div>
                    </div>
                    <div className="w-px h-12 bg-base-200" />
                    <div className="text-left">
                        <div className="text-3xl font-medium text-error">
                            {riskCoursesCount}
                        </div>
                        <div className="text-sm text-base-content/50">Cours à risque</div>
                    </div>
                </div>
            </div>

            {/* ── EVENTS DU JOUR ── */}
            <div>
                <div className="text-xs font-medium text-base-content/40 uppercase tracking-widest mb-3">
                    Aujourd'hui
                </div>
                {eventsLoading ? (
                    <div className="flex gap-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="min-w-48 h-24 bg-base-100 rounded-xl skeleton" />
                        ))}
                    </div>
                ) : todayEvents.length === 0 ? (
                    <div className="bg-base-100 rounded-xl p-4 border border-base-200 text-sm text-base-content/40 text-center">
                        Aucun événement aujourd'hui
                    </div>
                ) : (
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                        {todayEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                )}
            </div>

            {/* ── TACHES ── */}
            <div className="bg-[#FAF9F6] rounded-2xl border border-base-200 p-6 shadow-sm">

                {/* Header tâches */}
                <div className="flex justify-between items-center mb-4">
                    <div className="text-xs font-bold text-base-content/40 uppercase tracking-widest">
                        Tâches en cours
                    </div>
                    <button
                        onClick={() => navigate('/tasks')}
                        className="text-sm font-medium text-base-content/50 hover:text-base-content"
                    >
                        Voir tout →
                    </button>
                </div>

                {/* Liste des tâches */}
                <div className="flex flex-col">
                    {tasksLoading ? (
                        <div className="flex flex-col gap-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-10 skeleton rounded-lg" />
                            ))}
                        </div>
                    ) : activeTasks.length === 0 ? (
                        <div className="text-sm text-base-content/40 text-center py-4">
                            Aucune tâche en cours 🎉
                        </div>
                    ) : (
                        activeTasks.slice(0, 5).map((task) => (
                            <TaskRow 
                                key={task.id} 
                                task={task} 
                                courseName={courses.find(c => c.id === task.courseId)?.name}
                                onComplete={handleComplete} 
                            />
                        ))
                    )}
                </div>

            </div>

        </div>
    );
}