/**
 * @typedef {import("./ui-button").UIButton_Color} UIIconButton_Color
 *
 * @typedef UIIconButton_Events
 * @type {{
 *  click: UIIconButton;
 * }}
 */
/**
 * HTML: `ui-icon-button`
 *
 * Attribute:
 *  - __color__: *"primary" | "secondary" | "destructive"*
 *  - __ghost__: *boolean*
 *  - __noripple__: *boolean*
 *  - __disabled__: *boolean*
 *
 * Slots:
 *  - __\*__
 */
export class UIIconButton extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    /** @type {import("../utils").Ripple | null} */
    ripple: import("../utils").Ripple | null;
    ui: {
        root: this;
        /**
         * @type {Events<UIIconButton_Events>}
         */
        events: Events<UIIconButton_Events>;
        noripple: boolean;
        color: import("./ui-button").UIButton_Color;
        ghost: boolean;
        disabled: boolean;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    #private;
}
export type UIIconButton_Color = import("./ui-button").UIButton_Color;
export type UIIconButton_Events = {
    click: UIIconButton;
};
import { Events } from "../utils";
