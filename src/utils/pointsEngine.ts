export type PointItem = {
  score: number;
  maxScore: number;
  percentage?: number | null;
  workTypeLabel?: string | null;
  workType?: { type?: string | null; weightPercent?: number | null } | null;
};

// Miroir frontend de PointsEngineService (backend) : moyenne calculée à
// partir de la pondération par type (percentage / workType.weightPercent) et
// non du coeff par note. Garde le résultat affiché identique à l'API.
export const normalizeToTwenty = (score: number, maxScore: number): number => {
  if (!Number.isFinite(score) || !Number.isFinite(maxScore) || maxScore <= 0) return 0;
  return (score / maxScore) * 20;
};

export const getTypeLabel = (item: Pick<PointItem, 'workTypeLabel' | 'workType'>): string =>
  String(item.workTypeLabel || item.workType?.type || 'AUTRE').trim().toUpperCase();

const getDefaultTypePools = (
  autoItems: PointItem[],
  remainingPercent: number,
): Map<string, number> => {
  const configuredByType = new Map<string, number>();
  for (const item of autoItems) {
    const type = getTypeLabel(item);
    const configuredWeight = Number(item.workType?.weightPercent);
    if (Number.isFinite(configuredWeight) && configuredWeight > 0) {
      configuredByType.set(type, configuredWeight);
    }
  }

  if (configuredByType.size > 0) {
    const configuredTotal = Array.from(configuredByType.values()).reduce((sum, w) => sum + w, 0);
    if (configuredTotal > 0) {
      const pools = new Map<string, number>();
      for (const [type, weight] of configuredByType.entries()) {
        pools.set(type, (remainingPercent * weight) / configuredTotal);
      }
      return pools;
    }
  }

  const types = Array.from(new Set(autoItems.map((i) => getTypeLabel(i))));
  const hasExam = types.includes('EXAMEN');
  const otherTypes = types.filter((type) => type !== 'EXAMEN');

  const pools = new Map<string, number>();
  const examPool = hasExam ? remainingPercent * 0.5 : 0;
  if (hasExam) pools.set('EXAMEN', examPool);

  const remainingPool = remainingPercent - examPool;
  if (otherTypes.length > 0) {
    const each = remainingPool / otherTypes.length;
    otherTypes.forEach((type) => pools.set(type, each));
  }

  return pools;
};

export const pointsAverage = (items: PointItem[]): number => {
  if (items.length === 0) return 0;

  const manualItems = items.filter((i) => Number.isFinite(i.percentage));
  const autoItems = items.filter((i) => !Number.isFinite(i.percentage));

  const manualPercent = manualItems.reduce((sum, i) => sum + Number(i.percentage || 0), 0);
  const remainingPercent = Math.max(0, 100 - manualPercent);
  const typePools = getDefaultTypePools(autoItems, remainingPercent);

  const autoByType = new Map<string, PointItem[]>();
  autoItems.forEach((i) => {
    const type = getTypeLabel(i);
    if (!autoByType.has(type)) autoByType.set(type, []);
    autoByType.get(type)!.push(i);
  });

  let weightedSum = 0;
  let totalPercent = 0;

  for (const item of manualItems) {
    const p = Number(item.percentage || 0);
    weightedSum += normalizeToTwenty(item.score, item.maxScore) * p;
    totalPercent += p;
  }

  for (const [type, list] of autoByType.entries()) {
    const pool = typePools.get(type) || 0;
    if (pool <= 0 || list.length === 0) continue;
    const each = pool / list.length;
    for (const item of list) {
      weightedSum += normalizeToTwenty(item.score, item.maxScore) * each;
      totalPercent += each;
    }
  }

  if (totalPercent <= 0) {
    return items.reduce((acc, i) => acc + normalizeToTwenty(i.score, i.maxScore), 0) / items.length;
  }

  return weightedSum / totalPercent;
};