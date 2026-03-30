import { useState, useEffect } from 'react';

type Theme = 'lofi' | 'night';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('studyflow-theme');
    if (stored === 'lofi' || stored === 'night') return stored;
    
    // Fallback to system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'night';
    }
    return 'lofi';
  });

  useEffect(() => {
    localStorage.setItem('studyflow-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'lofi' ? 'night' : 'lofi'));
  };

  return { theme, toggleTheme };
}
