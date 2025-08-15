# E2E Tests

This directory contains end-to-end tests for the Vendemás monorepo using Playwright.

## Structure

```
e2e/
├── website/           # Tests for vendemas-nx-website
├── mobile/            # Tests for vendemas-ng-mobile (PWA)
├── admin/             # Tests for vendemas-ng-admin
└── shared/            # Shared test utilities and fixtures
```

## Running Tests

```bash
# Run all E2E tests
pnpm run test:e2e

# Run with UI
pnpm run test:e2e:ui

# Run in debug mode
pnpm run test:e2e:debug

# Install browsers
pnpm run test:e2e:install
```

## Test Strategy

- **Cross-browser testing**: Chrome, Firefox, Safari
- **Mobile testing**: Mobile Chrome, Mobile Safari
- **Visual regression**: Screenshot comparison
- **Performance testing**: Lighthouse integration
- **Accessibility testing**: Built-in a11y checks
