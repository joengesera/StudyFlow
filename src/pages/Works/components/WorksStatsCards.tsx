import { CheckCircle, Star, Clock } from 'lucide-react';
import type { WorksStats } from '../worksShared';

interface WorksStatsCardsProps {
  stats: WorksStats;
}

export const WorksStatsCards = ({ stats }: WorksStatsCardsProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter mb-8">
      <div className="card card-padded flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 mb-2">
          <Star className="text-primary" />
          <span className="text-label-caps font-label-caps text-on-surface-variant">Moyenne</span>
        </div>
        <div className="text-display-lg font-display-lg text-on-surface">
          {stats.avg} <span className="text-body-md text-on-surface-variant">/ 20</span>
        </div>
      </div>
      <div className="card card-padded flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="text-error" />
          <span className="text-label-caps font-label-caps text-on-surface-variant">À rendre</span>
        </div>
        <div className="text-display-lg font-display-lg text-error">{stats.planned}</div>
      </div>
      <div className="card card-padded flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="text-primary" />
          <span className="text-label-caps font-label-caps text-on-surface-variant">Notés</span>
        </div>
        <div className="text-display-lg font-display-lg text-primary">{stats.graded}</div>
      </div>
      <div className="card card-padded flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="text-tertiary" />
          <span className="text-label-caps font-label-caps text-on-surface-variant">Soumis</span>
        </div>
        <div className="text-display-lg font-display-lg text-tertiary">{stats.submitted}</div>
      </div>
    </div>
  );
};