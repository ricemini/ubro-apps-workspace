import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import GoogleAnalytics from './GoogleAnalytics';

// Mock the analytics configuration
vi.mock('../../lib/analytics', () => ({
  analyticsConfig: {
    isEnabled: true,
    gaMeasurementId: 'G-TEST123456',
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
  });

  it('renders Google Analytics when enabled and measurement ID is provided', () => {
    render(<GoogleAnalytics />);

    const analyticsElement = screen.getByTestId('google-analytics');
    expect(analyticsElement).toBeInTheDocument();
    expect(analyticsElement).toHaveAttribute('data-ga-id', 'G-TEST123456');
  });

  it('does not render when disabled', () => {
    // Mock disabled state
    vi.doMock('../../lib/analytics', () => ({
      analyticsConfig: {
        isEnabled: false,
        gaMeasurementId: 'G-TEST123456',
      },
    }));

    render(<GoogleAnalytics />);

    expect(screen.queryByTestId('google-analytics')).not.toBeInTheDocument();
  });

  it('does not render when measurement ID is missing', () => {
    // Mock missing measurement ID
    vi.doMock('../../lib/analytics', () => ({
      analyticsConfig: {
        isEnabled: true,
        gaMeasurementId: null,
      },
    }));

    render(<GoogleAnalytics />);

    expect(screen.queryByTestId('google-analytics')).not.toBeInTheDocument();
  });
});
