'use client';
import React, { useEffect } from 'react';

export default function HowItWorksModal({
  onClose,
}: {
  onClose: () => void;
}): React.JSX.Element {
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) =>
      e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-label='Cómo funciona VendeMás'
      className='fixed inset-0 z-50 grid place-items-center bg-black/60'
      onClick={onClose}
    >
      <div
        className='w-[92vw] max-w-3xl rounded-2xl bg-white p-4 shadow-xl'
        onClick={e => e.stopPropagation()}
      >
        <div className='mb-3 flex items-center justify-between'>
          <h2 className='text-2xl font-display font-bold text-secondary'>
            Cómo funciona
          </h2>
          <button
            onClick={onClose}
            className='rounded-md px-2 py-1 ring-1 ring-secondary/20 hover:ring-secondary/40'
          >
            Cerrar
          </button>
        </div>

        {/* Replace with real short video and poster */}
        <video
          controls
          className='w-full rounded-xl'
          poster='/demo/demo-poster.webp'
        >
          <source src='/demo/como-funciona.webm' type='video/webm' />
          <source src='/demo/como-funciona.mp4' type='video/mp4' />
          Tu navegador no soporta video HTML5.
        </video>
      </div>
    </div>
  );
}
