import { CleanUp, Events, html, css } from "../js";
import { UIStackLayoutPage } from "./ui-stack-layout-page";

/**
 * @typedef Pages
 * @type {{
 *  [key: string]: () => (import("./ui-stack-layout-page").UIStackLayoutPage);
 * }}
 */

export class UIStackLayout extends HTMLElement {
    static register = () => {
        UIStackLayoutPage.register();

        if (!customElements.get("ui-stack-layout")) {
            customElements.define("ui-stack-layout", UIStackLayout);
        }
    };

    static observedAttributes = ["use-history"];

    css = () => css`
        :host {
            display: block !important;
            position: relative !important;
            width: 100%;
            height: 100%;
        }
    `;

    template = () => html`<slot></slot>`;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.ui = {
            /** @private */
            root: this,

            cleanup: new CleanUp(),

            /**
             * @private
             * @type {Pages}
             */
            pages: {},

            /**
             * @private
             * @type {UIStackLayoutPage[]}
             */
            stack: [],

            /**
             * @type {((ev: PopStateEvent) => void|Promise<void>) | null}
             */
            onpopstate: null,

            /**
             * @type {Events<{ "change": { oldPage: UIStackLayoutPage | null, newPage: UIStackLayoutPage | null } }>}
             */
            events: new Events(),

            lock: false,

            enableHistory() {
                if (this.onpopstate !== null) return;

                this.onpopstate = async () => {
                    this._goBack();
                };

                window.addEventListener("popstate", this.onpopstate);
            },

            disableHistory() {
                if (this.onpopstate !== null) return;
                window.removeEventListener("popstate", this.onpopstate);
            },

            usesHistory() {
                return this.onpopstate !== null;
            },

            /**
             * @param {string} name
             * @param {() => (UIStackLayoutPage)} cb
             */
            registerPage(name, cb) {
                this.pages[name] = cb;
            },

            /**
             * @param {string} name
             */
            unregisterPage(name) {
                delete this.pages[name];
            },

            clearStack() {
                while (this.stackSize() > 0) {
                    this.root.removeChild(this.stack.pop());
                }
            },

            stackSize() {
                return this.stack.length;
            },

            goBack() {
                if (!this.stack.length || this.lock) return;

                if (this.onpopstate !== null) {
                    history.back();
                    return;
                }

                this._goBack();
            },

            /**
             * @private
             */
            _goBack() {
                const removedChild = this.root.removeChild(this.stack.pop());

                if (this.stack.length > 0) {
                    if (!this.stack[this.stack.length - 1].parentElement) {
                        this.root.appendChild(
                            this.stack[this.stack.length - 1],
                        );
                    }
                }

                this.dispatchChangeEvent(removedChild);
            },

            /**
             * @param {string} name
             * @param {((page: UIStackLayoutPage) => void|Promise<void>) | null} [cb]
             * @param {boolean} [keepOldPage]
             */
            setPage(name, cb = null, keepOldPage = false) {
                if (this.lock) return;

                const page = this.pages[name]();
                this.stack.push(this.root.appendChild(page));
                if (typeof cb === "function") {
                    setTimeout(() => cb(page));
                }

                let pageToRemove = null;
                if (this.stack.length > 1 && !keepOldPage) {
                    pageToRemove = this.stack[this.stack.length - 2];
                    pageToRemove.parentElement.removeChild(pageToRemove);
                }

                this.dispatchChangeEvent(pageToRemove);

                if (this.onpopstate !== null) {
                    history.pushState(null, document.title, location.href);
                }
            },

            /**
             * @param {UIStackLayoutPage} oldChild
             */
            async dispatchChangeEvent(oldChild) {
                this.events.dispatch("change", {
                    newPage: this.stack[this.stack.length - 1] || null,
                    oldPage:
                        oldChild || this.stack[this.stack.length - 2] || null,
                });
            },
        };

        this.render();
    }

    connectedCallback() {}

    disconnectedCallback() {
        this.ui.cleanup.run();
    }

    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "use-history":
                if (newValue !== null) {
                    this.ui.enableHistory();
                } else {
                    this.ui.disableHistory();
                }
                break;
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css().trim()}</style>
            ${this.template().trim()}
        `;
    }
}
