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
  selectedTaskId: string | null;
  onAddTask: (status: Column) => void;
}

export const KanbanColumn = ({
  column,
  tasks,
  courses,
  onSelect,
  selectedTaskId,
  onAddTask,
}: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({ id: column.key });

  return (
    <div ref={setNodeRef} className={`flex h-full min-h-0 flex-1 flex-col min-w-[300px] rounded-xl border border-outline-variant p-2.5 pt-4 ${column.bg}`}>
      <div className="flex items-center gap-2 mb-4 px-3">
        <span className="material-symbols-outlined text-[20px]" style={{ color: column.dot }}>{column.icon}</span>
        <span className="text-label-sm font-label-sm text-on-surface">{column.label}</span>
        <span className="bg-surface-container-lowest border border-outline-variant text-label-sm font-label-sm text-on-surface px-2 py-0.5 rounded-full ml-1">
          {tasks.length}
        </span>
      </div>

      <div className="flex flex-col flex-1 min-h-[150px] overflow-y-auto px-1">
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
          className="w-full py-3 rounded-lg border border-outline-variant text-label-sm font-label-sm text-on-surface-variant mt-2 mb-2 bg-transparent hover:bg-surface-container-low transition-colors"
        >
          <span className="material-symbols-outlined text-[18px] me-1">add</span>
          Ajouter
        </button>
      </div>
    </div>
  );
};