# Hybrid Strategy Reference: Manual Setup + Schematic Blueprint

## Strategy Overview

**Approach**: Manual configuration for immediate value + comprehensive documentation for future schematic creation

**Timeline**: 
- Week 1-2: Manual setup with documentation
- Week 3: Schematic blueprint creation
- Future: Schematic development based on real experience

## Core Variables Template

```
PRODUCT_NAME: <product-name>
ORG_TS_IMPORT_PREFIX: @domain
DEFAULT_NODE_VERSION: 20

# For future dual-app setup
NEXT_APP_NAME: <name>-website
ANG_APP_NAME: <angular-app-name>
MAIN_DOMAIN: <firebase-main-domain> (e.g., example.com)
SUBDOMAIN: app.<firebase-main-domain>
FIREBASE_PROJECT_PROD: <MyFirebaseAppName>
FIREBASE_PROJECT_DEV: <MyFirebaseAppName Dev>
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
Two empty apps with shared BFF authentication:
- Next.js (App Router, SSR, SEO scaffold)
- Angular v20 + Angular Material v20
- Shared BFF authentication (Firebase Functions)
- Tailwind CSS with shared preset
- Shared libraries (auth-shared, types)
- Multi-environment deployment (DEV/PROD)
- CI/CD with nx affected commands

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
| File | Template | Variables | Dependencies |
|------|----------|-----------|--------------|
| `.nvmrc` | `{{defaultNodeVersion}}` | - | - |
| `package.json` | Complex | All | - |
| `tsconfig.base.json` | Complex | `orgTsImportPrefix` | - |
| `.eslintrc.json` | Complex | `orgTsImportPrefix` | package.json |
| `.prettierrc` | Static | - | - |
| `.husky/pre-commit` | Static | - | husky |
| `firebase.json` | Complex | All domain vars | - |
| `docs/README.md` | Complex | All | - |
| `apps/nextjs-app/` | Complex | App-specific vars | - |
| `apps/angular-app/` | Complex | App-specific vars | - |
| `libs/auth-shared/` | Complex | Auth vars | - |

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

## Implementation Timeline

### Phase 1: Manual Setup + Documentation (Week 1-2)
- Day 1-2: Manual quality tools setup
- Day 3-4: Document every step and decision
- Day 5: Create configuration template

### Phase 2: Validation + Refinement (Week 2)
- Day 1-2: Test setup on clean repository
- Day 3-4: Document pain points and solutions
- Day 5: Create schematic blueprint

### Phase 3: Blueprint Documentation (Week 3)
- Day 1-2: Create detailed file generation matrix
- Day 3-4: Document conditional logic and dependencies
- Day 5: Create validation checklist

### Future: Schematic Development (Weeks 4-12)
- Week 4-6: Quality Foundation Schematic
- Week 7-9: App Generation Schematics
- Week 10-12: Integration and Testing

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

*This document serves as the reference for our hybrid strategy approach, combining immediate manual implementation with comprehensive documentation for future schematic automation.*
