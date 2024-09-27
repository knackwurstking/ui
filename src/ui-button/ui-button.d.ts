/**
 * @typedef UIButton_Color
 * @type {(
 *  | "primary"
 *  | "secondary"
 *  | "destructive"
 * )}
 *
 * @typedef UIButton_Variant
 * @type {(
 *  | "full"
 *  | "outline"
 *  | "ghost"
 * )}
 *
 * @typedef UIButton_Events
 * @type {{
 *  click: UIButton;
 * }}
 */
/**
 * HTML: `ui-button`
 *
 * Attribute:
 *  - __variant__: *"ghost" | "outline" | "full"*
 *  - __color__: *"primary" | "secondary" | "destructive"*
 *  - __noripple__: *boolean*
 *  - __disabled__: *boolean*
 *
 * Slots:
 *  - __\*__
 */
export class UIButton extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    /** @type {import("../utils").Ripple | null} */
    ripple: import("../utils").Ripple | null;
    ui: {
        root: this;
        /**
         * @type {Events<UIButton_Events>}
         */
        events: Events<UIButton_Events>;
        noripple: boolean;
        color: UIButton_Color;
        variant: UIButton_Variant;
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
export type UIButton_Color = ("primary" | "secondary" | "destructive");
export type UIButton_Variant = ("full" | "outline" | "ghost");
export type UIButton_Events = {
    click: UIButton;
};
import { Events } from "../utils";
