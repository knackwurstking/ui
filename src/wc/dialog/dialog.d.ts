/**
 * Special slots to use:
 *  - title: all childrens go into "dialog header > span", just use the `Dialog.ui.title` setter/getter
 *  - actions: all childrens go into "dialog footer > ui-flex-grid-row"
 *
 * @template {DialogEvents} T
 */
export class Dialog<T extends DialogEvents> extends HTMLElement {
    static register: () => void;
    constructor();
    /** @type {UI<DialogEvents & T>} */
    ui: UI<DialogEvents & T>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    #private;
}
export type DialogEvents = {
    close: null;
};
/**
 * @template {DialogEvents} T
 */
declare class UI<T extends DialogEvents> {
    /**
     * @param {Dialog} root
     * @param {HTMLDialogElement} dialog
     */
    constructor(root: Dialog<any>, dialog: HTMLDialogElement);
    /** @type {events.Events<T>} */
    events: events.Events<T>;
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
