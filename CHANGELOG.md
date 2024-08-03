# Changelog

<!--toc:start-->

- [Changelog](#changelog)
  - [v0.2.14 [unreleased]](#v0214-unreleased)
  - [v0.2.13 2024-07-28](#v0213-2024-07-28)
  - [v0.2.12 2024-07-27](#v0212-2024-07-27)
  - [v0.2.11 2024-07-20](#v0211-2024-07-20)
  - [v0.2.10 2024-07-19](#v0210-2024-07-19)
  - [v0.2.9 2024-07-19](#v029-2024-07-19)
  - [v0.2.8 2024-07-18](#v028-2024-07-18)
  - [v0.2.7 2024-07-15](#v027-2024-07-15)
  - [v0.2.6 2024-07-12](#v026-2024-07-12)
  - [v0.2.5 2024-07-11](#v025-2024-07-11)
  - [v0.2.4 2024-07-09](#v024-2024-07-09)
  - [v0.2.3 2024-07-05](#v023-2024-07-05)
  - [v0.2.2 2024-07-03](#v022-2024-07-03)
  - [v0.2.1 2024-06-27](#v021-2024-06-27)
  - [v0.2.0 2024-06-23](#v020-2024-06-23)
  - [v0.1.1 2024-03-22](#v011-2024-03-22)
  <!--toc:end-->

## v0.2.14 [unreleased]

**Added**:

- Component `UICheck`
- Button role
  - `UIDrawer` toggle
  - `UIDrawerGroup` toggle

**Changed**:

- [ ] Component attribute handling like the new `UICheck` component
  - [ ] ui-app-bar
  - [ ] ui-app-bar-item
  - [ ] ui-button
  - [ ] ui-icon-button
  - [ ] ui-container
  - [x] ui-dialog
  - [ ] ui-drawer-group-item
  - [ ] ui-drawer-group
  - [ ] ui-drawer
  - [x] ui-flex-grid-item
  - [x] ui-flex-grid-row
  - [x] ui-flex-grid
  - [x] ui-check
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
