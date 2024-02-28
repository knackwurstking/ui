export { draggable as Root } from "./draggable"

/**
 * @typedef DraggableOptions
 * @type {{
 *  ondragging: (index: number) => void|Promise<void>;
 *  ondragstart: (index: number) => void|Promise<void>;
 *  ondragend: (startIndex: number, index: number) => void|Promise<void>;
 * }}
 */
