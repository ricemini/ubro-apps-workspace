'use client';

import React, { useEffect, useRef } from 'react';

interface FocusTrapProps {
  children: React.ReactNode;
  isActive?: boolean;
  onEscape?: () => void;
  className?: string;
}

/**
 * FocusTrap Component - Manages focus within a container for accessibility
 *
 * Features:
 * - Traps focus within the container when active
 * - Handles Tab and Shift+Tab navigation
 * - Escape key support for closing modals
 * - Automatic focus management
 * - Prevents focus from escaping the container
 *
 * @param children - Content to wrap with focus trap
 * @param isActive - Whether the focus trap should be active
 * @param onEscape - Callback for escape key press
 * @param className - Additional CSS classes
 */
export default function FocusTrap({
  children,
  isActive = true,
  onEscape,
  className = '',
}: FocusTrapProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    // Get all focusable elements within the container
    const getFocusableElements = (): HTMLElement[] => {
      return Array.from(
        container.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
        )
      ).filter(el => {
        const element = el as HTMLElement & { disabled?: boolean };
        return !element.disabled && element.offsetParent !== null;
      }) as HTMLElement[];
    };

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus the first element when the trap becomes active
    firstElement.focus();

    const handleKeyDown = (e: globalThis.KeyboardEvent): void => {
      // Handle escape key
      if (e.key === 'Escape' && onEscape) {
        e.preventDefault();
        onEscape();
        return;
      }

      // Handle Tab key for focus trapping
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift+Tab: move focus backward
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: move focus forward
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    // Add event listeners
    container.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, onEscape]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
