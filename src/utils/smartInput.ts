import { matchCourses, type CourseRef } from './courseMeta';
import type { Task } from '../types';

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

// Verbes d'intention : en début de phrase ils signent une TÂCHE à faire,
// même si la phrase contient un mot-clé événement (« réviser examen »).
const INTENTION_VERBS = [
  'reviser', 'finir', 'terminer', 'preparer', 'apprendre', 'lire', 'ecrire',
  'rendre', 'envoyer', 'acheter', 'nettoyer', 'appeler', 'commencer',
  'continuer', 'faire', 'travailler',
];

// Exceptions : ces contextes physiques restent des blocages d'agenda.
const PHYSICAL_ACTIVITY = /\b(sport|salle|gym|jogging|piscine)\b/;

const DAY_NAME_TO_INDEX: Record<string, number> = {
  dimanche: 0,
  lundi: 1,
  mardi: 2,
  mercredi: 3,
  jeudi: 4,
  vendredi: 5,
  samedi: 6,
};

const PART_OF_DAY_DEFAULTS: Record<string, { h: number; m: number }> = {
  matin: { h: 9, m: 0 },
  'apres-midi': { h: 14, m: 0 },
  soir: { h: 20, m: 0 },
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

interface BaseDateInfo {
  base: Date;
  /** Heure par défaut si un moment de journée est cité sans heure précise. */
  defaultTime?: { h: number; m: number };
}

const parseBaseDate = (normalizedText: string): BaseDateInfo => {
  const today = new Date();
  const startOfToday = new Date(today);
  startOfToday.setHours(0, 0, 0, 0);

  // Date numérique : « le 12/05 », « 25/12/26 » — passée sans année → année suivante.
  const numericMatch = normalizedText.match(/\b(?:le\s+)?(\d{1,2})[/](\d{1,2})(?:[/](\d{2,4}))?\b/);
  if (numericMatch) {
    const day = parseInt(numericMatch[1], 10);
    const month = parseInt(numericMatch[2], 10);
    if (day >= 1 && day <= 31 && month >= 1 && month <= 12) {
      let year = today.getFullYear();
      if (numericMatch[3]) {
        const rawYear = parseInt(numericMatch[3], 10);
        year = rawYear < 100 ? 2000 + rawYear : rawYear;
      }
      const parsed = new Date(year, month - 1, day, 0, 0, 0, 0);
      if (!numericMatch[3] && parsed < startOfToday) {
        parsed.setFullYear(parsed.getFullYear() + 1);
      }
      return { base: parsed, defaultTime: detectPartOfDay(normalizedText) };
    }
  }

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

  const weekdayMatch = normalizedText.match(/\b(prochain\s+)?(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\b/i);
  if (weekdayMatch) {
    const target = DAY_NAME_TO_INDEX[weekdayMatch[2]];
    base.setDate(base.getDate() + shiftToNextWeekday(base, target));
  }

  return { base, defaultTime: detectPartOfDay(normalizedText) };
};

// Moment de journée sans heure explicite : « demain matin », « ce soir »…
const detectPartOfDay = (normalizedText: string): BaseDateInfo['defaultTime'] => {
  const partOfDay = normalizedText.match(/\b(matin|apres[\s-]?midi|soir)\b/i);
  if (!partOfDay) return undefined;
  const key = partOfDay[1].replace(/[\s-]+/g, '-');
  return PART_OF_DAY_DEFAULTS[key] ?? undefined;
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

const detectLeadingIntentionVerb = (normalizedText: string) =>
  INTENTION_VERBS.some((verb) => new RegExp(`^\\s*${verb}\\b`).test(normalizedText));

const cleanSmartTitle = (rawText: string) => {
  const cleanupPatterns = [
    /\bce\s*soir\b/gi,
    /\b(demain|apres[\s-]?demain)(?:\s+(?:matin|apres[\s-]?midi|soir))?\b/gi,
    /\b\d{1,2}[/]\d{1,2}(?:[/]\d{2,4})?\b/gi,
    /\bprochain(?:e)?\b/gi,
    /\b(?:le\s+)?(?:matin|apres[\s-]?midi|soir)\b/gi,
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
  const { base, defaultTime } = parseBaseDate(normalizedText);

  const range = parseTimeRange(normalizedText, base);
  const explicitTime =
    range?.dueDate ?? parseSingleTime(normalizedText, base);
  const dueDate = explicitTime ?? (defaultTime ? toIsoWithTime(base, defaultTime.h, defaultTime.m) : null);
  const endDate = range?.endDate ?? null;

  const recurrenceMatch = normalizedText.match(/\bdu\s+(\w+)\s+au\s+(\w+)\b/i);
  const recurrence = recurrenceMatch ? `Repetition: ${recurrenceMatch[1]} au ${recurrenceMatch[2]}` : null;

  // Un verbe d'intention en tête de phrase bascule en tâche, sauf contexte
  // d'activité physique (« faire du sport » reste un blocage d'agenda).
  const leadingVerb = detectLeadingIntentionVerb(normalizedText);
  const hasEventKeyword = EVENT_KEYWORDS.some((keyword) => normalizedText.includes(keyword));
  const isPhysicalActivity = leadingVerb && PHYSICAL_ACTIVITY.test(normalizedText);
  const type: SmartInputResult['type'] =
    leadingVerb && !isPhysicalActivity
      ? 'TASK'
      : hasEventKeyword || Boolean(endDate) || Boolean(recurrence)
        ? 'EVENT'
        : 'TASK';

  return {
    type,
    title: cleanSmartTitle(text),
    dueDate,
    endDate,
    priority: detectPriority(normalizedText),
    recurrence,
    matchedCourses: matchCourses(text, courses),
  };
}
