import { useEffect } from 'react';
import { usePomodoroStore, WORK_SECONDS, BREAK_SECONDS } from '../stores/pomodoroStore';

export const usePomodoro = (taskId: string | null | undefined) => {
  const phase = usePomodoroStore((s) => s.phase);
  const secondsLeft = usePomodoroStore((s) => s.secondsLeft);
  const isRunning = usePomodoroStore((s) => s.isRunning);
  const sessions = usePomodoroStore((s) => s.sessions);
  const attach = usePomodoroStore((s) => s.attach);
  const start = usePomodoroStore((s) => s.start);
  const pause = usePomodoroStore((s) => s.pause);
  const resetPhase = usePomodoroStore((s) => s.resetPhase);
  const skipPhase = usePomodoroStore((s) => s.skipPhase);

  // Liaison silencieuse : reflète la sélection du kanban dans le widget
  // sans toucher à une session en cours.
  useEffect(() => {
    if (taskId) attach(taskId);
  }, [taskId, attach]);

  const duration = phase === 'work' ? WORK_SECONDS : BREAK_SECONDS;

  return {
    phase,
    secondsLeft,
    isRunning,
    sessions,
    formatted: `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`,
    progress: ((duration - secondsLeft) / duration) * 100,
    start,
    pause,
    reset: resetPhase,
    skip: skipPhase,
  };
};
