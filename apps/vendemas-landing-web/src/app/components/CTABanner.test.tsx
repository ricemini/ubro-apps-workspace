import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CTABanner from './CTABanner';

// Mock the VendeMasEnAccionModal component
vi.mock('../components-site/VendeMasEnAccionModal', () => ({
  default: ({
    onClose,
    youtubeVideoId,
  }: {
    onClose: () => void;
    youtubeVideoId: string;
  }) => (
    <div data-testid='vende-mas-modal' data-youtube-id={youtubeVideoId}>
      <button onClick={onClose} data-testid='modal-close'>
        Close Modal
      </button>
      <div>VendeMás en acción Modal Content</div>
    </div>
  ),
}));

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
  ArrowRight: (props: {
    className?: string;
    'aria-hidden'?: boolean;
  }): React.JSX.Element => (
    <svg
      data-testid='arrow-right-icon'
      className={props.className}
      aria-hidden={props['aria-hidden']}
      viewBox='0 0 24 24'
    >
      <path d='M5 12h14m-7-7l7 7-7 7' />
    </svg>
  ),
  CheckCircle: (props: {
    className?: string;
    'aria-hidden'?: boolean;
  }): React.JSX.Element => (
    <svg
      data-testid='check-circle-icon'
      className={props.className}
      aria-hidden={props['aria-hidden']}
      viewBox='0 0 24 24'
    >
      <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
    </svg>
  ),
}));

describe('CTABanner Component', () => {
  // Helper function to render component
  const renderCTABanner = () => {
    return render(<CTABanner />);
  };

  describe('Component Rendering', () => {
    it('renders the main section with correct structure', () => {
      renderCTABanner();

      const section = screen.getByRole('complementary', {
        name: /estadística de negocios activos/i,
      });
      expect(section).toBeInTheDocument();
    });

    it('renders the primary headline with correct text', () => {
      renderCTABanner();

      const headline = screen.getByRole('heading', { level: 1 });
      expect(headline).toHaveTextContent('Moderniza tu negocio hoy mismo');
    });

    it('renders the subheadline with social proof', () => {
      renderCTABanner();

      const subheadline = screen.getByRole('complementary', {
        name: /estadística de negocios activos/i,
      });
      expect(subheadline).toHaveTextContent(
        'Únete a 2,500+ negocios activos que ya venden más con VendeMás.'
      );
    });

    it('renders all trust badges with correct text', () => {
      renderCTABanner();

      const trustBadgesList = screen.getByRole('list', {
        name: /beneficios de vendemás/i,
      });
      expect(trustBadgesList).toBeInTheDocument();

      const expectedBenefits = [
        'Configuración gratuita',
        'Soporte en español',
        'Sin permanencia',
        'Prueba 30 días gratis',
      ];

      expectedBenefits.forEach(benefit => {
        expect(screen.getByText(benefit)).toBeInTheDocument();
      });
    });

    it('renders trust badge icons with correct accessibility attributes', () => {
      renderCTABanner();

      const icons = screen.getAllByTestId('check-circle-icon');
      expect(icons).toHaveLength(4);

      icons.forEach(icon => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('renders both CTA buttons with correct text', () => {
      renderCTABanner();

      const primaryButton = screen.getByRole('button', {
        name: /comenzar a usar vendemás de forma gratuita/i,
      });
      const secondaryButton = screen.getByRole('button', {
        name: /ver demostración de cómo funciona vendemás/i,
      });

      expect(primaryButton).toHaveTextContent(
        'Empieza gratis y genera más ingresos'
      );
      expect(secondaryButton).toHaveTextContent('Ver cómo funciona');
    });

    it('renders secondary CTA button with arrow icon', () => {
      renderCTABanner();

      const secondaryButton = screen.getByRole('button', {
        name: /ver demostración de cómo funciona vendemás/i,
      });
      const arrowIcon = screen.getByTestId('arrow-right-icon');

      expect(secondaryButton).toContainElement(arrowIcon);
      expect(arrowIcon).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders customer testimonial with correct content', () => {
      renderCTABanner();

      const testimonialSection = screen.getByRole('complementary', {
        name: /testimonial de cliente/i,
      });
      expect(testimonialSection).toBeInTheDocument();

      const blockquote = screen
        .getByRole('complementary', { name: /testimonial de cliente/i })
        .querySelector('blockquote');
      expect(blockquote).toHaveTextContent(
        'Desde que uso VendeMás, mis ventas aumentaron'
      );
      expect(blockquote).toHaveTextContent('+40%');
      expect(blockquote).toHaveAttribute(
        'cite',
        'María Rodríguez, Taquería La Bonita'
      );
    });

    it('renders customer attribution with correct details', () => {
      renderCTABanner();

      expect(screen.getByText('María Rodríguez')).toBeInTheDocument();
      expect(screen.getByText('Taquería La Bonita, CDMX')).toBeInTheDocument();
    });

    it('renders customer avatar with correct accessibility', () => {
      renderCTABanner();

      const avatar = screen.getByText('MR').closest('div');
      expect(avatar).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders wave background SVGs with correct accessibility', () => {
      renderCTABanner();

      const presentationElements = screen.getAllByRole('presentation', {
        hidden: true,
      });
      expect(presentationElements).toHaveLength(2);

      presentationElements.forEach(element => {
        expect(element).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('renders modal description for screen readers', () => {
      renderCTABanner();

      const modalDescription = screen.getByText(
        /abre una ventana modal con un video demostrativo/i
      );
      expect(modalDescription).toHaveClass('sr-only');
      expect(modalDescription).toHaveAttribute('id', 'modal-description');
    });
  });

  describe('User Interactions', () => {
    it('opens modal when secondary CTA button is clicked', async () => {
      renderCTABanner();

      const secondaryButton = screen.getByRole('button', {
        name: /ver demostración de cómo funciona vendemás/i,
      });
      fireEvent.click(secondaryButton);

      await waitFor(() => {
        expect(screen.getByTestId('vende-mas-modal')).toBeInTheDocument();
      });
    });

    it('closes modal when close button is clicked', async () => {
      renderCTABanner();

      // Open modal
      const secondaryButton = screen.getByRole('button', {
        name: /ver demostración de cómo funciona vendemás/i,
      });
      fireEvent.click(secondaryButton);

      await waitFor(() => {
        expect(screen.getByTestId('vende-mas-modal')).toBeInTheDocument();
      });

      // Close modal
      const closeButton = screen.getByTestId('modal-close');
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByTestId('vende-mas-modal')).not.toBeInTheDocument();
      });
    });

    it('passes correct youtubeVideoId to modal', async () => {
      renderCTABanner();

      const secondaryButton = screen.getByRole('button', {
        name: /ver demostración de cómo funciona vendemás/i,
      });
      fireEvent.click(secondaryButton);

      await waitFor(() => {
        const modal = screen.getByTestId('vende-mas-modal');
        expect(modal).toHaveAttribute('data-youtube-id', 'NQN2w7KPeTs');
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      renderCTABanner();

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent('Moderniza tu negocio hoy mismo');
    });

    it('has proper ARIA labels for interactive elements', () => {
      renderCTABanner();

      const primaryButton = screen.getByRole('button', {
        name: /comenzar a usar vendemás de forma gratuita/i,
      });
      const secondaryButton = screen.getByRole('button', {
        name: /ver demostración de cómo funciona vendemás/i,
      });

      expect(primaryButton).toHaveAttribute('aria-label');
      expect(secondaryButton).toHaveAttribute('aria-label');
      expect(secondaryButton).toHaveAttribute(
        'aria-describedby',
        'modal-description'
      );
    });

    it('has proper list structure for trust badges', () => {
      renderCTABanner();

      const trustBadgesList = screen.getByRole('list', {
        name: /beneficios de vendemás/i,
      });
      const listItems = screen.getAllByRole('listitem');

      expect(trustBadgesList).toBeInTheDocument();
      expect(listItems).toHaveLength(4);
    });

    it('has proper group structure for CTA buttons', () => {
      renderCTABanner();

      const buttonGroup = screen.getByRole('group', {
        name: /acciones principales/i,
      });
      expect(buttonGroup).toBeInTheDocument();
    });

    it('has proper complementary roles for content sections', () => {
      renderCTABanner();

      const statisticsSection = screen.getByRole('complementary', {
        name: /estadística de negocios activos/i,
      });
      const testimonialSection = screen.getByRole('complementary', {
        name: /testimonial de cliente/i,
      });

      expect(statisticsSection).toBeInTheDocument();
      expect(testimonialSection).toBeInTheDocument();
    });

    it('has proper cite attribute for blockquote', () => {
      renderCTABanner();

      const blockquote = screen
        .getByRole('complementary', { name: /testimonial de cliente/i })
        .querySelector('blockquote');
      expect(blockquote).toHaveAttribute(
        'cite',
        'María Rodríguez, Taquería La Bonita'
      );
    });

    it('has proper aria-hidden attributes for decorative elements', () => {
      renderCTABanner();

      const icons = screen.getAllByTestId('check-circle-icon');
      const arrowIcon = screen.getByTestId('arrow-right-icon');
      const avatar = screen.getByText('MR').closest('div');

      icons.forEach(icon => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
      expect(arrowIcon).toHaveAttribute('aria-hidden', 'true');
      expect(avatar).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Responsive Design', () => {
    it('applies correct responsive classes', () => {
      renderCTABanner();

      const primaryButton = screen.getByRole('button', {
        name: /comenzar a usar vendemás de forma gratuita/i,
      });
      const secondaryButton = screen.getByRole('button', {
        name: /ver demostración de cómo funciona vendemás/i,
      });

      expect(primaryButton).toHaveClass('text-xl');
      expect(secondaryButton).toHaveClass(
        'text-xl',
        'inline-flex',
        'items-center'
      );
    });

    it('has proper responsive structure for CTA buttons', () => {
      renderCTABanner();

      const buttonGroup = screen.getByRole('group', {
        name: /acciones principales/i,
      });
      expect(buttonGroup).toHaveClass('flex', 'flex-col', 'sm:flex-row');
    });
  });

  describe('Dark Mode Support', () => {
    it('applies dark mode classes to text elements', () => {
      renderCTABanner();

      const headline = screen.getByRole('heading', { level: 1 });
      const subheadline = screen.getByRole('complementary', {
        name: /estadística de negocios activos/i,
      });

      expect(headline).toHaveClass('text-white', 'dark:text-white');
      expect(subheadline).toHaveClass('text-white', 'dark:text-gray-200');
    });

    it('applies dark mode classes to buttons', () => {
      renderCTABanner();

      const primaryButton = screen.getByRole('button', {
        name: /comenzar a usar vendemás de forma gratuita/i,
      });
      const secondaryButton = screen.getByRole('button', {
        name: /ver demostración de cómo funciona vendemás/i,
      });

      expect(primaryButton).toHaveClass(
        'dark:bg-gray-100',
        'dark:text-primary-600'
      );
      expect(secondaryButton).toHaveClass(
        'dark:border-gray-300',
        'dark:text-gray-200'
      );
    });

    it('applies dark mode classes to trust badges', () => {
      renderCTABanner();

      const trustBadgeTexts = screen.getAllByRole('listitem');
      trustBadgeTexts.forEach(item => {
        const textElement = item.querySelector('span');
        expect(textElement).toHaveClass('text-white', 'dark:text-gray-200');
      });
    });

    it('applies dark mode classes to testimonial', () => {
      renderCTABanner();

      const blockquote = screen
        .getByRole('complementary', { name: /testimonial de cliente/i })
        .querySelector('blockquote');
      const customerName = screen.getByText('María Rodríguez');
      const businessInfo = screen.getByText('Taquería La Bonita, CDMX');

      expect(blockquote).toHaveClass('text-white', 'dark:text-gray-200');
      expect(customerName).toHaveClass('text-white', 'dark:text-gray-200');
      expect(businessInfo).toHaveClass('text-white', 'dark:text-gray-300');
    });
  });

  describe('Performance and Animation', () => {
    it('has proper animation classes for wave background', () => {
      renderCTABanner();

      const presentationElements = screen.getAllByRole('presentation', {
        hidden: true,
      });
      const desktopWave = presentationElements[0]; // First one is desktop
      const wavePaths = desktopWave.querySelectorAll('path');

      expect(wavePaths[0]).toHaveClass('animate-wave-1');
      expect(wavePaths[1]).toHaveClass('animate-wave-2');
      expect(wavePaths[2]).toHaveClass('animate-wave-3');
    });

    it('has proper hover effects on buttons', () => {
      renderCTABanner();

      const primaryButton = screen.getByRole('button', {
        name: /comenzar a usar vendemás de forma gratuita/i,
      });
      const secondaryButton = screen.getByRole('button', {
        name: /ver demostración de cómo funciona vendemás/i,
      });

      expect(primaryButton).toHaveClass(
        'hover:bg-gray-100',
        'hover:shadow-2xl',
        'transform',
        'hover:scale-105'
      );
      expect(secondaryButton).toHaveClass(
        'hover:bg-white',
        'hover:text-primary-500'
      );
    });

    it('has proper transition classes', () => {
      renderCTABanner();

      const primaryButton = screen.getByRole('button', {
        name: /comenzar a usar vendemás de forma gratuita/i,
      });
      const secondaryButton = screen.getByRole('button', {
        name: /ver demostración de cómo funciona vendemás/i,
      });

      expect(primaryButton).toHaveClass('transition-all', 'duration-200');
      expect(secondaryButton).toHaveClass('transition-all', 'duration-200');
    });
  });

  describe('Content Validation', () => {
    it('displays correct conversion-optimized content', () => {
      renderCTABanner();

      // Headline should be urgent and benefit-focused
      expect(
        screen.getByText('Moderniza tu negocio hoy mismo')
      ).toBeInTheDocument();

      // Subheadline should include social proof
      expect(screen.getByText(/2,500\+ negocios activos/)).toBeInTheDocument();

      // Primary CTA should be clear and benefit-focused
      expect(
        screen.getByText('Empieza gratis y genera más ingresos')
      ).toBeInTheDocument();

      // Secondary CTA should be educational
      expect(screen.getByText('Ver cómo funciona')).toBeInTheDocument();
    });

    it('displays specific testimonial results', () => {
      renderCTABanner();

      expect(screen.getByText('+40%')).toBeInTheDocument();
      expect(screen.getByText(/mis ventas aumentaron/)).toBeInTheDocument();
      expect(
        screen.getByText(/no pierdo clientes por no tener cambio/)
      ).toBeInTheDocument();
    });

    it('displays all trust badges addressing objections', () => {
      renderCTABanner();

      const expectedBenefits = [
        'Configuración gratuita', // No cost barrier
        'Soporte en español', // Language comfort
        'Sin permanencia', // No commitment risk
        'Prueba 30 días gratis', // Risk-free trial
      ];

      expectedBenefits.forEach(benefit => {
        expect(screen.getByText(benefit)).toBeInTheDocument();
      });
    });
  });
});
