# Vendemás Monorepo

A comprehensive Nx monorepo for Vendemás retail management platform, featuring Angular, Next.js, and React Native applications.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run quality checks
pnpm run verify

# Start development
pnpm run dev
```

## 📁 Project Structure

```
├── apps/                    # Applications
│   ├── vendemas-ng-mobile/  # Angular mobile app
│   ├── vendemas-nx-dashboard/ # Next.js dashboard
│   └── vendemas-rn-mobile/  # React Native app
├── libs/                    # Shared libraries
├── docs/                    # Documentation
└── packages/                # NPM packages
```

## 📚 Documentation

- **[Engineering Principles](docs/cursor.md)** - Development standards and best practices
- **[Schematic Development Strategy](docs/scaffolding-schematic-development-strategy-reference.md)** - Blueprint for automation
- **[Project Overview](docs/README.md)** - Detailed project documentation

## 🛠️ Technology Stack

- **Frontend**: Angular (ng), Next.js (nx), React Native (rn)
- **Build System**: Nx Monorepo
- **Package Manager**: pnpm
- **Quality Tools**: ESLint, Prettier, Husky, Commitlint
- **Backend**: Firebase (BFF), PostgreSQL + NestJS (future)

## 🎯 Naming Convention

Apps follow the pattern: `<product>-<tech>-<functionality>`

- `vendemas-ng-mobile` - Angular mobile app
- `vendemas-nx-dashboard` - Next.js dashboard
- `vendemas-rn-mobile` - React Native app

## 🔧 Development

```bash
# Quality checks
pnpm run lint
pnpm run format:check
pnpm run typecheck

# Git hooks (automatic)
git commit -m "feat: your changes"
```

## 📦 Available Scripts

- `pnpm run verify` - Run all quality checks
- `pnpm run lint` - Lint code with ESLint
- `pnpm run format:check` - Check code formatting
- `pnpm run typecheck` - TypeScript type checking
- `pnpm run clean` - Clean build artifacts

## 🤝 Contributing

1. Follow the engineering principles in `docs/cursor.md`
2. Use conventional commits
3. Ensure all quality checks pass
4. Update documentation as needed

## 📄 License

MIT License - see LICENSE file for details
