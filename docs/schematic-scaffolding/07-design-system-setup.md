# Design System Setup

## Overview

The VendeMás Design System provides a centralized, consistent approach to styling across all applications. It combines shared styles, design tokens, and component libraries to ensure visual consistency and maintainability.

## Architecture

### **Design System Structure**

```
vendemas-shared-styles/
├── foundation/          # Core design tokens, variables, mixins
├── themes/             # Material Design 3, light/dark themes
├── components/         # Shared UI components
├── commerce/           # Commerce-specific styles
├── vendor/             # Vendor management styles
├── location/           # Location and discovery styles
├── mobile/             # Mobile-first responsive patterns
├── accessibility/      # Accessibility and inclusive design
└── utilities/          # Helper classes and utilities
```

### **Layer Organization**

1. **Foundation**: Base tokens, variables, and mixins
2. **Themes**: Theme-specific implementations
3. **Components**: Reusable UI components
4. **Domain**: Business-specific styles
5. **Utilities**: Helper classes and functions

## Foundation Layer

### **Design Tokens**

#### **Color System**

```scss
// Primary Colors
$vendemas-primary: #4caf50;
$vendemas-primary-on: #000000;
$vendemas-secondary: #1e3a5f;
$vendemas-secondary-on: #ffffff;
$vendemas-tertiary: #f4b942;
$vendemas-tertiary-on: #000000;
$vendemas-error: #c23b4b;
$vendemas-error-on: #ffffff;

// Semantic Colors
$vendemas-success: $vendemas-primary;
$vendemas-success-on: $vendemas-primary-on;
$vendemas-warning: $vendemas-tertiary;
$vendemas-warning-on: $vendemas-tertiary-on;
$vendemas-info: $vendemas-secondary;
$vendemas-info-on: $vendemas-secondary-on;
```

#### **Typography System**

```scss
// Font Families
$vendemas-font-family-body: 'Inter', sans-serif;
$vendemas-font-family-display: 'Montserrat', sans-serif;

// Font Sizes
$vendemas-font-size-xs: 0.75rem; // 12px
$vendemas-font-size-sm: 0.875rem; // 14px
$vendemas-font-size-base: 1rem; // 16px
$vendemas-font-size-lg: 1.125rem; // 18px
$vendemas-font-size-xl: 1.25rem; // 20px
$vendemas-font-size-2xl: 1.5rem; // 24px
$vendemas-font-size-3xl: 1.875rem; // 30px
$vendemas-font-size-4xl: 2.25rem; // 36px

// Font Weights
$vendemas-font-weight-normal: 400;
$vendemas-font-weight-medium: 500;
$vendemas-font-weight-bold: 700;

// Line Heights
$vendemas-line-height-tight: 1.25;
$vendemas-line-height-normal: 1.5;
$vendemas-line-height-relaxed: 1.75;
```

#### **Spacing System**

```scss
// Spacing Scale
$vendemas-spacing-xs: 0.25rem; // 4px
$vendemas-spacing-sm: 0.5rem; // 8px
$vendemas-spacing-md: 1rem; // 16px
$vendemas-spacing-lg: 1.5rem; // 24px
$vendemas-spacing-xl: 2rem; // 32px
$vendemas-spacing-2xl: 3rem; // 48px
$vendemas-spacing-3xl: 4rem; // 64px
```

#### **Breakpoint System**

```scss
// Breakpoints
$vendemas-breakpoint-sm: 640px;
$vendemas-breakpoint-md: 768px;
$vendemas-breakpoint-lg: 1024px;
$vendemas-breakpoint-xl: 1280px;
$vendemas-breakpoint-2xl: 1536px;
```

### **Core Mixins**

#### **Typography Mixins**

```scss
@mixin heading($level: 1) {
  font-family: $vendemas-font-family-display;
  font-weight: $vendemas-font-weight-bold;

  @if $level == 1 {
    font-size: $vendemas-font-size-4xl;
    line-height: $vendemas-line-height-tight;
  } @else if $level == 2 {
    font-size: $vendemas-font-size-3xl;
    line-height: $vendemas-line-height-tight;
  } @else if $level == 3 {
    font-size: $vendemas-font-size-2xl;
    line-height: $vendemas-line-height-tight;
  } @else if $level == 4 {
    font-size: $vendemas-font-size-xl;
    line-height: $vendemas-line-height-tight;
  } @else if $level == 5 {
    font-size: $vendemas-font-size-lg;
    line-height: $vendemas-line-height-tight;
  } @else if $level == 6 {
    font-size: $vendemas-font-size-base;
    line-height: $vendemas-line-height-tight;
  }
}

@mixin body-text($size: base) {
  font-family: $vendemas-font-family-body;
  font-weight: $vendemas-font-weight-normal;
  line-height: $vendemas-line-height-normal;

  @if $size == xs {
    font-size: $vendemas-font-size-xs;
  } @else if $size == sm {
    font-size: $vendemas-font-size-sm;
  } @else if $size == base {
    font-size: $vendemas-font-size-base;
  } @else if $size == lg {
    font-size: $vendemas-font-size-lg;
  } @else if $size == xl {
    font-size: $vendemas-font-size-xl;
  }
}
```

#### **Layout Mixins**

```scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@mixin flex-column {
  display: flex;
  flex-direction: column;
}

@mixin grid-center {
  display: grid;
  place-items: center;
}
```

#### **Responsive Mixins**

```scss
@mixin mobile {
  @media (max-width: $vendemas-breakpoint-md - 1px) {
    @content;
  }
}

@mixin tablet {
  @media (min-width: $vendemas-breakpoint-md) and (max-width: $vendemas-breakpoint-lg - 1px) {
    @content;
  }
}

@mixin desktop {
  @media (min-width: $vendemas-breakpoint-lg) {
    @content;
  }
}

@mixin mobile-up {
  @media (min-width: $vendemas-breakpoint-md) {
    @content;
  }
}

@mixin tablet-up {
  @media (min-width: $vendemas-breakpoint-lg) {
    @content;
  }
}

@mixin desktop-up {
  @media (min-width: $vendemas-breakpoint-xl) {
    @content;
  }
}
```

#### **Interactive Mixins**

```scss
@mixin interactive {
  cursor: pointer;
  transition: all $vendemas-transition-normal;

  &:hover {
    transform: translateY(-1px);
    box-shadow: $vendemas-shadow-elevation-2;
  }

  &:active {
    transform: translateY(0);
    box-shadow: $vendemas-shadow-elevation-1;
  }
}

@mixin focus-ring($color: $vendemas-primary) {
  &:focus-visible {
    outline: 2px solid $color;
    outline-offset: 2px;
  }
}

@mixin elevation($level: 1) {
  @if $level == 1 {
    box-shadow: 0 1px 3px 0 $vendemas-shadow-elevation-1;
  } @else if $level == 2 {
    box-shadow: 0 4px 6px -1px $vendemas-shadow-elevation-2;
  } @else if $level == 3 {
    box-shadow: 0 10px 15px -3px $vendemas-shadow-elevation-3;
  }
}
```

#### **Accessibility Mixins**

```scss
@mixin reduced-motion {
  @media (prefers-reduced-motion: reduce) {
    @content;
  }
}

@mixin high-contrast {
  @media (prefers-contrast: high) {
    @content;
  }
}

@mixin dark-mode {
  @media (prefers-color-scheme: dark) {
    @content;
  }
}
```

## Theme Layer

### **Material Design 3 Integration**

#### **Theme Variables**

```scss
// Light Theme
$vendemas-light-primary: #4caf50;
$vendemas-light-primary-on: #000000;
$vendemas-light-secondary: #1e3a5f;
$vendemas-light-secondary-on: #ffffff;
$vendemas-light-tertiary: #f4b942;
$vendemas-light-tertiary-on: #000000;
$vendemas-light-error: #c23b4b;
$vendemas-light-error-on: #ffffff;

// Dark Theme
$vendemas-dark-primary: #a5d6a7;
$vendemas-dark-primary-on: #0c3d0f;
$vendemas-dark-secondary: #99b3d4;
$vendemas-dark-secondary-on: #0b1a2c;
$vendemas-dark-tertiary: #fad77d;
$vendemas-dark-tertiary-on: #3e2c00;
$vendemas-dark-error: #f2a7b1;
$vendemas-dark-error-on: #5a1220;
```

#### **CSS Custom Properties**

```scss
:root {
  // Light theme defaults
  --vendemas-primary: #{$vendemas-light-primary};
  --vendemas-primary-on: #{$vendemas-light-primary-on};
  --vendemas-secondary: #{$vendemas-light-secondary};
  --vendemas-secondary-on: #{$vendemas-light-secondary-on};
  --vendemas-tertiary: #{$vendemas-light-tertiary};
  --vendemas-tertiary-on: #{$vendemas-light-tertiary-on};
  --vendemas-error: #{$vendemas-light-error};
  --vendemas-error-on: #{$vendemas-light-error-on};

  // Surface colors
  --vendemas-surface: #ffffff;
  --vendemas-surface-variant: #f5f5f5;
  --vendemas-on-surface: #000000;
  --vendemas-on-surface-variant: #666666;

  // Background colors
  --vendemas-background: #ffffff;
  --vendemas-on-background: #000000;

  // Outline colors
  --vendemas-outline: #e0e0e0;
  --vendemas-outline-variant: #cccccc;

  // Shadow colors
  --vendemas-shadow: rgba(0, 0, 0, 0.1);
  --vendemas-shadow-elevation-1: rgba(0, 0, 0, 0.12);
  --vendemas-shadow-elevation-2: rgba(0, 0, 0, 0.16);
  --vendemas-shadow-elevation-3: rgba(0, 0, 0, 0.2);
}

[data-theme='dark'] {
  // Dark theme overrides
  --vendemas-primary: #{$vendemas-dark-primary};
  --vendemas-primary-on: #{$vendemas-dark-primary-on};
  --vendemas-secondary: #{$vendemas-dark-secondary};
  --vendemas-secondary-on: #{$vendemas-dark-secondary-on};
  --vendemas-tertiary: #{$vendemas-dark-tertiary};
  --vendemas-tertiary-on: #{$vendemas-dark-tertiary-on};
  --vendemas-error: #{$vendemas-dark-error};
  --vendemas-error-on: #{$vendemas-dark-error-on};

  // Surface colors
  --vendemas-surface: #121212;
  --vendemas-surface-variant: #1e1e1e;
  --vendemas-on-surface: #ffffff;
  --vendemas-on-surface-variant: #b0b0b0;

  // Background colors
  --vendemas-background: #000000;
  --vendemas-on-background: #ffffff;

  // Outline colors
  --vendemas-outline: #333333;
  --vendemas-outline-variant: #666666;

  // Shadow colors
  --vendemas-shadow: rgba(0, 0, 0, 0.3);
  --vendemas-shadow-elevation-1: rgba(0, 0, 0, 0.4);
  --vendemas-shadow-elevation-2: rgba(0, 0, 0, 0.5);
  --vendemas-shadow-elevation-3: rgba(0, 0, 0, 0.6);
}
```

## Component Layer

### **Button Components**

#### **Primary Button**

```scss
.btn-primary {
  @include flex-center;
  @include interactive;
  @include focus-ring;

  background-color: var(--vendemas-primary);
  color: var(--vendemas-primary-on);
  padding: $vendemas-spacing-sm $vendemas-spacing-lg;
  border-radius: $vendemas-spacing-xs;
  border: none;
  font-weight: $vendemas-font-weight-medium;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
}
```

#### **Secondary Button**

```scss
.btn-secondary {
  @include flex-center;
  @include interactive;
  @include focus-ring;

  background-color: transparent;
  color: var(--vendemas-secondary);
  padding: $vendemas-spacing-sm $vendemas-spacing-lg;
  border-radius: $vendemas-spacing-xs;
  border: 2px solid var(--vendemas-secondary);
  font-weight: $vendemas-font-weight-medium;

  &:hover {
    background-color: var(--vendemas-secondary);
    color: var(--vendemas-secondary-on);
  }
}
```

### **Card Components**

```scss
.card {
  @include elevation(1);

  background-color: var(--vendemas-surface);
  border-radius: $vendemas-spacing-sm;
  padding: $vendemas-spacing-lg;
  border: 1px solid var(--vendemas-outline);

  .card-header {
    @include heading(4);
    margin-bottom: $vendemas-spacing-md;
    color: var(--vendemas-on-surface);
  }

  .card-content {
    @include body-text;
    color: var(--vendemas-on-surface-variant);
  }
}
```

## Domain-Specific Styles

### **Commerce Layer**

```scss
// Product cards
.product-card {
  @extend .card;

  .product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: $vendemas-spacing-xs;
    margin-bottom: $vendemas-spacing-md;
  }

  .product-price {
    @include heading(5);
    color: var(--vendemas-primary);
    margin-bottom: $vendemas-spacing-sm;
  }

  .product-actions {
    @include flex-between;
    margin-top: $vendemas-spacing-md;
  }
}

// Shopping cart
.cart-item {
  @include flex-between;
  padding: $vendemas-spacing-md 0;
  border-bottom: 1px solid var(--vendemas-outline);

  .item-details {
    @include flex-column;
    flex: 1;
  }

  .item-price {
    @include heading(6);
    color: var(--vendemas-primary);
  }
}
```

### **Vendor Layer**

```scss
// Dashboard widgets
.dashboard-widget {
  @extend .card;

  .widget-header {
    @include flex-between;
    margin-bottom: $vendemas-spacing-md;
  }

  .widget-value {
    @include heading(2);
    color: var(--vendemas-primary);
  }

  .widget-change {
    @include body-text(sm);

    &.positive {
      color: var(--vendemas-success);
    }

    &.negative {
      color: var(--vendemas-error);
    }
  }
}

// Data tables
.data-table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: $vendemas-spacing-sm;
    text-align: left;
    border-bottom: 1px solid var(--vendemas-outline);
  }

  th {
    @include heading(6);
    color: var(--vendemas-on-surface);
    background-color: var(--vendemas-surface-variant);
  }

  td {
    @include body-text;
    color: var(--vendemas-on-surface-variant);
  }
}
```

## Integration

### **Angular Applications**

#### **Import in styles.scss**

```scss
/* VendeMás Design System */
@use '@vendemas/shared-styles';

/* Angular Material 3 Theme System */
@use './theme/theme-styles.scss';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### **Component Usage**

```typescript
// app.component.ts
@Component({
  selector: 'app-root',
  template: `
    <div class="dashboard-widget">
      <div class="widget-header">
        <h3 class="widget-title">Sales Today</h3>
        <span class="widget-icon">📊</span>
      </div>
      <div class="widget-value">$1,234</div>
      <div className="widget-change positive">+12.5%</div>
    </div>
  `
```
