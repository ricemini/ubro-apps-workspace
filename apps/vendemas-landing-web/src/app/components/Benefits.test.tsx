import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Benefits from './Benefits';

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
  ArrowRight: (props: {
    className?: string;
    'aria-hidden'?: boolean;
  }): React.JSX.Element => (
    <div
      data-testid='arrow-right-icon'
      className={props.className}
      aria-hidden={props['aria-hidden']}
    >
      →
    </div>
  ),
}));

describe('Benefits Component', () => {
  // Helper function to render component
  const renderBenefits = () => {
    return render(<Benefits />);
  };

  describe('Component Rendering', () => {
    it('renders the main section with correct id', () => {
      renderBenefits();
      const section = document.querySelector('#precios');
      expect(section).toHaveAttribute('id', 'precios');
    });

    it('renders the main heading', () => {
      renderBenefits();
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent(
        'Beneficios que transforman tu negocio'
      );
    });

    it('renders the subtitle', () => {
      renderBenefits();
      const subtitle = screen.getByText('Con VendeMás, cada venta suma más.');
      expect(subtitle).toBeInTheDocument();
    });

    it('renders all three benefit cards', () => {
      renderBenefits();
      const cards = screen.getAllByRole('listitem');
      expect(cards).toHaveLength(3);
    });

    it('renders the benefits list with correct ARIA label', () => {
      renderBenefits();
      const list = screen.getByRole('list');
      expect(list).toHaveAttribute('aria-label', 'Beneficios disponibles');
    });
  });

  describe('Benefit Cards Content', () => {
    it('renders the first card with correct content', () => {
      renderBenefits();

      // Card title
      expect(screen.getByText('Cobra sin comisiones')).toBeInTheDocument();

      // Main value proposition
      expect(screen.getByText('Ahorra en cada venta')).toBeInTheDocument();

      // Description
      expect(
        screen.getByText(
          'Cada peso es tuyo al 100%, sin bancos ni comisiones escondidas.'
        )
      ).toBeInTheDocument();

      // CTAs - use getAllByText since there are multiple buttons with same text
      expect(screen.getAllByText('Inicia gratis')).toHaveLength(2);
      expect(screen.getAllByText('Ver más')).toHaveLength(3);
    });

    it('renders the second card with correct content', () => {
      renderBenefits();

      // Card title
      expect(screen.getByText('Vende sin internet')).toBeInTheDocument();

      // Main value proposition
      expect(screen.getByText('Nunca te detengas')).toBeInTheDocument();

      // Description
      expect(
        screen.getByText(
          'Tu negocio no depende del WiFi: vende siempre, incluso offline.'
        )
      ).toBeInTheDocument();
    });

    it('renders the third card with correct content', () => {
      renderBenefits();

      // Card title
      expect(screen.getByText('IA para ganar más')).toBeInTheDocument();

      // Main value proposition
      expect(screen.getByText('Predice. Optimiza. Crece.')).toBeInTheDocument();

      // Description
      expect(
        screen.getByText(
          'Nuestra IA analiza tus ventas y crea promociones inteligentes para que ganes más cada día.'
        )
      ).toBeInTheDocument();

      // CTAs
      expect(screen.getByText('Prueba gratis')).toBeInTheDocument();
    });
  });

  describe('Accessibility Features', () => {
    it('has proper ARIA relationships for each card', () => {
      renderBenefits();
      const cards = screen.getAllByRole('listitem');

      cards.forEach((card, index) => {
        expect(card).toHaveAttribute(
          'aria-labelledby',
          `benefit-${index}-title`
        );
        expect(card).toHaveAttribute(
          'aria-describedby',
          `benefit-${index}-description`
        );
      });
    });

    it('has unique IDs for titles and descriptions', () => {
      renderBenefits();

      // Check that all titles have unique IDs
      const titles = screen.getAllByRole('heading', { level: 3 });
      titles.forEach((title, index) => {
        expect(title).toHaveAttribute('id', `benefit-${index}-title`);
      });

      // Check that all descriptions have unique IDs
      const descriptions = screen.getAllByText(
        /Cada peso es tuyo|Tu negocio no depende|Nuestra IA analiza/
      );
      descriptions.forEach((description, index) => {
        expect(description).toHaveAttribute(
          'id',
          `benefit-${index}-description`
        );
      });
    });

    it('has proper ARIA labels for buttons', () => {
      renderBenefits();

      // Check primary CTA buttons
      const primaryButtons = screen.getAllByText(/Inicia gratis|Prueba gratis/);
      primaryButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-label');
        expect(button.closest('button')).toHaveAttribute('type', 'button');
      });

      // Check secondary CTA buttons
      const secondaryButtons = screen.getAllByText('Ver más');
      secondaryButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-label');
        expect(button.closest('button')).toHaveAttribute('type', 'button');
      });
    });

    it('has proper button groups with ARIA labels', () => {
      renderBenefits();
      const buttonGroups = screen.getAllByRole('group');

      expect(buttonGroups).toHaveLength(3); // One for each card

      buttonGroups.forEach(group => {
        expect(group).toHaveAttribute('aria-label');
        expect(group).toHaveAttribute(
          'aria-label',
          expect.stringMatching(/Acciones para/)
        );
      });
    });
  });

  describe('Button Functionality', () => {
    it('renders buttons with correct styling classes', () => {
      renderBenefits();

      // Check primary buttons have correct classes
      const primaryButtons = screen.getAllByText(/Inicia gratis|Prueba gratis/);
      primaryButtons.forEach(button => {
        const buttonElement = button.closest('button');
        expect(buttonElement).toHaveClass(
          'text-white',
          'font-medium',
          'px-5',
          'py-3'
        );
      });

      // Check secondary buttons have correct classes
      const secondaryButtons = screen.getAllByText('Ver más');
      secondaryButtons.forEach(button => {
        const buttonElement = button.closest('button');
        expect(buttonElement).toHaveClass(
          'border-2',
          'font-medium',
          'px-5',
          'py-3'
        );
      });
    });

    it('handles button clicks without errors', () => {
      renderBenefits();

      const primaryButtons = screen.getAllByText('Inicia gratis');
      const secondaryButtons = screen.getAllByText('Ver más');

      // Click should not throw errors
      expect(() => {
        fireEvent.click(primaryButtons[0]);
        fireEvent.click(secondaryButtons[0]);
      }).not.toThrow();
    });

    it('has focus management for buttons', () => {
      renderBenefits();

      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveClass('focus:outline-none');
        expect(button).toHaveClass('focus:ring-2');
        expect(button).toHaveClass('focus:ring-offset-2');
      });
    });
  });

  describe('Visual Styling', () => {
    it('applies correct color classes for different accent colors', () => {
      renderBenefits();

      // Check that cards have different border colors
      const cards = screen.getAllByRole('listitem');

      // First card should have secondary colors
      expect(cards[0].className).toContain('border-secondary-500');

      // Second card should have primary colors
      expect(cards[1].className).toContain('border-primary-500');

      // Third card should have tertiary colors
      expect(cards[2].className).toContain('border-tertiary-500');
    });

    it('applies correct text colors for value propositions', () => {
      renderBenefits();

      // Check value proposition text colors
      const valueProps = screen.getAllByText(
        /Ahorra en cada venta|Nunca te detengas|Predice. Optimiza. Crece./
      );

      expect(valueProps[0].className).toContain('text-secondary-500');
      expect(valueProps[1].className).toContain('text-primary-500');
      expect(valueProps[2].className).toContain('text-tertiary-500');
    });

    it('has proper card structure with flex layout', () => {
      renderBenefits();

      const cards = screen.getAllByRole('listitem');
      cards.forEach(card => {
        expect(card.className).toContain('flex');
        expect(card.className).toContain('flex-col');
        expect(card.className).toContain('h-full');
      });
    });

    it('has proper gradient background styling', () => {
      renderBenefits();

      const gradientOverlays = document.querySelectorAll(
        '.absolute.inset-0.opacity-60.rounded-2xl'
      );
      expect(gradientOverlays).toHaveLength(3);
    });
  });

  describe('Responsive Design', () => {
    it('has responsive grid classes', () => {
      renderBenefits();

      const grid = screen.getByRole('list');
      expect(grid.className).toContain('grid');
      expect(grid.className).toContain('lg:grid-cols-3');
    });

    it('has responsive text sizing', () => {
      renderBenefits();

      const mainHeading = screen.getByRole('heading', { level: 2 });
      expect(mainHeading.className).toContain('text-4xl');
      expect(mainHeading.className).toContain('sm:text-5xl');
    });
  });

  describe('Content Validation', () => {
    it('has all required benefit data', () => {
      renderBenefits();

      // Verify all benefit names are present
      expect(screen.getByText('Cobra sin comisiones')).toBeDefined();
      expect(screen.getByText('Vende sin internet')).toBeDefined();
      expect(screen.getByText('IA para ganar más')).toBeDefined();

      // Verify all value propositions are present
      expect(screen.getByText('Ahorra en cada venta')).toBeDefined();
      expect(screen.getByText('Nunca te detengas')).toBeDefined();
      expect(screen.getByText('Predice. Optimiza. Crece.')).toBeDefined();
    });

    it('has proper semantic HTML structure', () => {
      renderBenefits();

      // Check for proper heading hierarchy
      const h2 = screen.getByRole('heading', { level: 2 });
      const h3s = screen.getAllByRole('heading', { level: 3 });

      expect(h2).toBeDefined();
      expect(h3s).toHaveLength(3);

      // Check for proper listitem elements
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
    });
  });

  describe('Dark Mode Support', () => {
    it('has dark mode classes for section background', () => {
      renderBenefits();

      const section = document.querySelector('#precios');
      expect(section?.className).toContain('dark:from-gray-900');
      expect(section?.className).toContain('dark:to-gray-800');
    });

    it('has dark mode classes for text elements', () => {
      renderBenefits();

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading.className).toContain('dark:text-white');

      const subtitle = screen.getByText('Con VendeMás, cada venta suma más.');
      expect(subtitle.className).toContain('dark:text-gray-300');
    });
  });

  describe('Component Integration', () => {
    it('renders without crashing', () => {
      expect(() => renderBenefits()).not.toThrow();
    });

    it('maintains consistent structure across renders', () => {
      const { rerender } = renderBenefits();

      // Re-render and check structure is maintained
      rerender(<Benefits />);

      expect(screen.getByRole('heading', { level: 2 })).toBeDefined();
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
      expect(screen.getAllByRole('button')).toHaveLength(6); // 2 buttons per card
    });
  });
});
