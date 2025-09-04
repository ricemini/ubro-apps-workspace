import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Hero from './Hero';

// Mock child components to isolate Hero component testing
vi.mock('./HeroBackground', () => ({
  default: () => <div data-testid='hero-background'>Hero Background</div>,
}));

vi.mock('./trust/TrustStrip', () => ({
  default: () => <div data-testid='trust-strip'>Trust Strip</div>,
  RiskReducers: () => <div data-testid='risk-reducers'>Risk Reducers</div>,
}));

vi.mock('./seo/AggregateRatingJsonLd', () => ({
  default: () => (
    <div data-testid='aggregate-rating-json-ld'>Aggregate Rating JSON-LD</div>
  ),
}));

vi.mock('./price-flip-badge/PriceFlipBadge', () => ({
  default: () => <div data-testid='price-flip-badge'>Price Flip Badge</div>,
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
  beforeEach(() => {
    vi.clearAllMocks();
    mockScrollY.mockReturnValue(0);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Core Rendering', () => {
    it('renders the main hero section', () => {
      render(<Hero />);

      expect(screen.getByRole('banner')).toBeTruthy();
      expect(screen.getByRole('main')).toBeTruthy();
    });

    it('renders all child components', () => {
      render(<Hero />);

      expect(screen.getByTestId('hero-background')).toBeTruthy();
      expect(screen.getByTestId('trust-strip')).toBeTruthy();
      expect(screen.getByTestId('risk-reducers')).toBeTruthy();
      expect(screen.getByTestId('price-flip-badge')).toBeTruthy();
      expect(screen.getByTestId('aggregate-rating-json-ld')).toBeTruthy();
    });

    it('renders the main headline', () => {
      render(<Hero />);

      // The text is split across multiple spans, so we need to check for partial matches
      expect(screen.getByText(/Todo tu negocio/)).toBeTruthy();
      expect(screen.getByText(/impulsado por IA/)).toBeTruthy();
    });

    it('renders subtitle and description', () => {
      render(<Hero />);

      expect(screen.getByText('Vende más, sin complicarte.')).toBeTruthy();
      expect(screen.getByText(/Gestiona tu negocio/)).toBeTruthy();
    });
  });

  describe('Call-to-Action Buttons', () => {
    it('renders primary CTA button', () => {
      render(<Hero />);

      const primaryCTA = screen.getByText('Comenzar gratis');
      expect(primaryCTA).toBeTruthy();
      expect(primaryCTA.closest('a')?.getAttribute('href')).toBe('/signup');
    });

    it('renders secondary CTA link', () => {
      render(<Hero />);

      const secondaryCTA = screen.getByText('Conoce todas las herramientas');
      expect(secondaryCTA).toBeTruthy();
      expect(secondaryCTA.closest('a')?.getAttribute('href')).toBe(
        '/caracteristicas'
      );
    });

    it('renders chevron icon', () => {
      render(<Hero />);

      const chevron = document.querySelector('svg[aria-hidden="true"]');
      expect(chevron).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('provides skip link for keyboard navigation', () => {
      render(<Hero />);

      const skipLink = screen.getByText('Saltar al contenido principal');
      expect(skipLink).toBeTruthy();
      expect(skipLink.closest('a')?.getAttribute('href')).toBe('#main-content');
    });

    it('has proper ARIA labels', () => {
      render(<Hero />);

      expect(screen.getByLabelText('Acciones principales')).toBeTruthy();
      expect(
        screen.getByLabelText(/Placeholder para imagen hero/)
      ).toBeTruthy();
    });

    it('has proper screen reader descriptions', () => {
      render(<Hero />);

      expect(
        screen.getByText(/Botón para comenzar a usar VendeMás/)
      ).toBeTruthy();
      expect(
        screen.getByText(/Enlace para ver todas las características/)
      ).toBeTruthy();
    });
  });

  describe('Scroll Behavior', () => {
    it('sets up scroll event listener on mount', () => {
      render(<Hero />);

      expect(mockAddEventListener).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      );
    });

    it('removes scroll event listener on unmount', () => {
      const { unmount } = render(<Hero />);

      unmount();

      expect(mockRemoveEventListener).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      );
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive grid layout', () => {
      render(<Hero />);

      const gridContainer = screen.getByRole('main').querySelector('.grid');
      expect(gridContainer).toBeTruthy();
    });

    it('uses responsive typography', () => {
      render(<Hero />);

      // The text is split across multiple spans, so we need to use a more flexible approach
      const headline = screen.getByRole('heading', { level: 1 });
      expect(headline?.className).toContain('text-5xl');
      expect(headline?.className).toContain('md:text-6xl');
    });
  });

  describe('Hero Image', () => {
    it('renders hero image placeholder', () => {
      render(<Hero />);

      expect(screen.getByRole('img')).toBeTruthy();
      expect(screen.getByText('Hero Image Placeholder')).toBeTruthy();
    });

    it('has proper image description', () => {
      render(<Hero />);

      expect(
        screen.getByText(/Imagen representativa de la aplicación VendeMás/)
      ).toBeTruthy();
    });
  });

  describe('SEO and Structured Data', () => {
    it('renders aggregate rating JSON-LD', () => {
      render(<Hero />);

      expect(screen.getByTestId('aggregate-rating-json-ld')).toBeTruthy();
    });

    it('has proper main content ID', () => {
      render(<Hero />);

      const mainContent = screen.getByRole('main');
      expect(mainContent.id).toBe('main-content');
    });
  });

  describe('Component Integration', () => {
    it('integrates all child components without conflicts', () => {
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
    it('handles scroll events safely', () => {
      render(<Hero />);

      // Component should render without throwing errors
      expect(screen.getByRole('banner')).toBeTruthy();
    });
  });
});
