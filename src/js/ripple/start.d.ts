/**
 * @param {PointerEvent & { currentTarget: HTMLElement }} ev
 * @param {RippleOptions} options
 * @returns {HTMLElement}
 */
export default function rippleStart(ev: PointerEvent & {
    currentTarget: HTMLElement;
}, options: RippleOptions): HTMLElement;
/**
 * @typedef {import(".").RippleOptions} RippleOptions
 */
/** @type {RippleOptions} */
export const defaultOptions: RippleOptions;
export type RippleOptions = import(".").RippleOptions;
