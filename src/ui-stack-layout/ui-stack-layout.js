import { Events } from "../js";
import { UIStackLayoutPage } from "./ui-stack-layout-page";

/**
 * @typedef Pages
 * @type {{
 *  [key: string]: () => (import("./ui-stack-layout-page").UIStackLayoutPage);
 * }}
 */

export class UIStackLayout extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-stack-layout")) {
            customElements.define("ui-stack-layout", UIStackLayout);
        }
    };

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

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
             * @param {string} pageName
             * @param {() => (UIStackLayoutPage)} cb
             */
            register(pageName, cb) {
                this.root.pages[pageName] = cb;
            },

            /**
             * @param {string} pageName
             */
            unregister(pageName) {
                delete this.root.pages[pageName];
            },

            /**
             * @param {string} pageName
             * @param {((page: UIStackLayoutPage) => void|Promise<void>) | null} [cb]
             * @param {boolean} [keepOldPage]
             */
            set(pageName, cb = null, keepOldPage = false) {
                if (this.lock) return;

                const page = this.root.pages[pageName]();
                this.root.stack.push(this.root.appendChild(page));
                if (typeof cb === "function") {
                    setTimeout(() => cb(page));
                }

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

        this.shadowRender();
    }

    shadowRender() {
        this.shadowRoot.innerHTML = `
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
                this.appendChild(
                    this.stack[this.stack.length - 1],
                );
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
            oldPage:
                oldChild || this.stack[this.stack.length - 2] || null,
        });
    }
}
