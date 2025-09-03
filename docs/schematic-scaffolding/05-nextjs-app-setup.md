# Next.js App Setup

## Overview

This document provides a comprehensive guide for setting up new Next.js applications within the VendeMás monorepo, following established patterns and best practices for marketing and content-focused applications.

## Prerequisites

### **Required Tools**

- Node.js 18+ and npm/pnpm
- Nx CLI installed globally or via npx
- Next.js 14+ knowledge

### **Workspace Setup**

- Nx monorepo initialized
- `@nx/next` plugin installed
- TypeScript configuration established
- ESLint and Prettier configured

## Basic Next.js App Generation

### **Command Structure**

```bash
nx g @nx/next:application \
  --name=<app-name> \
  --directory=apps/<app-name> \
  --style=css \
  --unitTestRunner=vitest \
  --e2eTestRunner=playwright \
  --linter=eslint \
  --strict=true \
  --bundler=webpack \
  --routing=true \
  --ssr=true \
  --appDir=true \
  --importPath=@vendemas/<app-name>
```

### **Parameter Breakdown**

#### **Core Parameters**

- `--name`: Application name (e.g., `vendemas-landing-web`)
- `--directory`: Target directory path
- `--style`: CSS preprocessor (css, scss, or styled-components)
- `--routing`: Enable Next.js routing
- `--appDir`: Use App Router (Next.js 13+)

#### **Testing Configuration**

- `--unitTestRunner`: Unit testing framework (vitest recommended)
- `--e2eTestRunner`: E2E testing framework (playwright recommended)
- `--linter`: Code quality tool (eslint)

#### **Build Configuration**

- `--bundler`: Build tool (webpack or turbopack)
- `--ssr`: Server-side rendering (true for marketing sites)
- `--strict`: Enable strict TypeScript checking

#### **Styling Configuration**

- `--style`: CSS approach (css, scss, styled-components)
- `--importPath`: Package import path for the app

### **Example Commands**

#### **Landing Website App**

```bash
nx g @nx/next:application \
  --name=vendemas-landing-web \
  --directory=apps/vendemas-landing-web \
  --style=css \
  --unitTestRunner=vitest \
  --e2eTestRunner=playwright \
  --linter=eslint \
  --strict=true \
  --bundler=webpack \
  --routing=true \
  --ssr=true \
  --appDir=true \
  --importPath=@vendemas/landing-web
```

#### **Marketing Website App**

```bash
nx g @nx/next:application \
  --name=vendemas-website \
  --directory=apps/vendemas-website \
  --style=scss \
  --unitTestRunner=vitest \
  --e2eTestRunner=playwright \
  --linter=eslint \
  --strict=true \
  --bundler=webpack \
  --routing=true \
  --ssr=true \
  --appDir=true \
  --importPath=@vendemas/website
```

## Post-Generation Configuration

### **1. Update project.json**

#### **Required Changes**

```json
{
  "name": "vendemas-{role}-{platform}",
  "targets": {
    "build": {
      "options": {
        "outputPath": "dist/vendemas-{role}-{platform}",
        "buildLibsFromSource": true
      }
    },
    "test": {
      "executor": "@nx/vite:test",
      "options": {
        "reportsDirectory": "../coverage/vendemas-{role}-{platform}"
      }
    }
  }
}
```

#### **Key Modifications**

- Update `outputPath` to match naming convention
- Configure test coverage directory
- Update build target references

### **2. Configure TypeScript Paths**

#### **Add to tsconfig.base.json**

```json
{
  "compilerOptions": {
    "paths": {
      "@vendemas/{app-name}": ["apps/vendemas-{app-name}/src/index.ts"]
    }
  }
}
```

#### **Create index.ts**

```typescript
// apps/vendemas-{app-name}/src/index.ts
export { default as App } from './app/layout';
export { default as HomePage } from './app/page';
export { default as ContactForm } from './components/ContactForm';
export { default as VendorStats } from './components/VendorStats';
```

### **3. Update Next.js Configuration**

#### **next.config.mjs**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for marketing sites
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Configure trailing slash for static hosting
  trailingSlash: true,

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirects for marketing campaigns
  async redirects() {
    return [
      {
        source: '/old-landing',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

### **4. Configure Tailwind CSS**

#### **Install Dependencies**

```bash
npm install -D tailwindcss postcss autoprefixer
```

#### **Initialize Tailwind**

```bash
npx tailwindcss init -p
```

#### **tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../libs/vendemas-shared-styles/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          900: '#14532d',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

#### **postcss.config.js**

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### **5. Configure Global Styles**

#### **globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* VendeMás Design System */
@import '@vendemas/shared-styles';

/* Custom base styles */
@layer base {
  html {
    font-family: 'Inter', system-ui, sans-serif;
  }

  body {
    @apply bg-white text-gray-900;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Montserrat', system-ui, sans-serif;
  }
}

/* Custom component styles */
@layer components {
  .btn-primary {
    @apply bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors;
  }

  .btn-secondary {
    @apply bg-white text-primary-600 border-2 border-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors;
  }

  .card {
    @apply bg-white rounded-xl shadow-lg p-6 border border-gray-200;
  }
}

/* Custom utility styles */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

## App Router Structure

### **1. Layout Configuration**

#### **Root Layout**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'VendeMás - Plataforma de Comercio Móvil',
  description:
    'Empodera a vendedores ambulantes y micro-negocios en LATAM para vender más con menos fricción.',
  keywords: ['comercio móvil', 'LATAM', 'vendedores', 'POS', 'inventario'],
  authors: [{ name: 'VendeMás Team' }],
  openGraph: {
    title: 'VendeMás - Plataforma de Comercio Móvil',
    description: 'Empodera a vendedores ambulantes y micro-negocios en LATAM',
    type: 'website',
    locale: 'es_MX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VendeMás - Plataforma de Comercio Móvil',
    description: 'Empodera a vendedores ambulantes y micro-negocios en LATAM',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='es' className={`${inter.variable} ${montserrat.variable}`}>
      <body className='font-sans antialiased'>
        <div className='min-h-screen bg-gray-50'>{children}</div>
      </body>
    </html>
  );
}
```

#### **Page Components**

```tsx
// src/app/page.tsx
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
    </main>
  );
}
```

### **2. Component Organization**

#### **Component Structure**

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── layout/          # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── sections/        # Page sections
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   └── CTA.tsx
│   └── forms/           # Form components
│       ├── ContactForm.tsx
│       └── NewsletterSignup.tsx
```

#### **Example Component**

```tsx
// src/components/sections/Hero.tsx
import { Button } from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className='relative bg-gradient-to-br from-primary-50 to-primary-100 py-20'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6'>
            VendeMás
          </h1>
          <p className='text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed'>
            La plataforma de comercio móvil que empodera a vendedores ambulantes
            y micro-negocios en LATAM para vender más con menos fricción.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button variant='primary' size='lg'>
              Comenzar Ahora
            </Button>
            <Button variant='secondary' size='lg'>
              Ver Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

## Internationalization Setup

### **1. Install Dependencies**

```bash
npm install next-intl
```

### **2. Configure i18n**

```typescript
// i18n.ts
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['es', 'en'];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
```

### **3. Create Locale Files**

```json
// src/locales/es.json
{
  "hero": {
    "title": "VendeMás",
    "subtitle": "La plataforma de comercio móvil para LATAM",
    "description": "Empodera a vendedores ambulantes y micro-negocios en LATAM para vender más con menos fricción.",
    "cta": "Comenzar Ahora",
    "demo": "Ver Demo"
  }
}
```

```json
// src/locales/en.json
{
  "hero": {
    "title": "VendeMás",
    "subtitle": "The Mobile Commerce Platform for LATAM",
    "description": "Empower street vendors and micro-businesses in LATAM to sell more with less friction.",
    "cta": "Get Started",
    "demo": "View Demo"
  }
}
```

### **4. Update Next.js Config**

```javascript
// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other config
};

export default withNextIntl(nextConfig);
```

## Testing Configuration

### **1. Unit Testing with Vitest**

#### **vitest.config.ts**

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  cacheDir: '../../node_modules/.vitest',
  server: {
    port: 4200,
    host: 'localhost',
  },
  plugins: [react(), nxViteTsPaths()],
  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['src/test-setup.ts'],
  },
});
```

#### **test-setup.ts**

```typescript
// Vitest setup - no jest-dom needed
import { vi } from 'vitest';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock Next.js image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));
```

### **2. E2E Testing with Playwright**

#### **playwright.config.ts**

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'nx serve vendemas-{app-name}',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
  },
});
```

## Build and Deployment

### **1. Build Configuration**

#### **Static Export**

```bash
# Build for static hosting
nx build vendemas-{app-name}

# Build with specific environment
nx build vendemas-{app-name} --configuration=production
```

#### **Build Output**

```
dist/vendemas-{app-name}/
├── _next/
├── images/
├── index.html
├── 404.html
└── sitemap.xml
```

### **2. Deployment Options**

#### **Vercel Deployment**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### **Static Hosting (Netlify, GitHub Pages)**

```bash
# Build static files
nx build vendemas-{app-name}

# Deploy to hosting service
# Upload dist/vendemas-{app-name}/ contents
```

## Performance Optimization

### **1. Image Optimization**

```tsx
import Image from 'next/image';

export default function OptimizedImage() {
  return (
    <Image
      src='/images/hero.jpg'
      alt='VendeMás Hero'
      width={1200}
      height={600}
      priority
      className='rounded-lg'
    />
  );
}
```

### **2. Font Optimization**

```tsx
import { Inter, Montserrat } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});
```

### **3. Bundle Analysis**

```bash
# Analyze bundle size
nx build vendemas-{app-name} --analyze

# Or use webpack-bundle-analyzer
npm install -D webpack-bundle-analyzer
```

## Common Issues & Solutions

### **1. Build Errors**

#### **Module Resolution Issues**

```bash
# Error: Cannot resolve module
# Solution: Check tsconfig paths and import statements
nx lint vendemas-{app-name}
```

#### **CSS Import Issues**

```bash
# Error: CSS modules not working
# Solution: Ensure proper CSS configuration in next.config.mjs
```

### **2. Runtime Errors**

#### **Hydration Mismatches**

```tsx
// Use dynamic imports for client-only components
import dynamic from 'next/dynamic';

const ClientOnlyComponent = dynamic(() => import('./ClientComponent'), {
  ssr: false,
});
```

#### **Environment Variables**

```bash
# Create .env.local file
NEXT_PUBLIC_API_URL=https://api.vendemas.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Best Practices

### **1. Component Design**

- ✅ **Use TypeScript** for all components
- ✅ **Implement proper prop validation**
- ✅ **Use semantic HTML elements**
- ✅ **Follow accessibility guidelines**

### **2. Performance**

- ✅ **Optimize images** with Next.js Image component
- ✅ **Use dynamic imports** for code splitting
- ✅ **Implement proper caching** strategies
- ✅ **Monitor Core Web Vitals**

### **3. SEO**

- ✅ **Use proper meta tags** and Open Graph
- ✅ **Implement structured data** (JSON-LD)
- ✅ **Create sitemap.xml** and robots.txt
- ✅ **Optimize for Core Web Vitals**

### **4. Testing**

- ✅ **Write unit tests** for components
- ✅ **Implement E2E tests** for critical flows
- ✅ **Test accessibility** with tools like axe-core
- ✅ **Performance testing** with Lighthouse

## Next Steps

### **Immediate Actions**

1. **Verify Build**: Ensure the app builds successfully
2. **Test Functionality**: Verify all features work as expected
3. **Update Documentation**: Document any customizations

### **Future Enhancements**

1. **Performance Optimization**: Implement advanced caching and optimization
2. **Analytics Integration**: Add Google Analytics and conversion tracking
3. **A/B Testing**: Implement feature flags and testing framework
4. **CMS Integration**: Add content management capabilities

---

_This setup guide ensures consistent Next.js application creation across the VendeMás ecosystem._
