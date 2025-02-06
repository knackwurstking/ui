# Documentation

- [ ] Add new css icons

<!--toc:start-->

- [Documentation](#documentation)
  - [JavaScript](#javascript)
  - [Special SVGs](#special-svgs)
  - [CSS: Theme Variables](#css-theme-variables)
  - [CSS: Icons](#css-icons)
    - [Chevron](#chevron)
    - [Settings](#settings)
    - [Menu/List](#menulist)
  - [CSS: Utilities](#css-utilities)
    - [Border](#border)
    - [Color](#color)
    - [Debug](#debug)
    - [Flex](#flex)
    - [Isolation](#isolation)
    - [Scroll](#scroll)
    - [Text](#text)
    - [Touch](#touch)
    - [user-select](#user-select)
  - [CSS: HTML Base Elements](#css-html-base-elements)
  - [CSS: Components](#css-components)
    - [UI App Bar](#ui-app-bar)
    - [UI Container](#ui-container)
    - [UI Drawer](#ui-drawer)
    - [UI Flex Grid](#ui-flex-grid)
    - [UI Spinner](#ui-spinner)

<!--toc:end-->

> Just some quick and dirty documentation.

## JavaScript

`window.ui` [dist/ui.min.umd.cjs](dist/ui.min.umd.cjs)

Just go to the console and do a `console.log(window.ui)`.

Or use [dist/ui.min.js](dist//ui.min.js)

## Special SVGs

- [/svg/power.svg](/svg/power.svg)

## CSS: Theme Variables

> Add this to whatever html element `data-theme="schemes"`
> schemes: dark/light/auto

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

## CSS: Icons

### Chevron

- `--ui-icon-chevron-up`
- `--ui-icon-chevron-right`
- `--ui-icon-chevron-down`
- `--ui-icon-chevron-left`

### Settings

- `--ui-icon-gear`

### Menu/List

- `--ui-icon-list`
- `--ui-icon-dots-vertical`

## CSS: Utilities

> All HTML Elements takes font variation settings from special CSS variables
>
> - `--mono`: 0..1
> - `--casl`: 0..1
> - `--wght`: 300..1000
> - `--slnt`: 0..-15
> - `--CRSV`: 0..1

### Border

- `.ui-border`

### Color

- `.ui-backdrop`
- `.ui-primary`
- `.ui-secondary`
- `.ui-destructive`
  `.ui-muted`

### Debug

- `.ui-debug`

### Flex

- `.ui-flex`

**Optional**:

- `&.inline`
- `&.wrap`
- `&.nowrap`
- `&.row`
  - `&.reverse`
- `&.column`
  - `&.reverse`
- `&.align-center`
- `&.align-start`
- `&.align-end`
- `&.justify-center`
- `&.justify-start`
- `&.justify-end`
- `&.justify-evenly`
- `&.justify-around`
- `&.justify-between`

### Isolation

- `.ui-isolate`

### Scroll

- `.ui-auto-scroll`
- `.ui-auto-scroll-x`
- `.ui-auto-scroll-y`
- `.ui-hide-scrollbar`

### Text

- `.ui-outline-text`
- `.ui-ellipsis`

### Touch

- `.ui-disable-touch`

### user-select

- `.ui-none-select`

---

## CSS: HTML Base Elements

- `<button`
  - **variant**: "full" | "outline" | "ghost"
  - **color**: "primary" | "secondary" | "destructive"
  - **icon**
- `<dialog`
  - **fullscreen**
- `<tr` or `<td`
  - **.left** or **.right**

---

## CSS: Components

### UI App Bar

**Component**:

- `.ui-app-bar`
  - `& > .left`: Should be the first children of `.ui-app-bar`
  - `& > .center`: The second
  - `& > .right`: And the last

**Special CSS Variables**:

- `--gap` defaults to `var(--ui-spacing)`, and so do the `.left`, `.center` and `.right` children

**Custom Attributes**:

- `&[position="top"]`
- `&[position="bottom"]`
- `&[fixed]`

### UI Container

**Component**:

- `.ui-container`

**Optional**:

- `&.fluid`

### UI Drawer

**Component**:

- `.ui-drawer`

**Special CSS Variables**:

- `--width` defaults to `fit-content`

**Custom Attributes**:

- `&[open]`

**Component**:

- `.ui-drawer-backdrop`

> Should be set before the `.ui-drawer` container
> (You can handle the outside click here, ex.: closing the drawer)

### UI Flex Grid

**Component**:

- `.ui-flex-grid`

**Special CSS Variables**:

- `--direction` defaults to `column`
- `--wrap` defaults to `nowrap`
- `--justify` defaults to `flex-start`
- `--align` defaults to `flex-start`
- `--gap` defaults to `var(--ui-spacing)`

**Component**:

- `.ui-flex-grid-row`

**Special CSS Variables**:

- `--direction` defaults to `column`
- `--wrap` defaults to `nowrap`
- `--justify` defaults to `flex-start`
- `--align` defaults to `flex-start`
- `--gap` defaults to `var(--ui-spacing)`

**Component**:

- `.ui-flex-grid-item`

**Special CSS Variables**:

- `--flex` defaults to `1`

### UI Spinner

**Component**:

- `.ui-spinner`
