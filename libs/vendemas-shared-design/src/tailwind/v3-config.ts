// Tailwind CSS v3 Configuration for Angular Compatibility
// Maintains design system tokens while using v3 syntax

import type { Config } from 'tailwindcss';
import { vendemasTokens } from '../tokens';

// Convert hex to RGB for Tailwind opacity support
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
    : '0 0 0';
};

// Generate Tailwind v3 color palette from design tokens
const generateTailwindV3Colors = () => {
  const colors = vendemasTokens.colors;

  return {
    // Primary colors
    primary: {
      50: `rgb(${hexToRgb(colors.primary.light)} / 0.05)`,
      100: `rgb(${hexToRgb(colors.primary.light)} / 0.1)`,
      200: `rgb(${hexToRgb(colors.primary.light)} / 0.2)`,
      300: `rgb(${hexToRgb(colors.primary.light)} / 0.3)`,
      400: `rgb(${hexToRgb(colors.primary.light)} / 0.4)`,
      500: colors.primary.light,
      600: `rgb(${hexToRgb(colors.primary.light)} / 0.8)`,
      700: `rgb(${hexToRgb(colors.primary.light)} / 0.9)`,
      800: `rgb(${hexToRgb(colors.primary.light)} / 0.95)`,
      900: `rgb(${hexToRgb(colors.primary.light)} / 0.98)`,
      DEFAULT: colors.primary.light,
      on: colors.primary.onLight,
    },
    // Secondary colors
    secondary: {
      50: `rgb(${hexToRgb(colors.secondary.light)} / 0.05)`,
      100: `rgb(${hexToRgb(colors.secondary.light)} / 0.1)`,
      200: `rgb(${hexToRgb(colors.secondary.light)} / 0.2)`,
      300: `rgb(${hexToRgb(colors.secondary.light)} / 0.3)`,
      400: `rgb(${hexToRgb(colors.secondary.light)} / 0.4)`,
      500: colors.secondary.light,
      600: `rgb(${hexToRgb(colors.secondary.light)} / 0.8)`,
      700: `rgb(${hexToRgb(colors.secondary.light)} / 0.9)`,
      800: `rgb(${hexToRgb(colors.secondary.light)} / 0.95)`,
      900: `rgb(${hexToRgb(colors.secondary.light)} / 0.98)`,
      DEFAULT: colors.secondary.light,
      on: colors.secondary.onLight,
    },
    // Tertiary colors
    tertiary: {
      50: `rgb(${hexToRgb(colors.tertiary.light)} / 0.05)`,
      100: `rgb(${hexToRgb(colors.tertiary.light)} / 0.1)`,
      200: `rgb(${hexToRgb(colors.tertiary.light)} / 0.2)`,
      300: `rgb(${hexToRgb(colors.tertiary.light)} / 0.3)`,
      400: `rgb(${hexToRgb(colors.tertiary.light)} / 0.4)`,
      500: colors.tertiary.light,
      600: `rgb(${hexToRgb(colors.tertiary.light)} / 0.8)`,
      700: `rgb(${hexToRgb(colors.tertiary.light)} / 0.9)`,
      800: `rgb(${hexToRgb(colors.tertiary.light)} / 0.95)`,
      900: `rgb(${hexToRgb(colors.tertiary.light)} / 0.98)`,
      DEFAULT: colors.tertiary.light,
      on: colors.tertiary.onLight,
    },
    // Error colors
    error: {
      50: `rgb(${hexToRgb(colors.error.light)} / 0.05)`,
      100: `rgb(${hexToRgb(colors.error.light)} / 0.1)`,
      200: `rgb(${hexToRgb(colors.error.light)} / 0.2)`,
      300: `rgb(${hexToRgb(colors.error.light)} / 0.3)`,
      400: `rgb(${hexToRgb(colors.error.light)} / 0.4)`,
      500: colors.error.light,
      600: `rgb(${hexToRgb(colors.error.light)} / 0.8)`,
      700: `rgb(${hexToRgb(colors.error.light)} / 0.9)`,
      800: `rgb(${hexToRgb(colors.error.light)} / 0.95)`,
      900: `rgb(${hexToRgb(colors.error.light)} / 0.98)`,
      DEFAULT: colors.error.light,
      on: colors.error.onLight,
    },
  };
};

// Vendemás Tailwind v3 Configuration for Angular
export const vendemasTailwindV3Config: Config = {
  content: [
    './src/**/*.{html,ts,js,jsx,tsx}',
    '../../apps/**/src/**/*.{html,ts,js,jsx,tsx}',
    '../../libs/**/src/**/*.{html,ts,js,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: generateTailwindV3Colors(),
      fontFamily: {
        body: vendemasTokens.typography.fontFamily.body.split(', '),
        display: vendemasTokens.typography.fontFamily.display.split(', '),
        sans: vendemasTokens.typography.fontFamily.body.split(', '),
      },
      fontWeight: {
        normal: vendemasTokens.typography.fontWeight.normal.toString(),
        medium: vendemasTokens.typography.fontWeight.medium.toString(),
        bold: vendemasTokens.typography.fontWeight.bold.toString(),
      },
      spacing: {
        xs: vendemasTokens.spacing.xs,
        sm: vendemasTokens.spacing.sm,
        md: vendemasTokens.spacing.md,
        lg: vendemasTokens.spacing.lg,
        xl: vendemasTokens.spacing.xl,
      },
      borderRadius: {
        sm: vendemasTokens.borderRadius.sm,
        md: vendemasTokens.borderRadius.md,
        lg: vendemasTokens.borderRadius.lg,
        full: vendemasTokens.borderRadius.full,
      },
      // Custom utilities for Vendemás design system
      backgroundImage: {
        'gradient-primary': `linear-gradient(135deg, ${vendemasTokens.colors.primary.light} 0%, ${vendemasTokens.colors.secondary.light} 100%)`,
        'gradient-secondary': `linear-gradient(135deg, ${vendemasTokens.colors.secondary.light} 0%, ${vendemasTokens.colors.tertiary.light} 100%)`,
      },
    },
  },
  plugins: [
    // Custom plugin for Vendemás design system utilities
    function ({ addUtilities, theme }: any) {
      const newUtilities = {
        '.app-name': {
          fontFamily: theme('fontFamily.display'),
          fontWeight: theme('fontWeight.bold'),
          fontStyle: 'italic',
          fontSize: '2.5rem',
          color: theme('colors.secondary.DEFAULT'),
        },
        '.text-body': {
          fontFamily: theme('fontFamily.body'),
          fontWeight: theme('fontWeight.normal'),
        },
        '.text-display': {
          fontFamily: theme('fontFamily.display'),
          fontWeight: theme('fontWeight.bold'),
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

// Export the v3 configuration for Angular apps
export default vendemasTailwindV3Config;
