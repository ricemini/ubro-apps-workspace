import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import HerramientasPage from '../page';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('HerramientasPage Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<HerramientasPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper heading structure', () => {
    const { container } = render(<HerramientasPage />);
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    expect(headings.length).toBeGreaterThan(0);

    // Check for h1 element
    const h1 = container.querySelector('h1');
    expect(h1).toBeInTheDocument();
  });

  it('should have proper semantic structure', () => {
    const { container } = render(<HerramientasPage />);

    // Check for section landmarks
    const sections = container.querySelectorAll('section');
    expect(sections.length).toBeGreaterThan(0);

    // Check for proper heading structure
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    expect(headings.length).toBeGreaterThan(0);
  });
});
