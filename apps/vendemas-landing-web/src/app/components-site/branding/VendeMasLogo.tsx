'use client';

import * as React from 'react';
import clsx from 'clsx';

// Remove empty interface declaration

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface VendeMasLogoProps extends React.HTMLAttributes<any> {
  /** Overall scale */
  size?: Size;
  /** Wrap in a link to "/" for nav usage */
  asLink?: boolean;
  /** Override aria-label if needed */
  label?: string;
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
};

/**
 * VendeMás brand logo – text + optional shop icon.
 * Colors pulled from Tailwind tokens: secondary (text), primary ($), tertiary (icon).
 */
export function VendeMasLogo({
  size = 'md',
  asLink = false,
  label = 'VendeMás — inicio',
  className,
  ...rest
}: VendeMasLogoProps): React.JSX.Element {
  const s = SIZE_MAP[size];

  // Special layout for xs size
  if (size === 'xs') {
    const xsContent = (
      <div
        className={clsx(
          'inline-block select-none leading-none',
          '[text-rendering:geometricPrecision] [font-smoothing:antialiased]',
          className
        )}
        aria-label={label}
        {...rest}
      >
        {/* Single line: V$ */}
        <span
          className={clsx(
            'font-avenir-next-rounded font-extrabold',
            COLORS.tertiary
          )}
          style={{
            fontSize: `${SIZE_MAP.sm.vende}px`,
            letterSpacing: '-0.02em',
          }}
        >
          V
        </span>
        <span
          aria-hidden
          className={clsx('font-quicksand font-bold italic', COLORS.primary)}
          style={{
            fontSize: `${SIZE_MAP.sm.vende}px`,
            lineHeight: 0.9,
            textShadow: '0 1px 0 rgba(0,0,0,0.15)',
          }}
        >
          $
        </span>
      </div>
    );

    if (asLink) {
      return (
        <a href='/' aria-label={label} className='inline-block'>
          {xsContent}
        </a>
      );
    }
    return xsContent;
  }

  // Layout for sm size (single line)
  if (size === 'sm') {
    const smContent = (
      <div
        className={clsx(
          'inline-block select-none leading-none',
          '[text-rendering:geometricPrecision] [font-smoothing:antialiased]',
          className
        )}
        aria-label={label}
        {...rest}
      >
        {/* Single line: VendeMá$ */}
        <span
          className={clsx(
            'font-avenir-next-rounded font-extrabold',
            COLORS.tertiary
          )}
          style={{ fontSize: `${s.vende}px`, letterSpacing: '-0.02em' }}
        >
          V
        </span>
        <span
          className={clsx(
            'font-avenir-next-rounded font-extrabold',
            COLORS.secondary
          )}
          style={{ fontSize: `${s.vende}px`, letterSpacing: '-0.02em' }}
        >
          endeMá
        </span>
        <span
          aria-hidden
          className={clsx('font-quicksand font-bold italic', COLORS.primary)}
          style={{
            fontSize: `${s.vende}px`,
            lineHeight: 0.9,
            textShadow: '0 1px 0 rgba(0,0,0,0.15)',
          }}
        >
          $
        </span>
      </div>
    );

    if (asLink) {
      return (
        <a href='/' aria-label={label} className='inline-block'>
          {smContent}
        </a>
      );
    }
    return smContent;
  }

  // Original layout for other sizes (md, lg, xl)
  const content = (
    <div
      className={clsx(
        'relative inline-block select-none leading-none',
        // helps crispness on retina
        '[text-rendering:geometricPrecision] [font-smoothing:antialiased]',
        className
      )}
      aria-label={label}
      {...rest}
    >
      {/* Text content */}
      <div className='flex items-end w-full relative z-10 px-10'>
        {/* First column: Vende and Más stacked vertically */}
        <div className='flex flex-col flex-1'>
          <div className='flex'>
            <span
              className={clsx(
                'font-avenir-next-rounded font-extrabold',
                COLORS.tertiary
              )}
              style={{ fontSize: `${s.vende}px`, letterSpacing: '-0.02em' }}
            >
              V
            </span>
            <span
              className={clsx(
                'font-avenir-next-rounded font-extrabold',
                COLORS.secondary
              )}
              style={{ fontSize: `${s.vende}px`, letterSpacing: '-0.02em' }}
            >
              ende
            </span>
          </div>
          <div className='flex justify-end'>
            <span
              className={clsx(
                'block font-avenir-next-rounded font-extrabold',
                COLORS.secondary
              )}
              style={{
                fontSize: `${s.mas}px`,
                letterSpacing: '-0.02em',
              }}
            >
              Má
            </span>
          </div>
        </div>

        {/* Second column: Green $ - full height */}
        <span
          aria-hidden
          className={clsx('font-quicksand font-bold italic', COLORS.primary)}
          style={{
            fontSize: `${s.vende}px`,
            lineHeight: 0.9,
            // tiny shadow for edge crispness on light BGs
            textShadow: '0 1px 0 rgba(0,0,0,0.15)',
          }}
        >
          $
        </span>
      </div>
    </div>
  );

  if (asLink) {
    // Lazy import avoids Next.js "use client" constraints in some layouts
    return (
      <a href='/' aria-label={label} className='inline-block'>
        {content}
      </a>
    );
  }
  return content;
}

export default VendeMasLogo;
