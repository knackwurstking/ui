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
