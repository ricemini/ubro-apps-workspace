import { createGlobPatternsForDependencies } from '@nx/angular/tailwind';
import { join } from 'path';

/** @type {import('tailwindcss').Config} */
// Direct v3 configuration for Angular compatibility
export default {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
    '../../libs/vendemas-shared-design/src/**/*.{html,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Vendemás Design System Colors (Material Design 3 compatible)
        primary: {
          50: 'rgb(76 175 80 / 0.05)',
          100: 'rgb(76 175 80 / 0.1)',
          200: 'rgb(76 175 80 / 0.2)',
          300: 'rgb(76 175 80 / 0.3)',
          400: 'rgb(76 175 80 / 0.4)',
          500: '#4CAF50',
          600: 'rgb(76 175 80 / 0.8)',
          700: 'rgb(76 175 80 / 0.9)',
          800: 'rgb(76 175 80 / 0.95)',
          900: 'rgb(76 175 80 / 0.98)',
          DEFAULT: '#4CAF50',
          on: '#000000',
        },
        secondary: {
          50: 'rgb(30 58 95 / 0.05)',
          100: 'rgb(30 58 95 / 0.1)',
          200: 'rgb(30 58 95 / 0.2)',
          300: 'rgb(30 58 95 / 0.3)',
          400: 'rgb(30 58 95 / 0.4)',
          500: '#1E3A5F',
          600: 'rgb(30 58 95 / 0.8)',
          700: 'rgb(30 58 95 / 0.9)',
          800: 'rgb(30 58 95 / 0.95)',
          900: 'rgb(30 58 95 / 0.98)',
          DEFAULT: '#1E3A5F',
          on: '#FFFFFF',
        },
        tertiary: {
          50: 'rgb(244 185 66 / 0.05)',
          100: 'rgb(244 185 66 / 0.1)',
          200: 'rgb(244 185 66 / 0.2)',
          300: 'rgb(244 185 66 / 0.3)',
          400: 'rgb(244 185 66 / 0.4)',
          500: '#F4B942',
          600: 'rgb(244 185 66 / 0.8)',
          700: 'rgb(244 185 66 / 0.9)',
          800: 'rgb(244 185 66 / 0.95)',
          900: 'rgb(244 185 66 / 0.98)',
          DEFAULT: '#F4B942',
          on: '#000000',
        },
        error: {
          50: 'rgb(194 59 75 / 0.05)',
          100: 'rgb(194 59 75 / 0.1)',
          200: 'rgb(194 59 75 / 0.2)',
          300: 'rgb(194 59 75 / 0.3)',
          400: 'rgb(194 59 75 / 0.4)',
          500: '#C23B4B',
          600: 'rgb(194 59 75 / 0.8)',
          700: 'rgb(194 59 75 / 0.9)',
          800: 'rgb(194 59 75 / 0.95)',
          900: 'rgb(194 59 75 / 0.98)',
          DEFAULT: '#C23B4B',
          on: '#FFFFFF',
        },
        // Material Design 3 additional colors
        surface: {
          DEFAULT: 'var(--vendemas-surface)',
          variant: 'var(--vendemas-surface-variant)',
          on: 'var(--vendemas-on-surface)',
          'on-variant': 'var(--vendemas-on-surface-variant)',
        },
        background: {
          DEFAULT: 'var(--vendemas-background)',
          on: 'var(--vendemas-on-background)',
        },
        outline: {
          DEFAULT: 'var(--vendemas-outline)',
          variant: 'var(--vendemas-outline-variant)',
        },
        state: {
          hover: 'var(--vendemas-state-hover)',
          focus: 'var(--vendemas-state-focus)',
          selected: 'var(--vendemas-state-selected)',
          activated: 'var(--vendemas-state-activated)',
          dragged: 'var(--vendemas-state-dragged)',
        },
        shadow: {
          DEFAULT: 'var(--vendemas-shadow)',
          'elevation-1': 'var(--vendemas-shadow-elevation-1)',
          'elevation-2': 'var(--vendemas-shadow-elevation-2)',
          'elevation-3': 'var(--vendemas-shadow-elevation-3)',
        },
        // Semantic design tokens
        semantic: {
          success: 'var(--vendemas-primary)',
          'success-on': 'var(--vendemas-primary-on)',
          warning: 'var(--vendemas-tertiary)',
          'warning-on': 'var(--vendemas-tertiary-on)',
          error: 'var(--vendemas-error)',
          'error-on': 'var(--vendemas-error-on)',
          info: 'var(--vendemas-secondary)',
          'info-on': 'var(--vendemas-secondary-on)',
        },
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        bold: '700',
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
        full: '9999px',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4CAF50 0%, #1E3A5F 100%)',
        'gradient-secondary':
          'linear-gradient(135deg, #1E3A5F 0%, #F4B942 100%)',
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }): void {
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
        // Material Design 3 utilities
        '.elevation-1': {
          boxShadow: theme('boxShadow.shadow.elevation-1'),
        },
        '.elevation-2': {
          boxShadow: theme('boxShadow.shadow.elevation-2'),
        },
        '.elevation-3': {
          boxShadow: theme('boxShadow.shadow.elevation-3'),
        },
        '.surface': {
          backgroundColor: theme('colors.surface.DEFAULT'),
          color: theme('colors.surface.on'),
        },
        '.surface-variant': {
          backgroundColor: theme('colors.surface.variant'),
          color: theme('colors.surface.on-variant'),
        },
        '.state-hover': {
          backgroundColor: theme('colors.state.hover'),
        },
        '.state-focus': {
          backgroundColor: theme('colors.state.focus'),
        },
        '.state-selected': {
          backgroundColor: theme('colors.state.selected'),
        },
        '.state-activated': {
          backgroundColor: theme('colors.state.activated'),
        },
        '.outline': {
          borderColor: theme('colors.outline.DEFAULT'),
        },
        '.outline-variant': {
          borderColor: theme('colors.outline.variant'),
        },
        // Semantic design token utilities
        '.bg-success': {
          backgroundColor: theme('colors.semantic.success'),
        },
        '.text-success-on': {
          color: theme('colors.semantic.success-on'),
        },
        '.bg-warning': {
          backgroundColor: theme('colors.semantic.warning'),
        },
        '.text-warning-on': {
          color: theme('colors.semantic.warning-on'),
        },
        '.bg-error': {
          backgroundColor: theme('colors.semantic.error'),
        },
        '.text-error-on': {
          color: theme('colors.semantic.error-on'),
        },
        '.bg-info': {
          backgroundColor: theme('colors.semantic.info'),
        },
        '.text-info-on': {
          color: theme('colors.semantic.info-on'),
        },
        // Interactive state utilities
        '.interactive': {
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
        },
        '.interactive:hover': {
          transform: 'translateY(-1px)',
          boxShadow: theme('boxShadow.shadow.elevation-2'),
        },
        '.interactive:active': {
          transform: 'translateY(0)',
          boxShadow: theme('boxShadow.shadow.elevation-1'),
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
