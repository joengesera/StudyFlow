import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useTasks, useUpdateTask } from '../../hooks/useTasks';
import { useEvents } from '../../hooks/useEvents';
import { useCourses } from '../../hooks/useCourses';
import { useGrades } from '../../hooks/useGrades';
import { useDashboardStats } from '../../hooks/useRisks';
import { ArrowRight, Check } from 'lucide-react';
import type { Task, Event } from '../../types';

// ─── Helpers ──────────────────────────────────────────────

const priorityColor: Record<string, string> = {
    CRITICAL: '#8B5CF6',
    HIGH: '#EF4444',
    MEDIUM: '#F59E0B',
    LOW: '#10B981',
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
    CLASS: 'bg-[#EFF6FF] text-[#3B82F6]',
    EXAM: 'bg-[#FEF2F2] text-[#EF4444]',
    EXAMEN: 'bg-[#FEF2F2] text-[#EF4444]',
    INTERRO: 'bg-[#FFF7ED] text-[#F59E0B]',
    TP: 'bg-[#F0FDF4] text-[#10B981]',
    STUDY: 'bg-[#F0FDF4] text-[#10B981]',
    QUIZ: 'bg-[#FFF7ED] text-[#F59E0B]',
    ASSIGNMENT: 'bg-[#EFF6FF] text-[#3B82F6]',
    MEETING: 'bg-[#F3F4F6] text-[#1A1A1A]',
    PERSONAL: 'bg-[#F3F4F6] text-[#1A1A1A]',
    AUTRE: 'bg-[#F3F4F6] text-[#1A1A1A]',
};

const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    }).replace(':', 'h');

const formatDueDate = (dateStr: string | null | undefined): string => {
    if (!dateStr) return '';
    const due = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.ceil(
        (due.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24)
    );
    if (diffDays < 0) return 'en retard';
    if (diffDays === 0) return "aujourd'hui";
    if (diffDays === 1) return 'demain';
    return `dans ${diffDays} jours`;
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
    isLast: boolean;
}

const TaskRow = ({ task, courseName, onComplete, isLast }: TaskRowProps) => {
    const due = formatDueDate(task.dueDate);
    const urgent = isUrgent(task.dueDate);
    const isCompleted = task.status === 'COMPLETED';

    return (
        <div className={`flex items-center gap-4 py-4 ${!isLast ? 'border-b border-[#E5E5E5]' : ''}`}>
            {/* Checkbox */}
            <div
                onClick={() => onComplete(task.id)}
                className={`w-[20px] h-[20px] rounded-[6px] border cursor-pointer flex justify-center items-center transition-colors shrink-0 shadow-sm ${isCompleted ? 'bg-[#10B981] border-[#10B981]' : 'bg-white border-[#A3A3A3] hover:border-[#1A1A1A]'}`}
            >
                {isCompleted && (
                    <Check size={12} strokeWidth={3} className="text-white" />
                )}
            </div>

            {/* Point de priorité */}
            <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: isCompleted ? '#E5E5E5' : (priorityColor[task.priority] || '#A3A3A3') }}
            />

            {/* Infos de la tâche */}
            <div className="flex-1 flex justify-between items-center min-w-0">
                <div className="truncate pr-4">
                    <div className={`text-[14px] font-bold truncate ${isCompleted ? 'text-[#A3A3A3] line-through' : 'text-[#1A1A1A]'}`}>
                        {task.title}
                    </div>
                    {due && (
                        <div className={`text-[12px] font-medium mt-[2px] truncate ${isCompleted ? 'text-[#A3A3A3] line-through' : 'text-[#737373]'}`}>
                            {courseName ? `${courseName} - ` : ''}{due}
                        </div>
                    )}
                </div>
                {urgent && !isCompleted && (
                    <span className="bg-[#FEF2F2] text-[#EF4444] px-2 py-[2px] rounded-[6px] text-[10px] font-bold shrink-0">
                        Urgent
                    </span>
                )}
            </div>
        </div>
    );
};

interface EventCardProps {
    event: Event;
    courseName?: string;
}

const EventCard = ({ event, courseName }: EventCardProps) => {
    const isExam = event.type === 'EXAM' || event.type === 'EXAMEN';
    
    return (
        <div className={`
            shrink-0 min-w-[240px] max-w-[280px] bg-[#FAF9F6] border rounded-[16px] p-4 
            cursor-pointer hover:bg-white transition-colors shadow-sm
            ${isExam ? 'border-[#991B1B]' : 'border-[#E5E5E5]'}
        `}>
            <div className="flex justify-between items-center mb-4">
                <span className={`px-2 py-[2px] rounded-[6px] text-[10px] font-bold tracking-wider ${eventTypeBadge[event.type] ?? 'bg-[#F3F4F6] text-[#1A1A1A]'}`}>
                    {eventTypeLabel[event.type] ?? event.type}
                </span>
                <span className="text-[12px] font-medium text-[#737373]">
                    {formatTime(event.startDate)} - {formatTime(event.endDate)}
                </span>
            </div>
            <div className="text-[15px] font-bold text-[#1A1A1A] mb-1 truncate">
                {courseName ? `${courseName} ` : ''}{event.title && courseName ? `— ${event.title}` : event.title}
            </div>
            <div className="text-[12px] font-medium text-[#737373] truncate">
                {event.location ? `${event.location} - ` : ''}
                {Math.max(1, Math.round((new Date(event.endDate).getTime() - new Date(event.startDate).getTime()) / (1000 * 60 * 60)))}h
            </div>
        </div>
    );
};

// ─── Page principale ───────────────────────────────────────

export default function DashboardPage() {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const { data: tasks = [], isLoading: tasksLoading } = useTasks();
    const { data: events = [], isLoading: eventsLoading } = useEvents();
    const { data: courses = [] } = useCourses();
    const { data: grades = [] } = useGrades();
    const { mutate: updateTask } = useUpdateTask();

    // Mapping courses
    const courseDict = courses.reduce((acc, c) => {
        acc[c.id] = c.name;
        return acc;
    }, {} as Record<string, string>);

    // Filtres
    const todayEvents = events
        .filter(isTodayEvent)
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    const activeTasks = tasks
        .filter((t) => !t.isDeleted && t.status !== 'COMPLETED' && t.status !== 'CANCELED')
        .sort((a, b) => {
            const priorityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
            return (priorityOrder[a.priority] ?? 3) - (priorityOrder[b.priority] ?? 3);
        });

    // Calculs de moyennes et de risques — entièrement dynamiques
    const { overallAverage, riskCoursesCount } = useDashboardStats(grades, courses);

    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const dateFormatted = new Date().toLocaleDateString('fr-FR', dateOptions);

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
        <div className="max-w-[800px] mx-auto flex flex-col px-4 md:px-0 pb-20 pt-2 md:pt-6">

            {/* ── HERO ── */}
            <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-6 md:p-8 mb-8 mt-2 md:mt-5 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="text-[11px] font-bold text-[#737373] mb-2 capitalize">
                            {dateFormatted}
                        </div>
                        <div className="text-[26px] font-bold text-[#1A1A1A] tracking-tight mb-2">
                            Bonjour, {user?.name?.split(' ')[0] ?? 'Lucas'} !
                        </div>
                        <div className="text-[14px] font-medium text-[#1A1A1A]">
                            Tu as <span className="font-bold">{todayEvents.length} events</span> aujourd'hui et <span className="font-bold">{activeTasks.length} tâches</span> en cours.
                        </div>
                    </div>
                    
                    <div className="flex gap-6 items-center w-full md:w-auto md:pt-4">
                        <div className="text-center flex-1 md:flex-none">
                            <div className="text-[24px] font-bold text-[#1A1A1A] leading-none mb-[2px]">
                                {overallAverage !== null ? overallAverage.toFixed(1) : '—'}
                            </div>
                            <div className="text-[11px] font-bold text-[#737373] uppercase tracking-wide">
                                Moy. générale
                            </div>
                        </div>
                        <div className="w-[1px] h-10 bg-[#E5E5E5]" />
                        <div className="text-center flex-1 md:flex-none">
                            <div className="text-[24px] font-bold text-[#EF4444] leading-none mb-[2px]">
                                {riskCoursesCount}
                            </div>
                            <div className="text-[11px] font-bold text-[#737373] uppercase tracking-wide">
                                Cours à risque
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── EVENTS DU JOUR ── */}
            <div className="mb-6">
                <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-4 ml-1">
                    Aujourd'hui
                </div>
                
                {eventsLoading ? (
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="min-w-[240px] h-[120px] bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] animate-pulse shrink-0" />
                        ))}
                    </div>
                ) : todayEvents.length === 0 ? (
                    <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-6 text-center shadow-sm">
                        <div className="flex justify-center mb-2 opacity-30">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 14h.01"/><path d="M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
                        </div>
                        <div className="text-[14px] font-bold text-[#1A1A1A]">Aucun événement aujourd'hui</div>
                        <div className="text-[12px] font-medium text-[#737373]">Profites-en pour avancer sur tes tâches.</div>
                    </div>
                ) : (
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                        {todayEvents.map((event) => (
                            <EventCard 
                                key={event.id} 
                                event={event} 
                                courseName={event.courseId ? courseDict[event.courseId] : undefined}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* ── TACHES ── */}
            <div className="bg-[#FAF9F6] rounded-[16px] border border-[#E5E5E5] p-6 shadow-sm">
                
                <div className="flex justify-between items-center mb-2">
                    <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest">
                        Tâches en cours
                    </div>
                    <button
                        onClick={() => navigate('/tasks')}
                        className="text-[12px] font-bold text-[#737373] hover:text-[#1A1A1A] transition-colors flex items-center gap-1"
                    >
                        Voir tout <ArrowRight size={14} />
                    </button>
                </div>

                <div className="flex flex-col">
                    {tasksLoading ? (
                        <div className="flex flex-col gap-4 py-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-4 w-full bg-[#E5E5E5] rounded animate-pulse" />
                            ))}
                        </div>
                    ) : activeTasks.length === 0 ? (
                        <div className="text-center py-6">
                            <div className="text-[13px] font-bold text-[#1A1A1A] mb-1">Tout est à jour !</div>
                            <div className="text-[12px] font-medium text-[#737373]">Tu n'as aucune tâche en attente.</div>
                        </div>
                    ) : (
                        activeTasks.slice(0, 5).map((task, idx) => {
                            const isLast = idx === Math.min(activeTasks.length, 5) - 1;
                            return (
                                <TaskRow 
                                    key={task.id} 
                                    task={task} 
                                    courseName={task.courseId ? courseDict[task.courseId] : undefined}
                                    onComplete={(id) => {
                                        // Update local state optimistic if we want but api handles it
                                        handleComplete(id);
                                    }} 
                                    isLast={isLast}
                                />
                            );
                        })
                    )}
                </div>

            </div>

        </div>
    );
}