/**
 * Special slots to use:
 *  - title: all childrens go into "dialog header > span", just use the `Dialog.ui.title` setter/getter
 *  - actions: all childrens go into "dialog footer > ui-flex-grid-row"
 *
 * @template {UIDialogEvents} T
 */
export class UIDialog<T extends import(".").UIDialogEvents> extends HTMLElement {
    static register: () => void;
    constructor();
    cleanup: CleanUp;
    /** @type {UI<UIDialogEvents & T>} */
    ui: UI<UIDialogEvents & T>;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
export type UIDialogEvents = import(".").UIDialogEvents;
import { CleanUp } from "../js";
/**
 * @template {UIDialogEvents} T
 */
declare class UI<T extends import(".").UIDialogEvents> {
    /**
     * @param {UIDialog} root
     * @param {HTMLDialogElement} dialog
     */
    constructor(root: UIDialog<any>, dialog: HTMLDialogElement);
    /** @type {Events<T>} */
    events: Events<T>;
    set fullscreen(state: boolean);
    get fullscreen(): boolean;
    set title(value: string);
    get title(): string;
    getDialogElement(): HTMLDialogElement;
    open(modal?: boolean, inert?: boolean): void;
    close(): void;
    #private;
}
import { Events } from "../js";
export {};
