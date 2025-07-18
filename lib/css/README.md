# CSS Library Documentation

A comprehensive, modern CSS framework built with CSS custom properties, designed for accessibility and beautiful user interfaces.

## Overview

This CSS library provides a complete styling system with:

- **Modern color palette** with support for light/dark themes
- **Accessible focus management** and keyboard navigation
- **Semantic component styling** for HTML elements
- **Utility classes** for rapid development
- **Variable font integration** with Recursive font family

## Getting Started

### Installation

Import the main CSS file in your project:

```css
@import "path/to/lib/css/main.css";
```

Or include individual components as needed:

```css
@import "path/to/lib/css/themes/default.css";
@import "path/to/lib/css/components/button.css";
```

### Basic Usage

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="path/to/lib/css/main.css" />
    </head>
    <body>
        <button class="primary">Primary Button</button>
        <button class="success outline">Success Outline</button>
        <div class="flex gap align-center">
            <span class="text-lg text-semibold">Hello World</span>
        </div>
    </body>
</html>
```

## Color System

### Color Palette

The library uses a sophisticated HSL-based color system with semantic naming:

```css
/* Base colors (50-950 scale) */
--ui-color-50   /* Lightest */
--ui-color-100
--ui-color-200
/* ... */
--ui-color-900
--ui-color-950  /* Darkest */
```

### Semantic Colors

| Color              | Light Mode                | Dark Mode                 | Usage                             |
| ------------------ | ------------------------- | ------------------------- | --------------------------------- |
| `--ui-primary`     | `hsl(210, 85%, 55%)`      | `hsl(210, 90%, 68%)`      | Primary actions, links            |
| `--ui-secondary`   | Based on `--ui-color-400` | Based on `--ui-color-500` | Secondary actions                 |
| `--ui-success`     | `hsl(140, 85%, 55%)`      | `hsl(140, 75%, 65%)`      | Success states                    |
| `--ui-warning`     | `hsl(42, 95%, 58%)`       | `hsl(42, 90%, 65%)`       | Warning states                    |
| `--ui-destructive` | `hsl(0, 85%, 60%)`        | `hsl(0, 85%, 72%)`        | Error states, destructive actions |
| `--ui-muted`       | `hsl(220, 12%, 85%)`      | `hsl(220, 18%, 15%)`      | Muted text, disabled states       |

### Theme Support

The library automatically adapts to system preferences:

```css
/* Automatically switches based on prefers-color-scheme */
@media (prefers-color-scheme: dark) {
    /* Dark theme colors */
}

/* Manual theme override */
[data-theme="light"] {
    /* Light theme */
}
[data-theme="dark"] {
    /* Dark theme */
}
```

## Components

### Buttons

```html
<!-- Color variants -->
<button class="primary">Primary</button>
<button class="secondary">Secondary</button>
<button class="success">Success</button>
<button class="warning">Warning</button>
<button class="destructive">Destructive</button>

<!-- Style variants -->
<button class="primary outline">Primary Outline</button>
<button class="secondary ghost">Secondary Ghost</button>

<!-- Role-based buttons -->
<div role="button" class="primary">Custom Button</div>
```

### Forms

```html
<!-- Text inputs -->
<input type="text" placeholder="Enter text" />
<textarea placeholder="Enter description"></textarea>

<!-- Validation states -->
<input type="email" aria-invalid="true" placeholder="Invalid email" />
<input type="text" aria-invalid="false" placeholder="Valid input" />

<!-- Select dropdown -->
<select>
    <option>Option 1</option>
    <option>Option 2</option>
</select>

<!-- Range slider -->
<input type="range" min="0" max="100" value="50" />
```

### Layout Components

```html
<!-- App Bar -->
<div class="app-bar top fixed">
    <div class="app-bar-left">
        <button class="ghost">Menu</button>
    </div>
    <div class="app-bar-center">
        <h1>App Title</h1>
    </div>
    <div class="app-bar-right">
        <button class="ghost">Settings</button>
    </div>
</div>

<!-- Container -->
<div class="container">
    <p>Centered content with max-width</p>
</div>

<!-- Drawer -->
<div class="drawer">
    <nav>Navigation content</nav>
</div>

<!-- Spinner -->
<div class="spinner"></div>

<!-- Card -->
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Card Title</h3>
        <p class="card-subtitle">Optional subtitle</p>
    </div>
    <div class="card-body">
        <p class="card-description">Card content goes here.</p>
    </div>
    <div class="card-footer">
        <div class="card-actions">
            <button class="primary">Action</button>
            <button class="secondary outline">Cancel</button>
        </div>
    </div>
</div>
```

### Cards

```html
<!-- Basic card -->
<div class="card">
    <div class="card-body">
        <h3 class="card-title">Basic Card</h3>
        <p class="card-description">Simple card content.</p>
    </div>
</div>

<!-- Card with image -->
<div class="card">
    <img src="image.jpg" alt="Card image" class="card-image aspect-video" />
    <div class="card-body">
        <h3 class="card-title">Image Card</h3>
        <p class="card-description">Card with header image.</p>
        <div class="card-actions">
            <button class="primary">Learn More</button>
        </div>
    </div>
</div>

<!-- Card variants -->
<div class="card elevated">Elevated card with shadow</div>
<div class="card flat">Flat card without border</div>
<div class="card outlined">Outlined card with thick border</div>

<!-- Interactive card -->
<div class="card interactive" tabindex="0">
    <div class="card-body">
        <h3 class="card-title">Clickable Card</h3>
        <p class="card-description">This card can be clicked or focused.</p>
    </div>
</div>

<!-- Horizontal card layout -->
<div class="card horizontal">
    <img src="image.jpg" alt="Card image" class="card-image" />
    <div class="card-content">
        <div class="card-body">
            <h3 class="card-title">Horizontal Card</h3>
            <p class="card-description">Side-by-side layout.</p>
        </div>
    </div>
</div>

<!-- Card grid -->
<div class="card-grid">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
</div>

<!-- Color variants -->
<div class="card primary">
    <div class="card-header">
        <h3 class="card-title">Primary Card</h3>
    </div>
</div>
```

### Dialogs & Modals

```html
<!-- Modal dialog -->
<dialog open>
    <h2>Dialog Title</h2>
    <p>Dialog content goes here.</p>
    <button>Close</button>
</dialog>

<!-- Fullscreen dialog -->
<dialog class="fullscreen">
    <div class="content">Fullscreen content</div>
</dialog>
```

## Utility Classes

### Layout & Flexbox

```html
<!-- Flex container -->
<div class="flex gap align-center justify-between">
    <div class="flex-item">Item 1</div>
    <div class="flex-item">Item 2</div>
</div>

<!-- Flex directions -->
<div class="flex column">Vertical layout</div>
<div class="flex row reverse">Reversed row</div>

<!-- Flex utilities -->
<div class="flex wrap">Wrapping flex container</div>
<div class="flex align-start justify-end">Custom alignment</div>
```

### Typography

```html
<!-- Font sizes -->
<span class="text-xs">Extra small text</span>
<span class="text-sm">Small text</span>
<span class="text-base">Base text</span>
<span class="text-lg">Large text</span>
<span class="text-xl">Extra large text</span>

<!-- Font weights -->
<span class="text-light">Light text</span>
<span class="text-normal">Normal text</span>
<span class="text-semibold">Semibold text</span>
<span class="text-bold">Bold text</span>

<!-- Text alignment -->
<p class="text-left">Left aligned</p>
<p class="text-center">Center aligned</p>
<p class="text-right">Right aligned</p>

<!-- Text transform -->
<span class="text-uppercase">UPPERCASE</span>
<span class="text-lowercase">lowercase</span>
<span class="text-capitalize">Capitalized</span>

<!-- Text overflow -->
<p class="truncate">This text will be truncated with ellipsis...</p>
<p class="ellipsis">Legacy ellipsis class</p>
```

### Colors

```html
<!-- Background colors -->
<div class="primary">Primary background</div>
<div class="success">Success background</div>
<div class="warning">Warning background</div>

<!-- Text colors (ghost variant) -->
<span class="primary ghost">Primary text color</span>
<span class="destructive ghost">Destructive text color</span>

<!-- Special effects -->
<div class="backdrop">Backdrop with blur effect</div>
```

### Borders

```html
<!-- Full border -->
<div class="border">All borders</div>

<!-- Individual borders -->
<div class="border-top">Top border only</div>
<div class="border-right">Right border only</div>
<div class="border-bottom">Bottom border only</div>
<div class="border-left">Left border only</div>
```

### Spacing & Sizing

The library uses a consistent spacing system based on `--ui-spacing` (default: 0.5rem):

```css
/* Common spacing values */
padding: var(--ui-spacing); /* 0.5rem */
padding: calc(var(--ui-spacing) * 2); /* 1rem */
margin: calc(var(--ui-spacing) / 2); /* 0.25rem */
```

## Accessibility Features

### Focus Management

The library provides comprehensive focus styles for keyboard navigation:

```css
/* Automatic focus-visible support */
*:focus-visible {
    outline: 2px solid var(--ui-primary);
    outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    *:focus-visible {
        outline: 3px solid var(--ui-primary);
        outline-offset: 3px;
    }
}
```

### Reduced Motion

```css
/* Respects user motion preferences */
@media (prefers-reduced-motion: reduce) {
    *:focus-visible {
        transition: none;
    }
}
```

### ARIA Support

```html
<!-- Form validation -->
<input type="email" aria-invalid="true" />
<!-- Red border -->
<input type="text" aria-invalid="false" />
<!-- Green border -->

<!-- Disabled states -->
<button disabled>Disabled Button</button>
<!-- Automatically styled -->
```

## Customization

### CSS Custom Properties

Override default values by setting custom properties:

```css
:root {
    /* Spacing */
    --ui-spacing: 0.75rem;

    /* Typography */
    --ui-font-size: 1.125rem;
    --ui-line-height: 1.6;

    /* Colors (override specific colors) */
    --ui-primary: hsl(260, 80%, 55%);

    /* Borders */
    --ui-radius: 0.5rem;
    --ui-border-width: 2px;
}
```

### Variable Fonts

Customize the Recursive font settings:

```css
.custom-text {
    --mono: 0; /* 0 = Sans, 1 = Mono */
    --casl: 1; /* 0 = Linear, 1 = Casual */
    --wght: 500; /* 300-1000 */
    --slnt: -5; /* -15 to 0 */
    --CRSV: 0.5; /* 0 to 1 */
}
```

## Architecture

### File Structure

```
lib/css/
├── main.css              # Main entry point
├── reset.css             # CSS reset
├── global.css            # Global styles & focus management
├── themes/
│   └── default.css       # Color theme & variables
├── components/
│   ├── app-bar.css       # App bar component
│   ├── card.css          # Card component
│   ├── container.css     # Container component
│   ├── drawer.css        # Drawer component
│   └── spinner.css       # Loading spinner
├── html/
│   ├── button.css        # Button styling
│   ├── input.css         # Form inputs
│   ├── select.css        # Select dropdown
│   ├── dialog.css        # Modal dialogs
│   └── ...               # Other HTML elements
└── utils/
    ├── flex.css          # Flexbox utilities
    ├── text.css          # Typography utilities
    ├── color.css         # Color utilities
    ├── border.css        # Border utilities
    └── ...               # Other utilities
```

### Import Order

The CSS files are imported in a specific order to ensure proper cascading:

1. **Theme** - Color variables and theme setup
2. **Reset** - CSS reset and normalization
3. **Global** - Global styles and focus management
4. **Components** - Reusable component styles
5. **Utils** - Utility classes
6. **HTML** - HTML element styling (buttons last)

## Browser Support

- **Modern browsers** with CSS custom properties support
- **Focus-visible** support (with fallback to :focus)
- **CSS Grid and Flexbox** support required
- **Variable fonts** support recommended (fallback provided)

## Examples

### Card Component

```html
<div class="card elevated">
    <div class="card-header">
        <h3 class="card-title">Product Card</h3>
        <p class="card-subtitle">Premium Collection</p>
    </div>
    <img src="product.jpg" alt="Product" class="card-image aspect-video" />
    <div class="card-body">
        <p class="card-description">
            High-quality product with exceptional features and design.
        </p>
        <p class="card-meta">In stock • Free shipping</p>
    </div>
    <div class="card-footer">
        <div class="card-actions between">
            <span class="text-lg text-bold">$99.99</span>
            <div class="flex gap">
                <button class="success">Add to Cart</button>
                <button class="secondary outline">Details</button>
            </div>
        </div>
    </div>
</div>
```

### Form Example

```html
<form class="flex column gap">
    <label for="name">Name</label>
    <input type="text" id="name" placeholder="Enter your name" />

    <label for="email">Email</label>
    <input type="email" id="email" placeholder="Enter your email" />

    <div class="flex gap">
        <button type="submit" class="success">Submit</button>
        <button type="reset" class="destructive outline">Reset</button>
    </div>
</form>
```

### Navigation Bar

```html
<nav class="app-bar top fixed">
    <div class="app-bar-left">
        <h1 class="text-xl text-bold">App Name</h1>
    </div>
    <div class="app-bar-right">
        <div class="flex gap">
            <button class="ghost">Home</button>
            <button class="ghost">About</button>
            <button class="primary">Sign In</button>
        </div>
    </div>
</nav>
```

## Contributing

When adding new styles:

1. **Follow the naming convention** using BEM-like methodology
2. **Use CSS custom properties** for configurable values
3. **Include focus states** for interactive elements
4. **Test in both light and dark themes**
5. **Ensure accessibility compliance**
6. **Update this documentation** for new features

## License

This CSS library is part of the UI framework and follows the same licensing terms.
