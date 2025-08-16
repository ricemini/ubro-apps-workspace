# Angular App Setup

## Overview

This document provides a comprehensive guide for setting up new Angular applications within the VendeMás monorepo, following established patterns and best practices.

## Prerequisites

### **Required Tools**

- Node.js 18+ and npm/pnpm
- Nx CLI installed globally or via npx
- Angular CLI (optional, Nx handles most operations)

### **Workspace Setup**

- Nx monorepo initialized
- `@nx/angular` plugin installed
- TypeScript configuration established
- ESLint and Prettier configured

## Basic Angular App Generation

### **Command Structure**

```bash
nx g @nx/angular:application \
  --name=<app-name> \
  --directory=apps/<app-name> \
  --style=scss \
  --unitTestRunner=vitest \
  --e2eTestRunner=playwright \
  --linter=eslint \
  --strict=true \
  --standalone=true \
  --bundler=esbuild \
  --routing=true \
  --ssr=false \
  --prefix=app \
  --addTailwind
```

### **Parameter Breakdown**

#### **Core Parameters**

- `--name`: Application name (e.g., `vendemas-negocio-web`)
- `--directory`: Target directory path
- `--style`: CSS preprocessor (scss recommended)
- `--routing`: Enable Angular routing
- `--standalone`: Use standalone components (Angular v20+)

#### **Testing Configuration**

- `--unitTestRunner`: Unit testing framework (vitest recommended)
- `--e2eTestRunner`: E2E testing framework (playwright recommended)
- `--linter`: Code quality tool (eslint)

#### **Build Configuration**

- `--bundler`: Build tool (esbuild for performance)
- `--ssr`: Server-side rendering (false for SPAs)
- `--strict`: Enable strict TypeScript checking

#### **Styling Configuration**

- `--addTailwind`: Configure Tailwind CSS
- `--prefix`: Component selector prefix

### **Example Commands**

#### **Business Dashboard App**

```bash
nx g @nx/angular:application \
  --name=vendemas-negocio-web \
  --directory=apps/vendemas-negocio-web \
  --style=scss \
  --unitTestRunner=vitest \
  --e2eTestRunner=playwright \
  --linter=eslint \
  --strict=true \
  --standalone=true \
  --bundler=esbuild \
  --routing=true \
  --ssr=false \
  --prefix=app \
  --addTailwind
```

#### **Admin Dashboard App**

```bash
nx g @nx/angular:application \
  --name=vendemas-admin-web \
  --directory=apps/vendemas-admin-web \
  --style=scss \
  --unitTestRunner=vitest \
  --e2eTestRunner=playwright \
  --linter=eslint \
  --strict=true \
  --standalone=true \
  --bundler=esbuild \
  --routing=true \
  --ssr=false \
  --prefix=app \
  --addTailwind
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
        "assets": [
          {
            "glob": "**/*",
            "input": "apps/vendemas-{role}-{platform}/public"
          },
          {
            "glob": "index.html",
            "input": "apps/vendemas-{role}-{platform}/src",
            "output": "."
          }
        ]
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
- Add `index.html` to assets array
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
export { AppComponent } from './app/app';
export { appConfig } from './app/app.config';
export { appRoutes } from './app/app.routes';
```

### **3. Update Tailwind Configuration**

#### **Copy Base Configuration**

```bash
cp apps/vendemas-caja-mobile/tailwind.config.cjs apps/vendemas-{app-name}/
cp apps/vendemas-caja-mobile/postcss.config.cjs apps/vendemas-{app-name}/
```

#### **Update Paths**

```javascript
// tailwind.config.js
export default {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
    '../../libs/vendemas-shared-design/src/**/*.{html,ts}',
  ],
  // ... rest of configuration
};
```

### **4. Configure Theme System**

#### **Copy Theme Directory**

```bash
cp -r apps/vendemas-caja-mobile/src/theme apps/vendemas-{app-name}/src/
```

#### **Update Styles**

```scss
// apps/vendemas-{app-name}/src/styles.scss
@use '@vendemas/shared-styles';
@use './theme/theme-styles.scss';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### **5. Configure i18n**

#### **Create Locale Structure**

```bash
mkdir -p apps/vendemas-{app-name}/src/locales/{es,en}
```

#### **Create Locale Files**

```xml
<!-- apps/vendemas-{app-name}/src/locales/es/messages.es.xlf -->
<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="app.title" datatype="html">
        <source>App Title</source>
        <target>App Title</target>
      </trans-unit>
    </body>
  </file>
</xliff>
```

#### **Install i18n Dependencies**

```bash
npm install @angular/localize
```

## Application-Specific Configuration

### **1. Update App Metadata**

#### **App Component**

```typescript
// apps/vendemas-{app-name}/src/app/app.ts
export class App {
  protected title = 'VendeMás {Role}';
}
```

#### **HTML Title**

```html
<!-- apps/vendemas-{app-name}/src/index.html -->
<title>VendeMás {Role}</title>
```

#### **Welcome Component**

```typescript
// apps/vendemas-{app-name}/src/app/nx-welcome.ts
// Update project references and welcome messages
```

### **2. Configure Build Targets**

#### **Development Server**

```json
{
  "serve": {
    "configurations": {
      "development": {
        "buildTarget": "vendemas-{app-name}:build:development"
      }
    }
  }
}
```

#### **Static Serving**

```json
{
  "serve-static": {
    "options": {
      "buildTarget": "vendemas-{app-name}:build",
      "staticFilePath": "dist/vendemas-{app-name}/browser"
    }
  }
}
```

## Testing Configuration

### **1. Test Setup**

#### **Update test-setup.ts**

```typescript
import '@angular/compiler';
import '@analogjs/vitest-angular/setup-zone';
import 'vitest/globals';

import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import { getTestBed } from '@angular/core/testing';

getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting()
);
```

#### **Configure Vitest**

```typescript
// vite.config.mts
export default defineConfig(() => ({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    coverage: {
      reportsDirectory: '../../coverage/apps/vendemas-{app-name}',
    },
  },
}));
```

### **2. E2E Testing**

#### **Playwright Configuration**

```typescript
// apps/vendemas-{app-name}-e2e/playwright.config.ts
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
  ],
  webServer: {
    command: 'nx serve vendemas-{app-name}',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
  },
});
```

## Quality Assurance

### **1. Linting Configuration**

#### **ESLint Setup**

```javascript
// apps/vendemas-{app-name}/eslint.config.mjs
import baseConfig from '../../eslint.config.js';

export default baseConfig;
```

#### **Lint Commands**

```bash
nx lint vendemas-{app-name}
nx lint vendemas-{app-name} --fix
```

### **2. Build Verification**

#### **Production Build**

```bash
nx build vendemas-{app-name}
```

#### **Development Server**

```bash
nx serve vendemas-{app-name} --port=4200
```

#### **i18n Extraction**

```bash
nx extract-i18n vendemas-{app-name}
```

## Common Issues & Solutions

### **1. Build Errors**

#### **Path Resolution Issues**

```bash
# Error: Cannot find tsconfig file
# Solution: Update tsconfig.app.json extends path
{
  "extends": "../../tsconfig.base.json"
}
```

#### **Asset Loading Issues**

```bash
# Error: Failed to read index HTML file
# Solution: Add index.html to assets in project.json
{
  "glob": "index.html",
  "input": "apps/vendemas-{app-name}/src",
  "output": "."
}
```

### **2. Theme Integration Issues**

#### **SCSS Import Errors**

```scss
// Error: Undefined mixin
// Solution: Temporarily disable shared styles
/* @use '@vendemas/shared-styles'; */
```

#### **Path Resolution**

```scss
// Use relative paths for theme imports
@use './theme/theme-styles.scss';
```

### **3. Testing Issues**

#### **Global Test Functions**

```typescript
// Error: 'describe' is not defined
// Solution: Import vitest globals
import 'vitest/globals';
```

## Best Practices

### **1. Naming Consistency**

- Follow the established naming pattern: `vendemas-{role}-{platform}`
- Use descriptive names that reflect the app's purpose
- Maintain consistency across all configuration files

### **2. Configuration Management**

- Copy configurations from existing working apps
- Update all paths and references systematically
- Test configurations before committing changes

### **3. Documentation**

- Update this document when new patterns emerge
- Document any deviations from standard patterns
- Include troubleshooting steps for common issues

### **4. Testing Strategy**

- Write tests for new components and services
- Maintain test coverage above 80%
- Use E2E tests for critical user workflows

## Next Steps

### **Immediate Actions**

1. **Verify Build**: Ensure the app builds successfully
2. **Test Functionality**: Verify all features work as expected
3. **Update Documentation**: Document any customizations

### **Future Enhancements**

1. **Performance Optimization**: Implement lazy loading and code splitting
2. **Accessibility**: Ensure WCAG AA/AAA compliance
3. **Internationalization**: Add more languages and locales
4. **Testing**: Expand test coverage and add performance tests

---

_This setup guide ensures consistent Angular application creation across the VendeMás ecosystem._
