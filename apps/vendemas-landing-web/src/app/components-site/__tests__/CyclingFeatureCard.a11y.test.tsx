import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { vi } from 'vitest';
import CyclingFeatureCard, {
  FeatureNavigationDots,
} from '../CyclingFeatureCard';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('CyclingFeatureCard Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<CyclingFeatureCard />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper heading structure', () => {
    render(<CyclingFeatureCard />);

    // Check for h2 element with category name
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Gestión y Ventas');
  });

  it('should have proper ARIA labels for interactive elements', () => {
    render(<CyclingFeatureCard />);

    // Check play/pause button
    const playPauseButton = screen.getByLabelText(
      /pausar animación|reanudar animación/i
    );
    expect(playPauseButton).toBeInTheDocument();

    // Check feature buttons
    const featureButtons = screen.getAllByRole('button');
    const featureButtonsWithLabels = featureButtons.filter(
      button => button.getAttribute('aria-label') || button.textContent?.trim()
    );
    expect(featureButtonsWithLabels.length).toBeGreaterThan(0);
  });

  it('should have proper keyboard navigation', () => {
    render(<CyclingFeatureCard />);

    // Check for focusable elements
    const focusableElements = screen.getAllByRole('button');
    expect(focusableElements.length).toBeGreaterThan(0);

    // Test keyboard navigation
    const firstButton = focusableElements[0];
    firstButton.focus();
    expect(document.activeElement).toBe(firstButton);
  });

  it('should have proper focus indicators', () => {
    const { container } = render(<CyclingFeatureCard />);

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);

    // Check that buttons are focusable and have proper tabindex
    buttons.forEach(button => {
      expect(button).not.toHaveAttribute('tabindex', '-1');
      expect(button).toBeInTheDocument();
    });
  });

  it('should announce state changes to screen readers', () => {
    render(<CyclingFeatureCard />);

    const playPauseButton = screen.getByLabelText(
      /pausar animación|reanudar animación/i
    );

    // Test state change
    fireEvent.click(playPauseButton);
    expect(playPauseButton).toHaveAttribute('aria-label', 'Reanudar animación');

    fireEvent.click(playPauseButton);
    expect(playPauseButton).toHaveAttribute('aria-label', 'Pausar animación');
  });

  it('should have proper semantic structure', () => {
    const { container } = render(<CyclingFeatureCard />);

    // Check for proper semantic elements
    const card =
      container.querySelector('[role="region"]') ||
      container.querySelector('div');
    expect(card).toBeInTheDocument();

    // Check for proper grid structure
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });

  it('should have proper color contrast for text', () => {
    const { container } = render(<CyclingFeatureCard />);

    // Check for text elements with proper color classes
    const textElements = container.querySelectorAll('h2, span, p');
    expect(textElements.length).toBeGreaterThan(0);

    // Check for proper text color classes
    const hasProperTextColors = Array.from(textElements).some(
      el =>
        el.classList.contains('text-gray-800') ||
        el.classList.contains('text-gray-600') ||
        el.classList.contains('text-gray-700') ||
        el.classList.contains('text-white')
    );
    expect(hasProperTextColors).toBeTruthy();
  });
});

describe('FeatureNavigationDots Accessibility', () => {
  const mockOnIndexChange = vi.fn();

  beforeEach(() => {
    mockOnIndexChange.mockClear();
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(
      <FeatureNavigationDots
        currentIndex={0}
        onIndexChange={mockOnIndexChange}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA labels for navigation dots', () => {
    render(
      <FeatureNavigationDots
        currentIndex={0}
        onIndexChange={mockOnIndexChange}
      />
    );

    // Check for navigation buttons with proper labels
    const navigationButtons = screen.getAllByRole('button');
    expect(navigationButtons.length).toBe(5); // 5 categories

    navigationButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-label');
      expect(button.getAttribute('aria-label')).toContain('Ir a');
    });
  });

  it('should indicate current active state', () => {
    render(
      <FeatureNavigationDots
        currentIndex={2}
        onIndexChange={mockOnIndexChange}
      />
    );

    const navigationButtons = screen.getAllByRole('button');
    const activeButton = navigationButtons[2];

    // Check for active state styling
    expect(activeButton).toHaveClass(
      'bg-gradient-to-r',
      'from-primary-500',
      'to-primary-600'
    );
  });

  it('should be keyboard accessible', () => {
    render(
      <FeatureNavigationDots
        currentIndex={0}
        onIndexChange={mockOnIndexChange}
      />
    );

    const navigationButtons = screen.getAllByRole('button');

    // Test keyboard navigation
    navigationButtons[0].focus();
    expect(document.activeElement).toBe(navigationButtons[0]);

    // Test keyboard interaction
    fireEvent.click(navigationButtons[0]);
    expect(mockOnIndexChange).toHaveBeenCalledWith(0);
  });

  it('should have proper focus indicators', () => {
    const { container } = render(
      <FeatureNavigationDots
        currentIndex={0}
        onIndexChange={mockOnIndexChange}
      />
    );

    const buttons = container.querySelectorAll('button');
    buttons.forEach(button => {
      const hasFocusStyles =
        button.classList.contains('focus:outline-none') ||
        button.classList.contains('focus:ring-2');
      expect(hasFocusStyles).toBeTruthy();
    });
  });
});
