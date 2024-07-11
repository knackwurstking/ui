export class UIIconButton extends HTMLElement {
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
export type UIIconButtonColor = import(".").UIIconButtonColor;
export type UIIconButtonEvents = {
    click: UIIconButton;
};
import { CleanUp } from "../js";
import { Events } from "../js";
