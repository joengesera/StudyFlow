import { format, startOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AgendaViewMode } from '../agendaShared';

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
  const title =
    viewMode === 'month'
      ? format(currentDate, 'MMMM yyyy', { locale: fr })
      : `Sem. du ${format(startOfWeek(currentDate, { weekStartsOn: 1 }), 'd MMM', { locale: fr })}`;

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="flex items-center justify-between md:justify-start gap-2 md:gap-4">
        <button
          onClick={onPrevious}
          className="p-2 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors"
          aria-label="Période précédente"
        >
          <span className="material-symbols-outlined text-[20px]">chevron_left</span>
        </button>
        <span className="text-headline-md font-headline-md text-on-surface capitalize min-w-[160px] text-center">
          {title}
        </span>
        <button
          onClick={onNext}
          className="p-2 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors"
          aria-label="Période suivante"
        >
          <span className="material-symbols-outlined text-[20px]">chevron_right</span>
        </button>

        <button
          onClick={onToday}
          className="px-4 h-10 ml-2 rounded-lg border border-outline-variant text-on-surface font-medium text-body-md hover:bg-surface-container-low transition-colors"
        >
          Aujourd'hui
        </button>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="flex rounded-lg border border-outline-variant overflow-hidden bg-surface-container p-1 gap-1" role="tablist">
          {viewOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onViewModeChange(option.value)}
              role="tab"
              aria-selected={viewMode === option.value}
              className={`px-4 py-2 rounded-md text-label-sm font-label-sm transition-colors ${viewMode === option.value ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'bg-transparent text-on-surface-variant hover:text-on-surface'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button
          onClick={onCreateEvent}
          className="btn btn-primary whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span className="hidden md:inline">Nouvel événement</span>
        </button>
      </div>
    </header>
  );
}