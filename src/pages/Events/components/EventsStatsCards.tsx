import { CalendarDays, Clock, GraduationCap, Timer } from 'lucide-react';
import type { EventsStats } from '../eventsShared';

interface EventsStatsCardsProps {
  stats: EventsStats;
}

export const EventsStatsCards = ({ stats }: EventsStatsCardsProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter mb-8">
      <div className="card card-padded flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="text-primary" />
          <span className="text-label-caps font-label-caps text-on-surface-variant">À venir · 7 j</span>
        </div>
        <div className="text-display-lg font-display-lg text-on-surface">{stats.upcoming7}</div>
      </div>
      <div className="card card-padded flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 mb-2">
          <CalendarDays className="text-tertiary" />
          <span className="text-label-caps font-label-caps text-on-surface-variant">Ce mois</span>
        </div>
        <div className="text-display-lg font-display-lg text-tertiary">{stats.month}</div>
      </div>
      <div className="card card-padded flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap className="text-error" />
          <span className="text-label-caps font-label-caps text-on-surface-variant">Examens à venir</span>
        </div>
        <div className="text-display-lg font-display-lg text-error">{stats.exams}</div>
      </div>
      <div className="card card-padded flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 mb-2">
          <Timer className="text-primary" />
          <span className="text-label-caps font-label-caps text-on-surface-variant">Cours · cette semaine</span>
        </div>
        <div className="text-display-lg font-display-lg text-on-surface">{stats.weekClassHours}</div>
      </div>
    </div>
  );
};