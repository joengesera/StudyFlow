import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../../../types';
import { formatDueDate, getDueDateColor } from '../taskShared';

interface TaskCardProps {
  task: Task;
  courseName?: string;
  onSelect: (task: Task) => void;
  isSelected: boolean;
}

const statusColors = {
  PENDING: 'var(--color-status-todo)',
  IN_PROGRESS: 'var(--color-status-progress)',
  COMPLETED: 'var(--color-status-done)',
  CANCELED: 'var(--color-outline)',
};

const priorityBadges = {
  LOW: { label: 'Faible', bg: 'var(--color-primary-container)', text: 'var(--color-on-primary-container)' },
  MEDIUM: { label: 'Moyen', bg: 'var(--color-tertiary-container)', text: 'var(--color-on-tertiary-container)' },
  HIGH: { label: 'Haute', bg: 'var(--color-error-container)', text: 'var(--color-on-error-container)' },
  CRITICAL: { label: 'Critique', bg: 'var(--color-error-container)', text: 'var(--color-on-error-container)' },
};

export const TaskCard = ({ task, courseName, onSelect, isSelected }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useSortable({ id: task.id });

  const isCompleted = task.status === 'COMPLETED';
  const statusDot = statusColors[task.status];
  const priorityBadge = priorityBadges[task.priority];

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onSelect(task)}
      className={`
        card card-padded mb-3 cursor-grab active:cursor-grabbing select-none transition-shadow hover:shadow-md
        ${isSelected ? 'ring-2 ring-primary ring-offset-2 border-transparent' : 'border-outline-variant'}
        ${isDragging ? 'rotate-1 shadow-xl z-50' : ''}
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {isCompleted ? (
            <div className="w-5 h-5 rounded-full bg-status-done flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-white text-[18px]">check</span>
            </div>
          ) : (
            <div className="w-3 h-3 rounded-full shrink-0" style={{ background: statusDot }} />
          )}
          <div className={`text-body-md font-body-md font-medium leading-tight ${isCompleted ? 'text-on-surface-variant line-through' : 'text-on-surface'}`}>
            {task.title}
          </div>
        </div>
        {task.timeSpentMinutes > 0 && (
          <div className="text-label-sm font-label-sm text-on-surface-variant shrink-0 whitespace-nowrap ml-2 mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            {task.timeSpentMinutes} min
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`px-2.5 py-1 rounded text-label-caps font-label-caps ${isCompleted ? 'bg-surface-container text-on-surface-variant' : 'bg-surface-container text-on-surface-variant'}`}>
            {courseName || 'Général'}
          </span>
          <span className={`px-2.5 py-1 rounded text-label-caps font-label-caps ${priorityBadge.bg} ${priorityBadge.text}`}>
            {priorityBadge.label}
          </span>
        </div>
        {task.dueDate && !isCompleted && (
          <div className={`text-label-sm font-label-sm ${getDueDateColor(task.dueDate)}`}>
            {formatDueDate(task.dueDate)}
          </div>
        )}
      </div>
    </div>
  );
};