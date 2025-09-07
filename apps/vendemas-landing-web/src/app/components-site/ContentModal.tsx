'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ContentModalProps {
  onClose: () => void;
  title?: string;
  content?: {
    type: 'video' | 'iframe' | 'youtube' | 'vimeo';
    src: string;
    posterSrc?: string;
  };
}

/**
 * ContentModal Component
 *
 * A flexible modal component that can display different types of content:
 * - Video files (mp4, webm)
 * - Iframe content (web pages)
 * - YouTube videos
 * - Vimeo videos
 *
 * Features:
 * - Escape key to close
 * - Click outside to close
 * - Proper ARIA attributes for accessibility
 * - Responsive design with proper sizing
 * - Dark mode support
 */
export default function ContentModal({
  onClose,
  title = 'Contenido',
  content,
}: ContentModalProps): React.JSX.Element {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) =>
      e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const renderContent = () => {
    if (!content) return null;

    switch (content.type) {
      case 'video':
        return (
          <video
            controls
            className='w-full rounded-xl'
            poster={content.posterSrc}
            preload='metadata'
          >
            <source src={content.src} type='video/webm' />
            <source
              src={content.src.replace('.webm', '.mp4')}
              type='video/mp4'
            />
            Tu navegador no soporta video HTML5.
          </video>
        );

      case 'iframe':
        return (
          <iframe
            src={content.src}
            className='w-full h-[70vh] rounded-xl border-0'
            title={title}
            allowFullScreen
          />
        );

      case 'youtube': {
        const youtubeId = content.src.includes('youtube.com/watch?v=')
          ? content.src.split('v=')[1]?.split('&')[0]
          : content.src.includes('youtu.be/')
            ? content.src.split('youtu.be/')[1]?.split('?')[0]
            : content.src;

        return (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            className='w-full h-[70vh] rounded-xl border-0'
            title={title}
            allowFullScreen
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          />
        );
      }

      case 'vimeo': {
        const vimeoId = content.src.includes('vimeo.com/')
          ? content.src.split('vimeo.com/')[1]?.split('?')[0]
          : content.src;

        return (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}`}
            className='w-full h-[70vh] rounded-xl border-0'
            title={title}
            allowFullScreen
            allow='autoplay; fullscreen; picture-in-picture'
          />
        );
      }

      default:
        return null;
    }
  };

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-label={title}
      className='fixed inset-0 z-50 grid place-items-center bg-black/60'
      onClick={onClose}
    >
      <div
        className='w-[92vw] max-w-6xl rounded-2xl bg-white dark:bg-gray-900 p-4 shadow-xl'
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
            aria-label='Cerrar modal'
          >
            <X className='h-4 w-4' />
          </button>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
}
