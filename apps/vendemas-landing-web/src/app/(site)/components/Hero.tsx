'use client';

import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { ChevronRight } from 'lucide-react';
import HeroBackground from './HeroBackground';
import TrustStrip, { RiskReducers } from './trust/TrustStrip';
import AggregateRatingJsonLd from './seo/AggregateRatingJsonLd';
import PriceFlipBadge from './price-flip-badge/PriceFlipBadge';

const HowItWorksModal = dynamic(() => import('./HowItWorksModal'), {
  ssr: false,
});

export default function Hero(): React.JSX.Element {
  const [open, setOpen] = useState(false);

  // Focus management for modal
  const handleModalToggle = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      // Focus will be managed by the modal component
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Return focus to the trigger element
      const trigger = document.querySelector('[data-modal-trigger]');
      if (trigger instanceof HTMLElement) {
        trigger.focus();
      }
    }
  };

  return (
    <header className='relative isolate overflow-hidden' role='banner'>
      {/* Skip link for keyboard navigation */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-primary-600'
      >
        Saltar al contenido principal
      </a>

      <HeroBackground />

      <div
        className='mx-auto max-w-7xl px-6 -pt- sm:pt-2 md:pt-4 lg:pt-12'
        id='main-content'
        tabIndex='-1'
        role='main'
      >
        <div className='grid items-start gap-6 lg:grid-cols-2'>
          {/* LEFT: copy */}
          <div className='relative z-20 mt-14'>
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

            <p className='mt-3 font-display text-2xl text-primary-600 supports-[color-contrast(high)]:text-primary-800 dark:supports-[color-contrast(high)]:text-primary-200'>
              Vende más, sin complicarte.
            </p>

            <p className='mt-3 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400 supports-[color-contrast(high)]:text-gray-700 dark:supports-[color-contrast(high)]:text-gray-200'>
              Gestiona tu negocio, crea un catálogo, controla inventario y
              analiza tus ventas — todo en una sola app con IA.
            </p>

            {/* Trust Strip - Moved up for better visibility */}
            <div className='motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500'>
              <TrustStrip />
            </div>

            {/* CTAs */}
            <div
              className='mt-6 flex flex-wrap items-center gap-5'
              role='group'
              aria-label='Acciones principales'
            >
              <a
                href='/signup'
                className='rounded-lg bg-primary-500 px-5 py-3 font-medium text-primary-on shadow hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 animate-pulse-custom'
                data-analytics='cta_primary_hero'
                role='button'
                aria-describedby='cta-description'
              >
                Comenzar gratis
              </a>
              <span id='cta-description' className='sr-only'>
                Botón para comenzar a usar VendeMás de forma gratuita
              </span>

              <a
                href='#caracteristicas'
                className='group inline-flex items-center gap-x-2 text-sm font-semibold text-secondary-600 hover:text-secondary-700 transition-all duration-300 dark:text-white dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 focus:rounded-lg dark:focus:ring-white dark:focus:ring-offset-gray-900'
                aria-describedby='features-description'
              >
                <span className='relative'>
                  Conoce todas las herramientas
                  <span className='absolute -bottom-0.5 left-0 h-0.5 w-0 bg-secondary-600 transition-all duration-300 group-hover:w-full dark:bg-white dark:group-hover:bg-white group-focus-within:hidden group-focus:hidden'></span>
                </span>
                <ChevronRight
                  aria-hidden='true'
                  className='size-4 transition-transform duration-300 group-hover:translate-x-1'
                />
              </a>
              <span id='features-description' className='sr-only'>
                Enlace para ver todas las características y herramientas de
                VendeMás
              </span>
            </div>

            {/* Risk Reducers - Moved below CTAs */}
            <div className='motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500 motion-safe:delay-200'>
              <RiskReducers />
            </div>
          </div>

          {/* RIGHT: offset visual (LCP image) */}
          <div className='relative z-10 mt-8 sm:mt-9 md:mt-9'>
            <div className='relative mx-auto w-full max-w-[560px]'>
              <div className='absolute -top-6 left-10 z-20'>
                <PriceFlipBadge />
              </div>

              {/* <div className='absolute -top-3 right-3 z-20 rounded-full bg-tertiary-500/90 px-3 py-3 text-xs text-tertiary-on shadow'>
                Importando menú con IA
              </div> */}

              <div className='relative -rotate-3 rounded-2xl border border-secondary/10 bg-white/90 shadow-xl backdrop-blur'>
                {/* Placeholder for hero image - replace with actual optimized WebP */}
                <div
                  className='relative h-[500px] w-full rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center'
                  role='img'
                  aria-label='Placeholder para imagen hero de la aplicación VendeMás - muestra un ícono de galería de imágenes con texto descriptivo'
                  aria-describedby='hero-image-description'
                >
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

      {open && (
        <Suspense
          fallback={
            <div className='sr-only' aria-live='polite'>
              Cargando modal de instrucciones...
            </div>
          }
        >
          <HowItWorksModal onClose={() => handleModalToggle(false)} />
        </Suspense>
      )}
      <AggregateRatingJsonLd />

      {/* ARIA live region for dynamic content updates */}
      <div aria-live='polite' aria-atomic='true' className='sr-only'>
        Hero section cargado con opciones de navegación y llamadas a la acción
      </div>
    </header>
  );
}
