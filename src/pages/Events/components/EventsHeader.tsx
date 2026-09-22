import { Plus } from 'lucide-react';
import type { EventsStats } from '../eventsShared';

interface EventsHeaderProps {
  stats: EventsStats;
  onCreate: () => void;
}

export const EventsHeader = ({ stats, onCreate }: EventsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-display-lg font-display-lg text-on-surface">Événements</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant mt-1">
          {stats.total} événement{stats.total !== 1 ? 's' : ''} • {stats.upcoming7} à venir
        </p>
      </div>
      <button onClick={onCreate} className="btn btn-primary">
        <Plus className="text-[18px]" /> Nouvel événement
      </button>
    </div>
  );
};