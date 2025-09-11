import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import VideoModal from '../components-site/VideoModal';
import ContentModal from '../components-site/ContentModal';
import InActionModal from '../components-site/InActionModal';

/**
 * SecondaryCTA Component Props
 */
interface SecondaryCTAProps {
  text: string;
  url?: string;
  description?: string;
  showVideoModal?: boolean;
  videoTitle?: string;
  videoSrc?: string;
  posterSrc?: string;
  showContentModal?: boolean;
  contentModal?: {
    type: 'video' | 'iframe' | 'youtube' | 'vimeo';
    src: string;
    posterSrc?: string;
  };
  showVendeMasModal?: boolean;
  youtubeVideoId?: string;
}

/**
 * SecondaryCTA Component
 *
 * A reusable secondary call-to-action link component that provides an elegant
 * text-based CTA with hover animations and accessibility features. Designed
 * to complement primary CTAs by offering alternative actions like "learn more"
 * or "see demo" options.
 *
 * Key Features:
 * - Customizable text and URL for maximum flexibility
 * - Animated underline effect on hover
 * - Chevron icon with smooth translation animation
 * - Full dark mode support with proper contrast
 * - Accessibility-first design with ARIA labels
 * - Focus management with visible indicators
 * - Responsive design that works on all screen sizes
 *
 * Visual Design:
 * - Clean text link with subtle hover effects
 * - Animated underline that grows from left to right
 * - Chevron icon that slides right on hover
 * - Proper color contrast in both light and dark modes
 * - Smooth transitions for all interactive states
 *
 * Accessibility:
 * - Screen reader friendly with proper ARIA descriptions
 * - Keyboard navigation support
 * - Focus indicators for keyboard users
 * - High contrast design for better visibility
 * - Semantic HTML structure
 *
 * Usage Examples:
 * - "Learn more" links
 * - "See demo" actions
 * - "View features" navigation
 * - Any secondary action that complements primary CTAs
 */
export default function SecondaryCTA({
  text,
  url,
  description = 'Enlace para ver más información',
  showVideoModal = false,
  videoTitle,
  videoSrc,
  posterSrc,
  showContentModal = false,
  contentModal,
  showVendeMasModal = false,
  youtubeVideoId,
}: SecondaryCTAProps): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e: React.MouseEvent): void => {
    if (showVideoModal || showContentModal || showVendeMasModal) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {/* Secondary CTA: Learn more link with hover effects */}
      <a
        href={url || '#'}
        onClick={handleClick}
        className='group inline-flex items-center gap-x-2 !rounded-[14px] bg-white dark:bg-gray-950 px-4 py-2.5 text-sm font-semibold text-secondary-600 hover:text-secondary-700 hover:bg-gray-50 dark:text-white dark:hover:text-white dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:card-border focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 dark:focus:ring-white dark:focus:ring-offset-gray-900'
        style={{ height: '42px' }}
        aria-describedby='secondary-cta-description'
      >
        <span className='relative'>
          {text}
          {/* Animated underline that hides on focus */}
          <span className='absolute -bottom-0.5 left-0 h-0.5 w-0 bg-secondary-600 transition-all duration-300 group-hover:w-full dark:bg-white dark:group-hover:bg-white group-focus-within:hidden group-focus:hidden'></span>
        </span>
        {/* Chevron icon with hover animation */}
        <ChevronRight
          aria-hidden='true'
          className='size-4 transition-transform duration-300 group-hover:translate-x-1'
        />
      </a>
      {/* Screen reader description for the secondary CTA */}
      <span id='secondary-cta-description' className='sr-only'>
        {description}
      </span>

      {/* Video Modal */}
      {showVideoModal && isModalOpen && (
        <VideoModal
          onClose={() => setIsModalOpen(false)}
          title={videoTitle}
          videoSrc={videoSrc}
          posterSrc={posterSrc}
        />
      )}

      {/* Content Modal */}
      {showContentModal && isModalOpen && contentModal && (
        <ContentModal
          onClose={() => setIsModalOpen(false)}
          title={videoTitle || text}
          content={contentModal}
        />
      )}

      {/* VendeMás en Acción Modal */}
      {showVendeMasModal && isModalOpen && (
        <InActionModal
          onClose={() => setIsModalOpen(false)}
          youtubeVideoId={youtubeVideoId}
        />
      )}
    </>
  );
}
