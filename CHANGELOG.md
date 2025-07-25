# Changelog

## v5.0.1 - unreleased

**Enhanced Color Palette & Theme**:

- Improved default theme colors with better contrast and vibrancy
- Changed base hue from 250° to 220° for cleaner blue tones
- Increased saturation from 10% to 25-30% for more modern appearance
- Enhanced primary colors with vibrant blue variants
- Added comprehensive success color system (green)
- Improved warning colors with better orange/amber tones
- Enhanced destructive/error colors with better red variants
- Added subtle color tinting to muted and border colors
- Improved backdrop colors with better transparency effects

**Accessibility & Focus Management**:

- Added comprehensive focus-visible styles for all interactive elements
- Implemented proper keyboard navigation support
- Added high contrast mode support with enhanced focus indicators
- Added reduced motion support for accessibility
- Enhanced focus styles for buttons, inputs, selects, and sliders
- Added proper ARIA validation color support

**Component Improvements**:

- Added missing success and warning button variants
- Enhanced button focus states with box-shadow effects
- Improved select component with better styling and validation states
- Added comprehensive focus styles to range sliders
- Fixed hardcoded color values to use CSS custom properties

**Utility Classes**:

- Added success, info, warning, and error color utility classes
- Added comprehensive text utilities (alignment, transform, weight, size)
- Added font weight utilities using variable font settings
- Added line height and text decoration utilities
- Added white space and word break utilities
- Enhanced text utilities with proper variable font support

**Bug Fixes**:

- Fixed CSS syntax error in details.css (missing dash in --ui-radius)
- Fixed border-left utility class applying all borders instead of just left
- Fixed input validation using hardcoded green instead of success variable
- Replaced hardcoded color values with proper CSS custom properties

## v5.0.0 - unreleased

- Changed aria-invalid input styles
- Removed all ui- prefixes from class names
- Renamed some css utility class names
- Added backdrop blur
- Updated color utility classes
- Added support for `[role="button"]`
- Changed table styles
- Fixed theme font settings

## v4.3.0 - 2025-05-20

- Changed CSS colors for the -950 and -50 levels (support for OLED screens)
- Added CSS variable --ui-saturation (default: 10%)

## v4.2.1 - 2025-05-20

- close websocket on error

## v4.2.0 - 2025-05-14

**Added**:

- lib: new websocket handler `WS`

## v4.1.2 - 2025-05-08

**Fixed**:

- input `aria-invalid`, border color not working

## v4.1.1 - 2025-05-05

**Fixed**:

- CSS Order: ".ui-container" move above the utils, so ui-flex can override the container settings like display
- CSS: Slider styles
    - Webkit: (Tested: Safari v18.4, Chrome: v136.0.7103.49, Edge v136.0.3240.50)
    - Mozilla: (Tested: Firefox v138.0.1)

## v4.1.0 - 2025-04-28

**Added**:

- `[data-ui-theme]` for dark and light theme, the old `[data-ui-theme]` is now deprecated

**Changed**:

- Theming: `[data-theme="auto"]` kicked, no need for this

**Fixed**:

- Theme variable declaration for `[data-theme]` only worked on the root html tag, this is now fixed

## v4.0.1 - 2025-04-23

**Fixed**:

- Drag'n'Drop for safari and firefox, problems with TouchEvent not defined on desktop
- Disable all user select on ".draggable" selector

## v4.0.0 - 2025-04-17

**Added**:

- Added `.ui-flex-item`, this is the replacement for the previous `.ui-flex-grid-item`

**Changed**:

- Moved sass to css
- Added the `--ui-hue` var for some more fun
- Prefixed component attributes with `data-ui-*`
- CSS components `.ui-container.fluid` class replaced with `data-ui-fluid`

**Removed**:

- Removed `.ui-flex-grid` components, `.ui-flex` utils should do the ting quite well

## v3.0.1 - 2025-04-13

**Fixed**:

- Force padding on icon button, in some cases the icon button padding will be
  overridden with the button padding

## v3.0.0 - 2025-03-11

**Breaking Changes**:

- Remove `LanguageHandler` from `lib/utils`
- Simplify the hash router init function

**Added**:

- Dialog background set to `var(--ui-bg)`
- Added css border utils for: top, right, bottom, left

## v2.3.0 [2025-03-30]

- Added html save-area-inset-\* as padding

## v2.2.0 [2025-03-29]

- Prefixed special html element attributes with `data-`, to get rid of linter
  errors in svelte files

## v2.1.1 [2025-03-28]

- Fixed `ui-ellipsis`, missing `white-space: nowrap`

## v2.1.0 [2025-02-27]

**Added**:

- CSS utils [spacing](/sass/utils/_spacing.scss)
- `.gap` for ".ui-flex"

**Changed**:

- Router: `template.selector` and target is now optional

## v2.0.0 [2025-02-07]

- Converted this library to an Sass library with some JavaScript utilities.
- Changed JavaScript utils

> See the [docs](DOCUMENTATION.md) for more info

## v1.1.1 — [2024-11-20]

**CSS Changes**:

- Changed primary theme colors for the "original" theme
- Changed thead/tbody font weight

## v1.1.0 — [2024-11-18]

**Breaking Changes:**

- Renamed UIStackLayout method names:
    - clear() -> clearStack()
    - register() -> registerPage()
    - unregister() -> unregisterPage()
    - set() -> setPage()

**General:**

- Added a generic type for “ui-app-bar” content items.
- Added “onmouseleave” to the mobile dragging handler.
- Updated “original” theme colors.
- Updated “ui-text” overflow wrap and width settings.
- Changed backdrop alpha to “0.35”.
- Added “direction” to “ui-flex-grid-item”.
- Added “::selection” styles to “ui-drawer-group”.
- Added “gap” to “ui-drawer-group”.
- Added “overflow: auto;” to “is-container” CSS utility.
- Updated “styles” JS utility types.
- Fixed minor issues.

**Removed:**

- Removed the “user-select” style for tables.
- Removed padding from “ui-drawer-group-item”.
- Removed the “submit” event and timeout handler from “ui-search”.
- Removed default attributes “auto” and “theme” for “ui-theme-handler”.
- Removed old debug logs in “ui-theme-handler”.

## v1.0.0 — [2024-10-24]

**General**:

- Added a complete library documentation with "typedoc"
- Converted this library into a typescript lib
- Converted all web components to lit components

## v0.8.0 — 2024-10-09

**Added**:

- Added "keep-open" option to `UISelect`
- Added "gruvbox" theme to [css/themes/](/themes)
- Added "theme" attribute to `UIThemeHandler` web component,
  possible values: "original", "gruvbox"

**Fixed**:

- Fixed `UILabel` ripple, effect only going from right to mouse position?
- Fixed wrong color CSS variable `var(--ui-color)`, should be `var(--ui-fg)`

## v0.7.2 — 2024-10-07

**Fixed**:

- Fixed max-width for `UIAlert` component

## v0.7.1 — 2024-09-30

**Changed**:

- Changed align to center for `UIAppBar` `ui-flex-grid-row` container (left/center/right)
- Changed display to "content" for `UIFlexGridItem`
- Changed display to "content" for `UIAppBarItem`

## v0.7.0 — 2024-09-29

**Added**:

- Added global style sheets to JS utils
    - [x] `UIAlert`
    - [x] `UIAlerts`
    - [x] `UIAppBarItem`
    - [x] `UIAppBar`
    - [x] `UIButton`
    - [x] `UIIconButton`
    - [x] `UIContainer`
    - [x] `UIDialog`
    - [x] `UIDrawerGroupItem`
    - [x] `UIDrawerGroup`
    - [x] `UIDrawer`
    - [x] `UIFlexGridItem`
    - [x] `UIFlexGridRow`
    - [x] `UIFlexGrid`
    - [x] `UICheck`
    - [x] `UIInput`
    - [x] `UISearch`
    - [x] `UISelect`
    - [x] `UISelectOption`
    - [x] `UITextarea`
    - [ ] ~`UILangType`~
    - [ ] ~`UILang`~
    - [x] `UISpinner`
    - [ ] ~`UIStackLayoutPage`~
    - [ ] ~`UIStackLayout`~
    - [ ] ~`UIStore`~
    - [x] `UISvg`
    - [x] `UILabel`
    - [x] `UIPrimary`
    - [x] `UISecondary`
    - [x] `UIText`
    - [ ] ~`UIThemeHandler`~

**Changed**:

- Autoregister all web components
- Changed `UIButton` "click" event data, now `MouseEvent` and the current target
- Changed `UIIconButton` "click" event data, now `MouseEvent` and the current target

**Removed**:

- Removed `register` function

## v0.6.0 — 2024-09-25

**Added**:

- Added history handling for the `UIDrawer`, push state to history if open
- Added max-width settings to drawer (useful for small screens)

**Changed**:

- Changed ripple to use pointerevents per default, but cancel if pointermove
  was recognized before pointerup
- Changed `UIDrawer` (aside) background color

**Removed**:

- Removed CSS util `is-scroll`

**Fixed**:

- Fixed an error while try to navigate back in the stack (`UIStackLayout`)
  if stack is empty

## v0.5.0 — 2024-09-21

**Added**:

- Added `UIText` component

**Changed**:

- Changed display for `UIPrimary` and `UISecondary` text components to "inline-block"

**General**:

- Let `UIPrimary` and `UISecondary` extend from `UIText`

## v0.4.0 — 2024-09-21

**Added**:

- Added new Alert components

**General**:

- Changed component docs
- Code clean up (exports)

**Removed**:

- Removed `shadowRender` method, replaced with a privat method

## v0.3.0 — 2024-09-18

**Changed**:

- Changed components doc
- Changed secondary theme color
- Changed css theme vars for: "secondary", "primary"
- Changed css theme vars, `--ui-color-hsl` replaced with `--ui-color-(h|s|l)`
- Changed css theme vars, `--ui-bgColor-hsl` replaced with `--ui-bg-(h|s|l)`

**Fixed**:

- Fixed `ui-store` "get" and "update" methods ignoring the local storage, if
  set was not called first

**General**:

- Simplified all exports

**Removed**:

- Removed `UILabel` from `UICheck` component
- Removed attribute "value" from `UICheck` component
- Removed `*-bg*` from "primary", "secondary", "destructive", "muted" and
  "card" vars

**Renamed**:

- Renamed `*-color*` to `*-fg*`
- Renamed `--ui-svg-color` to `--ui-svg-fg`
- Renamed css vars `*bgColor*` to `*bg*`

## v0.2.18 — 2024-09-06

**General**:

- Added ".is-muted" to css utils
- Changed primary theme color (original)
- Added "power" svg icon
- Added "more-options" svg icon
- Removed "ui-drawer-group" bottom border

**Fixed**:

- Fixed ripple destroy not working if `useClick` was set to `true`

## v0.2.17 — 2024-08-19

**General**:

- Removed `has-save-area` from css utils
- Changed `styles` parameter type
- Added helper method for `UIDialog` create action buttons
- Added "refresh" SVG
- Added "checkmark" SVG
- Added "drag" SVG
- Added "upload" SVG
- Added "printer" SVG

**Fixed**:

- Fixed `UISelect` missing `--items-length` if childrens was added with javascript
- Fixed `UILang` storing data at the wrong place
- Missing `UITextarea` exports

## v0.2.16 — 2024-08-12

**General**:

- Added documentation for all components
- Changed "utils" exports
- Updated `<code>` styles (padding)
- Added new `styles` utility
- Added "nofooter" attribute to `UIDialog`
- Added mobile draggable function (`createMobileDraggable`)
- Changed `UIDialog` constructor parameters ("title")
- Changed `UIStackLayoutPage` constructor parameters ("name")
- Removed `UIDrawerGroup` margins
- Removed `<ul>` margins
- Changed CSS resets, (set display to relative for "\*")
- Code clean up

**Fixes**:

- Fixed slotted svg size for the `UISvg` component
- Fixed storage handler for the `UISearch` component

## v0.2.15 2024-08-07

**Added**:

- `UITextarea` component

**Fixed**:

- `UIInput` and `UISearch` invalid attribute handling

**Improved**:

- CSS

## v0.2.14 2024-08-05

**Added**:

- Component `UICheck`
- Button role
    - `UIDrawer` toggle
    - `UIDrawerGroup` toggle

**Changed**:

- Component attribute handling
- Code formatting
- `UIButton` ripple no longer centered

**Fixed**:

- `UILang`: Attribute for `UILangType` href has changed

## v0.2.13 2024-07-28

**Added**:

- `UISearch`: Event "storage", fired if the storage key has changed
- `UISpinner`: Attribute "nobg" (removes background)
- `UIDrawerGroup`: Fold and Unfold

**Changed**:

- `UISvg`: Host display to "block"
- `UIDrawerGroupItem`: Host display to "block" with 100% width

**Removed**:

- `UISearch`: Event "change"

## v0.2.12 2024-07-27

**NOTE**:

New standard methods for all ui components:

    - constructor()
        - this.ui = { ... }
    - connectedCallback()
    - disconnectedCallback()

**Changed**:

- Icon button size (2.5rem)
- Components structures
    - [x] ui-app-bar
    - [x] ui-app-bar-item
    - [x] ui-button
    - [x] ui-icon-button
    - [x] ui-container
    - [x] ui-dialog
    - [x] ui-drawer-group-item
    - [x] ui-drawer-group
    - [x] ui-drawer
    - [x] ui-flex-grid-item
    - [x] ui-flex-grid-row
    - [x] ui-flex-grid
    - [x] ui-input
    - [x] ui-search
    - [x] ui-select-option
    - [x] ui-select
    - [x] ui-lang-type
    - [x] ui-lang
    - [x] ui-spinner
    - [x] ui-stack-layout-page
    - [x] ui-stack-layout
    - [x] ui-store
    - [x] ui-svg
    - [x] ui-label
    - [x] ui-primary
    - [x] ui-secondary
    - [x] ui-theme-handler

## v0.2.11 2024-07-20

**Changed**:

- Drawer width, now "20rem" instead of "18em"

**Fixed**:

- Drawer outside click to close

## v0.2.10 2024-07-19

**Added**:

- CSS util `is-scroll`: Disable all pointer events

**Changed**:

- (Shadow-)Render methods

## v0.2.9 2024-07-19

- Code clean up, moved render call to the constructors end

## v0.2.8 2024-07-18

- Code clean up: using template and css props
- Added `ui-svg` component
- Added svgs

## v0.2.7 2024-07-15

- Add register functions for svgs and components
- Removed margin from css resets
- Rename ui-app-bar ui methods

## v0.2.6 2024-07-12

- Fixed (ui-drawer) scrollbar still visible on webkit devices

## v0.2.5 2024-07-11

- Added cleanup to ui object

## v0.2.4 2024-07-09

- Updated `ui-spinner` positioning, absolute with 100% width and height

## v0.2.3 2024-07-05

- Fixed `ui-input` and `ui-search` input width

## v0.2.2 2024-07-03

- Changed `Cleanup.add` method parameter
- Add components doc strings for observed attributes and special slots
- Fixed padding (right) for the `ui-select-option` component
- Added (ui) method: `ui-select`: `getSelectedOption`
- Added (ui) method: `ui-select`: `getChildren`

## v0.2.1 2024-06-27

- Updated JSDoc exports
- Changed value handling for input components: "ui-input", "ui-search"
- Changed input border style
- Table word-break set to `auto-phrase`

## v0.2.0 2024-06-23

- First version using javascript web components

## v0.1.1 2024-03-22

- Changed dialog paddings (top/bottom) for `env(save-area-inset-*)`
- Added css util: ".has-save-area"
