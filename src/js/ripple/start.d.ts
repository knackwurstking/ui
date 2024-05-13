/**
 * @typedef {import(".").RippleOptions} RippleOptions
 */
/**
 * @param {PointerEvent & { currentTarget: HTMLElement }} ev
 * @param {RippleOptions} options
 * @returns {HTMLElement}
 */
export default function rippleStart(ev: PointerEvent & {
    currentTarget: HTMLElement;
}, options: RippleOptions): HTMLElement;
export type RippleOptions = import(".").RippleOptions;
