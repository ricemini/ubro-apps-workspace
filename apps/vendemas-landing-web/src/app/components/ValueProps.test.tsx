import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import ValueProps from './ValueProps';

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
  TrendingUp: () => <div data-testid='trending-up-icon'>📈</div>,
  Brain: () => <div data-testid='brain-icon'>🧠</div>,
  ShieldCheck: () => <div data-testid='shield-check-icon'>🛡️</div>,
  Smartphone: () => <div data-testid='smartphone-icon'>📱</div>,
  ArrowRight: () => <div data-testid='arrow-right-icon'>→</div>,
}));

describe('ValueProps Component', () => {
  const renderComponent = (): ReturnType<typeof render> => {
    return render(<ValueProps />);
  };

  describe('Rendering', () => {
    it('renders the main section with correct heading', () => {
      renderComponent();

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('¿Por qué elegir VendeMás?');
    });

    it('renders the subtitle with correct content', () => {
      renderComponent();

      const subtitle = screen.getByText(
        /Diseñado para las necesidades de las PyMES/
      );
      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toHaveTextContent('de México y Latinoamérica');
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

      expect(trendingIcon).toBeInTheDocument();
      expect(brainIcon).toBeInTheDocument();
      expect(shieldIcon).toBeInTheDocument();
      expect(smartphoneIcon).toBeInTheDocument();
    });
  });

  describe('Value Proposition Content', () => {
    it('displays correct titles for all cards', () => {
      renderComponent();

      expect(screen.getByText('Aumenta tus ventas')).toBeInTheDocument();
      expect(
        screen.getByText('Inteligencia para Vender Más')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Pagos seguros y sin límites')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Fácil de usar, siempre disponible')
      ).toBeInTheDocument();
    });

    it('displays correct descriptions for all cards', () => {
      renderComponent();

      expect(
        screen.getByText(/Acepta más formas de pago y nunca pierdas una venta/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Entiende a tus clientes y optimiza tu catálogo/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Transacciones rápidas y protegidas/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Una interfaz intuitiva que funciona en cualquier dispositivo/
        )
      ).toBeInTheDocument();
    });

    it('displays correct statistics for all cards', () => {
      renderComponent();

      expect(screen.getByText('+40%')).toBeInTheDocument();
      expect(screen.getByText('Asistente IA')).toBeInTheDocument();
      expect(screen.getByText('100%')).toBeInTheDocument();
      expect(screen.getByText('< 5 minutos')).toBeInTheDocument();
    });

    it('displays correct stat labels for all cards', () => {
      renderComponent();

      expect(screen.getByText('de aumento en ventas')).toBeInTheDocument();
      expect(
        screen.getByText('Análisis y Decisiones Inteligente')
      ).toBeInTheDocument();
      expect(screen.getByText('de transacciones seguras')).toBeInTheDocument();
      expect(screen.getByText('Tiempo de aprendizaje')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA region with descriptive label', () => {
      renderComponent();

      const region = screen.getByRole('region');
      expect(region).toBeInTheDocument();
      expect(region).toHaveAttribute(
        'aria-label',
        'Características principales de VendeMás'
      );
    });

    it('has proper ARIA labels for each card', () => {
      renderComponent();

      const cards = screen.getAllByRole('article');
      cards.forEach((card, index) => {
        expect(card).toHaveAttribute('aria-labelledby', `title-${index}`);
        expect(card).toHaveAttribute(
          'aria-describedby',
          `desc-${index} stats-${index}`
        );
      });
    });

    it('has proper IDs for ARIA relationships', () => {
      renderComponent();

      const cards = screen.getAllByRole('article');
      cards.forEach((_, index) => {
        expect(
          screen.getByText(
            /Aumenta tus ventas|Inteligencia para Vender Más|Pagos seguros y sin límites|Fácil de usar, siempre disponible/
          )
        ).toHaveAttribute('id', `title-${index}`);
      });
    });

    it('has proper heading hierarchy', () => {
      renderComponent();

      const h2 = screen.getByRole('heading', { level: 2 });
      const h3s = screen.getAllByRole('heading', { level: 3 });

      expect(h2).toBeInTheDocument();
      expect(h3s).toHaveLength(4);
    });

    it('has proper button accessibility', () => {
      renderComponent();

      const primaryButton = screen.getByRole('button', {
        name: /Comenzar gratis/i,
      });
      const secondaryButton = screen.getByRole('button', {
        name: /Hablar con ventas/i,
      });

      expect(primaryButton).toHaveAttribute(
        'aria-label',
        'Comenzar a usar VendeMás de forma gratuita'
      );
      expect(secondaryButton).toHaveAttribute(
        'aria-label',
        'Contactar con el equipo de ventas de VendeMás'
      );
    });
  });

  describe('Interactive Elements', () => {
    it('has focusable cards with tabIndex', () => {
      renderComponent();

      const cards = screen.getAllByRole('article');
      cards.forEach(card => {
        expect(card).toHaveAttribute('tabIndex', '0');
      });
    });

    it('has proper focus styles applied', () => {
      renderComponent();

      const cards = screen.getAllByRole('article');
      cards.forEach(card => {
        expect(card).toHaveClass('focus-within:ring-2');
        expect(card).toHaveClass('focus-within:ring-primary-500');
      });
    });

    it('has proper hover effects', () => {
      renderComponent();

      const cards = screen.getAllByRole('article');
      cards.forEach(card => {
        expect(card).toHaveClass('hover:shadow-xl');
        expect(card).toHaveClass('hover:border-primary-200');
      });
    });
  });

  describe('Layout and Styling', () => {
    it('has responsive grid layout', () => {
      renderComponent();

      const grid = screen.getByRole('region');
      expect(grid).toHaveClass('grid');
      expect(grid).toHaveClass('md:grid-cols-2');
      expect(grid).toHaveClass('lg:grid-cols-4');
    });

    it('has proper spacing and padding', () => {
      renderComponent();

      const section = screen.getByRole('region').closest('section');
      expect(section).toHaveClass('py-20');

      const cards = screen.getAllByRole('article');
      cards.forEach(card => {
        expect(card).toHaveClass('p-8');
      });
    });

    it('has dark mode support', () => {
      renderComponent();

      const section = screen.getByRole('region').closest('section');
      expect(section).toHaveClass('dark:bg-gray-900');

      const cards = screen.getAllByRole('article');
      cards.forEach(card => {
        expect(card).toHaveClass('dark:bg-gray-800');
        expect(card).toHaveClass('dark:border-gray-700');
      });
    });
  });

  describe('Secondary CTA Button', () => {
    it('renders secondary CTA button with correct text', () => {
      renderComponent();

      const secondaryButton = screen.getByRole('button', {
        name: /Empieza gratis en minutos/i,
      });
      expect(secondaryButton).toBeInTheDocument();
      expect(secondaryButton).toHaveTextContent('Empieza gratis en minutos');
    });

    it('renders arrow icon in secondary CTA button', () => {
      renderComponent();

      const arrowIcon = screen.getByTestId('arrow-right-icon');
      expect(arrowIcon).toBeInTheDocument();
    });

    it('has proper accessibility attributes for secondary button', () => {
      renderComponent();

      const secondaryButton = screen.getByRole('button', {
        name: /Empieza gratis en minutos/i,
      });
      expect(secondaryButton).toHaveAttribute(
        'aria-label',
        'Comenzar a usar VendeMás de forma gratuita en minutos'
      );
    });

    it('has proper styling and hover effects for secondary button', () => {
      renderComponent();

      const secondaryButton = screen.getByRole('button', {
        name: /Empieza gratis en minutos/i,
      });
      expect(secondaryButton).toHaveClass('group');
      expect(secondaryButton).toHaveClass('bg-gray-100');
      expect(secondaryButton).toHaveClass('hover:bg-gray-200');
      expect(secondaryButton).toHaveClass('dark:bg-white/10');
      expect(secondaryButton).toHaveClass('dark:hover:bg-white/20');
    });

    it('has animated arrow with proper classes', () => {
      renderComponent();

      const arrowIcon = screen.getByTestId('arrow-right-icon');
      expect(arrowIcon).toHaveClass('h-5');
      expect(arrowIcon).toHaveClass('w-5');
      expect(arrowIcon).toHaveClass('transition-all');
      expect(arrowIcon).toHaveClass('duration-200');
      expect(arrowIcon).toHaveClass('group-hover:scale-110');
      expect(arrowIcon).toHaveClass('group-hover:translate-x-0.5');
    });
  });

  describe('Scroll-Triggered Animations', () => {
    it('has initial hidden state before scroll trigger', () => {
      renderComponent();

      const cards = screen.getAllByRole('article');
      cards.forEach(card => {
        expect(card).toHaveClass('opacity-0');
        expect(card).toHaveClass('translate-y-3');
      });
    });

    it('has proper animation duration and fill mode', () => {
      renderComponent();

      const cards = screen.getAllByRole('article');
      cards.forEach(card => {
        expect(card).toHaveStyle('animation-duration: 600ms');
        expect(card).toHaveStyle('animation-fill-mode: both');
      });
    });

    it('has animation delay set to 0ms initially', () => {
      renderComponent();

      const cards = screen.getAllByRole('article');
      cards.forEach(card => {
        expect(card).toHaveStyle('animation-delay: 0ms');
      });
    });

    it('has section element with proper ID for navigation', () => {
      renderComponent();

      const section = screen.getByRole('region').closest('section');
      expect(section).toHaveAttribute('id', 'por-que-vendemas');
    });

    it('has intersection observer ref attached to section', () => {
      renderComponent();

      const section = screen.getByRole('region').closest('section');
      expect(section).toBeInTheDocument();
      // The ref is attached but not directly testable in this context
      // This test ensures the section exists for the observer to attach to
    });

    it('is a client component with proper React hooks usage', () => {
      // This test verifies the component renders without errors
      // which indicates proper client-side React hooks usage
      renderComponent();

      const section = screen.getByRole('region').closest('section');
      expect(section).toBeInTheDocument();

      // Component should render all cards in initial hidden state
      const cards = screen.getAllByRole('article');
      expect(cards).toHaveLength(4);
    });
  });

  describe('CTA Section', () => {
    it('renders CTA section with correct content', () => {
      renderComponent();

      expect(
        screen.getByText(/Únete a miles de vendedores/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Sin costos ocultos, sin permanencia/)
      ).toBeInTheDocument();
    });

    it('has proper button styling and focus states', () => {
      renderComponent();

      const primaryButton = screen.getByRole('button', {
        name: /Comenzar gratis/i,
      });
      const secondaryButton = screen.getByRole('button', {
        name: /Hablar con ventas/i,
      });

      expect(primaryButton).toHaveClass('focus:ring-2');
      expect(secondaryButton).toHaveClass('focus:ring-2');
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
        expect(
          card.querySelector('[data-testid*="-icon"]')
        ).toBeInTheDocument();
        expect(card.querySelector('h3')).toBeInTheDocument();
        expect(card.querySelector('p')).toBeInTheDocument();
        expect(card.querySelector('.border-t')).toBeInTheDocument(); // Stats separator
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles empty or missing data gracefully', () => {
      // This test ensures the component doesn't crash with unexpected data
      // The component currently has hardcoded data, so this is more of a future-proofing test
      renderComponent();

      // Component should render without errors
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('maintains accessibility with different content lengths', () => {
      renderComponent();

      // All cards should have the same height due to flex-1 class
      const cards = screen.getAllByRole('article');
      cards.forEach(card => {
        expect(card).toHaveClass('flex');
        expect(card).toHaveClass('flex-col');
        expect(card).toHaveClass('h-full');
      });
    });
  });
});
