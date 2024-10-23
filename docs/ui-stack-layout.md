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
