/**
 * Special slots in use
 *  - **input**
 */
export class UILabel extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    cleanup: CleanUp;
    ui: UI;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
    * @param {string} name
    * @param {string | null} _oldValue
    * @param {string | null} newValue
    */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
}
import { CleanUp } from "../js";
declare class UI {
    /** @param {UILabel} root */
    constructor(root: UILabel);
    set primary(value: string);
    get primary(): string;
    set secondary(value: string);
    get secondary(): string;
    getInputSlot(): any[];
    enableRipple(): void;
    removeRipple: () => void;
    disableRipple(): void;
    /**
     * @private
     */
    private startInputHandling;
    /**
     * @private
     */
    private stopInputHandling;
    #private;
}
export {};
