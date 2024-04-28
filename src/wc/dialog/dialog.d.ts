/**
 * Special slots to use:
 *  - title: all childrens go into "dialog header > span", just use the `Dialog.ui.title` setter/getter
 *  - actions: all childrens go into "dialog footer > ui-flex-grid-row"
 */
export class Dialog extends HTMLElement {
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
    set title(value: string);
    get title(): string;
    #private;
}
import { events } from "../../js";
export {};
