import { useEffect, useState } from 'react';
import {
    DndContext,
    type DragEndEvent,
    DragOverlay,
    type DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { isToday } from 'date-fns';
import { useTasks, useUpdateTask, useCreateTask, useDeleteTask } from '../../hooks/useTasks';
import { useEvents } from '../../hooks/useEvents';
import { useCourses } from '../../hooks/useCourses';
import type { Event, Task } from '../../types';
import { KanbanColumn } from './components/KanbanColumn';
import { PomodoroWidget } from './components/PomodoroWidget';
import { TaskModal } from './components/TaskModal';
import { columns, type Column } from './taskShared';

export default function TasksPage() {
    const { data: tasks = [], isLoading } = useTasks();
    const { data: courses = [] } = useCourses();
    const { data: events = [] } = useEvents();
    const { mutate: updateTask } = useUpdateTask();
    const { mutate: createTask } = useCreateTask();
    const { mutate: deleteTask } = useDeleteTask();

    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [pomodoroTask, setPomodoroTask] = useState<Task | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [activeFilter, setActiveFilter] = useState<string>('ALL');
    const [now, setNow] = useState(() => Date.now());

    const COMPLETED_VISIBLE_DURATION_MS = 24 * 60 * 60 * 1000;

    const courseDict = courses.reduce((acc, c) => {
        acc[c.id] = c.name;
        return acc;
    }, {} as Record<string, string>);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        }),
    );

    useEffect(() => {
        const interval = window.setInterval(() => {
            setNow(Date.now());
        }, 60_000);

        return () => window.clearInterval(interval);
    }, []);

    const matchesFilter = (task: Task) => {
        if (activeFilter === 'ALL') return true;
        if (activeFilter === 'URGENT') return task.priority === 'HIGH' || task.priority === 'CRITICAL';
        if (activeFilter === 'TODAY') {
            if (!task.dueDate) return false;
            return isToday(new Date(task.dueDate));
        }
        if (activeFilter.startsWith('COURSE:')) {
            return task.courseId === activeFilter.replace('COURSE:', '');
        }
        return true;
    };

    const tasksByColumn = (col: Column) =>
        tasks
            .filter((t) => {
                if (t.isDeleted) return false;
                if (t.status !== col) return false;
                if (col === 'COMPLETED') {
                    const completedAtMs = new Date(t.completedAt ?? t.updatedAt).getTime();
                    if (Number.isNaN(completedAtMs)) return false;
                    if (now - completedAtMs > COMPLETED_VISIBLE_DURATION_MS) return false;
                }
                return matchesFilter(t);
            })
            .sort((a, b) => a.position - b.position);

    const activeDragTask = activeId ? tasks.find((t) => t.id === activeId) : null;

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
                        completedAt: targetColumn.key === 'COMPLETED' ? new Date().toISOString() : null,
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

    if (isLoading) {
        return (
            <div className="flex gap-4 p-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex-1 h-96 bg-[#FAF9F6] rounded-[24px] border border-[#E5E5E5] animate-pulse" />
                ))}
            </div>
        );
    }

    const urgentCount = tasks.filter((t) => !t.isDeleted && (t.priority === 'HIGH' || t.priority === 'CRITICAL')).length;
    const totalCount = tasks.filter((t) => !t.isDeleted).length;
    const editableEvents = events
        .filter((e): e is Event => Boolean(e?.id))
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    return (
        <div className="flex h-full min-h-0 flex-col gap-8 max-w-[1400px] mx-auto pb-6 px-3 sm:px-2">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-[28px] font-bold text-[#1A1A1A] tracking-tight">Taches</h1>
                    <p className="text-[15px] text-[#737373] mt-1 font-medium">
                        {totalCount}
                        {' '}
                        taches -
                        {' '}
                        {urgentCount}
                        {' '}
                        urgentes
                    </p>
                </div>
                <button
                    onClick={() => createTask({ title: 'Nouvelle tache', status: 'PENDING', priority: 'MEDIUM' })}
                    className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] bg-white text-[15px] font-bold text-[#1A1A1A] hover:bg-gray-50 shadow-sm transition-colors"
                >
                    + Nouvelle tache
                    <span className="text-[#A3A3A3] ml-1">...</span>
                </button>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2.5">
                    <button
                        onClick={() => setActiveFilter('ALL')}
                        className={`${activeFilter === 'ALL' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-transparent border-[#E5E5E5] text-[#1A1A1A] hover:border-[#A3A3A3]'} border px-4 py-[6px] rounded-full text-[13px] font-bold transition-colors`}
                    >
                        Toutes
                    </button>
                    <button
                        onClick={() => setActiveFilter('URGENT')}
                        className={`${activeFilter === 'URGENT' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-transparent border-[#E5E5E5] text-[#1A1A1A] hover:border-[#A3A3A3]'} border px-4 py-[6px] rounded-full text-[13px] font-bold transition-colors`}
                    >
                        Urgent
                    </button>
                    <button
                        onClick={() => setActiveFilter('TODAY')}
                        className={`${activeFilter === 'TODAY' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-transparent border-[#E5E5E5] text-[#1A1A1A] hover:border-[#A3A3A3]'} border px-4 py-[6px] rounded-full text-[13px] font-bold transition-colors`}
                    >
                        Aujourd'hui
                    </button>

                    {courses.slice(0, 5).map((c) => (
                        <button
                            key={c.id}
                            onClick={() => setActiveFilter(`COURSE:${c.id}`)}
                            className={`${activeFilter === `COURSE:${c.id}` ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-transparent border-[#E5E5E5] hover:border-[#A3A3A3] text-[#1A1A1A]'} border px-3.5 py-[6px] rounded-full text-[13px] font-bold transition-colors flex items-center gap-2`}
                        >
                            <span className="w-2.5 h-2.5 rounded-full mt-0.5" style={{ background: c.color }} />
                            {c.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-1 min-h-0 items-stretch gap-6 overflow-x-auto pb-4 no-scrollbar">
                <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex flex-1 min-h-0 gap-4">
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
                                    createTask({ title: 'Nouvelle tache', status, priority: 'MEDIUM' });
                                }}
                            />
                        ))}
                    </div>

                    <DragOverlay>
                        {activeDragTask && (
                            <div className="bg-white rounded-[16px] p-4 border border-blue-500 shadow-xl opacity-90 scale-105">
                                <div className="text-[14px] font-bold text-[#1A1A1A] mb-3">{activeDragTask.title}</div>
                                <div className="flex gap-2">
                                    <div className="bg-[#FAF9F6] w-12 h-4 rounded-lg" />
                                </div>
                            </div>
                        )}
                    </DragOverlay>
                </DndContext>

                <div className="w-[300px] shrink-0 hidden lg:block">
                    <PomodoroWidget
                        taskId={pomodoroTask?.id ?? null}
                        taskTitle={pomodoroTask?.title ?? null}
                    />
                </div>
            </div>

            {showModal && selectedTask && (
                <TaskModal
                    task={selectedTask}
                    events={editableEvents}
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
