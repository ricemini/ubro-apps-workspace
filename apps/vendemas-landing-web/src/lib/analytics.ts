/**
 * Analytics Configuration and Utilities
 *
 * This module provides centralized analytics configuration for both
 * Google Analytics and Firebase Analytics, with proper TypeScript
 * support and environment-based configuration.
 */

import { getAnalytics, logEvent, Analytics } from 'firebase/analytics';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getPerformance } from 'firebase/performance';

// Environment variables with fallbacks for development
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Firebase app instance
let firebaseApp: FirebaseApp | null = null;
let analytics: Analytics | null = null;
let performance: ReturnType<typeof getPerformance> | null = null;

/**
 * Initialize Firebase Analytics
 * Only initializes in browser environment and when config is available
 */
export const initializeFirebase = (): void => {
  if (typeof window === 'undefined') return;
  if (!FIREBASE_CONFIG.apiKey) {
    // eslint-disable-next-line no-console
    console.warn(
      'Firebase configuration not found. Analytics will be disabled.'
    );
    return;
  }

  try {
    // Initialize Firebase app
    firebaseApp = initializeApp(FIREBASE_CONFIG);

    // Initialize Analytics
    analytics = getAnalytics(firebaseApp);

    // Initialize Performance Monitoring
    performance = getPerformance(firebaseApp);

    // eslint-disable-next-line no-console
    console.log('Firebase Analytics initialized successfully');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to initialize Firebase Analytics:', error);
  }
};

/**
 * Get Firebase Analytics instance
 */
export const getFirebaseAnalytics = (): Analytics | null => {
  return analytics;
};

/**
 * Get Firebase Performance instance
 */
export const getFirebasePerformance = (): ReturnType<
  typeof getPerformance
> | null => {
  return performance;
};

/**
 * Track custom events with Firebase Analytics
 */
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, unknown>
): void => {
  if (!analytics) {
    // eslint-disable-next-line no-console
    console.warn('Firebase Analytics not initialized');
    return;
  }

  try {
    logEvent(analytics, eventName, parameters);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to track event:', error);
  }
};

/**
 * Track page views with Firebase Analytics
 */
export const trackPageView = (pagePath: string, pageTitle?: string): void => {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

/**
 * Track conversion events
 */
export const trackConversion = (
  conversionType: 'signup' | 'trial_start' | 'contact_form' | 'demo_request',
  value?: number,
  currency?: string
): void => {
  trackEvent('conversion', {
    conversion_type: conversionType,
    value: value,
    currency: currency || 'MXN',
  });
};

/**
 * Track user engagement events
 */
export const trackEngagement = (
  action: 'click' | 'scroll' | 'time_on_page' | 'form_interaction',
  element?: string,
  section?: string
): void => {
  trackEvent('engagement', {
    action,
    element,
    section,
  });
};

/**
 * Track business-specific events for VendeMás
 */
export const trackVendeMasEvent = (
  eventType:
    | 'value_prop_view'
    | 'cta_click'
    | 'feature_explore'
    | 'pricing_view',
  details?: Record<string, unknown>
): void => {
  trackEvent('vendemas_event', {
    event_type: eventType,
    ...details,
  });
};

/**
 * Google Analytics gtag function type
 */
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Track events with Google Analytics
 */
export const trackGAEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Track page views with Google Analytics
 */
export const trackGAPageView = (url: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID || '', {
      page_path: url,
    });
  }
};

/**
 * Check if analytics is enabled (not in development or when disabled)
 */
export const isAnalyticsEnabled = (): boolean => {
  return (
    process.env.NODE_ENV === 'production' &&
    process.env.NEXT_PUBLIC_ENVIRONMENT !== 'development' &&
    !!GA_MEASUREMENT_ID
  );
};

/**
 * Analytics configuration object
 */
export const analyticsConfig = {
  gaMeasurementId: GA_MEASUREMENT_ID,
  firebaseConfig: FIREBASE_CONFIG,
  isEnabled: isAnalyticsEnabled(),
};
