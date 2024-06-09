export class UIIconButton extends HTMLElement {
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
export type UIIconButtonColor = import(".").UIIconButtonColor;
export type UIIconButtonEvents = {
    click: UIIconButton;
};
import { CleanUp } from "../js";
declare class UI {
    /** @param {UIIconButton} root */
    constructor(root: UIIconButton);
    /**
     * @private
     * @type {UIIconButton}
     */
    private root;
    /** @type {(() => void) | null} */
    removeRipple: (() => void) | null;
    /**
     * @type {Events<UIIconButtonEvents>}
     */
    events: Events<UIIconButtonEvents>;
    /**
     * @param {UIIconButtonColor} v
     */
    set color(v: import(".").UIIconButtonColor);
    get color(): import(".").UIIconButtonColor;
    set ghost(s: boolean);
    get ghost(): boolean;
    disable(): void;
    enable(): void;
    enableRipple(): void;
    disableRipple(): void;
}
import { Events } from "../js";
export {};
