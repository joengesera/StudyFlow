import { useEffect, useState } from 'react';

export type VisualComfortMode = 'standard' | 'comfortable' | 'high';

const STORAGE_KEY = 'studyflow-visual-comfort';

const isVisualComfortMode = (value: string | null): value is VisualComfortMode =>
    value === 'standard' || value === 'comfortable' || value === 'high';

const readVisualComfort = (): VisualComfortMode => {
    if (typeof window === 'undefined') return 'standard';
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isVisualComfortMode(stored) ? stored : 'standard';
};

const applyVisualComfort = (mode: VisualComfortMode) => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-visual-comfort', mode);
};

export const initializeVisualComfort = () => {
    const mode = readVisualComfort();
    applyVisualComfort(mode);
};

export function useVisualComfort() {
    const [mode, setMode] = useState<VisualComfortMode>(readVisualComfort);

    useEffect(() => {
        applyVisualComfort(mode);
        window.localStorage.setItem(STORAGE_KEY, mode);
    }, [mode]);

    return { mode, setMode };
}
