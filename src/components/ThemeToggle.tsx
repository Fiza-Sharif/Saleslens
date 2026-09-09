'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-28 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
    );
  }

  return (
    <div className="flex items-center p-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 text-xs font-medium">
      <button
        onClick={() => setTheme('light')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
          theme === 'light'
            ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm font-semibold'
            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
        }`}
        title="Light Theme"
      >
        <Sun className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Light</span>
      </button>

      <button
        onClick={() => setTheme('dark')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
          theme === 'dark'
            ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm font-semibold'
            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
        }`}
        title="Dark Theme"
      >
        <Moon className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Dark</span>
      </button>

      <button
        onClick={() => setTheme('system')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
          theme === 'system'
            ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm font-semibold'
            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
        }`}
        title="System Theme"
      >
        <Laptop className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">System</span>
      </button>
    </div>
  );
}
