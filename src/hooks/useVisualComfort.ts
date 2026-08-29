import { useEffect, useState } from 'react';

export const MIN_VISUAL_SCALE = 100;
export const MAX_VISUAL_SCALE = 200;
export const DEFAULT_VISUAL_SCALE = 100;

const STORAGE_KEY = 'studyflow-visual-comfort';

const boundsVisualScale = (value: number): number =>
    Math.min(MAX_VISUAL_SCALE, Math.max(MIN_VISUAL_SCALE, Math.round(value)));

const readVisualComfort = (): number => {
    if (typeof window === 'undefined') return DEFAULT_VISUAL_SCALE;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    // Compat rétro : anciens modes 'standard' | 'comfortable' | 'high'.
    if (stored === 'standard') return 100;
    if (stored === 'comfortable') return 108;
    if (stored === 'high') return 116;
    const parsed = Number(stored);
    return Number.isFinite(parsed) ? boundsVisualScale(parsed) : DEFAULT_VISUAL_SCALE;
};

const applyVisualComfort = (scale: number) => {
    if (typeof document === 'undefined') return;
    document.documentElement.style.setProperty('--comfort-scale', String(scale / 100));
};

export const initializeVisualComfort = () => {
    applyVisualComfort(readVisualComfort());
};

export function useVisualComfort() {
    const [scale, setScaleState] = useState<number>(readVisualComfort);

    const setScale = (next: number) => setScaleState(boundsVisualScale(next));

    useEffect(() => {
        applyVisualComfort(scale);
        window.localStorage.setItem(STORAGE_KEY, String(scale));
    }, [scale]);

    return { scale, setScale };
}