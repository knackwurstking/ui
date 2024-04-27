/**
 * Special slots to use (no unnamed slots)
 *  - **left**: childrens inside a "ui-flex-grid-row"
 *  - **center**: childrens inside a "ui-flex-grid-row"
 *  - **right**: childrens inside a "ui-flex-grid-row"
 */
export class AppBar extends HTMLElement {
    static register: () => void;
    ui: UI;
}
declare class UI {
    /** @param {AppBar} root */
    constructor(root: AppBar);
    getLeftSlot(): any[];
    getCenterSlot(): any[];
    getRightSlot(): any[];
    #private;
}
export {};
