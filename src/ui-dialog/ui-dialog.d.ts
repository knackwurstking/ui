/**
 * Special slots to use:
 *  - **title**: all childrens go into _"dialog header > span"_, just use the `Dialog.ui.title` setter/getter
 *  - **actions**: all childrens go into _"dialog footer > ui-flex-grid-row"_
 *
 * @template {UIDialogEvents} T
 */
export class UIDialog<T extends import(".").UIDialogEvents> extends HTMLElement {
    static register: () => void;
    constructor();
    cleanup: CleanUp;
    ui: {
        /** @type {Events<T>} */
        events: Events<T>;
        /**
         * @private
         * @type {HTMLElement}
         */
        h4: HTMLElement;
        /**
         * @private
         * @type {HTMLDialogElement}
         */
        dialog: HTMLDialogElement;
        getFullscreen: () => boolean;
        /**
         * @param {boolean} state
         */
        setFullscreen: (state: boolean) => void;
        getTitle: () => string;
        /**
         * @param {string} value
         */
        setTitle: (value: string) => void;
        getDialogElement: () => HTMLDialogElement;
        open: (modal?: boolean, inert?: boolean) => void;
        close: () => void;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
}
export type UIDialogEvents = import(".").UIDialogEvents;
import { CleanUp } from "../js";
import { Events } from "../js";
