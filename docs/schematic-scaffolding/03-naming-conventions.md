# Naming Conventions

## Project Naming Pattern: `<product-name>-<role>-<platform>`

### **Role-Based Naming**

#### **Core Business Roles**

- `caja` = Staff/POS operators (cashiers, sales staff)
- `negocio` = Business owners and managers (business dashboard)
- `admin` = System administrators and super users
- `website` = Marketing and public-facing content

#### **Specialized Roles**

- `vendor` = Vendor management and onboarding
- `customer` = Customer-facing applications
- `analytics` = Business intelligence and reporting
- `api` = Backend API services

### **Platform Abbreviations**

#### **Application Types**

- `mobile` = Mobile applications (Ionic/Capacitor, React Native)
- `web` = Web applications (PWA, SSR, SPA)
- `api` = Backend API services
- `cli` = Command-line tools

#### **Technology Specific**

- `ionic` = Ionic/Capacitor mobile apps
- `react-native` = React Native mobile apps
- `next` = Next.js applications
- `angular` = Angular applications

## Application Naming Examples

### **Implemented Applications**

```
vendemas-caja-mobile        # Staff mobile app (Angular v20 + Ionic) - IMPLEMENTED
vendemas-negocio-web        # Business dashboard (Angular PWA) - IMPLEMENTED
vendemas-landing-web        # Marketing website (Next.js SSR) - IMPLEMENTED
```

### **Planned Applications**

```
vendemas-admin-web          # Admin web dashboard (Angular PWA)
vendemas-vendor-mobile      # Vendor onboarding app (Ionic)
vendemas-customer-web       # Customer portal (Next.js)
vendemas-analytics-web      # Business intelligence dashboard (Angular)
```

### **Future Applications**

```
vendemas-caja-ionic         # Staff mobile app (Ionic/Capacitor)
vendemas-vendor-web         # Vendor management portal (Angular)
vendemas-api-gateway        # API gateway service (NestJS)
vendemas-cli-tools          # Development CLI tools (Node.js)
```

## Library Naming Pattern: `<product-name>-shared-<domain>`

### **Shared Library Domains**

#### **Core Infrastructure**

```
vendemas-shared-types       # Shared TypeScript types and interfaces
vendemas-shared-constants   # Application constants and configuration
vendemas-shared-utils       # Utility functions and helpers
vendemas-shared-errors      # Error handling and custom error types
```

#### **UI & Design**

```
vendemas-shared-ui          # Reusable UI components
vendemas-shared-styles      # Design system and shared styles - IMPLEMENTED
vendemas-shared-icons       # Icon library and icon components
vendemas-shared-animations  # Animation utilities and components
```

#### **Business Logic**

```
vendemas-shared-auth        # Authentication and authorization
vendemas-shared-api         # API client utilities and interfaces
vendemas-shared-commerce    # Commerce-specific business logic
vendemas-shared-location    # Location and geolocation services
```

#### **Data & State**

```
vendemas-shared-storage     # Local storage and caching
vendemas-shared-validation  # Form validation and data validation
vendemas-shared-forms       # Form components and utilities
vendemas-shared-tables      # Data table components and utilities
```

### **Library Implementation Status**

#### **Implemented Libraries**

- ✅ `vendemas-shared-styles` - Design system and shared styles
- ✅ `vendemas-shared-i18n` - Internationalization utilities

#### **Planned Libraries**

- [ ] `vendemas-shared-types` - Shared TypeScript types
- [ ] `vendemas-shared-ui` - Reusable UI components
- [ ] `vendemas-shared-auth` - Authentication utilities
- [ ] `vendemas-shared-api` - API client utilities

## Directory Structure

### **Monorepo Organization**

```
ubro-apps-org/
├── apps/                           # Application projects
│   ├── vendemas-caja-mobile/       # Staff mobile app
│   ├── vendemas-negocio-web/       # Business dashboard
│   ├── vendemas-landing-web/       # Marketing website
│   └── vendemas-admin-web/         # Admin dashboard
├── libs/                           # Shared libraries
│   ├── vendemas-shared-styles/     # Design system
│   ├── vendemas-shared-types/      # Type definitions
│   ├── vendemas-shared-ui/         # UI components
│   └── vendemas-shared-auth/       # Authentication
├── tools/                          # Development tools
├── docs/                           # Documentation
└── e2e/                           # End-to-end tests
```

### **Application Structure**

```
vendemas-{role}-{platform}/
├── src/                           # Source code
│   ├── app/                       # Application components
│   ├── components/                # Reusable components
│   ├── services/                  # Business logic services
│   ├── models/                    # Data models
│   ├── utils/                     # Utility functions
│   └── assets/                    # Static assets
├── public/                        # Public assets
├── project.json                   # Nx project configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies
```

### **Library Structure**

```
vendemas-shared-{domain}/
├── src/                           # Source code
│   ├── index.ts                   # Public API exports
│   ├── lib/                       # Library implementation
│   ├── types/                     # Type definitions
│   └── utils/                     # Utility functions
├── project.json                   # Nx project configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies
```

## Import Path Conventions

### **Application Imports**

```typescript
// App-specific imports
import { CajaService } from '@vendemas/caja-mobile';
import { NegocioService } from '@vendemas/negocio-web';
import { AdminService } from '@vendemas/admin-web';
import { WebsiteService } from '@vendemas/landing-web';
```

### **Library Imports**

```typescript
// Shared library imports
import { Product } from '@vendemas/shared-types';
import { Button } from '@vendemas/shared-ui';
import { AuthService } from '@vendemas/shared-auth';
import { ApiClient } from '@vendemas/shared-api';
```

### **Relative Imports**

```typescript
// Within the same project
import { ProductService } from '../services/product.service';
import { ProductModel } from '../models/product.model';
import { ProductUtils } from '../utils/product.utils';
```

## File Naming Conventions

### **Component Files**

```
component-name.component.ts          # Angular components
component-name.component.html       # Component templates
component-name.component.scss       # Component styles
component-name.component.spec.ts    # Component tests
```

### **Service Files**

```
service-name.service.ts             # Angular services
service-name.service.spec.ts        # Service tests
```

### **Model Files**

```
model-name.model.ts                 # Data models
model-name.interface.ts             # TypeScript interfaces
model-name.type.ts                  # TypeScript types
```

### **Utility Files**

```
utility-name.util.ts                # Utility functions
utility-name.helper.ts              # Helper functions
utility-name.constants.ts           # Constant values
```

## Naming Best Practices

### **Do's**

- ✅ Use descriptive, meaningful names
- ✅ Follow consistent patterns across projects
- ✅ Use kebab-case for file and folder names
- ✅ Use PascalCase for class and interface names
- ✅ Use camelCase for variables and functions
- ✅ Include the domain/context in names

### **Don'ts**

- ❌ Use abbreviations unless universally understood
- ❌ Use generic names like "utils" or "helpers"
- ❌ Mix naming conventions within the same project
- ❌ Use numbers or dates in names unless necessary
- ❌ Use special characters or spaces

### **Examples**

#### **Good Names**

```
vendemas-caja-mobile              # Clear role and platform
vendemas-shared-styles            # Clear domain and purpose
product-catalog.component.ts      # Descriptive component name
sales-analytics.service.ts        # Clear service purpose
```

#### **Bad Names**

```
vendemas-app                     # Too generic
vendemas-stuff                   # Unclear purpose
comp.ts                          # Abbreviated
service.ts                       # Generic name
```

## Migration Guidelines

### **When to Rename**

- **Breaking Changes**: Major architectural changes
- **Clarity Improvement**: Names that are unclear or misleading
- **Consistency**: Names that don't follow established patterns
- **Domain Alignment**: Names that don't reflect current business domains

### **Renaming Process**

1. **Plan**: Document the current and target names
2. **Communicate**: Notify team members of the change
3. **Execute**: Use Nx rename commands when possible
4. **Update**: Update all references and documentation
5. **Test**: Verify that everything still works
6. **Deploy**: Deploy the changes

### **Automation Opportunities**

- **Nx Commands**: Use `nx g @nx/workspace:move` for project renames
- **Scripts**: Create scripts for bulk file renames
- **Search & Replace**: Use IDE tools for systematic replacements
- **Validation**: Create tests to ensure naming consistency

---

_These naming conventions ensure consistency, clarity, and maintainability across the entire VendeMás ecosystem._
