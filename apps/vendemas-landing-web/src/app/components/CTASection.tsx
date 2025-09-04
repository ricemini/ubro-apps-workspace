import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * CTASection Component Props
 */
interface CTASectionProps {
  trackCTAClick: (
    ctaType: 'primary' | 'secondary' | 'trial' | 'contact',
    location: string,
    additionalData?: Record<string, unknown>
  ) => void;
  buttonText?: string;
  showTrustMessage?: boolean;
}

/**
 * CTASection Component
 *
 * A comprehensive call-to-action section that provides both mobile and desktop
 * CTA experiences. Features a sticky mobile CTA for small screens and a
 * prominent desktop CTA with optional trust messaging.
 *
 * Key Features:
 * - Dual CTA system: mobile sticky + desktop prominent button
 * - Mobile-first responsive design with sticky positioning
 * - Customizable button text and trust message visibility
 * - Analytics tracking for all CTA interactions
 * - Smooth hover animations and accessibility support
 * - Gradient backgrounds with hover effects
 * - Optional trust messaging to reduce friction
 *
 * Mobile Experience:
 * - Fixed bottom CTA that stays visible while scrolling
 * - Full-width button with proper touch targets
 * - High contrast design for mobile visibility
 *
 * Desktop Experience:
 * - Centered prominent button with gradient background
 * - Hover animations with scale and shadow effects
 * - Optional trust messaging below the button
 * - Pulse animation to draw attention
 *
 * Accessibility:
 * - Proper ARIA labels for screen readers
 * - Keyboard navigation support
 * - Focus management with visible indicators
 * - High contrast design for better visibility
 */
export default function CTASection({
  trackCTAClick,
  buttonText = 'Únete gratis a 10,000+ vendedores',
  showTrustMessage = true,
}: CTASectionProps): React.JSX.Element {
  return (
    <>
      {/* Mobile Sticky CTA - Ensures conversion opportunity on small screens */}
      <div className='block sm:hidden fixed bottom-4 left-4 right-4 z-50'>
        <button
          type='button'
          className='w-full bg-gradient-primary text-white font-semibold px-6 py-4 rounded-xl shadow-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2'
          aria-label='Comenzar a usar VendeMás de forma gratuita'
          onClick={() => trackCTAClick('primary', 'value_props_mobile_cta')}
        >
          Comenzar gratis
          <ArrowRight className='h-5 w-5' />
        </button>
      </div>

      {/* Secondary CTA Button - Quick start action with animated arrow */}
      <div className='text-center'>
        {/* Quick start button with hover animations and accessibility */}
        <button
          type='button'
          className='group rounded-full bg-gradient-to-r from-secondary-500 to-secondary-600 dark:bg-gradient-primary px-8 py-4 text-base font-semibold text-white shadow-xs inset-ring inset-ring-secondary-300 dark:inset-ring-primary-300 hover:opacity-90 flex items-center gap-3 mx-auto transition-all duration-200 animate-pulse-custom'
          aria-label='Comenzar a usar VendeMás de forma gratuita en minutos'
          onClick={() => trackCTAClick('secondary', 'value_props_quick_start')}
        >
          {/* Button text - Clear call to action */}
          {buttonText}
          {/* Animated arrow icon - Grows and moves on hover for visual feedback */}
          <ArrowRight className='h-5 w-5 transition-all duration-200 group-hover:scale-110 group-hover:translate-x-0.5' />
        </button>

        {/* Trust and urgency messaging - Addresses common concerns */}
        {showTrustMessage && (
          <p className='mt-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto'>
            Sin costos ocultos, sin permanencia. Comienza a usar VendeMás hoy
            mismo.
          </p>
        )}
      </div>
    </>
  );
}
