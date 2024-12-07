# Changelog

## v1.2.0 — [unreleased]


- Updated demo page from (src directory)

- Updated js bundle:
    - Added a ui object with all exports to `window` object (`window.ui`) [work-in-progress]
    - Change the JS bundler output format if possible (no exports anymore)

- Added css utils:
    - .has-padding

## v1.1.1 — [2024-11-20]

**CSS Changes**:

- Changed primary theme colors for the "original" theme
- Changed thead/tbody font weight

## v1.1.0 — [2024-11-18]

**Breaking Changes:**

-   Renamed UIStackLayout method names:
    -   clear() -> clearStack()
    -   register() -> registerPage()
    -   unregister() -> unregisterPage()
    -   set() -> setPage()

**General:**

-   Added a generic type for “ui-app-bar” content items.
-   Added “onmouseleave” to the mobile dragging handler.
-   Updated “original” theme colors.
-   Updated “ui-text” overflow wrap and width settings.
-   Changed backdrop alpha to “0.35”.
-   Added “direction” to “ui-flex-grid-item”.
-   Added “::selection” styles to “ui-drawer-group”.
-   Added “gap” to “ui-drawer-group”.
-   Added “overflow: auto;” to “is-container” CSS utility.
-   Updated “styles” JS utility types.
-   Fixed minor issues.

**Removed:**

-   Removed the “user-select” style for tables.
-   Removed padding from “ui-drawer-group-item”.
-   Removed the “submit” event and timeout handler from “ui-search”.
-   Removed default attributes “auto” and “theme” for “ui-theme-handler”.
-   Removed old debug logs in “ui-theme-handler”.

## v1.0.0 — [2024-10-24]

**General**:

-   Added a complete library documentation with "typedoc"
-   Converted this library into a typescript lib
-   Converted all web components to lit components

## v0.8.0 — 2024-10-09

**Added**:

-   Added "keep-open" option to `UISelect`
-   Added "gruvbox" theme to [css/themes/](/themes)
-   Added "theme" attribute to `UIThemeHandler` web component,
    possible values: "original", "gruvbox"

**Fixed**:

-   Fixed `UILabel` ripple, effect only going from right to mouse position?
-   Fixed wrong color CSS variable `var(--ui-color)`, should be `var(--ui-fg)`

## v0.7.2 — 2024-10-07

**Fixed**:

-   Fixed max-width for `UIAlert` component

## v0.7.1 — 2024-09-30

**Changed**:

-   Changed align to center for `UIAppBar` `ui-flex-grid-row` container (left/center/right)
-   Changed display to "content" for `UIFlexGridItem`
-   Changed display to "content" for `UIAppBarItem`

## v0.7.0 — 2024-09-29

**Added**:

-   Added global style sheets to JS utils

    -   [x] `UIAlert`
    -   [x] `UIAlerts`
    -   [x] `UIAppBarItem`
    -   [x] `UIAppBar`
    -   [x] `UIButton`
    -   [x] `UIIconButton`
    -   [x] `UIContainer`
    -   [x] `UIDialog`
    -   [x] `UIDrawerGroupItem`
    -   [x] `UIDrawerGroup`
    -   [x] `UIDrawer`
    -   [x] `UIFlexGridItem`
    -   [x] `UIFlexGridRow`
    -   [x] `UIFlexGrid`
    -   [x] `UICheck`
    -   [x] `UIInput`
    -   [x] `UISearch`
    -   [x] `UISelect`
    -   [x] `UISelectOption`
    -   [x] `UITextarea`
    -   [ ] ~`UILangType`~
    -   [ ] ~`UILang`~
    -   [x] `UISpinner`
    -   [ ] ~`UIStackLayoutPage`~
    -   [ ] ~`UIStackLayout`~
    -   [ ] ~`UIStore`~
    -   [x] `UISvg`
    -   [x] `UILabel`
    -   [x] `UIPrimary`
    -   [x] `UISecondary`
    -   [x] `UIText`
    -   [ ] ~`UIThemeHandler`~

**Changed**:

-   Autoregister all web components
-   Changed `UIButton` "click" event data, now `MouseEvent` and the current target
-   Changed `UIIconButton` "click" event data, now `MouseEvent` and the current target

**Removed**:

-   Removed `register` function

## v0.6.0 — 2024-09-25

**Added**:

-   Added history handling for the `UIDrawer`, push state to history if open
-   Added max-width settings to drawer (useful for small screens)

**Changed**:

-   Changed ripple to use pointerevents per default, but cancel if pointermove
    was recognized before pointerup
-   Changed `UIDrawer` (aside) background color

**Removed**:

-   Removed CSS util `is-scroll`

**Fixed**:

-   Fixed an error while try to navigate back in the stack (`UIStackLayout`)
    if stack is empty

## v0.5.0 — 2024-09-21

**Added**:

-   Added `UIText` component

**Changed**:

-   Changed display for `UIPrimary` and `UISecondary` text components to "inline-block"

**General**:

-   Let `UIPrimary` and `UISecondary` extend from `UIText`

## v0.4.0 — 2024-09-21

**Added**:

-   Added new Alert components

**General**:

-   Changed component docs
-   Code clean up (exports)

**Removed**:

-   Removed `shadowRender` method, replaced with a privat method

## v0.3.0 — 2024-09-18

**Changed**:

-   Changed components doc
-   Changed secondary theme color
-   Changed css theme vars for: "secondary", "primary"
-   Changed css theme vars, `--ui-color-hsl` replaced with `--ui-color-(h|s|l)`
-   Changed css theme vars, `--ui-bgColor-hsl` replaced with `--ui-bg-(h|s|l)`

**Fixed**:

-   Fixed `ui-store` "get" and "update" methods ignoring the local storage, if
    set was not called first

**General**:

-   Simplified all exports

**Removed**:

-   Removed `UILabel` from `UICheck` component
-   Removed attribute "value" from `UICheck` component
-   Removed `*-bg*` from "primary", "secondary", "destructive", "muted" and
    "card" vars

**Renamed**:

-   Renamed `*-color*` to `*-fg*`
-   Renamed `--ui-svg-color` to `--ui-svg-fg`
-   Renamed css vars `*bgColor*` to `*bg*`

## v0.2.18 — 2024-09-06

**General**:

-   Added ".is-muted" to css utils
-   Changed primary theme color (original)
-   Added "power" svg icon
-   Added "more-options" svg icon
-   Removed "ui-drawer-group" bottom border

**Fixed**:

-   Fixed ripple destroy not working if `useClick` was set to `true`

## v0.2.17 — 2024-08-19

**General**:

-   Removed `has-save-area` from css utils
-   Changed `styles` parameter type
-   Added helper method for `UIDialog` create action buttons
-   Added "refresh" SVG
-   Added "checkmark" SVG
-   Added "drag" SVG
-   Added "upload" SVG
-   Added "printer" SVG

**Fixed**:

-   Fixed `UISelect` missing `--items-length` if childrens was added with javascript
-   Fixed `UILang` storing data at the wrong place
-   Missing `UITextarea` exports

## v0.2.16 — 2024-08-12

**General**:

-   Added documentation for all components
-   Changed "utils" exports
-   Updated `<code>` styles (padding)
-   Added new `styles` utility
-   Added "nofooter" attribute to `UIDialog`
-   Added mobile draggable function (`createMobileDraggable`)
-   Changed `UIDialog` constructor parameters ("title")
-   Changed `UIStackLayoutPage` constructor parameters ("name")
-   Removed `UIDrawerGroup` margins
-   Removed `<ul>` margins
-   Changed CSS resets, (set display to relative for "\*")
-   Code clean up

**Fixes**:

-   Fixed slotted svg size for the `UISvg` component
-   Fixed storage handler for the `UISearch` component

## v0.2.15 2024-08-07

**Added**:

-   `UITextarea` component

**Fixed**:

-   `UIInput` and `UISearch` invalid attribute handling

**Improved**:

-   CSS

## v0.2.14 2024-08-05

**Added**:

-   Component `UICheck`
-   Button role
    -   `UIDrawer` toggle
    -   `UIDrawerGroup` toggle

**Changed**:

-   Component attribute handling
-   Code formatting
-   `UIButton` ripple no longer centered

**Fixed**:

-   `UILang`: Attribute for `UILangType` href has changed

## v0.2.13 2024-07-28

**Added**:

-   `UISearch`: Event "storage", fired if the storage key has changed
-   `UISpinner`: Attribute "nobg" (removes background)
-   `UIDrawerGroup`: Fold and Unfold

**Changed**:

-   `UISvg`: Host display to "block"
-   `UIDrawerGroupItem`: Host display to "block" with 100% width

**Removed**:

-   `UISearch`: Event "change"

## v0.2.12 2024-07-27

**NOTE**:

New standard methods for all ui components:

    - constructor()
        - this.ui = { ... }
    - connectedCallback()
    - disconnectedCallback()

**Changed**:

-   Icon button size (2.5rem)
-   Components structures
    -   [x] ui-app-bar
    -   [x] ui-app-bar-item
    -   [x] ui-button
    -   [x] ui-icon-button
    -   [x] ui-container
    -   [x] ui-dialog
    -   [x] ui-drawer-group-item
    -   [x] ui-drawer-group
    -   [x] ui-drawer
    -   [x] ui-flex-grid-item
    -   [x] ui-flex-grid-row
    -   [x] ui-flex-grid
    -   [x] ui-input
    -   [x] ui-search
    -   [x] ui-select-option
    -   [x] ui-select
    -   [x] ui-lang-type
    -   [x] ui-lang
    -   [x] ui-spinner
    -   [x] ui-stack-layout-page
    -   [x] ui-stack-layout
    -   [x] ui-store
    -   [x] ui-svg
    -   [x] ui-label
    -   [x] ui-primary
    -   [x] ui-secondary
    -   [x] ui-theme-handler

## v0.2.11 2024-07-20

**Changed**:

-   Drawer width, now "20rem" instead of "18em"

**Fixed**:

-   Drawer outside click to close

## v0.2.10 2024-07-19

**Added**:

-   CSS util `is-scroll`: Disable all pointer events

**Changed**:

-   (Shadow-)Render methods

## v0.2.9 2024-07-19

-   Code clean up, moved render call to the constructors end

## v0.2.8 2024-07-18

-   Code clean up: using template and css props
-   Added `ui-svg` component
-   Added svgs

## v0.2.7 2024-07-15

-   Add register functions for svgs and components
-   Removed margin from css resets
-   Rename ui-app-bar ui methods

## v0.2.6 2024-07-12

-   Fixed (ui-drawer) scrollbar still visible on webkit devices

## v0.2.5 2024-07-11

-   Added cleanup to ui object

## v0.2.4 2024-07-09

-   Updated `ui-spinner` positioning, absolute with 100% width and height

## v0.2.3 2024-07-05

-   Fixed `ui-input` and `ui-search` input width

## v0.2.2 2024-07-03

-   Changed `Cleanup.add` method parameter
-   Add components doc strings for observed attributes and special slots
-   Fixed padding (right) for the `ui-select-option` component
-   Added (ui) method: `ui-select`: `getSelectedOption`
-   Added (ui) method: `ui-select`: `getChildren`

## v0.2.1 2024-06-27

-   Updated JSDoc exports
-   Changed value handling for input components: "ui-input", "ui-search"
-   Changed input border style
-   Table word-break set to `auto-phrase`

## v0.2.0 2024-06-23

-   First version using javascript web components

## v0.1.1 2024-03-22

-   Changed dialog paddings (top/bottom) for `env(save-area-inset-*)`
-   Added css util: ".has-save-area"
