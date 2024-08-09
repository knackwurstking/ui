/**
 * @param {HTMLElement} container
 * @param {object} options
 * @param {(() => void|Promise<void>) | null} [options.onDragEnd]
 * @param {(() => void|Promise<void>) | null} [options.onDragStart]
 */
export default function createMobile(container: HTMLElement, { onDragEnd, onDragStart }: {
    onDragEnd?: (() => void | Promise<void>) | null;
    onDragStart?: (() => void | Promise<void>) | null;
}): {
    destroy: () => void;
};
