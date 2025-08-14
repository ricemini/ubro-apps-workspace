# Hybrid Strategy Reference: Manual Setup + Schematic Blueprint

## Strategy Overview

**Approach**: Manual configuration for immediate value + comprehensive documentation for future schematic creation

**Package Manager**: pnpm workspaces (migrated from npm for better performance and dependency management)

**Timeline**:

- Week 1-2: Manual setup with documentation
- Week 3: Schematic blueprint creation
- Future: Schematic development based on real experience

## Application Context: Vendemás

### Mission

Empower street vendors and micro-retail microbusinesses in Mexico and LATAM to sell more with less friction—by giving them a fast, offline-friendly, mobile toolkit for QR/barcode checkout, live location, simple promos, and clear daily sales insights.

### Vision

Become the default mobile operating system for informal commerce in LATAM, where any puesto/tiendita can accept payments, manage inventory, broadcast its location, run promotions, and understand its business—regardless of device, connectivity, or technical skills.

### Product Description

Vendemás (system name: Vendemas) is a mobile-first sales toolkit built with Angular + Ionic + Capacitor (one codebase → Android/iOS + PWA dashboard). It's offline-first (local SQLite + sync queue) and integrates with Firebase (Auth, Cloud Messaging, Hosting) and a pluggable backend (start with Cloud Functions; upgradeable to NestJS + PostgreSQL).

### Core Modules

- **POS with QR/Barcode** (ML Kit) for instant checkout and inventory updates
- **Catalog & Inventory** with low-stock alerts
- **Location Broadcast** (opt-in GPS pin for customers to find the stand)
- **Promotions & Notifications** (push + shareable cards/links)
- **Sales Analytics** (daily totals, top items, trends)
- **Customer Ledger** (optional tabs/fiado tracking)
- **Roles & Devices** (owner + collaborators; multi-device sync)
- **PWA Web Dashboard** for reporting and bulk edits

### Technical Stack

- **Frontend**: Angular + Ionic + Capacitor
- **Backend**: Firebase (Auth, Cloud Messaging, Hosting) + Cloud Functions
- **Database**: Local SQLite + Firebase Firestore
- **Offline**: Sync queue for offline-first experience
- **Mobile**: Android/iOS native apps + PWA dashboard

### Market Focus

- **Primary Market**: MX/LATAM (MXN currency, Spanish UX, low-end Android support)
- **Key Features**: QR/barcode scanning, geolocation, push notifications, offline sync
- **Non-goals**: Heavy accounting/ERP, complex loyalty systems, multi-warehouse

## Naming Convention: `<product-name>-<tech>-<functionality>`

### Technology Abbreviations

- `ng` = Angular
- `nx` = Next.js
- `rn` = React Native
- `vue` = Vue.js

### App Naming Pattern

```
vendemas-ng-mobile      # Main mobile app (retail + POS)
vendemas-nx-dashboard   # Business analytics dashboard
vendemas-ng-admin       # Admin panel for business owners
vendemas-nx-landing     # Marketing landing page
vendemas-ng-pos         # Dedicated POS app (if needed)
vendemas-nx-analytics   # Advanced analytics (if needed)
```

### Library Naming Pattern

```
vendemas-shared-types        # Shared TypeScript types
vendemas-shared-auth         # Authentication utilities
vendemas-shared-ui           # UI components
vendemas-shared-utils        # Utility functions
vendemas-shared-api          # API client utilities
vendemas-shared-constants    # Shared constants
```

### Directory Structure

```
apps/
├── vendemas-ng-mobile/      # Main mobile app
├── vendemas-nx-dashboard/   # Business dashboard
├── vendemas-ng-admin/       # Admin interface
└── vendemas-nx-landing/     # Marketing site
```

libs/
├── vendemas-shared-types/ # Shared TypeScript types
├── vendemas-shared-auth/ # Authentication utilities
├── vendemas-shared-ui/ # UI components
├── vendemas-shared-utils/ # Utility functions
├── vendemas-shared-api/ # API client utilities
└── vendemas-shared-constants/ # Shared constants

````

### Import Paths

```typescript
// Clean, descriptive imports
import { Product } from '@vendemas/shared-types';
import { AuthService } from '@vendemas/shared-auth';
import { Button } from '@vendemas/shared-ui';

// App-specific imports
import { RetailService } from '@vendemas/ng-mobile';
import { DashboardService } from '@vendemas/nx-dashboard';
````

## Core Variables Template

```
PRODUCT_NAME: vendemas
ORG_TS_IMPORT_PREFIX: @vendemas
DEFAULT_NODE_VERSION: 20

# For future dual-app setup
NEXT_APP_NAME: vendemas-nx-dashboard
ANG_APP_NAME: vendemas-ng-mobile
MAIN_DOMAIN: vendemas.com (or your domain)
SUBDOMAIN: app.vendemas.com
FIREBASE_PROJECT_PROD: vendemas-prod
FIREBASE_PROJECT_DEV: vendemas-dev
```

## Quality Foundation Setup (Current Focus)

### Mission

Create world-class foundation with enterprise-grade quality tools:

- Strict ESLint with Nx boundaries, TypeScript rules, and import sorting
- Prettier with consistent formatting rules
- Husky + lint-staged for pre-commit hooks
- Commitlint for conventional commits
- Nx boundaries and tags enforcement
- TypeScript strict mode with path mapping
- Shared configuration (.editorconfig, VSCode settings)
- Documentation structure

### Implementation Phases

1. **Phase A**: Repo Analysis
2. **Phase B**: Node & Package Manager Setup
3. **Phase C**: TypeScript & Path Mapping
4. **Phase D**: ESLint Configuration with Performance
5. **Phase E**: Prettier & Formatting
6. **Phase F**: Git Hooks & Commit Standards
7. **Phase G**: Editor Configuration
8. **Phase H**: Nx Boundaries & Tags
9. **Phase I**: Performance Optimizations
10. **Phase J**: Team Setup & Automation
11. **Phase K**: Documentation Structure

### Required Dependencies (Validated Versions)

```json
{
  "@nx/eslint": "21.3.11",
  "@typescript-eslint/eslint-plugin": "8.39.1",
  "@typescript-eslint/parser": "8.39.1",
  "@eslint/js": "9.33.0",
  "eslint": "9.33.0",
  "eslint-config-prettier": "10.1.8",
  "eslint-plugin-import": "2.32.0",
  "eslint-plugin-jsx-a11y": "6.10.2",
  "eslint-plugin-n": "17.21.3",
  "eslint-plugin-prettier": "5.5.4",
  "prettier": "3.6.2",
  "husky": "9.1.7",
  "lint-staged": "16.1.5",
  "@commitlint/cli": "19.8.1",
  "@commitlint/config-conventional": "19.8.1"
}
```

### Key Configuration Files (Validated)

- `eslint.config.js` (ESLint v9 flat config with performance optimizations)
- `.prettierrc` (Prettier v3 configuration)
- `.editorconfig` (Editor consistency)
- `.husky/pre-commit` (Git hooks)
- `.husky/commit-msg` (Commit validation)
- `.lintstagedrc.js` (Pre-commit automation)
- `.commitlintrc.js` (Conventional commits)
- `.npmrc` (pnpm configuration)
- `.vscode/settings.json` (VSCode workspace settings)
- `.vscode/extensions.json` (Recommended extensions)

### Package.json Scripts (Validated)

```json
{
  "scripts": {
    "lint": "nx lint",
    "lint:fix": "nx lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "nx typecheck",
    "prepare": "husky install",
    "verify": "npm run lint && npm run format:check && npm run typecheck",
    "clean": "nx reset && rm -rf .eslintcache"
  }
}
```

### Actual Configuration Files (For Schematic Templates)

#### `eslint.config.js` (ESLint v9 Flat Config)

```javascript
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'error',
    },
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      '.next/',
      '.nuxt/',
      'coverage/',
      '*.min.js',
      '.pnpm-store/',
      '.nx/',
    ],
  },
  prettier,
];
```

#### `.prettierrc` (Prettier v3)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

#### `.prettierignore`

```gitignore
node_modules/
dist/
build/
.next/
.nuxt/
coverage/
*.min.js
pnpm-lock.yaml
package-lock.json
yarn.lock
.eslintcache
.nx/
.pnpm-store/
```

#### `.editorconfig`

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.{js,jsx,ts,tsx,json,md}]
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false
```

#### `.husky/pre-commit`

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

#### `.husky/commit-msg`

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit $1
```

#### `.lintstagedrc.js`

```javascript
export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,yml,yaml}': ['prettier --write'],
};
```

#### `.commitlintrc.js`

```javascript
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'perf',
        'ci',
        'build',
        'revert',
      ],
    ],
  },
};
```

#### `.npmrc` (pnpm Configuration)

```ini
# pnpm configuration
save-exact=true
package-lock=false
auto-install-peers=true
strict-peer-dependencies=false
shamefully-hoist=false
prefer-frozen-lockfile=true

# Security
audit=false
fund=false

# Performance
cache-dir=.pnpm-store
```

#### `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "files.eol": "\n",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "eslint.workingDirectories": ["."],
  "eslint.validate": ["javascript", "typescript"]
}
```

#### `.vscode/extensions.json`

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

#### `tsconfig.base.json` (Updated with Path Mapping)

```json
{
  "compilerOptions": {
    "composite": true,
    "declarationMap": true,
    "emitDeclarationOnly": true,
    "importHelpers": true,
    "isolatedModules": true,
    "lib": ["es2022"],
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "noEmitOnError": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "es2022",
    "customConditions": ["development"],
    "baseUrl": ".",
    "paths": {
      "@vendemas/*": ["libs/*"],
      "@vendemas/mobile/*": ["apps/vendemas-mobile/*"],
      "@vendemas/dashboard/*": ["apps/vendemas-dashboard/*"]
    }
  }
}
```

#### `package.json` (Root Configuration)

```json
{
  "name": "@vendemas/root",
  "version": "0.0.0",
  "license": "MIT",
  "private": true,
  "type": "module",
  "scripts": {
    "lint": "nx lint",
    "lint:fix": "nx lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "nx typecheck",
    "prepare": "husky install",
    "verify": "npm run lint && npm run format:check && npm run typecheck",
    "clean": "nx reset && rm -rf .eslintcache"
  },
  "devDependencies": {
    "@nx/eslint": "21.3.11",
    "@typescript-eslint/eslint-plugin": "8.39.1",
    "@typescript-eslint/parser": "8.39.1",
    "@eslint/js": "9.33.0",
    "eslint": "9.33.0",
    "eslint-config-prettier": "10.1.8",
    "eslint-plugin-import": "2.32.0",
    "eslint-plugin-jsx-a11y": "6.10.2",
    "eslint-plugin-n": "17.21.3",
    "eslint-plugin-prettier": "5.5.4",
    "prettier": "3.6.2",
    "husky": "9.1.7",
    "lint-staged": "16.1.5",
    "@commitlint/cli": "19.8.1",
    "@commitlint/config-conventional": "19.8.1"
  }
}
```

#### `pnpm-workspace.yaml`

```yaml
packages:
  - 'apps/*'
  - 'libs/*'
  - 'packages/*'
```

## Implementation Steps (Validated)

### Step 1: Install Dependencies

```bash
# Install ESLint dependencies
pnpm add -D -w @nx/eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-n eslint-plugin-prettier

# Install Husky and commit tools
pnpm add -D -w husky lint-staged @commitlint/cli @commitlint/config-conventional

# Install ESLint v9 core
pnpm add -D -w @eslint/js

# Update Prettier to v3
pnpm add -D -w prettier@latest
```

### Step 2: Create Configuration Files

1. Create `eslint.config.js` (ESLint v9 flat config)
2. Create `.prettierrc` (Prettier v3 configuration)
3. Create `.prettierignore` (Ignore patterns)
4. Create `.editorconfig` (Editor consistency)
5. Create `.npmrc` (pnpm configuration)
6. Create `.vscode/settings.json` (VSCode workspace settings)
7. Create `.vscode/extensions.json` (Recommended extensions)

### Step 3: Setup Git Hooks

```bash
# Initialize Husky
pnpm dlx husky init

# Update pre-commit hook
echo "npx lint-staged" > .husky/pre-commit

# Create commit-msg hook
echo '#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit $1' > .husky/commit-msg

# Make commit-msg executable
chmod +x .husky/commit-msg
```

### Step 4: Update TypeScript Configuration

- Update `tsconfig.base.json` with path mapping
- Add `"type": "module"` to `package.json`

### Step 5: Update Package Scripts

- Add quality tool scripts to `package.json`
- Remove `"prepare": "husky"` and add `"prepare": "husky install"`

## Success Verification

Run these commands to verify setup:

```bash
# Format code
pnpm run format

# Check formatting
pnpm run format:check

# Test ESLint
npx eslint eslint.config.js .lintstagedrc.js .commitlintrc.js

# Test git hooks
git add .
git commit -m "feat: configure quality tools for Vendemás"

# Verify all tools work
pnpm run verify
```

## Validation Checklist

### Pre-Implementation

- [ ] pnpm workspace configured
- [ ] Node.js v20+ installed
- [ ] Git repository initialized

### Post-Implementation

- [ ] ESLint v9 flat config working
- [ ] Prettier v3 formatting correctly
- [ ] Husky pre-commit hooks working
- [ ] Commitlint validation working
- [ ] TypeScript path mapping resolving
- [ ] VSCode settings applied
- [ ] All scripts working (`pnpm run verify`)
- [ ] Git commit with conventional format succeeds

### Performance Validation

- [ ] ESLint runs in under 5 seconds
- [ ] Prettier formats files quickly
- [ ] pnpm install is 2-3x faster than npm
- [ ] Git hooks don't significantly slow commits

### Mobile Development Validation

- [ ] TypeScript strict mode enabled
- [ ] Path mapping works for mobile imports
- [ ] ESLint catches mobile-specific issues
- [ ] Prettier handles mobile code formatting

## Schematic Blueprint for Quality Tools

### Input Schema

```typescript
interface QualityToolsSchema {
  // Core Configuration
  productName: string;
  orgTsImportPrefix: string;
  defaultNodeVersion: number;

  // Package Manager
  usePnpm: boolean;

  // Quality Tools
  includeEslint: boolean;
  includePrettier: boolean;
  includeHusky: boolean;
  includeCommitlint: boolean;

  // Editor Configuration
  includeVscode: boolean;
  includeEditorconfig: boolean;

  // TypeScript Configuration
  strictMode: boolean;
  pathMapping: boolean;
}
```

### File Generation Matrix

| File                      | Template | Variables           | Dependencies |
| ------------------------- | -------- | ------------------- | ------------ |
| `eslint.config.js`        | Complex  | `orgTsImportPrefix` | package.json |
| `.prettierrc`             | Static   | -                   | -            |
| `.prettierignore`         | Static   | -                   | -            |
| `.editorconfig`           | Static   | -                   | -            |
| `.husky/pre-commit`       | Static   | -                   | husky        |
| `.husky/commit-msg`       | Static   | -                   | husky        |
| `.lintstagedrc.js`        | Static   | -                   | -            |
| `.commitlintrc.js`        | Static   | -                   | -            |
| `.npmrc`                  | Static   | -                   | -            |
| `.vscode/settings.json`   | Static   | -                   | -            |
| `.vscode/extensions.json` | Static   | -                   | -            |
| `tsconfig.base.json`      | Complex  | `orgTsImportPrefix` | -            |
| `package.json`            | Complex  | All                 | -            |
| `pnpm-workspace.yaml`     | Static   | -                   | -            |

### Conditional Logic

- If `usePnpm`: Use pnpm workspace configuration
- If `includeEslint`: Install ESLint dependencies and create config
- If `includePrettier`: Install Prettier and create config
- If `includeHusky`: Install Husky and setup git hooks
- If `includeCommitlint`: Install commitlint and create config
- If `includeVscode`: Create VSCode workspace settings
- If `includeEditorconfig`: Create .editorconfig
- If `strictMode`: Enable TypeScript strict mode
- If `pathMapping`: Add path mapping to tsconfig.base.json

### Dependencies to Install

```json
{
  "devDependencies": {
    "@nx/eslint": "21.3.11",
    "@typescript-eslint/eslint-plugin": "8.39.1",
    "@typescript-eslint/parser": "8.39.1",
    "@eslint/js": "9.33.0",
    "eslint": "9.33.0",
    "eslint-config-prettier": "10.1.8",
    "eslint-plugin-import": "2.32.0",
    "eslint-plugin-jsx-a11y": "6.10.2",
    "eslint-plugin-n": "17.21.3",
    "eslint-plugin-prettier": "5.5.4",
    "prettier": "3.6.2",
    "husky": "9.1.7",
    "lint-staged": "16.1.5",
    "@commitlint/cli": "19.8.1",
    "@commitlint/config-conventional": "19.8.1"
  }
}
```

### Validation Commands

```bash
# Verify all tools work
pnpm run verify

# Test git hooks
git commit -m "feat: test quality tools"

# Performance check
time pnpm run lint
time pnpm run format:check
```

## App Creation Schematic Blueprint

### App Naming Convention

**Pattern**: `<product-name>-<tech>-<functionality>`

**Technology Abbreviations:**

- `ng` = Angular
- `nx` = Next.js
- `rn` = React Native
- `vue` = Vue.js

**Examples:**

```
vendemas-ng-mobile      # Main mobile app (retail + POS)
vendemas-nx-dashboard   # Business analytics dashboard
vendemas-ng-admin       # Admin panel for business owners
vendemas-nx-landing     # Marketing landing page
vendemas-ng-pos         # Dedicated POS app (if needed)
vendemas-nx-analytics   # Advanced analytics (if needed)
```

### App Creation Input Schema

```typescript
interface AppCreationSchema {
  // Core Configuration
  productName: string; // e.g., "vendemas"
  technology: 'ng' | 'nx' | 'rn' | 'vue';
  functionality: string; // e.g., "mobile", "dashboard", "admin"

  // App Configuration
  appName: string; // Auto-generated: `${productName}-${technology}-${functionality}`
  routing: boolean;
  testing: boolean;
  e2e: boolean;

  // Technology-Specific
  ng?: {
    standalone: boolean;
    material: boolean;
    ionic: boolean;
    capacitor: boolean;
  };

  nx?: {
    appRouter: boolean;
    typescript: boolean;
    tailwind: boolean;
  };

  // Features
  features: {
    auth: boolean;
    offline: boolean;
    pushNotifications: boolean;
    analytics: boolean;
  };
}
```

### App Creation File Generation Matrix

| File                                 | Template | Variables         | Dependencies |
| ------------------------------------ | -------- | ----------------- | ------------ |
| `apps/{{appName}}/package.json`      | Complex  | All app vars      | -            |
| `apps/{{appName}}/project.json`      | Complex  | App-specific vars | -            |
| `apps/{{appName}}/tsconfig.json`     | Complex  | Path mapping      | -            |
| `apps/{{appName}}/src/main.ts`       | Complex  | App-specific vars | -            |
| `apps/{{appName}}/src/app/`          | Complex  | App structure     | -            |
| `apps/{{appName}}/src/styles/`       | Complex  | Styling setup     | -            |
| `apps/{{appName}}/src/assets/`       | Static   | -                 | -            |
| `apps/{{appName}}/src/environments/` | Complex  | Environment vars  | -            |

### App Creation Conditional Logic

- If `technology === 'ng'`:
  - Create Angular app structure
  - If `ng.standalone`: Use standalone components
  - If `ng.material`: Add Angular Material
  - If `ng.ionic`: Add Ionic framework
  - If `ng.capacitor`: Add Capacitor for mobile

- If `technology === 'nx'`:
  - Create Next.js app structure
  - If `nx.appRouter`: Use App Router
  - If `nx.typescript`: Enable TypeScript
  - If `nx.tailwind`: Add Tailwind CSS

- If `features.auth`: Add authentication setup
- If `features.offline`: Add offline-first configuration
- If `features.pushNotifications`: Add push notification setup
- If `features.analytics`: Add analytics configuration

### App Creation Dependencies

```json
{
  "ng": {
    "@angular/core": "^20.0.0",
    "@angular/common": "^20.0.0",
    "@angular/router": "^20.0.0",
    "@angular/platform-browser": "^20.0.0",
    "@angular/platform-browser-dynamic": "^20.0.0",
    "@angular/compiler": "^20.0.0",
    "@angular/forms": "^20.0.0",
    "@angular/material": "^20.0.0",
    "@ionic/angular": "^8.0.0",
    "@capacitor/core": "^6.0.0"
  },
  "nx": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "tailwindcss": "^3.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0"
  }
}
```

### App Creation Validation Commands

```bash
# Build the app
nx build {{appName}}

# Test the app
nx test {{appName}}

# Lint the app
nx lint {{appName}}

# E2E test (if configured)
nx e2e {{appName}}-e2e

# Serve the app
nx serve {{appName}}
```

## Future Dual-App Setup (Schematic Blueprint)

### Mission

Two apps optimized for Vendemás requirements:

- **vendemas-dashboard**: PWA Web Dashboard (Next.js + SSR for SEO)
- **vendemas-mobile**: Mobile App (Angular + Ionic + Capacitor)
- Shared BFF authentication (Firebase Functions)
- Offline-first architecture with sync queue
- Shared libraries (auth-shared, types, offline-sync)
- Multi-environment deployment (DEV/PROD)
- CI/CD with nx affected commands
- Mobile-optimized for low-end Android devices

### Schematic Input Schema (Future)

```typescript
interface ProductScaffoldSchema {
  // Core Configuration
  productName: string;
  orgName: string;
  orgTsImportPrefix: string;
  defaultNodeVersion: number;

  // App Configuration
  includeNextJs: boolean;
  includeAngular: boolean;
  nextAppName?: string; // e.g., "vendemas-nx-dashboard"
  angularAppName?: string; // e.g., "vendemas-ng-mobile"

  // Domain Configuration
  mainDomain?: string;
  subdomain?: string;

  // Firebase Configuration
  firebaseProjectProd?: string;
  firebaseProjectDev?: string;

  // Feature Flags
  includeAuth: boolean;
  includePayments: boolean;
  includeTheming: boolean;

  // Quality Tools
  includeEslint: boolean;
  includePrettier: boolean;
  includeHusky: boolean;
  includeCommitlint: boolean;
}
```

### File Generation Matrix (Future)

| File                 | Template                 | Variables           | Dependencies |
| -------------------- | ------------------------ | ------------------- | ------------ |
| `.nvmrc`             | `{{defaultNodeVersion}}` | -                   | -            |
| `package.json`       | Complex                  | All                 | -            |
| `tsconfig.base.json` | Complex                  | `orgTsImportPrefix` | -            |
| `.eslintrc.json`     | Complex                  | `orgTsImportPrefix` | package.json |
| `.prettierrc`        | Static                   | -                   | -            |
| `.husky/pre-commit`  | Static                   | -                   | husky        |
| `firebase.json`      | Complex                  | All domain vars     | -            |
| `docs/README.md`     | Complex                  | All                 | -            |
| `apps/nextjs-app/`   | Complex                  | App-specific vars   | -            |
| `apps/angular-app/`  | Complex                  | App-specific vars   | -            |
| `libs/auth-shared/`  | Complex                  | Auth vars           | -            |

### Conditional Logic (Future)

- If `includeNextJs`: Generate Next.js app
- If `includeAngular`: Generate Angular app
- If `includeAuth`: Generate Firebase auth config
- If `includePayments`: Generate payment config
- If `includeTheming`: Generate theme configuration

## Documentation Structure

### Current Quality Foundation

```
docs/
├── README.md (dev setup, commands)
├── architecture/
│   ├── README.md
│   └── adr-0001-quality-tools.md
├── conventions/
│   ├── coding-standards.md
│   ├── git-workflow.md
│   └── typescript-guidelines.md
├── development/
│   ├── getting-started.md
│   ├── team-setup.md
│   └── troubleshooting.md
└── performance/
    └── optimization-guide.md
```

### Future Dual-App Documentation

```
docs/
├── README.md (dev, build, test, run)
├── architecture/
│   ├── monorepo-structure.md
│   └── adr-0001-bff-auth.md
├── ops/
│   ├── firebase-environments.md
│   └── github-actions.md
└── conventions/
    └── coding-standards.md
```

## Pain Points & Solutions (Documentation)

### Setup Challenges

1. **ESLint + Prettier conflicts**
   - Solution: Use eslint-config-prettier
   - Schematic: Auto-configure integration

2. **Husky setup complexity**
   - Solution: npm run prepare
   - Schematic: Auto-run prepare command

3. **TypeScript path mapping**
   - Solution: Update tsconfig.base.json
   - Schematic: Auto-generate paths

4. **Firebase multi-project setup**
   - Solution: Manual .firebaserc config
   - Schematic: Auto-generate from variables

### Edge Cases

1. **Existing files conflict**
   - Manual: Backup and merge
   - Schematic: Check and prompt

2. **Dependency version conflicts**
   - Manual: Resolve manually
   - Schematic: Version compatibility check

3. **CI/CD secret management**
   - Manual: Manual GitHub setup
   - Schematic: Generate setup instructions

## Validation Checklist

### Pre-Generation

- [ ] All required variables provided
- [ ] No conflicting file names
- [ ] Valid domain names
- [ ] Firebase project IDs valid

### Post-Generation

- [ ] All files created successfully
- [ ] No syntax errors in config files
- [ ] Dependencies installed correctly
- [ ] Git hooks working
- [ ] ESLint runs without errors
- [ ] TypeScript compiles
- [ ] Documentation is complete

### Manual Verification Required

- [ ] Firebase project setup
- [ ] CI/CD secrets configuration
- [ ] Domain DNS configuration
- [ ] SSL certificates

## Success Metrics

### Technical

- ✅ All schematics generate valid configurations
- ✅ No conflicts between generated files
- ✅ Proper error handling and validation
- ✅ Comprehensive test coverage

### User Experience

- ✅ Simple command-line interface
- ✅ Clear error messages
- ✅ Helpful documentation
- ✅ Fast execution time

## Implementation Timeline (Step-by-Step Approach)

### Phase 1: Foundation Setup (Week 1)

- Day 1-2: pnpm workspace + quality tools (ESLint, Prettier, Husky)
- Day 3-4: TypeScript configuration + path mapping
- Day 5: Editor configuration + documentation structure

### Phase 2: First App Creation (Week 2)

- Day 1-2: Create vendemas-ng-mobile (Angular + Ionic + Capacitor)
- Day 3-4: Basic app structure + routing
- Day 5: App-specific package.json + dependencies

### Phase 3: CSS & Styling (Week 3)

- Day 1-2: Tailwind CSS setup + configuration
- Day 3-4: Angular Material integration
- Day 5: Theme system + shared design tokens

### Phase 4: Firebase Integration (Week 4)

- Day 1-2: Firebase project setup (DEV/PROD)
- Day 3-4: Hosting configuration + multi-site setup
- Day 5: Basic deployment + manual testing

### Phase 5: CI/CD Foundation (Week 5)

- Day 1-2: GitHub Actions basic workflow
- Day 3-4: Build pipeline + test automation
- Day 5: Auto-deploy to Firebase

### Phase 6: Testing Framework (Week 6)

- Day 1-2: Unit testing setup (Jest/Vitest)
- Day 3-4: Component testing + Angular testing utilities
- Day 5: Test coverage + reporting

### Phase 7: E2E Testing (Week 7)

- Day 1-2: Playwright/Cypress setup
- Day 3-4: Mobile testing + device simulation
- Day 5: CI integration + automated E2E tests

### Phase 8: CI/CD Improvements (Week 8)

- Day 1-2: Nx affected + smart builds
- Day 3-4: Performance optimization + caching
- Day 5: Quality gates + final polish

### Future: Schematic Development (Weeks 9-16)

- Week 9-11: Quality Foundation Schematic
- Week 12-14: App Generation Schematics
- Week 15-16: Integration and Testing

## Benefits of Hybrid Approach

### Immediate Benefits

- ✅ Working foundation in 1-2 weeks
- ✅ Team can start developing immediately
- ✅ Proven approach before automation
- ✅ Knowledge captured for future projects

### Long-term Benefits

- ✅ Schematic creation is much easier
- ✅ Documentation exists for maintenance
- ✅ Patterns established for consistency
- ✅ Team expertise built through manual setup

## Next Steps

1. **Start with manual setup** using the enhanced prompt
2. **Document everything** as you go
3. **Create configuration template** for future projects
4. **Identify pain points** for schematic automation
5. **Build schematic** based on real experience

---

_This document serves as the reference for our hybrid strategy approach, combining immediate manual implementation with comprehensive documentation for future schematic automation._
