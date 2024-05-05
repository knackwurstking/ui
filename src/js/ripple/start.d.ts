/**
 * @param {PointerEvent & { currentTarget: HTMLElement }} ev
 * @param {import(".").RippleOptions} options
 * @returns {HTMLElement}
 */
export default function rippleStart(ev: PointerEvent & {
    currentTarget: HTMLElement;
}, options: import(".").RippleOptions): HTMLElement;
/** @type {import(".").RippleOptions} */
export const defaultOptions: import(".").RippleOptions;
