'use client';

import React, { useState } from 'react';
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

  return (
    <header className='relative isolate overflow-hidden'>
      <HeroBackground />

      <div className='mx-auto max-w-7xl px-6 pt-12 pb-4'>
        <div className='grid items-start gap-6 lg:grid-cols-2'>
          {/* LEFT: copy */}
          <div className='relative z-20 mt-14'>
            <h1 className='font-display text-display text-5xl md:text-6xl leading-tight text-secondary-500'>
              <span>Todo tu negocio, </span>
              <span
                className='
                  bg-gradient-to-r from-secondary-700 via-secondary-600 via-primary-600 to-tertiary-500
                  bg-clip-text text-transparent
                '
              >
                impulsado por IA
              </span>
            </h1>

            <p className='mt-3 font-display text-2xl text-primary-600'>
              Vende más, sin complicarte.
            </p>

            <p className='mt-3 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400'>
              Gestiona tu negocio, crea un catálogo, controla inventario y
              analiza tus ventas — todo en una sola app con IA.
            </p>

            {/* Trust Strip - Moved up for better visibility */}
            <TrustStrip />

            {/* CTAs */}
            <div className='mt-6 flex flex-wrap items-center gap-5'>
              <a
                href='/signup'
                className='rounded-lg bg-primary-500 px-5 py-3 font-medium text-primary-on shadow hover:shadow-md transition animate-pulse-custom'
                data-analytics='cta_primary_hero'
              >
                Comenzar gratis
              </a>

              <a
                href='#caracteristicas'
                className='group inline-flex items-center gap-x-2 text-sm font-semibold text-secondary-600 hover:text-secondary-700 transition-all duration-300 dark:text-secondary-400 dark:hover:text-secondary-300'
              >
                <span className='relative'>
                  Conoce todas las herramientas
                  <span className='absolute -bottom-0.5 left-0 h-0.5 w-0 bg-secondary-600 transition-all duration-300 group-hover:w-full dark:bg-secondary-400'></span>
                </span>
                <ChevronRight
                  aria-hidden='true'
                  className='size-4 transition-transform duration-300 group-hover:translate-x-1'
                />
              </a>
            </div>

            {/* Risk Reducers - Moved below CTAs */}
            <RiskReducers />
          </div>

          {/* RIGHT: offset visual (LCP image) */}
          <div className='relative z-10'>
            <div className='relative mx-auto w-full max-w-[560px]'>
              <div className='absolute -top-6 left-10 z-20'>
                <PriceFlipBadge />
              </div>

              {/* <div className='absolute -top-3 right-3 z-20 rounded-full bg-tertiary-500/90 px-3 py-3 text-xs text-tertiary-on shadow'>
                Importando menú con IA
              </div> */}

              <div className='relative -rotate-3 rounded-2xl border border-secondary/10 bg-white/90 shadow-xl backdrop-blur'>
                {/* Placeholder for hero image - replace with actual optimized WebP */}
                <div className='relative h-[500px] w-full rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center'>
                  <div className='text-center'>
                    <div className='mx-auto mb-4 h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center'>
                      <svg
                        className='h-8 w-8 text-primary-600'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && <HowItWorksModal onClose={() => setOpen(false)} />}
      <AggregateRatingJsonLd />
    </header>
  );
}
