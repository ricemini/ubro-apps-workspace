// Angular Material 3 Custom Theme for Vendemás
// Following Material Design 3 specifications with custom color palette

import { createTheme } from '@angular/material/core';
import { vendemasTokens } from '../tokens';

// Material Design 3 color system
const createMaterialPalette = (color: string) => {
  // Generate Material Design 3 color palette
  // This is a simplified version - in production, you'd use a proper color generation tool
  return {
    50: `${color}0D`, // 5% opacity
    100: `${color}1A`, // 10% opacity
    200: `${color}33`, // 20% opacity
    300: `${color}4D`, // 30% opacity
    400: `${color}66`, // 40% opacity
    500: color, // Main color
    600: `${color}CC`, // 80% opacity
    700: `${color}E6`, // 90% opacity
    800: `${color}F2`, // 95% opacity
    900: `${color}FA`, // 98% opacity
    contrast: {
      50: 'rgba(0,0,0,0.87)',
      100: 'rgba(0,0,0,0.87)',
      200: 'rgba(0,0,0,0.87)',
      300: 'rgba(0,0,0,0.87)',
      400: 'rgba(0,0,0,0.87)',
      500: 'rgba(0,0,0,0.87)',
      600: 'rgba(255,255,255,0.87)',
      700: 'rgba(255,255,255,0.87)',
      800: 'rgba(255,255,255,0.87)',
      900: 'rgba(255,255,255,0.87)',
    },
  };
};

// Vendemás Light Theme
export const vendemasLightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: createMaterialPalette(vendemasTokens.colors.primary.light),
    accent: createMaterialPalette(vendemasTokens.colors.secondary.light),
    warn: createMaterialPalette(vendemasTokens.colors.error.light),
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    surface: {
      default: '#FFFFFF',
      variant: '#F5F5F5',
    },
    text: {
      primary: 'rgba(0,0,0,0.87)',
      secondary: 'rgba(0,0,0,0.6)',
      disabled: 'rgba(0,0,0,0.38)',
    },
  },
  typography: {
    fontFamily: vendemasTokens.typography.fontFamily.body,
    h1: {
      fontFamily: vendemasTokens.typography.fontFamily.display,
      fontWeight: vendemasTokens.typography.fontWeight.bold,
      fontSize: '2.5rem',
      lineHeight: '1.2',
    },
    h2: {
      fontFamily: vendemasTokens.typography.fontFamily.display,
      fontWeight: vendemasTokens.typography.fontWeight.bold,
      fontSize: '2rem',
      lineHeight: '1.3',
    },
    h3: {
      fontFamily: vendemasTokens.typography.fontFamily.display,
      fontWeight: vendemasTokens.typography.fontWeight.medium,
      fontSize: '1.75rem',
      lineHeight: '1.3',
    },
    h4: {
      fontFamily: vendemasTokens.typography.fontFamily.display,
      fontWeight: vendemasTokens.typography.fontWeight.medium,
      fontSize: '1.5rem',
      lineHeight: '1.4',
    },
    h5: {
      fontFamily: vendemasTokens.typography.fontFamily.display,
      fontWeight: vendemasTokens.typography.fontWeight.medium,
      fontSize: '1.25rem',
      lineHeight: '1.4',
    },
    h6: {
      fontFamily: vendemasTokens.typography.fontFamily.display,
      fontWeight: vendemasTokens.typography.fontWeight.medium,
      fontSize: '1.125rem',
      lineHeight: '1.4',
    },
    body1: {
      fontFamily: vendemasTokens.typography.fontFamily.body,
      fontWeight: vendemasTokens.typography.fontWeight.normal,
      fontSize: '1rem',
      lineHeight: '1.5',
    },
    body2: {
      fontFamily: vendemasTokens.typography.fontFamily.body,
      fontWeight: vendemasTokens.typography.fontWeight.normal,
      fontSize: '0.875rem',
      lineHeight: '1.43',
    },
    button: {
      fontFamily: vendemasTokens.typography.fontFamily.body,
      fontWeight: vendemasTokens.typography.fontWeight.medium,
      fontSize: '0.875rem',
      lineHeight: '1.75',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: parseInt(vendemasTokens.borderRadius.md),
  },
  density: {
    scale: 0,
  },
});

// Vendemás Dark Theme
export const vendemasDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: createMaterialPalette(vendemasTokens.colors.primary.dark),
    accent: createMaterialPalette(vendemasTokens.colors.secondary.dark),
    warn: createMaterialPalette(vendemasTokens.colors.error.dark),
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    surface: {
      default: '#1E1E1E',
      variant: '#2D2D2D',
    },
    text: {
      primary: 'rgba(255,255,255,0.87)',
      secondary: 'rgba(255,255,255,0.6)',
      disabled: 'rgba(255,255,255,0.38)',
    },
  },
  typography: {
    fontFamily: vendemasTokens.typography.fontFamily.body,
    h1: {
      fontFamily: vendemasTokens.typography.fontFamily.display,
      fontWeight: vendemasTokens.typography.fontWeight.bold,
      fontSize: '2.5rem',
      lineHeight: '1.2',
    },
    h2: {
      fontFamily: vendemasTokens.typography.fontFamily.display,
      fontWeight: vendemasTokens.typography.fontWeight.bold,
      fontSize: '2rem',
      lineHeight: '1.3',
    },
    h3: {
      fontFamily: vendemasTokens.typography.fontFamily.display,
      fontWeight: vendemasTokens.typography.fontWeight.medium,
      fontSize: '1.75rem',
      lineHeight: '1.3',
    },
    h4: {
      fontFamily: vendemasTokens.typography.fontFamily.display,
      fontWeight: vendemasTokens.typography.fontWeight.medium,
      fontSize: '1.5rem',
      lineHeight: '1.4',
    },
    h5: {
      fontFamily: vendemasTokens.typography.fontFamily.display,
      fontWeight: vendemasTokens.typography.fontWeight.medium,
      fontSize: '1.25rem',
      lineHeight: '1.4',
    },
    h6: {
      fontFamily: vendemasTokens.typography.fontFamily.display,
      fontWeight: vendemasTokens.typography.fontWeight.medium,
      fontSize: '1.125rem',
      lineHeight: '1.4',
    },
    body1: {
      fontFamily: vendemasTokens.typography.fontFamily.body,
      fontWeight: vendemasTokens.typography.fontWeight.normal,
      fontSize: '1rem',
      lineHeight: '1.5',
    },
    body2: {
      fontFamily: vendemasTokens.typography.fontFamily.body,
      fontWeight: vendemasTokens.typography.fontWeight.normal,
      fontSize: '0.875rem',
      lineHeight: '1.43',
    },
    button: {
      fontFamily: vendemasTokens.typography.fontFamily.body,
      fontWeight: vendemasTokens.typography.fontWeight.medium,
      fontSize: '0.875rem',
      lineHeight: '1.75',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: parseInt(vendemasTokens.borderRadius.md),
  },
  density: {
    scale: 0,
  },
});

// Theme provider function
export const getVendemasTheme = (isDark = false) => {
  return isDark ? vendemasDarkTheme : vendemasLightTheme;
};
