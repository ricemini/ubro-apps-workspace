'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const DemoModal = dynamic(() => import('./DemoModal'), { ssr: false });

export default function Hero() {
  const [open, setOpen] = useState(false);

  // Respect reduced motion (disable float/tilt anim)
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);

  return (
    <header className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 items-center px-6 py-16">
      {/* Copy block */}
      <div className="space-y-6">
        <h1 className="text-display text-5xl leading-tight text-secondary">
          <span className="text-secondary">Todo tu negocio, </span>
          <span className="bg-gradient-to-r from-tertiary-500 to-secondary-500 bg-clip-text text-transparent">
            impulsado por IA
          </span>
        </h1>

        <p className="text-3xl font-semibold text-primary-500 mt-2">
          Vende más, sin complicarte
        </p>

        <p className="text-body text-secondary/80 mt-1">
          Enfocado para MiPyMEs y negocios ambulantes.
        </p>

        {/* Primary CTAs */}
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <a
            href="/signup"
            className="rounded-lg bg-primary-500 text-primary-on px-5 py-3 shadow hover:shadow-md transition"
            data-analytics="cta_primary_hero"
          >
            Comenzar gratis
          </a>

          <button
            onClick={() => setOpen(true)}
            className="rounded-lg px-5 py-3 ring-1 ring-secondary/30 hover:ring-secondary/60 transition inline-flex items-center gap-2 bg-white"
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
        <nav className="mt-3 flex gap-6 text-sm">
          <a
            href="#como-funciona"
            className="text-secondary underline decoration-dotted hover:decoration-solid"
            data-analytics="hero_scroll_how"
          >
            Ver cómo funciona →
          </a>
          <a
            href="/caracteristicas"
            className="text-secondary/80 hover:text-secondary underline"
            data-analytics="hero_all_features"
          >
            Todas las funciones
          </a>
        </nav>
      </div>

      {/* Device mockup (scan → catalog) */}
      <div
        className={[
          'relative isolate',
          reduce ? '' : 'motion-safe:animate-float-slow',
        ].join(' ')}
        aria-hidden
      >
        {/* Badge */}
        <span className="absolute -top-3 right-6 z-10 rounded-full bg-tertiary-500 text-tertiary-on text-xs px-2 py-1 shadow">
          Importando menú con IA
        </span>

        {/* Tilted card */}
        <div className="rotate-3">
          <div className="rounded-[1.5rem] p-[1px] bg-gradient-to-br from-primary-500 to-secondary-500 shadow-2xl">
            <div className="rounded-[1.45rem] bg-white p-5 sm:p-6">
              <div className="mb-3 flex items-center justify-between text-xs text-secondary/60">
                <span className="font-medium text-secondary">VendeMás IA</span>
                <span>Escaneando menú <span aria-hidden>✓</span></span>
              </div>

              <h3 className="text-lg font-bold text-secondary mb-3">
                Catálogo detectado
              </h3>

              <ul className="space-y-2 text-sm">
                {[
                  ['Tacos al pastor', '$15'],
                  ['Quesadillas', '$20'],
                  ['Refrescos', '$12'],
                ].map(([name, price]) => (
                  <li
                    key={name}
                    className="flex items-center justify-between rounded-lg bg-secondary/5 px-3 py-2"
                  >
                    <span className="text-secondary">{name}</span>
                    <span className="flex items-center gap-2">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-white text-[10px]">✓</span>
                      <span className="font-medium text-secondary">{price}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="mt-4 w-full rounded-lg bg-primary-500 text-primary-on px-4 py-3 hover:brightness-[1.05] transition"
                tabIndex={-1}
              >
                Importar productos
              </button>
            </div>
          </div>
        </div>

        {/* Soft drop shadow */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-8 w-[80%] rounded-full bg-black/10 blur-2xl" />
      </div>

      {open && <DemoModal onClose={() => setOpen(false)} />}
    </header>
  );
}
