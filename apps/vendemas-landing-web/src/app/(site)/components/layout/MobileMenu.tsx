'use client';

import * as React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { PRIMARY, SECONDARY } from '../../data/nav';

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}): React.JSX.Element | null {
  React.useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) =>
      e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div role='dialog' aria-modal='true' className='fixed inset-0 z-50'>
      <div className='absolute inset-0 bg-black/30' onClick={onClose} />
      <div className='absolute inset-x-0 top-0 rounded-b-2xl bg-white p-6 shadow-xl dark:bg-gray-950'>
        {/* Header with close button */}
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-lg font-semibold text-secondary-900 dark:text-white'>
            Menú
          </h2>
          <button
            onClick={onClose}
            className='rounded-lg p-2 text-secondary-500 hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-800'
            aria-label='Cerrar menú'
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        {/* Navigation */}
        <nav className='space-y-3'>
          {/* Primary navigation */}
          {PRIMARY.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className='block rounded-lg px-3 py-2.5 text-lg font-medium text-secondary-900 hover:bg-secondary-50 dark:text-white dark:hover:bg-secondary-800'
            >
              {item.label}
            </Link>
          ))}

          {/* Divider */}
          <div className='my-4 border-t border-secondary-200 dark:border-secondary-700' />

          {/* Secondary navigation */}
          <div className='space-y-2'>
            <p className='px-3 text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wide'>
              Más información
            </p>
            {SECONDARY.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className='block rounded-lg px-3 py-2 text-sm text-secondary-600 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-800'
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className='pt-4'>
            <Link
              href='/signup'
              onClick={onClose}
              className='inline-flex w-full items-center justify-center rounded-lg bg-primary-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:hover:bg-primary-600'
              data-analytics='nav_cta_signup'
            >
              Comenzar gratis
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
