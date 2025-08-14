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

## Core Variables Template

```
PRODUCT_NAME: vendemas
ORG_TS_IMPORT_PREFIX: @vendemas
DEFAULT_NODE_VERSION: 20

# For future dual-app setup
NEXT_APP_NAME: vendemas-dashboard
ANG_APP_NAME: vendemas-mobile
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

### Required Dependencies

```json
{
  "@nx/eslint": "latest",
  "@typescript-eslint/eslint-plugin": "latest",
  "@typescript-eslint/parser": "latest",
  "eslint": "latest",
  "eslint-config-prettier": "latest",
  "eslint-plugin-import": "latest",
  "eslint-plugin-jsx-a11y": "latest",
  "eslint-plugin-n": "latest",
  "eslint-plugin-prettier": "latest",
  "prettier": "latest",
  "husky": "latest",
  "lint-staged": "latest",
  "@commitlint/cli": "latest",
  "@commitlint/config-conventional": "latest"
}
```

### Key Configuration Files

- `.eslintrc.json` (with performance optimizations)
- `.prettierrc`
- `.editorconfig`
- `.husky/pre-commit`
- `.lintstagedrc.js`
- `.npmrc`
- `setup-dev.sh` (team setup script)
- `.vscode/settings.json`
- `.vscode/extensions.json`

### Package.json Scripts

```json
{
  "scripts": {
    "lint": "nx lint",
    "lint:fix": "nx lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "nx typecheck",
    "prepare": "husky install",
    "setup": "chmod +x setup-dev.sh && ./setup-dev.sh",
    "verify": "npm run lint && npm run format:check && npm run typecheck",
    "clean": "nx reset && rm -rf .eslintcache"
  }
}
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
  nextAppName?: string;
  angularAppName?: string;

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

- Day 1-2: Create vendemas-mobile (Angular + Ionic)
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
