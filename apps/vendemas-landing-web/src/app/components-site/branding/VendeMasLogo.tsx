'use client';

import * as React from 'react';
import clsx from 'clsx';

// Remove empty interface declaration

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'navbar-sm' | 'navbar-md';

export interface VendeMasLogoProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Overall scale */
  size?: Size;
  /** Wrap in a link to "/" for nav usage */
  asLink?: boolean;
  /** Override aria-label if needed */
  label?: string;
  /** Show small V$ icon instead of full VendeMá$ */
  isSmall?: boolean;
  /** Use navbar-optimized sizing */
  navbar?: boolean;
}

/** Brand tokens (keep in sync with your Tailwind theme) */
const COLORS = {
  primary: 'text-primary-500', // green (for $)
  secondary: 'text-secondary-500', // navy (headline)
  tertiary: 'text-tertiary-500', // orange (icon)
};

const SIZE_MAP: Record<
  Size,
  { vende: number; mas: number; dollar: number; icon: number }
> = {
  xs: { vende: 28, mas: 26, dollar: 40, icon: 34 },
  sm: { vende: 28, mas: 26, dollar: 40, icon: 34 },
  md: { vende: 40, mas: 36, dollar: 56, icon: 48 },
  lg: { vende: 56, mas: 50, dollar: 80, icon: 68 },
  xl: { vende: 72, mas: 64, dollar: 96, icon: 84 },
  'navbar-sm': { vende: 24, mas: 22, dollar: 24, icon: 24 },
  'navbar-md': { vende: 26, mas: 24, dollar: 26, icon: 26 },
};

/**
 * VendeMás brand logo – text + optional shop icon.
 * Colors pulled from Tailwind tokens: secondary (text), primary ($), tertiary (icon).
 */
export function VendeMasLogo({
  size = 'md',
  asLink = false,
  label = 'VendeMás — inicio',
  isSmall = false,
  navbar = false,
  className,
  ...rest
}: VendeMasLogoProps): React.JSX.Element {
  // Use navbar-optimized sizing when navbar prop is true
  const effectiveSize = navbar ? 'navbar-md' : size;
  const s = SIZE_MAP[effectiveSize];

  // Responsive logic: use isSmall prop, but on large screens always show full logo
  const shouldShowSmall = isSmall;

  // Always use card layout with VendeMá$ or V$ variants
  const cardContent = (
    <div
      className={clsx(
        'inline-block select-none leading-none',
        '[text-rendering:geometricPrecision] [font-smoothing:antialiased]',
        'bg-white dark:bg-secondary-800 card-border !rounded-[14px] px-4 z-50'
      )}
      style={{ height: '42px', display: 'flex', alignItems: 'center' }}
      aria-label={label}
      {...rest}
    >
      {/* V$ layout - shown when small, hidden on large screens */}
      <div className={shouldShowSmall ? 'block lg:hidden' : 'hidden'}>
        <span
          className={clsx(
            'font-avenir-next-rounded font-extrabold',
            COLORS.tertiary
          )}
          style={{
            fontSize: `${s.vende}px`,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          V
        </span>
        <span
          aria-hidden
          className={clsx('font-quicksand font-bold italic', COLORS.primary)}
          style={{
            fontSize: `${s.vende}px`,
            lineHeight: 1,
            textShadow: '0 1px 0 rgba(0,0,0,0.15)',
          }}
        >
          $
        </span>
      </div>

      {/* VendeMá$ layout - shown when not small OR on large screens */}
      <div className={!shouldShowSmall ? 'block' : 'hidden lg:block'}>
        <span
          className={clsx(
            'font-avenir-next-rounded font-extrabold',
            COLORS.tertiary
          )}
          style={{
            fontSize: `${s.vende}px`,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          V
        </span>
        <span
          className={clsx(
            'font-avenir-next-rounded font-extrabold',
            COLORS.secondary,
            'dark:text-white'
          )}
          style={{
            fontSize: `${s.vende}px`,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          endeMá
        </span>
        <span
          aria-hidden
          className={clsx('font-quicksand font-bold italic', COLORS.primary)}
          style={{
            fontSize: `${s.vende}px`,
            lineHeight: 1,
            textShadow: '0 1px 0 rgba(0,0,0,0.15)',
          }}
        >
          $
        </span>
      </div>
    </div>
  );

  if (asLink) {
    return (
      <a
        href='/'
        aria-label={label}
        className={clsx('inline-block', className)}
      >
        {cardContent}
      </a>
    );
  }
  return <div className={className}>{cardContent}</div>;
}

export default VendeMasLogo;
