import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useTasks, useUpdateTask, useCreateTask } from '../../hooks/useTasks';
import { useEvents } from '../../hooks/useEvents';
import type { Task, Event } from '../../types';

// ─── Helpers ──────────────────────────────────────────────

const priorityColor: Record<string, string> = {
    CRITICAL: 'bg-purple-500',
    HIGH: 'bg-error',
    MEDIUM: 'bg-warning',
    LOW: 'bg-success',
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
    CLASS: 'badge-info',
    EXAM: 'badge-error',
    EXAMEN: 'badge-error',
    INTERRO: 'badge-warning',
    TP: 'badge-success',
    STUDY: 'badge-success',
    QUIZ: 'badge-warning',
    ASSIGNMENT: 'badge-info',
    MEETING: 'badge-ghost',
    PERSONAL: 'badge-ghost',
    AUTRE: 'badge-ghost',
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
    onComplete: (id: string) => void;
}

const TaskRow = ({ task, onComplete }: TaskRowProps) => {
    const due = formatDueDate(task.dueDate);
    const urgent = isUrgent(task.dueDate);

    return (
        <div className="flex items-center gap-3 py-2.5 border-b border-base-200 last:border-none">
            <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={task.status === 'COMPLETED'}
                onChange={() => onComplete(task.id)}
            />
            <div
                className={`w-2 h-2 rounded-full shrink-0 ${priorityColor[task.priority]}`}
            />
            <div className="flex-1 min-w-0">
                <div className={`text-sm ${task.status === 'COMPLETED' ? 'line-through text-base-content/30' : 'text-base-content'}`}>
                    {task.title}
                </div>
                {due && (
                    <div className={`text-xs mt-0.5 ${urgent ? 'text-error' : 'text-base-content/40'}`}>
                        {due}
                    </div>
                )}
            </div>
            {urgent && task.status !== 'COMPLETED' && (
                <span className="badge badge-error badge-xs">Urgent</span>
            )}
        </div>
    );
};

interface EventCardProps {
    event: Event;
}

const EventCard = ({ event }: EventCardProps) => (
    <div className={`
    min-w-48 shrink-0 bg-base-100 rounded-xl p-4
    border border-base-200
    ${event.type === 'EXAM' || event.type === 'EXAMEN' ? 'border-error/30' : ''}
  `}>
        <div className="flex justify-between items-center mb-2">
            <span className={`badge badge-xs ${eventTypeBadge[event.type] ?? 'badge-ghost'}`}>
                {eventTypeLabel[event.type] ?? event.type}
            </span>
            <span className="text-xs text-base-content/40">
                {formatTime(event.startDate)} – {formatTime(event.endDate)}
            </span>
        </div>
        <div className="text-sm font-medium text-base-content">{event.title}</div>
        {event.location && (
            <div className="text-xs text-base-content/40 mt-1">{event.location}</div>
        )}
    </div>
);

// ─── Page principale ───────────────────────────────────────

export default function DashboardPage() {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const { data: tasks = [], isLoading: tasksLoading } = useTasks();
    const { data: events = [], isLoading: eventsLoading } = useEvents();
    const { mutate: updateTask } = useUpdateTask();
    const { mutate: createTask, isPending: isCreating } = useCreateTask();

    const [quickInput, setQuickInput] = useState('');

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

    const completedToday = tasks.filter(
        (t) => t.completedAt && isTodayEvent({ ...t, startDate: t.completedAt } as unknown as Event)
    ).length;

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

    // Input universel — parser simple
    const handleQuickCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!quickInput.trim()) return;

        const text = quickInput.trim();

        // Détection date
        let dueDate: string | undefined;
        const todayMatch = /aujourd'?hui/i.test(text);
        const tomorrowMatch = /demain/i.test(text);
        const inDaysMatch = text.match(/dans (\d+) ?j/i);
        const timeMatch = text.match(/à (\d{1,2})h(\d{2})?/i);

        const base = new Date();
        if (todayMatch) {
            // reste aujourd'hui
        } else if (tomorrowMatch) {
            base.setDate(base.getDate() + 1);
        } else if (inDaysMatch) {
            base.setDate(base.getDate() + parseInt(inDaysMatch[1]));
        }

        if (timeMatch) {
            base.setHours(parseInt(timeMatch[1]), parseInt(timeMatch[2] ?? '0'), 0, 0);
            dueDate = base.toISOString();
        } else if (todayMatch || tomorrowMatch || inDaysMatch) {
            dueDate = base.toISOString();
        }

        // Détection priorité
        let priority: Task['priority'] = 'MEDIUM';
        if (/urgent|critique|critique/i.test(text)) priority = 'CRITICAL';
        else if (/important/i.test(text)) priority = 'HIGH';

        // Titre — on enlève les mots-clés détectés
        const title = text
            .replace(/aujourd'?hui|demain|dans \d+ ?j|à \d{1,2}h\d{0,2}|urgent|important|critique/gi, '')
            .replace(/\s+/g, ' ')
            .trim();

        createTask({
            title: title || text,
            priority,
            status: 'PENDING',
            ...(dueDate ? { dueDate } : {}),
        });

        setQuickInput('');
    };

    return (
        <div className="max-w-2xl mx-auto flex flex-col gap-5">

            {/* ── HERO ── */}
            <div className="bg-base-100 rounded-2xl p-6 flex justify-between items-center border border-base-200">
                <div>
                    <div className="text-xs text-base-content/40 mb-1">
                        {new Date().toLocaleDateString('fr-FR', {
                            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                        })}
                    </div>
                    <div className="text-xl font-medium text-base-content mb-1">
                        Bonjour, {user?.name?.split(' ')[0]} 👋
                    </div>
                    <div className="text-sm text-base-content/50">
                        {todayEvents.length > 0
                            ? `${todayEvents.length} événement${todayEvents.length > 1 ? 's' : ''} aujourd'hui`
                            : "Aucun événement aujourd'hui"
                        }
                        {activeTasks.length > 0 && ` · ${activeTasks.length} tâche${activeTasks.length > 1 ? 's' : ''} en cours`}
                    </div>
                </div>
                <div className="flex gap-4 text-center">
                    <div>
                        <div className="text-2xl font-medium text-base-content">
                            {completedToday}
                        </div>
                        <div className="text-xs text-base-content/40">Faites aujourd'hui</div>
                    </div>
                    <div className="w-px bg-base-200" />
                    <div>
                        <div className="text-2xl font-medium text-error">
                            {activeTasks.filter((t) => isUrgent(t.dueDate)).length}
                        </div>
                        <div className="text-xs text-base-content/40">Urgentes</div>
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
            <div className="bg-base-100 rounded-2xl border border-base-200">

                {/* Header tâches */}
                <div className="flex justify-between items-center px-5 pt-5 pb-3">
                    <div className="text-xs font-medium text-base-content/40 uppercase tracking-widest">
                        Tâches en cours
                    </div>
                    <button
                        onClick={() => navigate('/tasks')}
                        className="text-xs text-base-content/40 hover:text-base-content"
                    >
                        Voir tout →
                    </button>
                </div>

                {/* Input universel */}
                <form onSubmit={handleQuickCreate} className="px-5 pb-3">
                    <input
                        value={quickInput}
                        onChange={(e) => setQuickInput(e.target.value)}
                        placeholder="✦  Décris ta tâche... ex: demain à 14h rendre le TP"
                        className="input input-bordered input-sm w-full text-sm"
                        disabled={isCreating}
                    />
                    <div className="text-xs text-base-content/30 mt-1">
                        Date, heure et priorité détectées automatiquement
                    </div>
                </form>

                {/* Liste des tâches */}
                <div className="px-5 pb-4">
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
                        activeTasks.slice(0, 6).map((task) => (
                            <TaskRow key={task.id} task={task} onComplete={handleComplete} />
                        ))
                    )}
                </div>

            </div>

        </div>
    );
}