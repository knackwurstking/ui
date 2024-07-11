export class UIButton extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    /**
     * @private
     */
    private cleanup;
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
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
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
