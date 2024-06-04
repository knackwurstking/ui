import { events, CleanUp } from "../js";
import { html } from "../js/utils";
import { UIStackLayoutPage } from "./ui-stack-layout-page";

/**
 * @typedef {import(".").UIPages} UIPages
 */

const innerHTML = html`
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

class UI {
    /** @type {UIStackLayout} */
    #root

    #lock = false;

    /**
     * @type {UIPages}
     */
    #pages = {};

    /** @param {UIStackLayout} root */
    constructor(root) {
        this.#root = root

        /** @type {events.Events<{ "change": { oldPage: UIStackLayoutPage | null, newPage: UIStackLayoutPage | null } }>} */
        this.events = new events.Events();

        /**
         * All rendered pages
         *
         * @type {UIStackLayoutPage[]}
         */
        this.stack = [];
    }

    /**
     * @param {string} name
     * @param {() => (UIStackLayoutPage | DocumentFragment | Node)} cb
     */
    registerPage(name, cb) {
        this.#pages[name] = cb;
    }

    /**
     * @param {string} name
     */
    unregisterPage(name) {
        delete this.#pages[name];
    }

    lock() {
        this.#lock = true;
    }

    unlock() {
        this.#lock = false;
    }

    goBack() {
        if (!this.stack.length || this.#lock) return;

        const page = this.stack.pop();
        this.#root.removeChild(page);

        if (!!this.stack.length) {
            this.#root.appendChild(this.stack[this.stack.length - 1])
        }

        this.dispatchChangeEvent();
    }

    /**
     * @param {string} name
     */
    setPage(name) {
        if (this.#lock) return;

        this.stack.push(
            // @ts-expect-error
            this.#root.appendChild(this.#pages[name]().children[0]),
        );

        // TODO: Make this optional, remove child(s) from the dom?
        if (this.stack.length > 1) {
            const pageToRemove = this.stack[this.stack.length - 2]
            pageToRemove.parentElement.removeChild(pageToRemove)
        }

        this.dispatchChangeEvent();
    }

    async dispatchChangeEvent() {
        this.events.dispatch("change", {
            newPage: this.stack[this.stack.length - 1] || null,
            oldPage: this.stack[this.stack.length - 2] || null,
        });
    }
}

export class UIStackLayout extends HTMLElement {

    static register = () => {
        console.debug("register web component: ui-stack-layout");
        customElements.define("ui-stack-layout", UIStackLayout);
    };

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = innerHTML;

        this.cleanup = new CleanUp();
        this.ui = new UI(this);
    }

    connectedCallback() { }

    disconnectedCallback() {
        this.cleanup.run();
    }
}
