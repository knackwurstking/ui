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
    static defaultAttributes: {
        /** @type {string | null} */
        color: string | null;
        /** @type {string | null} */
        disabled: string | null;
        /** @type {string | null} */
        ripple: string | null;
        /** @type {string | null} */
        variant: string | null;
    };
    renderCleanUp: CleanUp;
    removeRippleCallback: () => void;
    ui: {
        root: this;
        /**
         * @type {Events<UIButtonEvents>}
         */
        events: Events<UIButtonEvents>;
        ripple: boolean;
        color: string;
        variant: string;
        disabled: boolean;
    };
    connectedCallback(): void;
    shadowRender(): void;
    render(): void;
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
import { CleanUp } from "../js";
import { Events } from "../js";
