'use client';

import dynamic from 'next/dynamic';
import AiScanCard from './AiScanCard';

const DemoModal = dynamic(() => import('./DemoModal'), { ssr: false });

import { useState } from 'react';

export default function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <header className='relative isolate overflow-hidden'>
      {/* Clean background - no gradients */}
      <div aria-hidden className='pointer-events-none absolute inset-0 -z-10'>
        {/* Simple white background */}
        <div className='absolute inset-0 bg-white' />
      </div>

      <div className='mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 items-center px-6 py-16'>
        {/* TEXT column must be above */}
        <div className='relative z-20 space-y-5'>
          <h1 className='text-display text-5xl md:text-6xl leading-tight'>
            <span>Todo tu negocio, </span>
            <span
              className='
                relative inline-block font-display tracking-tight
                bg-[linear-gradient(90deg,theme(colors.secondary.800),theme(colors.secondary.600),theme(colors.tertiary.700))]
                bg-[length:300%_300%]
                bg-clip-text text-transparent
                drop-shadow-[0_1px_0_rgba(0,0,0,0.22)]
                motion-safe:animate-[gradient-shift_4s_cubic-bezier(.22,.61,.36,1)_infinite]
                ml-10
              '
            >
              impulsado por IA
            </span>
          </h1>

          <p className='mt-2 font-display text-3xl font-semibold text-primary-600'>
            Vende más, sin complicarte
          </p>

          <p className='mt-2 font-body text-secondary/90'>
            Hecho para MiPyMEs y negocios ambulantes. Funciona sin internet.
          </p>

          {/* Feature chips */}
          <ul className='mt-3 flex flex-wrap gap-2'>
            <li className='nums-tabular rounded-full bg-secondary/10 px-3 py-1 text-sm text-secondary'>
              Catálogo desde una foto
            </li>
            <li className='nums-tabular rounded-full bg-secondary/10 px-3 py-1 text-sm text-secondary'>
              Cobros por CoDi
            </li>
            <li className='nums-tabular rounded-full bg-secondary/10 px-3 py-1 text-sm text-secondary'>
              Funciona sin internet
            </li>
            <li className='nums-tabular rounded-full bg-secondary/10 px-3 py-1 text-sm text-secondary'>
              Promos con IA
            </li>
          </ul>

          {/* CTAs */}
          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2'>
            <a
              href='/signup'
              className='rounded-xl bg-primary-500 text-primary-on px-5 py-3 shadow hover:shadow-md transition'
              data-analytics='cta_primary_hero'
            >
              Crear mi catálogo con IA
            </a>
            <button
              onClick={() => setOpen(true)}
              className='rounded-xl px-5 py-3 ring-1 ring-secondary/30 hover:ring-secondary/60 bg-white/90 backdrop-blur transition inline-flex items-center gap-2'
              data-analytics='cta_demo_hero'
              aria-haspopup='dialog'
              aria-controls='demo-ia-modal'
            >
              <svg
                className='h-4 w-4'
                viewBox='0 0 24 24'
                fill='currentColor'
                aria-hidden
              >
                <path d='M8 5v14l11-7z' />
              </svg>
              Ver demo de 60 s
            </button>
          </div>

          {/* Tertiary links */}
          <nav className='flex gap-6 text-sm'>
            <a
              href='#como-funciona'
              className='text-black underline decoration-dotted hover:decoration-solid font-medium'
              data-analytics='hero_scroll_how'
            >
              Ver cómo funciona →
            </a>
            <a
              href='/caracteristicas'
              className='text-black/90 hover:text-black underline font-medium'
              data-analytics='hero_all_features'
            >
              Todas las funciones
            </a>
          </nav>

          {/* Trust micro-strip (only if true; else remove) */}
          {/* <p className="text-xs text-secondary/70 pt-1">★★★★★ 4.9/5 en reseñas · Más de 1,000 vendedores en MX</p> */}
        </div>

        {/* VISUAL column can be lower */}
        <div className='relative z-10'>
          <AiScanCard />
        </div>
      </div>

      {open && <DemoModal onClose={() => setOpen(false)} />}
    </header>
  );
}
