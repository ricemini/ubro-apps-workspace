'use client';

import { useEffect } from 'react';

export default function DemoModal({ onClose }: { onClose: () => void }) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      id="demo-ia-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Demostración de IA"
      className="fixed inset-0 z-50 grid place-items-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="max-w-3xl w-[92vw] rounded-2xl bg-white p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-display text-2xl text-secondary">Demo de IA</h2>
          <button
            onClick={onClose}
            className="text-secondary/60 hover:text-secondary"
          >
            Cerrar
          </button>
        </div>

        {/* Replace with real demo/video; lazy loaded by dynamic import */}
        <video controls className="w-full rounded-xl" poster="/mockups/demo-poster.webp">
          <source src="/demo/demo-ia.webm" type="video/webm" />
          <source src="/demo/demo-ia.mp4" type="video/mp4" />
          Tu navegador no soporta video HTML5.
        </video>
      </div>
    </div>
  );
}
