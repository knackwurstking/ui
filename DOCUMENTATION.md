# Documentation

<!--toc:start-->

- [Documentation](#documentation)
    - [JavaScript](#javascript)
    - [Special SVGs](#special-svgs)
    - [CSS](#css)
        - [Theme](#theme)
        - [Font](#font)
        - [General HTML](#general-html)
            - [Anchor Tag](#anchor-tag)
            - [Button](#button)
            - [Dialog](#dialog)
        - [Components](#components)
            - [App Bar](#app-bar)
            - [Container](#container)
            - [Drawer](#drawer)
            - [Spinner](#spinner)
        - [Utils](#utils)
            - [Border](#border)
            - [Color](#color)
            - [Debug](#debug)
            - [Flex](#flex)
            - [Scroll](#scroll)
            - [Spacing](#spacing)
            - [Text](#text)
            - [Touch](#touch)
            - [User Select](#user-select)

<!--toc:end-->

> Just some quick and dirty documentation.

## JavaScript

`window.ui` [/dist/ui.min.umd.cjs](/dist/ui.min.umd.cjs)

Just go to the console and do a `console.log(window.ui)`.

Or use [/dist/ui.min.js](/dist/ui.min.js)

## Special SVGs

- [/svg/power.svg](/svg/power.svg)

## CSS

### Theme

```css
--ui-font-name
--ui-font-family
--ui-font-size
--ui-line-height
--ui-line-height-code

--ui-border-width
--ui-border-style
--ui-radius
--ui-spacing

--ui-app-bar-height

--ui-hue

--ui-color-50
--ui-color-100
--ui-color-200
--ui-color-300
--ui-color-400
--ui-color-500
--ui-color-600
--ui-color-700
--ui-color-800
--ui-color-900
--ui-color-950

--ui-bg
--ui-text

--ui-primary-text
--ui-primary
--ui-primary--hover
--ui-primary--active

--ui-secondary-text
--ui-secondary
--ui-secondary--hover
--ui-secondary--active

--ui-destructive-text
--ui-destructive
--ui-destructive--hover
--ui-destructive--active

--ui-muted-text
--ui-muted

--ui-info-text
--ui-info

--ui-warning-text
--ui-warning

--ui-error-text
--ui-error

--ui-backdrop-color
--ui-border-color
```

### Font

> All HTML Elements takes font variation settings from special CSS variables
>
> - `--mono`: 0..1
> - `--casl`: 0..1
> - `--wght`: 300..1000
> - `--slnt`: 0..-15
> - `--CRSV`: 0..1

### General HTML

#### Anchor Tag

- `a`

    | Attribute         | Value |
    | ----------------- | ----- |
    | `data-ui-current` | -     |

#### Button

- `button`

    | Attribute         | Value                             |
    | ----------------- | --------------------------------- |
    | `data-ui-variant` | full, outline or ghost            |
    | `data-ui-color`   | primary, secondary or destructive |
    | `data-ui-icon`    | -                                 |

#### Dialog

- `dialog`

    | Attribute            | Value |
    | -------------------- | ----- |
    | `data-ui-fullscreen` | -     |

### Components

#### App Bar

- `.ui-app-bar`

    | Attribute          | Value         |
    | ------------------ | ------------- |
    | `data-ui-position` | top or bottom |
    | `data-ui-fixed`    | -             |

- `.ui-app-bar-left`
- `.ui-app-bar-center`
- `.ui-app-bar-right`

#### Container

- `.ui-container`

    | Attribute       | Value |
    | --------------- | ----- |
    | `data-ui-fluid` | -     |

#### Drawer

- `.ui-drawer`

    | Attribute      | Value |
    | -------------- | ----- |
    | `data-ui-open` | -     |

#### Spinner

- `.ui-spinner`

### Utils

#### Border

- `.ui-border`
- `.ui-border-top`
- `.ui-border-right`
- `.ui-border-bottom`
- `.ui-border-left`

#### Color

- `.ui-backdrop`
- `.ui-primary` background-color and color
- `.ui-primary-ghost` only color
- `.ui-secondary` background-color and color
- `.ui-secondary-ghost` only color
- `.ui-destructive` background-color and color
- `.ui-destructive-ghost` only color
- `.ui-muted`
- `.ui-muted-ghost` only color

#### Debug

- `.ui-debug`

#### Flex

- `.ui-flex`
    - `.inline`
    - `.row`
    - `.column`
    - `.wrap`
    - `.nowrap`
    - `.reverse` only if `.row` or `.column` is set
    - `.gap`
    - `.align-center`
    - `.align-start`
    - `.align-end`
    - `.justify-center`
    - `.justify-start`
    - `.justify-end`
    - `.justify-evenly`
    - `.justify-around`
    - `.justify-between`
- `.ui-flex-item`

#### Scroll

- `.ui-auto-scroll`
- `.ui-auto-scroll-x`
- `.ui-auto-scroll-y`
- `.ui-hide-scrollbar`

#### Spacing

- `.ui-padding`
- `.ui-padding-x`
- `.ui-padding-y`
- `.ui-margin`
- `.ui-margin-x`
- `.ui-margin-y`

#### Text

- `.ui-outline-text`
- `.ui-ellipsis`

#### Touch

- `.ui-disable-touch`

#### User Select

- `.ui-none-select`
