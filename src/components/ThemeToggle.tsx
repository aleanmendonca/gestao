import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/theme';
import { cn } from '../lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useThemeStore();

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={cn(
        'rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800',
        className
      )}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
}
