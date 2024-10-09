export * from "./global-styles";

export { default as CleanUp } from "./cleanup";
export { default as Events } from "./events";

export * as draggable from "./draggable";
export * as ripple from "./ripple";

export function isAndroid(): boolean {
    return /(android)/i.test(navigator.userAgent);
}

export const html = String.raw;
export const css = String.raw;

export function styles(style: { [key: string]: string }): string {
    return (
        Object.entries(style)
            .map(
                ([k, v]) =>
                    `${k.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`)}:${v}`,
            )
            .join(";") + ";"
    );
}
