/**
 * @typedef UIButtonColor
 * @type {(
 *  | "primary"
 *  | "secondary"
 *  | "destructive"
 * )}
 *
 * @typedef UIButtonVariant
 * @type {(
 *  | "full"
 *  | "outline"
 *  | "ghost"
 * )}
 *
 * @typedef UIButtonEvents
 * @type {{
 *  click: UIButton;
 * }}
 */
export class UIButton extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    removeRippleCallback: {
        destroy: () => void;
    };
    ui: {
        root: this;
        /**
         * @type {Events<UIButtonEvents>}
         */
        events: Events<UIButtonEvents>;
        noripple: boolean;
        color: string;
        variant: string;
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
export type UIButtonColor = ("primary" | "secondary" | "destructive");
export type UIButtonVariant = ("full" | "outline" | "ghost");
export type UIButtonEvents = {
    click: UIButton;
};
import { Events } from "../js";
