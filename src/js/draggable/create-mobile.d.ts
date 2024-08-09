/**
 * @param {HTMLElement} container
 * @param {object} options
 * @param {(() => void|Promise<void>) | null} [options.onDragEnd]
 */
export default function createMobile(container: HTMLElement, { onDragEnd }: {
    onDragEnd?: (() => void | Promise<void>) | null;
}): void;
