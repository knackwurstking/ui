export class IconButton extends HTMLElement {
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
export type IconButtonColor = ("primary" | "secondary" | "destructive");
import { CleanUp } from "../../js";
declare class UI {
    /** @param {IconButton} root */
    constructor(root: IconButton);
    /** @type {(() => void) | null} */
    removeRipple: (() => void) | null;
    /**
     * @param {IconButtonColor} v
     */
    set color(v: IconButtonColor);
    get color(): IconButtonColor;
    set ghost(s: boolean);
    get ghost(): boolean;
    disable(): void;
    enable(): void;
    enableRipple(): void;
    disableRipple(): void;
    #private;
}
export {};
