'use client';

import dynamic from 'next/dynamic';
import AiScanCard from './AiScanCard';

const DemoModal = dynamic(() => import('./DemoModal'), { ssr: false });

import { useState } from 'react';

export default function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative isolate overflow-hidden">
      {/* Mesh gradient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 -left-32 size-[520px] rounded-full blur-3xl opacity-30 bg-primary-500" />
        <div className="absolute -bottom-32 -right-24 size-[560px] rounded-full blur-3xl opacity-20 bg-secondary-500" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 size-[420px] rounded-full blur-2xl opacity-15 bg-tertiary-500" />
        {/* subtle grain (safe, tiny) */}
        <div className="absolute inset-0 mix-blend-soft-light bg-[url('/noise.png')] opacity-[0.04]" />
      </div>

      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 items-center px-6 py-16">
        {/* Copy */}
        <div className="relative z-10 space-y-5">
          <h1 className="text-display text-5xl md:text-6xl leading-tight text-secondary">
            <span className="">Todo tu negocio, </span>
            <span className="bg-gradient-to-r from-tertiary-600 to-secondary-700 bg-clip-text text-transparent drop-shadow-[0_1px_0_rgba(0,0,0,0.06)]">
              impulsado por IA
            </span>
          </h1>

          <p className="text-3xl font-semibold text-primary-600">
            Vende más, sin complicarte
          </p>

          <p className="text-body text-secondary/90 max-w-prose">
            Enfocado para MiPyMEs y negocios ambulantes.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
            <a
              href="/signup"
              className="rounded-xl bg-primary-500 text-primary-on px-5 py-3 shadow hover:shadow-md transition"
              data-analytics="cta_primary_hero"
            >
              Comenzar gratis
            </a>
            <button
              onClick={() => setOpen(true)}
              className="rounded-xl px-5 py-3 ring-1 ring-secondary/30 hover:ring-secondary/60 bg-white/90 backdrop-blur transition inline-flex items-center gap-2"
              data-analytics="cta_demo_hero"
              aria-haspopup="dialog"
              aria-controls="demo-ia-modal"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z"/>
              </svg>
              Ver demo de IA
            </button>
          </div>

          {/* Tertiary links */}
          <nav className="flex gap-6 text-sm">
            <a href="#como-funciona" className="text-secondary underline decoration-dotted hover:decoration-solid" data-analytics="hero_scroll_how">
              Ver cómo funciona →
            </a>
            <a href="/caracteristicas" className="text-secondary/90 hover:text-secondary underline" data-analytics="hero_all_features">
              Todas las funciones
            </a>
          </nav>

          {/* Trust micro-strip (only if true; else remove) */}
          {/* <p className="text-xs text-secondary/70 pt-1">★★★★★ 4.9/5 en reseñas · Más de 1,000 vendedores en MX</p> */}
        </div>

        {/* Visual */}
        <div className="relative z-0">
          <AiScanCard />
        </div>
      </div>

      {open && <DemoModal onClose={() => setOpen(false)} />}
    </header>
  );
}
