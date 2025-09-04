'use client';

import { useEffect } from 'react';
import { initializeFirebase, trackPageView } from '../../lib/analytics';
import { usePathname } from 'next/navigation';

/**
 * Firebase Analytics Component
 *
 * Initializes Firebase Analytics and tracks page views automatically.
 * Provides enhanced analytics capabilities beyond Google Analytics.
 *
 * Features:
 * - Automatic Firebase initialization
 * - Page view tracking on route changes
 * - Performance monitoring
 * - Custom event tracking capabilities
 * - Environment-based configuration
 */
export default function FirebaseAnalytics(): null {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Firebase Analytics
    initializeFirebase();
  }, []);

  useEffect(() => {
    // Track page views on route changes
    if (pathname) {
      trackPageView(pathname, document.title);
    }
  }, [pathname]);

  // This component doesn't render anything visible
  return null;
}
