import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Page from './page';

// Mock the server actions
vi.mock('./actions', () => ({
  getVendorStats: vi.fn().mockResolvedValue({
    totalVendors: 1000,
    totalSales: 2000000,
    activeUsers: 500,
  }),
  getServerTime: vi.fn().mockResolvedValue('January 1, 2024, 12:00:00 PM'),
}));

// Mock the components
vi.mock('./components/VendorStats', () => ({
  default: () =>
    React.createElement(
      'div',
      { 'data-testid': 'vendor-stats' },
      'Vendor Stats'
    ),
}));

vi.mock('./components/ContactForm', () => ({
  default: () =>
    React.createElement(
      'div',
      { 'data-testid': 'contact-form' },
      'Contact Form'
    ),
}));

describe('Page', () => {
  it('renders without crashing', async () => {
    render(await Page());
    expect(screen.getByText(/Welcome to Vendemás/i)).toBeInTheDocument();
  });

  it('renders vendor stats component', async () => {
    render(await Page());
    expect(screen.getByTestId('vendor-stats')).toBeInTheDocument();
  });

  it('renders contact form component', async () => {
    render(await Page());
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
  });
});
