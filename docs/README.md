# Documentation

> Just some quick and dirty documentation.

## JavaScript

`window.ui` [dist/ui.min.umd.cjs](dist/ui.min.umd.cjs)

```Typescript
interface UI {
    draggable: {
        createNative: (
            container: HTMLElement,
            child: HTMLElement,
            options?: DraggableNativeOptions,
        ) => CleanUpFunction;

        createMobile: (
            container: HTMLElement,
            options?: DraggableNativeOptions,
        ) => CleanUpFunction;
    };

    ripple: {
        create: (
            target: HTMLElement,
            options?: RippleOptions,
        ) => CleanUpFunction;
    };

    router: {
        hash: (routes: { [key: string]: Route }) => void;
    };

    Events: Events<{ [key: string]: any }>;
    Store: Store<{ [key: string]: any }>;
    LanguageHandler: LanguageHandler;

    isAndroid: () => boolean;
    styles: (style: CSSStyleDeclaration) => string;
}
```

Or use [dist/ui.min.js](dist//ui.min.js)

## CSS/Sass

### Theme variables (dark/light schemes)

@TODO: ...

### Utility classes

@TODO: ...

### Components

@TODO: ...
