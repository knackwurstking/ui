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
