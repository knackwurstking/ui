export class IconButton extends HTMLElement {
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
    /** @param {IconButton} root */
    constructor(root: IconButton);
    /** @type {(() => void) | null} */
    removeRipple: (() => void) | null;
    enableRipple(): void;
    disableRipple(): void;
    #private;
}
export {};
