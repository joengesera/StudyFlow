import { RefreshCw, SkipForward } from 'lucide-react';
import { usePomodoro } from '../../../hooks/usePomodoro';
import { TimerRing } from '../../../components/TimerRing';

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

      <div className="my-2">
        <TimerRing progress={progress} formatted={formatted} phase={phase} size={128} />
      </div>

      <div className="text-label-sm font-label-sm text-on-surface-variant">
        {sessions} session{sessions !== 1 ? 's' : ''} complétée{sessions !== 1 ? 's' : ''}
      </div>

      <div className="flex gap-2 w-full mt-2">
        <button onClick={reset} className="w-10 h-10 p-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors" aria-label="Réinitialiser">
          <RefreshCw className="text-[22px]" />
        </button>
        <button
          onClick={isRunning ? pause : start}
          disabled={!taskId}
          className="flex-1 h-10 rounded-lg border border-outline-variant text-on-surface font-medium hover:bg-surface-container-low disabled:opacity-50 transition-colors"
        >
          {isRunning ? 'Pause' : 'Démarrer'}
        </button>
        <button onClick={skip} className="w-10 h-10 p-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors" aria-label="Passer">
          <SkipForward className="text-[22px]" />
        </button>
      </div>
    </div>
  );
};