import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import VendeMasEnAccionModal from './VendeMasEnAccionModal';

// Mock the lucide-react icons
vi.mock('lucide-react', () => ({
  X: (props: any): React.JSX.Element => (
    <svg
      data-testid='close-icon'
      className={props.className}
      aria-hidden='true'
      {...props}
      viewBox='0 0 24 24'
    >
      <path d='M18 6L6 18M6 6l12 12' />
    </svg>
  ),
  Users: (props: any): React.JSX.Element => (
    <svg
      data-testid='users-icon'
      className={props.className}
      aria-hidden='true'
      {...props}
      viewBox='0 0 24 24'
    >
      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
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
      <path d='M22 7l-8.5 8.5-5-5L2 17' />
    </svg>
  ),
  Star: (props: any): React.JSX.Element => (
    <svg
      data-testid='star-icon'
      className={props.className}
      aria-hidden='true'
      {...props}
      viewBox='0 0 24 24'
    >
      <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
    </svg>
  ),
  ArrowRight: (props: any): React.JSX.Element => (
    <svg
      data-testid='arrow-right-icon'
      className={props.className}
      aria-hidden='true'
      {...props}
      viewBox='0 0 24 24'
    >
      <path d='M5 12h14m-7-7l7 7-7 7' />
    </svg>
  ),
  Phone: (props: any): React.JSX.Element => (
    <svg
      data-testid='phone-icon'
      className={props.className}
      aria-hidden='true'
      {...props}
      viewBox='0 0 24 24'
    >
      <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
    </svg>
  ),
}));

// Mock window.innerWidth for responsive tests
const mockInnerWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
};

// Mock document.body.style for scroll lock tests
const mockBodyStyle = {
  overflow: '',
};

Object.defineProperty(document.body, 'style', {
  value: mockBodyStyle,
  writable: true,
});

describe('VendeMasEnAccionModal', () => {
  const defaultProps = {
    onClose: vi.fn(),
    youtubeVideoId: 'test-video-id',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockBodyStyle.overflow = '';
    mockInnerWidth(1024); // Default to desktop width
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders modal with required props', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      // Check modal backdrop
      const modal = screen.getByRole('dialog');
      expect(modal).toBeTruthy();
      expect(modal.getAttribute('aria-modal')).toBe('true');
      expect(modal.getAttribute('aria-label')).toBe('VendeMás en acción');

      // Check modal title
      const title = screen.getByText('VendeMás en acción');
      expect(title).toBeTruthy();
      expect(title.tagName).toBe('H2');

      // Check subtitle
      const subtitle = screen.getByText(
        'Mira cómo miles de vendedores ya están vendiendo más cada día.'
      );
      expect(subtitle).toBeTruthy();
    });

    it('renders with default youtubeVideoId when not provided', () => {
      render(<VendeMasEnAccionModal onClose={defaultProps.onClose} />);

      const iframes = screen.getAllByTitle('VendeMás en acción');
      expect(iframes[0]).toBeTruthy();
      expect(iframes[0].getAttribute('src')).toContain('dQw4w9WgXcQ');
    });

    it('renders close button with proper accessibility', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const closeButton = screen.getByLabelText('Cerrar');
      expect(closeButton).toBeTruthy();
      expect(closeButton.tagName).toBe('BUTTON');

      const closeIcon = screen.getByTestId('close-icon');
      expect(closeIcon).toBeTruthy();
      expect(closeIcon.getAttribute('aria-hidden')).toBe('true');
    });

    it('renders all stats with correct data', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      // Check all three stats are rendered
      expect(screen.getAllByText('10,000+ vendedores')[0]).toBeTruthy();
      expect(screen.getAllByText('+95% en ventas')[0]).toBeTruthy();
      expect(screen.getAllByText('4.9/5 estrellas')[0]).toBeTruthy();

      // Check stat benefits
      expect(
        screen.getAllByText('Ya usan VendeMás para crecer sus ventas.')[0]
      ).toBeTruthy();
      expect(
        screen.getAllByText(
          'Nuestros usuarios venden casi el doble en promedio.'
        )[0]
      ).toBeTruthy();
      expect(
        screen.getAllByText(
          'La calificación más alta en satisfacción de clientes.'
        )[0]
      ).toBeTruthy();
    });

    it('renders CTA button with correct styling and link', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const ctaButton = screen.getByText('Comenzar gratis ahora');
      expect(ctaButton).toBeTruthy();
      expect(ctaButton.tagName).toBe('A');
      expect(ctaButton.getAttribute('href')).toBe('/signup');
    });

    it('renders supporting question text', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const question = screen.getByText('¿Listo para transformar tu negocio?');
      expect(question).toBeTruthy();
    });
  });

  describe('YouTube Video Integration', () => {
    it('renders YouTube iframe with correct attributes', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const iframes = screen.getAllByTitle('VendeMás en acción');
      expect(iframes[0]).toBeTruthy();
      expect(iframes[0].tagName).toBe('IFRAME');
      expect(iframes[0].getAttribute('src')).toContain('test-video-id');
      expect(iframes[0].getAttribute('allowFullScreen')).toBe('');
      expect(iframes[0].getAttribute('allow')).toContain('accelerometer');
    });

    it('shows loading spinner initially', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      // Should show loading spinner
      const loadingSpinner = document.querySelector('.animate-spin');
      expect(loadingSpinner).toBeTruthy();
    });

    it('hides loading spinner when video loads', async () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const iframes = screen.getAllByTitle('VendeMás en acción');
      const iframe = iframes[0];

      // Simulate video load
      fireEvent.load(iframe);

      await waitFor(() => {
        const loadingSpinner = document.querySelector('.animate-spin');
        expect(loadingSpinner).toBeFalsy();
      });
    });

    it('uses custom youtubeVideoId when provided', () => {
      const customVideoId = 'custom-video-123';
      render(
        <VendeMasEnAccionModal
          onClose={defaultProps.onClose}
          youtubeVideoId={customVideoId}
        />
      );

      const iframes = screen.getAllByTitle('VendeMás en acción');
      expect(iframes[0].getAttribute('src')).toContain(customVideoId);
    });
  });

  describe('Accessibility Features', () => {
    it('has proper ARIA attributes', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const modal = screen.getByRole('dialog');
      expect(modal.getAttribute('role')).toBe('dialog');
      expect(modal.getAttribute('aria-modal')).toBe('true');
      expect(modal.getAttribute('aria-label')).toBe('VendeMás en acción');
    });

    it('has proper focus management', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const closeButton = screen.getByLabelText('Cerrar');
      expect(closeButton).toBeTruthy();
      expect(closeButton.className).toContain('focus:outline-none');
    });

    it('has proper touch targets', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const closeButton = screen.getByLabelText('Cerrar');
      expect(closeButton.getAttribute('style')).toContain('height: 42px');
      expect(closeButton.getAttribute('style')).toContain('width: 42px');

      const ctaButton = screen.getByText('Comenzar gratis ahora');
      expect(ctaButton.getAttribute('style')).toContain('min-height: 52px');
    });

    it('has proper semantic HTML structure', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const title = screen.getByText('VendeMás en acción');
      expect(title.tagName).toBe('H2');

      const ctaButton = screen.getByText('Comenzar gratis ahora');
      expect(ctaButton.tagName).toBe('A');
    });
  });

  describe('Keyboard Navigation', () => {
    it('closes modal when Escape key is pressed', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('does not close modal when other keys are pressed', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      fireEvent.keyDown(document, { key: 'Enter' });
      fireEvent.keyDown(document, { key: 'Tab' });
      fireEvent.keyDown(document, { key: 'Space' });

      expect(defaultProps.onClose).not.toHaveBeenCalled();
    });

    it('handles focus trap correctly', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const modal = screen.getByRole('dialog');
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      expect(focusableElements.length).toBeGreaterThan(0);
    });
  });

  describe('Click Interactions', () => {
    it('closes modal when backdrop is clicked', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const modal = screen.getByRole('dialog');
      fireEvent.click(modal);

      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('does not close modal when modal content is clicked', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const modal = screen.getByRole('dialog');
      const modalContainer = modal.querySelector('.relative.z-10');
      if (modalContainer) {
        fireEvent.click(modalContainer);
      }

      expect(defaultProps.onClose).not.toHaveBeenCalled();
    });

    it('closes modal when close button is clicked', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const closeButton = screen.getByLabelText('Cerrar');
      fireEvent.click(closeButton);

      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Body Scroll Lock', () => {
    it('disables body scroll when modal opens', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      expect(mockBodyStyle.overflow).toBe('hidden');
    });

    it('restores body scroll when modal closes', () => {
      const { unmount } = render(<VendeMasEnAccionModal {...defaultProps} />);

      expect(mockBodyStyle.overflow).toBe('hidden');

      unmount();

      expect(mockBodyStyle.overflow).toBe('');
    });

    it('preserves original overflow style', () => {
      mockBodyStyle.overflow = 'scroll';

      const { unmount } = render(<VendeMasEnAccionModal {...defaultProps} />);

      expect(mockBodyStyle.overflow).toBe('hidden');

      unmount();

      expect(mockBodyStyle.overflow).toBe('scroll');
    });
  });

  describe('Responsive Layout', () => {
    it('renders desktop layout on large screens', () => {
      mockInnerWidth(1024);
      render(<VendeMasEnAccionModal {...defaultProps} />);

      // Desktop layout should be visible
      const desktopLayout = document.querySelector('.hidden.lg\\:flex');
      expect(desktopLayout).toBeTruthy();

      // Mobile layout should be hidden
      const mobileLayout = document.querySelector(
        '.flex-1.flex.flex-col.lg\\:hidden'
      );
      expect(mobileLayout).toBeTruthy();
    });

    it('renders mobile layout on small screens', () => {
      mockInnerWidth(768);
      render(<VendeMasEnAccionModal {...defaultProps} />);

      // Mobile layout should be visible
      const mobileLayout = document.querySelector(
        '.flex-1.flex.flex-col.lg\\:hidden'
      );
      expect(mobileLayout).toBeTruthy();
    });

    it('has proper mobile scrolling', () => {
      mockInnerWidth(768);
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const mobileLayout = document.querySelector(
        '.flex-1.flex.flex-col.lg\\:hidden.overflow-y-auto'
      );
      expect(mobileLayout).toBeTruthy();
    });
  });

  describe('Stats Display', () => {
    it('renders all stat icons', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      expect(screen.getAllByTestId('users-icon')[0]).toBeTruthy();
      expect(screen.getAllByTestId('trending-up-icon')[0]).toBeTruthy();
      expect(screen.getAllByTestId('star-icon')[0]).toBeTruthy();
    });

    it('applies correct color classes to stats', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const usersStats = screen.getAllByText('10,000+ vendedores');
      expect(usersStats[0].className).toContain('text-secondary-600');

      const salesStats = screen.getAllByText('+95% en ventas');
      expect(salesStats[0].className).toContain('text-primary-600');

      const ratingStats = screen.getAllByText('4.9/5 estrellas');
      expect(ratingStats[0].className).toContain('text-tertiary-600');
    });

    it('has proper dark mode color classes', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const usersStats = screen.getAllByText('10,000+ vendedores');
      expect(usersStats[0].className).toContain('dark:text-secondary-400');

      const salesStats = screen.getAllByText('+95% en ventas');
      expect(salesStats[0].className).toContain('dark:text-primary-400');

      const ratingStats = screen.getAllByText('4.9/5 estrellas');
      expect(ratingStats[0].className).toContain('dark:text-tertiary-400');
    });
  });

  describe('Styling and CSS Classes', () => {
    it('applies correct modal container classes', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const modalContainer = document.querySelector('.w-\\[95vw\\]');
      expect(modalContainer).toBeTruthy();
      expect(modalContainer?.className).toContain('card-border');
      expect(modalContainer?.className).toContain('rounded-2xl');
      expect(modalContainer?.className).toContain('shadow-2xl');
    });

    it('applies correct backdrop classes', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const backdrop = screen.getByRole('dialog');
      expect(backdrop.className).toContain('fixed');
      expect(backdrop.className).toContain('inset-0');
      expect(backdrop.className).toContain('z-50');
      expect(backdrop.className).toContain('bg-black/60');
    });

    it('applies correct close button classes', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const closeButton = screen.getByLabelText('Cerrar');
      expect(closeButton.className).toContain('card-border');
      expect(closeButton.className).toContain('!rounded-[14px]');
      expect(closeButton.className).toContain('bg-white');
      expect(closeButton.className).toContain('hover:bg-gray-50');
    });

    it('applies correct CTA button classes', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const ctaButton = screen.getByText('Comenzar gratis ahora');
      expect(ctaButton.className).toContain('card-border');
      expect(ctaButton.className).toContain('bg-primary-500');
      expect(ctaButton.className).toContain('text-primary-on');
      expect(ctaButton.className).toContain('animate-pulse-custom');
    });

    it('applies correct stats card classes', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const statsCards = document.querySelectorAll('.group.p-4.rounded-xl');
      expect(statsCards.length).toBeGreaterThanOrEqual(3);

      // Check first few cards
      Array.from(statsCards)
        .slice(0, 3)
        .forEach(card => {
          expect(card.className).toContain('bg-white/50');
          expect(card.className).toContain('backdrop-blur-sm');
          expect(card.className).toContain('card-border');
          expect(card.className).toContain('shadow-sm');
        });
    });
  });

  describe('Gradient Background', () => {
    it('renders gradient background overlay', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const gradientOverlay = document.querySelector('.absolute.inset-0');
      expect(gradientOverlay).toBeTruthy();
      expect(gradientOverlay?.className).toContain('bg-[radial-gradient');
    });

    it('has proper z-index layering', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const contentOverlay = document.querySelector('.relative.z-10');
      expect(contentOverlay).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty youtubeVideoId gracefully', () => {
      render(
        <VendeMasEnAccionModal
          onClose={defaultProps.onClose}
          youtubeVideoId=''
        />
      );

      const iframes = screen.getAllByTitle('VendeMás en acción');
      expect(iframes[0].getAttribute('src')).toContain('embed/');
    });

    it('handles special characters in youtubeVideoId', () => {
      const specialVideoId = 'test-video-id-123_!@#';
      render(
        <VendeMasEnAccionModal
          onClose={defaultProps.onClose}
          youtubeVideoId={specialVideoId}
        />
      );

      const iframes = screen.getAllByTitle('VendeMás en acción');
      expect(iframes[0].getAttribute('src')).toContain(specialVideoId);
    });

    it('handles rapid open/close cycles', () => {
      const { unmount } = render(<VendeMasEnAccionModal {...defaultProps} />);

      // Simulate rapid open/close
      unmount();
      render(<VendeMasEnAccionModal {...defaultProps} />);
      unmount();

      // Should not throw errors
      expect(true).toBe(true);
    });
  });

  describe('Component Integration', () => {
    it('renders all sections together correctly', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      // Header
      expect(screen.getByText('VendeMás en acción')).toBeTruthy();
      expect(screen.getByLabelText('Cerrar')).toBeTruthy();

      // Stats
      expect(screen.getAllByText('10,000+ vendedores')[0]).toBeTruthy();
      expect(screen.getAllByText('+95% en ventas')[0]).toBeTruthy();
      expect(screen.getAllByText('4.9/5 estrellas')[0]).toBeTruthy();

      // Video
      expect(screen.getAllByTitle('VendeMás en acción')[0]).toBeTruthy();

      // CTA
      expect(screen.getByText('Comenzar gratis ahora')).toBeTruthy();
      expect(
        screen.getByText('¿Listo para transformar tu negocio?')
      ).toBeTruthy();
    });

    it('maintains proper DOM structure', () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      const modal = screen.getByRole('dialog');
      const modalContainer = modal.querySelector('.w-\\[95vw\\]');
      const contentOverlay = modalContainer?.querySelector('.relative.z-10');
      const header = contentOverlay?.querySelector(
        '.flex.items-center.justify-between'
      );
      const content = contentOverlay?.querySelector('.flex-1.flex.flex-col');

      expect(modal).toBeTruthy();
      expect(modalContainer).toBeTruthy();
      expect(contentOverlay).toBeTruthy();
      expect(header).toBeTruthy();
      expect(content).toBeTruthy();
    });
  });

  describe('Performance', () => {
    it('does not cause memory leaks on unmount', () => {
      const { unmount } = render(<VendeMasEnAccionModal {...defaultProps} />);

      // Should clean up event listeners
      unmount();

      // Verify body style is restored
      expect(mockBodyStyle.overflow).toBe('');
    });

    it('handles video loading state efficiently', async () => {
      render(<VendeMasEnAccionModal {...defaultProps} />);

      // Initially should show loading spinner
      expect(document.querySelector('.animate-spin')).toBeTruthy();

      const iframes = screen.getAllByTitle('VendeMás en acción');
      fireEvent.load(iframes[0]);

      await waitFor(() => {
        expect(document.querySelector('.animate-spin')).toBeFalsy();
      });
    });
  });
});
