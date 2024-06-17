import { CleanUp, html } from "../js";

const content = html`
    <style>
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;
        }
    </style>

    <slot></slot>
`;

/**
 * @template {HTMLElement} T
 */
export class UIAppBarItem extends HTMLElement {

    static register = () => {
        if (!customElements.get("ui-app-bar-item"))
            customElements.define("ui-app-bar-item", UIAppBarItem);
    };

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = content;

        this.ui = {
            enable: () => {
                this.style.display = "flex";
            },
            disable: () => {
                this.style.display = "none";
            },
        };

        this.cleanup = new CleanUp();
    }

    connectedCallback() { }
    disconnectedCallback() {
        this.cleanup.run();
    }

    /**
     * @returns {T}
     */
    get item() {
        return this.querySelector("*");
    }
}
