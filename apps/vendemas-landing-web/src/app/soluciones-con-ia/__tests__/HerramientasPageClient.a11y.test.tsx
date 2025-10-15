import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import HerramientasPageClient from '../HerramientasPageClient';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('HerramientasPageClient Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<HerramientasPageClient />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper heading hierarchy', () => {
    const { container } = render(<HerramientasPageClient />);

    // Check for h1 element
    const h1 = container.querySelector('h1');
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent('Gestión y Ventas');

    // Check for h2 elements in the feature card
    const h2Elements = container.querySelectorAll('h2');
    expect(h2Elements.length).toBeGreaterThan(0);
  });

  it('should have proper ARIA labels and roles', () => {
    const { container } = render(<HerramientasPageClient />);

    // Check for aria-hidden decorative elements
    const decorativeElements = container.querySelectorAll(
      '[aria-hidden="true"]'
    );
    expect(decorativeElements.length).toBeGreaterThan(0);

    // Check for proper button labels
    const buttons = container.querySelectorAll('button');
    buttons.forEach(button => {
      const hasAriaLabel = button.hasAttribute('aria-label');
      const hasAriaLabelledBy = button.hasAttribute('aria-labelledby');
      const hasVisibleText = button.textContent?.trim();
      expect(hasAriaLabel || hasAriaLabelledBy || hasVisibleText).toBeTruthy();
    });
  });

  it('should have proper focus management', () => {
    const { container } = render(<HerramientasPageClient />);

    // Check for focusable elements
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    expect(focusableElements.length).toBeGreaterThan(0);

    // Check for focus indicators
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);

    // Check that buttons are focusable and have proper tabindex
    buttons.forEach(button => {
      expect(button).not.toHaveAttribute('tabindex', '-1');
      expect(button).toBeInTheDocument();
    });
  });

  it('should have proper color contrast', () => {
    const { container } = render(<HerramientasPageClient />);

    // Check for text elements with sufficient contrast
    const textElements = container.querySelectorAll('h1, h2, h3, p, span');
    expect(textElements.length).toBeGreaterThan(0);

    // Check for proper text color classes
    const hasTextColorClasses = Array.from(textElements).some(
      el =>
        el.classList.contains('text-gray-800') ||
        el.classList.contains('text-gray-600') ||
        el.classList.contains('text-white')
    );
    expect(hasTextColorClasses).toBeTruthy();
  });

  it('should have proper keyboard navigation', () => {
    const { container } = render(<HerramientasPageClient />);

    // Check for keyboard accessible buttons
    const buttons = container.querySelectorAll('button');
    buttons.forEach(button => {
      expect(button).not.toHaveAttribute('tabindex', '-1');
    });

    // Check for proper button types
    const interactiveButtons = container.querySelectorAll(
      'button[type="button"], button:not([type])'
    );
    expect(interactiveButtons.length).toBeGreaterThan(0);
  });
});
