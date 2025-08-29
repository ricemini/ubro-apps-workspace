import React, { useEffect, useRef, useState } from 'react';

type Variant = 'pro' | 'free';

function getPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function PriceFlipBadge({
  intervalMs = 4000,
}: {
  intervalMs?: number;
}): React.JSX.Element {
  const [variant, setVariant] = useState<Variant>('pro');
  const [mounted, setMounted] = useState(false);
  const reduced = getPrefersReducedMotion();
  const timer = useRef<number | null>(null);

  // Handle hydration safely
  useEffect(() => {
    setMounted(true);
    const savedVariant = localStorage.getItem('vm_badge_variant') as Variant;
    if (savedVariant) {
      setVariant(savedVariant);
    }
  }, []);

  useEffect(() => {
    if (!mounted || reduced) return; // Respect accessibility and wait for mount
    timer.current = window.setInterval(() => {
      setVariant(v => (v === 'pro' ? 'free' : 'pro'));
    }, intervalMs);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [intervalMs, reduced, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('vm_badge_variant', variant);
    }
  }, [variant, mounted]);

  const onPause = (pause: boolean): void => {
    if (reduced) return;
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
      aria-live='polite'
    >
      {/* Header pill */}
      <div
        className={`
          absolute -top-2 right-3 rounded-full px-2.5 py-0.5 text-[11px] font-medium
          transition-all duration-300
          ${
            variant === 'pro'
              ? 'bg-secondary text-white shadow'
              : 'bg-tertiary/90 text-black'
          }
        `}
      >
        {variant === 'pro' ? 'Plan Pro PyME' : 'Plan Ambulante'}
      </div>

      {/* Price / content */}
      <div className='relative h-20'>
        {/* Pro view */}
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
            <span className='text-[28px] leading-none font-extrabold text-secondary'>
              $149
            </span>
            <span className='pb-1 text-xs font-medium text-secondary'>
              MXN/mes
            </span>
          </div>
          <div className='text-[11px] text-secondar'>
            IA incluida · o $1,490 anual{' '}
            <span className='opacity-70'>(2 meses gratis)</span>
          </div>
        </div>

        {/* Free view */}
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
            <span className='pb-1 text-xs font-medium text-secondary'>
              MXN/mes
            </span>
          </div>
          <div className='text-[11px] text-secondary/70'>
            Gratis para siempre
          </div>
        </div>
      </div>

      {/* Footer ticks (static, both variants) */}
      <div className='mt-2 flex items-center gap-2 text-[11px] text-secondary/70'>
        <span className='inline-flex items-center gap-1'>
          <i className='i-lucide-badge-check text-[13px] text-primary'></i> CoDi
          0%
        </span>
        <span className='inline-flex items-center gap-1'>
          <i className='i-lucide-wifi-off text-[13px] text-primary'></i> Offline
        </span>
        <span className='inline-flex items-center gap-1'>
          <i className='i-lucide-bolt text-[13px] text-primary'></i> Activa en 2
          min
        </span>
      </div>

      {/* Toggle button (optional, manual switch) */}
      <div className='mt-2 flex justify-center'>
        <button
          onClick={() => setVariant(variant === 'pro' ? 'free' : 'pro')}
          className='rounded-full border border-secondary/15 px-2 py-0.5 text-[11px] text-secondary/70 hover:bg-secondary/5'
        >
          {variant === 'pro' ? 'Ver plan gratis' : 'Ver Pro para PyME'}
        </button>
      </div>
    </div>
  );
}
