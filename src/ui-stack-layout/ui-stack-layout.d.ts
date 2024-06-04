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
    /** @type {events.Events<{ "change": { oldPage: UIStackLayoutPage | null, newPage: UIStackLayoutPage | null } }>} */
    events: events.Events<{
        "change": {
            oldPage: UIStackLayoutPage | null;
            newPage: UIStackLayoutPage | null;
        };
    }>;
    /**
     * All rendered pages
     *
     * @type {UIStackLayoutPage[]}
     */
    stack: UIStackLayoutPage[];
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
    goBack(): void;
    /**
     * @param {string} name
     */
    setPage(name: string): void;
    dispatchChangeEvent(): Promise<void>;
    #private;
}
import { events } from "../js";
import { UIStackLayoutPage } from "./ui-stack-layout-page";
export {};
