'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function Hero(): React.JSX.Element {
  const [open, setOpen] = useState(false);

  // Handle escape key for modal
  useEffect((): (() => void) => {
    const handleEscape = (e: globalThis.KeyboardEvent): void => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return (): void => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <>
      <header className='mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 items-center px-6 py-16'>
        <div className='space-y-6'>
          <h1 className='text-display text-4xl sm:text-5xl text-secondary-500 leading-tight'>
            Todo tu negocio,
            <span className='gradient-text block'>impulsado por IA</span>
          </h1>
          <h2 className='text-3xl font-semibold text-primary-500'>
            Vende más, sin complicarte
          </h2>
          <p className='text-body text-lg text-secondary-500/80'>
            Enfocado para MiPyMEs y negocios ambulantes.
          </p>

          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3'>
            <a
              href='/signup'
              className='inline-block rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 transition-colors duration-200 btn-focus'
              data-analytics='cta_primary_hero'
            >
              Comenzar gratis
            </a>
            <button
              className='rounded-lg border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-50 font-semibold px-6 py-3 transition-all duration-200 btn-focus'
              data-analytics='cta_demo_hero'
              onClick={(): void => setOpen(true)}
            >
              Ver demo de IA
            </button>
          </div>

          <nav className='mt-6 flex flex-col sm:flex-row gap-4 text-sm'>
            <a
              href='#como-funciona'
              className='inline-flex items-center gap-1 text-secondary-500 underline decoration-dotted hover:decoration-solid transition-all duration-200 btn-focus rounded px-2 py-1'
              aria-label='Ver cómo funciona VendeMás'
              data-analytics='hero_scroll_how'
            >
              Ver cómo funciona →
            </a>
            <a
              href='/caracteristicas'
              className='inline-flex items-center gap-1 text-secondary-500/80 hover:text-secondary-500 transition-colors duration-200 btn-focus rounded px-2 py-1'
              aria-label='Ver todas las funciones de VendeMás'
              data-analytics='hero_all_features'
            >
              Todas las funciones
            </a>
          </nav>
        </div>

        <div className='relative'>
          <div className='relative mx-auto max-w-md lg:max-w-lg'>
            {/* Phone mockup */}
            <div className='bg-gradient-primary rounded-3xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300'>
              <div className='bg-white rounded-2xl p-6 shadow-inner'>
                <div className='space-y-4'>
                  {/* Status bar */}
                  <div className='flex justify-between items-center text-xs text-gray-500'>
                    <span>VendeMás IA</span>
                    <span>Escaneando menú ✓</span>
                  </div>

                  {/* AI scanning display */}
                  <div className='bg-gray-50 rounded-lg p-4'>
                    <h3 className='text-display font-semibold text-lg mb-2'>
                      Catálogo detectado
                    </h3>
                    <div className='space-y-2 text-sm'>
                      <div className='flex justify-between'>
                        <span>Tacos al pastor</span>
                        <span className='text-green-600'>✓ $15</span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Quesadillas</span>
                        <span className='text-green-600'>✓ $20</span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Refrescos</span>
                        <span className='text-green-600'>✓ $12</span>
                      </div>
                    </div>
                  </div>

                  {/* Action button */}
                  <button className='w-full bg-primary-500 text-white font-semibold py-3 rounded-lg'>
                    Importar productos
                  </button>
                </div>
              </div>
            </div>

            {/* Badge */}
            <span className='absolute -top-2 -right-2 rounded-full bg-tertiary-500 text-black text-xs font-medium px-3 py-1 shadow-lg'>
              Importando menú con IA
            </span>
          </div>
        </div>
      </header>

      {/* Lazy modal mount */}
      {open && <DemoModal onClose={() => setOpen(false)} />}
    </>
  );
}

// Lightweight demo modal
function DemoModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-label='Demostración de IA'
      className='fixed inset-0 z-50 grid place-items-center bg-black/60 p-4'
      onClick={onClose}
    >
      <div
        className='max-w-4xl w-full max-h-[90vh] rounded-2xl bg-white shadow-2xl overflow-hidden'
        onClick={e => e.stopPropagation()}
      >
        <div className='flex justify-between items-center p-6 border-b border-gray-200'>
          <h2 className='text-display text-2xl text-secondary-500'>
            Demo de IA
          </h2>
          <button
            onClick={onClose}
            className='text-secondary-500/60 hover:text-secondary-500 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 btn-focus'
            aria-label='Cerrar modal'
          >
            <X className='h-6 w-6' />
          </button>
        </div>

        <div className='p-6'>
          {/* Demo content placeholder */}
          <div className='aspect-video bg-gradient-to-br from-primary-100 to-tertiary-100 rounded-xl flex items-center justify-center'>
            <div className='text-center space-y-4'>
              <div className='w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto'>
                <div className='w-0 h-0 border-l-8 border-l-primary-500 border-y-6 border-y-transparent ml-1'></div>
              </div>
              <div>
                <h3 className='text-xl font-semibold text-secondary-500 mb-2'>
                  Demo interactivo próximamente
                </h3>
                <p className='text-secondary-500/70'>
                  Ve cómo la IA de VendeMás transforma una foto de tu menú en un
                  catálogo completo
                </p>
              </div>
            </div>
          </div>

          <div className='mt-6 text-center'>
            <a
              href='/signup'
              className='inline-block bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 btn-focus'
            >
              Probar ahora gratis
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
