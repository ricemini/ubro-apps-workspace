'use client';

import React, { useEffect, useRef } from 'react';

interface LiveRegionProps {
  message: string;
  type?: 'polite' | 'assertive' | 'off';
  className?: string;
  'aria-label'?: string;
}

/**
 * LiveRegion Component - Provides live announcements for screen readers
 *
 * Features:
 * - Announces dynamic content changes to screen readers
 * - Configurable announcement priority (polite/assertive)
 * - Automatic cleanup of old messages
 * - Accessible to assistive technology
 *
 * @param message - Message to announce to screen readers
 * @param type - Announcement priority (polite, assertive, or off)
 * @param className - Additional CSS classes
 * @param aria-label - Accessible label for the live region
 */
export default function LiveRegion({
  message,
  type = 'polite',
  className = '',
  'aria-label': ariaLabel,
}: LiveRegionProps): React.JSX.Element {
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message && regionRef.current) {
      // Force a re-render to ensure the message is announced
      const region = regionRef.current;
      region.textContent = message;

      // Clear the message after a short delay to allow screen readers to process it
      const timer = setTimeout((): void => {
        if (region) {
          region.textContent = '';
        }
      }, 1000);

      return () => clearTimeout(timer);
    }

    // Return cleanup function even when there's no message
    return () => {};
  }, [message]);

  return (
    <div
      ref={regionRef}
      aria-live={type}
      aria-atomic='true'
      aria-label={ariaLabel}
      className={`sr-only ${className}`}
      role='status'
    />
  );
}

/**
 * useLiveAnnouncement Hook - Custom hook for managing live announcements
 *
 * @returns Functions for announcing messages to screen readers
 */
export function useLiveAnnouncement() {
  const [announcement, setAnnouncement] = React.useState<string>('');
  const [announcementType, setAnnouncementType] = React.useState<
    'polite' | 'assertive'
  >('polite');

  const announce = React.useCallback(
    (message: string, type: 'polite' | 'assertive' = 'polite'): void => {
      setAnnouncementType(type);
      setAnnouncement(message);
    },
    []
  );

  const announcePolite = React.useCallback(
    (message: string): void => {
      announce(message, 'polite');
    },
    [announce]
  );

  const announceAssertive = React.useCallback(
    (message: string): void => {
      announce(message, 'assertive');
    },
    [announce]
  );

  return {
    announcement,
    announcementType,
    announce,
    announcePolite,
    announceAssertive,
  };
}

/**
 * AccessibilityAnnouncer Component - Global accessibility announcer for the app
 *
 * This component should be placed at the root level to provide global
 * accessibility announcements for navigation, form submissions, etc.
 */
export function AccessibilityAnnouncer(): React.JSX.Element {
  const { announcement, announcementType } = useLiveAnnouncement();

  return (
    <LiveRegion
      message={announcement}
      type={announcementType}
      aria-label='Anuncios de accesibilidad'
    />
  );
}
