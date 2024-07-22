/**
 * @typedef UIDialogEvents
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
 * @template {UIDialogEvents} T
 */
export class UIDialog<T extends UIDialogEvents> extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    constructor();
    shadowRenderCleanUp: CleanUp;
    ui: {
        root: this;
        /** @type {Events<T>} */
        events: Events<T>;
        title: string;
        fullscreen: boolean;
        /**
         * @param {boolean} modal
         * @param {boolean} [inert] - This will prevent the autofocus on input elements (default: true)
         */
        open(modal?: boolean, inert?: boolean): void;
        close(): void;
    };
    shadowRender(): void;
    render(): void;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
}
export type UIDialogEvents = {
    open: null;
    close: null;
};
import { CleanUp } from "../js";
import { Events } from "../js";
