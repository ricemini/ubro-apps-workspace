'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import HeroBackground from './HeroBackground';
import TrustStrip, { RiskReducers } from './trust/TrustStrip';
import AggregateRatingJsonLd from './seo/AggregateRatingJsonLd';
import PriceFlipBadge from './price-flip-badge/PriceFlipBadge';

/**
 * Hero Component - Main landing section with primary CTA and value proposition
 *
 * Features:
 * - Responsive grid layout (1 column on mobile, 2 columns on desktop)
 * - Accessibility: skip links, ARIA labels, focus management, screen reader support
 * - Dark mode support with high contrast and consistent theming
 * - Motion-safe animations respecting user preferences and accessibility settings
 * - SEO: structured data for ratings and search engine optimization
 * - Dynamic PriceFlipBadge positioning synchronized with navbar scroll behavior
 * - Interactive elements with proper hover states and focus management
 *
 * Scroll Behavior:
 * - At top: PriceFlipBadge positioned at top-left for prominent visibility
 * - After 10px scroll: PriceFlipBadge moves to bottom-left, synchronized with navbar changes
 * - Smooth transitions for all positioning changes with consistent timing
 *
 * Responsive Design:
 * - Mobile-first approach with progressive enhancement
 * - Optimized spacing and typography across all breakpoints
 * - Consistent visual hierarchy maintained across screen sizes
 */
export default function Hero(): React.JSX.Element {
  // State for detecting scroll position to adjust PriceFlipBadge positioning
  // This enables synchronized behavior with the navbar scroll effects
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect to detect scroll position and update badge positioning accordingly
  // Synchronized with navbar behavior: same 10px threshold for consistency
  // This ensures the badge and navbar respond to scroll events simultaneously
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Same threshold as navbar for synchronized behavior
      // 10px provides immediate feedback without being too sensitive
      setIsScrolled(scrollTop > 10);
    };

    // Add scroll listener for real-time updates
    // Listens to window scroll events for responsive positioning
    window.addEventListener('scroll', handleScroll);

    // Cleanup: remove listener to prevent memory leaks
    // Essential for performance and preventing multiple event listeners
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Main hero section with proper semantic role and accessibility
    // role="banner" identifies this as the main site header for screen readers
    <header className='relative isolate overflow-hidden' role='banner'>
      {/* Skip link for keyboard navigation - appears only on focus */}
      {/* Provides quick access to main content for keyboard and screen reader users */}
      {/* sr-only hides it visually but keeps it accessible to assistive technology */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-primary-600'
      >
        Saltar al contenido principal
      </a>

      {/* Decorative background with aurora effects and scrim for text legibility */}
      <HeroBackground />

      {/* Main content container with responsive padding and semantic structure */}
      {/* Bottom padding accommodates PriceFlipBadge when positioned at bottom on large screens */}
      {/* - Horizontal padding: responsive from 24px on mobile to 48px on large screens */}
      {/* - Vertical padding: responsive top padding, bottom padding prevents badge overlap */}
      <div
        className='mx-auto max-w-7xl px-6 sm:pt-2 md:pt-4 lg:pt-12 pb-8 lg:pb-16'
        id='main-content'
        tabIndex={-1}
        role='main'
      >
        {/* Responsive grid: stacked on mobile, side-by-side on desktop */}
        {/* - Mobile: single column layout for optimal readability */}
        {/* - Desktop: two-column layout for better content distribution */}
        <div className='grid items-start gap-6 lg:grid-cols-2'>
          {/* LEFT COLUMN: Main copy and CTAs */}
          <div className='relative z-20 mt-24'>
            {/* Primary headline with gradient text effect */}
            <h1 className='font-display text-display text-5xl md:text-6xl leading-tight text-secondary-500'>
              <span>Todo tu negocio, </span>
              <span
                className='
                  bg-gradient-to-r from-secondary-700 via-secondary-600 via-primary-600 to-tertiary-500
                  bg-clip-text text-transparent
                  supports-[color-contrast(high)]:bg-secondary-700 supports-[color-contrast(high)]:bg-clip-text supports-[color-contrast(high)]:text-transparent
                '
              >
                impulsado por IA
              </span>
            </h1>

            {/* Subtitle with high contrast support */}
            <p className='mt-3 font-display text-2xl text-primary-600 supports-[color-contrast(high)]:text-primary-800 dark:supports-[color-contrast(high)]:text-primary-200'>
              Vende más, sin complicarte.
            </p>

            {/* Description text with responsive sizing and high contrast support */}
            <p className='mt-3 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400 supports-[color-contrast(high)]:text-gray-700 dark:supports-[color-contrast(high)]:text-gray-200'>
              Gestiona tu negocio, crea un catálogo, controla inventario y
              analiza tus ventas — todo en una sola app con IA.
            </p>

            {/* Trust indicators with motion-safe animations */}
            <div className='motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500'>
              <TrustStrip />
            </div>

            {/* Call-to-action buttons with accessibility features */}
            <div
              className='mt-6 flex flex-wrap items-center gap-5'
              role='group'
              aria-label='Acciones principales'
            >
              {/* Primary CTA: Sign up button with pulsing animation */}
              <a
                href='/signup'
                className='rounded-lg bg-primary-500 px-5 py-3 font-medium text-primary-on shadow hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 animate-pulse-custom'
                data-analytics='cta_primary_hero'
                role='button'
                aria-describedby='cta-description'
              >
                Comenzar gratis
              </a>
              {/* Screen reader description for the primary CTA */}
              <span id='cta-description' className='sr-only'>
                Botón para comenzar a usar VendeMás de forma gratuita
              </span>

              {/* Secondary CTA: Learn more link with hover effects */}
              <a
                href='#caracteristicas'
                className='group inline-flex items-center gap-x-2 text-sm font-semibold text-secondary-600 hover:text-secondary-700 transition-all duration-300 dark:text-white dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 focus:rounded-lg dark:focus:ring-white dark:focus:ring-offset-gray-900'
                aria-describedby='features-description'
              >
                <span className='relative'>
                  Conoce todas las herramientas
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
              <span id='features-description' className='sr-only'>
                Enlace para ver todas las características y herramientas de
                VendeMás
              </span>
            </div>

            {/* Risk reduction indicators with staggered animations */}
            <div className='motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500 motion-safe:delay-200'>
              <RiskReducers />
            </div>
          </div>

          {/* RIGHT COLUMN: Visual content and mockups */}
          <div className='relative z-10 mt-8 sm:mt-9 md:mt-9'>
            <div className='relative mx-auto w-full max-w-[560px]'>
              {/* Floating price flip badge with responsive positioning behavior */}
              {/* - Mobile/Medium: Always positioned at top-left for consistent layout */}
              {/* - Large screens: Dynamic positioning based on scroll state */}
              {/*   - At top: positioned at top-left for prominent visibility */}
              {/*   - When scrolled: positioned at bottom-left to complement navbar changes */}
              {/* - Smooth transitions: 200ms duration for polished user experience */}
              <div
                className={`absolute z-20 transition-all duration-200 ${
                  // Dynamic positioning only on large screens (lg+)
                  // On smaller screens, always use top positioning for layout stability
                  isScrolled
                    ? 'lg:bottom-4 lg:-left-5 lg:z-50' // Bottom positioning when scrolled on lg+, top on smaller screens
                    : '-top-6 left-10' // Top positioning for all screen sizes when at top
                }`}
              >
                <PriceFlipBadge />
              </div>

              {/* Main hero image container with rotation and backdrop effects */}
              <div className='relative -rotate-3 rounded-2xl border border-secondary/10 bg-white/90 shadow-xl backdrop-blur'>
                {/* Placeholder for hero image - replace with actual optimized WebP */}
                <div
                  className='relative h-[500px] w-full rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center'
                  role='img'
                  aria-label='Placeholder para imagen hero de la aplicación VendeMás - muestra un ícono de galería de imágenes con texto descriptivo'
                  aria-describedby='hero-image-description'
                >
                  {/* Placeholder content with icon and text */}
                  <div className='text-center'>
                    <div className='mx-auto mb-4 h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center'>
                      <svg
                        className='h-8 w-8 text-primary-600'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        aria-hidden='true'
                        role='img'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                        />
                      </svg>
                    </div>
                    <p className='text-sm text-secondary-600'>
                      Hero Image Placeholder
                    </p>
                    <p className='text-xs text-secondary-400 mt-1'>
                      1120×720 WebP
                    </p>
                  </div>
                  {/* Screen reader description for the hero image */}
                  <div id='hero-image-description' className='sr-only'>
                    Imagen representativa de la aplicación VendeMás mostrando la
                    interfaz principal con herramientas de gestión empresarial
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO: Structured data for aggregate ratings */}
      <AggregateRatingJsonLd />

      {/* ARIA live region for dynamic content updates */}
      <div aria-live='polite' aria-atomic='true' className='sr-only'>
        Hero section cargado con opciones de navegación y llamadas a la acción
      </div>
    </header>
  );
}
