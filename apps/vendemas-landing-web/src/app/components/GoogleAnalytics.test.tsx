import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GoogleAnalytics from './GoogleAnalytics';

// Mock the analytics configuration
const mockAnalyticsConfig = {
  isEnabled: true,
  gaMeasurementId: 'G-TEST123456',
};

vi.mock('../../lib/analytics', () => ({
  get analyticsConfig() {
    return mockAnalyticsConfig;
  },
}));

// Mock Next.js third-parties
vi.mock('@next/third-parties/google', () => ({
  GoogleAnalytics: ({ gaId }: { gaId: string }) => (
    <div data-testid='google-analytics' data-ga-id={gaId}>
      Google Analytics Loaded
    </div>
  ),
}));

describe('GoogleAnalytics', () => {
  beforeEach((): void => {
    vi.clearAllMocks();
    // Reset mock state
    mockAnalyticsConfig.isEnabled = true;
    mockAnalyticsConfig.gaMeasurementId = 'G-TEST123456';
  });

  it('renders Google Analytics when enabled and measurement ID is provided', () => {
    render(<GoogleAnalytics />);

    const analyticsElement = screen.getByTestId('google-analytics');
    expect(analyticsElement).toBeInTheDocument();
    expect(analyticsElement).toHaveAttribute('data-ga-id', 'G-TEST123456');
  });

  it('does not render when disabled', () => {
    // Mock disabled state
    mockAnalyticsConfig.isEnabled = false;
    mockAnalyticsConfig.gaMeasurementId = 'G-TEST123456';

    render(<GoogleAnalytics />);

    expect(screen.queryByTestId('google-analytics')).not.toBeInTheDocument();
  });

  it('does not render when measurement ID is missing', () => {
    // Mock missing measurement ID
    mockAnalyticsConfig.isEnabled = true;
    mockAnalyticsConfig.gaMeasurementId = null;

    render(<GoogleAnalytics />);

    expect(screen.queryByTestId('google-analytics')).not.toBeInTheDocument();
  });
});
