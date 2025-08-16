# Design Tokens Guide

This guide explains how to use semantic design tokens instead of direct color classes for better maintainability and theme consistency.

## 🎯 **Why Use Design Tokens?**

### **Before (Direct Colors)**

```html
<!-- ❌ Bad: Direct color classes -->
<div class="bg-green-500 text-black">Success Message</div>
<button class="bg-blue-600 text-white">Info Button</button>
<div class="bg-red-500 text-white">Error Alert</div>
```

### **After (Semantic Tokens)**

```html
<!-- ✅ Good: Semantic design tokens -->
<div class="bg-success text-success-on">Success Message</div>
<button class="bg-info text-info-on">Info Button</button>
<div class="bg-error text-error-on">Error Alert</div>
```

## 🌈 **Available Design Tokens**

### **Brand Colors**

| Token               | Light Theme | Dark Theme | Usage                             |
| ------------------- | ----------- | ---------- | --------------------------------- |
| `bg-primary`        | #4CAF50     | #A5D6A7    | Main brand color, primary actions |
| `text-primary-on`   | #000000     | #0C3D0F    | Text on primary backgrounds       |
| `bg-secondary`      | #1E3A5F     | #99B3D4    | Secondary actions, accents        |
| `text-secondary-on` | #FFFFFF     | #0B1A2C    | Text on secondary backgrounds     |
| `bg-tertiary`       | #F4B942     | #FAD77D    | Highlights, warnings, attention   |
| `text-tertiary-on`  | #000000     | #3E2C00    | Text on tertiary backgrounds      |

### **Semantic Colors**

| Token             | Maps To             | Usage                         |
| ----------------- | ------------------- | ----------------------------- |
| `bg-success`      | `bg-primary`        | Success states, confirmations |
| `text-success-on` | `text-primary-on`   | Text on success backgrounds   |
| `bg-warning`      | `bg-tertiary`       | Warning states, cautions      |
| `text-warning-on` | `text-tertiary-on`  | Text on warning backgrounds   |
| `bg-error`        | `bg-error`          | Error states, failures        |
| `text-error-on`   | `text-error-on`     | Text on error backgrounds     |
| `bg-info`         | `bg-secondary`      | Information, neutral states   |
| `text-info-on`    | `text-secondary-on` | Text on info backgrounds      |

### **Surface & Background**

| Token                     | Light Theme      | Dark Theme             | Usage                        |
| ------------------------- | ---------------- | ---------------------- | ---------------------------- |
| `bg-surface`              | #FFFFFF          | #1E1E1E                | Card backgrounds, containers |
| `bg-surface-variant`      | #F5F5F5          | #2D2D2D                | Secondary containers         |
| `text-on-surface`         | rgba(0,0,0,0.87) | rgba(255,255,255,0.87) | Primary text on surfaces     |
| `text-on-surface-variant` | rgba(0,0,0,0.6)  | rgba(255,255,255,0.6)  | Secondary text on surfaces   |
| `bg-background`           | #FFFFFF          | #121212                | Page backgrounds             |
| `text-on-background`      | rgba(0,0,0,0.87) | rgba(255,255,255,0.87) | Text on page backgrounds     |

### **Interactive States**

| Token                | Light Theme          | Dark Theme             | Usage           |
| -------------------- | -------------------- | ---------------------- | --------------- |
| `bg-state-hover`     | rgba(0,0,0,0.04)     | rgba(255,255,255,0.04) | Hover states    |
| `bg-state-focus`     | rgba(76,175,80,0.12) | rgba(165,214,167,0.12) | Focus states    |
| `bg-state-selected`  | rgba(76,175,80,0.08) | rgba(165,214,167,0.08) | Selected states |
| `bg-state-activated` | rgba(76,175,80,0.12) | rgba(165,214,167,0.12) | Active states   |

### **Elevation & Shadows**

| Token         | Light Theme   | Dark Theme    | Usage                  |
| ------------- | ------------- | ------------- | ---------------------- |
| `elevation-1` | 0 1px 3px 1px | 0 1px 3px 1px | Cards, basic elevation |
| `elevation-2` | 0 2px 6px 2px | 0 2px 6px 2px | Hovered cards, buttons |
| `elevation-3` | 0 4px 8px 3px | 0 4px 8px 3px | Modals, dropdowns      |

## 🚀 **Usage Examples**

### **Buttons**

```html
<!-- Primary Action -->
<button class="bg-primary text-primary-on px-4 py-2 rounded-lg interactive">
  Save Changes
</button>

<!-- Secondary Action -->
<button class="bg-secondary text-secondary-on px-4 py-2 rounded-lg interactive">
  Cancel
</button>

<!-- Success State -->
<button class="bg-success text-success-on px-4 py-2 rounded-lg interactive">
  Confirm
</button>

<!-- Warning State -->
<button class="bg-warning text-warning-on px-4 py-2 rounded-lg interactive">
  Proceed with Caution
</button>

<!-- Error State -->
<button class="bg-error text-error-on px-4 py-2 rounded-lg interactive">
  Delete
</button>
```

### **Cards & Containers**

```html
<!-- Basic Card -->
<div class="bg-surface text-on-surface p-6 rounded-lg elevation-1">
  <h3 class="text-lg font-semibold mb-2">Card Title</h3>
  <p class="text-on-surface-variant">Card content goes here.</p>
</div>

<!-- Interactive Card -->
<div class="bg-surface text-on-surface p-6 rounded-lg elevation-1 interactive">
  <h3 class="text-lg font-semibold mb-2">Clickable Card</h3>
  <p class="text-on-surface-variant">This card has hover effects.</p>
</div>

<!-- Surface Variant -->
<div class="bg-surface-variant text-on-surface-variant p-4 rounded-lg">
  <p>Secondary information container.</p>
</div>
```

### **Form Elements**

```html
<!-- Input Field -->
<div class="bg-surface border border-outline rounded-lg p-3">
  <input
    type="text"
    class="w-full bg-transparent text-on-surface placeholder-on-surface-variant"
    placeholder="Enter your name"
  />
</div>

<!-- Focused Input -->
<div class="bg-surface border-2 border-primary rounded-lg p-3">
  <input
    type="text"
    class="w-full bg-transparent text-on-surface"
    value="Focused input"
  />
</div>
```

### **Status Indicators**

```html
<!-- Success Message -->
<div class="bg-success text-success-on p-4 rounded-lg">
  <p>✅ Your changes have been saved successfully!</p>
</div>

<!-- Warning Message -->
<div class="bg-warning text-warning-on p-4 rounded-lg">
  <p>⚠️ Please review your input before proceeding.</p>
</div>

<!-- Error Message -->
<div class="bg-error text-error-on p-4 rounded-lg">
  <p>❌ An error occurred while processing your request.</p>
</div>

<!-- Info Message -->
<div class="bg-info text-info-on p-4 rounded-lg">
  <p>ℹ️ Here's some helpful information for you.</p>
</div>
```

### **Navigation Elements**

```html
<!-- Active Navigation Item -->
<a href="#" class="bg-primary text-primary-on px-4 py-2 rounded-lg">
  Dashboard
</a>

<!-- Inactive Navigation Item -->
<a
  href="#"
  class="text-on-surface-variant px-4 py-2 rounded-lg hover:bg-state-hover interactive"
>
  Settings
</a>

<!-- Breadcrumb -->
<nav class="flex" aria-label="Breadcrumb">
  <ol class="flex items-center space-x-2">
    <li>
      <a href="#" class="text-primary hover:underline interactive">Home</a>
    </li>
    <li class="text-on-surface-variant">/</li>
    <li>
      <a href="#" class="text-primary hover:underline interactive">Products</a>
    </li>
    <li class="text-on-surface-variant">/</li>
    <li class="text-on-surface" aria-current="page">Details</li>
  </ol>
</nav>
```

## 🎨 **Interactive Utilities**

### **Interactive Class**

The `interactive` class provides consistent hover and active states:

```html
<button class="bg-primary text-primary-on px-4 py-2 rounded-lg interactive">
  Interactive Button
</button>
```

This automatically adds:

- `cursor: pointer`
- Smooth transitions
- Hover elevation increase
- Active state feedback

### **State Classes**

```html
<!-- Hover State -->
<div class="bg-surface hover:bg-state-hover p-4 rounded-lg">Hover me!</div>

<!-- Focus State -->
<div class="bg-surface focus:bg-state-focus p-4 rounded-lg">Focus me!</div>

<!-- Selected State -->
<div class="bg-surface selected:bg-state-selected p-4 rounded-lg">
  Selected item
</div>
```

## 🔄 **Theme Switching Benefits**

### **Automatic Adaptation**

When you switch themes, all semantic tokens automatically adapt:

```html
<!-- This button automatically changes colors based on theme -->
<button class="bg-success text-success-on px-4 py-2 rounded-lg">
  Success Button
</button>
```

**Light Theme**: Green background with black text
**Dark Theme**: Light green background with dark green text

### **No Manual Updates Needed**

You don't need to change any classes when switching themes - the tokens handle it automatically.

## 📱 **Responsive Design**

### **Mobile-First Approach**

```html
<!-- Responsive card with proper spacing -->
<div
  class="bg-surface text-on-surface p-4 md:p-6 lg:p-8 rounded-lg elevation-1"
>
  <h3 class="text-base md:text-lg lg:text-xl font-semibold mb-2">
    Responsive Title
  </h3>
  <p class="text-sm md:text-base text-on-surface-variant">
    Responsive content.
  </p>
</div>
```

### **Breakpoint Considerations**

- **Mobile**: Compact spacing, smaller text
- **Tablet**: Medium spacing, standard text
- **Desktop**: Generous spacing, larger text

## ♿ **Accessibility Features**

### **High Contrast Support**

All tokens automatically adapt to high contrast mode:

```html
<!-- Automatically becomes high contrast in high contrast mode -->
<div class="bg-success text-success-on p-4 rounded-lg">
  High contrast compliant
</div>
```

### **Reduced Motion Support**

Interactive elements respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  .interactive {
    transition: none;
  }
}
```

## 🧪 **Testing Your Tokens**

### **Theme Switching Test**

1. Switch between light and dark themes
2. Verify all semantic tokens adapt correctly
3. Check that contrast ratios remain accessible

### **High Contrast Test**

1. Enable high contrast mode in your OS
2. Verify tokens adapt appropriately
3. Ensure text remains readable

### **Responsive Test**

1. Test on various screen sizes
2. Verify spacing and typography scale properly
3. Check interactive states work on touch devices

## 🚨 **Common Mistakes to Avoid**

### **❌ Don't Use Direct Colors**

```html
<!-- Bad: Direct color classes -->
<div class="bg-green-500 text-black">Success</div>
<div class="bg-red-500 text-white">Error</div>
```

### **❌ Don't Mix Tokens and Direct Colors**

```html
<!-- Bad: Inconsistent approach -->
<div class="bg-success text-black">Mixed approach</div>
```

### **✅ Do Use Consistent Tokens**

```html
<!-- Good: Consistent semantic tokens -->
<div class="bg-success text-success-on">Success</div>
<div class="bg-error text-error-on">Error</div>
```

## 🔮 **Future Enhancements**

### **Custom Token Creation**

```scss
// In your theme file
:root {
  --vendemas-custom: #your-color;
  --vendemas-custom-on: #your-on-color;
}
```

### **Token Variants**

```scss
:root {
  --vendemas-primary-light: #lighter-variant;
  --vendemas-primary-dark: #darker-variant;
}
```

### **Animation Tokens**

```scss
:root {
  --vendemas-transition-fast: 0.15s ease-in-out;
  --vendemas-transition-normal: 0.3s ease-in-out;
  --vendemas-transition-slow: 0.5s ease-in-out;
}
```

## 📚 **Resources**

- [Material Design 3 Guidelines](https://m3.material.io/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Design Tokens Best Practices](https://www.designtokens.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

Remember: **Always use semantic design tokens instead of direct color classes for better maintainability, accessibility, and theme consistency!**
