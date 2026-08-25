import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks, useUpdateTask } from '../../hooks/useTasks';
import { useCourses } from '../../hooks/useCourses';
import { usePomodoroStore } from '../../stores/pomodoroStore';
import { TimerRing } from '../../components/TimerRing';
import { selectNextTaskDueToday, isActiveTask } from '../../utils/taskSelection';

export default function FocusPage() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  const { data: tasks = [], isLoading: tasksLoading } = useTasks();
  const { data: courses = [] } = useCourses();
  const { mutate: updateTask } = useUpdateTask();

  const phase = usePomodoroStore((s) => s.phase);
  const secondsLeft = usePomodoroStore((s) => s.secondsLeft);
  const isRunning = usePomodoroStore((s) => s.isRunning);
  const sessions = usePomodoroStore((s) => s.sessions);
  const beginFreshSession = usePomodoroStore((s) => s.beginFreshSession);
  const start = usePomodoroStore((s) => s.start);
  const pause = usePomodoroStore((s) => s.pause);
  const skipPhase = usePomodoroStore((s) => s.skipPhase);
  const commitUncommitted = usePomodoroStore((s) => s.commitUncommitted);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const task = useMemo(
    () => tasks.find((t) => t.id === taskId && !t.isDeleted) ?? null,
    [tasks, taskId],
  );
  const nextTask = useMemo(() => selectNextTaskDueToday(tasks, taskId), [tasks, taskId]);

  // Nouvelle session à chaque entrée / chaînage vers une autre tâche.
  useEffect(() => {
    if (task && task.id !== usePomodoroStore.getState().taskId) {
      beginFreshSession(task.id);
    }
  }, [task?.id, beginFreshSession]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cible invalide ou déjà terminée → retour kanban.
  useEffect(() => {
    if (!tasksLoading && (!task || task.status === 'COMPLETED' || task.status === 'CANCELED')) {
      navigate('/tasks', { replace: true });
    }
  }, [tasksLoading, task?.status, navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  // Single-WIP : toute autre tâche IN_PROGRESS repasse en PENDING
  // (couvre aussi les accès directs par URL).
  const otherWipIds = useMemo(
    () => tasks.filter((t) => t.status === 'IN_PROGRESS' && isActiveTask(t) && t.id !== taskId).map((t) => t.id),
    [tasks, taskId],
  );
  useEffect(() => {
    if (otherWipIds.length === 0) return;
    const ids = [...otherWipIds];
    updateTask({ id: ids[0], payload: { status: 'PENDING', startedAt: null } });
    if (ids.length > 1) {
      ids.slice(1).forEach((id) => updateTask({ id, payload: { status: 'PENDING', startedAt: null } }));
    }
  }, [otherWipIds.join(','), updateTask]); // eslint-disable-line react-hooks/exhaustive-deps

  const duration = phase === 'work' ? 25 * 60 : 5 * 60;
  const progress = ((duration - secondsLeft) / duration) * 100;
  const formatted = `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`;

  // Titre d'onglet : compte à rebours visible même en dehors de l'app.
  useEffect(() => {
    if (!task) return;
    document.title = `${formatted} · ${phase === 'break' ? 'Pause' : 'Focus'} — StudyFlow`;
    return () => {
      document.title = 'StudyFlow';
    };
  }, [formatted, phase, task]);

  const quit = () => {
    commitUncommitted();
    navigate('/tasks');
  };

  // Échap = quitter (la tâche reste IN_PROGRESS, le temps est committé).
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') quit();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const finishCurrent = () => {
    if (!task) return;
    commitUncommitted();
    updateTask({
      id: task.id,
      payload: { status: 'COMPLETED', completedAt: new Date().toISOString() },
    });

    if (nextTask) {
      beginFreshSession(nextTask.id);
      updateTask({ id: nextTask.id, payload: { status: 'IN_PROGRESS', startedAt: new Date().toISOString() } });
      navigate(`/focus/${nextTask.id}`, { replace: true });
    } else {
      navigate('/tasks');
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch {
      // Fullscreen refusé par le navigateur : non bloquant.
    }
  };

  const courseName = task?.courseId ? courses.find((c) => c.id === task.courseId)?.name : undefined;

  if (!task) {
    return (
      <div className="h-screen w-full bg-background flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-on-surface-variant animate-spin">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden" data-focus-mode="true">
      {/* Barre minimale : quitter + fullscreen */}
      <header className="flex items-center justify-between px-6 py-4 shrink-0">
        <button
          onClick={quit}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant text-label-sm font-label-sm text-on-surface-variant hover:bg-surface-container-low transition-colors"
          aria-label="Quitter le mode focus"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Quitter
        </button>
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors"
          aria-label={isFullscreen ? 'Quitter le plein écran' : 'Passer en plein écran'}
        >
          <span className="material-symbols-outlined text-[20px]">
            {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
          </span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto flex flex-col items-center justify-center gap-8 px-6 pb-10">
        {/* Phase + timer */}
        <div className="flex flex-col items-center gap-3">
          <span className={`text-label-caps font-label-caps px-3 py-1 rounded-full ${phase === 'work' ? 'bg-primary-container text-on-primary-container' : 'bg-tertiary-container/30 text-tertiary'}`}>
            {phase === 'work' ? 'Travail' : 'Pause'}
          </span>
          <TimerRing progress={progress} formatted={formatted} phase={phase} size={260} />
        </div>

        {/* Contrôles */}
        <div className="flex items-center gap-3">
          <button
            onClick={isRunning ? pause : start}
            className="btn btn-primary h-12 px-8 text-body-md font-body-md"
          >
            <span className="material-symbols-outlined text-[20px]">{isRunning ? 'pause' : 'play_arrow'}</span>
            {isRunning ? 'Pause' : 'Démarrer'}
          </button>
          <button
            onClick={skipPhase}
            className="w-12 h-12 p-2.5 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors"
            aria-label="Passer la phase"
          >
            <span className="material-symbols-outlined text-[22px]">skip_next</span>
          </button>
        </div>

        {/* Sessions complétées */}
        <div className="flex items-center gap-2" aria-label={`${sessions} session(s) complétée(s)`}>
          {sessions === 0 ? (
            <span className="text-label-sm font-label-sm text-on-surface-variant">Aucune session complétée</span>
          ) : (
            Array.from({ length: Math.min(sessions, 8) }).map((_, i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-full bg-primary" />
            ))
          )}
          {sessions > 8 && (
            <span className="text-label-sm font-label-sm text-on-surface-variant">+{sessions - 8}</span>
          )}
        </div>

        {/* Tâche courante */}
        <section className="card card-padded w-full max-w-xl" aria-label="Tâche en cours">
          <span className="text-label-caps font-label-caps text-primary mb-2 block">En cours</span>
          <h1 className="text-headline-md font-headline-md text-on-surface leading-snug">{task.title}</h1>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="px-2.5 py-1 rounded bg-surface-container text-label-caps font-label-caps text-on-surface-variant">
              {courseName || 'Général'}
            </span>
            {(task.priority === 'HIGH' || task.priority === 'CRITICAL') && (
              <span className="px-2.5 py-1 rounded bg-error-container text-on-error-container text-label-caps font-label-caps">
                Urgent
              </span>
            )}
            {task.timeSpentMinutes > 0 && (
              <span className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                {task.timeSpentMinutes} min travaillées
              </span>
            )}
          </div>
        </section>

        {/* Tâche suivante due aujourd'hui — écran vide si aucune */}
        {nextTask ? (
          <section className="card card-padded w-full max-w-xl opacity-90" aria-label="Prochaine tâche aujourd'hui">
            <span className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">À suivre aujourd'hui</span>
            <div className="text-body-lg font-body-lg text-on-surface">{nextTask.title}</div>
            <div className="text-label-sm font-label-sm text-on-surface-variant mt-1">
              {nextTask.courseId ? courses.find((c) => c.id === nextTask.courseId)?.name ?? 'Général' : 'Général'}
              {nextTask.dueDate ? ` · échéance aujourd'hui` : ''}
            </div>
          </section>
        ) : (
          <p className="text-body-md font-body-md text-on-surface-variant text-center max-w-md">
            Aucune autre tâche attendue aujourd'hui — concentre-toi sur celle-ci.
          </p>
        )}

        {/* Terminer */}
        <button
          onClick={finishCurrent}
          className="btn btn-outlined h-11 px-6 text-label-md font-label-md"
        >
          <span className="material-symbols-outlined text-[18px]">task_alt</span>
          Marquer comme terminée
        </button>
      </main>
    </div>
  );
}
