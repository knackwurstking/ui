/**
 * @typedef UIButtonColor
 * @type {(
 *  | "string"
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
    shadowCSS: () => any;
    shadowTemplate: () => any;
    ui: {
        /** @private */
        root: this;
        cleanup: CleanUp;
        /**
         * @type {Events<UIButtonEvents>}
         */
        events: Events<UIButtonEvents>;
        /**
         * @private
         * @type {(() => void) | null}
         */
        removeRipple: (() => void) | null;
        /**
         * @returns {UIButtonColor}
         */
        getColor(): UIButtonColor;
        /**
         * @param {UIButtonColor} value
         */
        setColor(value: UIButtonColor): void;
        /**
         * @returns {UIButtonVariant}
         */
        getVariant(): UIButtonVariant;
        /**
         * @param {UIButtonVariant} value
         */
        setVariant(value: UIButtonVariant): void;
        disable(): void;
        enable(): void;
        enableRipple(): void;
        disableRipple(): void;
    };
    /**
     * @private
     */
    private cleanup;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    shadowRender(): void;
    /**
     * @private
     */
    private bindClickEvent;
}
export type UIButtonColor = ("string" | "primary" | "secondary" | "destructive");
export type UIButtonVariant = ("full" | "outline" | "ghost");
export type UIButtonEvents = {
    click: UIButton;
};
import { CleanUp } from "../js";
import { Events } from "../js";
