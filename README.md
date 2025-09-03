# Vendemás - Nx Monorepo

A mobile-first sales toolkit for street vendors and micro-retail businesses in Mexico/LATAM, built with modern web technologies in a scalable monorepo architecture.

## 🎯 Mission

Empower street vendors to sell more with less friction—by giving them a fast, offline-friendly, mobile toolkit for QR/barcode checkout, live location, simple promos, and clear daily sales insights.

## 📊 Current Development Status

### 🚀 Active Development

- **vendemas-landing-web**: ✅ CI/CD pipeline implemented and tested
- **vendemas-caja-mobile**: 🔄 In development (Ionic/Capacitor mobile app)
- **vendemas-negocio-web**: 🔄 In development (Angular admin dashboard)

### 🎯 Next Milestones

- Complete mobile app MVP features
- Implement authentication system
- Set up Firebase backend integration
- Launch beta testing program

## 🏗️ Architecture

### Tech Stack

- **Mobile**: Angular + Ionic + Capacitor (one codebase → Android/iOS + PWA dashboard)
- **Admin**: Angular v20 SSR PWA
- **Landing**: Next.js SSR
- **Backend**: Firebase (Auth, Cloud Messaging, Hosting) + Cloud Functions
- **Database**: Local SQLite + Firebase Firestore
- **Package Manager**: pnpm workspaces
- **Monorepo**: Nx

### Project Structure

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

packages/                    # Shared packages (if needed)
tools/                      # Build tools and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 8.0.0
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:ricemini/ubro-apps-workspace.git
   cd ubro-apps-workspace
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Setup Git hooks**
   ```bash
   pnpm run prepare
   ```

### Development

#### Available Scripts

```bash
# Quality tools
pnpm run lint              # Run ESLint
pnpm run lint:fix          # Fix ESLint issues
pnpm run format            # Format code with Prettier
pnpm run format:check      # Check code formatting
pnpm run typecheck         # Run TypeScript type checking
pnpm run verify            # Run all quality checks

# Build and test
pnpm run build             # Build all projects
pnpm run test              # Run all tests
pnpm run affected:build    # Build affected projects
pnpm run affected:test     # Test affected projects
pnpm run affected:lint     # Lint affected projects

# Utilities
pnpm run clean             # Clean cache and build artifacts
```

#### Nx Commands

```bash
# Generate new app/library
nx generate @nx/angular:app vendemas-caja-mobile
nx generate @nx/angular:app vendemas-admin-web
nx generate @nx/next:app vendemas-website
nx generate @nx/js:lib vendemas-shared-auth

# Run tasks for specific projects
nx build vendemas-caja-mobile
nx test vendemas-shared-auth
nx lint vendemas-website

# View project graph
nx graph
```

## 📋 Dependency Management

### Root Dependencies (Monorepo-wide tools)

- ESLint, Prettier, Husky, Commitlint
- Nx plugins (@nx/angular, @nx/react, @nx/next)
- TypeScript, Vitest, Playwright
- Workspace management tools

### Project Dependencies (Project-specific)

- Each app/library has its own `package.json`
- Project-specific dependencies (e.g., @angular/material, @ionic/angular)
- Self-contained and minimal

### Adding Dependencies

```bash
# Add to root (monorepo-wide tools)
pnpm add -D -w <package-name>

# Add to specific project
pnpm add <package-name> --filter @vendemas/caja-mobile
```

## 🎨 Quality Standards

### Code Quality

- **ESLint**: Strict linting with TypeScript rules
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict mode enabled
- **Husky**: Pre-commit hooks for quality enforcement

### Git Workflow

- **Conventional Commits**: Standardized commit messages
- **Commitlint**: Automated commit message validation
- **Lint-staged**: Pre-commit code quality checks

### Testing Strategy

- **Unit Tests**: Vitest for individual components/functions
- **Integration Tests**: Component interaction testing
- **E2E Tests**: Playwright for end-to-end workflows
- **Performance Tests**: Lighthouse CI for performance monitoring

## 🔧 Configuration Files

### Core Configuration

- `package.json` - Root workspace configuration
- `pnpm-workspace.yaml` - Workspace package definitions
- `.npmrc` - pnpm configuration
- `nx.json` - Nx workspace configuration

### Quality Tools

- `eslint.config.js` - ESLint v9 flat config
- `.prettierrc` - Prettier formatting rules
- `.editorconfig` - Editor consistency
- `.husky/` - Git hooks configuration

### TypeScript

- `tsconfig.base.json` - Base TypeScript configuration
- Path mapping for `@vendemas/*` imports

## 🚀 Deployment & CI/CD

### Automated CI/CD Pipeline

Our CI/CD pipeline is powered by GitHub Actions and Nx Cloud, providing:

- **Smart Builds**: Only rebuilds affected projects using Nx affected commands
- **Quality Gates**: Automated linting, testing, and security scanning
- **Parallel Execution**: Lint and test run simultaneously for faster feedback
- **Zero-Downtime Deployments**: Prebuilt artifacts deployed to Vercel
- **Performance Monitoring**: Ready for Lighthouse CI integration
- **Security Scanning**: Ready for Snyk integration

#### Current Pipeline Status

- ✅ **Setup & Affected Detection**: Nx Cloud integration with intelligent caching
- ✅ **Lint** (Parallel): ESLint checks with caching
- ✅ **Test** (Parallel): Unit tests with coverage reporting
- ✅ **Build** (Sequential): Optimized builds with artifact management
- ✅ **Deploy to Vercel**: Production deployment using prebuilt artifacts
- 🔄 **Nx Cloud**: Remote caching and distributed task execution

#### Pipeline Architecture

```
Setup & Affected Detection → [Lint + Test] (parallel) → Build → Deploy
```

#### Pipeline Configuration

```yaml
# Triggered on changes to:
- apps/vendemas-landing-web/**
- libs/vendemas-shared-design/**
- libs/vendemas-shared-styles/**
- package.json, pnpm-lock.yaml, nx.json
- vitest.config.ts, vitest.setup.ts
```

### 📚 Documentation

For detailed CI/CD implementation guide, troubleshooting, and replication instructions, see:

- **[CI/CD Pipeline Reference](docs/ci-cd-pipeline-reference.md)** - Comprehensive guide for implementing similar pipelines

### Firebase Hosting

- Multi-site configuration for different apps
- Environment-specific deployments (DEV/PROD)
- Automated CI/CD with GitHub Actions

### Mobile Deployment

- Capacitor builds for Android/iOS
- App store deployment pipelines
- PWA deployment for web dashboard

## 📚 Documentation

- `docs/` - Project documentation
- `cursor.md` - Engineering principles and best practices
- `docs/naming-conventions.md` - Naming conventions and project structure
- `docs/scaffolding-schematic-development-strategy-reference.md` - Development strategy
- `docs/authentication-library-architecture-reference.md` - Auth library architecture
- `docs/vendemas-nx-website-implementation-plan.md` - Website implementation plan

## 🤝 Contributing

1. Follow the established coding standards
2. Use conventional commits
3. Ensure all quality checks pass
4. Update documentation as needed
5. Test thoroughly before submitting

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For questions or issues:

- Check the documentation in `docs/`
- Review existing issues
- Create a new issue with detailed information

---

**Vendemás** - Empowering street vendors with modern technology 🚀
