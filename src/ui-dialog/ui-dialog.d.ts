/**
 * @typedef UIDialog_Events
 * @type {{
 *  open: null;
 *  close: null;
 * }}
 */
/**
 * Special slots to use:
 *  - **title**: all childrens go into _"dialog header > span"_, just use the `Dialog.ui.title` setter/getter
 *  - **actions**: all childrens go into _"dialog footer > ui-flex-grid-row"_
 *
 * @template {UIDialog_Events} T
 */
export class UIDialog<T extends UIDialog_Events> extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    /**
     * @param {string} title
     */
    constructor(title: string);
    shadowRenderCleanUp: CleanUp;
    _title: string;
    ui: {
        root: this;
        /** @type {Events<T>} */
        events: Events<T>;
        title: string;
        fullscreen: boolean;
        nofooter: boolean;
        /**
         * @param {boolean} modal
         * @param {boolean} [inert] - This will prevent the autofocus on input elements (default: true)
         */
        open(modal?: boolean, inert?: boolean): void;
        close(): void;
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
export type UIDialog_Events = {
    open: null;
    close: null;
};
import { CleanUp } from "../utils";
import { Events } from "../utils";
