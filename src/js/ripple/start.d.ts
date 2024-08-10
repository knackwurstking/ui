/**
 * @typedef {import(".").RippleOptions} RippleOptions
 */
/**
 * @param {Event & { currentTarget: HTMLElement }} ev
 * @param {RippleOptions} options
 * @returns {HTMLElement}
 */
export default function rippleStart(ev: Event & {
    currentTarget: HTMLElement;
}, options: RippleOptions): HTMLElement;
export type RippleOptions = import(".").RippleOptions;
