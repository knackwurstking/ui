export class Button extends HTMLElement {
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
export type ButtonColor = ("primary" | "secondary" | "destructive");
export type ButtonVariant = ("full" | "outline" | "ghost");
import { CleanUp } from "../../js";
declare class UI {
    /** @param {Button} root */
    constructor(root: Button);
    /** @type {(() => void) | null} */
    removeRipple: (() => void) | null;
    /**
     * @param {ButtonColor} v
     */
    set color(v: ButtonColor);
    get color(): ButtonColor;
    /**
     * @param {ButtonVariant} v
     */
    set variant(v: ButtonVariant);
    get variant(): ButtonVariant;
    disable(): void;
    enable(): void;
    enableRipple(): void;
    disableRipple(): void;
    #private;
}
export {};
