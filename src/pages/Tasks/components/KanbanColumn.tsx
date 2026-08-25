import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import type { Task } from '../../../types';
import type { Column, TaskColumnDef } from '../taskShared';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  column: TaskColumnDef;
  tasks: Task[];
  courses: Record<string, string>;
  onSelect: (task: Task) => void;
  onStartFocus: (task: Task) => void;
  onDelete: (id: string) => void;
  selectedTaskId: string | null;
  onAddTask: (status: Column) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

export const KanbanColumn = ({
  column,
  tasks,
  courses,
  onSelect,
  onStartFocus,
  onDelete,
  selectedTaskId,
  onAddTask,
  isCollapsed,
  onToggle,
}: KanbanColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: column.key });

  return (
    <section
      ref={setNodeRef}
      aria-label={`${column.label} — ${tasks.length} tâches`}
      style={isOver ? { boxShadow: `inset 0 0 0 2px ${column.dot}` } : undefined}
      className={`flex flex-col rounded-lg border ${column.border} ${column.bg} transition-shadow ${
        isCollapsed ? 'basis-full md:basis-auto' : 'flex-1 basis-full min-w-[270px]'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={!isCollapsed}
        className="flex w-full items-center gap-2 px-4 py-3 text-left cursor-pointer select-none"
      >
        <span className="material-symbols-outlined text-[20px]" style={{ color: column.dot }}>
          {column.icon}
        </span>
        <span className="text-label-sm font-label-sm font-medium text-on-surface">{column.label}</span>
        <span className="bg-surface-container-lowest border border-outline-variant text-label-sm font-label-sm text-on-surface px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
        <span
          className={`material-symbols-outlined text-[20px] text-on-surface-variant ms-auto transition-transform duration-200 ${
            isCollapsed ? '' : 'rotate-180'
          }`}
        >
          expand_more
        </span>
      </button>

      {!isCollapsed && (
        <div className="flex flex-col px-2 pb-2">
          <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                courseName={task.courseId ? courses[task.courseId] : undefined}
                onSelect={onSelect}
                onStartFocus={onStartFocus}
                onDelete={onDelete}
                isSelected={selectedTaskId === task.id}
              />
            ))}
          </SortableContext>

          {tasks.length === 0 && (
            <p className="text-label-sm font-label-sm text-on-surface-variant text-center py-4">
              Aucune tâche ici
            </p>
          )}

          <button
            onClick={() => onAddTask(column.key)}
            className="w-full py-3 rounded-lg border border-outline-variant text-label-sm font-label-sm text-on-surface-variant mt-2 bg-transparent hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] me-1">add</span>
            Ajouter
          </button>
        </div>
      )}
    </section>
  );
};
