/**
 * @param {Element | HTMLElement} el
 * @param {import(".").RippleOptions} options will be passed down the the ripple start function
 */
export default function create(el: Element | HTMLElement, options?: import(".").RippleOptions): {
    destroy: () => void;
};
/**
 * @typedef {import(".").RippleOptions} RippleOptions
 */
/** @type {RippleOptions} */
export const defaultOptions: RippleOptions;
export type RippleOptions = import(".").RippleOptions;
