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
 *  - color: "primary" | "secondary" | "destructive"
 *  - ghost
 *  - noripple
 *  - disabled
 *
 * Slots:
 *  - *
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
        color: string;
        ghost: boolean;
        disabled: boolean;
    };
    shadowRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
}
export type UIIconButton_Color = import("./ui-button").UIButton_Color;
export type UIIconButton_Events = {
    click: UIIconButton;
};
import { Events } from "../utils";
