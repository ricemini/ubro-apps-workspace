import * as React from 'react';

/**
 * HeroBackground Component - Decorative background layer for the hero section
 *
 * Features:
 * - Aurora mesh gradient effects using brand colors
 * - Left scrim overlay for text legibility
 * - Accessibility: marked as decorative with aria-hidden
 * - No pointer events to prevent interference with content
 * - Responsive design with dark mode support
 */
export default function HeroBackground(): React.JSX.Element {
  return (
    // Decorative background container - hidden from screen readers and no pointer events
    <div aria-hidden className='pointer-events-none absolute inset-0 -z-10'>
      {/* Premium gradient with purple tones and granular texture */}
      <div
        className='
          absolute inset-0
          bg-gradient-premium dark:bg-gradient-premium-dark
        '
      />

      {/* Granular texture overlay for premium feel */}
      <div
        className='
          absolute inset-0
          bg-gradient-grain
          opacity-60 dark:opacity-80
        '
      />

      {/* Left scrim overlay - ensures text legibility over gradient background */}
      <div
        className='
          absolute inset-y-0 left-0 w-[62%]
          bg-gradient-to-r from-white/80 via-white/60 to-white/0
          dark:from-black/80 dark:via-black/50 dark:to-transparent
        '
      />

      {/* Optional grain texture effect (commented out for performance) */}
      {/* <div className='absolute inset-0 bg-[url("/noise.png")] opacity-[0.04] mix-blend-soft-light' /> */}
    </div>
  );
}
