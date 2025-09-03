import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

// Mock window.scrollY and addEventListener/removeEventListener
const mockScrollY = vi.fn();
const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();

Object.defineProperty(window, 'scrollY', {
  get: mockScrollY,
  configurable: true,
});

Object.defineProperty(window, 'addEventListener', {
  value: mockAddEventListener,
  configurable: true,
});

Object.defineProperty(window, 'removeEventListener', {
  value: mockRemoveEventListener,
  configurable: true,
});

describe('Hero Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockScrollY.mockReturnValue(0);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering and Structure', () => {
    it('renders the main hero section with correct semantic structure', () => {
      render(<Hero />);

      const header = screen.getByRole('banner');
      expect(header).toBeTruthy();

      const mainContent = screen.getByRole('main');
      expect(mainContent).toBeTruthy();
    });

    it('renders all child components correctly', () => {
      render(<Hero />);

      expect(screen.getByTestId('hero-background')).toBeTruthy();
      expect(screen.getByTestId('trust-strip')).toBeTruthy();
      expect(screen.getByTestId('risk-reducers')).toBeTruthy();
      expect(screen.getByTestId('aggregate-rating-json-ld')).toBeTruthy();
      expect(screen.getByTestId('price-flip-badge')).toBeTruthy();
    });

    it('renders the main headline with correct text and gradient styling', () => {
      render(<Hero />);

      const headline = screen.getByRole('heading', { level: 1 });
      expect(headline).toBeTruthy();
      expect(headline.textContent).toContain(
        'Todo tu negocio, impulsado por IA'
      );

      // Check for gradient text span
      const gradientSpan = headline.querySelector('span:last-child');
      expect(gradientSpan?.className).toContain('bg-gradient-to-r');
      expect(gradientSpan?.className).toContain('bg-clip-text');
      expect(gradientSpan?.className).toContain('text-transparent');
    });

    it('renders subtitle with correct text and styling', () => {
      render(<Hero />);

      const subtitle = screen.getByText('Vende más, sin complicarte.');
      expect(subtitle).toBeTruthy();
      expect(subtitle.className).toContain('font-display');
      expect(subtitle.className).toContain('text-2xl');
    });

    it('renders description text with correct content and responsive classes', () => {
      render(<Hero />);

      const description = screen.getByText(
        /Gestiona tu negocio, crea un catálogo/
      );
      expect(description).toBeTruthy();
      expect(description.className).toContain('text-lg');
      expect(description.className).toContain('sm:text-xl');
    });
  });

  describe('Accessibility Features', () => {
    it('provides skip link for keyboard navigation', () => {
      render(<Hero />);

      const skipLink = screen.getByText('Saltar al contenido principal');
      expect(skipLink).toBeTruthy();
      expect(skipLink.getAttribute('href')).toBe('#main-content');
      expect(skipLink.className).toContain('sr-only');
    });

    it('renders skip link with proper focus styles', () => {
      render(<Hero />);

      const skipLink = screen.getByText('Saltar al contenido principal');
      expect(skipLink.className).toContain('focus:not-sr-only');
      expect(skipLink.className).toContain('focus:bg-primary-500');
      expect(skipLink.className).toContain('focus:text-white');
    });

    it('has proper ARIA labels and descriptions for CTAs', () => {
      render(<Hero />);

      const ctaGroup = screen.getByRole('group', {
        name: 'Acciones principales',
      });
      expect(ctaGroup).toBeTruthy();

      const primaryCTA = screen.getByRole('button', {
        name: 'Comenzar gratis',
      });
      expect(primaryCTA).toBeTruthy();
      expect(primaryCTA.getAttribute('aria-describedby')).toBe(
        'cta-description'
      );

      const ctaDescription = screen.getByText(
        'Botón para comenzar a usar VendeMás de forma gratuita'
      );
      expect(ctaDescription).toBeTruthy();
      expect(ctaDescription.className).toContain('sr-only');
    });

    it('provides screen reader descriptions for all interactive elements', () => {
      render(<Hero />);

      // Check for features link description
      const featuresDescription = screen.getByText(
        'Enlace para ver todas las características y herramientas de VendeMás'
      );
      expect(featuresDescription).toBeTruthy();
      expect(featuresDescription.className).toContain('sr-only');

      // Check for hero image description
      const imageDescription = screen.getByText(
        'Imagen representativa de la aplicación VendeMás mostrando la interfaz principal con herramientas de gestión empresarial'
      );
      expect(imageDescription).toBeTruthy();
      expect(imageDescription.className).toContain('sr-only');
    });

    it('has proper ARIA live region for dynamic content updates', () => {
      render(<Hero />);

      const liveRegion = screen.getByText(
        'Hero section cargado con opciones de navegación y llamadas a la acción'
      );
      expect(liveRegion).toBeTruthy();
      expect(liveRegion.getAttribute('aria-live')).toBe('polite');
      expect(liveRegion.getAttribute('aria-atomic')).toBe('true');
    });
  });

  describe('Call-to-Action Buttons', () => {
    it('renders primary CTA button with correct styling and attributes', () => {
      render(<Hero />);

      const primaryCTA = screen.getByRole('button', {
        name: 'Comenzar gratis',
      });
      expect(primaryCTA).toBeTruthy();
      expect(primaryCTA.getAttribute('href')).toBe('/signup');
      expect(primaryCTA.className).toContain('bg-primary-500');
      expect(primaryCTA.className).toContain('animate-pulse-custom');
      expect(primaryCTA.getAttribute('data-analytics')).toBe(
        'cta_primary_hero'
      );
    });

    it('renders secondary CTA link with correct styling and hover effects', () => {
      render(<Hero />);

      const secondaryCTA = screen.getByText('Conoce todas las herramientas');
      expect(secondaryCTA).toBeTruthy();
      expect(secondaryCTA.closest('a')?.getAttribute('href')).toBe(
        '#caracteristicas'
      );
      expect(secondaryCTA.closest('a')?.className).toContain('group');
    });

    it('renders chevron icon with proper accessibility attributes', () => {
      render(<Hero />);

      const chevron = document.querySelector('svg[aria-hidden="true"]');
      expect(chevron).toBeTruthy();
      expect(chevron?.className).toContain('lucide');
      expect(chevron?.className).toContain('transition-transform');
    });

    it('applies hover animations to secondary CTA elements', () => {
      render(<Hero />);
      
      const secondaryCTALink = screen.getByText('Conoce todas las herramientas').closest('a');
      expect(secondaryCTALink?.className).toContain('group');
      
      // Check for hover animations on the chevron icon
      const chevron = document.querySelector('svg[aria-hidden="true"]');
      expect(chevron?.className).toContain('group-hover:translate-x-1');
      
      // Check for hover animations on the underline
      const underline = secondaryCTALink?.querySelector('span:last-child');
      expect(underline?.className).toContain('group-hover:w-full');
    });
  });

  describe('Scroll Behavior and PriceFlipBadge Positioning', () => {
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

    it('positions PriceFlipBadge at top when not scrolled', () => {
      mockScrollY.mockReturnValue(0);
      render(<Hero />);
      
      const badgeContainer = screen.getByTestId('price-flip-badge').closest('div');
      expect(badgeContainer?.className).toContain('-top-6');
      expect(badgeContainer?.className).toContain('left-10');
    });

    it('positions PriceFlipBadge at bottom when scrolled past threshold', () => {
      mockScrollY.mockReturnValue(15); // Past 10px threshold
      
      // Mock the scroll event to trigger state change
      const mockHandleScroll = vi.fn();
      mockAddEventListener.mockImplementation((event, handler) => {
        if (event === 'scroll') {
          mockHandleScroll.mockImplementation(handler);
        }
      });
      
      render(<Hero />);
      
      // Simulate scroll event
      mockHandleScroll();
      
      // The badge should now be positioned at bottom on large screens
      const badgeContainer = screen.getByTestId('price-flip-badge').closest('div');
      expect(badgeContainer?.className).toContain('lg:bottom-4');
      expect(badgeContainer?.className).toContain('lg:-left-5');
    });

    it('applies smooth transitions to badge positioning changes', () => {
      render(<Hero />);
      
      const badgeContainer = screen.getByTestId('price-flip-badge').closest('div');
      expect(badgeContainer?.className).toContain('transition-all');
      expect(badgeContainer?.className).toContain('duration-200');
    });
  });

  describe('Responsive Design and Layout', () => {
    it('applies responsive grid layout with proper breakpoints', () => {
      render(<Hero />);

      const gridContainer = screen.getByRole('main').querySelector('.grid');
      expect(gridContainer?.className).toContain('lg:grid-cols-2');
      expect(gridContainer?.className).toContain('gap-6');
    });

    it('uses responsive padding and spacing classes', () => {
      render(<Hero />);

      const mainContainer = screen.getByRole('main');
      expect(mainContainer.className).toContain('px-6');
      expect(mainContainer.className).toContain('sm:pt-2');
      expect(mainContainer.className).toContain('md:pt-4');
      expect(mainContainer.className).toContain('lg:pt-12');
    });

    it('applies responsive typography classes to headline', () => {
      render(<Hero />);

      const headline = screen.getByRole('heading', { level: 1 });
      expect(headline.className).toContain('text-5xl');
      expect(headline.className).toContain('md:text-6xl');
    });

    it('uses responsive text sizing for description', () => {
      render(<Hero />);

      const description = screen.getByText(/Gestiona tu negocio/);
      expect(description.className).toContain('text-lg');
      expect(description.className).toContain('sm:text-xl');
    });
  });

  describe('Motion and Animation', () => {
    it('applies motion-safe animations to trust indicators', () => {
      render(<Hero />);

      const trustContainer = screen.getByTestId('trust-strip').closest('div');
      expect(trustContainer?.className).toContain('motion-safe:animate-in');
      expect(trustContainer?.className).toContain('motion-safe:fade-in');
      expect(trustContainer?.className).toContain('motion-safe:duration-500');
    });

    it('applies staggered animations to risk reducers', () => {
      render(<Hero />);

      const riskContainer = screen.getByTestId('risk-reducers').closest('div');
      expect(riskContainer?.className).toContain('motion-safe:animate-in');
      expect(riskContainer?.className).toContain('motion-safe:fade-in');
      expect(riskContainer?.className).toContain('motion-safe:delay-200');
    });

    it('applies custom pulse animation to primary CTA', () => {
      render(<Hero />);

      const primaryCTA = screen.getByRole('button', {
        name: 'Comenzar gratis',
      });
      expect(primaryCTA.className).toContain('animate-pulse-custom');
    });
  });

  describe('High Contrast and Accessibility Support', () => {
    it('provides high contrast alternatives for gradient text', () => {
      render(<Hero />);

      const gradientSpan = screen.getByText('impulsado por IA');
      expect(gradientSpan.className).toContain(
        'supports-[color-contrast(high)]:bg-secondary-700'
      );
      expect(gradientSpan.className).toContain(
        'supports-[color-contrast(high)]:text-transparent'
      );
    });

    it('provides high contrast alternatives for subtitle', () => {
      render(<Hero />);

      const subtitle = screen.getByText('Vende más, sin complicarte.');
      expect(subtitle.className).toContain(
        'supports-[color-contrast(high)]:text-primary-800'
      );
      expect(subtitle.className).toContain(
        'dark:supports-[color-contrast(high)]:text-primary-200'
      );
    });

    it('provides high contrast alternatives for description text', () => {
      render(<Hero />);

      const description = screen.getByText(/Gestiona tu negocio/);
      expect(description.className).toContain(
        'supports-[color-contrast(high)]:text-gray-700'
      );
      expect(description.className).toContain(
        'dark:supports-[color-contrast(high)]:text-gray-200'
      );
    });
  });

  describe('Hero Image and Visual Elements', () => {
    it('renders hero image placeholder with proper accessibility', () => {
      render(<Hero />);

      const heroImage = screen.getByRole('img', {
        name: /Placeholder para imagen hero/,
      });
      expect(heroImage).toBeTruthy();
      expect(heroImage.getAttribute('aria-describedby')).toBe(
        'hero-image-description'
      );
    });

    it('applies rotation and styling to hero image container', () => {
      render(<Hero />);

      const imageContainer = screen.getByRole('img').closest('div');
      expect(imageContainer?.className).toContain('-rotate-3');
      expect(imageContainer?.className).toContain('rounded-2xl');
      expect(imageContainer?.className).toContain('backdrop-blur');
    });

    it('renders placeholder content with icon and text', () => {
      render(<Hero />);

      expect(screen.getByText('Hero Image Placeholder')).toBeTruthy();
      expect(screen.getByText('1120×720 WebP')).toBeTruthy();

      const icon = document.querySelector('svg[role="img"]');
      expect(icon).toBeTruthy();
    });
  });

  describe('SEO and Structured Data', () => {
    it('renders aggregate rating JSON-LD for SEO', () => {
      render(<Hero />);

      expect(screen.getByTestId('aggregate-rating-json-ld')).toBeTruthy();
    });

    it('has proper main content ID for skip link navigation', () => {
      render(<Hero />);

      const mainContent = screen.getByRole('main');
      expect(mainContent.getAttribute('id')).toBe('main-content');
      expect(mainContent.getAttribute('tabIndex')).toBe('-1');
    });
  });

  describe('Component Integration', () => {
    it('integrates all child components without conflicts', () => {
      render(<Hero />);

      // All components should render without errors
      expect(screen.getByTestId('hero-background')).toBeTruthy();
      expect(screen.getByTestId('trust-strip')).toBeTruthy();
      expect(screen.getByTestId('risk-reducers')).toBeTruthy();
      expect(screen.getByTestId('price-flip-badge')).toBeTruthy();
      expect(screen.getByTestId('aggregate-rating-json-ld')).toBeTruthy();
    });

    it('maintains proper z-index layering for visual hierarchy', () => {
      render(<Hero />);

      const leftColumn = screen.getByText('Todo tu negocio').closest('div');
      expect(leftColumn?.className).toContain('z-20');

      const rightColumn = screen
        .getByTestId('price-flip-badge')
        .closest('div')?.parentElement;
      expect(rightColumn?.className).toContain('z-10');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('handles scroll events safely without errors', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      mockScrollY.mockReturnValue(100);
      render(<Hero />);

      // Simulate scroll event
      const scrollHandler = mockAddEventListener.mock.calls.find(
        call => call[0] === 'scroll'
      )?.[1];

      if (scrollHandler) {
        expect(() => scrollHandler()).not.toThrow();
      }

      consoleSpy.mockRestore();
    });

    it('gracefully handles window object access', () => {
      // Test that component doesn't crash if window is undefined
      const originalWindow = global.window;
      delete global.window;

      expect(() => render(<Hero />)).not.toThrow();

      global.window = originalWindow;
    });
  });
});
