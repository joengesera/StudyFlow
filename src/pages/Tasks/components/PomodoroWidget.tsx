import { usePomodoro } from '../../../hooks/usePomodoro';

interface PomodoroWidgetProps {
  taskId: string | null;
  taskTitle: string | null;
}

export const PomodoroWidget = ({ taskId, taskTitle }: PomodoroWidgetProps) => {
  const {
    phase,
    formatted,
    progress,
    isRunning,
    sessions,
    start,
    pause,
    reset,
    skip,
  } = usePomodoro(taskId);

  return (
    <div className="card card-padded flex flex-col items-center gap-4 sticky top-6">
      <div className="text-center w-full">
        <div className="text-label-caps font-label-caps text-on-surface-variant mb-2">
          {phase === 'work' ? 'Travail' : 'Pause'}
        </div>
        {taskTitle ? (
          <div className="text-body-md font-body-md font-medium text-on-surface truncate w-full">
            {taskTitle}
          </div>
        ) : (
          <div className="text-body-md font-body-md text-on-surface-variant">
            Sélectionne une tâche
          </div>
        )}
      </div>

      <div className="relative w-32 h-32 my-2">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="5" className="text-outline-variant" />
          <circle
            cx="50" cy="50" r="44"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeDasharray={`${2 * Math.PI * 44}`}
            strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`}
            strokeLinecap="round"
            className={phase === 'work' ? 'text-primary' : 'var(--color-tertiary)'}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-display-lg font-display-lg text-on-surface tabular-nums tracking-tight">{formatted}</span>
        </div>
      </div>

      <div className="text-label-sm font-label-sm text-on-surface-variant">
        {sessions} session{sessions !== 1 ? 's' : ''} complétée{sessions !== 1 ? 's' : ''}
      </div>

      <div className="flex gap-2 w-full mt-2">
        <button onClick={reset} className="w-10 h-10 p-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors" aria-label="Réinitialiser">
          <span className="material-symbols-outlined text-[22px]">refresh</span>
        </button>
        <button
          onClick={isRunning ? pause : start}
          disabled={!taskId}
          className="flex-1 h-10 rounded-lg border border-outline-variant text-on-surface font-medium hover:bg-surface-container-low disabled:opacity-50 transition-colors"
        >
          {isRunning ? 'Pause' : 'Démarrer'}
        </button>
        <button onClick={skip} className="w-10 h-10 p-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors" aria-label="Passer">
          <span className="material-symbols-outlined text-[22px]">skip_next</span>
        </button>
      </div>
    </div>
  );
};