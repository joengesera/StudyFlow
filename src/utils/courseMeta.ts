const STOP_WORDS = new Set([
  'de', 'du', 'des', 'la', 'le', 'les', 'et', 'a', 'au', 'aux',
  'en', 'pour', 'par', 'sur', 'dans', 'avec', 'l', 'd',
]);

export const normalizeCourseText = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const abbreviate = (word: string, max: number) =>
  word.replace(/[^a-z0-9]/gi, '').slice(0, max).toUpperCase();

export function generateCourseCode(name: string): string {
  const words = name
    .split(/[\s\-_/]+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0 && !STOP_WORDS.has(normalizeCourseText(w)));

  if (words.length === 0) return '';
  if (words.length === 1) return abbreviate(words[0], 4);
  return `${abbreviate(words[0], 4)}-${abbreviate(words[1], 3)}`;
}

function hexToRgb(hex: string): [number, number, number] | null {
  const match = /^#?([0-9a-f]{6})$/i.exec((hex ?? '').trim());
  if (!match) return null;
  const int = parseInt(match[1], 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

function rgbToHue(r: number, g: number, b: number): number {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  if (max === min) return 0;
  const d = max - min;
  let h: number;
  if (max === rn) h = ((gn - bn) / d) % 6;
  else if (max === gn) h = (bn - rn) / d + 2;
  else h = (rn - gn) / d + 4;
  return (((h * 60) % 360) + 360) % 360;
}

export function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const MIN_HUE_DISTANCE = 40;
const MAX_ATTEMPTS = 24;

export function generateRandomCourseColor(usedColors: string[] = []): string {
  const usedHues = usedColors.reduce<number[]>((acc, color) => {
    const rgb = hexToRgb(color);
    if (rgb) acc.push(rgbToHue(rgb[0], rgb[1], rgb[2]));
    return acc;
  }, []);

  let hue = Math.random() * 360;
  let bestDistance = -1;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const candidate = Math.random() * 360;
    const distance = usedHues.length
      ? Math.min(
          ...usedHues.map((uh) => {
            const d = Math.abs(candidate - uh) % 360;
            return Math.min(d, 360 - d);
          })
        )
      : Number.POSITIVE_INFINITY;
    if (distance > bestDistance) {
      bestDistance = distance;
      hue = candidate;
    }
    if (distance >= MIN_HUE_DISTANCE) break;
  }

  const saturation = 64 + Math.random() * 16;
  const lightness = 44 + Math.random() * 10;

  return hslToHex(hue, saturation, lightness);
}

export interface CourseRef {
  id: string;
  name: string;
  code: string;
  color?: string;
}

/**
 * Matche le texte saisi contre les noms et codes des cours.
 * Retourne tous les cours dont le nom ou le code apparaît dans le texte.
 */
export function matchCourses(text: string, courses: CourseRef[]): CourseRef[] {
  const normalizedText = normalizeCourseText(text);
  if (!normalizedText.trim() || courses.length === 0) return [];

  return courses.filter((course) => {
    const normalizedName = normalizeCourseText(course.name);
    const normalizedCode = normalizeCourseText(course.code);

    if (normalizedCode && normalizedText.includes(normalizedCode)) return true;
    if (!normalizedName) return false;

    return normalizedName
      .split(/\s+/)
      .filter((w) => !STOP_WORDS.has(w))
      .every((w) => normalizedText.includes(w));
  });
}
