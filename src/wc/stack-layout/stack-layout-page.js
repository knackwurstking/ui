import { html } from "../../js/utils";

const innerHTML = html`
    <style>
        :host {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            animation: fade-in 0.5s;
            transition: opacity 0.5s ease;
        }

        :host(:last-child) {
            opacity: 1;
        }

        @keyframes fade-in {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
    </style>

    <slot></slot>
`;

class UI {
    /** @type {StackLayoutPage} */
    #root

    /**
    * @param {StackLayoutPage} root
    */
    constructor(root) {
        this.#root = root
    }

    get name() {
        return this.#root.getAttribute("name")
    }

    set name(value) {
        this.#root.setAttribute("name", value)
    }
}

export class StackLayoutPage extends HTMLElement {

    static register = () => customElements.define("ui-stack-layout-page", StackLayoutPage);

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = innerHTML;

        this.ui = new UI(this)
    }
}
