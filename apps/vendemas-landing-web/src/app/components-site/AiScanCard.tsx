'use client';

import { useEffect, useState } from 'react';

export default function AiScanCard() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);

  return (
    <div className='relative'>
      <span className='absolute -top-4 right-6 z-10 rounded-full bg-tertiary-500 text-tertiary-on text-xs px-2 py-1 shadow'>
        Importando menú con IA
      </span>

      <div className='rotate-2'>
        <div className='rounded-[1.5rem] p-[1px] bg-gradient-to-br from-primary-500 to-secondary-500 shadow-2xl'>
          <div className='rounded-[1.45rem] bg-white/90 backdrop-blur-lg p-5 sm:p-6 relative overflow-hidden'>
            {/* scan line */}
            {!reduce && (
              <div
                aria-hidden
                className='absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-primary-200/40 to-transparent animate-scan'
              />
            )}

            <div className='mb-3 flex items-center justify-between text-xs text-secondary/60'>
              <span className='font-medium text-secondary'>VendeMás IA</span>
              <span>Escaneando menú ✓</span>
            </div>

            <h3 className='text-lg font-bold text-secondary mb-3'>
              Catálogo detectado
            </h3>

            <ul className='space-y-2 text-sm'>
              {[
                ['Tacos al pastor', '$15'],
                ['Quesadillas', '$20'],
                ['Refrescos', '$12'],
              ].map(([name, price]) => (
                <li
                  key={name}
                  className='flex items-center justify-between rounded-lg bg-secondary/5 px-3 py-2'
                >
                  <span className='text-secondary'>{name}</span>
                  <span className='flex items-center gap-2'>
                    <span className='inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-white text-[10px]'>
                      ✓
                    </span>
                    <span className='font-medium text-secondary'>{price}</span>
                  </span>
                </li>
              ))}
            </ul>

            <button
              type='button'
              className='mt-4 w-full rounded-lg bg-primary-500 text-primary-on px-4 py-3 hover:brightness-[1.05] transition'
            >
              Importar productos
            </button>
          </div>
        </div>
      </div>

      {/* soft shadow */}
      <div className='absolute -bottom-6 left-1/2 -translate-x-1/2 h-8 w-[80%] rounded-full bg-black/10 blur-2xl' />
    </div>
  );
}
