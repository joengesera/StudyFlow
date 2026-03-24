import { useState } from 'react';
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
import { useTasks, useUpdateTask, useCreateTask } from '../../hooks/useTasks';
import { usePomodoro } from '../../hooks/usePomodoro';
import type { Task } from '../../types';

// ─── Helpers ──────────────────────────────────────────────

type Column = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';

const columns: { key: Column; label: string; color: string }[] = [
    { key: 'PENDING', label: 'À faire', color: 'bg-base-content/20' },
    { key: 'IN_PROGRESS', label: 'En cours', color: 'bg-warning' },
    { key: 'COMPLETED', label: 'Terminées', color: 'bg-success' },
    { key: 'CANCELED', label: 'Annulées', color: 'bg-error' },
];

const priorityColor: Record<string, string> = {
    CRITICAL: 'bg-purple-500',
    HIGH: 'bg-error',
    MEDIUM: 'bg-warning',
    LOW: 'bg-success',
};

// ─── Composant carte tâche draggable ──────────────────────

interface TaskCardProps {
    task: Task;
    onSelect: (task: Task) => void;
    isSelected: boolean;
}

const TaskCard = ({ task, onSelect, isSelected }: TaskCardProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => onSelect(task)}
            className={`
        bg-base-100 rounded-xl p-3 border cursor-grab active:cursor-grabbing
        transition-colors select-none
        ${isSelected ? 'border-base-content/50' : 'border-base-200 hover:border-base-300'}
      `}
        >
            <div className="flex items-start gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full shrink-0 mt-1 ${priorityColor[task.priority]}`} />
                <div className={`text-sm flex-1 ${task.status === 'COMPLETED' ? 'line-through text-base-content/30' : 'text-base-content'}`}>
                    {task.title}
                </div>
            </div>
            {task.dueDate && (
                <div className="text-xs text-base-content/40 pl-4">
                    {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                </div>
            )}
            {task.timeSpentMinutes > 0 && (
                <div className="text-xs text-base-content/30 pl-4 mt-0.5">
                    ⏱ {task.timeSpentMinutes}min
                </div>
            )}
        </div>
    );
};

// ─── Colonne droppable ────────────────────────────────────

interface KanbanColumnProps {
    column: typeof columns[number];
    tasks: Task[];
    onSelect: (task: Task) => void;
    selectedTaskId: string | null;
    onAddTask: (status: Column) => void;
}

const KanbanColumn = ({
    column,
    tasks,
    onSelect,
    selectedTaskId,
    onAddTask,
}: KanbanColumnProps) => {
    const { setNodeRef } = useDroppable({ id: column.key });

    return (
        <div className="flex flex-col bg-base-200 rounded-xl p-3 min-w-56 flex-1">

            {/* Header colonne */}
            <div className="flex items-center gap-2 mb-3">
                <div className={`w-2 h-2 rounded-full ${column.color}`} />
                <span className="text-xs font-medium text-base-content/60">{column.label}</span>
                <span className="ml-auto text-xs bg-base-300 px-2 py-0.5 rounded-full text-base-content/40">
                    {tasks.length}
                </span>
            </div>

            {/* Cartes */}
            <div ref={setNodeRef} className="flex flex-col gap-2 flex-1 min-h-16">
                <SortableContext
                    items={tasks.map((t) => t.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onSelect={onSelect}
                            isSelected={selectedTaskId === task.id}
                        />
                    ))}
                </SortableContext>
            </div>

            {/* Bouton ajout */}
            <button
                onClick={() => onAddTask(column.key)}
                className="mt-2 w-full text-xs text-base-content/30 hover:text-base-content py-2 border-2 border-dashed border-base-300 hover:border-base-content/20 rounded-lg transition-colors"
            >
                + Ajouter
            </button>

        </div>
    );
};

// ─── Pomodoro widget ──────────────────────────────────────

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
        <div className="bg-base-100 rounded-2xl border border-base-200 p-5 flex flex-col items-center gap-4">

            {/* Titre */}
            <div className="text-center">
                <div className="text-xs text-base-content/40 uppercase tracking-widest mb-1">
                    {phase === 'work' ? 'Travail' : 'Pause'}
                </div>
                {taskTitle && (
                    <div className="text-sm font-medium text-base-content truncate max-w-48">
                        {taskTitle}
                    </div>
                )}
                {!taskTitle && (
                    <div className="text-xs text-base-content/30">
                        Sélectionne une tâche
                    </div>
                )}
            </div>

            {/* Cercle de progression */}
            <div className="relative w-28 h-28">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50" cy="50" r="44"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        className="text-base-200"
                    />
                    <circle
                        cx="50" cy="50" r="44"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeDasharray={`${2 * Math.PI * 44}`}
                        strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`}
                        strokeLinecap="round"
                        className={phase === 'work' ? 'text-base-content' : 'text-success'}
                        style={{ transition: 'stroke-dashoffset 1s linear' }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-medium text-base-content tabular-nums">
                        {formatted}
                    </span>
                </div>
            </div>

            {/* Sessions */}
            <div className="text-xs text-base-content/30">
                {sessions} session{sessions !== 1 ? 's' : ''} complétée{sessions !== 1 ? 's' : ''}
            </div>

            {/* Contrôles */}
            <div className="flex gap-2">
                <button onClick={reset} className="btn btn-ghost btn-xs">↺</button>
                <button
                    onClick={isRunning ? pause : start}
                    disabled={!taskId}
                    className="btn btn-neutral btn-sm px-6"
                >
                    {isRunning ? 'Pause' : 'Démarrer'}
                </button>
                <button onClick={skip} className="btn btn-ghost btn-xs">⏭</button>
            </div>

        </div>
    );
};

// ─── Modal détail tâche ───────────────────────────────────

interface TaskModalProps {
    task: Task;
    onClose: () => void;
    onUpdate: (id: string, payload: Partial<Task>) => void;
}

const TaskModal = ({ task, onClose, onUpdate }: TaskModalProps) => {
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
        });
        onClose();
    };

    return (
        <dialog open className="modal modal-open">
            <div className="modal-box max-w-md">

                <h3 className="font-medium text-base mb-5">Modifier la tâche</h3>

                <div className="flex flex-col gap-3">

                    <div>
                        <label className="text-xs text-base-content/50 mb-1 block">Titre</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="input input-bordered input-sm w-full"
                        />
                    </div>

                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label className="text-xs text-base-content/50 mb-1 block">Priorité</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value as Task['priority'])}
                                className="select select-bordered select-sm w-full"
                            >
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                                <option value="CRITICAL">CRITICAL</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-base-content/50 mb-1 block">Statut</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as Task['status'])}
                                className="select select-bordered select-sm w-full"
                            >
                                <option value="PENDING">À faire</option>
                                <option value="IN_PROGRESS">En cours</option>
                                <option value="COMPLETED">Terminée</option>
                                <option value="CANCELED">Annulée</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-base-content/50 mb-1 block">Échéance</label>
                        <input
                            type="datetime-local"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="input input-bordered input-sm w-full"
                        />
                    </div>

                </div>

                <div className="flex justify-end gap-2 mt-5">
                    <button onClick={onClose} className="btn btn-ghost btn-sm">Annuler</button>
                    <button onClick={handleSave} className="btn btn-neutral btn-sm">Enregistrer</button>
                </div>

            </div>
            <div className="modal-backdrop" onClick={onClose} />
        </dialog>
    );
};

// ─── Page principale ───────────────────────────────────────

export default function TasksPage() {
    const { data: tasks = [], isLoading } = useTasks();
    const { mutate: updateTask } = useUpdateTask();
    const { mutate: createTask, isPending: isCreating } = useCreateTask();

    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [quickInput, setQuickInput] = useState('');
    const [showModal, setShowModal] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        })
    );

    // Groupe les tâches par colonne
    const tasksByColumn = (col: Column) =>
        tasks
            .filter((t) => !t.isDeleted && t.status === col)
            .sort((a, b) => a.position - b.position);

    const activeDragTask = activeId
        ? tasks.find((t) => t.id === activeId)
        : null;

    // Drag start
    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(String(event.active.id));
    };

    // Drag end — met à jour le status selon la colonne cible
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const taskId = String(active.id);
        const overId = String(over.id);

        // Vérifie si on drop sur une colonne
        const targetColumn = columns.find((c) => c.key === overId);
        if (targetColumn) {
            const task = tasks.find((t) => t.id === taskId);
            if (task && task.status !== targetColumn.key) {
                updateTask({
                    id: taskId,
                    payload: { status: targetColumn.key },
                });
            }
            return;
        }

        // Drop sur une autre tâche — même colonne, réordonne
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

    // Input universel
    const handleQuickCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!quickInput.trim()) return;

        const text = quickInput.trim();
        let dueDate: string | undefined;
        const base = new Date();

        if (/demain/i.test(text)) base.setDate(base.getDate() + 1);
        const inDays = text.match(/dans (\d+) ?j/i);
        if (inDays) base.setDate(base.getDate() + parseInt(inDays[1]));
        const timeMatch = text.match(/à (\d{1,2})h(\d{2})?/i);
        if (timeMatch) {
            base.setHours(parseInt(timeMatch[1]), parseInt(timeMatch[2] ?? '0'), 0, 0);
            dueDate = base.toISOString();
        }

        let priority: Task['priority'] = 'MEDIUM';
        if (/urgent|critique/i.test(text)) priority = 'CRITICAL';
        else if (/important/i.test(text)) priority = 'HIGH';

        const title = text
            .replace(/demain|dans \d+ ?j|à \d{1,2}h\d{0,2}|urgent|important|critique/gi, '')
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

    if (isLoading) {
        return (
            <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex-1 h-96 skeleton rounded-xl" />
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-medium text-base-content">Tâches</h1>
                    <p className="text-sm text-base-content/40 mt-1">
                        {tasks.filter((t) => !t.isDeleted).length} tâches
                    </p>
                </div>
            </div>

            {/* Layout : Kanban + Pomodoro */}
            <div className="flex gap-5 items-start">

                {/* Kanban */}
                <div className="flex-1 flex flex-col gap-4 min-w-0">

                    {/* Input universel */}
                    <form onSubmit={handleQuickCreate}>
                        <input
                            value={quickInput}
                            onChange={(e) => setQuickInput(e.target.value)}
                            placeholder="✦  Décris ta tâche... ex: demain à 14h rendre le TP"
                            className="input input-bordered input-sm w-full"
                            disabled={isCreating}
                        />
                    </form>

                    {/* Board */}
                    <DndContext
                        sensors={sensors}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {columns.map((col) => (
                                <KanbanColumn
                                    key={col.key}
                                    column={col}
                                    tasks={tasksByColumn(col.key)}
                                    onSelect={(task) => {
                                        setSelectedTask(task);
                                        setShowModal(true);
                                    }}
                                    selectedTaskId={selectedTask?.id ?? null}
                                    onAddTask={(status) => {
                                        createTask({ title: 'Nouvelle tâche', status, priority: 'MEDIUM' });
                                    }}
                                />
                            ))}
                        </div>

                        {/* Carte fantôme pendant le drag */}
                        <DragOverlay>
                            {activeDragTask && (
                                <div className="bg-base-100 rounded-xl p-3 border border-base-300 shadow-lg opacity-90 text-sm">
                                    {activeDragTask.title}
                                </div>
                            )}
                        </DragOverlay>
                    </DndContext>

                </div>

                {/* Pomodoro — fixe à droite */}
                <div className="w-56 shrink-0 hidden lg:block">
                    <PomodoroWidget
                        taskId={selectedTask?.id ?? null}
                        taskTitle={selectedTask?.title ?? null}
                    />
                </div>

            </div>

            {/* Modal tâche */}
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
                />
            )}

        </div>
    );
}