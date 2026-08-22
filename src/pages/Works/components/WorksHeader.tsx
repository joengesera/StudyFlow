import type { WorksStats } from '../worksShared';

interface WorksHeaderProps {
  stats: WorksStats;
}

export const WorksHeader = ({ stats }: WorksHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-display-lg font-display-lg text-on-surface">Travaux</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant mt-2">
          {stats.total} travaux • {stats.planned} à rendre
        </p>
      </div>
    </div>
  );
};