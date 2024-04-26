export class StackLayout extends HTMLElement {
    static register: () => void;
    ui: UI;
}
export type Pages = {
    [key: string]: () => (StackLayoutPage | DocumentFragment);
};
declare class UI {
    /** @param {StackLayout} root */
    constructor(root: StackLayout);
    /** @type {events.Events<"change", { oldPage: StackLayoutPage | null, newPage: StackLayoutPage | null }>} */
    events: events.Events<"change", {
        oldPage: StackLayoutPage | null;
        newPage: StackLayoutPage | null;
    }>;
    /**
     * All rendered pages
     *
     * @type {import("./stack-layout-page").StackLayoutPage[]}
     */
    stack: import("./stack-layout-page").StackLayoutPage[];
    /**
     * @param {string} name
     * @param {() => (StackLayoutPage | DocumentFragment)} cb
     */
    registerPage(name: string, cb: () => (StackLayoutPage | DocumentFragment)): void;
    /**
     * @param {string} name
     */
    unregisterPage(name: string): void;
    goBack(): void;
    /**
     * @param {string} name
     */
    setPage(name: string): void;
    dispatchChangeEvent(): Promise<void>;
    #private;
}
import { StackLayoutPage } from "./stack-layout-page";
import { events } from "../../js";
export {};
