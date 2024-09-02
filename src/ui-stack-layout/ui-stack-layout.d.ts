/**
 * @typedef Pages
 * @type {{
 *  [key: string]: () => (import("./ui-stack-layout-page").UIStackLayoutPage);
 * }}
 */
/**
 * HTML: `ui-stack-layout`
 *
 * Slots:
 *  - * from type `UIStackLayoutPage`
 *
 * @template {UIStackLayout_Pages} T
 */
export class UIStackLayout<T extends UIStackLayout_Pages> extends HTMLElement {
    static register: () => void;
    constructor();
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
         * @param {T} pageName
         * @param {() => (UIStackLayoutPage)} cb
         */
        register(pageName: T, cb: () => (UIStackLayoutPage)): void;
        /**
         * @param {T} pageName
         */
        unregister(pageName: T): void;
        /**
         * @param {T} pageName
         * @param {((page: UIStackLayoutPage) => void|Promise<void>) | null} [cb]
         * @param {boolean} [keepOldPage]
         */
        set(pageName: T, cb?: ((page: UIStackLayoutPage) => void | Promise<void>) | null, keepOldPage?: boolean): void;
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
