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
        <div className="bg-white rounded-[24px] border border-[#E5E5E5] p-6 flex flex-col items-center gap-4 sticky top-6 shadow-sm">
            <div className="text-center w-full">
                <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2">
                    {phase === 'work' ? 'Travail' : 'Pause'}
                </div>
                {taskTitle ? (
                    <div className="text-[14px] font-bold text-[#1A1A1A] truncate w-full">
                        {taskTitle}
                    </div>
                ) : (
                    <div className="text-[14px] font-medium text-[#A3A3A3]">
                        Sélectionne une tâche
                    </div>
                )}
            </div>

            <div className="relative w-32 h-32 my-2">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50" cy="50" r="44"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        className="text-[#F1F1F1]"
                    />
                    <circle
                        cx="50" cy="50" r="44"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeDasharray={`${2 * Math.PI * 44}`}
                        strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`}
                        strokeLinecap="round"
                        className={phase === 'work' ? 'text-[#1A1A1A]' : 'text-[#10B981]'}
                        style={{ transition: 'stroke-dashoffset 1s linear' }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[26px] font-bold text-[#1A1A1A] tabular-nums tracking-tight">
                        {formatted}
                    </span>
                </div>
            </div>

            <div className="text-[12px] font-medium text-[#737373]">
                {sessions}
                session
                {sessions !== 1 ? 's' : ''}
                {' '}
                complétée
                {sessions !== 1 ? 's' : ''}
            </div>

            <div className="flex gap-2 w-full mt-2">
                <button onClick={reset} className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#FAF9F6] border border-[#E5E5E5] text-[#737373] hover:bg-gray-50 text-lg">↺</button>
                <button
                    onClick={isRunning ? pause : start}
                    disabled={!taskId}
                    className="flex-1 h-10 rounded-xl bg-white border border-[#E5E5E5] text-[#1A1A1A] text-[14px] font-bold hover:bg-gray-50 shadow-sm disabled:opacity-50"
                >
                    {isRunning ? 'Pause' : 'Démarrer'}
                </button>
                <button onClick={skip} className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#FAF9F6] border border-[#E5E5E5] text-[#737373] hover:bg-gray-50 text-xl">⏭</button>
            </div>
        </div>
    );
};
