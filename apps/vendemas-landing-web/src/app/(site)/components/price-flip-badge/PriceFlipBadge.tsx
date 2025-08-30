import React, { useEffect, useRef, useState } from 'react';

// Define the two pricing variants for the flip animation
type Variant = 'pro' | 'free';

/**
 * Utility function to detect user's motion preference
 * Respects the user's accessibility settings for reduced motion
 */
function getPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * PriceFlipBadge Component - Animated pricing badge that flips between plans
 *
 * Features:
 * - Automatic flipping between Pro and Free plan displays
 * - Respects user's motion preferences for accessibility
 * - Pause on hover/focus for better user control
 * - Persistent state using localStorage
 * - Responsive design with dark mode support
 * - ARIA live region for screen reader announcements
 *
 * @param intervalMs - Time interval between flips in milliseconds (default: 4000ms)
 */
export default function PriceFlipBadge({
  intervalMs = 4000,
}: {
  intervalMs?: number;
}): React.JSX.Element {
  // State for current pricing variant and component mount status
  const [variant, setVariant] = useState<Variant>('pro');
  const [mounted, setMounted] = useState(false);

  // Accessibility: respect user's motion preferences
  const reduced = getPrefersReducedMotion();

  // Timer reference for managing the flip interval
  const timer = useRef<number | null>(null);

  // Handle hydration safely and restore saved variant from localStorage
  useEffect(() => {
    setMounted(true);
    const savedVariant = localStorage.getItem('vm_badge_variant') as Variant;
    if (savedVariant) {
      setVariant(savedVariant);
    }
  }, []);

  // Set up automatic flipping timer (respects accessibility preferences)
  useEffect(() => {
    if (!mounted || reduced) return; // Respect accessibility and wait for mount
    timer.current = window.setInterval(() => {
      setVariant(v => (v === 'pro' ? 'free' : 'pro'));
    }, intervalMs);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [intervalMs, reduced, mounted]);

  // Persist variant changes to localStorage for consistency across sessions
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('vm_badge_variant', variant);
    }
  }, [variant, mounted]);

  /**
   * Pause/resume the flip animation based on user interaction
   * - Pauses on hover/focus for better user control
   * - Respects reduced motion preferences
   *
   * @param pause - Whether to pause (true) or resume (false) the animation
   */
  const onPause = (pause: boolean): void => {
    if (reduced) return; // Don't change behavior if user prefers reduced motion
    if (pause && timer.current) {
      window.clearInterval(timer.current);
      timer.current = null;
    } else if (!pause && !timer.current) {
      timer.current = window.setInterval(() => {
        setVariant(v => (v === 'pro' ? 'free' : 'pro'));
      }, intervalMs);
    }
  };

  return (
    <div
      // Interactive controls for pausing animation
      onMouseEnter={() => onPause(true)}
      onMouseLeave={() => onPause(false)}
      onFocus={() => onPause(true)}
      onBlur={() => onPause(false)}
      className='
        group relative inline-flex min-w-[220px] select-none flex-col
        rounded-2xl border border-secondary/10 bg-white/80 p-3
        shadow-[0_10px_30px_rgba(30,58,95,0.08)] backdrop-blur
        dark:bg-secondary/10 dark:border-secondary/20
      '
      // Accessibility: announce changes to screen readers
      aria-live='polite'
    >
      {/* Header pill showing current plan type */}
      <div
        className={`
          absolute -top-2 right-3 rounded-full px-2.5 py-0.5 text-[11px] font-medium
          transition-all duration-300
          ${
            variant === 'pro'
              ? 'bg-secondary-500 text-white shadow'
              : 'bg-tertiary/90 text-black'
          }
        `}
      >
        {variant === 'pro' ? 'Plan Pro PyME' : 'Plan Ambulante'}
      </div>

      {/* Main content area with flip animation */}
      <div className='relative h-20'>
        {/* Pro plan view with smooth transitions */}
        <div
          className={`
            absolute inset-0 flex flex-col items-center justify-center gap-0.5
            transition-all duration-400
            ${
              variant === 'pro'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 pointer-events-none translate-y-1'
            }
          `}
        >
          <div className='flex items-end gap-1'>
            <span className='text-[28px] leading-none font-extrabold text-primary'>
              $149
            </span>
            <span className='pb-1 text-xs font-medium text-charcoal-600'>
              MXN/mes
            </span>
          </div>
          <div className='text-[11px] text-charcoal-900 font-bold'>
            o $1,490 anual
            <span className='opacity-70'>(2 meses gratis)</span>
          </div>
        </div>

        {/* Free plan view with smooth transitions */}
        <div
          className={`
            absolute inset-0 flex flex-col items-center justify-center gap-0.5
            transition-all duration-400
            ${
              variant === 'free'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 pointer-events-none translate-y-1'
            }
          `}
        >
          <div className='flex items-end gap-1'>
            <span className='text-[28px] leading-none font-extrabold text-primary'>
              $0
            </span>
            <span className='pb-1 text-xs font-medium text-charcoal-600'>
              MXN/mes
            </span>
          </div>
          <div className='text-[11px] text-charcoal-900 font-bold'>
            Gratis para siempre
          </div>
        </div>
      </div>

      {/* Footer ticks (static, both variants) */}
      <div className='mt-2 space-y-2 text-[11px] text-charcoal-500'>
        {variant === 'pro' && (
          <div className='flex justify-center'>
            <span className='text-secondary-500 font-bold text-center'>
              IA incluida
            </span>
          </div>
        )}
        <div className='flex items-center justify-center gap-2'>
          <span className='inline-flex items-center gap-1'>
            <i className='i-lucide-badge-check text-[13px] text-primary'></i>{' '}
            CoDi 0%
          </span>
          <span className='inline-flex items-center gap-1'>
            <i className='i-lucide-wifi-off text-[13px] text-primary'></i>{' '}
            Offline
          </span>
          <span className='inline-flex items-center gap-1'>
            <i className='i-lucide-bolt text-[13px] text-primary'></i> Activa en
            2 min
          </span>
        </div>
      </div>

      {/* Toggle button (optional, manual switch) */}
      <div className='mt-2 flex justify-center'>
        <button
          onClick={() => setVariant(variant === 'pro' ? 'free' : 'pro')}
          className='rounded-sm bg-white px-2 py-1 text-xs font-semibold text-primary-500 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20'
          aria-label={`Cambiar a ${variant === 'pro' ? 'plan gratuito' : 'plan Pro para PyME'}`}
        >
          {variant === 'pro' ? 'Ver plan gratis' : 'Ver Pro para PyME'}
        </button>
      </div>
    </div>
  );
}
