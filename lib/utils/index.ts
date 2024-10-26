export * from "./global-styles";
export * from "./events";
export * from "./cleanup";
export { html, css } from "lit";

export * as draggable from "./draggable";
export * as ripple from "./ripple";

export function isAndroid(): boolean {
    return /(android)/i.test(navigator.userAgent);
}

export function styles(style: CSSStyleDeclaration): string {
    return (
        Object.entries(style)
            .map(
                ([k, v]) =>
                    `${k.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`)}:${v}`,
            )
            .join(";") + ";"
    );
}
