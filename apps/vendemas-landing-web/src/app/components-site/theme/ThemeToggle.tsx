'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface ThemeToggleProps {
  isCompact?: boolean;
}

export default function ThemeToggle({
  isCompact = false,
}: ThemeToggleProps): React.JSX.Element | null {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const themes = [
    { value: 'light', icon: Sun, label: 'Tema claro' },
    { value: 'dark', icon: Moon, label: 'Tema oscuro' },
    { value: 'system', icon: Monitor, label: 'Tema del sistema' },
  ] as const;

  // Get current theme icon
  const currentTheme = themes.find(t => t.value === theme);
  const CurrentIcon = currentTheme?.icon || Sun;

  if (isCompact) {
    return (
      <div className='relative' ref={dropdownRef}>
        {/* Compact mode - single button */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className='flex h-8 w-8 items-center justify-center card-border !rounded-[14px] border border-secondary-200 bg-white dark:border-secondary-700 dark:bg-secondary-800 transition-all duration-200 hover:bg-secondary-100 dark:hover:bg-white dark:hover:text-secondary-500'
          aria-label={`Cambiar tema (actual: ${currentTheme?.label})`}
          aria-expanded={isDropdownOpen}
          aria-haspopup='true'
        >
          <CurrentIcon className='h-4 w-4 text-secondary-600 dark:text-white' />
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className='absolute top-10 right-0 z-50 flex items-center gap-1 rounded-lg border border-secondary-200 bg-white p-1 shadow-lg dark:border-secondary-700 dark:bg-secondary-800'>
            {themes.map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                onClick={() => {
                  setTheme(value);
                  setIsDropdownOpen(false);
                }}
                className={`flex h-8 w-8 items-center justify-center rounded-[14px] transition-all duration-200 ${
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
        )}
      </div>
    );
  }

  // Normal mode - all three buttons visible
  return (
    <div className='flex items-center gap-1 card-border !rounded-[14px] border border-secondary-200 bg-white p-1 dark:border-secondary-700 dark:bg-secondary-800'>
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`flex h-8 w-8 items-center justify-center rounded-[14px] transition-all duration-200 ${
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
