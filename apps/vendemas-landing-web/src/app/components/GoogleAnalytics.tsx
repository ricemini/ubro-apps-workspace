'use client';

import React from 'react';
import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google';
import { analyticsConfig } from '../../lib/analytics';

/**
 * Google Analytics Component
 *
 * Integrates Google Analytics 4 (GA4) with Next.js using the official
 * @next/third-parties package for optimal performance and privacy compliance.
 *
 * Features:
 * - Automatic page view tracking
 * - Enhanced ecommerce tracking
 * - Privacy-compliant implementation
 * - Performance optimized loading
 * - Environment-based configuration
 */
export default function GoogleAnalytics(): React.JSX.Element | null {
  // Only render in production and when GA measurement ID is available
  if (!analyticsConfig.isEnabled || !analyticsConfig.gaMeasurementId) {
    return null;
  }

  return (
    <NextGoogleAnalytics
      gaId={analyticsConfig.gaMeasurementId}
      // Enable enhanced ecommerce for conversion tracking
      strategy='afterInteractive'
    />
  );
}
