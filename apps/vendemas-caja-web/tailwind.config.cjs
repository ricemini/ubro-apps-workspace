const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
// Direct v3 configuration for Angular compatibility
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
    '../../libs/vendemas-shared-design/src/**/*.{html,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Vendemás Design System Colors
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
    function ({ addUtilities, theme }) {
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
