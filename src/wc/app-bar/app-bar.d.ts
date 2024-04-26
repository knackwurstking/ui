export class AppBar extends HTMLElement {
    static register: () => void;
    ui: UI;
}
export type FlexGridRow = import("..").FlexGridRow;
/**
 * @typedef {import("..").FlexGridRow} FlexGridRow
 */
declare class UI {
    /** @param {AppBar} root */
    constructor(root: AppBar);
    getLeftSlot(): any[];
    getCenterSlot(): any[];
    getRightSlot(): any[];
    #private;
}
export {};
