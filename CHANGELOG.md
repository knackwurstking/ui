# Changelog

## v0.4.0 - [unreleased]

**General**:

- Code clean up (exports)

**Added**:

- [ ] Added new Alert components [work-in-progress]

## v0.3.0 - 2024-09-18

**Changed**:

- Changed coponents doc
- Changed secondary theme color
- Changed css theme vars for: "secondary", "primary"
- Changed css theme vars, `--ui-color-hsl` replaced with `--ui-color-(h|s|l)`
- Changed css theme vars, `--ui-bgColor-hsl` replaced with `--ui-bg-(h|s|l)`

**Fixed**:

- Fixed `ui-store` "get" and "update" methods ignoring the local storage, if set was not called first

**General**:

- [ ] Improve documentation, use "@slot <name>" and "@event <name>"
- Simplified all exports

**Removed**:

- Removed `UILabel` from `UICheck` component
- Removed atribute "value" from `UICheck` component
- Removed `*-bg*` from "primary", "secondary", "destructive", "muted" and "card" vars

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

- Fixed `UISelect` missing `--items-length` if childrends was added with javascript
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

**Changed**

- `UISvg`: Host display to "block"
- `UIDrawerGroupItem`: Host display to "block" with 100% width

**Removed**:

- `UISearch`: Event "change"

## v0.2.12 2024-07-27

**NOTE**:

New standard methods for all ui components:

    - constructor()
        - this.ui = { ... }
        - this.shadowRender()
    - shadowRender()
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
