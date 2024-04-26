export class IconButton extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    ui: UI;
    connectedCallback(): void;
    attributeChangedCallback(name: any, _oldValue: any, newValue: any): void;
}
declare class UI {
    /** @param {IconButton} root */
    constructor(root: IconButton);
    /** @type {(() => void) | null} */
    removeRipple: (() => void) | null;
    enableRipple(): void;
    disableRipple(): void;
    #private;
}
export {};
