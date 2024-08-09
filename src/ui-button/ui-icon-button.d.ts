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
    removeRippleCallback: {
        destroy: () => void;
    };
    ui: {
        root: this;
        /**
         * @type {Events<UIIconButtonEvents>}
         */
        events: Events<UIIconButtonEvents>;
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
export type UIIconButtonColor = import(".").UIIconButtonColor;
export type UIIconButtonEvents = {
    click: UIIconButton;
};
import { Events } from "../js";
