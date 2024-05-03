/**
 * @param {HTMLElement} el
 * @param {DraggableOptions} options
 */
export default function create(el: HTMLElement, options?: DraggableOptions): {
    /**
     * @param {DraggableOptions} _options
     */
    update(_options: DraggableOptions): void;
    destroy: () => void;
};
export type DraggableOptions = import(".").DraggableOptions;
