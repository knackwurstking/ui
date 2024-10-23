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
