import { useCallback, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeResolved = 'light' | 'dark';

const STORAGE_KEY = 'studyflow-theme-mode';

const META_LIGHT = '#ffffff';
const META_DARK = '#171717';

export function getSystemTheme(): ThemeResolved {
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function readThemeMode(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  // Migration rétro : ancien hook 'lofi' | 'night'.
  if (stored === 'lofi') return 'light';
  if (stored === 'night') return 'dark';
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  return 'system';
}

export function resolveTheme(mode: ThemeMode): ThemeResolved {
  return mode === 'system' ? getSystemTheme() : mode;
}

/** Applique le thème résolu sur <html> : classe .dark (variantes dark:),
 *  data-theme (daisyUI), color-scheme + meta theme-color (navigateur). */
export function applyTheme(mode: ThemeMode): ThemeResolved {
  const resolved = resolveTheme(mode);
  if (typeof document === 'undefined') return resolved;
  const root = document.documentElement;
  root.classList.toggle('dark', resolved === 'dark');
  root.setAttribute('data-theme', resolved);
  root.style.colorScheme = resolved;
  const meta = document.querySelector('meta[name="theme-color"]:not([media])');
  if (meta) meta.setAttribute('content', resolved === 'dark' ? META_DARK : META_LIGHT);
  return resolved;
}

export function initializeTheme(): () => void {
  applyTheme(readThemeMode());
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  // Suit le navigateur en direct quand l'utilisateur est en mode "system".
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  const onChange = () => {
    if (readThemeMode() === 'system') applyTheme('system');
  };
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

export function useTheme() {
  const [mode, setModeState] = useState<ThemeMode>(readThemeMode);
  const [resolved, setResolved] = useState<ThemeResolved>(() => resolveTheme(readThemeMode()));

  useEffect(() => {
    setResolved(applyTheme(mode));
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (readThemeMode() === 'system') setResolved(applyTheme('system'));
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const setMode = useCallback((next: ThemeMode) => setModeState(next), []);

  // Bascule rapide clair ↔ sombre (quitte le mode "system").
  const toggleTheme = useCallback(() => {
    setModeState((prev) => (resolveTheme(prev) === 'dark' ? 'light' : 'dark'));
  }, []);

  return { mode, resolved, theme: resolved, setMode, toggleTheme };
}
