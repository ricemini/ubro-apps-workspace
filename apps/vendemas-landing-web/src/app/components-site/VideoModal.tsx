'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  onClose: () => void;
  title?: string;
  videoSrc?: string;
  posterSrc?: string;
}

/**
 * VideoModal Component
 *
 * A modal component that displays the application's video demonstration.
 * Follows the same pattern as other modals in the codebase with proper
 * accessibility features and keyboard navigation support.
 *
 * Features:
 * - Escape key to close
 * - Click outside to close
 * - Proper ARIA attributes for accessibility
 * - Responsive design with proper sizing
 * - Video controls and poster image support
 * - Dark mode support
 */
export default function VideoModal({
  onClose,
  title = 'Demostración de VendeMás',
  videoSrc = '/demo/app-demo.webm',
  posterSrc = '/demo/app-demo-poster.webp',
}: VideoModalProps): React.JSX.Element {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent): void =>
      e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return (): void => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-label={title}
      className='fixed inset-0 z-50 grid place-items-center bg-black/60'
      onClick={onClose}
    >
      <div
        className='w-[92vw] max-w-4xl rounded-2xl bg-white dark:bg-gray-900 p-4 shadow-xl'
        onClick={e => e.stopPropagation()}
      >
        {/* Header with title and close button */}
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-2xl font-display font-bold text-secondary-600 dark:text-white'>
            {title}
          </h2>
          <button
            onClick={onClose}
            className='inline-flex items-center justify-center card-border !rounded-[14px] bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2'
            style={{ height: '42px' }}
            aria-label='Cerrar modal de video'
          >
            <X className='h-4 w-4' />
          </button>
        </div>

        {/* Video player */}
        <video
          controls
          className='w-full rounded-xl'
          poster={posterSrc}
          preload='metadata'
        >
          <source src={videoSrc} type='video/webm' />
          <source src={videoSrc.replace('.webm', '.mp4')} type='video/mp4' />
          Tu navegador no soporta video HTML5.
        </video>
      </div>
    </div>
  );
}
