// Vendemás Design Tokens
// FANG-level design system tokens for consistent styling

import type { DesignTokens } from '../types';

export const vendemasTokens: DesignTokens = {
  colors: {
    primary: {
      light: '#4CAF50',
      onLight: '#000000',
      dark: '#A5D6A7',
      onDark: '#0C3D0F',
    },
    secondary: {
      light: '#1E3A5F',
      onLight: '#FFFFFF',
      dark: '#99B3D4',
      onDark: '#0B1A2C',
    },
    tertiary: {
      light: '#F4B942',
      onLight: '#000000',
      dark: '#FAD77D',
      onDark: '#3E2C00',
    },
    error: {
      light: '#C23B4B',
      onLight: '#FFFFFF',
      dark: '#F2A7B1',
      onDark: '#5A1220',
    },
  },
  typography: {
    fontFamily: {
      body: "'Inter', sans-serif",
      display: "'Montserrat', sans-serif",
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
  },
  borderRadius: {
    sm: '0.25rem', // 4px
    md: '0.5rem', // 8px
    lg: '1rem', // 16px
    full: '9999px',
  },
};

// CSS Custom Properties for runtime theming
export const generateCSSVariables = (
  tokens: DesignTokens,
  isDark = false
): string => {
  const mode = isDark ? 'dark' : 'light';

  return `
    :root {
      /* Colors */
      --vendemas-primary: ${tokens.colors.primary[mode]};
      --vendemas-primary-on: ${tokens.colors.primary[`on${mode.charAt(0).toUpperCase() + mode.slice(1)}`]};
      --vendemas-secondary: ${tokens.colors.secondary[mode]};
      --vendemas-secondary-on: ${tokens.colors.secondary[`on${mode.charAt(0).toUpperCase() + mode.slice(1)}`]};
      --vendemas-tertiary: ${tokens.colors.tertiary[mode]};
      --vendemas-tertiary-on: ${tokens.colors.tertiary[`on${mode.charAt(0).toUpperCase() + mode.slice(1)}`]};
      --vendemas-error: ${tokens.colors.error[mode]};
      --vendemas-error-on: ${tokens.colors.error[`on${mode.charAt(0).toUpperCase() + mode.slice(1)}`]};
      
      /* Typography */
      --vendemas-font-family-body: ${tokens.typography.fontFamily.body};
      --vendemas-font-family-display: ${tokens.typography.fontFamily.display};
      --vendemas-font-weight-normal: ${tokens.typography.fontWeight.normal};
      --vendemas-font-weight-medium: ${tokens.typography.fontWeight.medium};
      --vendemas-font-weight-bold: ${tokens.typography.fontWeight.bold};
      
      /* Spacing */
      --vendemas-spacing-xs: ${tokens.spacing.xs};
      --vendemas-spacing-sm: ${tokens.spacing.sm};
      --vendemas-spacing-md: ${tokens.spacing.md};
      --vendemas-spacing-lg: ${tokens.spacing.lg};
      --vendemas-spacing-xl: ${tokens.spacing.xl};
      
      /* Border Radius */
      --vendemas-radius-sm: ${tokens.borderRadius.sm};
      --vendemas-radius-md: ${tokens.borderRadius.md};
      --vendemas-radius-lg: ${tokens.borderRadius.lg};
      --vendemas-radius-full: ${tokens.borderRadius.full};
    }
  `;
};

// Application name styles
export const appNameStyles = `
  .app-name {
    font-family: var(--vendemas-font-family-display);
    font-weight: var(--vendemas-font-weight-bold);
    font-style: italic;
    font-size: 2.5rem;
    color: var(--vendemas-secondary);
  }
`;
