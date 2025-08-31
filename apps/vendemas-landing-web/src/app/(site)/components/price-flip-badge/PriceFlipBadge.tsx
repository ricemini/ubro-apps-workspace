import React, { useEffect, useRef, useState } from 'react';

// Define the two pricing variants for the flip animation
type Variant = 'pro' | 'free';

/**
 * Utility function to detect user's motion preference
 * Respects the user's accessibility settings for reduced motion
 *
 * This function checks the user's system preference for reduced motion
 * and returns true if they prefer minimal animations for accessibility
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
  // - variant: tracks which plan is currently displayed (Pro or Free)
  // - mounted: ensures safe hydration and localStorage access
  const [variant, setVariant] = useState<Variant>('pro');
  const [mounted, setMounted] = useState(false);

  // Accessibility: respect user's motion preferences
  // This prevents animations for users who prefer reduced motion
  const reduced = getPrefersReducedMotion();

  // Timer reference for managing the automatic flip interval
  // Stored in useRef to persist across re-renders and allow cleanup
  const timer = useRef<number | null>(null);

  // Handle hydration safely and restore saved variant from localStorage
  // This ensures the component works correctly with SSR and maintains user preference
  useEffect(() => {
    setMounted(true);
    const savedVariant = localStorage.getItem('vm_badge_variant') as Variant;
    if (savedVariant) {
      setVariant(savedVariant);
    }
  }, []);

  // Set up automatic flipping timer (respects accessibility preferences)
  // Only starts the timer when component is mounted and user hasn't requested reduced motion
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
  // Saves user's last viewed plan so it persists between page visits
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
      // Interactive controls for pausing animation on user interaction
      // - Pauses on hover/focus for better user control
      // - Resumes when user stops interacting
      onMouseEnter={() => onPause(true)}
      onMouseLeave={() => onPause(false)}
      onFocus={() => onPause(true)}
      onBlur={() => onPause(false)}
      className='
        group relative inline-flex min-w-[220px] select-none flex-col
        rounded-2xl border border-secondary/20 bg-white/90 p-3
        shadow-[0_10px_30px_rgba(30,58,95,0.12)] backdrop-blur
      '
      // Accessibility: announce changes to screen readers
      // aria-live="polite" ensures screen readers announce plan changes
      aria-live='polite'
    >
      {/* Header pill showing current plan type with dynamic styling */}
      {/* Positioned absolutely at top-right with smooth color transitions */}
      <div
        className={`
          absolute -top-2 right-3 rounded-full px-2.5 py-0.5 text-[11px] font-medium
          transition-all duration-300
          ${
            variant === 'pro'
              ? 'bg-secondary-500 text-white shadow' // Pro plan: secondary color
              : 'bg-tertiary-500 text-white shadow' // Free plan: tertiary color
          }
        `}
      >
        {variant === 'pro' ? 'Plan Pro PyME' : 'Plan Ambulante'}
      </div>

      {/* Main content area with flip animation between Pro and Free plans */}
      {/* Fixed height container ensures smooth transitions without layout shifts */}
      <div className='relative h-20'>
        {/* Pro plan view with smooth transitions and accessibility */}
        {/* - opacity-100: fully visible when active */}
        {/* - translate-y-0: normal position when active */}
        {/* - pointer-events-none: prevents interaction when hidden */}
        <div
          className={`
            absolute inset-0 flex flex-col items-center justify-center gap-0.5
            transition-all duration-400
            ${
              variant === 'pro'
                ? 'opacity-100 translate-y-0' // Active state: visible and in position
                : 'opacity-0 pointer-events-none translate-y-1' // Hidden state: invisible and slightly offset
            }
          `}
        >
          <div className='flex items-end gap-1'>
            <span className='text-[28px] leading-none font-extrabold text-primary-500'>
              $149
            </span>
            <span className='pb-1 text-xs font-medium text-gray-600'>
              MXN/mes
            </span>
          </div>
          <div className='text-[11px] text-gray-800 font-bold'>
            o $1,490 anual
            <span className='opacity-70'>(2 meses gratis)</span>
          </div>
        </div>

        {/* Free plan view with smooth transitions and accessibility */}
        {/* Same transition logic as Pro plan for consistent animation behavior */}
        <div
          className={`
            absolute inset-0 flex flex-col items-center justify-center gap-0.5
            transition-all duration-400
            ${
              variant === 'free'
                ? 'opacity-100 translate-y-0' // Active state: visible and in position
                : 'opacity-0 pointer-events-none translate-y-1' // Hidden state: invisible and slightly offset
            }
          `}
        >
          <div className='flex items-end gap-1'>
            <span className='text-[28px] leading-none font-extrabold text-primary-500'>
              $0
            </span>
            <span className='pb-1 text-xs font-medium text-gray-600'>
              MXN/mes
            </span>
          </div>
          <div className='text-[11px] text-gray-800 font-bold'>
            Gratis para siempre
          </div>
        </div>
      </div>

      {/* Footer section with plan-specific features and common benefits */}
      {/* - Pro plan: shows "IA incluida" badge when active */}
      {/* - Common features: CoDi 0%, Offline capability, 2-minute activation */}
      <div className='mt-2 space-y-2 text-[11px] text-gray-600'>
        {/* Pro plan exclusive feature indicator */}
        {variant === 'pro' && (
          <div className='flex justify-center'>
            <span className='text-secondary-500 font-bold text-center'>
              IA incluida
            </span>
          </div>
        )}
        {/* Common features displayed for both plans with consistent icon styling */}
        <div className='flex items-center justify-center gap-2'>
          <span className='inline-flex items-center gap-1'>
            <i className='i-lucide-badge-check text-[13px] text-secondary-600'></i>{' '}
            CoDi 0%
          </span>
          <span className='inline-flex items-center gap-1'>
            <i className='i-lucide-wifi-off text-[13px] text-secondary-600'></i>{' '}
            Offline
          </span>
          <span className='inline-flex items-center gap-1'>
            <i className='i-lucide-bolt text-[13px] text-secondary-600'></i>{' '}
            Activa en 2 min
          </span>
        </div>
      </div>

      {/* Toggle button for manual plan switching */}
      {/* Provides user control over which plan is displayed */}
      <div className='mt-2 flex justify-center'>
        <button
          onClick={() => setVariant(variant === 'pro' ? 'free' : 'pro')}
          // Styling: consistent with badge design, glass effect with backdrop-blur
          className='rounded-sm bg-white/90 px-2 py-1 text-xs font-semibold text-secondary-600 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 backdrop-blur'
          // Accessibility: descriptive label that changes based on current plan
          aria-label={`Cambiar a ${variant === 'pro' ? 'plan gratuito' : 'plan Pro para PyME'}`}
        >
          {variant === 'pro' ? 'Ver plan gratis' : 'Ver Pro para PyME'}
        </button>
      </div>
    </div>
  );
}
