'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle(): React.JSX.Element | null {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const themes = [
    { value: 'light', icon: Sun, label: 'Tema claro' },
    { value: 'dark', icon: Moon, label: 'Tema oscuro' },
    { value: 'system', icon: Monitor, label: 'Tema del sistema' },
  ] as const;

  return (
    <div className='flex items-center gap-1 rounded-lg border border-secondary-200 bg-white p-1 dark:border-secondary-700 dark:bg-secondary-800'>
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200 ${
            theme === value
              ? 'bg-secondary-500 text-white dark:bg-white dark:text-secondary-500 shadow-sm'
              : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900 dark:text-white dark:hover:bg-white dark:hover:text-secondary-500'
          }`}
          aria-label={label}
          title={label}
        >
          <Icon className='h-4 w-4' />
        </button>
      ))}
    </div>
  );
}
