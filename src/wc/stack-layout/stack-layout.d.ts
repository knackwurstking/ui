export class StackLayout extends HTMLElement {
    events: events.Events;
    /**
     * All rendered pages
     *
     * @type {{ element: Element, name: string }[]}
     */
    stack: {
        element: Element;
        name: string;
    }[];
    /**
     * @param {string} name
     * @param {() => StackLayoutPage} cb
     */
    registerPage(name: string, cb: () => StackLayoutPage): void;
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
    [key: string]: () => StackLayoutPage;
};
import { events } from "../../js";
import { StackLayoutPage } from "./stack-layout-page";
