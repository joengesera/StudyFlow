import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { SmartTaskInput } from './components/SmartTaskInput';
import { TaskModal } from './components/TaskModal';
import { columns, type Column } from './taskShared';

export default function TasksPage() {
  const navigate = useNavigate();
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
  const [collapsedColumns, setCollapsedColumns] = useState<Record<string, boolean>>({
    COMPLETED: true,
    CANCELED: true,
  });

  const toggleColumn = (key: Column) =>
    setCollapsedColumns((prev) => ({ ...prev, [key]: !prev[key] }));

  const COMPLETED_VISIBLE_DURATION_MS = 24 * 60 * 60 * 1000;

  const courseDict = courses.reduce((acc, c) => {
    acc[c.id] = c.name;
    return acc;
  }, {} as Record<string, string>);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  useEffect(() => {
    const interval = window.setInterval(() => { setNow(Date.now()); }, 60_000);
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

  // Entrée en mode focus : single-WIP strict (auto-revert des autres
  // tâches IN_PROGRESS) puis bascule IN_PROGRESS et navigation.
  const startFocus = (task: Task) => {
    if (task.status === 'COMPLETED' || task.status === 'CANCELED') return;
    tasks
      .filter((t) => t.id !== task.id && t.status === 'IN_PROGRESS' && !t.isDeleted)
      .forEach((t) => updateTask({ id: t.id, payload: { status: 'PENDING', startedAt: null } }));
    if (task.status !== 'IN_PROGRESS') {
      updateTask({ id: task.id, payload: { status: 'IN_PROGRESS', startedAt: new Date().toISOString() } });
    }
    navigate(`/focus/${task.id}`);
  };


  const handleDragStart = (event: DragStartEvent) => { setActiveId(String(event.active.id)); };
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
          payload: { status: targetColumn.key, completedAt: targetColumn.key === 'COMPLETED' ? new Date().toISOString() : null },
        });
      }
      return;
    }

    const overTask = tasks.find((t) => t.id === overId);
    const dragTask = tasks.find((t) => t.id === taskId);
    if (overTask && dragTask && overTask.status === dragTask.status) {
      updateTask({ id: taskId, payload: { status: overTask.status, position: overTask.position } });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-4 p-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card animate-pulse h-48 w-full md:w-[calc(50%-0.5rem)] xl:w-[calc(25%-0.75rem)]" />
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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-display-lg font-display-lg text-on-surface">Tâches</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant mt-1">
            {totalCount} tâches • {urgentCount} urgentes
          </p>
        </div>
        <button onClick={() => createTask({ title: 'Nouvelle tâche', status: 'PENDING', priority: 'MEDIUM' })} className="btn btn-primary">
          <span className="material-symbols-outlined text-[18px]">add</span> Nouvelle tâche
        </button>
      </div>

      <SmartTaskInput />

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtres">
        <button onClick={() => setActiveFilter('ALL')} className={`btn ${activeFilter === 'ALL' ? 'btn-primary' : 'btn-outlined'}`}>Toutes</button>
        <button onClick={() => setActiveFilter('URGENT')} className={`btn ${activeFilter === 'URGENT' ? 'btn-primary' : 'btn-outlined'}`}>Urgent</button>
        <button onClick={() => setActiveFilter('TODAY')} className={`btn ${activeFilter === 'TODAY' ? 'btn-primary' : 'btn-outlined'}`}>Aujourd'hui</button>
        {courses.slice(0, 5).map((c) => (
          <button key={c.id} onClick={() => setActiveFilter(`COURSE:${c.id}`)} className={`btn ${activeFilter === `COURSE:${c.id}` ? 'btn-primary' : 'btn-outlined'} flex items-center gap-2`}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
            {c.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="flex flex-wrap items-start gap-4 w-full lg:w-auto lg:flex-1 min-w-0">
            {columns.map((col) => (
              <KanbanColumn
                key={col.key}
                column={col}
                tasks={tasksByColumn(col.key)}
                courses={courseDict}
                onSelect={(task) => { setSelectedTask(task); setPomodoroTask(task); setShowModal(true); }}
                onStartFocus={startFocus}
                onDelete={(id) => deleteTask(id)}
                selectedTaskId={selectedTask?.id ?? pomodoroTask?.id ?? null}
                onAddTask={(status) => createTask({ title: 'Nouvelle tâche', status, priority: 'MEDIUM' })}
                isCollapsed={!!collapsedColumns[col.key]}
                onToggle={() => toggleColumn(col.key)}
              />
            ))}
          </div>

          <DragOverlay>
            {activeDragTask && (
              <div className="card card-padded shadow-xl opacity-90 scale-105">
                <div className="text-body-md font-body-md font-medium text-on-surface mb-3">{activeDragTask.title}</div>
                <div className="flex gap-2"><div className="bg-surface-container w-12 h-4 rounded-lg" /></div>
              </div>
            )}
          </DragOverlay>
        </DndContext>

        <div className="w-[320px] shrink-0 hidden lg:block">
          <PomodoroWidget taskId={pomodoroTask?.id ?? null} taskTitle={pomodoroTask?.title ?? null} />
        </div>
      </div>

      {showModal && selectedTask && (
        <TaskModal
          task={selectedTask}
          events={editableEvents}
          onClose={() => { setShowModal(false); setSelectedTask(null); }}
          onUpdate={(id, payload) => updateTask({ id, payload })}
          onDelete={(id) => deleteTask(id)}
        />
      )}
    </div>
  );
}