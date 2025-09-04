'use client';

import { useCallback } from 'react';
import {
  trackEvent,
  trackConversion,
  trackEngagement,
  trackVendeMasEvent,
  trackGAEvent,
  isAnalyticsEnabled,
} from '../lib/analytics';

/**
 * Custom Analytics Hook
 *
 * Provides a convenient interface for tracking user interactions
 * and business events throughout the VendeMás application.
 *
 * Features:
 * - Type-safe event tracking
 * - Automatic environment checking
 * - Consistent event naming
 * - Business-specific event tracking
 */
export const useAnalytics = (): {
  trackClick: (
    element: string,
    section?: string,
    additionalData?: Record<string, unknown>
  ) => void;
  trackFormSubmission: (
    formName: string,
    success: boolean,
    additionalData?: Record<string, unknown>
  ) => void;
  trackCTAClick: (
    ctaType: 'primary' | 'secondary' | 'trial' | 'contact',
    location: string,
    additionalData?: Record<string, unknown>
  ) => void;
  trackValuePropositionView: (
    propIndex: number,
    propTitle: string,
    additionalData?: Record<string, unknown>
  ) => void;
  trackFeatureExplore: (
    featureName: string,
    section: string,
    additionalData?: Record<string, unknown>
  ) => void;
  trackPricingView: (
    planType: 'free' | 'pro' | 'enterprise',
    additionalData?: Record<string, unknown>
  ) => void;
  trackConversionEvent: (
    conversionType: 'signup' | 'trial_start' | 'contact_form' | 'demo_request',
    value?: number,
    currency?: string,
    additionalData?: Record<string, unknown>
  ) => void;
  trackScrollDepth: (depth: number, section: string) => void;
  trackTimeOnPage: (timeInSeconds: number, page: string) => void;
  isEnabled: boolean;
} => {
  const trackClick = useCallback(
    (
      element: string,
      section?: string,
      additionalData?: Record<string, unknown>
    ) => {
      if (!isAnalyticsEnabled()) return;

      trackEngagement('click', element, section);
      trackGAEvent('click', section || 'general', element);

      if (additionalData) {
        trackEvent('custom_click', {
          element,
          section,
          ...additionalData,
        });
      }
    },
    []
  );

  const trackFormSubmission = useCallback(
    (
      formName: string,
      success: boolean,
      additionalData?: Record<string, unknown>
    ) => {
      if (!isAnalyticsEnabled()) return;

      trackEvent('form_submission', {
        form_name: formName,
        success,
        ...additionalData,
      });

      trackGAEvent('form_submit', 'engagement', formName);
    },
    []
  );

  const trackCTAClick = useCallback(
    (
      ctaType: 'primary' | 'secondary' | 'trial' | 'contact',
      location: string,
      additionalData?: Record<string, unknown>
    ) => {
      if (!isAnalyticsEnabled()) return;

      trackVendeMasEvent('cta_click', {
        cta_type: ctaType,
        location,
        ...additionalData,
      });

      trackGAEvent('cta_click', 'conversion', `${ctaType}_${location}`);
    },
    []
  );

  const trackValuePropositionView = useCallback(
    (
      propIndex: number,
      propTitle: string,
      additionalData?: Record<string, unknown>
    ) => {
      if (!isAnalyticsEnabled()) return;

      trackVendeMasEvent('value_prop_view', {
        prop_index: propIndex,
        prop_title: propTitle,
        ...additionalData,
      });
    },
    []
  );

  const trackFeatureExplore = useCallback(
    (
      featureName: string,
      section: string,
      additionalData?: Record<string, unknown>
    ) => {
      if (!isAnalyticsEnabled()) return;

      trackVendeMasEvent('feature_explore', {
        feature_name: featureName,
        section,
        ...additionalData,
      });
    },
    []
  );

  const trackPricingView = useCallback(
    (
      planType: 'free' | 'pro' | 'enterprise',
      additionalData?: Record<string, unknown>
    ) => {
      if (!isAnalyticsEnabled()) return;

      trackVendeMasEvent('pricing_view', {
        plan_type: planType,
        ...additionalData,
      });
    },
    []
  );

  const trackConversionEvent = useCallback(
    (
      conversionType:
        | 'signup'
        | 'trial_start'
        | 'contact_form'
        | 'demo_request',
      value?: number,
      currency?: string,
      additionalData?: Record<string, unknown>
    ) => {
      if (!isAnalyticsEnabled()) return;

      trackConversion(conversionType, value, currency);
      trackGAEvent('conversion', 'business', conversionType, value);

      if (additionalData) {
        trackEvent('conversion_details', {
          conversion_type: conversionType,
          value,
          currency,
          ...additionalData,
        });
      }
    },
    []
  );

  const trackScrollDepth = useCallback((depth: number, section: string) => {
    if (!isAnalyticsEnabled()) return;

    // Only track significant scroll depths (25%, 50%, 75%, 100%)
    if ([25, 50, 75, 100].includes(depth)) {
      trackEngagement('scroll', `${depth}%`, section);
    }
  }, []);

  const trackTimeOnPage = useCallback((timeInSeconds: number, page: string) => {
    if (!isAnalyticsEnabled()) return;

    // Only track significant time milestones (30s, 1m, 2m, 5m)
    const milestones = [30, 60, 120, 300];
    if (milestones.includes(timeInSeconds)) {
      trackEngagement('time_on_page', `${timeInSeconds}s`, page);
    }
  }, []);

  return {
    trackClick,
    trackFormSubmission,
    trackCTAClick,
    trackValuePropositionView,
    trackFeatureExplore,
    trackPricingView,
    trackConversionEvent,
    trackScrollDepth,
    trackTimeOnPage,
    isEnabled: isAnalyticsEnabled(),
  };
};
