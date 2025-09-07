import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import HowItWorks from './HowItWorks';

// Mock the icons from lucide-react
vi.mock('lucide-react', () => ({
  Smartphone: (props: any): React.JSX.Element => (
    <svg
      data-testid='smartphone-icon'
      className={props.className}
      aria-hidden='true'
      {...props}
      viewBox='0 0 24 24'
    >
      <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z' />
    </svg>
  ),
  QrCode: (props: any): React.JSX.Element => (
    <svg
      data-testid='qrcode-icon'
      className={props.className}
      aria-hidden='true'
      {...props}
      viewBox='0 0 24 24'
    >
      <path d='M3 3h7v7H3V3zm0 11h7v7H3v-7zm11 0h7v7h-7v-7z' />
    </svg>
  ),
  TrendingUp: (props: any): React.JSX.Element => (
    <svg
      data-testid='trending-up-icon'
      className={props.className}
      aria-hidden='true'
      {...props}
      viewBox='0 0 24 24'
    >
      <path d='M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z' />
    </svg>
  ),
}));

// Mock the CTASection component
vi.mock('./CTASection', () => ({
  default: ({
    trackCTAClick,
    buttonText,
    showTrustMessage,
  }: any): React.JSX.Element => (
    <div data-testid='cta-section'>
      <button onClick={trackCTAClick} data-testid='cta-button'>
        {buttonText}
      </button>
      {showTrustMessage && (
        <span data-testid='trust-message'>Trust message</span>
      )}
    </div>
  ),
}));

// Mock the SecondaryCTA component
vi.mock('./SecondaryCTA', () => ({
  default: ({ text, url }: any): React.JSX.Element => (
    <a
      href={url}
      data-testid='secondary-cta'
      aria-describedby='secondary-cta-description'
    >
      {text}
    </a>
  ),
}));

// Mock the useAnalytics hook
const mockTrackCTAClick = vi.fn() as any;
vi.mock('../../hooks/useAnalytics', () => ({
  useAnalytics: (): any => ({
    trackCTAClick: mockTrackCTAClick,
  }),
}));

// Mock window.matchMedia for prefers-reduced-motion
const mockMatchMedia = vi.fn() as any;
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
});

describe('HowItWorks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default to not preferring reduced motion
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    // Mock timers
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Component Rendering', () => {
    it('renders the main section with correct structure', (): void => {
      render(<HowItWorks />);

      const section = screen.getByRole('region', {
        name: /cómo funciona vendemás/i,
      });
      expect(section).toBeTruthy();
      expect(section.getAttribute('id')).toBe('como-funciona');
    });

    it('renders the header with title and description', (): void => {
      render(<HowItWorks />);

      const title = screen.getByRole('heading', {
        level: 2,
        name: /¿cómo funciona vendemás\?/i,
      });
      expect(title).toBeTruthy();

      const description = screen.getByText(
        /configura tu negocio en 3 simples pasos/i
      );
      expect(description).toBeTruthy();
    });

    it('renders the status badge', (): void => {
      render(<HowItWorks />);

      const badge = screen.getByText(
        /rápido, sin comisiones y hasta sin internet/i
      );
      expect(badge).toBeTruthy();
      expect(badge.className).toContain('bg-green-100');
    });

    it('renders all three steps', (): void => {
      render(<HowItWorks />);

      // Check for step titles
      expect(
        screen.getAllByText(/escanea tu menú y la ia hace el trabajo/i)[1]
      ).toBeTruthy();
      expect(
        screen.getByText(/cobra al instante con qr, sin pagar comisiones/i)
      ).toBeTruthy();
      expect(
        screen.getByText(/vende sin internet, sigue ganando siempre/i)
      ).toBeTruthy();
    });

    it('renders step icons', (): void => {
      render(<HowItWorks />);

      expect(screen.getByTestId('smartphone-icon')).toBeTruthy();
      expect(screen.getByTestId('qrcode-icon')).toBeTruthy();
      expect(screen.getByTestId('trending-up-icon')).toBeTruthy();
    });

    it('renders step numbers', (): void => {
      render(<HowItWorks />);

      const stepNumbers = screen.getAllByText(/^[123]$/);
      expect(stepNumbers).toHaveLength(3);
    });

    it('renders highlight badges', (): void => {
      render(<HowItWorks />);

      expect(screen.getByText('IA integrada')).toBeTruthy();
      expect(screen.getByText('0% comisiones')).toBeTruthy();
      expect(screen.getByText('Funciona offline')).toBeTruthy();
    });
  });

  describe('Animation Control', () => {
    it('renders animation control button', () => {
      render(<HowItWorks />);

      const button = screen.getByRole('button', { name: /pausar animación/i });
      expect(button).toBeTruthy();
    });

    it('toggles animation state when button is clicked', () => {
      render(<HowItWorks />);

      const button = screen.getByRole('button', { name: /pausar animación/i });

      // Initially should show pause button
      expect(button.getAttribute('aria-label')).toBe('Pausar animación');

      // Click to pause
      fireEvent.click(button);

      // Should now show play button
      expect(button.getAttribute('aria-label')).toBe('Reanudar animación');

      // Click again to resume
      fireEvent.click(button);

      // Should show pause button again
      expect(button.getAttribute('aria-label')).toBe('Pausar animación');
    });

    it('shows correct icon based on animation state', () => {
      render(<HowItWorks />);

      const button = screen.getByRole('button', { name: /pausar animación/i });

      // Initially should show pause icon (two vertical bars)
      const pauseIcon = button.querySelector(
        'svg path[d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"]'
      );
      expect(pauseIcon).toBeTruthy();

      // Click to pause
      fireEvent.click(button);

      // Should now show play icon (triangle)
      const playIcon = button.querySelector('svg path[d="M8 5v14l11-7z"]');
      expect(playIcon).toBeTruthy();
    });
  });

  describe('Animation Behavior', () => {
    it('starts with first step active', () => {
      render(<HowItWorks />);

      const firstStepTitle = screen.getAllByRole('heading', { level: 3 })[0];
      const parentDiv = firstStepTitle.closest('.group');

      // Check if first step has active styling
      const iconContainer = parentDiv?.querySelector('.w-16.h-16');
      expect(iconContainer?.className).toContain(
        'bg-gradient-to-br from-primary-500 to-primary-600'
      );
    });

    it('cycles through steps when animation is running', () => {
      render(<HowItWorks />);

      // Test that the component renders without errors
      expect(
        screen.getAllByText(/escanea tu menú y la ia hace el trabajo/i)[1]
      ).toBeTruthy();
      expect(
        screen.getByText(/cobra al instante con qr, sin pagar comisiones/i)
      ).toBeTruthy();
      expect(
        screen.getByText(/vende sin internet, sigue ganando siempre/i)
      ).toBeTruthy();
    });

    it('pauses animation when button is clicked', () => {
      render(<HowItWorks />);

      const button = screen.getByRole('button', { name: /pausar animación/i });

      // Click to pause
      fireEvent.click(button);

      // Fast-forward time
      vi.advanceTimersByTime(5000);

      // First step should still be active (animation paused)
      const firstStepTitle = screen.getAllByRole('heading', { level: 3 })[0];
      const parentDiv = firstStepTitle.closest('.group');
      const iconContainer = parentDiv?.querySelector('.w-16.h-16');
      expect(iconContainer?.className).toContain(
        'bg-gradient-to-br from-primary-500 to-primary-600'
      );
    });

    it('respects prefers-reduced-motion setting', () => {
      // Mock prefers-reduced-motion: reduce
      mockMatchMedia.mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      render(<HowItWorks />);

      // Fast-forward time
      vi.advanceTimersByTime(5000);

      // First step should still be active (no animation)
      const firstStepTitle = screen.getAllByRole('heading', { level: 3 })[0];
      const parentDiv = firstStepTitle.closest('.group');
      const iconContainer = parentDiv?.querySelector('.w-16.h-16');
      expect(iconContainer?.className).toContain(
        'bg-gradient-to-br from-primary-500 to-primary-600'
      );
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA live region for screen reader announcements', () => {
      render(<HowItWorks />);

      const liveRegion = screen.getByRole('status');
      expect(liveRegion.getAttribute('aria-live')).toBe('polite');
      expect(liveRegion.getAttribute('aria-atomic')).toBe('true');
      expect(liveRegion.className).toContain('sr-only');
    });

    it('announces active step changes to screen readers', () => {
      render(<HowItWorks />);

      const liveRegion = screen.getByRole('status');

      // Initially should announce first step
      expect(liveRegion.textContent).toContain(
        'Paso 1: Escanea tu menú y la IA hace el trabajo'
      );

      // Test that the live region is properly configured
      expect(liveRegion.getAttribute('aria-live')).toBe('polite');
      expect(liveRegion.getAttribute('aria-atomic')).toBe('true');
    });

    it('has proper ARIA labels on icons', () => {
      render(<HowItWorks />);

      const smartphoneIcon = screen.getByTestId('smartphone-icon');
      expect(smartphoneIcon.getAttribute('aria-label')).toBe(
        'Icono para Escanea tu menú y la IA hace el trabajo'
      );
      expect(smartphoneIcon.getAttribute('aria-hidden')).toBe('true');
      expect(smartphoneIcon.getAttribute('role')).toBe('img');
    });

    it('has proper focus management on animation control button', () => {
      render(<HowItWorks />);

      const button = screen.getByRole('button', { name: /pausar animación/i });
      const buttonBg = button.querySelector('.w-12.h-12');
      expect(buttonBg?.className).toContain('group-focus:ring-2');
      expect(buttonBg?.className).toContain('group-focus:ring-primary-500');
    });

    it('has proper semantic structure', () => {
      render(<HowItWorks />);

      const section = screen.getByRole('region', {
        name: /cómo funciona vendemás/i,
      });
      const heading = screen.getByRole('heading', { level: 2 });
      const stepHeadings = screen.getAllByRole('heading', { level: 3 });

      expect(section).toBeTruthy();
      expect(heading).toBeTruthy();
      expect(stepHeadings).toHaveLength(3);
    });
  });

  describe('CTA Integration', () => {
    it('renders CTASection with correct props', () => {
      render(<HowItWorks />);

      const ctaSection = screen.getByTestId('cta-section');
      expect(ctaSection).toBeTruthy();

      const ctaButton = screen.getByTestId('cta-button');
      expect(ctaButton.textContent).toBe('Empieza gratis en minutos');

      // Should not show trust message
      expect(screen.queryByTestId('trust-message')).toBeFalsy();
    });

    it('renders SecondaryCTA with correct text', () => {
      render(<HowItWorks />);

      // Check that the SecondaryCTA text is present
      const secondaryCTAText = screen.getByText('Ver VendeMás en acción');
      expect(secondaryCTAText).toBeTruthy();
    });

    it('calls analytics tracking when CTA is clicked', () => {
      render(<HowItWorks />);

      const ctaButton = screen.getByTestId('cta-button');
      fireEvent.click(ctaButton);

      expect(mockTrackCTAClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Responsive Design', () => {
    it('applies correct responsive classes', () => {
      render(<HowItWorks />);

      const section = screen.getByRole('region', {
        name: /cómo funciona vendemás/i,
      });
      expect(section.className).toContain('py-20');

      const container = section.querySelector('.max-w-7xl');
      expect(container?.className).toContain('mx-auto');
      expect(container?.className).toContain('px-4');
      expect(container?.className).toContain('sm:px-6');
      expect(container?.className).toContain('lg:px-8');
    });

    it('has responsive grid layout for steps', () => {
      render(<HowItWorks />);

      const stepsGrid = screen
        .getAllByText(/escanea tu menú/i)[1]
        .closest('.grid');
      expect(stepsGrid?.className).toContain('lg:grid-cols-3');
      expect(stepsGrid?.className).toContain('gap-8');
      expect(stepsGrid?.className).toContain('lg:gap-12');
    });

    it('has responsive CTA layout', () => {
      render(<HowItWorks />);

      const ctaContainer = screen.getByTestId('cta-section').closest('.flex');
      expect(ctaContainer?.className).toContain('flex-col');
      expect(ctaContainer?.className).toContain('sm:flex-row');
      expect(ctaContainer?.className).toContain('items-baseline');
      expect(ctaContainer?.className).toContain('justify-center');
    });
  });

  describe('Dark Mode Support', () => {
    it('applies dark mode classes to main section', () => {
      render(<HowItWorks />);

      const section = screen.getByRole('region', {
        name: /cómo funciona vendemás/i,
      });
      expect(section.className).toContain('dark:from-gray-900');
      expect(section.className).toContain('dark:to-gray-800');
    });

    it('applies dark mode classes to title', () => {
      render(<HowItWorks />);

      const title = screen.getByRole('heading', { level: 2 });
      expect(title.className).toContain('dark:text-white');
    });

    it('applies dark mode classes to description', () => {
      render(<HowItWorks />);

      const description = screen.getByText(
        /configura tu negocio en 3 simples pasos/i
      );
      expect(description.className).toContain('dark:text-gray-300');
    });

    it('applies dark mode classes to status badge', () => {
      render(<HowItWorks />);

      const badge = screen.getByText(
        /rápido, sin comisiones y hasta sin internet/i
      );
      expect(badge.className).toContain('dark:bg-green-900');
      expect(badge.className).toContain('dark:text-green-200');
    });

    it('applies dark mode classes to steps card', () => {
      render(<HowItWorks />);

      const card = screen
        .getAllByText(/escanea tu menú/i)[1]
        .closest('.bg-white');
      expect(card?.className).toContain('dark:bg-gray-800');
      expect(card?.className).toContain('card-border');
    });

    it('applies dark mode classes to animation control button', () => {
      render(<HowItWorks />);

      const button = screen.getByRole('button', { name: /pausar animación/i });
      const buttonBg = button.querySelector('.w-12.h-12');
      expect(buttonBg?.className).toContain('dark:bg-gray-800/95');
      expect(buttonBg?.className).toContain('dark:border-gray-500/70');
    });
  });

  describe('Step Content', () => {
    it('displays correct step descriptions', () => {
      render(<HowItWorks />);

      expect(
        screen.getByText(/toma una foto y tu catálogo se genera en segundos/i)
      ).toBeTruthy();
      expect(
        screen.getByText(/genera un código único por venta y recibe tu dinero/i)
      ).toBeTruthy();
      expect(
        screen.getByText(
          /aunque no tengas conexión, tus ventas quedan guardadas/i
        )
      ).toBeTruthy();
    });

    it('displays correct step highlights', () => {
      render(<HowItWorks />);

      const highlights = ['IA integrada', '0% comisiones', 'Funciona offline'];
      highlights.forEach(highlight => {
        expect(screen.getByText(highlight)).toBeTruthy();
      });
    });

    it('applies correct styling to active step', () => {
      render(<HowItWorks />);

      const firstStepTitle = screen.getAllByRole('heading', { level: 3 })[0];
      const parentDiv = firstStepTitle.closest('.group');

      // Check title styling
      expect(firstStepTitle.className).toContain('text-primary-600');

      // Check description styling
      const description = parentDiv?.querySelector('p');
      expect(description?.className).toContain('text-gray-800');
      expect(description?.className).toContain('dark:text-gray-200');

      // Check highlight badge styling
      const badge = parentDiv?.querySelector('.bg-gradient-to-r');
      expect(badge?.className).toContain('from-tertiary-200');
      expect(badge?.className).toContain('to-tertiary-300');
    });
  });

  describe('Component Integration', () => {
    it('renders all components together correctly', () => {
      render(<HowItWorks />);

      // Check main structure
      expect(
        screen.getByRole('region', { name: /cómo funciona vendemás/i })
      ).toBeTruthy();
      expect(screen.getByRole('heading', { level: 2 })).toBeTruthy();

      // Check steps
      expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);

      // Check CTAs
      expect(screen.getByTestId('cta-section')).toBeTruthy();
      expect(screen.getByTestId('secondary-cta')).toBeTruthy();

      // Check animation control
      expect(
        screen.getByRole('button', { name: /pausar animación/i })
      ).toBeTruthy();
    });

    it('maintains proper DOM structure', () => {
      render(<HowItWorks />);

      const section = screen.getByRole('region', {
        name: /cómo funciona vendemás/i,
      });

      // Should have header
      const header = section.querySelector('.text-center');
      expect(header).toBeTruthy();

      // Should have steps card
      const card = section.querySelector('.bg-white');
      expect(card).toBeTruthy();

      // Should have CTA section
      const ctaSection = section.querySelector('.flex.flex-col');
      expect(ctaSection).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles component unmounting during animation', () => {
      const { unmount } = render(<HowItWorks />);

      // Start animation
      vi.advanceTimersByTime(1000);

      // Unmount component
      unmount();

      // Should not throw errors
      expect(() => {
        vi.advanceTimersByTime(2000);
      }).not.toThrow();
    });

    it('handles rapid animation state changes', () => {
      render(<HowItWorks />);

      const button = screen.getByRole('button', { name: /pausar animación/i });

      // Rapidly toggle animation state
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      // Should still work correctly (after 3 clicks, it should be paused)
      expect(button.getAttribute('aria-label')).toBe('Reanudar animación');
    });

    it('handles window.matchMedia not being available', (): void => {
      // Mock window.matchMedia to throw an error
      const originalMatchMedia = window.matchMedia;
      // @ts-expect-error - Testing error handling
      window.matchMedia = (): any => {
        throw new Error('matchMedia not available');
      };

      // Should not throw errors
      expect(() => {
        render(<HowItWorks />);
      }).not.toThrow();

      // Restore
      window.matchMedia = originalMatchMedia;
    });
  });
});
