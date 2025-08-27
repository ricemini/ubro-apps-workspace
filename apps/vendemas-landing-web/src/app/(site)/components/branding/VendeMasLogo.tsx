'use client';

import * as React from 'react';
import clsx from 'clsx';
import { Store } from 'lucide-react';

// Remove empty interface declaration

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type IconVariant = 'inline' | 'lucide';

export interface VendeMasLogoProps extends React.HTMLAttributes<any> {
  /** Overall scale */
  size?: Size;
  /** Show the little shop icon */
  withIcon?: boolean;
  /** Which shop icon to render */
  iconVariant?: IconVariant;
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
  xs: { vende: 20, mas: 18, dollar: 28, icon: 32 },
  sm: { vende: 28, mas: 26, dollar: 40, icon: 34 },
  md: { vende: 40, mas: 36, dollar: 56, icon: 48 },
  lg: { vende: 56, mas: 50, dollar: 80, icon: 68 },
  xl: { vende: 72, mas: 64, dollar: 96, icon: 84 },
};

/** Inline SVG awning with scalloped bottom and side supports */
function ShopInlineSVG(): React.JSX.Element {
  return (
    <svg
      viewBox='0 0 100 40'
      width='100%'
      height='auto'
      role='img'
      aria-label='Tienda'
      className='pointer-events-none'
    >
      {/* Main awning shape with straight top and wavy bottom */}
      <path
        d='M10 8 L90 8
           C85 8, 80 12, 75 12
           C70 12, 65 8, 60 8
           C55 8, 50 12, 45 12
           C40 12, 35 8, 30 8
           C25 8, 20 12, 15 12
           C10 12, 5 8, 10 8 Z'
        fill='none'
        stroke='currentColor'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />

      {/* Left side vertical support */}
      <path
        d='M10 8 L10 20'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />

      {/* Right side vertical support */}
      <path
        d='M90 8 L90 20'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  );
}

/**
 * VendeMás brand logo – text + optional shop icon.
 * Colors pulled from Tailwind tokens: secondary (text), primary ($), tertiary (icon).
 */
export function VendeMasLogo({
  size = 'md',
  withIcon = true,
  iconVariant = 'lucide',
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
          'flex items-center gap-2 select-none leading-none',
          '[text-rendering:geometricPrecision] [font-smoothing:antialiased]',
          className
        )}
        aria-label={label}
        {...rest}
      >
        {/* Left side: Store icon with $ overlay */}
        <div className='relative'>
          {withIcon && (
            <div className={COLORS.tertiary}>
              <Store
                width={s.icon}
                height={s.icon}
                stroke='currentColor'
                strokeWidth={1.5}
                className='pointer-events-none'
              />
            </div>
          )}
          {/* Green $ in front of store icon */}
          <span
            aria-hidden
            className={clsx(
              'absolute inset-0 flex items-center justify-center font-quicksand font-bold italic mt-1',
              COLORS.primary
            )}
            style={{
              fontSize: `${s.dollar * 0.6}px`,
              lineHeight: 0.9,
              textShadow: '0 1px 0 rgba(0,0,0,0.15)',
            }}
          >
            $
          </span>
        </div>

        {/* Right side: VendeMás text */}
        <span
          className={clsx(
            'font-avenir-next-rounded font-extrabold',
            COLORS.secondary
          )}
          style={{ fontSize: `${s.vende}px`, letterSpacing: '-0.02em' }}
        >
          VendeMás
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

  // Original layout for other sizes
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
      {/* Store icon roof - absolutely positioned */}
      {withIcon && (
        <div className='absolute top-0 left-0 w-full z-0'>
          {iconVariant === 'inline' ? (
            <div className={COLORS.tertiary} style={{ width: '100%' }}>
              <ShopInlineSVG />
            </div>
          ) : (
            <div className={COLORS.tertiary} style={{ width: '100%' }}>
              <Store
                width={s.icon}
                height={s.icon}
                stroke='currentColor'
                strokeWidth={1.5}
                className='pointer-events-none'
              />
            </div>
          )}
        </div>
      )}

      {/* Second row: Two columns */}
      <div
        className='flex items-end w-full relative z-10 px-10 mt-8'
        style={{ paddingTop: withIcon ? `${s.icon * 0.3}px` : '0px' }}
      >
        {/* First column: Vende and Más stacked vertically */}
        <div className='flex flex-col flex-1'>
          <span
            className={clsx(
              'block font-avenir-next-rounded font-extrabold',
              COLORS.secondary
            )}
            style={{ fontSize: `${s.vende}px`, letterSpacing: '-0.02em' }}
          >
            Vende
          </span>
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
            fontSize: `${s.dollar}px`,
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
