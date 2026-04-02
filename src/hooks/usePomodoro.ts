import { useState, useEffect, useRef } from 'react';
import { useUpdateTask } from './useTasks';
import { useSyncStore } from '../stores/syncStore';

type PomodoroPhase = 'work' | 'break';

const WORK_DURATION = 25 * 60;  // 25 minutes en secondes
const BREAK_DURATION = 5 * 60;  // 5 minutes en secondes

export const usePomodoro = (taskId: string | null) => {
    const [phase, setPhase] = useState<PomodoroPhase>('work');
    const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
    const [isRunning, setIsRunning] = useState(false);
    const [sessions, setSessions] = useState(0);
    const elapsedRef = useRef(0);
    const { mutate: updateTask } = useUpdateTask();

    // On stocke taskId et une méthode pour le commit
    const taskIdRef = useRef(taskId);
    useEffect(() => {
        // Optionnel : ne pas réinitialiser si on est en train de courir ?
        // Pour l'instant on garde la liaison
        taskIdRef.current = taskId;
    }, [taskId]);

    // Timer effect
    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) return 0;
                return prev - 1;
            });
            if (phase === 'work') {
                elapsedRef.current += 1;
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, phase]);

    // Phase end effect
    useEffect(() => {
        if (timeLeft === 0 && isRunning) {
            handlePhaseEnd();
        }
    }, [timeLeft, isRunning]); // eslint-disable-line react-hooks/exhaustive-deps

    const handlePhaseEnd = () => {
        setIsRunning(false);

        if (phase === 'work') {
            setSessions((prev) => prev + 1);

            const currentTaskId = taskIdRef.current;
            if (currentTaskId) {
                // On récupère la tâche actuelle pour ne pas écraser le temps passé
                const currentTask = useSyncStore.getState().cache.tasks.find(t => t.id === currentTaskId);
                const previousMinutes = currentTask?.timeSpentMinutes ?? 0;
                const newMinutesToAdd = Math.floor(elapsedRef.current / 60);

                if (newMinutesToAdd > 0) {
                    updateTask({
                        id: currentTaskId,
                        payload: {
                            timeSpentMinutes: previousMinutes + newMinutesToAdd,
                        },
                    });
                    // On ne réinitialise elapsed que si on a au moins 1 minute à committer
                    elapsedRef.current = 0;
                }
            }

            setPhase('break');
            setTimeLeft(BREAK_DURATION);
        } else {
            setPhase('work');
            setTimeLeft(WORK_DURATION);
        }
    };

    const start = () => setIsRunning(true);
    const pause = () => setIsRunning(false);

    const reset = () => {
        setIsRunning(false);
        setPhase('work');
        setTimeLeft(WORK_DURATION);
        elapsedRef.current = 0;
    };

    const skip = () => {
        setIsRunning(false);
        handlePhaseEnd();
    };

    const formatted = `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`;

    const progress = phase === 'work'
        ? ((WORK_DURATION - timeLeft) / WORK_DURATION) * 100
        : ((BREAK_DURATION - timeLeft) / BREAK_DURATION) * 100;

    return {
        phase,
        timeLeft,
        formatted,
        progress,
        isRunning,
        sessions,
        start,
        pause,
        reset,
        skip,
    };
};