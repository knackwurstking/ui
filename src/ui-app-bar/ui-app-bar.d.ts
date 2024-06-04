/**
 * Special slots to use (no unnamed slots)
 *  - **left**: childrens inside a "ui-flex-grid-row"
 *  - **center**: childrens inside a "ui-flex-grid-row"
 *  - **right**: childrens inside a "ui-flex-grid-row"
 */
export class UIAppBar extends HTMLElement {
    static register: () => void;
    cleanup: CleanUp;
    ui: UI;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
import { CleanUp } from "../js";
declare class UI {
    /** @param {UIAppBar} root */
    constructor(root: UIAppBar);
    getLeftSlot(): any[];
    getCenterSlot(): any[];
    getRightSlot(): any[];
    #private;
}
export {};
