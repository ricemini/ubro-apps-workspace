import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { afterEach } from 'vitest';
import HerramientasPageClient from '../HerramientasPageClient';
import CyclingFeatureCard, {
  FeatureNavigationDots,
} from '../../components-site/CyclingFeatureCard';
import PrimaryCTA from '../../components-site/PrimaryCTA';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('Dark Mode Support', () => {
  beforeEach(() => {
    // Mock dark mode by adding dark class to document
    document.documentElement.classList.add('dark');
  });

  afterEach(() => {
    // Clean up dark mode
    document.documentElement.classList.remove('dark');
  });

  describe('HerramientasPageClient Dark Mode', () => {
    it('should render with dark mode styles', () => {
      const { container } = render(<HerramientasPageClient />);

      // Check for dark mode background gradients
      const backgroundElements = container.querySelectorAll(
        '[class*="dark:bg-"]'
      );
      expect(backgroundElements.length).toBeGreaterThan(0);

      // Check for dark mode text colors
      const textElements = container.querySelectorAll('[class*="dark:text-"]');
      expect(textElements.length).toBeGreaterThan(0);
    });

    it('should have proper contrast in dark mode', () => {
      const { container } = render(<HerramientasPageClient />);

      // Check for dark mode text colors
      const h1 = container.querySelector('h1');
      expect(h1).toHaveClass('dark:text-gray-100');

      const p = container.querySelector('p');
      expect(p).toHaveClass('dark:text-gray-300');
    });

    it('should not have accessibility violations in dark mode', async () => {
      const { container } = render(<HerramientasPageClient />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('CyclingFeatureCard Dark Mode', () => {
    it('should render with dark mode styles', () => {
      const { container } = render(<CyclingFeatureCard />);

      // Check for dark mode card background
      const card = container.querySelector('section');
      expect(card).toHaveClass('dark:border-accent-400');

      const innerCard = container.querySelector('div');
      expect(innerCard).toHaveClass('dark:bg-gray-800/90');
    });

    it('should have proper feature button styling in dark mode', () => {
      const { container } = render(<CyclingFeatureCard />);

      const featureButtons = container.querySelectorAll('button');
      featureButtons.forEach(button => {
        if (button.getAttribute('aria-label')?.includes('Punto de Venta')) {
          expect(button).toHaveClass('dark:bg-gray-700');
          expect(button).toHaveClass('dark:border-gray-600/60');
        }
      });
    });

    it('should have proper play/pause button styling in dark mode', () => {
      const { container } = render(<CyclingFeatureCard />);

      const playPauseButton = container.querySelector(
        'button[aria-label*="animación"]'
      );
      expect(playPauseButton).toBeInTheDocument();

      // Check for dark mode classes on the button background
      const buttonBg = playPauseButton?.querySelector('div.relative');
      expect(buttonBg).toHaveClass('dark:bg-gray-700/95');
    });

    it('should not have accessibility violations in dark mode', async () => {
      const { container } = render(<CyclingFeatureCard />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('FeatureNavigationDots Dark Mode', () => {
    const mockOnIndexChange = vi.fn();

    beforeEach(() => {
      mockOnIndexChange.mockClear();
    });

    it('should render with dark mode styles', () => {
      const { container } = render(
        <FeatureNavigationDots
          currentIndex={0}
          onIndexChange={mockOnIndexChange}
        />
      );

      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('dark:bg-gray-800/90');
      expect(nav).toHaveClass('dark:border-gray-600/60');
    });

    it('should have proper dot styling in dark mode', () => {
      const { container } = render(
        <FeatureNavigationDots
          currentIndex={0}
          onIndexChange={mockOnIndexChange}
        />
      );

      const dots = container.querySelectorAll('button');
      expect(dots.length).toBe(5);

      // Check active dot
      const activeDot = dots[0];
      expect(activeDot).toHaveClass('dark:from-primary-400');
      expect(activeDot).toHaveClass('dark:to-primary-500');

      // Check inactive dots
      const inactiveDots = Array.from(dots).slice(1);
      inactiveDots.forEach(dot => {
        expect(dot).toHaveClass('dark:bg-gray-600');
        expect(dot).toHaveClass('dark:hover:bg-gray-500');
      });
    });

    it('should not have accessibility violations in dark mode', async () => {
      const { container } = render(
        <FeatureNavigationDots
          currentIndex={0}
          onIndexChange={mockOnIndexChange}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('PrimaryCTA Dark Mode', () => {
    const defaultProps = {
      text: 'Get Started',
      href: '/signup',
    };

    it('should render with dark mode styles', () => {
      const { container } = render(<PrimaryCTA {...defaultProps} />);

      const link = container.querySelector('a');
      expect(link).toHaveClass('dark:focus-visible:ring-offset-gray-900');
    });

    it('should maintain gradient background in dark mode', () => {
      const { container } = render(<PrimaryCTA {...defaultProps} />);

      const link = container.querySelector('a');
      expect(link).toHaveStyle({
        backgroundImage: 'linear-gradient(135deg, #2f7d32 0%, #8b5cf6 100%)',
      });
    });

    it('should not have accessibility violations in dark mode', async () => {
      const { container } = render(<PrimaryCTA {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Dark Mode Transitions', () => {
    it('should have smooth transitions between light and dark mode', () => {
      const { container } = render(<HerramientasPageClient />);

      // Check for transition classes
      const elementsWithTransitions = container.querySelectorAll(
        '[class*="transition-all"]'
      );
      expect(elementsWithTransitions.length).toBeGreaterThan(0);

      // Check for duration classes
      const elementsWithDuration = container.querySelectorAll(
        '[class*="duration-"]'
      );
      expect(elementsWithDuration.length).toBeGreaterThan(0);
    });
  });
});
