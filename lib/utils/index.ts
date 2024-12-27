export * from "./global-styles";

export * as draggable from "./draggable";
export * as ripple from "./ripple";

export type CleanUpFunction = () => void | Promise<void>;

export function isAndroid(): boolean {
    return /(android)/i.test(navigator.userAgent);
}

export function styles(style: CSSStyleDeclaration): string {
    return (
        Object.entries(style)
            .map(([k, v]) => `${k.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`)}:${v}`)
            .join(";") + ";"
    );
}
