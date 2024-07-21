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
    static defaultAttributes: {
        /** @type {string | null} */
        color: string | null;
        /** @type {string | null} */
        disabled: string | null;
        /** @type {string | null} */
        ghost: string | null;
        /** @type {string | null} */
        ripple: string | null;
    };
    renderCleanUp: CleanUp;
    removeRippleCallback: () => void;
    ui: {
        root: this;
        /**
         * @type {Events<UIIconButtonEvents>}
         */
        events: Events<UIIconButtonEvents>;
        ripple: boolean;
        color: string;
        ghost: boolean;
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
export type UIIconButtonColor = import(".").UIIconButtonColor;
export type UIIconButtonEvents = {
    click: UIIconButton;
};
import { CleanUp } from "../js";
import { Events } from "../js";
