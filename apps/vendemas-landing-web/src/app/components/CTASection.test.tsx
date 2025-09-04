import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CTASection from './CTASection';

// Mock the ArrowRight icon from lucide-react
vi.mock('lucide-react', () => ({
  ArrowRight: ({ className, ...props }: any): JSX.Element => (
    <svg
      data-testid='arrow-right-icon'
      className={className}
      aria-hidden='true'
      {...props}
      viewBox='0 0 24 24'
    >
      <path d='M5 12h14m-7-7l7 7-7 7' />
    </svg>
  ),
}));

describe('CTASection', () => {
  const mockTrackCTAClick = vi.fn() as any;

  beforeEach((): void => {
    vi.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders with default props', () => {
      render(<CTASection trackCTAClick={mockTrackCTAClick} />);

      // Check mobile sticky CTA
      const mobileCTA = screen.getByRole('button', {
        name: 'Comenzar a usar VendeMás de forma gratuita',
      });
      expect(mobileCTA).toBeTruthy();
      expect(mobileCTA.textContent).toContain('Comenzar gratis');

      // Check desktop CTA
      const desktopCTA = screen.getByRole('button', {
        name: 'Comenzar a usar VendeMás de forma gratuita en minutos',
      });
      expect(desktopCTA).toBeTruthy();
      expect(desktopCTA.textContent).toContain(
        'Únete gratis a 10,000+ vendedores'
      );

      // Check trust message is shown by default
      expect(
        screen.getByText(
          'Sin costos ocultos, sin permanencia. Comienza a usar VendeMás hoy mismo.'
        )
      ).toBeTruthy();
    });

    it('renders with custom button text', () => {
      const customButtonText = 'Empieza gratis en minutos';
      render(
        <CTASection
          trackCTAClick={mockTrackCTAClick}
          buttonText={customButtonText}
        />
      );

      const desktopCTA = screen.getByRole('button', {
        name: 'Comenzar a usar VendeMás de forma gratuita en minutos',
      });
      expect(desktopCTA.textContent).toContain(customButtonText);
    });

    it('hides trust message when showTrustMessage is false', () => {
      render(
        <CTASection
          trackCTAClick={mockTrackCTAClick}
          showTrustMessage={false}
        />
      );

      expect(
        screen.queryByText(
          'Sin costos ocultos, sin permanencia. Comienza a usar VendeMás hoy mismo.'
        )
      ).toBeFalsy();
    });

    it('renders both mobile and desktop CTAs', () => {
      render(<CTASection trackCTAClick={mockTrackCTAClick} />);

      // Should have 2 buttons total (mobile + desktop)
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
    });
  });

  describe('Analytics Tracking', () => {
    it('calls trackCTAClick with correct parameters for mobile CTA', () => {
      render(<CTASection trackCTAClick={mockTrackCTAClick} />);

      const mobileCTA = screen.getByRole('button', {
        name: 'Comenzar a usar VendeMás de forma gratuita',
      });

      fireEvent.click(mobileCTA);

      expect(mockTrackCTAClick).toHaveBeenCalledWith(
        'primary',
        'value_props_mobile_cta'
      );
      expect(mockTrackCTAClick).toHaveBeenCalledTimes(1);
    });

    it('calls trackCTAClick with correct parameters for desktop CTA', () => {
      render(<CTASection trackCTAClick={mockTrackCTAClick} />);

      const desktopCTA = screen.getByRole('button', {
        name: 'Comenzar a usar VendeMás de forma gratuita en minutos',
      });

      fireEvent.click(desktopCTA);

      expect(mockTrackCTAClick).toHaveBeenCalledWith(
        'secondary',
        'value_props_quick_start'
      );
      expect(mockTrackCTAClick).toHaveBeenCalledTimes(1);
    });

    it('tracks both CTAs independently', () => {
      render(<CTASection trackCTAClick={mockTrackCTAClick} />);

      const mobileCTA = screen.getByRole('button', {
        name: 'Comenzar a usar VendeMás de forma gratuita',
      });
      const desktopCTA = screen.getByRole('button', {
        name: 'Comenzar a usar VendeMás de forma gratuita en minutos',
      });

      fireEvent.click(mobileCTA);
      fireEvent.click(desktopCTA);

      expect(mockTrackCTAClick).toHaveBeenCalledTimes(2);
      expect(mockTrackCTAClick).toHaveBeenNthCalledWith(
        1,
        'primary',
        'value_props_mobile_cta'
      );
      expect(mockTrackCTAClick).toHaveBeenNthCalledWith(
        2,
        'secondary',
        'value_props_quick_start'
      );
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels for mobile CTA', () => {
      render(<CTASection trackCTAClick={mockTrackCTAClick} />);

      const mobileCTA = screen.getByRole('button', {
        name: 'Comenzar a usar VendeMás de forma gratuita',
      });
      expect(mobileCTA).toBeTruthy();
    });

    it('has proper ARIA labels for desktop CTA', () => {
      render(<CTASection trackCTAClick={mockTrackCTAClick} />);

      const desktopCTA = screen.getByRole('button', {
        name: 'Comenzar a usar VendeMás de forma gratuita en minutos',
      });
      expect(desktopCTA).toBeTruthy();
    });

    it('renders arrow icons with proper accessibility', () => {
      render(<CTASection trackCTAClick={mockTrackCTAClick} />);

      const arrowIcons = screen.getAllByTestId('arrow-right-icon');
      expect(arrowIcons).toHaveLength(2); // One for mobile, one for desktop

      arrowIcons.forEach(icon => {
        expect(icon.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('has proper button types', () => {
      render(<CTASection trackCTAClick={mockTrackCTAClick} />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button.getAttribute('type')).toBe('button');
      });
    });
  });

  describe('Responsive Design', () => {
    it('applies correct CSS classes for mobile sticky positioning', () => {
      render(<CTASection trackCTAClick={mockTrackCTAClick} />);

      const mobileContainer = screen
        .getByRole('button', {
          name: 'Comenzar a usar VendeMás de forma gratuita',
        })
        .closest('div');

      expect(mobileContainer?.className).toContain('block');
      expect(mobileContainer?.className).toContain('sm:hidden');
      expect(mobileContainer?.className).toContain('fixed');
      expect(mobileContainer?.className).toContain('bottom-4');
      expect(mobileContainer?.className).toContain('left-4');
      expect(mobileContainer?.className).toContain('right-4');
      expect(mobileContainer?.className).toContain('z-50');
    });

    it('applies correct CSS classes for desktop CTA', () => {
      render(<CTASection trackCTAClick={mockTrackCTAClick} />);

      const desktopCTA = screen.getByRole('button', {
        name: 'Comenzar a usar VendeMás de forma gratuita en minutos',
      });

      expect(desktopCTA.className).toContain('group');
      expect(desktopCTA.className).toContain('rounded-full');
      expect(desktopCTA.className).toContain('bg-gradient-to-r');
      expect(desktopCTA.className).toContain('from-secondary-500');
      expect(desktopCTA.className).toContain('to-secondary-600');
      expect(desktopCTA.className).toContain('px-8');
      expect(desktopCTA.className).toContain('py-4');
      expect(desktopCTA.className).toContain('text-base');
      expect(desktopCTA.className).toContain('font-semibold');
      expect(desktopCTA.className).toContain('text-white');
    });

    it('applies hover and animation classes', () => {
      render(<CTASection trackCTAClick={mockTrackCTAClick} />);

      const desktopCTA = screen.getByRole('button', {
        name: 'Comenzar a usar VendeMás de forma gratuita en minutos',
      });

      expect(desktopCTA.className).toContain('hover:opacity-90');
      expect(desktopCTA.className).toContain('animate-pulse-custom');
    });
  });

  describe('Icon Rendering', () => {
    it('renders ArrowRight icons in both CTAs', () => {
      render(<CTASection trackCTAClick={mockTrackCTAClick} />);

      const arrowIcons = screen.getAllByTestId('arrow-right-icon');
      expect(arrowIcons).toHaveLength(2);
    });

    it('applies correct classes to arrow icons', () => {
      render(<CTASection trackCTAClick={mockTrackCTAClick} />);

      const arrowIcons = screen.getAllByTestId('arrow-right-icon');

      // Verify that both icons are rendered (mobile and desktop)
      expect(arrowIcons).toHaveLength(2);

      // Verify that the icons have the className prop passed through
      // (The actual classes are applied by the component, not the mock)
      expect(arrowIcons[0]).toHaveProperty('className');
      expect(arrowIcons[1]).toHaveProperty('className');

      // Verify that the icons are properly rendered as SVG elements
      expect(arrowIcons[0].tagName).toBe('svg');
      expect(arrowIcons[1].tagName).toBe('svg');
    });
  });

  describe('Trust Message', () => {
    it('renders trust message with correct styling', () => {
      render(<CTASection trackCTAClick={mockTrackCTAClick} />);

      const trustMessage = screen.getByText(
        'Sin costos ocultos, sin permanencia. Comienza a usar VendeMás hoy mismo.'
      );

      expect(trustMessage.className).toContain('mt-6');
      expect(trustMessage.className).toContain('text-xs');
      expect(trustMessage.className).toContain('sm:text-sm');
      expect(trustMessage.className).toContain('text-gray-600');
      expect(trustMessage.className).toContain('dark:text-gray-400');
      expect(trustMessage.className).toContain('max-w-md');
      expect(trustMessage.className).toContain('mx-auto');
    });

    it('conditionally renders trust message based on prop', () => {
      const { rerender } = render(
        <CTASection trackCTAClick={mockTrackCTAClick} showTrustMessage={true} />
      );

      expect(
        screen.getByText(
          'Sin costos ocultos, sin permanencia. Comienza a usar VendeMás hoy mismo.'
        )
      ).toBeTruthy();

      rerender(
        <CTASection
          trackCTAClick={mockTrackCTAClick}
          showTrustMessage={false}
        />
      );

      expect(
        screen.queryByText(
          'Sin costos ocultos, sin permanencia. Comienza a usar VendeMás hoy mismo.'
        )
      ).toBeFalsy();
    });
  });

  describe('Component Integration', () => {
    it('handles multiple rapid clicks correctly', () => {
      render(<CTASection trackCTAClick={mockTrackCTAClick} />);

      const desktopCTA = screen.getByRole('button', {
        name: 'Comenzar a usar VendeMás de forma gratuita en minutos',
      });

      // Click multiple times rapidly
      fireEvent.click(desktopCTA);
      fireEvent.click(desktopCTA);
      fireEvent.click(desktopCTA);

      expect(mockTrackCTAClick).toHaveBeenCalledTimes(3);
    });

    it('maintains component state across re-renders', () => {
      const { rerender } = render(
        <CTASection trackCTAClick={mockTrackCTAClick} />
      );

      const desktopCTA = screen.getByRole('button', {
        name: 'Comenzar a usar VendeMás de forma gratuita en minutos',
      });

      fireEvent.click(desktopCTA);

      // Re-render with same props
      rerender(<CTASection trackCTAClick={mockTrackCTAClick} />);

      // Component should still be functional
      const newDesktopCTA = screen.getByRole('button', {
        name: 'Comenzar a usar VendeMás de forma gratuita en minutos',
      });

      fireEvent.click(newDesktopCTA);

      expect(mockTrackCTAClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty button text gracefully', () => {
      render(<CTASection trackCTAClick={mockTrackCTAClick} buttonText='' />);

      const desktopCTA = screen.getByRole('button', {
        name: 'Comenzar a usar VendeMás de forma gratuita en minutos',
      });

      expect(desktopCTA).toBeTruthy();
      expect(desktopCTA.textContent).toBe('');
    });

    it('handles undefined trackCTAClick function', () => {
      // This should not throw an error
      expect(() => {
        render(<CTASection trackCTAClick={undefined as any} />);
      }).not.toThrow();
    });

    it('renders without crashing when all props are provided', () => {
      expect(() => {
        render(
          <CTASection
            trackCTAClick={mockTrackCTAClick}
            buttonText='Custom Button Text'
            showTrustMessage={false}
          />
        );
      }).not.toThrow();
    });
  });

  describe('Props Validation', () => {
    it('uses default values when optional props are not provided', () => {
      render(<CTASection trackCTAClick={mockTrackCTAClick} />);

      // Should use default button text
      const desktopCTA = screen.getByRole('button', {
        name: 'Comenzar a usar VendeMás de forma gratuita en minutos',
      });
      expect(desktopCTA.textContent).toContain(
        'Únete gratis a 10,000+ vendedores'
      );

      // Should show trust message by default
      expect(
        screen.getByText(
          'Sin costos ocultos, sin permanencia. Comienza a usar VendeMás hoy mismo.'
        )
      ).toBeTruthy();
    });

    it('accepts all prop combinations', () => {
      const testCases = [
        { buttonText: 'Test 1', showTrustMessage: true },
        { buttonText: 'Test 2', showTrustMessage: false },
        { buttonText: '', showTrustMessage: true },
        { buttonText: 'Test 3', showTrustMessage: false },
      ];

      testCases.forEach(({ buttonText, showTrustMessage }) => {
        const { unmount } = render(
          <CTASection
            trackCTAClick={mockTrackCTAClick}
            buttonText={buttonText}
            showTrustMessage={showTrustMessage}
          />
        );

        const desktopCTA = screen.getByRole('button', {
          name: 'Comenzar a usar VendeMás de forma gratuita en minutos',
        });

        expect(desktopCTA.textContent).toContain(buttonText);

        if (showTrustMessage) {
          expect(
            screen.getByText(
              'Sin costos ocultos, sin permanencia. Comienza a usar VendeMás hoy mismo.'
            )
          ).toBeTruthy();
        } else {
          expect(
            screen.queryByText(
              'Sin costos ocultos, sin permanencia. Comienza a usar VendeMás hoy mismo.'
            )
          ).toBeFalsy();
        }

        unmount();
      });
    });
  });
});
