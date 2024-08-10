/**
 * @typedef Pages
 * @type {{
 *  [key: string]: () => (import("./ui-stack-layout-page").UIStackLayoutPage);
 * }}
 */
export class UIStackLayout extends HTMLElement {
    static register: () => void;
    /** @type {Pages} */
    pages: Pages;
    /** @type {UIStackLayoutPage[]} */
    stack: UIStackLayoutPage[];
    onpopstate: () => void;
    ui: {
        root: this;
        /**
         * @type {Events<{
         *  "change": {
         *      oldPage: UIStackLayoutPage | null,
         *      newPage: UIStackLayoutPage | null
         *  }
         * }>}
         */
        events: Events<{
            "change": {
                oldPage: UIStackLayoutPage | null;
                newPage: UIStackLayoutPage | null;
            };
        }>;
        lock: boolean;
        size(): number;
        clear(): void;
        goBack(): void;
        /**
         * @param {string} pageName
         * @param {() => (UIStackLayoutPage)} cb
         */
        register(pageName: string, cb: () => (UIStackLayoutPage)): void;
        /**
         * @param {string} pageName
         */
        unregister(pageName: string): void;
        /**
         * @param {string} pageName
         * @param {((page: UIStackLayoutPage) => void|Promise<void>) | null} [cb]
         * @param {boolean} [keepOldPage]
         */
        set(pageName: string, cb?: ((page: UIStackLayoutPage) => void | Promise<void>) | null, keepOldPage?: boolean): void;
    };
    shadowRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    goBack(): void;
    /**
     * @param {UIStackLayoutPage} oldChild
     */
    dispatchChangeEvent(oldChild: UIStackLayoutPage): Promise<void>;
}
export type Pages = {
    [key: string]: () => (import("./ui-stack-layout-page").UIStackLayoutPage);
};
import { UIStackLayoutPage } from "./ui-stack-layout-page";
import { Events } from "../utils";
