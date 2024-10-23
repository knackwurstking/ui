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
