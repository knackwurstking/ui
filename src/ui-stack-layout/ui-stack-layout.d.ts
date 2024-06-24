export class UIStackLayout extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    cleanup: CleanUp;
    ui: {
        /** @private */
        root: this;
        /**
         * @private
         * @type {Pages}
         */
        pages: Pages;
        /**
         * @private
         * @type {UIStackLayoutPage[]}
         */
        stack: UIStackLayoutPage[];
        /**
         * @type {((ev: PopStateEvent) => void|Promise<void>) | null}
         */
        onpopstate: ((ev: PopStateEvent) => void | Promise<void>) | null;
        /**
         * @type {Events<{ "change": { oldPage: UIStackLayoutPage | null, newPage: UIStackLayoutPage | null } }>}
         */
        events: Events<{
            "change": {
                oldPage: UIStackLayoutPage | null;
                newPage: UIStackLayoutPage | null;
            };
        }>;
        lock: boolean;
        enableHistory(): void;
        disableHistory(): void;
        usesHistory(): boolean;
        /**
         * @param {string} name
         * @param {() => (UIStackLayoutPage)} cb
         */
        registerPage(name: string, cb: () => (UIStackLayoutPage)): void;
        /**
         * @param {string} name
         */
        unregisterPage(name: string): void;
        clearStack(): void;
        stackSize(): number;
        goBack(): void;
        /**
         * @private
         */
        _goBack(): void;
        /**
         * @param {string} name
         * @param {((page: UIStackLayoutPage) => void|Promise<void>) | null} [cb]
         * @param {boolean} [keepOldPage]
         */
        setPage(name: string, cb?: ((page: UIStackLayoutPage) => void | Promise<void>) | null, keepOldPage?: boolean): void;
        /**
         * @param {UIStackLayoutPage} oldChild
         */
        dispatchChangeEvent(oldChild: UIStackLayoutPage): Promise<void>;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
}
export type Pages = {
    [key: string]: () => (import("./ui-stack-layout-page").UIStackLayoutPage);
};
import { CleanUp } from "../js";
import { UIStackLayoutPage } from "./ui-stack-layout-page";
import { Events } from "../js";
