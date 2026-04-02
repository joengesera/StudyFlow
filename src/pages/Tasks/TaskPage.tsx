import { useState, useEffect } from 'react';
import {
    DndContext,
   type DragEndEvent,
    DragOverlay,
   type DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
    useDroppable,
} from '@dnd-kit/core';
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTasks, useUpdateTask, useCreateTask, useDeleteTask } from '../../hooks/useTasks';
import { useCreateEvent } from '../../hooks/useEvents';
import { useCourses } from '../../hooks/useCourses';
import { usePomodoro } from '../../hooks/usePomodoro';
import { format, isToday, isTomorrow, differenceInDays, startOfWeek, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Task } from '../../types';

// ─── Helpers ──────────────────────────────────────────────

type Column = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';

const columns: { key: Column; label: string; dot: string; border: string; bg: string }[] = [
    { key: 'PENDING', label: 'À faire', dot: '#737373', border: 'border-[#E5E5E5]', bg: 'bg-[#FAF9F6]' },
    { key: 'IN_PROGRESS', label: 'En cours', dot: '#F59E0B', border: 'border-[#F59E0B]', bg: 'bg-[#FAF9F6]' },
    { key: 'COMPLETED', label: 'Terminées', dot: '#10B981', border: 'border-[#E5E5E5]', bg: 'bg-[#FAF9F6]' },
];

const priorityColor: Record<string, string> = {
    CRITICAL: '#8B5CF6',
    HIGH: '#EF4444',
    MEDIUM: '#F59E0B',
    LOW: '#10B981',
};

function formatDueDate(dueDateStr: string | null) {
    if (!dueDateStr) return null;
    const date = new Date(dueDateStr);
    if (isToday(date)) return "aujourd'hui";
    if (isTomorrow(date)) return "demain";
    const diff = differenceInDays(date, new Date());
    if (diff > 0 && diff < 15) return `dans ${diff}j`;
    return format(date, 'd MMM', { locale: fr });
}

function getDueDateColor(dueDateStr: string | null) {
    if (!dueDateStr) return 'text-[#737373]';
    const diff = differenceInDays(new Date(dueDateStr), new Date());
    if (diff < 0) return 'text-[#EF4444]'; // en retard
    if (diff <= 2) return 'text-[#EF4444]'; // bientôt (rouge)
    return 'text-[#737373]'; // gris
}

// ─── Composant carte tâche draggable ──────────────────────

interface TaskCardProps {
    task: Task;
    courseName?: string;
    onSelect: (task: Task) => void;
    isSelected: boolean;
}

const TaskCard = ({ task, courseName, onSelect, isSelected }: TaskCardProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging,
    } = useSortable({ id: task.id });

    const isCompleted = task.status === 'COMPLETED';
    let opacity = isDragging ? 0.3 : 1;

    // Effet de fondu progressif les 2 dernières secondes avant de disparaître
    if (isCompleted && task.completedAt) {
        const diff = Date.now() - new Date(task.completedAt).getTime();
        if (diff > 8000) {
            opacity = Math.max(0, (10000 - diff) / 2000);
        }
    }

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: 'all 0.2s ease',
        opacity: opacity,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => onSelect(task)}
            className={`
                bg-white rounded-[16px] p-4 mb-3 border cursor-grab active:cursor-grabbing select-none transition-shadow hover:shadow-sm
                ${isSelected ? 'ring-2 ring-blue-500 border-transparent' : task.status === 'IN_PROGRESS' ? 'border-[#F59E0B]' : 'border-[#E5E5E5]'}
            `}
        >
            {/* Haut : Titre + Dot + Temps */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2.5">
                    {isCompleted ? (
                        <div className="w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center shrink-0">
                            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 14 14" fill="none">
                                <path d="M2 7L6 11L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    ) : (
                        <div 
                            className="w-2.5 h-2.5 rounded-full shrink-0" 
                            style={{ background: priorityColor[task.priority] || '#A3A3A3' }} 
                        />
                    )}
                    <div className={`text-[14px] font-bold mt-0.5 leading-tight ${isCompleted ? 'text-[#A3A3A3] line-through' : 'text-[#1A1A1A]'}`}>
                        {task.title}
                    </div>
                </div>
                {task.timeSpentMinutes > 0 && (
                    <div className="text-[11px] font-medium text-[#A3A3A3] shrink-0 whitespace-nowrap ml-2 mt-0.5">
                        <span className="mr-1">⏱</span>{task.timeSpentMinutes}min
                    </div>
                )}
            </div>
            
            {/* Bas : Tags + Date */}
            <div className="flex items-center justify-between">
                <div className={`px-2.5 py-1 rounded-[6px] text-[11px] font-bold ${isCompleted ? 'bg-[#FAF9F6] text-[#A3A3A3]' : 'bg-[#FAF9F6] text-[#737373]'}`}>
                    {courseName || 'Général'}
                </div>
                {task.dueDate && !isCompleted && (
                    <div className={`text-[11px] font-bold ${getDueDateColor(task.dueDate)}`}>
                        {formatDueDate(task.dueDate)}
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Colonne droppable ────────────────────────────────────

interface KanbanColumnProps {
    column: typeof columns[number];
    tasks: Task[];
    courses: Record<string, string>;
    onSelect: (task: Task) => void;
    selectedTaskId: string | null;
    onAddTask: (status: Column) => void;
}

const KanbanColumn = ({
    column,
    tasks,
    courses,
    onSelect,
    selectedTaskId,
    onAddTask,
}: KanbanColumnProps) => {
    const { setNodeRef } = useDroppable({ id: column.key });

    return (
        <div className={`flex flex-col flex-1 min-w-[300px] rounded-[24px] border border-[#E5E5E5] p-2.5 pt-4 ${column.bg}`}>
            
            {/* Header colonne */}
            <div className="flex items-center gap-2 mb-4 px-3">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: column.dot }} />
                <span className="text-[15px] font-bold text-[#1A1A1A]">{column.label}</span>
                <span className="bg-white border border-[#E5E5E5] text-xs font-bold text-[#1A1A1A] px-2 py-0.5 rounded-full ml-1">
                    {tasks.length}
                </span>
            </div>

            {/* Cartes */}
            <div ref={setNodeRef} className="flex flex-col flex-1 min-h-[150px] overflow-y-auto scrollbar-hide px-1">
                <SortableContext
                    items={tasks.map((t) => t.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            courseName={task.courseId ? courses[task.courseId] : undefined}
                            onSelect={onSelect}
                            isSelected={selectedTaskId === task.id}
                        />
                    ))}
                </SortableContext>

                <button 
                    onClick={() => onAddTask(column.key)}
                    className="w-full py-3 rounded-[12px] border border-[#E5E5E5] text-[14px] font-medium text-[#737373] mt-2 mb-2 bg-transparent hover:bg-white transition-colors"
                >
                    + Ajouter
                </button>
            </div>
        </div>
    );
};

// ─── Pomodoro widget ──────────────────────────────────────
// (Gardé mais stylisé discrètement pour s'intégrer)

interface PomodoroWidgetProps {
    taskId: string | null;
    taskTitle: string | null;
}

const PomodoroWidget = ({ taskId, taskTitle }: PomodoroWidgetProps) => {
    const {
        phase,
        formatted,
        progress,
        isRunning,
        sessions,
        start,
        pause,
        reset,
        skip,
    } = usePomodoro(taskId);

    return (
        <div className="bg-white rounded-[24px] border border-[#E5E5E5] p-6 flex flex-col items-center gap-4 sticky top-6 shadow-sm">
            <div className="text-center w-full">
                <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2">
                    {phase === 'work' ? 'Travail' : 'Pause'}
                </div>
                {taskTitle ? (
                    <div className="text-[14px] font-bold text-[#1A1A1A] truncate w-full">
                        {taskTitle}
                    </div>
                ) : (
                    <div className="text-[14px] font-medium text-[#A3A3A3]">
                        Sélectionne une tâche
                    </div>
                )}
            </div>

            <div className="relative w-32 h-32 my-2">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50" cy="50" r="44"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        className="text-[#F1F1F1]"
                    />
                    <circle
                        cx="50" cy="50" r="44"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeDasharray={`${2 * Math.PI * 44}`}
                        strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`}
                        strokeLinecap="round"
                        className={phase === 'work' ? 'text-[#1A1A1A]' : 'text-[#10B981]'}
                        style={{ transition: 'stroke-dashoffset 1s linear' }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[26px] font-bold text-[#1A1A1A] tabular-nums tracking-tight">
                        {formatted}
                    </span>
                </div>
            </div>

            <div className="text-[12px] font-medium text-[#737373]">
                {sessions} session{sessions !== 1 ? 's' : ''} complétée{sessions !== 1 ? 's' : ''}
            </div>

            <div className="flex gap-2 w-full mt-2">
                <button onClick={reset} className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#FAF9F6] border border-[#E5E5E5] text-[#737373] hover:bg-gray-50 text-lg">↺</button>
                <button
                    onClick={isRunning ? pause : start}
                    disabled={!taskId}
                    className="flex-1 h-10 rounded-xl bg-white border border-[#E5E5E5] text-[#1A1A1A] text-[14px] font-bold hover:bg-gray-50 shadow-sm disabled:opacity-50"
                >
                    {isRunning ? 'Pause' : 'Démarrer'}
                </button>
                <button onClick={skip} className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#FAF9F6] border border-[#E5E5E5] text-[#737373] hover:bg-gray-50 text-xl">⏭</button>
            </div>
        </div>
    );
};

// ─── Modal détail tâche ───────────────────────────────────

interface TaskModalProps {
    task: Task;
    onClose: () => void;
    onUpdate: (id: string, payload: Partial<Task>) => void;
    onDelete: (id: string) => void;
}

const TaskModal = ({ task, onClose, onUpdate, onDelete }: TaskModalProps) => {
    const [title, setTitle] = useState(task.title);
    const [priority, setPriority] = useState(task.priority);
    const [status, setStatus] = useState(task.status);
    const [dueDate, setDueDate] = useState(
        task.dueDate ? task.dueDate.slice(0, 16) : ''
    );

    const handleSave = () => {
        onUpdate(task.id, {
            title,
            priority,
            status,
            dueDate: dueDate ? new Date(dueDate).toISOString() : null,
            completedAt: status === 'COMPLETED' 
                ? (task.status === 'COMPLETED' ? task.completedAt : new Date().toISOString()) 
                : null
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[24px] p-8 w-full max-w-[440px] shadow-2xl relative">
                <h2 className="text-[22px] font-bold text-[#1A1A1A] mb-6">Modifier la tâche</h2>
                
                <div className="flex flex-col gap-5">
                    <div>
                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">Titre</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">Priorité</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value as Task['priority'])}
                                className="w-full h-11 px-3 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none bg-transparent"
                            >
                                <option value="LOW">Faible</option>
                                <option value="MEDIUM">Moyenne</option>
                                <option value="HIGH">Haute</option>
                                <option value="CRITICAL">Critique</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">Statut</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as Task['status'])}
                                className="w-full h-11 px-3 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none bg-transparent"
                            >
                                <option value="PENDING">À faire</option>
                                <option value="IN_PROGRESS">En cours</option>
                                <option value="COMPLETED">Terminée</option>
                                <option value="CANCELED">Annulée</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">Échéance</label>
                        <input
                            type="datetime-local"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none"
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center mt-8 pt-4 border-t border-[#E5E5E5]">
                    <button 
                        onClick={() => {
                            if (confirm('Supprimer cette tâche ?')) {
                                onDelete(task.id);
                                onClose();
                            }
                        }}
                        className="text-[13px] font-bold text-[#EF4444] hover:opacity-70 px-2"
                    >
                        Supprimer
                    </button>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] text-[14px] font-bold text-[#1A1A1A] bg-white hover:bg-gray-50">
                            Annuler
                        </button>
                        <button onClick={handleSave} className="px-5 py-2.5 rounded-xl border border-[#1A1A1A] text-[14px] font-bold text-white bg-[#1A1A1A]">
                            Enregistrer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Page principale ───────────────────────────────────────

export default function TasksPage() {
    const { data: tasks = [], isLoading } = useTasks();
    const { data: courses = [] } = useCourses();
    const { mutate: updateTask } = useUpdateTask();
    const { mutate: createTask, isPending: isCreating } = useCreateTask();
    const { mutate: deleteTask } = useDeleteTask();
    const { mutate: createEvent, isPending: isCreatingEvent } = useCreateEvent();

    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [pomodoroTask, setPomodoroTask] = useState<Task | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [quickInput, setQuickInput] = useState('');
    const [showModal, setShowModal] = useState(false);

    // ─── Parsing universel ───────────────────────────────────
    const parseSmartInput = (text: string) => {
        if (!text.trim()) return null;

        let type: 'TASK' | 'EVENT' = 'TASK';
        let dueDate: string | null = null;
        let endDate: string | null = null;
        let recurrence: string | null = null;
        
        const base = new Date();
        const lowerText = text.toLowerCase();

        // ─── Type ─────────────────────────────────────────────
        if (/(cours|examen|interro|tp|td|réunion|rdv|rendez-vous|meet|planning|agenda|soirée|déjeuner|midi|sport)/i.test(lowerText)) {
            type = 'EVENT';
        }

        // ─── Date Logic ────────────────────────────────────────
        if (/après.demain/i.test(lowerText)) {
             base.setDate(base.getDate() + 2);
        } else if (/demain/i.test(lowerText)) {
             base.setDate(base.getDate() + 1);
        }

        const inDays = lowerText.match(/dans (\d+) ?j(ours)?/i);
        if (inDays) base.setDate(base.getDate() + parseInt(inDays[1]));

        const inWeeks = lowerText.match(/dans (\d+) ?semaine/i);
        if (inWeeks) base.setDate(base.getDate() + parseInt(inWeeks[1]) * 7);

        // ─── Time Range ────────────────────────────────────────
        const rangeMatch = lowerText.match(/de (\d{1,2})[h:]?(\d{2})? (à|-) (\d{1,2})[h:]?(\d{2})?/i);
        const singleTimeMatch = lowerText.match(/à (\d{1,2})h(\d{2})?/i);

        if (rangeMatch) {
            const startH = parseInt(rangeMatch[1]);
            const startM = parseInt(rangeMatch[2] ?? '0');
            const endH = parseInt(rangeMatch[4]);
            const endM = parseInt(rangeMatch[5] ?? '0');
            
            const startDate = new Date(base);
            startDate.setHours(startH, startM, 0, 0);
            
            const endDateObj = new Date(base);
            endDateObj.setHours(endH, endM, 0, 0);
            
            dueDate = startDate.toISOString();
            endDate = endDateObj.toISOString();
            type = 'EVENT';
        } else if (singleTimeMatch) {
            base.setHours(parseInt(singleTimeMatch[1]), parseInt(singleTimeMatch[2] ?? '0'), 0, 0);
            dueDate = base.toISOString();
        }

        // ─── Recurrence / Range Logic (Simplified) ──────────────
        const dayRangeMatch = lowerText.match(/du (\w+) au (\w+)/i);
        if (dayRangeMatch) {
            recurrence = `Répétition: ${dayRangeMatch[1]} au ${dayRangeMatch[2]}`;
            type = 'EVENT';
        }

        let priority: Task['priority'] = 'MEDIUM';
        if (/urgent|critique/i.test(lowerText)) priority = 'CRITICAL';
        else if (/important/i.test(lowerText)) priority = 'HIGH';

        // ─── Title Cleaning ────────────────────────────────────
        const title = text
            .replace(/demain|après.demain|dans \d+ ?j(ours)?|dans \d+ ?semaine|à \d{1,2}h\d{0,2}|de \d{1,2}[h:]?\d{0,2} (à|-) \d{1,2}[h:]?\d{0,2}|du \w+ au \w+|urgent|important|critique|cours|examen|interro|tp|td|réunion|rdv|rendez-vous|meet|planning|agenda/gi, '')
            .replace(/\s+/g, ' ')
            .trim() || text;

        return { type, title, dueDate, endDate, priority, recurrence };
    };

    const smartPreview = parseSmartInput(quickInput);

    // Map course id to course name
    const courseDict = courses.reduce((acc, c) => {
        acc[c.id] = c.name;
        return acc;
    }, {} as Record<string, string>);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        })
    );

    const [now, setNow] = useState(Date.now());

    // Timer pour rafraîchir le filtre des tâches terminées toutes les secondes
    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval);
    }, []);

    const tasksByColumn = (col: Column) =>
        tasks
            .filter((t) => {
                if (t.isDeleted) return false;
                if (t.status !== col) return false;
                
                // Si la tâche est terminée, on ne l'affiche que si elle l'a été il y a moins de 10 secondes
                if (col === 'COMPLETED') {
                    if (!t.completedAt) return false;
                    const completedTime = new Date(t.completedAt).getTime();
                    return (now - completedTime) < 10000;
                }
                
                return true;
            })
            .sort((a, b) => a.position - b.position);

    const activeDragTask = activeId
        ? tasks.find((t) => t.id === activeId)
        : null;

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(String(event.active.id));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);
        if (!over) return;

        const taskId = String(active.id);
        const overId = String(over.id);

        const targetColumn = columns.find((c) => c.key === overId);
        if (targetColumn) {
            const task = tasks.find((t) => t.id === taskId);
            if (task && task.status !== targetColumn.key) {
                updateTask({
                    id: taskId,
                    payload: { 
                        status: targetColumn.key,
                        completedAt: targetColumn.key === 'COMPLETED' ? new Date().toISOString() : null
                    },
                });
            }
            return;
        }

        const overTask = tasks.find((t) => t.id === overId);
        const dragTask = tasks.find((t) => t.id === taskId);
        if (overTask && dragTask && overTask.status === dragTask.status) {
            updateTask({
                id: taskId,
                payload: {
                    status: overTask.status,
                    position: overTask.position,
                },
            });
        }
    };

    const handleQuickCreate = (e: React.FormEvent) => {
        e.preventDefault();
        const parsed = parseSmartInput(quickInput);
        if (!parsed) return;

        if (parsed.type === 'EVENT') {
            const dayRangeMatch = quickInput.toLowerCase().match(/du (\w+) au (\w+)/i);
            
            if (dayRangeMatch) {
                const dayMap: Record<string, number> = {
                    'dimanche': 0, 'lundi': 1, 'mardi': 2, 'mercredi': 3, 'jeudi': 4, 'vendredi': 5, 'samedi': 6
                };
                const startDay = dayMap[dayRangeMatch[1]];
                const endDay = dayMap[dayRangeMatch[2]];

                if (startDay !== undefined && endDay !== undefined) {
                    const today = new Date();
                    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
                    
                    // On itère sur les 7 jours de la semaine en cours
                    for (let i = 0; i < 7; i++) {
                        const currentDay = addDays(weekStart, i);
                        const dayIdx = currentDay.getDay();
                        
                        // Vérifier si le jour est dans la plage (gestion circulaire simplifiée)
                        let isInRange = false;
                        if (startDay <= endDay) {
                            isInRange = dayIdx >= startDay && dayIdx <= endDay;
                        } else {
                            // Cas du type "du samedi au mardi"
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
                                type: 'CLASS'
                            });
                        }
                    }
                }
            } else {
                createEvent({
                    title: parsed.title,
                    startDate: parsed.dueDate ?? new Date().toISOString(),
                    endDate: parsed.endDate ?? (parsed.dueDate 
                        ? new Date(new Date(parsed.dueDate).getTime() + 60 * 60 * 1000).toISOString() 
                        : new Date(new Date().getTime() + 60 * 60 * 1000).toISOString()),
                    type: 'TP'
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

    if (isLoading) {
        return (
            <div className="flex gap-4 p-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex-1 h-96 bg-[#FAF9F6] rounded-[24px] border border-[#E5E5E5] animate-pulse" />
                ))}
            </div>
        );
    }

    const urgentCount = tasks.filter(t => !t.isDeleted && (t.priority === 'HIGH' || t.priority === 'CRITICAL')).length;
    const totalCount = tasks.filter(t => !t.isDeleted).length;

    return (
        <div className="flex flex-col gap-8 max-w-[1400px] mx-auto pb-10">

            {/* Header */}
            <div className="flex justify-between items-center sm:px-2">
                <div>
                    <h1 className="text-[28px] font-bold text-[#1A1A1A] tracking-tight">Tâches</h1>
                    <p className="text-[15px] text-[#737373] mt-1 font-medium">
                        {totalCount} tâches · {urgentCount} urgentes
                    </p>
                </div>
                <button 
                    onClick={() => createTask({ title: 'Nouvelle tâche', status: 'PENDING', priority: 'MEDIUM' })}
                    className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] bg-white text-[15px] font-bold text-[#1A1A1A] hover:bg-gray-50 shadow-sm transition-colors"
                >
                    + Nouvelle tâche <span className="text-[#A3A3A3] ml-1">...</span>
                </button>
            </div>

            {/* Smart Input & Navigation */}
            <div className="flex flex-col gap-2 sm:px-2">
                <form onSubmit={handleQuickCreate} className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                        <span className="text-lg opacity-40">✨</span>
                    </div>
                    <input
                        value={quickInput}
                        onChange={(e) => setQuickInput(e.target.value)}
                        placeholder="Décris ta tâche... ex: demain à 14h rendre le TP de réseau"
                        className="w-full h-14 pl-12 pr-4 bg-white border border-[#E5E5E5] rounded-xl text-[15px] font-medium text-[#1A1A1A] outline-none placeholder:text-[#A3A3A3] focus:border-[#737373] transition-colors shadow-sm"
                        disabled={isCreating || isCreatingEvent}
                    />
                </form>
                
                {/* Aperçu Dynamique */}
                <div className="min-h-[32px] flex items-center mb-4">
                    {smartPreview ? (
                        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                             <span className={`text-[10px] uppercase tracking-wider font-bold py-1 px-2 rounded-lg border ${smartPreview.type === 'EVENT' ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
                                {smartPreview.type === 'EVENT' ? '📅 Événement' : '✅ Tâche'}
                             </span>
                             <span className="text-[13px] font-medium text-[#1A1A1A] truncate max-w-[300px]">
                                {smartPreview.title}
                             </span>
                             {smartPreview.dueDate && (
                                 <span className="text-[12px] font-bold text-[#737373] bg-[#FAF9F6] border border-[#E5E5E5] px-2 py-0.5 rounded-md">
                                    ⏰ {format(new Date(smartPreview.dueDate), 'HH:mm', { locale: fr })}
                                    {smartPreview.endDate && ` - ${format(new Date(smartPreview.endDate), 'HH:mm', { locale: fr })}`}
                                    {` (${format(new Date(smartPreview.dueDate), 'd MMM', { locale: fr })})`}
                                 </span>
                             )}
                              {smartPreview.recurrence && (
                                 <span className="text-[12px] font-bold text-[#10B981] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-md">
                                    🔄 {smartPreview.recurrence}
                                 </span>
                             )}
                              {smartPreview.priority !== 'MEDIUM' && (
                                 <span className="text-[11px] font-bold text-[#EF4444]">
                                    🔥 {smartPreview.priority}
                                 </span>
                             )}
                        </div>
                    ) : (
                        <div className="text-[13px] text-[#737373] font-medium">
                            Écris naturellement — la date, l'heure et l'élément sont détectés automatiquement.
                        </div>
                    )}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2.5">
                    <button className="bg-[#1A1A1A] text-white px-4 py-[6px] rounded-full text-[13px] font-bold">Toutes</button>
                    <button className="bg-transparent border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#A3A3A3] px-4 py-[6px] rounded-full text-[13px] font-bold transition-colors">Urgent</button>
                    <button className="bg-transparent border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#A3A3A3] px-4 py-[6px] rounded-full text-[13px] font-bold transition-colors">Aujourd'hui</button>
                    
                    {courses.slice(0, 5).map(c => (
                        <button key={c.id} className="bg-transparent border border-[#E5E5E5] hover:border-[#A3A3A3] text-[#1A1A1A] px-3.5 py-[6px] rounded-full text-[13px] font-bold transition-colors flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full mt-0.5" style={{ background: c.color }} />
                            {c.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Kanban & Pomodoro */}
            <div className="flex items-start gap-6 sm:px-2 overflow-x-auto pb-4 no-scrollbar">
                
                {/* Board */}
                <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex gap-4 flex-1">
                        {columns.map((col) => (
                            <KanbanColumn
                                key={col.key}
                                column={col}
                                tasks={tasksByColumn(col.key)}
                                courses={courseDict}
                                onSelect={(task) => {
                                    setSelectedTask(task);
                                    setPomodoroTask(task);
                                    setShowModal(true);
                                }}
                                selectedTaskId={selectedTask?.id ?? pomodoroTask?.id ?? null}
                                onAddTask={(status) => {
                                    createTask({ title: 'Nouvelle tâche', status, priority: 'MEDIUM' });
                                }}
                            />
                        ))}
                    </div>

                    <DragOverlay>
                        {activeDragTask && (
                            <div className="bg-white rounded-[16px] p-4 border border-blue-500 shadow-xl opacity-90 scale-105">
                                <div className="text-[14px] font-bold text-[#1A1A1A] mb-3">{activeDragTask.title}</div>
                                <div className="flex gap-2">
                                    <div className="bg-[#FAF9F6] w-12 h-4 rounded-lg"></div>
                                </div>
                            </div>
                        )}
                    </DragOverlay>
                </DndContext>

                {/* Pomodoro Widget */}
                <div className="w-[300px] shrink-0 hidden lg:block">
                    <PomodoroWidget
                        taskId={pomodoroTask?.id ?? null}
                        taskTitle={pomodoroTask?.title ?? null}
                    />
                </div>

            </div>

            {/* Modal Modification */}
            {showModal && selectedTask && (
                <TaskModal
                    task={selectedTask}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedTask(null);
                    }}
                    onUpdate={(id, payload) =>
                        updateTask({ id, payload })
                    }
                    onDelete={(id) => deleteTask(id)}
                />
            )}
        </div>
    );
}