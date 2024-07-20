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
    shadowCSS: () => any;
    shadowTemplate: () => any;
    ui: {
        /** @private */
        root: this;
        cleanup: CleanUp;
        /**
         * @type {Events<UIDrawerEvents>}
         */
        events: Events<UIDrawerEvents>;
        getOpen(): boolean;
        /**
         * @param {boolean} state
         */
        setOpen(state: boolean): void;
    };
    disconnectedCallback(): void;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    shadowRender(): void;
}
export type UIDrawerEvents = {
    open: UIDrawer;
    close: UIDrawer;
};
import { CleanUp } from "../js";
import { Events } from "../js";
