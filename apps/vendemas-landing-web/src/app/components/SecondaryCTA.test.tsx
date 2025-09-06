import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SecondaryCTA from './SecondaryCTA';

// Mock the ChevronRight icon from lucide-react
vi.mock('lucide-react', () => ({
  ChevronRight: (props: any): React.JSX.Element => (
    <svg
      data-testid='chevron-right-icon'
      className={props.className}
      aria-hidden='true'
      {...props}
      viewBox='0 0 24 24'
    >
      <path d='M9 18l6-6-6-6' />
    </svg>
  ),
}));

describe('SecondaryCTA', () => {
  const defaultProps = {
    text: 'Learn more',
    url: '/features',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders with required props', () => {
      render(<SecondaryCTA {...defaultProps} />);

      const link = screen.getByRole('link', { name: 'Learn more' });
      expect(link).toBeTruthy();
      expect(link.getAttribute('href')).toBe('/features');
      expect(link.textContent).toContain('Learn more');
    });

    it('renders with custom description', () => {
      const customDescription = 'Custom description for the link';
      render(
        <SecondaryCTA {...defaultProps} description={customDescription} />
      );

      const link = screen.getByRole('link', { name: 'Learn more' });
      expect(link).toBeTruthy();
      expect(link.getAttribute('aria-describedby')).toBe(
        'secondary-cta-description'
      );

      const description = screen.getByText(customDescription);
      expect(description).toBeTruthy();
      expect(description.className).toContain('sr-only');
    });

    it('uses default description when not provided', () => {
      render(<SecondaryCTA {...defaultProps} />);

      const description = screen.getByText('Enlace para ver más información');
      expect(description).toBeTruthy();
      expect(description.className).toContain('sr-only');
    });

    it('renders chevron icon', () => {
      render(<SecondaryCTA {...defaultProps} />);

      const chevronIcon = screen.getByTestId('chevron-right-icon');
      expect(chevronIcon).toBeTruthy();
      expect(chevronIcon.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Props Validation', () => {
    it('accepts different text values', () => {
      const testCases = [
        'Ver demo',
        'Conoce más',
        'Explorar características',
        'Ver precios',
        'Contactar soporte',
      ];

      testCases.forEach(text => {
        const { unmount } = render(<SecondaryCTA text={text} url='/test' />);

        const link = screen.getByRole('link', { name: text });
        expect(link).toBeTruthy();
        expect(link.textContent).toContain(text);

        unmount();
      });
    });

    it('accepts different URL values', () => {
      const testCases = [
        '/features',
        '/pricing',
        '/demo',
        '/contact',
        'https://external.com',
        '/nested/path/here',
      ];

      testCases.forEach(url => {
        const { unmount } = render(<SecondaryCTA text='Test Link' url={url} />);

        const link = screen.getByRole('link');
        expect(link.getAttribute('href')).toBe(url);

        unmount();
      });
    });

    it('handles empty text gracefully', () => {
      render(<SecondaryCTA text='' url='/test' />);

      const link = screen.getByRole('link');
      expect(link).toBeTruthy();
      expect(link.textContent).toBe('');
    });

    it('handles empty URL gracefully', () => {
      render(<SecondaryCTA text='Test' url='' />);

      const link = screen.getByText('Test').closest('a');
      expect(link).toBeTruthy();
      expect(link?.getAttribute('href')).toBe('');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<SecondaryCTA {...defaultProps} />);

      const link = screen.getByRole('link');
      expect(link.getAttribute('aria-describedby')).toBe(
        'secondary-cta-description'
      );
    });

    it('has proper screen reader description', () => {
      const customDescription = 'Accessible description';
      render(
        <SecondaryCTA {...defaultProps} description={customDescription} />
      );

      const description = screen.getByText(customDescription);
      expect(description.getAttribute('id')).toBe('secondary-cta-description');
      expect(description.className).toContain('sr-only');
    });

    it('has proper focus management', () => {
      render(<SecondaryCTA {...defaultProps} />);

      const link = screen.getByRole('link');
      expect(link.className).toContain('focus:outline-none');
      expect(link.className).toContain('focus:ring-2');
      expect(link.className).toContain('focus:ring-secondary-500');
    });

    it('has proper keyboard navigation support', () => {
      render(<SecondaryCTA {...defaultProps} />);

      const link = screen.getByRole('link');
      expect(link.tagName).toBe('A');
      expect(link.getAttribute('href')).toBe('/features');
    });

    it('hides chevron icon from screen readers', () => {
      render(<SecondaryCTA {...defaultProps} />);

      const chevronIcon = screen.getByTestId('chevron-right-icon');
      expect(chevronIcon.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Styling and CSS Classes', () => {
    it('applies correct base classes', () => {
      render(<SecondaryCTA {...defaultProps} />);

      const link = screen.getByRole('link');
      expect(link.className).toContain('group');
      expect(link.className).toContain('inline-flex');
      expect(link.className).toContain('items-center');
      expect(link.className).toContain('gap-x-2');
      expect(link.className).toContain('text-sm');
      expect(link.className).toContain('font-semibold');
    });

    it('applies correct color classes', () => {
      render(<SecondaryCTA {...defaultProps} />);

      const link = screen.getByRole('link');
      expect(link.className).toContain('text-secondary-600');
      expect(link.className).toContain('hover:text-secondary-700');
      expect(link.className).toContain('dark:text-white');
      expect(link.className).toContain('dark:hover:text-white');
    });

    it('applies correct transition classes', () => {
      render(<SecondaryCTA {...defaultProps} />);

      const link = screen.getByRole('link');
      expect(link.className).toContain('transition-all');
      expect(link.className).toContain('duration-300');
    });

    it('applies correct focus classes', () => {
      render(<SecondaryCTA {...defaultProps} />);

      const link = screen.getByRole('link');
      expect(link.className).toContain('focus:outline-none');
      expect(link.className).toContain('focus:ring-2');
      expect(link.className).toContain('focus:ring-secondary-500');
      expect(link.className).toContain('focus:ring-offset-2');
      expect(link.className).toContain('focus:rounded-lg');
    });

    it('applies correct dark mode focus classes', () => {
      render(<SecondaryCTA {...defaultProps} />);

      const link = screen.getByRole('link');
      expect(link.className).toContain('dark:focus:ring-white');
      expect(link.className).toContain('dark:focus:ring-offset-gray-900');
    });

    it('applies correct chevron icon classes', () => {
      render(<SecondaryCTA {...defaultProps} />);

      const chevronIcon = screen.getByTestId('chevron-right-icon');
      expect(chevronIcon).toHaveProperty('className');
      expect(chevronIcon.tagName).toBe('svg');
    });
  });

  describe('Animated Underline', () => {
    it('renders animated underline element', () => {
      render(<SecondaryCTA {...defaultProps} />);

      const link = screen.getByRole('link');
      const underline = link.querySelector('span.absolute');

      expect(underline).toBeTruthy();
      expect(underline?.className).toContain('absolute');
      expect(underline?.className).toContain('-bottom-0.5');
      expect(underline?.className).toContain('left-0');
      expect(underline?.className).toContain('h-0.5');
      expect(underline?.className).toContain('w-0');
    });

    it('applies correct underline animation classes', () => {
      render(<SecondaryCTA {...defaultProps} />);

      const link = screen.getByRole('link');
      const underline = link.querySelector('span.absolute');

      expect(underline?.className).toContain('bg-secondary-600');
      expect(underline?.className).toContain('transition-all');
      expect(underline?.className).toContain('duration-300');
      expect(underline?.className).toContain('group-hover:w-full');
    });

    it('applies correct dark mode underline classes', () => {
      render(<SecondaryCTA {...defaultProps} />);

      const link = screen.getByRole('link');
      const underline = link.querySelector('span.absolute');

      expect(underline?.className).toContain('dark:bg-white');
      expect(underline?.className).toContain('dark:group-hover:bg-white');
    });

    it('hides underline on focus', () => {
      render(<SecondaryCTA {...defaultProps} />);

      const link = screen.getByRole('link');
      const underline = link.querySelector('span.absolute');

      expect(underline?.className).toContain('group-focus-within:hidden');
      expect(underline?.className).toContain('group-focus:hidden');
    });
  });

  describe('Component Integration', () => {
    it('renders all elements together correctly', () => {
      render(<SecondaryCTA {...defaultProps} />);

      // Check main link
      const link = screen.getByRole('link');
      expect(link).toBeTruthy();

      // Check text content
      expect(link.textContent).toContain('Learn more');

      // Check chevron icon
      const chevronIcon = screen.getByTestId('chevron-right-icon');
      expect(chevronIcon).toBeTruthy();

      // Check screen reader description
      const description = screen.getByText('Enlace para ver más información');
      expect(description).toBeTruthy();
    });

    it('maintains proper DOM structure', () => {
      render(<SecondaryCTA {...defaultProps} />);

      const link = screen.getByRole('link');

      // Should have text span
      const textSpan = link.querySelector('span.relative');
      expect(textSpan).toBeTruthy();
      expect(textSpan?.textContent).toBe('Learn more');

      // Should have underline span
      const underlineSpan = link.querySelector('span.absolute');
      expect(underlineSpan).toBeTruthy();

      // Should have chevron icon
      const chevronIcon = link.querySelector(
        'svg[data-testid="chevron-right-icon"]'
      );
      expect(chevronIcon).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles very long text', () => {
      const longText =
        'This is a very long text that might cause layout issues if not handled properly';
      render(<SecondaryCTA text={longText} url='/test' />);

      const link = screen.getByRole('link');
      expect(link.textContent).toContain(longText);
    });

    it('handles special characters in text', () => {
      const specialText = 'Ver más → & < > " \' / \\';
      render(<SecondaryCTA text={specialText} url='/test' />);

      const link = screen.getByRole('link');
      expect(link.textContent).toContain(specialText);
    });

    it('handles special characters in URL', () => {
      const specialUrl = '/path?param=value&other=test#section';
      render(<SecondaryCTA text='Test' url={specialUrl} />);

      const link = screen.getByRole('link');
      expect(link.getAttribute('href')).toBe(specialUrl);
    });

    it('handles very long description', () => {
      const longDescription =
        'This is a very long description that provides detailed information about what the link does and where it will take the user when clicked';
      render(
        <SecondaryCTA text='Test' url='/test' description={longDescription} />
      );

      const description = screen.getByText(longDescription);
      expect(description).toBeTruthy();
      expect(description.className).toContain('sr-only');
    });
  });

  describe('Props Combinations', () => {
    it('works with all props provided', () => {
      render(
        <SecondaryCTA
          text='Custom Text'
          url='/custom-url'
          description='Custom description'
        />
      );

      const link = screen.getByRole('link', { name: 'Custom Text' });
      expect(link.getAttribute('href')).toBe('/custom-url');

      const description = screen.getByText('Custom description');
      expect(description).toBeTruthy();
    });

    it('works with minimal props', () => {
      render(<SecondaryCTA text='Minimal' url='/minimal' />);

      const link = screen.getByRole('link', { name: 'Minimal' });
      expect(link.getAttribute('href')).toBe('/minimal');

      // Should use default description
      const description = screen.getByText('Enlace para ver más información');
      expect(description).toBeTruthy();
    });

    it('handles undefined description gracefully', () => {
      render(<SecondaryCTA text='Test' url='/test' description={undefined} />);

      // Should use default description
      const description = screen.getByText('Enlace para ver más información');
      expect(description).toBeTruthy();
    });
  });

  describe('Semantic HTML', () => {
    it('uses proper semantic elements', () => {
      render(<SecondaryCTA {...defaultProps} />);

      const link = screen.getByRole('link');
      expect(link.tagName).toBe('A');
      expect(link.getAttribute('href')).toBe('/features');
    });

    it('maintains proper heading hierarchy', () => {
      render(<SecondaryCTA {...defaultProps} />);

      // Should not interfere with heading structure
      const link = screen.getByRole('link');
      expect(link.tagName).toBe('A');
    });

    it('provides proper link context', () => {
      render(<SecondaryCTA {...defaultProps} />);

      const link = screen.getByRole('link');
      expect(link.textContent).toContain('Learn more');
      expect(link.getAttribute('href')).toBe('/features');
    });
  });
});
