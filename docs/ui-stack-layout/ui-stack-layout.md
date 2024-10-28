# ui-stack-layout

## Properties

| Property | Type                                             | Default        |
|----------|--------------------------------------------------|----------------|
| `events` | `Events<{ change: { old: UIStackLayoutPage \| null; current: UIStackLayoutPage \| null; }; }>` | "new Events()" |
| `stack`  | `UIStackLayoutPage[]`                            | []             |

## Methods

| Method           | Type                                             |
|------------------|--------------------------------------------------|
| `clearStack`     | `(): void`                                       |
| `goBack`         | `(): void`                                       |
| `registerPage`   | `(name: T, cb: (): UIStackLayoutPage \| Promise<UIStackLayoutPage>) => void` |
| `setPage`        | `(name: T, cb?: ((page: UIStackLayoutPage): void \| Promise<void>) \| null, keepOldPage?: boolean) => Promise<void>` |
| `stackSize`      | `(): number`                                     |
| `unregisterPage` | `(name: T): void`                                |

## Slots

| Name | Description                             |
|------|-----------------------------------------|
|      | Takes `ui-stack-layout-page` components |
