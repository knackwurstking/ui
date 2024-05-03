export class Button extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    ui: UI;
    connectedCallback(): void;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
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
