import { useState, useEffect, useCallback } from 'react';
import type { ScrollState } from '../components/branding/AnimatedLogo';

interface UseScrollStateOptions {
  threshold?: number;
  throttleMs?: number;
  prefersReducedMotion?: boolean;
}

export function useScrollState({
  threshold = 100,
  throttleMs = 16, // ~60fps
  prefersReducedMotion = false,
}: UseScrollStateOptions = {}): {
  scrollState: ScrollState;
  scrollY: number;
  isAtTop: boolean;
  isScrolling: boolean;
  isFixed: boolean;
} {
  const [scrollState, setScrollState] = useState<ScrollState>('atTop');
  const [scrollY, setScrollY] = useState(0);

  // Throttle function to limit scroll event frequency
  const throttle = useCallback(
    (
      func: (...args: unknown[]) => void,
      delay: number
    ): ((...args: unknown[]) => void) => {
      let timeoutId: ReturnType<typeof setTimeout>;
      let lastExecTime = 0;

      return (...args: unknown[]): void => {
        const currentTime = Date.now();

        if (currentTime - lastExecTime > delay) {
          func(...args);
          lastExecTime = currentTime;
        } else {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(
            () => {
              func(...args);
              lastExecTime = Date.now();
            },
            delay - (currentTime - lastExecTime)
          );
        }
      };
    },
    []
  );

  // Determine scroll state based on scroll position and direction
  const determineScrollState = useCallback(
    (currentScrollY: number): ScrollState => {
      if (currentScrollY <= 0) {
        return 'atTop';
      }

      if (currentScrollY < threshold) {
        return 'scrolling';
      }

      return 'fixed';
    },
    [threshold]
  );

  // Handle scroll events
  const handleScroll = useCallback((): void => {
    if (prefersReducedMotion) {
      // Simplified state for users who prefer reduced motion
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (currentScrollY <= 0) {
        setScrollState('atTop');
      } else {
        setScrollState('fixed');
      }
      return;
    }

    const currentScrollY = window.scrollY;

    setScrollY(currentScrollY);

    const newState = determineScrollState(currentScrollY);

    // Only update state if it's different to avoid unnecessary re-renders
    if (newState !== scrollState) {
      setScrollState(newState);
    }
  }, [scrollY, scrollState, determineScrollState, prefersReducedMotion]);

  // Throttled scroll handler
  const throttledHandleScroll = useCallback(
    throttle(handleScroll, throttleMs),
    [handleScroll, throttle, throttleMs]
  );

  useEffect((): (() => void) => {
    // Set initial state
    const initialScrollY = window.scrollY;
    setScrollY(initialScrollY);
    setScrollState(determineScrollState(initialScrollY));

    // Add scroll listener
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [throttledHandleScroll, determineScrollState]);

  return {
    scrollState,
    scrollY,
    isAtTop: scrollState === 'atTop',
    isScrolling: scrollState === 'scrolling',
    isFixed: scrollState === 'fixed',
  };
}
