import { useCallback, useMemo, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDays, format, startOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useTasks, useUpdateTask, useCreateTask } from '../../hooks/useTasks';
import { useCreateEvent, useEvents } from '../../hooks/useEvents';
import { useCourses } from '../../hooks/useCourses';
import { useGrades } from '../../hooks/useGrades';
import { useDashboardStats } from '../../hooks/useRisks';
import type { Task, Event } from '../../types';
import { formatDueDate, getDueDateColor, parseSmartInput } from '../Tasks/taskShared';

const eventTypeLabel: Record<string, string> = {
    CLASS: 'Cours',
    EXAM: 'Examen',
    EXAMEN: 'Examen',
    INTERRO: 'Interro',
    TP: 'TP',
    STUDY: 'Revision',
    QUIZ: 'Quiz',
    ASSIGNMENT: 'Devoir',
    MEETING: 'Reunion',
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

const priorityOrder: Record<string, number> = {
    CRITICAL: 0,
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3,
};

const priorityBadgeMap: Record<Task['priority'], { label: string; bg: string; text: string }> = {
    LOW: { label: 'Faible', bg: '#ECFDF5', text: '#10B981' },
    MEDIUM: { label: 'Moyenne', bg: '#FEF9C3', text: '#CA8A04' },
    HIGH: { label: 'Haute', bg: '#FFF3E0', text: '#F97316' },
    CRITICAL: { label: 'Critique', bg: '#FDF2F2', text: '#E74C3C' },
};

const statusDotColor: Record<Task['status'], string> = {
    PENDING: '#737373',
    IN_PROGRESS: '#F59E0B',
    COMPLETED: '#10B981',
    CANCELED: '#A3A3A3',
};

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
});

const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    }).replace(':', 'h');

const isTodayEvent = (event: Event): boolean => {
    const today = new Date();
    const start = new Date(event.startDate);
    return (
        start.getDate() === today.getDate()
        && start.getMonth() === today.getMonth()
        && start.getFullYear() === today.getFullYear()
    );
};

interface TaskKanbanCardProps {
    task: Task;
    courseName?: string;
    onComplete: (id: string) => void;
}

const TaskKanbanCard = ({ task, courseName, onComplete }: TaskKanbanCardProps) => {
    const isCompleted = task.status === 'COMPLETED';
    const priorityBadge = priorityBadgeMap[task.priority];
    const dotColor = statusDotColor[task.status];

    return (
        <div className="bg-white rounded-[16px] p-4 border border-[#E5E5E5] transition-shadow hover:shadow-sm">
            <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-2.5 min-w-0">
                    <button
                        onClick={() => onComplete(task.id)}
                        className={`w-4 h-4 mt-0.5 rounded-[5px] border flex items-center justify-center transition-colors shrink-0 ${isCompleted ? 'bg-[#10B981] border-[#10B981]' : 'bg-white border-[#A3A3A3] hover:border-[#1A1A1A]'}`}
                        aria-label="Completer la tache"
                    >
                        {isCompleted && <Check size={11} strokeWidth={3} className="text-white" />}
                    </button>
                    <div className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ background: dotColor }} />
                    <div className={`text-[14px] font-bold leading-tight break-words ${isCompleted ? 'text-[#A3A3A3] line-through' : 'text-[#1A1A1A]'}`}>
                        {task.title}
                    </div>
                </div>
                {task.timeSpentMinutes > 0 && (
                    <div className="text-[13px] font-medium text-[#A3A3A3] shrink-0 whitespace-nowrap">
                        {task.timeSpentMinutes}
                        min
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                    <div className={`px-2.5 py-1 rounded-[6px] text-[13px] font-bold ${isCompleted ? 'bg-[#FAF9F6] text-[#A3A3A3]' : 'bg-[#FAF9F6] text-[#737373]'}`}>
                        {courseName || 'General'}
                    </div>
                    <div
                        className="px-2.5 py-1 rounded-[6px] text-[13px] font-bold whitespace-nowrap"
                        style={{ background: priorityBadge.bg, color: priorityBadge.text }}
                    >
                        {priorityBadge.label}
                    </div>
                </div>
                {task.dueDate && !isCompleted && (
                    <div className={`text-[13px] font-bold ${getDueDateColor(task.dueDate)}`}>
                        {formatDueDate(task.dueDate)}
                    </div>
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
        <div
            className={`
                shrink-0 min-w-[240px] max-w-[280px] bg-[#FAF9F6] border rounded-[16px] p-4
                cursor-pointer hover:bg-white transition-colors shadow-sm
                ${isExam ? 'border-[#991B1B]' : 'border-[#E5E5E5]'}
            `}
        >
            <div className="flex justify-between items-center mb-4">
                <span className={`px-2 py-[2px] rounded-[6px] text-[13px] font-bold tracking-wide ${eventTypeBadge[event.type] ?? 'bg-[#F3F4F6] text-[#1A1A1A]'}`}>
                    {eventTypeLabel[event.type] ?? event.type}
                </span>
                <span className="text-[13px] font-medium text-[#737373]">
                    {formatTime(event.startDate)}
                    {' - '}
                    {formatTime(event.endDate)}
                </span>
            </div>
            <div className="text-[15px] font-bold text-[#1A1A1A] mb-1 truncate">
                {courseName ? `${courseName} ` : ''}
                {event.title && courseName ? `- ${event.title}` : event.title}
            </div>
            <div className="text-[13px] font-medium text-[#737373] truncate">
                {event.location ? `${event.location} - ` : ''}
                {Math.max(1, Math.round((new Date(event.endDate).getTime() - new Date(event.startDate).getTime()) / (1000 * 60 * 60)))}
                h
            </div>
        </div>
    );
};

export default function DashboardPage() {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const { data: tasks = [], isLoading: tasksLoading } = useTasks();
    const { data: events = [], isLoading: eventsLoading } = useEvents();
    const { data: courses = [] } = useCourses();
    const { data: grades = [] } = useGrades();
    const { mutate: updateTask } = useUpdateTask();
    const { mutate: createTask, isPending: isCreatingTask } = useCreateTask();
    const { mutate: createEvent, isPending: isCreatingEvent } = useCreateEvent();

    const [quickInput, setQuickInput] = useState('');
    const smartPreview = parseSmartInput(quickInput);

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
                .sort((a, b) => (priorityOrder[a.priority] ?? 3) - (priorityOrder[b.priority] ?? 3)),
        [tasks],
    );

    const { overallAverage, riskCoursesCount } = useDashboardStats(grades, courses);
    const dateFormatted = useMemo(() => dateFormatter.format(new Date()), []);

    const handleComplete = useCallback(
        (id: string) => {
            const task = tasks.find((t) => t.id === id);
            if (!task) return;
            updateTask({
                id,
                payload: {
                    status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED',
                },
            });
        },
        [tasks, updateTask],
    );

    const handleQuickCreate = (e: FormEvent) => {
        e.preventDefault();
        const parsed = parseSmartInput(quickInput);
        if (!parsed) return;

        if (parsed.type === 'EVENT') {
            const dayRangeMatch = quickInput.toLowerCase().match(/du (\w+) au (\w+)/i);

            if (dayRangeMatch) {
                const dayMap: Record<string, number> = {
                    dimanche: 0, lundi: 1, mardi: 2, mercredi: 3, jeudi: 4, vendredi: 5, samedi: 6,
                };
                const startDay = dayMap[dayRangeMatch[1]];
                const endDay = dayMap[dayRangeMatch[2]];

                if (startDay !== undefined && endDay !== undefined) {
                    const today = new Date();
                    const weekStart = startOfWeek(today, { weekStartsOn: 1 });

                    for (let i = 0; i < 7; i += 1) {
                        const currentDay = addDays(weekStart, i);
                        const dayIdx = currentDay.getDay();

                        let isInRange = false;
                        if (startDay <= endDay) {
                            isInRange = dayIdx >= startDay && dayIdx <= endDay;
                        } else {
                            isInRange = dayIdx >= startDay || dayIdx <= endDay;
                        }

                        if (isInRange) {
                            const start = new Date(currentDay);
                            const end = new Date(currentDay);

                            const hourSource = parsed.dueDate ? new Date(parsed.dueDate) : new Date();
                            if (!parsed.dueDate) hourSource.setHours(12, 0, 0, 0);

                            start.setHours(hourSource.getHours(), hourSource.getMinutes(), 0, 0);

                            if (parsed.endDate) {
                                const ed = new Date(parsed.endDate);
                                end.setHours(ed.getHours(), ed.getMinutes(), 0, 0);
                            } else {
                                end.setHours(start.getHours() + 1, start.getMinutes(), 0, 0);
                            }

                            createEvent({
                                title: parsed.title,
                                startDate: start.toISOString(),
                                endDate: end.toISOString(),
                                type: 'CLASS',
                            });
                        }
                    }
                }
            } else {
                createEvent({
                    title: parsed.title,
                    startDate: parsed.dueDate ?? new Date().toISOString(),
                    endDate: parsed.endDate ?? (
                        parsed.dueDate
                            ? new Date(new Date(parsed.dueDate).getTime() + 60 * 60 * 1000).toISOString()
                            : new Date(new Date().getTime() + 60 * 60 * 1000).toISOString()
                    ),
                    type: 'TP',
                });
            }
        } else {
            createTask({
                title: parsed.title,
                priority: parsed.priority,
                status: 'PENDING',
                ...(parsed.dueDate ? { dueDate: parsed.dueDate } : {}),
            });
        }

        setQuickInput('');
    };

    return (
        <div className="max-w-[980px] mx-auto flex flex-col px-4 md:px-0 pb-20 pt-2 md:pt-6">
            <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-6 md:p-8 mb-6 mt-2 md:mt-5 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="text-[13px] font-bold text-[#737373] mb-2 capitalize">
                            {dateFormatted}
                        </div>
                        <div className="text-[26px] font-bold text-[#1A1A1A] tracking-tight mb-2">
                            Bonjour,
                            {' '}
                            {user?.name?.split(' ')[0] ?? 'Lucas'}
                            {' '}
                            !
                        </div>
                        <div className="text-[14px] font-medium text-[#1A1A1A]">
                            Tu as
                            {' '}
                            <span className="font-bold">{todayEvents.length} events</span>
                            {' '}
                            aujourd'hui et
                            {' '}
                            <span className="font-bold">{activeTasks.length} taches</span>
                            {' '}
                            en cours.
                        </div>
                    </div>

                    <div className="flex gap-6 items-center w-full md:w-auto md:pt-4">
                        <div className="text-center flex-1 md:flex-none">
                            <div className="text-[24px] font-bold text-[#1A1A1A] leading-none mb-[2px]">
                                {overallAverage !== null ? overallAverage.toFixed(1) : '-'}
                            </div>
                            <div className="text-[13px] font-bold text-[#737373] uppercase tracking-wide">
                                Moy. generale
                            </div>
                        </div>
                        <div className="w-[1px] h-10 bg-[#E5E5E5]" />
                        <div className="text-center flex-1 md:flex-none">
                            <div className="text-[24px] font-bold text-[#EF4444] leading-none mb-[2px]">
                                {riskCoursesCount}
                            </div>
                            <div className="text-[13px] font-bold text-[#737373] uppercase tracking-wide">
                                Cours a risque
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-[#E5E5E5] rounded-[18px] p-4 md:p-5 mb-6 shadow-sm">
                <div className="text-[13px] font-bold text-[#737373] uppercase tracking-wide mb-3">
                    Capture rapide
                </div>

                <form onSubmit={handleQuickCreate} className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                        <Sparkles size={18} className="text-[#737373]/60" />
                    </div>
                    <input
                        value={quickInput}
                        onChange={(e) => setQuickInput(e.target.value)}
                        placeholder="Decris ta tache... ex: demain a 14h rendre le TP de reseau"
                        className="w-full h-13 pl-12 pr-4 bg-[#FAF9F6] border border-[#E5E5E5] rounded-xl text-[15px] font-medium text-[#1A1A1A] outline-none placeholder:text-[#A3A3A3] focus:border-[#737373] transition-colors"
                        disabled={isCreatingTask || isCreatingEvent}
                    />
                </form>

                <div className="min-h-[32px] flex items-center mt-3">
                    {smartPreview ? (
                        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-200 flex-wrap">
                            <span className={`text-[13px] uppercase tracking-wide font-bold py-1 px-2 rounded-lg border ${smartPreview.type === 'EVENT' ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
                                {smartPreview.type === 'EVENT' ? 'Evenement' : 'Tache'}
                            </span>
                            <span className="text-[13px] font-medium text-[#1A1A1A] truncate max-w-[320px]">
                                {smartPreview.title}
                            </span>
                            {smartPreview.dueDate && (
                                <span className="text-[13px] font-bold text-[#737373] bg-[#FAF9F6] border border-[#E5E5E5] px-2 py-0.5 rounded-md">
                                    {format(new Date(smartPreview.dueDate), 'HH:mm', { locale: fr })}
                                    {smartPreview.endDate && ` - ${format(new Date(smartPreview.endDate), 'HH:mm', { locale: fr })}`}
                                    {` (${format(new Date(smartPreview.dueDate), 'd MMM', { locale: fr })})`}
                                </span>
                            )}
                            {smartPreview.recurrence && (
                                <span className="text-[13px] font-bold text-[#10B981] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-md">
                                    {smartPreview.recurrence}
                                </span>
                            )}
                            {smartPreview.priority !== 'MEDIUM' && (
                                <span className="text-[13px] font-bold text-[#EF4444]">
                                    {smartPreview.priority}
                                </span>
                            )}
                        </div>
                    ) : (
                        <div className="text-[13px] text-[#737373] font-medium">
                            Ecris naturellement: date, heure et type sont detectes automatiquement.
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-6">
                <div className="text-[13px] font-bold text-[#737373] uppercase tracking-wide mb-4 ml-1">
                    Aujourd'hui
                </div>

                <div className="min-h-[136px]">
                    {eventsLoading ? (
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="min-w-[240px] h-[120px] bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] animate-pulse shrink-0" />
                            ))}
                        </div>
                    ) : todayEvents.length === 0 ? (
                        <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-6 text-center shadow-sm min-h-[120px] flex flex-col justify-center">
                            <div className="text-[14px] font-bold text-[#1A1A1A]">Aucun evenement aujourd'hui</div>
                            <div className="text-[13px] font-medium text-[#737373]">Profites-en pour avancer sur tes taches.</div>
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
            </div>

            <div className="bg-[#FAF9F6] rounded-[24px] border border-[#E5E5E5] p-5 md:p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-[13px] font-bold text-[#737373] uppercase tracking-wide">
                        Taches en cours
                    </div>
                    <button
                        onClick={() => navigate('/tasks')}
                        className="text-[13px] font-bold text-[#737373] hover:text-[#1A1A1A] transition-colors flex items-center gap-1"
                    >
                        Voir tout
                        {' '}
                        <ArrowRight size={14} />
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    {tasksLoading ? (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="h-[92px] rounded-[16px] border border-[#E5E5E5] bg-white animate-pulse" />
                        ))
                    ) : activeTasks.length === 0 ? (
                        <div className="text-center py-7 bg-white border border-[#E5E5E5] rounded-[16px]">
                            <div className="text-[13px] font-bold text-[#1A1A1A] mb-1">Tout est a jour</div>
                            <div className="text-[13px] font-medium text-[#737373]">Tu n'as aucune tache en attente.</div>
                        </div>
                    ) : (
                        activeTasks.slice(0, 5).map((task) => (
                            <TaskKanbanCard
                                key={task.id}
                                task={task}
                                courseName={task.courseId ? courseDict[task.courseId] : undefined}
                                onComplete={handleComplete}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}


