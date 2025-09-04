import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * SecondaryCTA Component Props
 */
interface SecondaryCTAProps {
  text: string;
  url: string;
  description?: string;
}

/**
 * SecondaryCTA Component
 *
 * A reusable secondary call-to-action link component that provides an elegant
 * text-based CTA with hover animations and accessibility features. Designed
 * to complement primary CTAs by offering alternative actions like "learn more"
 * or "see demo" options.
 *
 * Key Features:
 * - Customizable text and URL for maximum flexibility
 * - Animated underline effect on hover
 * - Chevron icon with smooth translation animation
 * - Full dark mode support with proper contrast
 * - Accessibility-first design with ARIA labels
 * - Focus management with visible indicators
 * - Responsive design that works on all screen sizes
 *
 * Visual Design:
 * - Clean text link with subtle hover effects
 * - Animated underline that grows from left to right
 * - Chevron icon that slides right on hover
 * - Proper color contrast in both light and dark modes
 * - Smooth transitions for all interactive states
 *
 * Accessibility:
 * - Screen reader friendly with proper ARIA descriptions
 * - Keyboard navigation support
 * - Focus indicators for keyboard users
 * - High contrast design for better visibility
 * - Semantic HTML structure
 *
 * Usage Examples:
 * - "Learn more" links
 * - "See demo" actions
 * - "View features" navigation
 * - Any secondary action that complements primary CTAs
 */
export default function SecondaryCTA({
  text,
  url,
  description = 'Enlace para ver más información',
}: SecondaryCTAProps): JSX.Element {
  return (
    <>
      {/* Secondary CTA: Learn more link with hover effects */}
      <a
        href={url}
        className='group inline-flex items-center gap-x-2 text-sm font-semibold text-secondary-600 hover:text-secondary-700 transition-all duration-300 dark:text-white dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 focus:rounded-lg dark:focus:ring-white dark:focus:ring-offset-gray-900'
        aria-describedby='secondary-cta-description'
      >
        <span className='relative'>
          {text}
          {/* Animated underline that hides on focus */}
          <span className='absolute -bottom-0.5 left-0 h-0.5 w-0 bg-secondary-600 transition-all duration-300 group-hover:w-full dark:bg-white dark:group-hover:bg-white group-focus-within:hidden group-focus:hidden'></span>
        </span>
        {/* Chevron icon with hover animation */}
        <ChevronRight
          aria-hidden='true'
          className='size-4 transition-transform duration-300 group-hover:translate-x-1'
        />
      </a>
      {/* Screen reader description for the secondary CTA */}
      <span id='secondary-cta-description' className='sr-only'>
        {description}
      </span>
    </>
  );
}
