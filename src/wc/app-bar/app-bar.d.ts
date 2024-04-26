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
