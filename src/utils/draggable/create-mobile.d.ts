/**
 * @typedef {{
 *  onDragStart?: (() => void|Promise<void>) | null;
 *  onDragEnd?: (() => void|Promise<void>) | null;
 * }} DraggableMobile_Options
 */
/**
 * @param {HTMLElement} container
 * @param {DraggableMobile_Options} options
 */
export default function createMobile(container: HTMLElement, { onDragEnd, onDragStart }?: DraggableMobile_Options): {
    /** @param {DraggableMobile_Options} options */
    update: (options: DraggableMobile_Options) => void;
    destroy: () => void;
};
export type DraggableMobile_Options = {
    onDragStart?: (() => void | Promise<void>) | null;
    onDragEnd?: (() => void | Promise<void>) | null;
};
