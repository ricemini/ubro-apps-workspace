const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
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
          on: '#000000',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
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
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float-slow': 'float-slow 7s ease-in-out infinite',
      },
      fontFamily: {
        display: ['var(--font-jakarta)', 'Inter', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        // keep "sans" for legacy components
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
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
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4CAF50 0%, #1E3A5F 100%)',
        'gradient-secondary':
          'linear-gradient(135deg, #1E3A5F 0%, #F4B942 100%)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.app-name': {
          fontFamily: theme('fontFamily.display'),
          fontWeight: '800',
          fontStyle: 'normal',
          fontSize: '2rem',
          letterSpacing: '-0.02em',
          color: theme('colors.secondary.DEFAULT'),
        },
        '.text-body': {
          fontFamily: theme('fontFamily.body'),
          fontWeight: '400',
        },
        '.text-display': {
          fontFamily: theme('fontFamily.display'),
          fontWeight: '700',
          letterSpacing: '-0.01em',
        },
        '.nums-tabular': {
          fontVariantNumeric: 'tabular-nums',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
