'use client';

import React, { useState, useEffect } from 'react';
import { Smartphone, QrCode, TrendingUp } from 'lucide-react';
import CTASection from './CTASection';
import SecondaryCTA from './SecondaryCTA';
import { useAnalytics } from '../../hooks/useAnalytics';

/**
 * HowItWorks Component - Step-by-step guide with cyclic animation
 *
 * Displays a step-by-step guide showing how VendeMás works with an engaging
 * cyclic animation that highlights each step in sequence. Features a modern
 * single-card design with animated elements and comprehensive dark mode support.
 *
 * Key Features:
 * - Cyclic animation that cycles through steps every 2 seconds
 * - Single full-width card design with elegant styling
 * - Icons positioned at the top of each step with step numbers in circles
 * - Animated elements: icons, titles, descriptions, and highlight badges
 * - Responsive design with mobile-first approach
 * - Full dark mode support with proper contrast
 * - Analytics tracking for user interactions
 * - Dual CTA system: primary button + secondary link
 *
 * Animation System:
 * - Uses React state to track active step (0, 1, 2, cycles back to 0)
 * - 2-second intervals between step changes
 * - Smooth 500ms transitions for all animated elements
 * - Active step gets secondary color treatment and enhanced styling
 * - Respects user's motion preferences for accessibility
 *
 * Steps:
 * - Step 1: Download app (Smartphone icon)
 * - Step 2: Generate QR code (QrCode icon)
 * - Step 3: Track sales (TrendingUp icon)
 *
 * Components Used:
 * - CTASection: Call-to-action section with primary buttons
 * - SecondaryCTA: Additional call-to-action elements
 * - useAnalytics: Analytics tracking for user interactions
 *
 * Accessibility:
 * - Semantic HTML structure with proper ARIA labels
 * - Screen reader friendly content
 * - Keyboard navigation support
 * - Respects user motion preferences
 */
export default function HowItWorks(): React.JSX.Element {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { trackCTAClick } = useAnalytics();
  const steps = [
    {
      step: '1',
      icon: Smartphone,
      title: 'Escanea tu menú y la IA hace el trabajo',
      description:
        'Toma una foto y tu catálogo se genera en segundos — sin teclear nada y sin complicaciones.',
      highlight: 'IA integrada',
    },
    {
      step: '2',
      icon: QrCode,
      title: 'Cobra al instante con QR, sin pagar comisiones',
      description:
        'Genera un código único por venta y recibe tu dinero directo en la app bancaria.',
      highlight: '0% comisiones',
    },
    {
      step: '3',
      icon: TrendingUp,
      title: 'Vende sin internet, sigue ganando siempre',
      description:
        'Aunque no tengas conexión, tus ventas quedan guardadas y se sincronizan después.',
      highlight: 'Funciona offline',
    },
  ];

  // Cyclic animation effect - respects user's motion preferences and pause state
  useEffect(() => {
    // Check if user prefers reduced motion
    let prefersReducedMotion = false;
    try {
      prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
    } catch {
      // If matchMedia is not available, default to not preferring reduced motion
      prefersReducedMotion = false;
    }

    // Only start animation if user doesn't prefer reduced motion and animation is not paused
    if (prefersReducedMotion || isPaused) {
      return; // Exit early if user prefers reduced motion or animation is paused
    }

    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
    }, 2000); // Change every 2 seconds

    return (): void => clearInterval(interval);
  }, [steps.length, isPaused]);

  return (
    <section
      id='como-funciona'
      role='region'
      aria-label='Cómo funciona VendeMás'
      className='py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            ¿Cómo funciona VendeMás?
          </h2>
          <p className='text-body text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8'>
            Configura tu negocio en 3 simples pasos y empieza a vender más
          </p>
          <div className='inline-flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium'>
            <span className='w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mr-2'></span>
            Rápido, sin comisiones y hasta sin internet.
          </div>
        </div>

        {/* Steps - Single Full Width Card */}
        <div className='bg-white dark:bg-gray-800 card-border overflow-hidden mb-16 relative'>
          {/* ARIA live region for screen reader announcements */}
          <div
            aria-live='polite'
            aria-atomic='true'
            role='status'
            className='sr-only'
          >
            {steps[activeStep] &&
              `Paso ${activeStep + 1}: ${steps[activeStep].title}`}
          </div>

          {/* Modern Animation Control Button - Top Right */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className='absolute top-6 right-6 z-10 group'
            aria-label={isPaused ? 'Reanudar animación' : 'Pausar animación'}
          >
            <div className='relative'>
              {/* Background circle with subtle shadow */}
              <div className='w-12 h-12 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 dark:border-gray-500/70 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-focus:ring-2 group-focus:ring-primary-500 group-focus:ring-offset-2'>
                {/* Icon with smooth transition */}
                <div className='transition-all duration-300 group-hover:scale-110'>
                  {isPaused ? (
                    <svg
                      className='w-5 h-5 text-primary-600 dark:text-primary-300'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M8 5v14l11-7z' />
                    </svg>
                  ) : (
                    <svg
                      className='w-5 h-5 text-primary-600 dark:text-primary-300'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M6 4h4v16H6V4zm8 0h4v16h-4V4z' />
                    </svg>
                  )}
                </div>
              </div>

              {/* Subtle tooltip on hover */}
              <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none'>
                <div className='bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded-md whitespace-nowrap'>
                  {isPaused ? 'Reanudar' : 'Pausar'}
                </div>
              </div>
            </div>
          </button>

          <div className='relative'>
            {/* Background gradient */}
            <div className='absolute inset-0 bg-gradient-to-r from-primary-50 via-white to-tertiary-50 dark:from-primary-900/20 dark:via-gray-800 dark:to-tertiary-900/20 opacity-50'></div>

            {/* Steps content */}
            <div className='relative p-8 lg:p-12'>
              <div className='grid lg:grid-cols-3 gap-8 lg:gap-12'>
                {steps.map((stepData, index) => {
                  const isActive = activeStep === index;

                  return (
                    <div key={index} className='relative group'>
                      {/* Icon - centered where number square was */}
                      <div className='flex justify-center mb-6'>
                        <div className='relative'>
                          <div
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ${
                              isActive
                                ? 'bg-gradient-to-br from-primary-500 to-primary-600 scale-105 shadow-xl'
                                : 'bg-gradient-to-br from-primary-100 to-primary-200'
                            }`}
                          >
                            <stepData.icon
                              className={`h-8 w-8 transition-colors duration-500 ${
                                isActive ? 'text-white' : 'text-primary-600'
                              }`}
                              aria-hidden='true'
                              role='img'
                              aria-label={`Icono para ${stepData.title}`}
                            />
                          </div>
                          {/* Step number circle */}
                          <div
                            className={`absolute -top-2 -left-2 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-all duration-500 ${
                              isActive
                                ? 'bg-secondary-500 border-2 border-secondary-500 text-white'
                                : 'bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'
                            }`}
                          >
                            <span
                              className={stepData.step === '1' ? '-ml-0.5' : ''}
                            >
                              {stepData.step}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Title - centered */}
                      <div className='text-center mb-6'>
                        <h3
                          className={`text-display text-2xl font-bold transition-colors duration-300 ${
                            isActive
                              ? 'text-primary-600'
                              : 'text-gray-900 dark:text-white'
                          }`}
                        >
                          {stepData.title}
                        </h3>
                      </div>

                      {/* Content */}
                      <div className='space-y-4'>
                        <p
                          className={`text-body leading-relaxed text-lg transition-colors duration-300 ${
                            isActive
                              ? 'text-gray-800 dark:text-gray-200'
                              : 'text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          {stepData.description}
                        </p>

                        {/* Highlight badge */}
                        <div
                          className={`flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold shadow-sm transition-all duration-300 w-full ${
                            isActive
                              ? 'bg-gradient-to-r from-tertiary-200 to-tertiary-300 text-tertiary-900 dark:from-secondary-500 dark:to-secondary-600 dark:text-white'
                              : 'bg-gradient-to-r from-tertiary-100 to-tertiary-200 text-tertiary-800 dark:from-secondary-400 dark:to-secondary-500 dark:text-white'
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full mr-2 transition-colors duration-300 ${
                              isActive
                                ? 'bg-tertiary-600 dark:bg-white'
                                : 'bg-tertiary-500 dark:bg-white'
                            }`}
                          ></span>
                          {stepData.highlight}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='flex flex-col sm:flex-row items-baseline justify-center gap-4 sm:gap-8'>
          <CTASection
            trackCTAClick={trackCTAClick}
            buttonText='Empieza gratis en minutos'
            showTrustMessage={false}
          />

          {/* Secondary CTA */}
          <SecondaryCTA
            text='Ver VendeMás en acción'
            url='vendemas-en-accion'
            description='Enlace para ver una demostración de VendeMás en acción'
          />
        </div>
      </div>
    </section>
  );
}
