# ui-alert

## Properties

| Property  | Attribute | Type             | Default  |
|-----------|-----------|------------------|----------|
| `message` | `message` | `string`         | ""       |
| `role`    |           | `string`         | "button" |
| `variant` | `variant` | `UIAlertVariant` | "info"   |


# ui-alerts

## Methods

| Method        | Type                                |
|---------------|-------------------------------------|
| `addAlert`    | `(alert: UIAlert): CleanUpFunction` |
| `removeAlert` | `(alert: UIAlert): void`            |

## Slots

| Name | Description                 |
|------|-----------------------------|
|      | Takes `ui-alert` components |


# ui-app-bar-item

## Properties

| Property | Attribute | Type      | Default |
|----------|-----------|-----------|---------|
| `hidden` | `hidden`  | `boolean` | false   |
| `name`   | `name`    | `string`  | ""      |

## Methods

| Method      | Type                                         |
|-------------|----------------------------------------------|
| `content`   | `<T extends HTMLElement[]>(): T`             |
| `contentAt` | `<T extends HTMLElement>(index?: number): T` |
| `hide`      | `(): void`                                   |
| `show`      | `(): void`                                   |

## Slots

| Name |
|------|
|      |


# ui-app-bar

## Properties

| Property   | Attribute  | Type               | Default |
|------------|------------|--------------------|---------|
| `fixed`    | `fixed`    | `boolean`          | false   |
| `position` | `position` | `UIAppBarPosition` | "top"   |

## Methods

| Method        | Type                                             |
|---------------|--------------------------------------------------|
| `content`     | `<T extends UIAppBarItem>(slot: UIAppBarSlots): T[]` |
| `contentName` | `<T extends UIAppBarItem>(name: string): T \| null` |

## Slots

| Name     |
|----------|
| `center` |
| `left`   |
| `right`  |


# ui-button

## Properties

| Property   | Attribute  | Type                           | Default  |
|------------|------------|--------------------------------|----------|
| `color`    | `color`    | `UIButtonColor \| undefined`   |          |
| `disabled` | `disabled` | `Boolean`                      | false    |
| `ripple`   | `ripple`   | `Boolean`                      | false    |
| `role`     |            | `string \| null`               | "button" |
| `variant`  | `variant`  | `UIButtonVariant \| undefined` |          |

## Slots

| Name |
|------|
|      |


# ui-icon-button

## Properties

| Property   | Attribute  | Type                             | Default  |
|------------|------------|----------------------------------|----------|
| `color`    | `color`    | `UIIconButtonColor \| undefined` |          |
| `disabled` | `disabled` | `Boolean`                        | false    |
| `ghost`    | `ghost`    | `Boolean`                        | false    |
| `ripple`   | `ripple`   | `Boolean`                        | false    |
| `role`     |            | `string \| null`                 | "button" |

## Slots

| Name |
|------|
|      |


# ui-dialog

## Properties

| Property     | Attribute    | Type      | Default |
|--------------|--------------|-----------|---------|
| `fullscreen` | `fullscreen` | `string`  | ""      |
| `inert`      | `inert`      | `boolean` | false   |
| `modal`      | `modal`      | `boolean` | false   |
| `noFooter`   | `no-footer`  | `string`  | ""      |
| `open`       | `open`       | `boolean` | false   |
| `title`      | `title`      | `string`  | ""      |

## Methods

| Method                  | Type                                             |
|-------------------------|--------------------------------------------------|
| `addDialogActionButton` | `(content: string, options?: { onClick?: ((ev: MouseEvent): void \| Promise<void>) \| null \| undefined; variant?: UIButtonVariant \| undefined; color?: UIButtonColor \| undefined; flex?: number \| undefined; } \| null \| undefined) => UIButton` |
| `close`                 | `(): void`                                       |
| `show`                  | `(): void`                                       |

## Events

| Event   |
|---------|
| `close` |
| `open`  |

## Slots

| Name      | Description                          |
|-----------|--------------------------------------|
|           | Will be added as ".content"          |
| `actions` | Buttons like "Submit", "Cancel", ... |


# ui-drawer-group-item

## Slots

| Name |
|------|
|      |


# ui-drawer-group

## Properties

| Property | Attribute | Type      | Default |
|----------|-----------|-----------|---------|
| `noFold` | `no-fold` | `boolean` | false   |
| `open`   | `open`    | `boolean` | false   |
| `title`  | `title`   | `string`  | ""      |

## Events

| Event    |
|----------|
| `fold`   |
| `unfold` |

## Slots

| Name |
|------|
|      |


# ui-drawer

## Properties

| Property | Attribute | Type                  | Default  |
|----------|-----------|-----------------------|----------|
| `open`   | `open`    | `boolean`             | false    |
| `role`   |           | `string`              | "button" |
| `width`  | `width`   | `string \| undefined` |          |

## Events

| Event   |
|---------|
| `close` |
| `open`  |

## Slots

| Name |
|------|
|      |


# ui-flex-grid-item

## Properties

| Property  | Attribute | Type                  | Default |
|-----------|-----------|-----------------------|---------|
| `align`   | `align`   | `string \| undefined` |         |
| `flex`    | `flex`    | `number`              | 1       |
| `justify` | `justify` | `string \| undefined` |         |

## Slots

| Name |
|------|
|      |


# ui-flex-grid-row

## Properties

| Property  | Attribute | Type                  | Default |
|-----------|-----------|-----------------------|---------|
| `align`   | `align`   | `string \| undefined` |         |
| `gap`     | `gap`     | `string`              | "0"     |
| `justify` | `justify` | `string \| undefined` |         |
| `wrap`    | `wrap`    | `string \| undefined` |         |

## Slots

| Name |
|------|
|      |


# ui-flex-grid

## Properties

| Property  | Attribute | Type                  | Default |
|-----------|-----------|-----------------------|---------|
| `align`   | `align`   | `string \| undefined` |         |
| `gap`     | `gap`     | `string`              | "0"     |
| `justify` | `justify` | `string \| undefined` |         |
| `wrap`    | `wrap`    | `string \| undefined` |         |

## Slots

| Name |
|------|
|      |


# ui-check

## Properties

| Property  | Attribute | Type      | Default    |
|-----------|-----------|-----------|------------|
| `checked` | `checked` | `boolean` | false      |
| `role`    |           | `string`  | "checkbox" |

## Methods

| Method  | Type       |
|---------|------------|
| `click` | `(): void` |

## Events

| Event    |
|----------|
| `change` |
| `input`  |


# ui-input

## Properties

| Property      | Attribute     | Type      | Default |
|---------------|---------------|-----------|---------|
| `invalid`     | `invalid`     | `boolean` | false   |
| `max`         | `max`         | `string`  | ""      |
| `min`         | `min`         | `string`  | ""      |
| `placeholder` | `placeholder` | `string`  | ""      |
| `role`        |               | `string`  | "input" |
| `title`       | `title`       | `string`  | ""      |
| `type`        | `type`        | `string`  | ""      |
| `value`       | `value`       | `string`  | ""      |

## Methods

| Method  | Type                                          |
|---------|-----------------------------------------------|
| `blur`  | `(): void`                                    |
| `click` | `(): void`                                    |
| `focus` | `(options?: FocusOptions \| undefined): void` |

## Events

| Event    |
|----------|
| `change` |
| `input`  |


# ui-search

## Properties

| Property        | Attribute        | Type      | Default  |
|-----------------|------------------|-----------|----------|
| `invalid`       | `invalid`        | `boolean` | false    |
| `noSubmit`      | `no-submit`      | `boolean` | false    |
| `placeholder`   | `placeholder`    | `string`  | ""       |
| `role`          |                  | `string`  | "search" |
| `storage`       | `storage`        | `boolean` | false    |
| `storageKey`    | `storage-key`    | `string`  | ""       |
| `storagePrefix` | `storage-prefix` | `string`  | ""       |
| `title`         | `title`          | `string`  | ""       |
| `value`         | `value`          | `string`  | ""       |

## Methods

| Method  | Type                                          |
|---------|-----------------------------------------------|
| `blur`  | `(): void`                                    |
| `click` | `(): void`                                    |
| `focus` | `(options?: FocusOptions \| undefined): void` |

## Events

| Event     | Description                                      |
|-----------|--------------------------------------------------|
| `change`  |                                                  |
| `input`   |                                                  |
| `storage` | Triggered after storage data loaded              |
| `submit`  | Triggered if submit button clicked (if "no-submit" property not set) |


# ui-select-option

## Properties

| Property   | Attribute  | Type      | Default  |
|------------|------------|-----------|----------|
| `role`     |            | `string`  | "button" |
| `selected` | `selected` | `boolean` | false    |
| `value`    | `value`    | `string`  | ""       |

## Slots

| Name |
|------|
|      |


# ui-select

## Properties

| Property   | Attribute   | Type      | Default |
|------------|-------------|-----------|---------|
| `keepOpen` | `keep-open` | `boolean` | false   |
| `open`     | `open`      | `boolean` | false   |

## Methods

| Method     | Type                         |
|------------|------------------------------|
| `click`    | `(): void`                   |
| `options`  | `(): UISelectOption[]`       |
| `selected` | `(): UISelectOption \| null` |

## Events

| Event    |
|----------|
| `change` |

## Slots

| Name | Description                         |
|------|-------------------------------------|
|      | Takes `ui-select-option` components |


# ui-textarea

## Properties

| Property      | Attribute     | Type                  | Default   |
|---------------|---------------|-----------------------|-----------|
| `cols`        | `cols`        | `number \| undefined` |           |
| `invalid`     | `invalid`     | `boolean`             | false     |
| `placeholder` | `placeholder` | `string`              | ""        |
| `role`        |               | `string`              | "textbox" |
| `rows`        | `rows`        | `number \| undefined` |           |
| `title`       | `title`       | `string`              | ""        |
| `value`       | `value`       | `string`              | ""        |

## Methods

| Method  | Type                                          |
|---------|-----------------------------------------------|
| `blur`  | `(): void`                                    |
| `click` | `(): void`                                    |
| `focus` | `(options?: FocusOptions \| undefined): void` |

## Events

| Event    |
|----------|
| `change` |
| `input`  |


# ui-lang-type

## Properties

| Property   | Attribute  | Type      | Default |
|------------|------------|-----------|---------|
| `fallback` | `fallback` | `boolean` | false   |
| `href`     | `href`     | `string`  | ""      |
| `name`     | `name`     | `string`  | ""      |


# ui-lang

## Properties

| Property  | Attribute | Type                              | Default        |
|-----------|-----------|-----------------------------------|----------------|
| `current` | `current` | `string`                          | ""             |
| `events`  |           | `Events<{ change: UILangType; }>` | "new Events()" |

## Methods

| Method     | Type                                           |
|------------|------------------------------------------------|
| `fallback` | `(): UILangType \| null`                       |
| `get`      | `(group: string, key: string): string \| null` |

## Slots

| Name | Description                     |
|------|---------------------------------|
|      | Takes "ui-lang-type" components |


# ui-spinner

## Properties

| Property | Attribute | Type      | Default |
|----------|-----------|-----------|---------|
| `nobg`   | `nobg`    | `boolean` | false   |


# ui-stack-layout-page

## Properties

| Property | Attribute | Type     | Default |
|----------|-----------|----------|---------|
| `name`   | `name`    | `string` | ""      |

## Slots

| Name |
|------|
|      |


# ui-stack-layout

## Properties

| Property | Type                                             | Default        |
|----------|--------------------------------------------------|----------------|
| `events` | `Events<{ change: { old: UIStackLayoutPage; current: UIStackLayoutPage; }; }>` | "new Events()" |
| `stack`  | `UIStackLayoutPage[]`                            | []             |

## Methods

| Method       | Type                                             |
|--------------|--------------------------------------------------|
| `clear`      | `(): void`                                       |
| `goBack`     | `(): void`                                       |
| `register`   | `(pageName: T, cb: (): UIStackLayoutPage \| Promise<UIStackLayoutPage>) => void` |
| `set`        | `(pageName: T, cb?: ((page: UIStackLayoutPage): void \| Promise<void>) \| null, keepOldPage?: boolean) => Promise<void>` |
| `stackSize`  | `(): number`                                     |
| `unregister` | `(pageName: T): void`                            |

## Slots

| Name | Description                             |
|------|-----------------------------------------|
|      | Takes `ui-stack-layout-page` components |


# ui-store

## Properties

| Property        | Attribute        | Type        | Default        |
|-----------------|------------------|-------------|----------------|
| `events`        |                  | `Events<T>` | "new Events()" |
| `storage`       | `storage`        | `boolean`   | false          |
| `storagePrefix` | `storage-prefix` | `string`    | ""             |

## Methods

| Method        | Type                                             | Description                                      |
|---------------|--------------------------------------------------|--------------------------------------------------|
| `addListener` | `<K extends keyof T>(key: K, callback: (data: T[K]): void \| Promise<void>, trigger?: boolean) => CleanUpFunction` | This function is just a wrapper for `this.events.addListener(key, data)`,<br />but with an option to trigger the callback once. |
| `getData`     | `<K extends keyof T>(key: K): T[K] \| undefined` |                                                  |
| `setData`     | `<K extends keyof T>(key: K, data: T[K], useDataAsFallback?: boolean): void` |                                                  |
| `updateData`  | `<K extends keyof T>(key: K, callback: (data: T[K]): T[K]) => void` |                                                  |


# ui-svg

## Slots

| Name | Description    |
|------|----------------|
|      | An svg element |


# ui-heading

## Properties

| Property | Attribute | Type                  | Default                | Description               |
|----------|-----------|-----------------------|------------------------|---------------------------|
| `casl`   | `casl`    | `number`              | 1                      | Range between 0 - 1       |
| `crsv`   | `crsv`    | `number`              | 0.5                    | Range between 0 / 0.5 / 1 |
| `family` | `family`  | `string`              | "var(--ui-fontFamily)" |                           |
| `level`  | `level`   | `number \| undefined` |                        |                           |
| `mono`   | `mono`    | `number`              | 0.25                   | Range between 0 - 1       |
| `size`   | `size`    | `string`              | "var(--ui-fontSize)"   |                           |
| `slnt`   | `slnt`    | `number`              | 0                      | Range between -15 - 0     |
| `wght`   | `wght`    | `number`              | 750                    |                           |

## Slots

| Name | Description      |
|------|------------------|
|      | Any kind of text |


# ui-label

## Properties

| Property    | Attribute   | Type                  | Default | Description                                      |
|-------------|-------------|-----------------------|---------|--------------------------------------------------|
| `primary`   | `primary`   | `string \| undefined` |         |                                                  |
| `ripple`    | `ripple`    | `boolean`             | false   | All slotted elements will be clicked once if ripple was set to true |
| `secondary` | `secondary` | `string \| undefined` |         |                                                  |

## Slots

| Name | Description       |
|------|-------------------|
|      | An input elements |


# ui-primary

## Properties

| Property | Attribute | Type     | Default                | Description               |
|----------|-----------|----------|------------------------|---------------------------|
| `casl`   | `casl`    | `number` | 1                      | Range between 0 - 1       |
| `crsv`   | `crsv`    | `number` | 0.5                    | Range between 0 / 0.5 / 1 |
| `family` | `family`  | `string` | "var(--ui-fontFamily)" |                           |
| `mono`   | `mono`    | `number` | 0                      | Range between 0 - 1       |
| `size`   | `size`    | `string` | "1.1rem"               |                           |
| `slnt`   | `slnt`    | `number` | 0                      | Range between -15 - 0     |
| `wght`   | `wght`    | `number` | 425                    |                           |

## Slots

| Name | Description      |
|------|------------------|
|      | Any kind of text |


# ui-secondary

## Properties

| Property | Attribute | Type     | Default                | Description               |
|----------|-----------|----------|------------------------|---------------------------|
| `casl`   | `casl`    | `number` | 1                      | Range between 0 - 1       |
| `crsv`   | `crsv`    | `number` | 0.5                    | Range between 0 / 0.5 / 1 |
| `family` | `family`  | `string` | "var(--ui-fontFamily)" |                           |
| `mono`   | `mono`    | `number` | 0                      | Range between 0 - 1       |
| `size`   | `size`    | `string` | "0.9rem"               |                           |
| `slnt`   | `slnt`    | `number` | -15                    | Range between -15 - 0     |
| `wght`   | `wght`    | `number` | 350                    |                           |

## Slots

| Name | Description      |
|------|------------------|
|      | Any kind of text |


# ui-text

## Properties

| Property | Attribute | Type     | Default                | Description               |
|----------|-----------|----------|------------------------|---------------------------|
| `casl`   | `casl`    | `number` | 1                      | Range between 0 - 1       |
| `crsv`   | `crsv`    | `number` | 0.5                    | Range between 0 / 0.5 / 1 |
| `family` | `family`  | `string` | "var(--ui-fontFamily)" |                           |
| `mono`   | `mono`    | `number` | 0                      | Range between 0 - 1       |
| `size`   | `size`    | `string` | "var(--ui-fontSize)"   |                           |
| `slnt`   | `slnt`    | `number` | 0                      | Range between -15 - 0     |
| `wght`   | `wght`    | `number` | 400                    |                           |

## Slots

| Name | Description      |
|------|------------------|
|      | Any kind of text |


# ui-theme-handler

## Properties

| Property     | Attribute     | Type                              | Default    |
|--------------|---------------|-----------------------------------|------------|
| `auto`       | `auto`        | `boolean`                         | false      |
| `mode`       | `mode`        | `UIThemeHandlerMode \| undefined` |            |
| `theme`      | `theme`       | `UIThemeHandlerTheme`             | "original" |
| `themesPath` | `themes-path` | `string`                          | "/themes"  |
