import type { Course, Event } from '../types';

export type EventCourse = Pick<Course, 'id' | 'name' | 'color'>;

export const eventTypeBadge: Record<string, string> = {
  CLASS: 'bg-primary/10 text-primary',
  EXAM: 'bg-error/10 text-error',
  EXAMEN: 'bg-error/10 text-error',
  INTERRO: 'bg-tertiary/10 text-tertiary',
  TP: 'bg-tertiary/10 text-tertiary',
  STUDY: 'bg-tertiary/10 text-tertiary',
  QUIZ: 'bg-tertiary/10 text-tertiary',
  ASSIGNMENT: 'bg-primary/10 text-primary',
  MEETING: 'bg-surface-container-highest text-on-surface-variant',
  PERSONAL: 'bg-surface-container-highest text-on-surface-variant',
  AUTRE: 'bg-surface-container-highest text-on-surface-variant',
};

export const eventTypeLabel: Record<string, string> = {
  CLASS: 'Cours',
  EXAM: 'Examen',
  EXAMEN: 'Examen',
  INTERRO: 'Interro',
  TP: 'TP',
  STUDY: 'Étude',
  QUIZ: 'Quiz',
  ASSIGNMENT: 'Devoir',
  MEETING: 'Réunion',
  PERSONAL: 'Personnel',
  AUTRE: 'Autre',
};

export type ExamEventType = 'EXAM' | 'EXAMEN' | 'INTERRO' | 'QUIZ';

export const examEventTypes: Event['type'][] = ['EXAM', 'EXAMEN', 'INTERRO', 'QUIZ'];