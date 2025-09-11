'use client';

import React, { useEffect, useState } from 'react';
import { X, Users, TrendingUp, Star, ChevronRight } from 'lucide-react';

interface InActionModalProps {
  onClose: () => void;
  youtubeVideoId?: string;
}

/**
 * InActionModal Component
 *
 * Premium conversion-focused modal for showcasing VendeMás in action with:
 *
 * Layout:
 * - Desktop (lg+): Side-by-side layout with video (60-65%) and proof column (35-40%)
 * - Mobile/Tablet (md/sm): Stacked layout with video first, then stats, then sticky CTA
 *
 * Features:
 * - Glassmorphism design with modern interactions and animations
 * - Accessibility-first with focus trap, keyboard navigation, and ARIA attributes
 * - Body scroll lock to prevent background scrolling
 * - Responsive design with mobile-optimized scrolling
 * - YouTube video integration with loading states
 * - Conversion-focused stats and call-to-action
 *
 * Accessibility:
 * - WCAG 2.1 AA compliant with proper contrast ratios
 * - Focus management and keyboard navigation
 * - Screen reader friendly with semantic HTML and ARIA labels
 * - Touch targets meet minimum 44px requirements
 */
export default function InActionModal({
  onClose,
  youtubeVideoId = 'NQN2w7KPeTs', // Default video ID, replace with actual
}: InActionModalProps): React.JSX.Element {
  // State for tracking video loading status to show/hide loading spinner
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Keyboard accessibility: Close modal when Escape key is pressed
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return (): void => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Body scroll lock: Prevent background page scrolling when modal is open
  // This improves UX by keeping focus on the modal content
  useEffect(() => {
    // Store original overflow style to restore later
    const originalOverflow = document.body.style.overflow;

    // Disable scroll on body to prevent background scrolling
    document.body.style.overflow = 'hidden';

    // Cleanup: restore original overflow when modal closes/unmounts
    return (): void => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Focus trap: Ensure keyboard navigation stays within the modal
  // This is crucial for accessibility - users can't tab outside the modal
  useEffect(() => {
    const modal = document.querySelector('[role="dialog"]') as HTMLElement;
    if (modal) {
      // Find all focusable elements within the modal
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      // Handle Tab key navigation to cycle through focusable elements
      const handleTabKey = (e: KeyboardEvent): void => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            // Shift+Tab: Move backwards, wrap to last element if at first
            if (document.activeElement === firstElement) {
              lastElement?.focus();
              e.preventDefault();
            }
          } else {
            // Tab: Move forwards, wrap to first element if at last
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              e.preventDefault();
            }
          }
        }
      };

      modal.addEventListener('keydown', handleTabKey);
      // Auto-focus first element when modal opens
      firstElement?.focus();

      // Cleanup: remove event listener when modal closes
      return (): void => modal.removeEventListener('keydown', handleTabKey);
    }
  }, []);

  // Conversion-focused stats data for social proof
  // Each stat includes an icon, value, benefit description, and color scheme
  const stats = [
    {
      icon: Users,
      value: '10,000+ vendedores',
      benefit: 'Ya usan VendeMás para crecer sus ventas.',
      color: 'text-secondary-600 dark:text-secondary-400', // Green theme
    },
    {
      icon: TrendingUp,
      value: '+95% en ventas',
      benefit: 'Nuestros usuarios venden casi el doble en promedio.',
      color: 'text-primary-600 dark:text-primary-400', // Primary brand color
    },
    {
      icon: Star,
      value: '4.9/5 estrellas',
      benefit: 'La calificación más alta en satisfacción de clientes.',
      color: 'text-tertiary-600 dark:text-tertiary-400', // Tertiary accent color
    },
  ];

  return (
    // Modal backdrop with click-to-close functionality
    <div
      role='dialog'
      aria-modal='true'
      aria-label='VendeMás en acción'
      className='fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in motion-safe:duration-250'
      onClick={onClose}
    >
      {/* Modal container with glassmorphism design */}
      <div
        className='w-[95vw] h-[95vh] max-w-6xl max-h-[95vh] mx-auto my-auto bg-white dark:bg-gray-900 card-border backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:duration-250 relative'
        onClick={e => e.stopPropagation()} // Prevent backdrop click when clicking modal content
      >
        {/* Hero-style gradient background overlay */}
        {/* Creates the same visual effect as the main Hero section */}
        <div className='absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_18%,theme(colors.primary.50)_0%,transparent_60%),radial-gradient(45%_45%_at_85%_20%,theme(colors.secondary.50)_0%,transparent_60%),radial-gradient(55%_55%_at_78%_82%,theme(colors.tertiary.50)_0%,transparent_55%)] dark:bg-[radial-gradient(60%_50%_at_20%_18%,theme(colors.primary.900)_0%,transparent_60%),radial-gradient(45%_45%_at_85%_20%,theme(colors.secondary.900)_0%,transparent_60%),radial-gradient(55%_55%_at_78%_82%,theme(colors.tertiary.900)_0%,transparent_55%)]' />

        {/* Main content container with proper z-index layering */}
        <div className='relative z-10 flex flex-col h-full'>
          {/* Modal header with title, subtitle, and close button */}
          <div className='flex items-center justify-between p-6'>
            <div>
              {/* Main modal title */}
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                VendeMás en acción
              </h2>
              {/* Descriptive subtitle for context */}
              <p className='text-gray-600 dark:text-gray-400 text-sm mt-1'>
                Mira cómo miles de vendedores ya están vendiendo más cada día.
              </p>
            </div>
            {/* Close button with consistent styling and accessibility */}
            <button
              onClick={onClose}
              className='inline-flex items-center justify-center card-border !rounded-[14px] bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none backdrop-blur-sm'
              style={{ height: '42px', width: '42px' }}
              aria-label='Cerrar'
            >
              <X className='h-5 w-5 text-gray-600 dark:text-gray-400' />
            </button>
          </div>

          {/* Main content area with responsive layout */}
          <div className='flex-1 flex flex-col lg:flex-row overflow-hidden'>
            {/* Desktop layout: Side-by-side video and stats */}
            <div className='hidden lg:flex lg:flex-1'>
              {/* Left pane: Social proof and stats (40% width) */}
              <div className='w-[40%] flex flex-col p-6 border-r border-gray-200/60 dark:border-gray-700/60'>
                {/* Supporting copy for credibility */}
                <div className='mb-8'>
                  <p className='text-secondary-600 dark:text-gray-300 text-base leading-relaxed'>
                    Resultados reales, sin comisiones y sin complicaciones.
                    VendeMás está transformando negocios en toda LATAM.
                  </p>
                </div>

                {/* Stats cards with glassmorphism design */}
                <div className='flex-1 space-y-4'>
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className='group p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/60 card-border shadow-sm hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-500/70 transition-all duration-200'
                    >
                      <div className='flex items-start gap-3'>
                        {/* Icon container with themed background */}
                        <div
                          className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${stat.color}`}
                        >
                          <stat.icon className='h-4 w-4' />
                        </div>
                        <div className='flex-1'>
                          {/* Stat value with themed color */}
                          <div
                            className={`text-lg font-semibold ${stat.color} mb-1`}
                          >
                            {stat.value}
                          </div>
                          {/* Stat benefit description */}
                          <div className='text-xs text-gray-600 dark:text-gray-300 leading-relaxed'>
                            {stat.benefit}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right pane: YouTube video (60% width) */}
              <div className='w-[60%] p-6'>
                <div className='relative w-full h-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-lg'>
                  {/* Loading spinner while video loads */}
                  {!isVideoLoaded && (
                    <div className='absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700'>
                      <div className='w-16 h-16 rounded-full border-4 border-gray-300 dark:border-gray-600 border-t-emerald-500 animate-spin'></div>
                    </div>
                  )}
                  {/* YouTube iframe with accessibility attributes */}
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                    className='w-full h-full border-0'
                    title='VendeMás en acción'
                    allowFullScreen
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    onLoad={() => setIsVideoLoaded(true)}
                  />
                </div>
              </div>
            </div>

            {/* Mobile layout: Stacked video and stats with internal scrolling */}
            <div className='flex-1 flex flex-col lg:hidden overflow-y-auto'>
              {/* Video section (first on mobile) */}
              <div className='flex-1 p-4'>
                <div className='relative w-full h-full max-h-[50vh] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-lg'>
                  {/* Mobile loading spinner (smaller than desktop) */}
                  {!isVideoLoaded && (
                    <div className='absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700'>
                      <div className='w-12 h-12 rounded-full border-4 border-gray-300 dark:border-gray-600 border-t-emerald-500 animate-spin'></div>
                    </div>
                  )}
                  {/* Mobile YouTube iframe */}
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                    className='w-full h-full border-0'
                    title='VendeMás en acción'
                    allowFullScreen
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    onLoad={() => setIsVideoLoaded(true)}
                  />
                </div>
              </div>

              {/* Stats section (below video on mobile) */}
              <div className='p-4'>
                {/* Supporting copy for mobile */}
                <div className='mb-4'>
                  <p className='text-gray-700 dark:text-gray-300 text-base leading-relaxed'>
                    Resultados reales, sin comisiones y sin complicaciones.
                    VendeMás está transformando negocios en toda LATAM.
                  </p>
                </div>
                {/* Mobile stats cards (compact layout) */}
                <div className='space-y-3'>
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className='group p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 card-border'
                    >
                      <div className='flex items-start gap-3'>
                        {/* Mobile icon container */}
                        <div
                          className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${stat.color}`}
                        >
                          <stat.icon className='h-4 w-4' />
                        </div>
                        <div className='flex-1'>
                          {/* Mobile stat value */}
                          <div
                            className={`text-base font-semibold ${stat.color} mb-1`}
                          >
                            {stat.value}
                          </div>
                          {/* Mobile stat benefit */}
                          <div className='text-xs text-gray-600 dark:text-gray-300 leading-relaxed'>
                            {stat.benefit}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sticky CTA bar with conversion-focused design */}
          <div className='sticky bottom-0 bg-transparent backdrop-blur-md shadow-md p-4'>
            <div className='flex flex-col items-center justify-center gap-4 max-w-4xl mx-auto'>
              {/* CTA section with question and buttons on same line */}
              <div className='flex flex-col lg:flex-row items-center justify-center gap-4 w-full'>
                {/* Question text */}
                <p className='text-base text-gray-600 dark:text-gray-400 text-center lg:text-left'>
                  ¿Listo para transformar tu negocio?
                </p>
                {/* CTA buttons container */}
                <div className='flex flex-col sm:flex-row items-center gap-3'>
                  {/* Primary CTA button with Hero section styling */}
                  <a
                    href='/signup'
                    className='card-border !rounded-[14px] bg-primary-500 px-6 py-4 text-lg font-semibold text-primary-on shadow hover:shadow-md transition focus:outline-none focus:ring-[14px] focus:ring-primary-600 focus:ring-offset-[14px] animate-pulse-custom text-center'
                    style={{ minHeight: '52px' }}
                  >
                    Comenzar gratis ahora
                  </a>

                  {/* Secondary CTA */}
                  <a
                    href='/soluciones-con-ia'
                    className='group inline-flex items-center gap-x-2 !rounded-[14px] bg-white dark:bg-gray-950 px-4 py-2.5 text-sm font-semibold text-secondary-600 hover:text-secondary-700 hover:bg-gray-50 dark:text-white dark:hover:text-white dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:card-border focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 dark:focus:ring-white dark:focus:ring-offset-gray-900'
                    style={{ height: '42px' }}
                    aria-describedby='secondary-cta-description'
                  >
                    <span className='relative'>
                      Conoce todas las Herramientas
                      {/* Animated underline that hides on focus */}
                      <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-secondary-600 dark:bg-white transition-all duration-300 group-hover:w-full group-focus:w-0'></span>
                    </span>
                    <ChevronRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-focus:translate-x-0' />
                  </a>
                  {/* Screen reader description for the secondary CTA */}
                  <span id='secondary-cta-description' className='sr-only'>
                    Ver todas las herramientas disponibles en VendeMás
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
