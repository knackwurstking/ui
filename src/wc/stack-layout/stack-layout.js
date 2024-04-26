import { events } from "../../js";
import { StackLayoutPage } from "./stack-layout-page";

/**
 * @typedef Pages
 * @type {{
 *  [key: string]: () => (StackLayoutPage | DocumentFragment);
 * }}
 */

const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            display: block;
            position: relative;
            width: 100%;
            height: 100%;
        }
    </style>

    <slot></slot>
`;

class UI {
    /** @type {StackLayout} */
    #root

    /**
     * @type {Pages}
     */
    #pages = {};

    /** @param {StackLayout} root */
    constructor(root) {
        this.#root = root

        /** @type {events.Events<"change", { oldPage: StackLayoutPage | null, newPage: StackLayoutPage | null }>} */
        this.events = new events.Events();

        /**
         * All rendered pages
         *
         * @type {import("./stack-layout-page").StackLayoutPage[]}
         */
        this.stack = [];
    }

    /**
     * @param {string} name
     * @param {() => (StackLayoutPage | DocumentFragment)} cb
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

    goBack() {
        if (!this.stack.length) return;

        const page = this.stack.pop();
        page.ontransitionend = () => {
            page.ontransitionend = null
            this.#root.removeChild(page);
        }

        if (!!this.stack.length) {
            this.#root.appendChild(this.stack[this.stack.length - 1])
        }

        this.dispatchChangeEvent();
    }

    /**
     * @param {string} name
     */
    setPage(name) {
        this.stack.push(
            // @ts-expect-error
            this.appendChild(this.#pages[name]().children[0]),
        );

        if (this.stack.length > 1) {
            const pageToRemove = this.stack[this.stack.length - 2]
            pageToRemove.ontransitionend = () => {
                pageToRemove.ontransitionend = null;
                pageToRemove.parentElement.removeChild(pageToRemove)
            }
        }

        this.dispatchChangeEvent();
    }

    async dispatchChangeEvent() {
        this.events.dispatchWithData(
            "change",
            {
                newPage: this.stack[this.stack.length - 1] || null,
                oldPage: this.stack[this.stack.length - 2] || null,
            },
        );
    }
}

export class StackLayout extends HTMLElement {

    static register = () => customElements.define("ui-stack-layout", StackLayout);

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.ui = new UI(this)
    }
}
