/**
 * Special slots in use
 *  - **input**
 */
export class Label extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    ui: UI;
    /**
    * @param {string} name
    * @param {string | null} _oldValue
    * @param {string | null} newValue
    */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
}
declare class UI {
    /** @param {Label} root */
    constructor(root: Label);
    set primary(value: string);
    get primary(): string;
    set secondary(value: string);
    get secondary(): string;
    getInputSlot(): any[];
    enableRipple(): void;
    removeRipple: () => void;
    disableRipple(): void;
    _startInputHandling(): void;
    _stopInputHandling(): void;
    #private;
}
export {};
