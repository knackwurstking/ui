# Changelog

## v0.2.12 [unreleased]

### NOTE

New standard methods for all ui components:

    - contructor()
        - this.ui = { ... }
        - this.shadowRender()
        - this.render()
    - shadowRender()
    - render()

### Changed

- Icon button size (2.5rem)
- [ ] Components structure
    - [x] ui-app-bar
    - [x] ui-app-bar-item
    - [x] ui-button
    - [x] ui-icon-button
    - [x] ui-container
    - [x] ui-dialog
    - [x] ui-drawer-group-item [*dev5*]
    - [x] ui-drawer-group [*dev5*]
    - [x] ui-drawer [*dev5*]
    - [x] ui-flex-grid-item [*dev5*]
    - [x] ui-flex-grid-row [*dev5*]
    - [ ] ui-flex-grid
    - [ ] ui-input
    - [ ] ui-search
    - [ ] ui-select-option
    - [ ] ui-select
    - [ ] ui-lang-type
    - [ ] ui-lang
    - [ ] ui-spinner
    - [ ] ui-stack-layout-page
    - [ ] ui-stack-layout
    - [ ] ui-store
    - [ ] ui-svg
    - [ ] ui-label
    - [ ] ui-primary
    - [ ] ui-secondary
    - [ ] ui-theme-handler


## v0.2.11 2024-07-20

### Changed

- Drawer width, now "20rem" instead of "18em"

### Fixed

- Drawer outside click to close


## v0.2.10 2024-07-19

### Added

- CSS util `is-scroll`: Disable all pointer events

### Changed

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

- Added css util: ".has-save-area"
- Changed dialog paddings (top/bottom) for `env(save-area-inset-*)`
