import { differenceInDays, format, isToday, isTomorrow } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Task, TaskStatus } from '../../types';
import { matchCourses, type CourseRef } from '../../utils/courseMeta';

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
  { key: 'PENDING', label: 'À faire', icon: 'radio_button_unchecked', dot: 'var(--color-status-todo)', border: 'border-status-todo/40', bg: 'bg-status-todo/[0.04]' },
  { key: 'IN_PROGRESS', label: 'En cours', icon: 'play_circle', dot: 'var(--color-status-progress)', border: 'border-status-progress/40', bg: 'bg-status-progress/[0.04]' },
  { key: 'COMPLETED', label: 'Terminées', icon: 'check_circle', dot: 'var(--color-status-done)', border: 'border-status-done/40', bg: 'bg-status-done/[0.04]' },
  { key: 'CANCELED', label: 'Annulées', icon: 'cancel', dot: 'var(--color-outline)', border: 'border-outline-variant', bg: 'bg-surface-container-low' },
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

export interface SmartInputResult {
  type: 'TASK' | 'EVENT';
  title: string;
  dueDate: string | null;
  endDate: string | null;
  priority: Task['priority'];
  recurrence: string | null;
  matchedCourses: CourseRef[];
}

const EVENT_KEYWORDS = [
  'cours', 'examen', 'interro', 'tp', 'td', 'reunion', 'rdv', 'rendez-vous',
  'meet', 'planning', 'agenda', 'soiree', 'dejeuner', 'midi', 'sport',
];

const DAY_NAME_TO_INDEX: Record<string, number> = {
  dimanche: 0,
  lundi: 1,
  mardi: 2,
  mercredi: 3,
  jeudi: 4,
  vendredi: 5,
  samedi: 6,
};

const normalizeForMatch = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const toIsoWithTime = (baseDate: Date, hours: number, minutes: number) => {
  const date = new Date(baseDate);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
};

const shiftToNextWeekday = (baseDate: Date, targetDay: number) => {
  const current = baseDate.getDay();
  const diff = (targetDay - current + 7) % 7;
  return diff === 0 ? 7 : diff;
};

const parseBaseDate = (normalizedText: string) => {
  const base = new Date();
  base.setSeconds(0, 0);

  if (/\bapres[\s-]?demain\b/i.test(normalizedText)) {
    base.setDate(base.getDate() + 2);
  } else if (/\bdemain\b/i.test(normalizedText)) {
    base.setDate(base.getDate() + 1);
  }

  const inDays = normalizedText.match(/\bdans\s+(\d+)\s*j(?:our)?s?\b/i);
  if (inDays) {
    base.setDate(base.getDate() + parseInt(inDays[1], 10));
  }

  const inWeeks = normalizedText.match(/\bdans\s+(\d+)\s*semaines?\b/i);
  if (inWeeks) {
    base.setDate(base.getDate() + parseInt(inWeeks[1], 10) * 7);
  }

  const weekdayMatch = normalizedText.match(/\b(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\b/i);
  if (weekdayMatch) {
    const target = DAY_NAME_TO_INDEX[weekdayMatch[1]];
    base.setDate(base.getDate() + shiftToNextWeekday(base, target));
  }

  return base;
};

const parseTimeRange = (normalizedText: string, baseDate: Date) => {
  const rangeMatch = normalizedText.match(/\bde\s*(\d{1,2})(?:h|:)?(\d{2})?\s*(?:a|-|au)\s*(\d{1,2})(?:h|:)?(\d{2})?\b/i);
  if (!rangeMatch) return null;

  const startH = parseInt(rangeMatch[1], 10);
  const startM = parseInt(rangeMatch[2] ?? '0', 10);
  const endH = parseInt(rangeMatch[3], 10);
  const endM = parseInt(rangeMatch[4] ?? '0', 10);

  if (startH > 23 || endH > 23 || startM > 59 || endM > 59) return null;

  return {
    dueDate: toIsoWithTime(baseDate, startH, startM),
    endDate: toIsoWithTime(baseDate, endH, endM),
  };
};

const parseSingleTime = (normalizedText: string, baseDate: Date) => {
  const singleTimeMatch = normalizedText.match(/\b(?:a|@)\s*(\d{1,2})(?:h|:)?(\d{2})?\b/i);
  if (!singleTimeMatch) return null;

  const hours = parseInt(singleTimeMatch[1], 10);
  const minutes = parseInt(singleTimeMatch[2] ?? '0', 10);
  if (hours > 23 || minutes > 59) return null;

  return toIsoWithTime(baseDate, hours, minutes);
};

const detectPriority = (normalizedText: string): Task['priority'] => {
  if (/\b(urgent|critique|asap)\b/i.test(normalizedText)) return 'CRITICAL';
  if (/\b(important|prioritaire)\b/i.test(normalizedText)) return 'HIGH';
  if (/\b(faible|low)\b/i.test(normalizedText)) return 'LOW';
  return 'MEDIUM';
};

const cleanSmartTitle = (rawText: string) => {
  const cleanupPatterns = [
    /\b(demain|apres[\s-]?demain)\b/gi,
    /\bdans\s+\d+\s*j(?:our)?s?\b/gi,
    /\bdans\s+\d+\s*semaines?\b/gi,
    /\b(du\s+\w+\s+au\s+\w+)\b/gi,
    /\bde\s*\d{1,2}(?:h|:)?\d{0,2}\s*(?:a|-|au)\s*\d{1,2}(?:h|:)?\d{0,2}\b/gi,
    /\b(?:a|@)\s*\d{1,2}(?:h|:)?\d{0,2}\b/gi,
    /\b(urgent|critique|important|prioritaire|faible)\b/gi,
    /\b(cours|examen|interro|tp|td|reunion|rdv|rendez[-\s]?vous|meet|planning|agenda)\b/gi,
  ];

  const cleaned = cleanupPatterns
    .reduce((acc, pattern) => acc.replace(pattern, ' '), rawText)
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned || rawText.trim();
};

export function parseSmartInput(text: string, courses: CourseRef[] = []): SmartInputResult | null {
  if (!text.trim()) return null;

  const normalizedText = normalizeForMatch(text);
  const baseDate = parseBaseDate(normalizedText);
  const range = parseTimeRange(normalizedText, baseDate);
  const dueDate = range?.dueDate ?? parseSingleTime(normalizedText, baseDate);
  const endDate = range?.endDate ?? null;

  const recurrenceMatch = normalizedText.match(/\bdu\s+(\w+)\s+au\s+(\w+)\b/i);
  const recurrence = recurrenceMatch ? `Repetition: ${recurrenceMatch[1]} au ${recurrenceMatch[2]}` : null;

  const hasEventKeyword = EVENT_KEYWORDS.some((keyword) => normalizedText.includes(keyword));
  const type: SmartInputResult['type'] = hasEventKeyword || Boolean(endDate) || Boolean(recurrence)
    ? 'EVENT'
    : 'TASK';

  return {
    type,
    title: cleanSmartTitle(text),
    dueDate: dueDate ?? null,
    endDate,
    priority: detectPriority(normalizedText),
    recurrence,
    matchedCourses: matchCourses(text, courses),
  };
}