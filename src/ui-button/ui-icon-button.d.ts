/**
 * @typedef {import(".").UIIconButtonColor} UIIconButtonColor
 *
 * @typedef UIIconButtonEvents
 * @type {{
 *  click: UIIconButton;
 * }}
 */
export class UIIconButton extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    shadowCSS: () => any;
    shadowTemplate: () => any;
    ui: {
        /** @private */
        root: this;
        cleanup: CleanUp;
        /**
         * @type {Events<UIIconButtonEvents>}
         */
        events: Events<UIIconButtonEvents>;
        /**
         * @private
         * @type {(() => void) | null}
         */
        removeRipple: (() => void) | null;
        /**
         * @returns {UIIconButtonColor}
         */
        getColor(): UIIconButtonColor;
        /**
         * @param {UIIconButtonColor} value
         */
        setColor(value: UIIconButtonColor): void;
        /**
         * @returns {boolean}
         */
        getGhost(): boolean;
        /**
         * @param {boolean} state
         */
        setGhost(state: boolean): void;
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
export type UIIconButtonColor = import(".").UIIconButtonColor;
export type UIIconButtonEvents = {
    click: UIIconButton;
};
import { CleanUp } from "../js";
import { Events } from "../js";
