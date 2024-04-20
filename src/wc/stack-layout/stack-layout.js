import { StackLayoutPage } from "./stack-layout-page";
import { events } from "../../js"

/**
 * @typedef Pages
 * @type {{
 *  [key: string]: () => StackLayoutPage;
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

export class StackLayout extends HTMLElement {
    /**
     * @type {Pages}
     */
    #pages = {};

    constructor(debug = false) {
        super();
        this.events = new events.Events(debug)

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        /**
         * All rendered pages
         *
         * @type {{ element: Element, name: string }[]}
         */
        this.stack = [];
    }

    get debug() {
        return this.events.debug
    }

    set debug(debug) {
        this.events.debug = debug
    }

    connectedCallback() {
        if (this.debug)
            console.log(`[StackLayout] connectedCallback: this.children=${this.children} (${this.children.length})`);
    }

    disconnectedCallback() {
        if (this.debug)
            console.log(`[StackLayout] disconnectedCallback: this.children=${this.children} (${this.children.length})`);
    }

    /**
     * @param {string} name
     * @param {() => StackLayoutPage} cb
     */
    registerPage(name, cb) {
        this.#pages[name] = cb
    }

    /**
     * @param {string} name
     */
    unregisterPage(name) {
        delete this.#pages[name]
    }

    goBack() {
        if (!this.stack.length) return;
        const page = this.stack.pop()
        this.removeChild(page.element)
        this.#dispatchChangeEvent()
    }

    /**
     * @param {string} name
     */
    setPage(name) {
        this.stack.push({
            name: name,
            element: this.appendChild(this.#pages[name]().children[0]),
        });

        this.#dispatchChangeEvent()
    }

    async #dispatchChangeEvent() {
        this.events.dispatchWithData("change", this.stack[this.stack.length - 1]?.element || null)
    }
}
