import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Hero from './Hero';

// Mock child components to isolate Hero component testing
vi.mock('./HeroBackground', () => ({
  default: (): React.JSX.Element => (
    <div data-testid='hero-background'>Hero Background</div>
  ),
}));

vi.mock('./trust/TrustStrip', () => ({
  default: (): React.JSX.Element => (
    <div data-testid='trust-strip'>Trust Strip</div>
  ),
  RiskReducers: (): React.JSX.Element => (
    <div data-testid='risk-reducers'>Risk Reducers</div>
  ),
}));

vi.mock('./seo/AggregateRatingJsonLd', () => ({
  default: (): React.JSX.Element => (
    <div data-testid='aggregate-rating-json-ld'>Aggregate Rating JSON-LD</div>
  ),
}));

vi.mock('./price-flip-badge/PriceFlipBadge', () => ({
  default: (): React.JSX.Element => (
    <div data-testid='price-flip-badge'>Price Flip Badge</div>
  ),
}));

// Mock scroll event listeners
const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();
const mockScrollY = vi.fn();

// Mock window object
Object.defineProperty(window, 'addEventListener', {
  value: mockAddEventListener,
  writable: true,
});

Object.defineProperty(window, 'removeEventListener', {
  value: mockRemoveEventListener,
  writable: true,
});

Object.defineProperty(window, 'scrollY', {
  value: mockScrollY,
  writable: true,
});

describe('Hero', () => {
  beforeEach((): void => {
    vi.clearAllMocks();
    mockScrollY.mockReturnValue(0);
  });

  afterEach((): void => {
    vi.clearAllMocks();
  });

  describe('Core Rendering', () => {
    it('renders the main hero section', (): void => {
      render(<Hero />);

      expect(screen.getByRole('banner')).toBeTruthy();
      expect(screen.getByRole('main')).toBeTruthy();
    });

    it('renders all child components', (): void => {
      render(<Hero />);

      expect(screen.getByTestId('hero-background')).toBeTruthy();
      expect(screen.getByTestId('trust-strip')).toBeTruthy();
      expect(screen.getByTestId('risk-reducers')).toBeTruthy();
      expect(screen.getByTestId('price-flip-badge')).toBeTruthy();
      expect(screen.getByTestId('aggregate-rating-json-ld')).toBeTruthy();
    });

    it('renders the main headline', (): void => {
      render(<Hero />);

      // The text is split across multiple spans, so we need to check for partial matches
      expect(screen.getByText(/Todo tu negocio/)).toBeTruthy();
      // Check that the headline contains both parts of the text
      const headline = screen.getByRole('heading', { level: 1 });
      expect(headline.textContent).toContain('impulsado');
      expect(headline.textContent).toContain('por IA');
    });

    it('renders subtitle and description', (): void => {
      render(<Hero />);

      expect(screen.getByText('Vende más, sin complicarte.')).toBeTruthy();
      expect(screen.getByText(/Gestiona tu negocio/)).toBeTruthy();
    });
  });

  describe('Call-to-Action Buttons', () => {
    it('renders primary CTA button', (): void => {
      render(<Hero />);

      const primaryCTA = screen.getByText('Comenzar gratis');
      expect(primaryCTA).toBeTruthy();
      expect(primaryCTA.closest('a')?.getAttribute('href')).toBe('/signup');
    });

    it('renders secondary CTA link', (): void => {
      render(<Hero />);

      const secondaryCTA = screen.getByText('Conoce todas las Herramientas');
      expect(secondaryCTA).toBeTruthy();
      expect(secondaryCTA.closest('a')?.getAttribute('href')).toBe(
        '/soluciones-con-ia'
      );
    });

    it('renders chevron icon', (): void => {
      render(<Hero />);

      const chevron = document.querySelector('svg[aria-hidden="true"]');
      expect(chevron).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('provides skip link for keyboard navigation', (): void => {
      render(<Hero />);

      const skipLink = screen.getByText('Saltar al contenido principal');
      expect(skipLink).toBeTruthy();
      expect(skipLink.closest('a')?.getAttribute('href')).toBe('#main-content');
    });

    it('has proper ARIA labels', (): void => {
      render(<Hero />);

      expect(screen.getByLabelText('Acciones principales')).toBeTruthy();
      expect(
        screen.getByLabelText(/Placeholder para imagen hero/)
      ).toBeTruthy();
    });

    it('has proper screen reader descriptions', (): void => {
      render(<Hero />);

      expect(
        screen.getByText(/Botón para comenzar a usar VendeMás/)
      ).toBeTruthy();
      expect(
        screen.getByText(/Ver todas las herramientas disponibles en VendeMás/)
      ).toBeTruthy();
    });
  });

  describe('Scroll Behavior', () => {
    it('sets up scroll event listener on mount', (): void => {
      render(<Hero />);

      expect(mockAddEventListener).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      );
    });

    it('removes scroll event listener on unmount', (): void => {
      const { unmount } = render(<Hero />);

      unmount();

      expect(mockRemoveEventListener).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      );
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive grid layout', (): void => {
      render(<Hero />);

      const gridContainer = screen.getByRole('main').querySelector('.grid');
      expect(gridContainer).toBeTruthy();
    });

    it('uses responsive typography', (): void => {
      render(<Hero />);

      // The text is split across multiple spans, so we need to use a more flexible approach
      const headline = screen.getByRole('heading', { level: 1 });
      expect(headline?.className).toContain('text-5xl');
      expect(headline?.className).toContain('md:text-6xl');
    });
  });

  describe('Hero Image', () => {
    it('renders hero image placeholder', (): void => {
      render(<Hero />);

      expect(screen.getByRole('img')).toBeTruthy();
      expect(screen.getByText('Hero Image Placeholder')).toBeTruthy();
    });

    it('has proper image description', (): void => {
      render(<Hero />);

      expect(
        screen.getByText(/Imagen representativa de la aplicación VendeMás/)
      ).toBeTruthy();
    });
  });

  describe('SEO and Structured Data', () => {
    it('renders aggregate rating JSON-LD', (): void => {
      render(<Hero />);

      expect(screen.getByTestId('aggregate-rating-json-ld')).toBeTruthy();
    });

    it('has proper main content ID', (): void => {
      render(<Hero />);

      const mainContent = screen.getByRole('main');
      expect(mainContent.id).toBe('main-content');
    });
  });

  describe('Component Integration', () => {
    it('integrates all child components without conflicts', (): void => {
      render(<Hero />);

      // All child components should render without errors
      expect(screen.getByTestId('hero-background')).toBeTruthy();
      expect(screen.getByTestId('trust-strip')).toBeTruthy();
      expect(screen.getByTestId('risk-reducers')).toBeTruthy();
      expect(screen.getByTestId('price-flip-badge')).toBeTruthy();
      expect(screen.getByTestId('aggregate-rating-json-ld')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles scroll events safely', (): void => {
      render(<Hero />);

      // Component should render without throwing errors
      expect(screen.getByRole('banner')).toBeTruthy();
    });
  });
});
