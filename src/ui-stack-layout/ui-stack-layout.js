import { Events, html } from "../utils";
import { UIStackLayoutPage } from "./ui-stack-layout-page";

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
 *  - __\*__ from type `UIStackLayoutPage`
 *
 * @template {string} T
 */
export class UIStackLayout extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-stack-layout")) {
            customElements.define("ui-stack-layout", UIStackLayout);
        }
    };

    constructor() {
        super();

        /** @type {Pages} */
        this.pages = {};

        /** @type {UIStackLayoutPage[]} */
        this.stack = [];

        this.onpopstate = () => this.goBack();

        this.ui = {
            root: this,

            /**
             * @type {Events<{
             *  "change": {
             *      oldPage: UIStackLayoutPage | null,
             *      newPage: UIStackLayoutPage | null
             *  }
             * }>}
             */
            events: new Events(),

            lock: false,

            size() {
                return this.root.stack.length;
            },

            clear() {
                while (this.size() > 0) {
                    this.root.removeChild(this.root.stack.pop());
                }
            },

            goBack() {
                if (!this.size() || this.lock) return;

                if (this.root.onpopstate !== null) {
                    history.back();
                    return;
                }

                this.root.goBack();
            },

            /**
             * @param {T} pageName
             * @param {() => (UIStackLayoutPage)} cb
             */
            register(pageName, cb) {
                this.root.pages[pageName] = cb;
            },

            /**
             * @param {T} pageName
             */
            unregister(pageName) {
                delete this.root.pages[pageName];
            },

            /**
             * @param {T} pageName
             * @param {((page: UIStackLayoutPage) => void|Promise<void>) | null} [cb]
             * @param {boolean} [keepOldPage]
             */
            set(pageName, cb = null, keepOldPage = false) {
                if (this.lock) return;

                const page = this.root.pages[pageName]();
                this.root.stack.push(this.root.appendChild(page));
                if (typeof cb === "function") cb(page);

                let pageToRemove = null;
                if (this.size() > 1 && !keepOldPage) {
                    pageToRemove = this.root.stack[this.root.stack.length - 2];
                    pageToRemove.parentElement.removeChild(pageToRemove);
                }

                this.root.dispatchChangeEvent(pageToRemove);

                if (this.root.onpopstate !== null) {
                    history.pushState(null, document.title, location.href);
                }
            },
        };

        this.#renderStackLayout();
    }

    #renderStackLayout() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = html`
            <style>
                :host {
                    display: block !important;
                    position: relative !important;
                    width: 100%;
                    height: 100%;
                }
            </style>

            <slot></slot>
        `;
    }

    connectedCallback() {
        window.addEventListener("popstate", this.onpopstate);
    }

    disconnectedCallback() {
        window.removeEventListener("popstate", this.onpopstate);
    }

    goBack() {
        const removedChild = this.removeChild(this.stack.pop());

        if (this.stack.length > 0) {
            if (!this.stack[this.stack.length - 1].parentElement) {
                this.appendChild(this.stack[this.stack.length - 1]);
            }
        }

        this.dispatchChangeEvent(removedChild);
    }

    /**
     * @param {UIStackLayoutPage} oldChild
     */
    async dispatchChangeEvent(oldChild) {
        this.ui.events.dispatch("change", {
            newPage: this.stack[this.stack.length - 1] || null,
            oldPage: oldChild || this.stack[this.stack.length - 2] || null,
        });
    }
}
