/**
 * @typedef DraggableNative_Options
 * @type {{
 *  onDragging?: ((index: number) => void | Promise<void>) | null;
 *  onDragStart?: ((index: number) => void | Promise<void>) | null;
 *  onDragEnd?: ((index: number) => void | Promise<void>) | null;
 * }}
 */
/**
 * @param {HTMLElement} container
 * @param {HTMLElement} el
 * @param {DraggableNative_Options} options
 */
export default function createNative(container: HTMLElement, el: HTMLElement, { onDragStart, onDragging, onDragEnd }?: DraggableNative_Options): {
    /**
     * @param {DraggableNative_Options} options
     */
    update(options: DraggableNative_Options): void;
    destroy: () => void;
};
export type DraggableNative_Options = {
    onDragging?: ((index: number) => void | Promise<void>) | null;
    onDragStart?: ((index: number) => void | Promise<void>) | null;
    onDragEnd?: ((index: number) => void | Promise<void>) | null;
};
