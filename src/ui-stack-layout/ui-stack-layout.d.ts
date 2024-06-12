export class UIStackLayout extends HTMLElement {
    static register: () => void;
    cleanup: CleanUp;
    ui: UI;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
export type UIPages = import(".").UIPages;
import { CleanUp } from "../js";
declare class UI {
    /** @param {UIStackLayout} root */
    constructor(root: UIStackLayout);
    /** @type {Events<{ "change": { oldPage: UIStackLayoutPage | null, newPage: UIStackLayoutPage | null } }>} */
    events: Events<{
        "change": {
            oldPage: UIStackLayoutPage | null;
            newPage: UIStackLayoutPage | null;
        };
    }>;
    /**
     * All rendered pages
     *
     * @private
     * @type {UIStackLayoutPage[]}
     */
    private stack;
    /**
     * @param {string} name
     * @param {() => (UIStackLayoutPage | DocumentFragment | Node)} cb
     */
    registerPage(name: string, cb: () => (UIStackLayoutPage | DocumentFragment | Node)): void;
    /**
     * @param {string} name
     */
    unregisterPage(name: string): void;
    lock(): void;
    unlock(): void;
    clearStack(): void;
    stackSize(): number;
    goBack(): void;
    /**
     * @param {string} name
     */
    setPage(name: string): void;
    /**
     * @param {UIStackLayoutPage} oldChild
     */
    dispatchChangeEvent(oldChild: UIStackLayoutPage): Promise<void>;
    #private;
}
import { Events } from "../js";
import { UIStackLayoutPage } from "./ui-stack-layout-page";
export {};
