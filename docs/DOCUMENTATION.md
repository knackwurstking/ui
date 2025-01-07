# Documentation

- [ ] Add missing button documentation, special attributes like variant or color and what is with icons

<!--toc:start-->

- [Documentation](#documentation)
  - [JavaScript](#javascript)
  - [CSS/Sass](#csssass)
    - [Theme variables (dark/light schemes)](#theme-variables-darklight-schemes)
    - [Utility classes](#utility-classes)
    - [Components](#components)
      - [UI App Bar](#ui-app-bar)
      - [UI Container](#ui-container)
      - [UI Drawer](#ui-drawer)
      - [UI Flex Grid](#ui-flex-grid)
      - [UI Spinner](#ui-spinner)

<!--toc:end-->

> Just some quick and dirty documentation.

## JavaScript

`window.ui` [dist/ui.min.umd.cjs](dist/ui.min.umd.cjs)

```typescript
interface UI {
    draggable: {
        createNative: (
            container: HTMLElement,
            child: HTMLElement,
            options?: DraggableNativeOptions,
        ) => CleanUpFunction;

        createMobile: (container: HTMLElement, options?: DraggableNativeOptions) => CleanUpFunction;
    };

    ripple: {
        create: (target: HTMLElement, options?: RippleOptions) => CleanUpFunction;
    };

    router: {
        hash: (routes: { [key: string]: Route }) => void;
    };

    Events: Events<{ [key: string]: any }>;
    Store: Store<{ [key: string]: any }>;
    LanguageHandler: LanguageHandler;

    isAndroid: () => boolean;
    styles: (style: CSSStyleDeclaration) => string;
}
```

Or use [dist/ui.min.js](dist//ui.min.js)

## CSS/Sass

### Theme variables (dark/light schemes)

```css
:root {
    --ui-font-family: "Recursive", sans-serif;
    --ui-font-size: 1rem;
    --ui-line-height: 1.5;
    --ui-line-height-code: 1.25;
    --ui-border-width: 1px;
    --ui-border-style: solid;
    --ui-radius: 0.25rem;
    --ui-spacing: 0.5rem;
    --ui-app-bar-height: 3rem;
    --ui-dialog-header-height: 2.5rem;
    --ui-dialog-footer-height: 3rem;
}

[data-theme="light"],
:root {
    --ui-bg: hsl(240, 10%, 98%);
    --ui-text: hsl(240, 10%, 4%);
    --ui-primary: hsl(240, 10%, 26%);
    --ui-primary-text: hsl(240, 10%, 98%);
    --ui-primary--hover: hsl(240, 10%, 31%);
    --ui-primary--active: hsl(240, 10%, 36%);
    --ui-secondary: hsl(240, 10%, 65%);
    --ui-secondary-text: hsl(240, 10%, 4%);
    --ui-secondary--hover: hsl(240, 10%, 60%);
    --ui-secondary--active: hsl(240, 10%, 55%);
    --ui-destructive: #dc2828;
    --ui-destructive-text: #fee2e2;
    --ui-destructive--hover: rgb(223.57, 61.93, 61.93);
    --ui-destructive--active: rgb(227.14, 83.86, 83.86);
    --ui-muted: hsl(240, 10%, 78%);
    --ui-muted-text: hsl(240, 10%, 19%);
    --ui-info: hsl(240, 10%, 88%);
    --ui-info-text: hsl(240, 10%, 4%);
    --ui-warning: #b37614;
    --ui-warning-text: #f9f2c8;
    --ui-error: #dc2828;
    --ui-error-text: #fee2e2;
    --ui-backdrop-color: rgba(249.39, 249.39, 250.41, 0.75);
    --ui-border-color: hsl(240, 10%, 84%);
    background-color: hsl(240, 10%, 98%);
    color: hsl(240, 10%, 4%);
    color-scheme: light;
}

[data-theme="dark"] {
    --ui-bg: hsl(240, 10%, 4%);
    --ui-text: hsl(240, 10%, 98%);
    --ui-primary: hsl(240, 10%, 84%);
    --ui-primary-text: hsl(240, 10%, 4%);
    --ui-primary--hover: hsl(240, 10%, 89%);
    --ui-primary--active: hsl(240, 10%, 94%);
    --ui-secondary: hsl(240, 10%, 46%);
    --ui-secondary-text: hsl(240, 10%, 98%);
    --ui-secondary--hover: hsl(240, 10%, 51%);
    --ui-secondary--active: hsl(240, 10%, 56%);
    --ui-destructive: #f87171;
    --ui-destructive-text: #7f1d1d;
    --ui-destructive--hover: rgb(249.1979865772, 137.3020134228, 137.3020134228);
    --ui-destructive--active: rgb(250.3959731544, 161.6040268456, 161.6040268456);
    --ui-muted: hsl(240, 10%, 24%);
    --ui-muted-text: hsl(240, 10%, 83%);
    --ui-info: hsl(240, 10%, 14%);
    --ui-info-text: hsl(240, 10%, 98%);
    --ui-warning: #e7b428;
    --ui-warning-text: #693a1a;
    --ui-error: #f87171;
    --ui-error-text: #7f1d1d;
    --ui-backdrop-color: rgba(9.18, 9.18, 11.22, 0.75);
    --ui-border-color: hsl(240, 10%, 34%);
    background-color: hsl(240, 10%, 4%);
    color: hsl(240, 10%, 98%);
    color-scheme: dark;
}

@media only screen and (prefers-color-scheme: dark) {
    [data-theme="auto"] {
        --ui-bg: hsl(240, 10%, 4%);
        --ui-text: hsl(240, 10%, 98%);
        --ui-primary: hsl(240, 10%, 84%);
        --ui-primary-text: hsl(240, 10%, 4%);
        --ui-primary--hover: hsl(240, 10%, 89%);
        --ui-primary--active: hsl(240, 10%, 94%);
        --ui-secondary: hsl(240, 10%, 46%);
        --ui-secondary-text: hsl(240, 10%, 98%);
        --ui-secondary--hover: hsl(240, 10%, 51%);
        --ui-secondary--active: hsl(240, 10%, 56%);
        --ui-destructive: #f87171;
        --ui-destructive-text: #7f1d1d;
        --ui-destructive--hover: rgb(249.1979865772, 137.3020134228, 137.3020134228);
        --ui-destructive--active: rgb(250.3959731544, 161.6040268456, 161.6040268456);
        --ui-muted: hsl(240, 10%, 24%);
        --ui-muted-text: hsl(240, 10%, 83%);
        --ui-info: hsl(240, 10%, 14%);
        --ui-info-text: hsl(240, 10%, 98%);
        --ui-warning: #e7b428;
        --ui-warning-text: #693a1a;
        --ui-error: #f87171;
        --ui-error-text: #7f1d1d;
        --ui-backdrop-color: rgba(9.18, 9.18, 11.22, 0.75);
        --ui-border-color: hsl(240, 10%, 34%);
        background-color: hsl(240, 10%, 4%);
        color: hsl(240, 10%, 98%);
        color-scheme: dark;
    }
}
```

### Utility classes

**\_border.scss**:

- `.ui-border`

**\_color.scss**:

- `.ui-backdrop`
- `.ui-primary`
- `.ui-secondary`
- `.ui-destructive`
  `.ui-muted`

**\_debug.scss**:

- `.ui-debug`

**\_flex.scss**:

- `.ui-flex`
  - `.inline`
  - `.wrap`
  - `.nowrap`
  - `.row`
    - `.reverse`
  - `.column`
    - `.reverse`
  - `.align-center`
  - `.align-start`
  - `.align-end`
  - `.justify-center`
  - `.justify-start`
  - `.justify-end`
  - `.justify-evenly`
  - `.justify-around`
  - `.justify-between`

**\_isolation.scss**:

- `.ui-isolate`

**\_scroll.scss**:

- `.ui-auto-scroll`
- `.ui-auto-scroll-x`
- `.ui-auto-scroll-y`
- `.ui-hide-scrollbar`

**\_text.scss**:

- `.ui-outline-text`
- `.ui-ellipsis`

**\_touch.scss**:

- `.ui-disable-touch`

**\_user-select.scss**:

- `.ui-none-select`

### Components

#### UI App Bar

- `.ui-app-bar`

**Attributes**:

- `&[position="top"]`
- `&[position="bottom"]`
- `&[fixed]`

**Children**:

- `& > .left, & > .center, & > .right`

#### UI Container

- `.ui-container`

**Classes**:

- `&.fluid`

#### UI Drawer

- `.ui-drawer`

**Attributes**:

- `&[open]`

Container used for (outside) background [optional]

> Should be set before the `.ui-drawer` container

- `.ui-drawer-backdrop`

#### UI Flex Grid

- `.ui-flex-grid`
- `.ui-flex-grid-row`
- `.ui-flex-grid-item`

#### UI Spinner

- `.ui-spinner`
