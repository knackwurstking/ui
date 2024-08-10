/**
 * @param {Element | HTMLElement} el
 * @param {Ripple_Options} options will be passed down the the ripple start function
 * @returns {Ripple}
 */
export function create(el: Element | HTMLElement, options?: Ripple_Options): Ripple;
/**
 * @param {Event & { currentTarget: HTMLElement }} ev
 * @param {Ripple_Options} options
 * @returns {HTMLElement}
 */
export function start(ev: Event & {
    currentTarget: HTMLElement;
}, options: Ripple_Options): HTMLElement;
/**
 * @param {HTMLElement} ripple
 */
export function stop(ripple: HTMLElement): void;
/**
 * @typedef Ripple_Options
 * @type {{
 *  color?: string;
 *  opacity?: string;
 *  centered?: boolean;
 *  spreadDuration?: string;
 *  spreadTiming?: string;
 *  clearDuration?: string;
 *  clearTiming?: string;
 *  useClick?: boolean;
 * }}
 *
 * @typedef {{
 *  update: (options: Ripple_Options) => void;
 *  destroy: () => void;
 * }} Ripple
 */
/** @type {Ripple_Options} */
export const defaultOptions: Ripple_Options;
export type Ripple_Options = {
    color?: string;
    opacity?: string;
    centered?: boolean;
    spreadDuration?: string;
    spreadTiming?: string;
    clearDuration?: string;
    clearTiming?: string;
    useClick?: boolean;
};
export type Ripple = {
    update: (options: Ripple_Options) => void;
    destroy: () => void;
};
