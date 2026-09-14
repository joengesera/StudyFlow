import { ChevronRight, Plus, ChevronLeft } from 'lucide-react';
import { addDays, format, startOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { weekPlannerDays, type AgendaViewMode } from '../agendaShared';

interface AgendaHeaderProps {
  currentDate: Date;
  viewMode: AgendaViewMode;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewModeChange: (viewMode: AgendaViewMode) => void;
  onCreateEvent: () => void;
}

const viewOptions: Array<{ label: string; value: AgendaViewMode }> = [
  { label: 'Mois', value: 'month' },
  { label: 'Semaine', value: 'week' },
  { label: 'Jour', value: 'day' },
];

export function AgendaHeader({
  currentDate,
  viewMode,
  onPrevious,
  onNext,
  onToday,
  onViewModeChange,
  onCreateEvent,
}: AgendaHeaderProps) {
  const title = format(currentDate, 'MMMM yyyy', { locale: fr });

  const weekNumber = format(currentDate, 'w', { locale: fr });
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = addDays(weekStart, weekPlannerDays - 1);

  const subtitle =
    viewMode === 'month'
      ? `Semaine ${weekNumber}`
      : `Semaine ${weekNumber} · ${format(weekStart, 'd', { locale: fr })} – ${format(weekEnd, 'd MMM', { locale: fr })}`;

  return (
    <header className="flex flex-col md:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <h2 className="text-display-lg-mobile md:text-display-lg font-display-lg text-on-background tracking-tight capitalize">
          {title}
        </h2>
        <p className="text-body-md font-body-md text-on-surface-variant mt-0.5">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
        <div className="flex items-center rounded-lg border border-outline-variant overflow-hidden bg-surface-container-low p-1 gap-1">
          <button
            onClick={onPrevious}
            className="px-2 py-1.5 rounded-md text-on-surface-variant hover:text-on-background hover:bg-surface-container-highest transition-colors"
            aria-label="Période précédente"
          >
            <ChevronLeft className="text-[18px]" />
          </button>
          <button
            onClick={onToday}
            className="px-3 py-1.5 text-label-sm font-label-sm text-on-surface-variant hover:text-on-background hover:bg-surface-container-highest rounded-md transition-colors"
          >
            Aujourd'hui
          </button>
          <button
            onClick={onNext}
            className="px-2 py-1.5 rounded-md text-on-surface-variant hover:text-on-background hover:bg-surface-container-highest transition-colors"
            aria-label="Période suivante"
          >
            <ChevronRight className="text-[18px]" />
          </button>
        </div>

        <div className="flex items-center bg-surface-container-low rounded-lg p-1 border border-outline-variant" role="tablist">
          {viewOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onViewModeChange(option.value)}
              role="tab"
              aria-selected={viewMode === option.value}
              className={`px-4 py-1.5 text-label-sm font-label-sm rounded-md transition-colors ${
                viewMode === option.value
                  ? 'bg-surface-container-lowest border border-outline-variant text-on-background font-medium'
                  : 'text-on-surface-variant hover:text-on-background border border-transparent'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <button onClick={onCreateEvent} className="btn btn-primary whitespace-nowrap">
          <Plus className="text-[18px]" />
          <span className="hidden md:inline">Nouvel événement</span>
        </button>
      </div>
    </header>
  );
}
