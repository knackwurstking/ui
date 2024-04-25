export class StackLayout extends HTMLElement {
    static register: () => void;
    events: events.Events;
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
    #private;
}
export type Pages = {
    [key: string]: () => (StackLayoutPage | DocumentFragment);
};
import { events } from "../../js";
import { StackLayoutPage } from "./stack-layout-page";
