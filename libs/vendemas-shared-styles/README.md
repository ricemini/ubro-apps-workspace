# VendeMás Shared Styles

A comprehensive design system for the VendeMás product ecosystem, providing consistent styling across all applications.

## 🎯 **Overview**

The VendeMás Shared Styles library is a centralized design system that ensures consistency across:

- **vendemas-caja-mobile** (Angular POS system)
- **vendemas-landing-web** (Next.js marketing site)
- **Future mobile app** (React Native/Flutter)

## 🏗️ **Architecture**

The design system is organized into logical layers, each serving a specific purpose:

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

## 🚀 **Quick Start**

### **Import Complete Design System**

```scss
// In your app's main stylesheet
@use '@vendemas/shared-styles';
```

### **Import Specific Layers**

```scss
// Import only what you need
@use '@vendemas/shared-styles/foundation';
@use '@vendemas/shared-styles/themes';
@use '@vendemas/shared-styles/components';
```

## 🎨 **Design Tokens**

### **Colors**

```scss
// Primary colors
$vendemas-primary: #4caf50;
$vendemas-secondary: #1e3a5f;
$vendemas-tertiary: #f4b942;
$vendemas-error: #c23b4b;

// Surface colors
$vendemas-surface: #ffffff;
$vendemas-background: #ffffff;
$vendemas-outline: rgba(0, 0, 0, 0.12);
```

### **Typography**

```scss
// Font families
$vendemas-font-family-body: 'Inter', sans-serif;
$vendemas-font-family-display: 'Montserrat', sans-serif;

// Font sizes
$vendemas-font-size-base: 1rem; // 16px
$vendemas-font-size-lg: 1.125rem; // 18px
$vendemas-font-size-xl: 1.25rem; // 20px
$vendemas-font-size-2xl: 1.5rem; // 24px
```

### **Spacing**

```scss
// Spacing scale
$vendemas-spacing-xs: 0.25rem; // 4px
$vendemas-spacing-sm: 0.5rem; // 8px
$vendemas-spacing-md: 1rem; // 16px
$vendemas-spacing-lg: 1.5rem; // 24px
$vendemas-spacing-xl: 2rem; // 32px
```

## 🔧 **Mixins**

### **Responsive Breakpoints**

```scss
@include mobile {
  // Mobile-specific styles
}

@include tablet {
  // Tablet-specific styles
}

@include desktop {
  // Desktop-specific styles
}
```

### **Typography**

```scss
@include heading(1); // H1 styles
@include heading(2); // H2 styles
@include body-text(lg); // Large body text
```

### **Layout**

```scss
@include flex-center; // Centered flexbox
@include flex-between; // Space-between flexbox
@include grid-center; // Centered grid
```

### **Interactive Elements**

```scss
@include interactive; // Hover effects, transitions
@include focus-ring; // Focus indicators
@include elevation(2); // Material elevation
```

## 🌓 **Theme System**

The design system supports light and dark themes with automatic switching:

```scss
// CSS Custom Properties for theme switching
:root {
  --vendemas-primary: #4caf50;
  --vendemas-surface: #ffffff;
  --vendemas-on-surface: rgba(0, 0, 0, 0.87);
}

.dark-theme {
  --vendemas-primary: #a5d6a7;
  --vendemas-surface: #1e1e1e;
  --vendemas-on-surface: rgba(255, 255, 255, 0.87);
}
```

## 📱 **Responsive Design**

Built with mobile-first responsive design:

```scss
// Mobile-first approach
.element {
  padding: $vendemas-spacing-md;

  @include tablet-up {
    padding: $vendemas-spacing-lg;
  }

  @include desktop-up {
    padding: $vendemas-spacing-xl;
  }
}
```

## ♿ **Accessibility**

Built-in accessibility features:

```scss
// Reduced motion support
@include reduced-motion {
  transition: none;
}

// High contrast support
@include high-contrast {
  border: 2px solid currentColor;
}

// Focus indicators
@include focus-ring($vendemas-primary);
```

## 🔄 **Usage in Apps**

### **vendemas-caja-mobile (Angular)**

```scss
// styles.scss
@use '@vendemas/shared-styles';

// Component-specific styles
.pos-component {
  @include heading(2);
  @include flex-center;
}
```

### **vendemas-landing-web (Next.js)**

```scss
// globals.css
@use '@vendemas/shared-styles/foundation';
@use '@vendemas/shared-styles/components';

.hero-section {
  @include heading(1);
  @include elevation(3);
}
```

## 🧪 **Development**

### **Adding New Styles**

1. **Foundation**: Add variables and mixins to `foundation/`
2. **Components**: Add component styles to `components/`
3. **Domain-specific**: Add to appropriate layer (`commerce/`, `vendor/`, etc.)
4. **Update index files**: Ensure new files are exported

### **Testing**

```bash
# Lint styles
nx lint vendemas-shared-styles

# Test compilation
nx test vendemas-shared-styles
```

## 📚 **Best Practices**

1. **Use Design Tokens**: Always use variables instead of hardcoded values
2. **Mobile First**: Write mobile styles first, then enhance for larger screens
3. **Semantic Naming**: Use descriptive class names that reflect purpose
4. **Accessibility First**: Ensure all styles support accessibility requirements
5. **Performance**: Keep styles lightweight and avoid unnecessary specificity

## 🔗 **Related Documentation**

- [VendeMás Design System Guide](./docs/design-system-guide.md)
- [Component Library](./docs/components.md)
- [Theme System](./docs/themes.md)
- [Accessibility Guidelines](./docs/accessibility.md)

## 📄 **License**

This design system is proprietary to VendeMás and is part of the ubro-apps-org monorepo.
