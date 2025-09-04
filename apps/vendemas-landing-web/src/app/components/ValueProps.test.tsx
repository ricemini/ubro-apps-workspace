import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ValueProps from './ValueProps';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: (): void => null,
  unobserve: (): void => null,
  disconnect: (): void => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
  TrendingUp: (): React.JSX.Element => (
    <div data-testid='trending-up-icon'>📈</div>
  ),
  Brain: (): React.JSX.Element => <div data-testid='brain-icon'>🧠</div>,
  ShieldCheck: (): React.JSX.Element => (
    <div data-testid='shield-check-icon'>🛡️</div>
  ),
  Smartphone: (): React.JSX.Element => (
    <div data-testid='smartphone-icon'>📱</div>
  ),
  ArrowRight: ({ className }: { className?: string }): React.JSX.Element => (
    <div data-testid='arrow-right-icon' className={className}>
      →
    </div>
  ),
}));

describe('ValueProps Component', () => {
  const renderComponent = (): ReturnType<typeof render> => {
    return render(<ValueProps />);
  };

  describe('Rendering', () => {
    it('renders the main section with correct heading', () => {
      renderComponent();

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeTruthy();
      expect(heading.textContent).toContain('¿Por qué elegir VendeMás?');
    });

    it('renders the subtitle with correct content', () => {
      renderComponent();

      const subtitle = screen.getByText(
        /Diseñado para las necesidades de las PyMES/
      );
      expect(subtitle).toBeTruthy();
      expect(subtitle.textContent).toContain('de México y Latinoamérica');
    });

    it('renders all four value proposition cards', () => {
      renderComponent();

      const cards = screen.getAllByRole('article');
      expect(cards).toHaveLength(4);
    });

    it('renders the correct number of icons', () => {
      renderComponent();

      const trendingIcon = screen.getByTestId('trending-up-icon');
      const brainIcon = screen.getByTestId('brain-icon');
      const shieldIcon = screen.getByTestId('shield-check-icon');
      const smartphoneIcon = screen.getByTestId('smartphone-icon');

      expect(trendingIcon).toBeTruthy();
      expect(brainIcon).toBeTruthy();
      expect(shieldIcon).toBeTruthy();
      expect(smartphoneIcon).toBeTruthy();
    });
  });

  describe('Value Proposition Content', () => {
    it('displays correct titles for all cards', () => {
      renderComponent();

      expect(screen.getByText('Aumenta tus ventas')).toBeTruthy();
      expect(screen.getByText('Inteligencia para Vender Más')).toBeTruthy();
      expect(screen.getByText('Pagos seguros y sin límites')).toBeTruthy();
      expect(
        screen.getByText('Fácil de usar, siempre disponible')
      ).toBeTruthy();
    });

    it('displays correct descriptions for all cards', () => {
      renderComponent();

      expect(
        screen.getByText(/Acepta más formas de pago y nunca pierdas una venta/)
      ).toBeTruthy();
      expect(
        screen.getByText(/Entiende a tus clientes y optimiza tu catálogo/)
      ).toBeTruthy();
      expect(
        screen.getByText(/Transacciones rápidas y protegidas/)
      ).toBeTruthy();
      expect(
        screen.getByText(
          /Una interfaz intuitiva que funciona en cualquier dispositivo/
        )
      ).toBeTruthy();
    });

    it('displays correct statistics for all cards', () => {
      renderComponent();

      expect(screen.getByText('+40%')).toBeTruthy();
      expect(screen.getByText('Asistente IA')).toBeTruthy();
      expect(screen.getByText('100%')).toBeTruthy();
      expect(screen.getByText('< 5 minutos')).toBeTruthy();
    });

    it('displays correct stat labels for all cards', () => {
      renderComponent();

      expect(screen.getByText('de aumento en ventas')).toBeTruthy();
      expect(
        screen.getByText('Análisis y Decisiones Inteligente')
      ).toBeTruthy();
      expect(screen.getByText('de transacciones seguras')).toBeTruthy();
      expect(screen.getByText('Tiempo de aprendizaje')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA region with descriptive label', () => {
      renderComponent();

      const region = screen.getByRole('region');
      expect(region).toBeTruthy();
      expect(region.getAttribute('aria-label')).toBe(
        'Características principales de VendeMás'
      );
    });

    it('has proper ARIA labels for each card', () => {
      renderComponent();

      const cards = screen.getAllByRole('article');
      cards.forEach((card, index) => {
        expect(card.getAttribute('aria-labelledby')).toBe(`title-${index}`);
        expect(card.getAttribute('aria-describedby')).toBe(
          `desc-${index} stats-${index}`
        );
      });
    });

    it('has proper IDs for ARIA relationships', () => {
      renderComponent();

      const titles = [
        'Aumenta tus ventas',
        'Inteligencia para Vender Más',
        'Pagos seguros y sin límites',
        'Fácil de usar, siempre disponible',
      ];

      titles.forEach((title, index) => {
        const titleElement = screen.getByText(title);
        expect(titleElement.getAttribute('id')).toBe(`title-${index}`);
      });
    });

    it('has proper heading hierarchy', () => {
      renderComponent();

      const h2 = screen.getByRole('heading', { level: 2 });
      const h3s = screen.getAllByRole('heading', { level: 3 });

      expect(h2).toBeTruthy();
      expect(h3s).toHaveLength(4);
    });

    it('has proper button accessibility', () => {
      renderComponent();

      const buttons = screen.getAllByRole('button');
      const mobileButton = buttons.find(button =>
        button.textContent?.includes('Comenzar gratis')
      );
      const secondaryButton = buttons.find(button =>
        button.textContent?.includes('Únete gratis a 10,000+ vendedores')
      );

      expect(mobileButton?.getAttribute('aria-label')).toBe(
        'Comenzar a usar VendeMás de forma gratuita'
      );
      expect(secondaryButton?.getAttribute('aria-label')).toBe(
        'Comenzar a usar VendeMás de forma gratuita en minutos'
      );
    });
  });

  describe('Interactive Elements', () => {
    it('has focusable cards with tabIndex', () => {
      renderComponent();

      const cards = screen.getAllByRole('article');
      cards.forEach(card => {
        expect(card.getAttribute('tabIndex')).toBe('0');
      });
    });

    it('has proper focus styles applied', () => {
      renderComponent();

      const cards = screen.getAllByRole('article');
      cards.forEach(card => {
        expect(card.className).toContain('focus-within:ring-2');
        expect(card.className).toContain('focus-within:ring-primary-500');
      });
    });

    it('has proper hover effects', () => {
      renderComponent();

      const cards = screen.getAllByRole('article');
      cards.forEach(card => {
        expect(card.className).toContain('hover:shadow-xl');
        expect(card.className).toContain('hover:border-primary-200');
      });
    });
  });

  describe('Layout and Styling', () => {
    it('has responsive grid layout', () => {
      renderComponent();

      const grid = screen.getByRole('region');
      expect(grid.className).toContain('grid');
      expect(grid.className).toContain('md:grid-cols-2');
      expect(grid.className).toContain('lg:grid-cols-4');
    });

    it('has proper spacing and padding', () => {
      renderComponent();

      const section = screen.getByRole('region').closest('section');
      expect(section?.className).toContain('py-20');

      const cards = screen.getAllByRole('article');
      cards.forEach(card => {
        expect(card.className).toContain('p-8');
      });
    });

    it('has dark mode support', () => {
      renderComponent();

      const section = screen.getByRole('region').closest('section');
      expect(section?.className).toContain('dark:bg-gray-900');

      const cards = screen.getAllByRole('article');
      cards.forEach(card => {
        expect(card.className).toContain('dark:bg-gray-800');
        expect(card.className).toContain('dark:border-gray-700');
      });
    });
  });

  describe('Mobile Sticky CTA', () => {
    it('renders mobile sticky CTA button with correct text', () => {
      renderComponent();

      const buttons = screen.getAllByRole('button');
      const mobileButton = buttons.find(button =>
        button.textContent?.includes('Comenzar gratis')
      );
      expect(mobileButton).toBeTruthy();
      expect(mobileButton?.textContent).toContain('Comenzar gratis');
    });

    it('has proper mobile-specific styling', () => {
      renderComponent();

      const buttons = screen.getAllByRole('button');
      const mobileButton = buttons.find(button =>
        button.textContent?.includes('Comenzar gratis')
      );
      expect(mobileButton?.className).toContain('w-full');
      expect(mobileButton?.className).toContain('bg-gradient-primary');
      expect(mobileButton?.className).toContain('rounded-xl');
      expect(mobileButton?.className).toContain('shadow-lg');
    });

    it('has proper accessibility attributes for mobile button', () => {
      renderComponent();

      const buttons = screen.getAllByRole('button');
      const mobileButton = buttons.find(button =>
        button.textContent?.includes('Comenzar gratis')
      );
      expect(mobileButton?.getAttribute('aria-label')).toBe(
        'Comenzar a usar VendeMás de forma gratuita'
      );
    });

    it('has mobile container with proper responsive classes', () => {
      renderComponent();

      const buttons = screen.getAllByRole('button');
      const mobileButton = buttons.find(button =>
        button.textContent?.includes('Comenzar gratis')
      );
      const mobileContainer = mobileButton?.closest('div');
      expect(mobileContainer?.className).toContain('block');
      expect(mobileContainer?.className).toContain('sm:hidden');
      expect(mobileContainer?.className).toContain('fixed');
      expect(mobileContainer?.className).toContain('bottom-4');
      expect(mobileContainer?.className).toContain('z-50');
    });
  });

  describe('Secondary CTA Button', () => {
    it('renders secondary CTA button with correct text', () => {
      renderComponent();

      const buttons = screen.getAllByRole('button');
      const secondaryButton = buttons.find(button =>
        button.textContent?.includes('Únete gratis a 10,000+ vendedores')
      );
      expect(secondaryButton).toBeTruthy();
      expect(secondaryButton?.textContent).toContain(
        'Únete gratis a 10,000+ vendedores'
      );
    });

    it('renders arrow icon in secondary CTA button', () => {
      renderComponent();

      const arrowIcons = screen.getAllByTestId('arrow-right-icon');
      expect(arrowIcons).toHaveLength(2); // Mobile sticky CTA and secondary CTA
    });

    it('has proper accessibility attributes for secondary button', () => {
      renderComponent();

      const buttons = screen.getAllByRole('button');
      const secondaryButton = buttons.find(button =>
        button.textContent?.includes('Únete gratis a 10,000+ vendedores')
      );
      expect(secondaryButton?.getAttribute('aria-label')).toBe(
        'Comenzar a usar VendeMás de forma gratuita en minutos'
      );
    });

    it('has proper styling and hover effects for secondary button', () => {
      renderComponent();

      const buttons = screen.getAllByRole('button');
      const secondaryButton = buttons.find(button =>
        button.textContent?.includes('Únete gratis a 10,000+ vendedores')
      );
      expect(secondaryButton?.className).toContain('group');
      expect(secondaryButton?.className).toContain('bg-gradient-to-r');
      expect(secondaryButton?.className).toContain('from-secondary-500');
      expect(secondaryButton?.className).toContain('to-secondary-600');
      expect(secondaryButton?.className).toContain('dark:bg-gradient-primary');
    });

    it('has animated arrow with proper classes', () => {
      renderComponent();

      const arrowIcons = screen.getAllByTestId('arrow-right-icon');
      expect(arrowIcons).toHaveLength(2); // Mobile sticky CTA and secondary CTA

      // Check the secondary CTA arrow (second one)
      const secondaryArrow = arrowIcons[1];
      expect(secondaryArrow.className).toContain('h-5');
      expect(secondaryArrow.className).toContain('w-5');
      expect(secondaryArrow.className).toContain('transition-all');
      expect(secondaryArrow.className).toContain('duration-200');
      expect(secondaryArrow.className).toContain('group-hover:scale-110');
      expect(secondaryArrow.className).toContain('group-hover:translate-x-0.5');
    });
  });

  describe('Scroll-Triggered Animations', () => {
    it('has initial hidden state before scroll trigger', () => {
      renderComponent();

      const cards = screen.getAllByRole('article');
      cards.forEach(card => {
        expect(card.className).toContain('opacity-0');
        expect(card.className).toContain('translate-y-3');
      });
    });

    it('has proper animation duration and fill mode', () => {
      renderComponent();

      const cards = screen.getAllByRole('article');
      cards.forEach(card => {
        expect(card.style.animationDuration).toBe('600ms');
        expect(card.style.animationFillMode).toBe('both');
      });
    });

    it('has animation delay set to 0ms initially', () => {
      renderComponent();

      const cards = screen.getAllByRole('article');
      cards.forEach(card => {
        expect(card.style.animationDelay).toBe('0ms');
      });
    });

    it('has section element with proper ID for navigation', () => {
      renderComponent();

      const section = screen.getByRole('region').closest('section');
      expect(section?.getAttribute('id')).toBe('por-que-vendemas');
    });

    it('has intersection observer ref attached to section', () => {
      renderComponent();

      const section = screen.getByRole('region').closest('section');
      expect(section).toBeTruthy();
      // The ref is attached but not directly testable in this context
      // This test ensures the section exists for the observer to attach to
    });

    it('is a client component with proper React hooks usage', () => {
      // This test verifies the component renders without errors
      // which indicates proper client-side React hooks usage
      renderComponent();

      const section = screen.getByRole('region').closest('section');
      expect(section).toBeTruthy();

      // Component should render all cards in initial hidden state
      const cards = screen.getAllByRole('article');
      expect(cards).toHaveLength(4);
    });
  });

  describe('CTA Section', () => {
    it('renders CTA section with correct content', () => {
      renderComponent();

      expect(
        screen.getByText(/Únete gratis a 10,000\+ vendedores/)
      ).toBeTruthy();
      expect(
        screen.getByText(/Sin costos ocultos, sin permanencia/)
      ).toBeTruthy();
    });
  });

  describe('Data Structure', () => {
    it('renders the expected number of value propositions', () => {
      renderComponent();

      // Should render exactly 4 value propositions
      const titles = screen.getAllByRole('heading', { level: 3 });
      expect(titles).toHaveLength(4);

      const descriptions = screen.getAllByText(
        /Acepta más formas|Entiende a tus clientes|Transacciones rápidas|Una interfaz intuitiva/
      );
      expect(descriptions).toHaveLength(4);
    });

    it('maintains proper content hierarchy in each card', () => {
      renderComponent();

      const cards = screen.getAllByRole('article');
      cards.forEach(card => {
        // Each card should have an icon, title, description, and stats
        expect(card.querySelector('[data-testid*="-icon"]')).toBeTruthy();
        expect(card.querySelector('h3')).toBeTruthy();
        expect(card.querySelector('p')).toBeTruthy();
        expect(card.querySelector('.border-t')).toBeTruthy(); // Stats separator
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles empty or missing data gracefully', () => {
      // This test ensures the component doesn't crash with unexpected data
      // The component currently has hardcoded data, so this is more of a future-proofing test
      renderComponent();

      // Component should render without errors
      expect(screen.getByRole('region')).toBeTruthy();
    });

    it('maintains accessibility with different content lengths', () => {
      renderComponent();

      // All cards should have the same height due to flex-1 class
      const cards = screen.getAllByRole('article');
      cards.forEach(card => {
        expect(card.className).toContain('flex');
        expect(card.className).toContain('flex-col');
        expect(card.className).toContain('h-full');
      });
    });
  });
});
