# Import Path Configuration

## Overview

This document covers the configuration of import paths in the VendeMás monorepo, including short `@` imports for apps and libs, and the organization of path aliases for optimal developer experience.

## Import Path Strategy

### **Dual Import System**

The monorepo implements a dual import system that provides both short and full vendor-prefixed imports:

#### **Short Imports (Recommended)**

```typescript
// Apps
import { App } from '@caja-mobile';
import { Dashboard } from '@negocio-web';
import { Landing } from '@landing-web';

// Libraries
import { Button } from '@shared-ui';
import { Product } from '@shared-types';
import { AuthService } from '@shared-auth';
```

#### **Full Vendor Imports (Alternative)**

```typescript
// Apps
import { App } from '@vendemas/caja-mobile';
import { Dashboard } from '@vendemas/negocio-web';
import { Landing } from '@vendemas/landing-web';

// Libraries
import { Button } from '@vendemas/shared-ui';
import { Product } from '@vendemas/shared-types';
import { AuthService } from '@vendemas/shared-auth';
```

## Configuration

### **1. TypeScript Path Mapping**

#### **tsconfig.base.json Structure**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      /* Short imports for apps */
      "@caja-mobile": ["apps/vendemas-caja-mobile/src/index.ts"],
      "@negocio-web": ["apps/vendemas-negocio-web/src/index.ts"],
      "@landing-web": ["apps/vendemas-landing-web/src/index.ts"],

      /* Short imports for libs */
      "@shared-styles": ["libs/vendemas-shared-styles/src/index.scss"],
      "@shared-design": ["libs/vendemas-shared-design/src/index.ts"],
      "@shared-i18n": ["libs/vendemas-shared-i18n/src/index.ts"],

      /* Full vendor imports for apps */
      "@vendemas/caja-mobile": ["apps/vendemas-caja-mobile/src/index.ts"],
      "@vendemas/negocio-web": ["apps/vendemas-negocio-web/src/index.ts"],
      "@vendemas/landing-web": ["apps/vendemas-landing-web/src/index.ts"],

      /* Full vendor imports for libs */
      "@vendemas/shared-styles": ["libs/vendemas-shared-styles/src/index.scss"],
      "@vendemas/shared-design": ["libs/vendemas-shared-design/src/index.ts"],
      "@vendemas/shared-i18n": ["libs/vendemas-shared-i18n/src/index.ts"],

      /* Legacy imports for backward compatibility */
      "@vendemas/*": ["libs/*"]
    }
  }
}
```

### **2. Path Organization**

#### **App Imports**

```
@caja-mobile          → apps/vendemas-caja-mobile/src/index.ts
@negocio-web          → apps/vendemas-negocio-web/src/index.ts
@landing-web          → apps/vendemas-landing-web/src/index.ts
@admin-web            → apps/vendemas-admin-web/src/index.ts
@website              → apps/vendemas-website/src/index.ts
```

#### **Library Imports**

```
@shared-styles        → libs/vendemas-shared-styles/src/index.scss
@shared-design        → libs/vendemas-shared-design/src/index.ts
@shared-i18n          → libs/vendemas-shared-i18n/src/index.ts
@shared-types         → libs/vendemas-shared-types/src/index.ts
@shared-ui            → libs/vendemas-shared-ui/src/index.ts
@shared-auth          → libs/vendemas-shared-auth/src/index.ts
@shared-api           → libs/vendemas-shared-api/src/index.ts
@shared-utils         → libs/vendemas-shared-utils/src/index.ts
@shared-constants     → libs/vendemas-shared-constants/src/index.ts
```

## Usage Examples

### **1. App-to-App Imports**

#### **Importing from Another App**

```typescript
// In vendemas-negocio-web
import { CajaService } from '@caja-mobile';
import { LandingData } from '@landing-web';

// In vendemas-caja-mobile
import { BusinessLogic } from '@negocio-web';
import { MarketingData } from '@landing-web';
```

#### **Importing Shared Libraries**

```typescript
// In any app
import { Button, Card, Input } from '@shared-ui';
import { Product, User, Order } from '@shared-types';
import { AuthService, TokenManager } from '@shared-auth';
import { ApiClient, HttpService } from '@shared-api';
```

### **2. Library-to-Library Imports**

#### **Cross-Library Dependencies**

```typescript
// In vendemas-shared-ui
import { Product, User } from '@shared-types';
import { AuthService } from '@shared-auth';

// In vendemas-shared-auth
import { User, Role } from '@shared-types';
import { ApiClient } from '@shared-api';
```

### **3. Style Imports**

#### **SCSS Imports**

```scss
// In any app's styles.scss
@use '@shared-styles' as *;
@use '@shared-design' as *;

// In component styles
@use '@shared-styles/foundation/variables' as *;
@use '@shared-styles/components/buttons' as *;
```

## Best Practices

### **1. Import Preference Order**

#### **Recommended Import Priority**

1. **Short imports** (`@caja-mobile`, `@shared-ui`) - **Preferred**
2. **Full vendor imports** (`@vendemas/caja-mobile`) - **Alternative**
3. **Relative imports** (`../services/auth.service`) - **Last resort**

#### **Example Implementation**

```typescript
// ✅ Preferred - Short import
import { AuthService } from '@shared-auth';

// ✅ Alternative - Full vendor import
import { AuthService } from '@vendemas/shared-auth';

// ❌ Avoid - Relative import (unless very local)
import { AuthService } from '../services/auth.service';
```

### **2. Import Organization**

#### **Import Statement Ordering**

```typescript
// 1. External libraries
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// 2. Shared libraries (short imports)
import { Button } from '@shared-ui';
import { Product } from '@shared-types';

// 3. App-specific imports
import { DashboardService } from '@negocio-web';
import { AuthGuard } from '@shared-auth';

// 4. Relative imports (if necessary)
import { LocalService } from './local.service';
```

### **3. Barrel Exports**

#### **Library Index Files**

```typescript
// libs/vendemas-shared-ui/src/index.ts
export { Button } from './components/button/button.component';
export { Card } from './components/card/card.component';
export { Input } from './components/input/input.component';
export { Modal } from './components/modal/modal.component';

// Re-export types
export type { ButtonProps, CardProps } from './types';
```

#### **App Index Files**

```typescript
// apps/vendemas-negocio-web/src/index.ts
export { App } from './app/app';
export { appConfig } from './app/app.config';
export { appRoutes } from './app/app.routes';

// Export key services and components
export { DashboardService } from './services/dashboard.service';
export { BusinessMetrics } from './components/business-metrics';
```

## Migration Guide

### **1. Updating Existing Imports**

#### **Before (Legacy)**

```typescript
import { Button } from '@vendemas/shared-ui';
import { Product } from '@vendemas/shared-types';
import { AuthService } from '@vendemas/shared-auth';
```

#### **After (Short Imports)**

```typescript
import { Button } from '@shared-ui';
import { Product } from '@shared-types';
import { AuthService } from '@shared-auth';
```

### **2. Bulk Import Updates**

#### **Using Search and Replace**

```bash
# Find and replace in your codebase
find . -name "*.ts" -exec sed -i '' 's/@vendemas\/shared-ui/@shared-ui/g' {} \;
find . -name "*.ts" -exec sed -i '' 's/@vendemas\/shared-types/@shared-types/g' {} \;
find . -name "*.ts" -exec sed -i '' 's/@vendemas\/shared-auth/@shared-auth/g' {} \;
```

#### **Using VS Code/Cursor**

1. **Ctrl+Shift+H** (Find and Replace)
2. **Find**: `@vendemas/shared-ui`
3. **Replace**: `@shared-ui`
4. **Replace All**

### **3. Validation**

#### **Check for Broken Imports**

```bash
# TypeScript compilation check
nx build vendemas-{app-name}

# Linting check
nx lint vendemas-{app-name}

# Type checking
nx type-check vendemas-{app-name}
```

## IDE Configuration

### **1. VS Code/Cursor Settings**

#### **tsconfig.json Paths**

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.paths": true,
  "typescript.preferences.includePackageJsonAutoImports": "auto"
}
```

#### **Path IntelliSense Extension**

```json
{
  "path-intellisense.mappings": {
    "@caja-mobile": "${workspaceFolder}/apps/vendemas-caja-mobile/src",
    "@negocio-web": "${workspaceFolder}/apps/vendemas-negocio-web/src",
    "@shared-ui": "${workspaceFolder}/libs/vendemas-shared-ui/src",
    "@shared-types": "${workspaceFolder}/libs/vendemas-shared-types/src"
  }
}
```

### **2. WebStorm/IntelliJ Configuration**

#### **Module Resolution**

- **File** → **Project Structure** → **Modules**
- Add source folders for each app and lib
- Configure module dependencies

## Troubleshooting

### **1. Common Issues**

#### **Module Resolution Errors**

```bash
# Error: Cannot find module '@shared-ui'
# Solution: Check tsconfig.base.json paths and ensure index.ts exists
```

#### **Circular Dependencies**

```typescript
// ❌ Avoid circular imports
// lib-a imports from lib-b, lib-b imports from lib-a

// ✅ Use dependency injection or shared interfaces
import { SharedInterface } from '@shared-types';
```

### **2. Debugging Import Issues**

#### **Check Path Resolution**

```bash
# Verify TypeScript can resolve paths
npx tsc --noEmit --listFiles

# Check specific path resolution
npx tsc --noEmit --traceResolution
```

#### **Validate Configuration**

```bash
# Check Nx project graph
nx graph

# Verify project dependencies
nx show project vendemas-{app-name}
```

## Future Enhancements

### **1. Automated Import Management**

#### **Schematic for Import Updates**

```bash
# Future: Automated import path updates
nx g @vendemas/schematic:update-imports --from=legacy --to=short
```

#### **Import Path Validation**

```bash
# Future: Validate import paths in CI/CD
nx validate-imports
```

### **2. Advanced Path Features**

#### **Dynamic Path Resolution**

```typescript
// Future: Runtime path resolution
import { getModulePath } from '@shared-utils';
const modulePath = getModulePath('@shared-ui');
```

#### **Conditional Imports**

```typescript
// Future: Environment-based imports
import { Button } from process.env.NODE_ENV === 'development'
  ? '@shared-ui/dev'
  : '@shared-ui/prod';
```

## Summary

The import path configuration provides:

1. **🎯 Short, intuitive imports** for better developer experience
2. **🔄 Backward compatibility** with existing full vendor imports
3. **📚 Clear organization** of apps and libraries
4. **🔧 Easy migration** from legacy import patterns
5. **⚡ Performance optimization** through proper path resolution

### **Key Benefits**

- **Cleaner code** with shorter import statements
- **Better IntelliSense** and autocomplete
- **Easier refactoring** and maintenance
- **Consistent patterns** across the monorepo
- **Future-proof architecture** for schematic automation

---

_This configuration ensures optimal developer experience while maintaining flexibility and backward compatibility._
