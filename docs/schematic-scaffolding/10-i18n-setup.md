# i18n Setup

## Overview

Internationalization (i18n) in the VendeMás ecosystem provides multi-language support for applications, with Spanish as the primary language and English as secondary. This document covers the setup, configuration, and usage of i18n across different application types.

## Prerequisites

### **Required Dependencies**

```bash
npm install @angular/localize
```

### **Supported Locales**

- **es** (Spanish) - Primary locale
- **en** (English) - Secondary locale
- **Future**: Additional LATAM languages (Portuguese, French)

## Angular Applications

### **1. Basic Configuration**

#### **Install @angular/localize**

```bash
npm install @angular/localize
```

#### **Update project.json**

```json
{
  "targets": {
    "extract-i18n": {
      "executor": "@angular/build:extract-i18n",
      "options": {
        "buildTarget": "vendemas-{app-name}:build"
      }
    }
  }
}
```

#### **Update tsconfig.json**

```json
{
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false
  }
}
```

### **2. Locale Structure**

#### **Directory Organization**

```
src/
├── locales/
│   ├── es/
│   │   └── messages.es.xlf
│   └── en/
│       └── messages.en.xlf
└── i18n.config.ts
```

#### **Spanish Locale File (Primary)**

```xml
<!-- src/locales/es/messages.es.xlf -->
<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="app.title" datatype="html">
        <source>VendeMás Negocio</source>
        <target>VendeMás Negocio</target>
      </trans-unit>
      <trans-unit id="app.welcome" datatype="html">
        <source>Welcome to VendeMás Business Dashboard</source>
        <target>Bienvenido al Panel de Negocios VendeMás</target>
      </trans-unit>
      <trans-unit id="app.dashboard" datatype="html">
        <source>Dashboard</source>
        <target>Panel Principal</target>
      </trans-unit>
      <trans-unit id="app.analytics" datatype="html">
        <source>Analytics</source>
        <target>Análisis</target>
      </trans-unit>
      <trans-unit id="app.inventory" datatype="html">
        <source>Inventory</source>
        <target>Inventario</target>
      </trans-unit>
      <trans-unit id="app.sales" datatype="html">
        <source>Sales</source>
        <target>Ventas</target>
      </trans-unit>
      <trans-unit id="app.customers" datatype="html">
        <source>Customers</source>
        <target>Clientes</target>
      </trans-unit>
      <trans-unit id="app.settings" datatype="html">
        <source>Settings</source>
        <target>Configuración</target>
      </trans-unit>
    </body>
  </file>
</xliff>
```

#### **English Locale File (Secondary)**

```xml
<!-- src/locales/en/messages.en.xlf -->
<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="app.title" datatype="html">
        <source>VendeMás Negocio</source>
        <target>VendeMás Negocio</target>
      </trans-unit>
      <trans-unit id="app.welcome" datatype="html">
        <source>Welcome to VendeMás Business Dashboard</source>
        <target>Welcome to VendeMás Business Dashboard</target>
      </trans-unit>
      <trans-unit id="app.dashboard" datatype="html">
        <source>Dashboard</source>
        <target>Dashboard</target>
      </trans-unit>
      <trans-unit id="app.analytics" datatype="html">
        <source>Analytics</source>
        <target>Analytics</target>
      </trans-unit>
      <trans-unit id="app.inventory" datatype="html">
        <source>Inventory</source>
        <target>Inventory</target>
      </trans-unit>
      <trans-unit id="app.sales" datatype="html">
        <source>Sales</source>
        <target>Sales</target>
      </trans-unit>
      <trans-unit id="app.customers" datatype="html">
        <source>Customers</source>
        <target>Customers</target>
      </trans-unit>
      <trans-unit id="app.settings" datatype="html">
        <source>Settings</source>
        <target>Settings</target>
      </trans-unit>
    </body>
  </file>
</xliff>
```

### **3. i18n Configuration**

#### **Create i18n.config.ts**

```typescript
// src/i18n.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(),
  ],
};
```

### **4. Component Usage**

#### **Template Translation**

```html
<!-- app.component.html -->
<div class="app-container">
  <h1 i18n="@@app.title">VendeMás Negocio</h1>
  <p i18n="@@app.welcome">Welcome to VendeMás Business Dashboard</p>

  <nav class="main-nav">
    <a routerLink="/dashboard" i18n="@@app.dashboard">Dashboard</a>
    <a routerLink="/analytics" i18n="@@app.analytics">Analytics</a>
    <a routerLink="/inventory" i18n="@@app.inventory">Inventory</a>
    <a routerLink="/sales" i18n="@@app.sales">Sales</a>
    <a routerLink="/customers" i18n="@@app.customers">Customers</a>
    <a routerLink="/settings" i18n="@@app.settings">Settings</a>
  </nav>
</div>
```

#### **Dynamic Translation**

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { I18nService } from './services/i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private i18nService: I18nService) {}

  get currentLocale(): string {
    return this.i18nService.currentLocale;
  }

  switchLocale(locale: string): void {
    this.i18nService.setLocale(locale);
  }
}
```

### **5. i18n Service**

#### **Create i18n.service.ts**

```typescript
// src/services/i18n.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Locale = 'es' | 'en';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private readonly _currentLocale = new BehaviorSubject<Locale>('es');

  readonly currentLocale$ = this._currentLocale.asObservable();

  get currentLocale(): Locale {
    return this._currentLocale.value;
  }

  setLocale(locale: Locale): void {
    this._currentLocale.next(locale);
    localStorage.setItem('vendemas-locale', locale);

    // Reload the page to apply new locale
    window.location.reload();
  }

  initializeLocale(): void {
    const savedLocale = localStorage.getItem('vendemas-locale') as Locale;
    if (savedLocale && ['es', 'en'].includes(savedLocale)) {
      this._currentLocale.next(savedLocale);
    } else {
      // Default to Spanish for LATAM market
      this._currentLocale.next('es');
    }
  }
}
```

## Next.js Applications

### **1. Basic Configuration**

#### **Install Dependencies**

```bash
npm install next-intl
```

#### **Create next.config.mjs**

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

#### **Create i18n Configuration**

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

### **2. Locale Structure**

#### **Directory Organization**

```
src/
├── locales/
│   ├── es.json
│   └── en.json
└── app/
    ├── [locale]/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── ...
    └── ...
```

#### **Spanish Locale File**

```json
// src/locales/es.json
{
  "app": {
    "title": "VendeMás Landing",
    "welcome": "Bienvenido a VendeMás",
    "description": "La plataforma de comercio móvil para LATAM",
    "cta": "Comenzar Ahora"
  },
  "navigation": {
    "home": "Inicio",
    "features": "Características",
    "pricing": "Precios",
    "contact": "Contacto"
  },
  "features": {
    "pos": "Punto de Venta",
    "inventory": "Gestión de Inventario",
    "analytics": "Análisis de Ventas",
    "mobile": "Aplicación Móvil"
  }
}
```

#### **English Locale File**

```json
// src/locales/en.json
{
  "app": {
    "title": "VendeMás Landing",
    "welcome": "Welcome to VendeMás",
    "description": "The mobile commerce platform for LATAM",
    "cta": "Get Started"
  },
  "navigation": {
    "home": "Home",
    "features": "Features",
    "pricing": "Pricing",
    "contact": "Contact"
  },
  "features": {
    "pos": "Point of Sale",
    "inventory": "Inventory Management",
    "analytics": "Sales Analytics",
    "mobile": "Mobile App"
  }
}
```

### **3. Component Usage**

#### **Server Components**

```tsx
// src/app/[locale]/page.tsx
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('app');
  const nav = useTranslations('navigation');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <button>{t('cta')}</button>

      <nav>
        <a href='/'>{nav('home')}</a>
        <a href='/features'>{nav('features')}</a>
        <a href='/pricing'>{nav('pricing')}</a>
        <a href='/contact'>{nav('contact')}</a>
      </nav>
    </div>
  );
}
```

#### **Client Components**

```tsx
// src/components/LocaleSwitcher.tsx
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('navigation');

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className='locale-switcher'>
      <button
        onClick={() => switchLocale('es')}
        className={locale === 'es' ? 'active' : ''}
      >
        ES
      </button>
      <button
        onClick={() => switchLocale('en')}
        className={locale === 'en' ? 'active' : ''}
      >
        EN
      </button>
    </div>
  );
}
```

## Shared i18n Utilities

### **1. Locale Detection**

#### **Browser Locale Detection**

```typescript
// libs/vendemas-shared-i18n/src/utils/locale-detection.ts
export function detectBrowserLocale(): string {
  if (typeof window === 'undefined') return 'es';

  const browserLocale = navigator.language || navigator.languages?.[0] || 'es';
  const shortLocale = browserLocale.split('-')[0];

  // Map browser locales to supported locales
  const localeMap: Record<string, string> = {
    es: 'es',
    en: 'en',
    pt: 'es', // Portuguese speakers get Spanish for now
    fr: 'es', // French speakers get Spanish for now
  };

  return localeMap[shortLocale] || 'es';
}
```

#### **Geographic Locale Detection**

```typescript
// libs/vendemas-shared-i18n/src/utils/geo-locale.ts
export async function detectGeographicLocale(): Promise<string> {
  try {
    // Use IP geolocation service
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();

    const countryCode = data.country_code?.toLowerCase();

    // LATAM countries get Spanish
    const latamCountries = [
      'mx',
      'ar',
      'cl',
      'co',
      'pe',
      've',
      'ec',
      'bo',
      'py',
      'uy',
      'gy',
      'sr',
      'gf',
    ];

    if (latamCountries.includes(countryCode)) {
      return 'es';
    }

    // Default to English for other countries
    return 'en';
  } catch (error) {
    console.warn('Failed to detect geographic locale:', error);
    return 'es'; // Default to Spanish
  }
}
```

### **2. Locale Validation**

#### **Supported Locales**

```typescript
// libs/vendemas-shared-i18n/src/types/locale.ts
export const SUPPORTED_LOCALES = ['es', 'en'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export function isValidLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}
```

#### **Locale Fallbacks**

```typescript
// libs/vendemas-shared-i18n/src/utils/locale-fallbacks.ts
export function getLocaleFallback(locale: string): string {
  const fallbacks: Record<string, string> = {
    es: 'es',
    en: 'en',
    'es-MX': 'es',
    'es-AR': 'es',
    'es-CL': 'es',
    'en-US': 'en',
    'en-GB': 'en',
  };

  return fallbacks[locale] || fallbacks[locale.split('-')[0]] || 'es';
}
```

## Testing i18n

### **1. Unit Testing**

#### **Test i18n Service**

```typescript
// i18n.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
  let service: I18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(I18nService);
  });

  it('should default to Spanish locale', () => {
    expect(service.currentLocale).toBe('es');
  });

  it('should switch locale correctly', () => {
    service.setLocale('en');
    expect(service.currentLocale).toBe('en');
  });
});
```

#### **Test Component with i18n**

```typescript
// app.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display translated title', () => {
    const titleElement = fixture.nativeElement.querySelector('h1');
    expect(titleElement.textContent).toContain('VendeMás Negocio');
  });
});
```

### **2. E2E Testing**

#### **Playwright i18n Tests**

```typescript
// e2e/i18n.spec.ts
import { test, expect } from '@playwright/test';

test.describe('i18n functionality', () => {
  test('should display Spanish content by default', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toContainText('VendeMás Negocio');
    await expect(page.locator('p')).toContainText(
      'Bienvenido al Panel de Negocios VendeMás'
    );
  });

  test('should switch to English locale', async ({ page }) => {
    await page.goto('/');

    // Click English locale button
    await page.click('[data-locale="en"]');

    // Wait for page reload and check English content
    await expect(page.locator('h1')).toContainText('VendeMás Negocio');
    await expect(page.locator('p')).toContainText(
      'Welcome to VendeMás Business Dashboard'
    );
  });
});
```

## Build and Deployment

### **1. i18n Extraction**

#### **Extract Messages**

```bash
nx extract-i18n vendemas-{app-name}
```

#### **Build with Locales**

```bash
# Build Spanish version
nx build vendemas-{app-name} --configuration=production,es

# Build English version
nx build vendemas-{app-name} --configuration=production,en
```

### **2. Configuration Files**

#### **Angular i18n Configuration**

```json
// angular.json
{
  "projects": {
    "vendemas-{app-name}": {
      "i18n": {
        "sourceLocale": "en",
        "locales": {
          "es": {
            "translation": "src/locales/es/messages.es.xlf"
          }
        }
      }
    }
  }
}
```

#### **Next.js i18n Configuration**

```typescript
// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    localeDetection: true,
  },
};

export default withNextIntl(nextConfig);
```

## Best Practices

### **1. Message Organization**

- ✅ **Use hierarchical keys** (e.g., `app.title`, `navigation.home`)
- ✅ **Keep messages short and clear**
- ✅ **Use consistent naming conventions**
- ✅ **Group related messages together**

### **2. Translation Quality**

- ✅ **Provide context** for translators
- ✅ **Use placeholders** for dynamic content
- ✅ **Test with different text lengths**
- ✅ **Validate translations** before deployment

### **3. Performance**

- ✅ **Lazy load** locale files
- ✅ **Cache translations** in localStorage
- ✅ **Minimize bundle size** for each locale
- ✅ **Use CDN** for static locale files

### **4. Accessibility**

- ✅ **Support RTL languages** (future consideration)
- ✅ **Maintain proper contrast** across locales
- ✅ **Test with screen readers** in different languages
- ✅ **Provide language indicators** in UI

## Troubleshooting

### **Common Issues**

#### **Messages Not Displaying**

```bash
# Check if i18n extraction worked
nx extract-i18n vendemas-{app-name}

# Verify locale files exist
ls src/locales/

# Check build configuration
nx build vendemas-{app-name} --configuration=production,es
```

#### **Locale Switching Not Working**

```typescript
// Ensure service is properly injected
constructor(private i18nService: I18nService) {}

// Check localStorage persistence
localStorage.getItem('vendemas-locale')
```

#### **Build Errors**

```bash
# Clear build cache
nx reset

# Check TypeScript configuration
nx lint vendemas-{app-name}

# Verify dependencies
npm list @angular/localize
```

## Future Enhancements

### **1. Additional Languages**

- **Portuguese** (pt) - Brazil support
- **French** (fr) - French Guiana support
- **Indigenous languages** - Local market support

### **2. Advanced Features**

- **Pluralization rules** for different languages
- **Date and number formatting** by locale
- **Currency formatting** for different regions
- **RTL language support**

### **3. Automation**

- **Translation management** system integration
- **Automated translation** quality checks
- **Locale file validation** in CI/CD
- **Translation memory** and reuse

---

_This i18n setup ensures that VendeMás applications can serve users in their preferred language while maintaining consistency across the platform._
