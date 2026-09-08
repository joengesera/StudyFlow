// Couleur du risque selon le score (0–100) :
// < 30 → vert (succès), 30–50 → orange (avertissement), > 50 → rouge (erreur).
type RiskTier = 'green' | 'orange' | 'red';

export const riskScoreTier = (score: number): RiskTier => {
  if (score < 30) return 'green';
  if (score <= 50) return 'orange';
  return 'red';
};

export const riskScoreStyles = (score: number) => {
  const tier = riskScoreTier(score);
  if (tier === 'green') return { bg: 'bg-success/10', text: 'text-success', dot: 'bg-success' };
  if (tier === 'orange') return { bg: 'bg-warning/10', text: 'text-warning', dot: 'bg-warning' };
  return { bg: 'bg-error/10', text: 'text-error', dot: 'bg-error' };
};

export const riskScoreColor = (score: number): string => {
  const tier = riskScoreTier(score);
  if (tier === 'green') return 'var(--color-success)';
  if (tier === 'orange') return 'var(--color-warning)';
  return 'var(--color-error)';
};

export const riskLevelLabel = (level: string): string => {
  if (level === 'LOW') return 'Faible';
  if (level === 'MEDIUM') return 'Moyen';
  if (level === 'CRITICAL') return 'Critique';
  if (level === 'HIGH') return 'Élevé';
  return level;
};