export class UIButton extends HTMLElement {
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
export type UIButtonColor = import(".").UIButtonColor;
export type UIButtonVariant = import(".").UIButtonVariant;
export type UIButtonEvents = {
    click: UIButton;
};
import { CleanUp } from "../js";
declare class UI {
    /** @param {UIButton} root */
    constructor(root: UIButton);
    /**
     * @private
     * @type {UIButton}
     */
    private root;
    /** @type {(() => void) | null} */
    removeRipple: (() => void) | null;
    /**
     * @type {Events<UIButtonEvents>}
     */
    events: Events<UIButtonEvents>;
    /**
     * @param {UIButtonColor} v
     */
    set color(v: import(".").UIButtonColor);
    get color(): import(".").UIButtonColor;
    /**
     * @param {UIButtonVariant} v
     */
    set variant(v: import(".").UIButtonVariant);
    get variant(): import(".").UIButtonVariant;
    disable(): void;
    enable(): void;
    enableRipple(): void;
    disableRipple(): void;
}
import { Events } from "../js";
export {};
