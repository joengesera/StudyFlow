import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { tasksApi } from '../api/tasks.api';
import { queryClient } from '../lib/queryClient';
import { taskKeys } from '../hooks/useTasks';
import type { Task } from '../types';

export type PomodoroPhase = 'work' | 'break';

export const WORK_SECONDS = 25 * 60;
export const BREAK_SECONDS = 5 * 60;

const phaseDuration = (phase: PomodoroPhase) =>
  phase === 'work' ? WORK_SECONDS : BREAK_SECONDS;

interface PomodoroState {
  taskId: string | null;
  phase: PomodoroPhase;
  secondsLeft: number;
  isRunning: boolean;
  sessions: number;
  // Secondes de travail effectuées mais pas encore reportées sur la tâche
  // (le reste < 60s est conservé pour ne pas perdre les sessions partielles).
  uncommittedSeconds: number;
  lastTickedAt: number | null;

  /** Liaison silencieuse au widget kanban (ne touche pas à la session). */
  attach: (taskId: string | null) => void;
  /** Nouvelle session fraîche pour une tâche (commit l'ancienne si besoin). */
  beginFreshSession: (taskId: string) => void;
  start: () => void;
  pause: () => void;
  resetPhase: () => void;
  skipPhase: () => void;
  /** Reporte les minutes entières accumulées sur la tâche courante. */
  commitUncommitted: () => void;
}

// Report du temps passé dans le cache React Query + API (l'intercepteur
// offline se charge de mettre en file si le réseau est absent).
const commitMinutes = (taskId: string | null, extraMinutes: number) => {
  if (!taskId || extraMinutes <= 0) return;

  const cachedList = queryClient.getQueryData<Task[]>(taskKeys.all);
  const baseMinutes = cachedList?.find((t) => t.id === taskId)?.timeSpentMinutes ?? 0;
  const total = baseMinutes + extraMinutes;

  ([taskKeys.all, taskKeys.board] as const).forEach((key) => {
    queryClient.setQueryData<Task[]>(key, (old) =>
      old?.map((t) => (t.id === taskId ? { ...t, timeSpentMinutes: total } : t)),
    );
  });

  void tasksApi.update(taskId, { timeSpentMinutes: total }).catch(() => undefined);
};

const flushWholeMinutes = (state: PomodoroState): PomodoroState => {
  const minutes = Math.floor(state.uncommittedSeconds / 60);
  if (minutes > 0 && state.taskId) {
    commitMinutes(state.taskId, minutes);
  }
  return {
    ...state,
    uncommittedSeconds: state.uncommittedSeconds - minutes * 60,
  };
};

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set, get) => ({
      taskId: null,
      phase: 'work',
      secondsLeft: WORK_SECONDS,
      isRunning: false,
      sessions: 0,
      uncommittedSeconds: 0,
      lastTickedAt: null,

      attach: (taskId) =>
        set((state) => (state.taskId === taskId ? state : { taskId })),

      beginFreshSession: (taskId) => {
        set((state) => flushWholeMinutes({ ...state }));
        set({
          taskId,
          phase: 'work',
          secondsLeft: WORK_SECONDS,
          isRunning: false,
          sessions: 0,
        });
      },

      start: () => {
        if (!get().taskId) return;
        set({ isRunning: true, lastTickedAt: Date.now() });
      },

      pause: () => set({ isRunning: false }),

      resetPhase: () =>
        set((state) => ({
          secondsLeft: phaseDuration(state.phase),
          isRunning: false,
        })),

      skipPhase: () =>
        set((state) => {
          const flushed = flushWholeMinutes({ ...state });
          const nextPhase: PomodoroPhase =
            flushed.phase === 'work' ? 'break' : 'work';
          return {
            ...flushed,
            phase: nextPhase,
            secondsLeft: phaseDuration(nextPhase),
            isRunning: false,
          };
        }),

      commitUncommitted: () => set((state) => flushWholeMinutes({ ...state })),
    }),
    {
      name: 'pomodoro-storage',
      // localStorage volontairement : état minuscule et non sensible
      // (taskId + secondes), pas besoin du stockage scopé IndexedDB.
      storage: createJSONStorage(() => window.localStorage),
      partialize: (state) => ({
        taskId: state.taskId,
        phase: state.phase,
        secondsLeft: state.secondsLeft,
        isRunning: state.isRunning,
        sessions: state.sessions,
        uncommittedSeconds: state.uncommittedSeconds,
        lastTickedAt: state.lastTickedAt,
      }),
    },
  ),
);

// Horloge unique au niveau du module : impossible d'avoir des ticks en
// double même si plusieurs composants consomment le store. Le delta est
// recalculé depuis lastTickedAt → insensible aux throttling d'onglet inactif.
if (typeof window !== 'undefined') {
  window.setInterval(() => {
    const state = usePomodoroStore.getState();
    if (!state.isRunning || !state.lastTickedAt) return;

    const now = Date.now();
    const rawDelta = Math.floor((now - state.lastTickedAt) / 1000);
    if (rawDelta <= 0) return;

    let delta = rawDelta;
    const { taskId } = state;
    let { phase, secondsLeft, sessions, uncommittedSeconds } = state;
    // `isRunning` est narrowé à `true` par le garde ci-dessus ; on élargit
    // le type pour pouvoir le repasser à false dans la boucle.
    let isRunning: boolean = state.isRunning;
    let workSessionJustEnded = false;

    while (delta > 0 && isRunning) {
      const step = Math.min(delta, secondsLeft);
      secondsLeft -= step;
      delta -= step;

      if (phase === 'work') uncommittedSeconds += step;

      if (secondsLeft === 0) {
        if (phase === 'work') {
          sessions += 1;
          workSessionJustEnded = true;
          phase = 'break';
          secondsLeft = BREAK_SECONDS;
          isRunning = false; // pause manuelle entre les phases
        } else {
          phase = 'work';
          secondsLeft = WORK_SECONDS;
          isRunning = false;
        }
        break;
      }
    }

    usePomodoroStore.setState({
      lastTickedAt: now,
      phase,
      secondsLeft,
      isRunning,
      sessions,
      uncommittedSeconds,
    });

    if (workSessionJustEnded) {
      const minutes = Math.floor(uncommittedSeconds / 60);
      usePomodoroStore.setState((prev) => ({
        uncommittedSeconds: prev.uncommittedSeconds - minutes * 60,
      }));
      commitMinutes(taskId, minutes);
    }
  }, 1000);
}
