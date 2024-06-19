import { CleanUp, Events, html } from "../js";
import { UIStackLayoutPage } from "./ui-stack-layout-page";

/**
 * @typedef {import(".").UIPages} UIPages
 */

const content = html`
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

export class UIStackLayout extends HTMLElement {
    static register = () => {
        UIStackLayoutPage.register();

        if (!customElements.get("ui-stack-layout")) {
            customElements.define("ui-stack-layout", UIStackLayout);
        }
    };

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = content;

        this.cleanup = new CleanUp();
        this.ui = {
            /** @private */
            root: this,

            /**
             * @private
             * @type {UIPages}
             */
            pages: {},

            /**
             * @private
             * @type {UIStackLayoutPage[]}
             */
            stack: [],

            /**
             * @type {Events<{ "change": { oldPage: UIStackLayoutPage | null, newPage: UIStackLayoutPage | null } }>}
             */
            events: new Events(),

            lock: false,

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
             * @param {boolean} keepOldPage
             */
            setPage(name, keepOldPage = false) {
                if (this.lock) return;

                this.stack.push(this.root.appendChild(this.pages[name]()));

                let pageToRemove = null;
                if (this.stack.length > 1 && !keepOldPage) {
                    pageToRemove = this.stack[this.stack.length - 2];
                    pageToRemove.parentElement.removeChild(pageToRemove);
                }

                this.dispatchChangeEvent(pageToRemove);
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
    }

    connectedCallback() { }

    disconnectedCallback() {
        this.cleanup.run();
    }
}
