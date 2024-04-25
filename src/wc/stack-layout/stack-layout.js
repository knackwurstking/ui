import { events } from "../../js";
import { StackLayoutPage } from "./stack-layout-page";

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

    constructor() {
        super();
        this.events = new events.Events();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        /**
         * All rendered pages
         *
         * @type {{ element: import("./stack-layout-page").StackLayoutPage, name: string }[]}
         */
        this.stack = [];
    }

    /**
     * @param {string} name
     * @param {() => StackLayoutPage} cb
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
        page.element.ontransitionend = () => {
            page.element.ontransitionend = null
            this.removeChild(page.element);
        }

        if (!!this.stack.length) {
            this.appendChild(this.stack[this.stack.length - 1].element)
        }

        this.#dispatchChangeEvent();
    }

    /**
     * @param {string} name
     */
    setPage(name) {
        this.stack.push({
            name: name,
            // @ts-expect-error
            element: this.appendChild(this.#pages[name]().children[0]),
        });

        if (this.stack.length > 1) {
            const pageToRemove = this.stack[this.stack.length - 2].element
            pageToRemove.ontransitionend = () => {
                pageToRemove.ontransitionend = null;
                pageToRemove.parentElement.removeChild(pageToRemove)
            }
        }

        this.#dispatchChangeEvent();
    }

    async #dispatchChangeEvent() {
        this.events.dispatchWithData(
            "change",
            {
                newPage: this.stack[this.stack.length - 1]?.element || null,
                oldPage: this.stack[this.stack.length - 2]?.element || null,
            },
        );
    }
}
