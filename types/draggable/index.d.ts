export { default as create } from "./create";
export type DraggableOptions = {
    ondragging: (index: number) => void | Promise<void>;
    ondragstart: (index: number) => void | Promise<void>;
    ondragend: (startIndex: number, index: number) => void | Promise<void>;
};
