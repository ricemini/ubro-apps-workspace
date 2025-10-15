import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import PrimaryCTA from '../PrimaryCTA';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('PrimaryCTA Accessibility', () => {
  const defaultProps = {
    text: 'Get Started',
    href: '/signup',
  };

  it('should not have accessibility violations', async () => {
    const { container } = render(<PrimaryCTA {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA labels', () => {
    render(<PrimaryCTA {...defaultProps} />);

    const button = screen.getByRole('link');
    expect(button).toHaveAttribute('aria-label', 'Botón para Get Started');
  });

  it('should use custom aria-label when provided', () => {
    const customAriaLabel = 'Comenzar a usar VendeMás';
    render(<PrimaryCTA {...defaultProps} ariaLabel={customAriaLabel} />);

    const button = screen.getByRole('link');
    expect(button).toHaveAttribute('aria-label', customAriaLabel);
  });

  it('should have proper semantic structure', () => {
    render(<PrimaryCTA {...defaultProps} />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/signup');
  });

  it('should have proper focus indicators', () => {
    const { container } = render(<PrimaryCTA {...defaultProps} />);

    const link = container.querySelector('a');
    expect(link).toHaveClass(
      'focus:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-offset-2'
    );
  });

  it('should be keyboard accessible', () => {
    render(<PrimaryCTA {...defaultProps} />);

    const link = screen.getByRole('link');

    // Test keyboard navigation
    link.focus();
    expect(document.activeElement).toBe(link);

    // Check for proper tabindex (should be 0 by default for links)
    expect(link).not.toHaveAttribute('tabindex', '-1');
  });

  it('should have proper color contrast', () => {
    const { container } = render(<PrimaryCTA {...defaultProps} />);

    const link = container.querySelector('a');
    expect(link).toHaveClass('text-white');

    // Check for proper background styling
    expect(link).toHaveStyle({
      backgroundImage: 'linear-gradient(135deg, #2f7d32 0%, #8b5cf6 100%)',
    });
  });

  it('should have proper text content', () => {
    render(<PrimaryCTA {...defaultProps} />);

    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('should have proper icon accessibility', () => {
    const { container } = render(<PrimaryCTA {...defaultProps} />);

    const arrowIcon = container.querySelector('svg');
    expect(arrowIcon).toBeInTheDocument();
    expect(arrowIcon).toHaveAttribute('aria-hidden', 'true');
  });

  it('should support analytics tracking', () => {
    const analyticsValue = 'cta_primary_test';
    render(<PrimaryCTA {...defaultProps} analytics={analyticsValue} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('data-analytics', analyticsValue);
  });

  it('should support custom className', () => {
    const customClass = 'custom-class';
    const { container } = render(
      <PrimaryCTA {...defaultProps} className={customClass} />
    );

    const link = container.querySelector('a');
    expect(link).toHaveClass(customClass);
  });

  it('should handle click events properly', () => {
    const mockOnClick = vi.fn();
    render(<PrimaryCTA {...defaultProps} onClick={mockOnClick} />);

    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should have proper responsive design', () => {
    const { container } = render(<PrimaryCTA {...defaultProps} />);

    const link = container.querySelector('a');
    expect(link).toHaveClass('w-full', 'h-14');
  });

  it('should have proper hover states', () => {
    const { container } = render(<PrimaryCTA {...defaultProps} />);

    const link = container.querySelector('a');
    expect(link).toHaveClass('hover:scale-105', 'hover:shadow-2xl');
  });
});
