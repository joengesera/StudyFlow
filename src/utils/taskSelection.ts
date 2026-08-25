import { isToday } from 'date-fns';
import type { Task } from '../types';

export const isActiveTask = (task: Task) =>
  !task.isDeleted && task.status !== 'COMPLETED' && task.status !== 'CANCELED';

const isUrgent = (task: Task) => task.priority === 'HIGH' || task.priority === 'CRITICAL';

// Même logique de tri que le dashboard : urgentes d'abord, puis échéance
// la plus proche, puis position kanban.
export const compareForFocus = (a: Task, b: Task) => {
  const aUrgent = isUrgent(a) ? 0 : 1;
  const bUrgent = isUrgent(b) ? 0 : 1;
  if (aUrgent !== bUrgent) return aUrgent - bUrgent;

  if (a.dueDate && b.dueDate) {
    const diff = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    if (diff !== 0) return diff;
  }
  if (a.dueDate && !b.dueDate) return -1;
  if (!a.dueDate && b.dueDate) return 1;

  return a.position - b.position;
};

// Prochaine tâche à enchaîner sur l'écran focus : échéance aujourd'hui,
// hors tâche courante. Aucune → null (écran vide volontaire).
export const selectNextTaskDueToday = (tasks: Task[], excludeId?: string | null): Task | null =>
  tasks
    .filter((t) => t.id !== excludeId && isActiveTask(t) && t.dueDate && isToday(new Date(t.dueDate)))
    .sort(compareForFocus)[0] ?? null;
