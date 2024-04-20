/**
 * @param {Element | HTMLElement} el
 * @param {import(".").RippleOptions} options
 */
export default function create(el: Element | HTMLElement, options?: import(".").RippleOptions): {
    /**
     * @param {import(".").RippleOptions} _options
     */
    update(_options: import(".").RippleOptions): void;
    destroy: () => void;
};
