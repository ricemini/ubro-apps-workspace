# Naming Conventions

## Overview

Vendemás follows the Nx best practice naming convention: **`product + role + platform`**

## App Naming Convention

### Pattern: `vendemas-{role}-{platform}`

| App Name               | Role                  | Platform | Technology      | Purpose                       |
| ---------------------- | --------------------- | -------- | --------------- | ----------------------------- |
| `vendemas-caja-mobile` | `caja` (staff)        | `mobile` | Ionic/Capacitor | Staff POS and operations      |
| `vendemas-admin-web`   | `admin` (management)  | `web`    | Angular PWA     | Business management dashboard |
| `vendemas-website`     | `website` (marketing) | `web`    | Next.js SSR     | Marketing and public site     |

### Role Definitions

- **`caja`**: Staff/POS operators (cashiers, sales staff, inventory managers)
- **`admin`**: Business owners and managers (analytics, reporting, settings)
- **`website`**: Marketing and public-facing content (landing pages, SEO)

### Platform Definitions

- **`mobile`**: Mobile applications (Ionic/Capacitor, React Native)
- **`web`**: Web applications (PWA, SSR, SPA)

## Library Naming Convention

### Pattern: `vendemas-shared-{domain}`

| Library Name                | Domain      | Purpose                                |
| --------------------------- | ----------- | -------------------------------------- |
| `vendemas-shared-types`     | `types`     | Shared TypeScript types and interfaces |
| `vendemas-shared-auth`      | `auth`      | Authentication and authorization       |
| `vendemas-shared-ui`        | `ui`        | Reusable UI components                 |
| `vendemas-shared-utils`     | `utils`     | Utility functions and helpers          |
| `vendemas-shared-api`       | `api`       | API client utilities                   |
| `vendemas-shared-constants` | `constants` | Shared constants and configuration     |

## Import Paths

### App Imports

```typescript
// App-specific imports
import { CajaService } from '@vendemas/caja-mobile';
import { AdminService } from '@vendemas/admin-web';
import { WebsiteService } from '@vendemas/website';
```

### Library Imports

```typescript
// Shared library imports
import { Product } from '@vendemas/shared-types';
import { AuthService } from '@vendemas/shared-auth';
import { Button } from '@vendemas/shared-ui';
```

## Directory Structure

```
apps/
├── vendemas-caja-mobile/    # Staff mobile app (Ionic/Capacitor)
├── vendemas-admin-web/      # Admin web dashboard (Angular PWA)
└── vendemas-website/        # Marketing website (Next.js SSR)

libs/
├── vendemas-shared-types/   # Shared TypeScript types
├── vendemas-shared-auth/    # Authentication utilities
├── vendemas-shared-ui/      # UI components
├── vendemas-shared-utils/   # Utility functions
├── vendemas-shared-api/     # API client utilities
└── vendemas-shared-constants/ # Shared constants
```

## Nx Generator Commands

### Creating Apps

```bash
# Staff mobile app
nx generate @nx/angular:app vendemas-caja-mobile

# Admin web dashboard
nx generate @nx/angular:app vendemas-admin-web

# Marketing website
nx generate @nx/next:app vendemas-website
```

### Creating Libraries

```bash
# Shared libraries
nx generate @nx/js:lib vendemas-shared-types
nx generate @nx/js:lib vendemas-shared-auth
nx generate @nx/js:lib vendemas-shared-ui
nx generate @nx/js:lib vendemas-shared-utils
nx generate @nx/js:lib vendemas-shared-api
nx generate @nx/js:lib vendemas-shared-constants
```

## Benefits

1. **Role Clarity**: Names clearly indicate the user role and purpose
2. **Platform Specificity**: Distinguishes between mobile and web platforms
3. **Business Focus**: Reflects actual business use cases
4. **Scalability**: Easy to add new roles or platforms
5. **Consistency**: Follows Nx best practices

## Future Extensions

### Additional Roles

- `vendemas-accountant-web` - Accounting and financial management
- `vendemas-manager-mobile` - Manager mobile app
- `vendemas-owner-web` - Owner-specific dashboard

### Additional Platforms

- `vendemas-caja-tablet` - Tablet-specific staff app
- `vendemas-admin-desktop` - Desktop admin application
