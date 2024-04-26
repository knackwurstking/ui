export class Button extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    ui: UI;
    connectedCallback(): void;
    attributeChangedCallback(name: any, _oldValue: any, newValue: any): void;
}
declare class UI {
    /** @param {Button} root */
    constructor(root: Button);
    /** @type {(() => void) | null} */
    removeRipple: (() => void) | null;
    enableRipple(): void;
    disableRipple(): void;
    #private;
}
export {};
