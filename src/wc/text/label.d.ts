/**
 * Special slots in use (no unnamed slots)
 *  - **primary**
 *  - **secondary**
 *  - **input**
 */
export class Label extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    ui: UI;
    attributeChangedCallback(name: any, _oldValue: any, newValue: any): void;
}
declare class UI {
    /** @param {Label} root */
    constructor(root: Label);
    enableRipple(): void;
    removeRipple: () => void;
    disableRipple(): void;
    #private;
}
export {};
