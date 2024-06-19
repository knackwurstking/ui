export class UIStackLayout extends HTMLElement {
    static register: () => void;
    cleanup: CleanUp;
    ui: {
        /** @private */
        root: this;
        /**
         * @private
         * @type {UIPages}
         */
        pages: UIPages;
        /**
         * @private
         * @type {UIStackLayoutPage[]}
         */
        stack: UIStackLayoutPage[];
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
}
export type UIPages = import(".").UIPages;
import { CleanUp } from "../js";
import { UIStackLayoutPage } from "./ui-stack-layout-page";
import { Events } from "../js";
