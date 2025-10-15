'use client';

import { ArrowRight } from 'lucide-react';

interface PrimaryCTAProps {
  text: string;
  href: string;
  className?: string;
  onClick?: () => void;
  analytics?: string;
  ariaLabel?: string;
}

/**
 * PrimaryCTA Component
 *
 * A reusable primary call-to-action button component that provides consistent
 * styling and behavior across the application. Features gradient background,
 * hover animations, and accessibility support.
 *
 * Key Features:
 * - Consistent gradient styling with brand colors
 * - Animated arrow icon with hover effects
 * - Full accessibility support with ARIA labels
 * - Customizable text, href, and styling
 * - Analytics tracking support
 * - Responsive design
 *
 * Visual Design:
 * - Gradient background from primary to tertiary colors
 * - Animated shimmer effect on hover
 * - Arrow icon that moves on hover
 * - Scale and shadow effects for premium feel
 *
 * Accessibility:
 * - Proper ARIA labels for screen readers
 * - Keyboard navigation support
 * - Focus indicators
 * - High contrast design
 */
export default function PrimaryCTA({
  text,
  href,
  className = '',
  onClick,
  analytics,
  ariaLabel,
}: PrimaryCTAProps): React.JSX.Element {
  const handleClick = (): void => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <a
      href={href}
      className={`group relative inline-flex w-full h-14 items-center justify-center rounded-2xl font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden ${className}`}
      style={{
        backgroundImage: 'linear-gradient(135deg, #2f7d32 0%, #8b5cf6 100%)',
      }}
      onClick={handleClick}
      data-analytics={analytics}
      aria-label={ariaLabel || `Botón para ${text}`}
    >
      {/* Animated background overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700' />

      {/* Button content */}
      <span className='relative z-10 flex items-center space-x-2'>
        <span>{text}</span>
        <ArrowRight
          className='w-5 h-5 transition-transform duration-300 group-hover:translate-x-1'
          aria-hidden='true'
        />
      </span>
    </a>
  );
}
