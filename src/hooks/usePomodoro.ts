import { useState, useEffect, useRef } from 'react';
import { useUpdateTask } from './useTasks';

type PomodoroPhase = 'work' | 'break';

const WORK_DURATION = 25 * 60;  // 25 minutes en secondes
const BREAK_DURATION = 5 * 60;  // 5 minutes en secondes

export const usePomodoro = (taskId: string | null) => {
    const [phase, setPhase] = useState<PomodoroPhase>('work');
    const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
    const [isRunning, setIsRunning] = useState(false);
    const [sessions, setSessions] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const elapsedRef = useRef(0);
    const { mutate: updateTask } = useUpdateTask();

    // Nettoie l'interval quand le composant se démonte
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    // Lance ou met en pause le timer
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        // Timer terminé
                        handlePhaseEnd();
                        return 0;
                    }
                    if (phase === 'work') {
                        elapsedRef.current += 1;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning, phase]);

    const handlePhaseEnd = () => {
        setIsRunning(false);

        if (phase === 'work') {
            // Fin d'une session de travail
            setSessions((prev) => prev + 1);

            // Met à jour timeSpentMinutes sur la tâche
            if (taskId) {
                updateTask({
                    id: taskId,
                    payload: {
                        timeSpentMinutes: Math.floor(elapsedRef.current / 60),
                    },
                });
            }

            // Passe en pause
            setPhase('break');
            setTimeLeft(BREAK_DURATION);
        } else {
            // Fin de la pause → retour au travail
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

    // Formate en MM:SS
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