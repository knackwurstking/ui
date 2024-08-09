export { default as create } from "./create";
export { default as createMobile } from "./create-mobile";

/**
 * @typedef DraggableOptions
 * @type {{
 *  onDragging?: ((index: number) => void | Promise<void>) | null;
 *  onDragStart?: ((index: number) => void | Promise<void>) | null;
 *  onDragEnd?: ((index: number) => void | Promise<void>) | null;
 * }}
 */
