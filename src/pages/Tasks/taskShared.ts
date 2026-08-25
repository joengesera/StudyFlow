import { differenceInDays, format, isToday, isTomorrow } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { TaskStatus } from '../../types';

export type Column = TaskStatus;

export interface TaskColumnDef {
  key: Column;
  label: string;
  icon: string;
  dot: string;
  border: string;
  bg: string;
}

export const columns: TaskColumnDef[] = [
  { key: 'PENDING', label: 'à faire', icon: 'radio_button_unchecked', dot: 'var(--color-status-todo)', border: 'border-status-todo/40', bg: 'bg-status-todo/[0.04]' },
  { key: 'IN_PROGRESS', label: 'En cours', icon: 'play_circle', dot: 'var(--color-status-progress)', border: 'border-status-progress/40', bg: 'bg-status-progress/[0.04]' },
  { key: 'COMPLETED', label: 'Terminées', icon: 'check_circle', dot: 'var(--color-status-done)', border: 'border-status-done/40', bg: 'bg-status-done/[0.04]' },
  { key: 'CANCELED', label: 'AnnulÃ©es', icon: 'cancel', dot: 'var(--color-outline)', border: 'border-outline-variant', bg: 'bg-surface-container-low' },
];

export const priorityColor: Record<string, string> = {
  CRITICAL: 'var(--color-error)',
  HIGH: 'var(--color-error)',
  MEDIUM: 'var(--color-tertiary)',
  LOW: 'var(--color-primary)',
};

export function formatDueDate(dueDateStr: string | null) {
  if (!dueDateStr) return null;
  const date = new Date(dueDateStr);
  if (isToday(date)) return "aujourd'hui";
  if (isTomorrow(date)) return 'demain';
  const diff = differenceInDays(date, new Date());
  if (diff > 0 && diff < 15) return `dans ${diff}j`;
  return format(date, 'd MMM', { locale: fr });
}

export function getDueDateColor(dueDateStr: string | null) {
  if (!dueDateStr) return 'text-on-surface-variant';
  const diff = differenceInDays(new Date(dueDateStr), new Date());
  if (diff < 0) return 'text-error';
  if (diff <= 2) return 'text-error';
  return 'text-on-surface-variant';
}

