/**
 * @typedef {import("./ui-stack-layout-page").UIStackLayoutPage} UIStackLayoutPage
 *
 * @typedef Pages
 * @type {{
 *  [key: string]: () => (UIStackLayoutPage|Promise<UIStackLayoutPage>);
 * }}
 */
/**
 * HTML: `ui-stack-layout`
 *
 * Slots:
 *  - __\*__ from type `UIStackLayoutPage`
 *
 * @template {string} T
 */
export class UIStackLayout<T extends string> extends HTMLElement {
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
         * @param {(() => UIStackLayoutPage|Promise<UIStackLayoutPage>)} cb
         */
        register(pageName: T, cb: (() => UIStackLayoutPage | Promise<UIStackLayoutPage>)): void;
        /**
         * @param {T} pageName
         */
        unregister(pageName: T): void;
        /**
         * @param {T} pageName
         * @param {((page: UIStackLayoutPage) => void|Promise<void>) | null} [cb]
         * @param {boolean} [keepOldPage]
         */
        set(pageName: T, cb?: ((page: UIStackLayoutPage) => void | Promise<void>) | null, keepOldPage?: boolean): Promise<void>;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    goBack(): void;
    /**
     * @param {UIStackLayoutPage} oldChild
     */
    dispatchChangeEvent(oldChild: UIStackLayoutPage): Promise<void>;
    #private;
}
export type UIStackLayoutPage = import("./ui-stack-layout-page").UIStackLayoutPage;
export type Pages = {
    [key: string]: () => (UIStackLayoutPage | Promise<UIStackLayoutPage>);
};
import { Events } from "../utils";
