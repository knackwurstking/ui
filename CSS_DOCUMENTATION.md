# UI CSS Documentation

## Table of Contents

- [CSS Variables](#css-variables)
    - [Core Theme Variables](#core-theme-variables)
    - [Color Variables](#color-variables)
        - [Grayscale Colors](#grayscale-colors)
        - [Semantic Colors](#semantic-colors)
        - [Theme Colors](#theme-colors)
    - [Variable Font Settings](#variable-font-settings)
- [CSS Classes](#css-classes)
    - [Global Classes](#global-classes)
    - [Component Classes](#component-classes)
        - [App Bar Component](#app-bar-component)
        - [Card Component](#card-component)
            - [Card Variants](#card-variants)
            - [Card Sizes](#card-sizes)
            - [Card Colors](#card-colors)
            - [Card Actions Alignment](#card-actions-alignment)
            - [Card Image Aspects](#card-image-aspects)
            - [Card Grid Variants](#card-grid-variants)
        - [Container Component](#container-component)
        - [Drawer Component](#drawer-component)
        - [Spinner Component](#spinner-component)
    - [HTML Element Classes](#html-element-classes)
        - [Button Classes](#button-classes)
            - [Button Variants](#button-variants)
            - [Button Group](#button-group)
        - [Dialog Classes](#dialog-classes)
        - [Input/Form Classes](#inputform-classes)
        - [Select Classes](#select-classes)
    - [Utility Classes](#utility-classes)
        - [Flexbox Utilities](#flexbox-utilities)
            - [Display](#display)
            - [Direction](#direction)
            - [Wrap](#wrap)
            - [Alignment](#alignment)
            - [Justification](#justification)
            - [Gap](#gap)
            - [Flex Properties](#flex-properties)
        - [Spacing Utilities](#spacing-utilities)
            - [Padding](#padding)
            - [Margin](#margin)
            - [Width](#width)
            - [Height](#height)
            - [Min/Max Width](#minmax-width)
            - [Min/Max Height](#minmax-height)
            - [Aspect Ratio](#aspect-ratio)
            - [Position](#position)
            - [Position Values](#position-values)
            - [Z-Index](#z-index)
            - [Display](#display-1)
            - [Visibility & Opacity](#visibility--opacity)
        - [Text Utilities](#text-utilities)
            - [Text Alignment](#text-alignment)
            - [Text Transform](#text-transform)
            - [Font Size](#font-size)
            - [Font Weight](#font-weight)
            - [Font Style](#font-style)
            - [Line Height](#line-height)
            - [Text Decoration](#text-decoration)
            - [Text Overflow](#text-overflow)
            - [White Space](#white-space)
            - [Word Break](#word-break)
            - [Special Effects](#special-effects)
        - [Color Utilities](#color-utilities)
            - [Color Variants (for non-button elements)](#color-variants-for-non-button-elements)
            - [Color Style Modifiers](#color-style-modifiers)
        - [Border Utilities](#border-utilities)
        - [Interaction Utilities](#interaction-utilities)
        - [Safe Area Utilities](#safe-area-utilities)
        - [Debug Utilities](#debug-utilities)
- [Theme Support](#theme-support)
- [Responsive Design](#responsive-design)
- [Browser Support](#browser-support)

---

## CSS Variables

### Core Theme Variables

| Variable                | Description           | Default Value                      |
| ----------------------- | --------------------- | ---------------------------------- |
| `--ui-font-family`      | Main font family      | "Recursive", system-ui, sans-serif |
| `--ui-font-size`        | Base font size        | 1rem                               |
| `--ui-line-height`      | Base line height      | 1.5                                |
| `--ui-line-height-code` | Code line height      | 1.25                               |
| `--ui-spacing`          | Base spacing unit     | 0.5rem                             |
| `--ui-radius`           | Default border radius | 0.25rem                            |
| `--ui-border-width`     | Default border width  | 1px                                |
| `--ui-border-style`     | Default border style  | solid                              |
| `--ui-app-bar-height`   | App bar height        | 3rem                               |
| `--ui-hue`              | Base color hue        | 225                                |
| `--ui-saturation`       | Base color saturation | 10%                                |

### Color Variables

#### Grayscale Colors

| Variable         | Description       |
| ---------------- | ----------------- |
| `--ui-color-50`  | Lightest gray     |
| `--ui-color-100` | Very light gray   |
| `--ui-color-200` | Light gray        |
| `--ui-color-300` | Medium light gray |
| `--ui-color-400` | Medium gray       |
| `--ui-color-500` | Base gray         |
| `--ui-color-600` | Medium dark gray  |
| `--ui-color-700` | Dark gray         |
| `--ui-color-800` | Very dark gray    |
| `--ui-color-900` | Darkest gray      |
| `--ui-color-950` | Near black        |

#### Semantic Colors

| Variable              | Description            |
| --------------------- | ---------------------- |
| `--ui-bg`             | Background color       |
| `--ui-text`           | Main text color        |
| `--ui-text-input`     | Input text color       |
| `--ui-muted-text`     | Muted text color       |
| `--ui-border-color`   | Default border color   |
| `--ui-backdrop-color` | Backdrop/overlay color |

#### Theme Colors

| Variable Group  | Variables                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------ |
| **Primary**     | `--ui-primary`, `--ui-primary-hover`, `--ui-primary-active`, `--ui-primary-text`                 |
| **Secondary**   | `--ui-secondary`, `--ui-secondary-hover`, `--ui-secondary-active`, `--ui-secondary-text`         |
| **Success**     | `--ui-success`, `--ui-success-hover`, `--ui-success-active`, `--ui-success-text`                 |
| **Warning**     | `--ui-warning`, `--ui-warning-hover`, `--ui-warning-active`, `--ui-warning-text`                 |
| **Destructive** | `--ui-destructive`, `--ui-destructive-hover`, `--ui-destructive-active`, `--ui-destructive-text` |
| **Error**       | `--ui-error`, `--ui-error-text`                                                                  |
| **Info**        | `--ui-info`, `--ui-info-hover`, `--ui-info-active`, `--ui-info-text`                             |
| **Contrast**    | `--ui-contrast`, `--ui-contrast-hover`, `--ui-contrast-active`, `--ui-contrast-text`             |
| **Muted**       | `--ui-muted`                                                                                     |

### Variable Font Settings

| Variable | Description             | Default |
| -------- | ----------------------- | ------- |
| `--mono` | Monospace setting (0-1) | 0       |
| `--casl` | Casual setting (0-1)    | 1       |
| `--wght` | Font weight (100-1000)  | 400     |
| `--slnt` | Slant/italic (-15-0)    | 0       |
| `--CRSV` | Cursive setting (0-1)   | 0.5     |

---

## CSS Classes

### Global Classes

| Class           | Description             |
| --------------- | ----------------------- |
| `.draggable`    | Makes element draggable |
| `.no-scrollbar` | Hides scrollbar         |

### Component Classes

#### App Bar Component

| Class             | Description               |
| ----------------- | ------------------------- |
| `.app-bar`        | Base app bar container    |
| `.app-bar.top`    | Top-positioned app bar    |
| `.app-bar.bottom` | Bottom-positioned app bar |
| `.app-bar.fixed`  | Fixed position app bar    |
| `.app-bar-left`   | Left section of app bar   |
| `.app-bar-center` | Center section of app bar |
| `.app-bar-right`  | Right section of app bar  |

#### Card Component

| Class               | Description            |
| ------------------- | ---------------------- |
| `.card`             | Base card container    |
| `.card-header`      | Card header section    |
| `.card-body`        | Card body section      |
| `.card-footer`      | Card footer section    |
| `.card-title`       | Card title text        |
| `.card-subtitle`    | Card subtitle text     |
| `.card-description` | Card description text  |
| `.card-meta`        | Card metadata text     |
| `.card-image`       | Card image element     |
| `.card-actions`     | Card actions container |
| `.card-grid`        | Grid layout for cards  |

##### Card Variants

| Class               | Description                        |
| ------------------- | ---------------------------------- |
| `.card.elevated`    | Card with shadow                   |
| `.card.flat`        | Flat card style                    |
| `.card.outlined`    | Outlined card                      |
| `.card.seamless`    | Card without header/footer borders |
| `.card.interactive` | Clickable card                     |
| `.card.horizontal`  | Horizontal layout card             |
| `.card.media`       | Media-focused card                 |

##### Card Sizes

| Class               | Description     |
| ------------------- | --------------- |
| `.card.compact`     | Compact padding |
| `.card.comfortable` | Normal padding  |
| `.card.spacious`    | Extra padding   |

##### Card Colors

| Class               | Description              |
| ------------------- | ------------------------ |
| `.card.primary`     | Primary color scheme     |
| `.card.secondary`   | Secondary color scheme   |
| `.card.success`     | Success color scheme     |
| `.card.warning`     | Warning color scheme     |
| `.card.destructive` | Destructive color scheme |
| `.card.info`        | Info color scheme        |
| `.card.contrast`    | Contrast color scheme    |
| `.card.muted`       | Muted color scheme       |

##### Card Actions Alignment

| Class                   | Description            |
| ----------------------- | ---------------------- |
| `.card-actions.center`  | Center-aligned actions |
| `.card-actions.end`     | End-aligned actions    |
| `.card-actions.between` | Space between actions  |
| `.card-actions.stretch` | Stretched actions      |

##### Card Image Aspects

| Class                         | Description       |
| ----------------------------- | ----------------- |
| `.card-image.aspect-video`    | 16:9 aspect ratio |
| `.card-image.aspect-square`   | 1:1 aspect ratio  |
| `.card-image.aspect-portrait` | 3:4 aspect ratio  |

##### Card Grid Variants

| Class                | Description          |
| -------------------- | -------------------- |
| `.card-grid.compact` | Compact grid columns |
| `.card-grid.wide`    | Wide grid columns    |

#### Container Component

| Class        | Description          |
| ------------ | -------------------- |
| `.container` | Base container class |

#### Drawer Component

| Class              | Description             |
| ------------------ | ----------------------- |
| `.drawer`          | Base drawer container   |
| `.drawer.open`     | Open state for drawer   |
| `.drawer-backdrop` | Drawer backdrop overlay |

#### Spinner Component

| Class      | Description             |
| ---------- | ----------------------- |
| `.spinner` | Loading spinner overlay |

### HTML Element Classes

#### Button Classes

| Class          | Description               |
| -------------- | ------------------------- |
| `.primary`     | Primary button (default)  |
| `.secondary`   | Secondary button          |
| `.success`     | Success button            |
| `.warning`     | Warning button            |
| `.destructive` | Destructive/danger button |
| `.info`        | Info button               |
| `.contrast`    | High contrast button      |
| `.muted`       | Muted button              |

##### Button Variants

| Class      | Description           |
| ---------- | --------------------- |
| `.outline` | Outlined button style |
| `.ghost`   | Ghost button style    |
| `.small`   | Small button size     |
| `.large`   | Large button size     |
| `.round`   | Rounded button        |
| `.icon`    | Icon-only button      |
| `.full`    | Full-width button     |
| `.loading` | Loading state button  |
| `.active`  | Active state button   |

##### Button Group

| Class           | Description                   |
| --------------- | ----------------------------- |
| `.button-group` | Container for grouped buttons |

#### Dialog Classes

| Class          | Description                             |
| -------------- | --------------------------------------- |
| `.clean`       | Removes border and background           |
| `.fullscreen`  | Makes dialog fullscreen with safe areas |
| `.primary`     | Primary color dialog                    |
| `.secondary`   | Secondary color dialog                  |
| `.success`     | Success color dialog                    |
| `.warning`     | Warning color dialog                    |
| `.destructive` | Destructive/danger color dialog         |
| `.info`        | Info color dialog                       |
| `.contrast`    | High contrast dialog                    |

#### Input/Form Classes

| Class          | Description                             |
| -------------- | --------------------------------------- |
| `.primary`     | Primary color input/textarea            |
| `.secondary`   | Secondary color input/textarea          |
| `.success`     | Success color input/textarea            |
| `.warning`     | Warning color input/textarea            |
| `.destructive` | Destructive/danger color input/textarea |
| `.info`        | Info color input/textarea               |
| `.contrast`    | High contrast input/textarea            |

#### Select Classes

| Class          | Description                     |
| -------------- | ------------------------------- |
| `.primary`     | Primary color select            |
| `.secondary`   | Secondary color select          |
| `.success`     | Success color select            |
| `.warning`     | Warning color select            |
| `.destructive` | Destructive/danger color select |
| `.info`        | Info color select               |
| `.contrast`    | High contrast select            |
| `.small`       | Small size select               |
| `.large`       | Large size select               |

### Utility Classes

#### Flexbox Utilities

##### Display

| Class          | Description         |
| -------------- | ------------------- |
| `.flex`        | Display flex        |
| `.inline-flex` | Display inline-flex |

##### Direction

| Class               | Description                   |
| ------------------- | ----------------------------- |
| `.flex-row`         | Flex direction row            |
| `.flex-col`         | Flex direction column         |
| `.flex-row-reverse` | Flex direction row-reverse    |
| `.flex-col-reverse` | Flex direction column-reverse |

##### Wrap

| Class                | Description       |
| -------------------- | ----------------- |
| `.flex-wrap`         | Flex wrap         |
| `.flex-nowrap`       | No flex wrap      |
| `.flex-wrap-reverse` | Flex wrap reverse |

##### Alignment

| Class             | Description          |
| ----------------- | -------------------- |
| `.items-start`    | Align items start    |
| `.items-center`   | Align items center   |
| `.items-end`      | Align items end      |
| `.items-baseline` | Align items baseline |
| `.items-stretch`  | Align items stretch  |

##### Justification

| Class              | Description                   |
| ------------------ | ----------------------------- |
| `.justify-start`   | Justify content start         |
| `.justify-center`  | Justify content center        |
| `.justify-end`     | Justify content end           |
| `.justify-between` | Justify content space-between |
| `.justify-around`  | Justify content space-around  |
| `.justify-evenly`  | Justify content space-evenly  |

##### Gap

| Class     | Description |
| --------- | ----------- |
| `.gap`    | Default gap |
| `.gap-0`  | No gap      |
| `.gap-sm` | Small gap   |
| `.gap-lg` | Large gap   |

##### Flex Properties

| Class           | Description    |
| --------------- | -------------- |
| `.flex-1`       | Flex: 1 1 0%   |
| `.flex-auto`    | Flex: 1 1 auto |
| `.flex-initial` | Flex: 0 1 auto |
| `.flex-none`    | Flex: none     |
| `.grow`         | Flex-grow: 1   |
| `.grow-0`       | Flex-grow: 0   |
| `.shrink`       | Flex-shrink: 1 |
| `.shrink-0`     | Flex-shrink: 0 |

#### Spacing Utilities

##### Padding

| Class    | Description              |
| -------- | ------------------------ |
| `.p-0`   | No padding               |
| `.p`     | Default padding          |
| `.p-sm`  | Small padding            |
| `.p-lg`  | Large padding            |
| `.p-xl`  | Extra large padding      |
| `.px-0`  | No horizontal padding    |
| `.px`    | Horizontal padding       |
| `.px-sm` | Small horizontal padding |
| `.px-lg` | Large horizontal padding |
| `.py-0`  | No vertical padding      |
| `.py`    | Vertical padding         |
| `.py-sm` | Small vertical padding   |
| `.py-lg` | Large vertical padding   |
| `.pt`    | Top padding              |
| `.pr`    | Right padding            |
| `.pb`    | Bottom padding           |
| `.pl`    | Left padding             |

##### Margin

| Class      | Description             |
| ---------- | ----------------------- |
| `.m-0`     | No margin               |
| `.m`       | Default margin          |
| `.m-sm`    | Small margin            |
| `.m-lg`    | Large margin            |
| `.m-xl`    | Extra large margin      |
| `.m-auto`  | Auto margin             |
| `.mx-0`    | No horizontal margin    |
| `.mx`      | Horizontal margin       |
| `.mx-sm`   | Small horizontal margin |
| `.mx-lg`   | Large horizontal margin |
| `.mx-auto` | Auto horizontal margin  |
| `.my-0`    | No vertical margin      |
| `.my`      | Vertical margin         |
| `.my-sm`   | Small vertical margin   |
| `.my-lg`   | Large vertical margin   |
| `.mt`      | Top margin              |
| `.mr`      | Right margin            |
| `.mb`      | Bottom margin           |
| `.ml`      | Left margin             |

##### Width

| Class       | Description        |
| ----------- | ------------------ |
| `.w-full`   | Width: 100%        |
| `.w-auto`   | Width: auto        |
| `.w-fit`    | Width: fit-content |
| `.w-min`    | Width: min-content |
| `.w-max`    | Width: max-content |
| `.w-screen` | Width: 100vw       |
| `.w-0`      | Width: 0           |
| `.w-25`     | Width: 25%         |
| `.w-50`     | Width: 50%         |
| `.w-75`     | Width: 75%         |

##### Height

| Class       | Description         |
| ----------- | ------------------- |
| `.h-full`   | Height: 100%        |
| `.h-auto`   | Height: auto        |
| `.h-fit`    | Height: fit-content |
| `.h-min`    | Height: min-content |
| `.h-max`    | Height: max-content |
| `.h-screen` | Height: 100vh       |
| `.h-0`      | Height: 0           |
| `.h-25`     | Height: 25%         |
| `.h-50`     | Height: 50%         |
| `.h-75`     | Height: 75%         |

##### Min/Max Width

| Class           | Description            |
| --------------- | ---------------------- |
| `.min-w-0`      | Min-width: 0           |
| `.min-w-full`   | Min-width: 100%        |
| `.min-w-fit`    | Min-width: fit-content |
| `.min-w-min`    | Min-width: min-content |
| `.min-w-max`    | Min-width: max-content |
| `.max-w-none`   | Max-width: none        |
| `.max-w-full`   | Max-width: 100%        |
| `.max-w-fit`    | Max-width: fit-content |
| `.max-w-min`    | Max-width: min-content |
| `.max-w-max`    | Max-width: max-content |
| `.max-w-screen` | Max-width: 100vw       |
| `.max-w-sm`     | Max-width: 24rem       |
| `.max-w-md`     | Max-width: 28rem       |
| `.max-w-lg`     | Max-width: 32rem       |
| `.max-w-xl`     | Max-width: 36rem       |
| `.max-w-2xl`    | Max-width: 42rem       |
| `.max-w-3xl`    | Max-width: 48rem       |
| `.max-w-4xl`    | Max-width: 56rem       |
| `.max-w-5xl`    | Max-width: 64rem       |

##### Min/Max Height

| Class           | Description             |
| --------------- | ----------------------- |
| `.min-h-0`      | Min-height: 0           |
| `.min-h-full`   | Min-height: 100%        |
| `.min-h-screen` | Min-height: 100vh       |
| `.min-h-fit`    | Min-height: fit-content |
| `.min-h-min`    | Min-height: min-content |
| `.min-h-max`    | Min-height: max-content |
| `.max-h-none`   | Max-height: none        |
| `.max-h-full`   | Max-height: 100%        |
| `.max-h-screen` | Max-height: 100vh       |
| `.max-h-fit`    | Max-height: fit-content |
| `.max-h-min`    | Max-height: min-content |
| `.max-h-max`    | Max-height: max-content |

##### Aspect Ratio

| Class               | Description        |
| ------------------- | ------------------ |
| `.aspect-auto`      | Aspect-ratio: auto |
| `.aspect-square`    | Aspect-ratio: 1/1  |
| `.aspect-video`     | Aspect-ratio: 16/9 |
| `.aspect-portrait`  | Aspect-ratio: 3/4  |
| `.aspect-landscape` | Aspect-ratio: 4/3  |

##### Position

| Class       | Description        |
| ----------- | ------------------ |
| `.static`   | Position: static   |
| `.relative` | Position: relative |
| `.absolute` | Position: absolute |
| `.fixed`    | Position: fixed    |
| `.sticky`   | Position: sticky   |

##### Position Values

| Class          | Description              |
| -------------- | ------------------------ |
| `.inset-0`     | Top/right/bottom/left: 0 |
| `.top-0`       | Top: 0                   |
| `.right-0`     | Right: 0                 |
| `.bottom-0`    | Bottom: 0                |
| `.left-0`      | Left: 0                  |
| `.top-full`    | Top: 100%                |
| `.right-full`  | Right: 100%              |
| `.bottom-full` | Bottom: 100%             |
| `.left-full`   | Left: 100%               |

##### Z-Index

| Class     | Description   |
| --------- | ------------- |
| `.z-0`    | Z-index: 0    |
| `.z-10`   | Z-index: 10   |
| `.z-20`   | Z-index: 20   |
| `.z-30`   | Z-index: 30   |
| `.z-40`   | Z-index: 40   |
| `.z-50`   | Z-index: 50   |
| `.z-auto` | Z-index: auto |

##### Display

| Class           | Description           |
| --------------- | --------------------- |
| `.block`        | Display: block        |
| `.inline-block` | Display: inline-block |
| `.inline`       | Display: inline       |
| `.hidden`       | Display: none         |
| `.grid`         | Display: grid         |
| `.inline-grid`  | Display: inline-grid  |
| `.contents`     | Display: contents     |
| `.table`        | Display: table        |

##### Visibility & Opacity

| Class          | Description         |
| -------------- | ------------------- |
| `.visible`     | Visibility: visible |
| `.invisible`   | Visibility: hidden  |
| `.opacity-0`   | Opacity: 0          |
| `.opacity-25`  | Opacity: 0.25       |
| `.opacity-50`  | Opacity: 0.5        |
| `.opacity-75`  | Opacity: 0.75       |
| `.opacity-100` | Opacity: 1          |

#### Text Utilities

##### Text Alignment

| Class           | Description         |
| --------------- | ------------------- |
| `.text-left`    | Text-align: left    |
| `.text-center`  | Text-align: center  |
| `.text-right`   | Text-align: right   |
| `.text-justify` | Text-align: justify |

##### Text Transform

| Class         | Description                |
| ------------- | -------------------------- |
| `.uppercase`  | Text-transform: uppercase  |
| `.lowercase`  | Text-transform: lowercase  |
| `.capitalize` | Text-transform: capitalize |

##### Font Size

| Class        | Description         |
| ------------ | ------------------- |
| `.text-xs`   | Font-size: 0.75rem  |
| `.text-sm`   | Font-size: 0.875rem |
| `.text-base` | Font-size: 1rem     |
| `.text-lg`   | Font-size: 1.125rem |
| `.text-xl`   | Font-size: 1.25rem  |
| `.text-2xl`  | Font-size: 1.5rem   |
| `.text-3xl`  | Font-size: 1.875rem |
| `.text-4xl`  | Font-size: 2.25rem  |

##### Font Weight

| Class             | Description      |
| ----------------- | ---------------- |
| `.text-thin`      | Font weight: 100 |
| `.text-light`     | Font weight: 300 |
| `.text-normal`    | Font weight: 400 |
| `.text-medium`    | Font weight: 500 |
| `.text-semibold`  | Font weight: 600 |
| `.text-bold`      | Font weight: 700 |
| `.text-extrabold` | Font weight: 800 |
| `.text-black`     | Font weight: 900 |

##### Font Style

| Class         | Description   |
| ------------- | ------------- |
| `.italic`     | Italic text   |
| `.not-italic` | Remove italic |

##### Line Height

| Class              | Description        |
| ------------------ | ------------------ |
| `.leading-none`    | Line-height: 1     |
| `.leading-tight`   | Line-height: 1.25  |
| `.leading-snug`    | Line-height: 1.375 |
| `.leading-normal`  | Line-height: 1.5   |
| `.leading-relaxed` | Line-height: 1.625 |
| `.leading-loose`   | Line-height: 2     |

##### Text Decoration

| Class           | Description                   |
| --------------- | ----------------------------- |
| `.underline`    | Text-decoration: underline    |
| `.line-through` | Text-decoration: line-through |
| `.no-underline` | Text-decoration: none         |

##### Text Overflow

| Class       | Description                 |
| ----------- | --------------------------- |
| `.truncate` | Truncate text with ellipsis |
| `.ellipsis` | Show ellipsis for overflow  |

##### White Space

| Class                  | Description           |
| ---------------------- | --------------------- |
| `.whitespace-normal`   | White-space: normal   |
| `.whitespace-nowrap`   | White-space: nowrap   |
| `.whitespace-pre`      | White-space: pre      |
| `.whitespace-pre-line` | White-space: pre-line |
| `.whitespace-pre-wrap` | White-space: pre-wrap |

##### Word Break

| Class           | Description             |
| --------------- | ----------------------- |
| `.break-normal` | Normal word break       |
| `.break-words`  | Break words on overflow |
| `.break-all`    | Break all characters    |

##### Special Effects

| Class           | Description                     |
| --------------- | ------------------------------- |
| `.outline-text` | Outlined text effect            |
| `.no-zoom`      | Prevent iOS zoom on input focus |

#### Color Utilities

| Class       | Description          |
| ----------- | -------------------- |
| `.backdrop` | Backdrop blur effect |

##### Color Variants (for non-button elements)

| Class          | Description              |
| -------------- | ------------------------ |
| `.primary`     | Primary color scheme     |
| `.secondary`   | Secondary color scheme   |
| `.success`     | Success color scheme     |
| `.warning`     | Warning color scheme     |
| `.destructive` | Destructive color scheme |
| `.info`        | Info color scheme        |
| `.contrast`    | Contrast color scheme    |
| `.muted`       | Muted color scheme       |
| `.error`       | Error color scheme       |

##### Color Style Modifiers

| Class      | Description                       |
| ---------- | --------------------------------- |
| `.ghost`   | Ghost variant (text color only)   |
| `.outline` | Outline variant (border and text) |

#### Border Utilities

| Class            | Description             |
| ---------------- | ----------------------- |
| `.border`        | Full border with radius |
| `.border-top`    | Top border only         |
| `.border-right`  | Right border only       |
| `.border-bottom` | Bottom border only      |
| `.border-left`   | Left border only        |

#### Interaction Utilities

| Class        | Description                   |
| ------------ | ----------------------------- |
| `:disabled`  | Disabled state (opacity 0.45) |
| `[disabled]` | Disabled attribute styling    |

#### Safe Area Utilities

Safe area insets are automatically applied to the HTML element for devices with notches or other screen intrusions.

#### Debug Utilities

Debug utilities are available for development purposes to help visualize layout and structure.

---

## Theme Support

The UI library supports both light and dark themes:

- Default follows system preference via `prefers-color-scheme`
- Can be forced using `data-theme="light"` or `data-theme="dark"` on the root element
- High contrast mode support via `prefers-contrast: high`
- Reduced motion support via `prefers-reduced-motion: reduce`

## Responsive Design

The library includes responsive breakpoints:

- Mobile-first approach
- Touch device optimizations for interactive elements
- Minimum touch target size of 44x44px on touch devices

## Browser Support

- Modern browsers with CSS Custom Properties support
- Webkit-specific prefixes included for Safari compatibility
- Fallbacks for older browsers where applicable
