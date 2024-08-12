/**
 * @returns {boolean}
 */
export function isAndroid(): boolean;
/**
 * @param {string[]} styles
 */
export function styles(...styles: string[]): string;
export { default as CleanUp } from "./cleanup";
export * as draggable from "./draggable";
export { default as Events } from "./events";
export * as ripple from "./ripple";
export const html: any;
export const css: any;
export type DraggableNative_Options = import("./draggable").DraggableNative_Options;
export type DraggableMobile_Options = import("./draggable").DraggableMobile_Options;
export type Ripple_Options = import("./ripple").Ripple_Options;
export type Ripple = import("./ripple").Ripple;