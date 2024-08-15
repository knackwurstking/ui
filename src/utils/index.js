export { default as CleanUp } from "./cleanup";
export * as draggable from "./draggable";
export { default as Events } from "./events";
export * as ripple from "./ripple";

/**
 * @returns {boolean}
 */
export function isAndroid() {
  return /(android)/i.test(navigator.userAgent);
}

export const html = String.raw;
export const css = String.raw;

/**
 * @param {{ [key: string]: string }} style
 */
export function styles(style) {
  return (
    Object.entries(style)
      .map(
        ([k, v]) => `${k.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`)}:${v}`,
      )
      .join(";") + ";"
  );
}

/**
 * @typedef {import("./draggable").DraggableNative_Options} DraggableNative_Options
 * @typedef {import("./draggable").DraggableMobile_Options} DraggableMobile_Options
 * @typedef {import("./ripple").Ripple_Options} Ripple_Options
 * @typedef {import("./ripple").Ripple} Ripple
 */
