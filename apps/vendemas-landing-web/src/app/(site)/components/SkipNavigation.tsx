'use client';

import React from 'react';

/**
 * SkipNavigation Component - Provides skip links for keyboard and screen reader users
 *
 * Features:
 * - Skip to main content
 * - Skip to navigation
 * - Skip to footer
 * - Appears only on focus for visual users
 * - High contrast and focus indicators
 * - Proper z-index layering
 */
export default function SkipNavigation(): React.JSX.Element {
  return (
    <div className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:flex focus:flex-col focus:gap-2'>
      {/* Skip to main content */}
      <a
        href='#main-content'
        className='focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:font-medium focus:text-sm'
        aria-label='Saltar al contenido principal'
      >
        Saltar al contenido principal
      </a>

      {/* Skip to navigation */}
      <a
        href='#main-navigation'
        className='focus:px-4 focus:py-2 focus:bg-secondary-500 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-600 focus:ring-offset-2 focus:font-medium focus:text-sm'
        aria-label='Saltar a la navegación principal'
      >
        Saltar a la navegación
      </a>

      {/* Skip to footer */}
      <a
        href='#main-footer'
        className='focus:px-4 focus:py-2 focus:bg-tertiary-500 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary-600 focus:ring-offset-2 focus:font-medium focus:text-sm'
        aria-label='Saltar al pie de página'
      >
        Saltar al pie de página
      </a>
    </div>
  );
}
