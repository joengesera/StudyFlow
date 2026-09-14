import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

/** Bascule rapide clair ↔ sombre dans la topbar. Le mode "system"
 *  (suivi du navigateur) se règle dans Profil → Apparence. */
export function ThemeToggle() {
  const { mode, resolved, toggleTheme } = useTheme();
  const isDark = resolved === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Passer en thème clair' : 'Passer en thème sombre'}
      title={mode === 'system' ? `Automatique (navigateur : ${isDark ? 'sombre' : 'clair'})` : isDark ? 'Thème sombre' : 'Thème clair'}
      className="relative text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-low"
    >
      {isDark ? <Sun className="text-[20px]" /> : <Moon className="text-[20px]" />}
      {mode === 'system' && (
        <span
          aria-hidden="true"
          className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-surface-container-highest border border-outline"
        />
      )}
    </button>
  );
}
