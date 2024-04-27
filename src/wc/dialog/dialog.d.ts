/**
 * Special slots to use:
 *  - title: all childrens go into "header > h4"
 *  - actions: all childrens go into "footer > ui-flex-grid-row" (shadowRoot)
 */
export class Dialog extends HTMLDialogElement {
    static register: () => void;
    ui: UI;
    connectedCallback(): void;
    disconnectedCallback(): void;
    #private;
}
export type _Events = {
    close: null;
};
declare class UI {
    /**
     * @param {Dialog} root
     * @param {HTMLDialogElement} dialog
     */
    constructor(root: Dialog, dialog: HTMLDialogElement);
    /** @type {events.Events<_Events>} */
    events: events.Events<_Events>;
    get dialog(): HTMLDialogElement;
    open(modal?: boolean): void;
    close(): void;
    set fullscreen(state: boolean);
    get fullscreen(): boolean;
    #private;
}
import { events } from "../../js";
export {};
