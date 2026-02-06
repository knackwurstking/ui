# UI Components Documentation

This document provides comprehensive documentation for all CSS components in the UI library.

## Component Overview

The UI library includes a complete set of CSS components organized into several categories:

1. **Core Components** - Fundamental UI elements like buttons, cards, and forms
2. **Layout Components** - Structural elements like app bars, containers, and drawers
3. **Form Components** - Input elements including checkboxes, radio buttons, and switches
4. **Utility Components** - Supporting elements like progress indicators, toasts, and pagination

## Core Components

### Buttons

Buttons are the primary interactive elements in the UI.

#### Variants

- `primary` - Default action button
- `secondary` - Secondary actions
- `success` - Success states
- `warning` - Warning states
- `destructive` - Error states
- `info` - Informational actions

#### Style Variants

- `outline` - Outline style buttons
- `ghost` - Ghost style buttons (transparent background)
- `small`, `large` - Size variants

#### Usage

```html
<button class="primary">Primary Button</button>
<button class="secondary outline">Secondary Outline</button>
<button class="success small">Small Success</button>
```

### Cards

Cards are versatile containers that can display content in various layouts.

#### Variants

- `flat` - No border, muted background
- `outlined` - Thick border variant
- `elevated` - Default shadow variant
- `seamless` - No border or background in header/footer

#### Sizes

- `compact` - Tight padding
- `comfortable` - Default padding
- `spacious` - Generous padding

#### Color Variants

- `primary`, `secondary`, `success`, `warning`, `destructive`, `info`
- `contrast`, `muted` - For special cases

#### Layouts

- `horizontal` - Side-by-side content layout
- `media` - With image support and hover effects

### Forms

Form elements including inputs, selects, and interactive controls.

#### Input Types

- Text inputs (all HTML5 types)
- Textarea elements
- Select dropdowns
- Range sliders

#### Validation States

- `aria-invalid="true"` - Error state (red border)
- `aria-invalid="false"` - Success state (green border)

#### Color Variants

All form elements support color variants: `primary`, `secondary`, `success`, `warning`, `destructive`, `info`

## Layout Components

### App Bar

Top-level navigation container with flexible positioning.

#### Positions

- `top` - Top of viewport
- `bottom` - Bottom of viewport
- `fixed` - Fixed positioning

#### Layouts

- `left`, `center`, `right` - Content alignment

### Container

Centered content container with max-width.

#### Variants

- `fluid` - Full-width container (default)
- `narrow` - Narrow width container

### Drawer

Sliding panel component for navigation or content.

#### Positions

- `left`, `right` - Side drawer variants

### Spinner

Loading indicator with animated animation.

#### Sizes

- `small`, `medium`, `large` - Size variants

### Dialogs & Modals

Modal dialog components with various options.

#### Variants

- `fullscreen` - Fullscreen modal variant

## Form Components

### Checkboxes

Custom styled checkboxes with accessible interaction.

#### Variants

- `primary`, `secondary`, `success`, `warning`, `destructive`, `info`
- `small`, `large` - Size variants

#### Usage

```html
<div class="checkbox">
  <input type="checkbox" id="newsletter" />
  <label for="newsletter">Subscribe to newsletter</label>
</div>
```

### Radio Buttons

Grouped radio buttons with custom styling.

#### Variants

- `primary`, `secondary`, `success`, `warning`, `destructive`, `info`
- `small`, `large` - Size variants

#### Grouping

Radio buttons must be grouped by name attribute.

### Switches

Toggle switch component with modern styling.

#### Variants

- `primary`, `secondary`, `success`, `warning`, `destructive`, `info`
- `small`, `large` - Size variants

#### Usage

```html
<div class="switch">
  <input type="checkbox" id="notifications" />
  <label for="notifications">Enable Notifications</label>
</div>
```

## Utility Components

### Progress Indicators

Visual progress bars with multiple states.

#### Variants

- `primary`, `secondary`, `success`, `warning`, `destructive`, `info`
- `small`, `medium`, `large` - Size variants

#### States

- `indeterminate` - Animated loading state
- `determinate` - Percentage-based progress

### Toast Notifications

Floating notifications with dismiss capability.

#### Variants

- `success`, `warning`, `error`, `info`
- `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right` - Positioning

#### Actions

Supports action buttons in the toast.

### Pagination

Navigation component for paginated content.

#### Variants

- `compact` - Minimal spacing
- `large` - Large buttons

### Tabs

Tab navigation component with keyboard support.

#### Variants

- `primary`, `secondary`, `success`, `warning`, `destructive`, `info`

### Grid System

CSS Grid utilities for responsive layouts.

#### Columns

- `grid-cols-1` through `grid-cols-12` - Column count variants

#### Responsive Grids

- `sm:`, `md:`, `lg:`, `xl:` - Breakpoint prefixes

#### Spacing

- `gap-0`, `gap-sm`, `gap`, `gap-lg`, `gap-xl` - Spacing variants

### Responsive Utilities

Breakpoint-specific styling utilities.

#### Display

- `block-sm`, `inline-md`, `hidden-lg` - Responsive display properties

#### Typography

- `text-left-sm`, `text-center-md`, `text-right-lg` - Responsive text alignment

## Utility Classes

### Flexbox Utilities

Comprehensive flexbox styling utilities.

#### Direction

- `flex-row`, `flex-col`, `flex-row-reverse`, `flex-col-reverse`

#### Alignment

- `items-start`, `items-center`, `items-end`
- `justify-start`, `justify-center`, `justify-end`

#### Gap

- `gap-0`, `gap-sm`, `gap`, `gap-lg`, `gap-xl`

### Spacing Utilities

Consistent spacing system based on `--ui-spacing`.

#### Padding & Margin

- `p-0`, `p`, `p-sm`, `p-lg`, `p-xl`
- `px-0`, `py-0` - Axis-specific padding
- `m-0`, `m`, `m-sm`, `m-lg`, `m-xl`
- `mx-0`, `my-0` - Axis-specific margin

### Text Utilities

Typography and text formatting utilities.

#### Alignment

- `text-left`, `text-center`, `text-right`, `text-justify`

#### Size & Weight

- `text-xs` through `text-4xl`
- `text-thin`, `text-light`, `text-normal`, `text-medium`, `text-semibold`, `text-bold`, `text-extrabold`, `text-black`

#### Overflow

- `truncate` - Ellipsis text overflow
- `ellipsis` - Legacy ellipsis class

### Color Utilities

Background and text color utilities.

#### Base Colors

- `primary`, `secondary`, `success`, `warning`, `destructive`, `info`
- `contrast`, `muted`, `error` - Special color variants

#### Ghost & Outline Variants

- `.ghost` - Text-only styling (background transparent)
- `.outline` - Border and text coloring

### Shadow Utilities

Elevation and shadow effects.

#### Depth Levels

- `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`
- `shadow-inner` - Inner shadow variant

### Border Utilities

Border styling and customization.

#### Sides

- `border-top`, `border-right`, `border-bottom`, `border-left`

#### Width & Style

- `border`, `border-0` - Border width variants
- `border-dashed`, `border-dotted`, `border-solid`

## Accessibility Features

### Focus Management

- Complete `:focus-visible` support with proper outline styles
- High contrast mode detection and styling
- Reduced motion preference respect

### Keyboard Navigation

- All interactive elements support keyboard navigation
- Proper ARIA attributes for screen readers

### Semantic HTML Support

- Proper form element labeling
- Accessible button roles and states
- Content organization with semantic tags

## Responsive Design

The library includes comprehensive responsive utilities:

1. **Breakpoint Support** - `sm:`, `md:`, `lg:`, `xl:` prefixes for all utilities
2. **Mobile-First Approach** - Default styles optimized for mobile
3. **Flexible Grid System** - CSS Grid and Flexbox based layouts
4. **Adaptive Components** - Components that respond to screen size

## Theming

### Light/Dark Mode

- Automatic theme switching based on `prefers-color-scheme`
- Manual override with `data-theme="light"` or `data-theme="dark"`
- Comprehensive color palette for both modes

### Customization

CSS variables can be overridden to customize:

- Spacing (`--ui-spacing`)
- Typography (`--ui-font-size`, `--ui-line-height`)
- Colors (`--ui-primary`, etc.)
- Border radius (`--ui-radius`)
- Shadow effects (`--ui-shadow`)

## Performance Optimizations

### CSS Containment

- Proper use of `contain: layout style paint` for performance
- Efficient animation and transition usage
- Minimal DOM manipulation requirements

### Animation Handling

- Reduced motion support for accessibility
- Efficient keyframe animations where needed
- Proper `will-change` usage for interactive elements

## Browser Support

The library targets modern browsers with:

- CSS custom properties support
- `:focus-visible` support (with fallbacks)
- CSS Grid and Flexbox support
- Variable font support with fallbacks

## Migration Notes

When upgrading from previous versions:

1. Check for any deprecated utility classes
2. Verify form element styling matches new patterns
3. Ensure all new components are imported in `main.css`
4. Review accessibility enhancements and update accordingly

## Best Practices

1. **Consistent Naming** - Follow BEM-like naming conventions
2. **Accessibility First** - Always include proper ARIA attributes and keyboard support
3. **Responsive by Default** - Use responsive utilities for mobile-first design
4. **Performance Conscious** - Use containment and optimized animations
5. **Theme Consistency** - Maintain consistent color and spacing throughout the application

## Contributing

When adding new components:

1. Follow the existing naming and styling patterns
2. Include proper accessibility features
3. Test in both light and dark themes
4. Document all variants and usage examples
5. Update this documentation file with new components
