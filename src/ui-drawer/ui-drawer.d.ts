/**
 * @typedef UIDrawerEvents
 * @type {{
 *  open: UIDrawer,
 *  close: UIDrawer,
 * }}
 */
export class UIDrawer extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    isOpen: boolean;
    ui: {
        root: this;
        /**
         * @type {Events<UIDrawerEvents>}
         */
        events: Events<UIDrawerEvents>;
        open: boolean;
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
export type UIDrawerEvents = {
    open: UIDrawer;
    close: UIDrawer;
};
import { Events } from "../js";
