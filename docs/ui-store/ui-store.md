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
