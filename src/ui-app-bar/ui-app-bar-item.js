import { html } from "../utils";

/**
 * HTML: `ui-app-bar-item`
 *
 * Slots:
 *  - __\*__
 *
 * @template {HTMLElement} T
 */
export class UIAppBarItem extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-app-bar-item")) {
            console.debug(`[ui] Register "ui-app-bar-item" component`);
            customElements.define("ui-app-bar-item", UIAppBarItem);
        }
    };

    constructor() {
        super();

        this.ui = {
            root: this,

            /**
             * @returns {T}
             */
            get child() {
                return this.root.querySelector("*");
            },

            /**
             * @param {string | null} [value]
             */
            show(value = null) {
                this.root.style.display = value;
            },

            hide() {
                this.root.style.display = "none";
            },
        };

        this.#renderUIAppBarItem();
    }

    #renderUIAppBarItem() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = html`
            <style>
                * {
                    box-sizing: border-box;
                }

                :host {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex: 1;
                }
            </style>

            <slot></slot>
        `;
    }

    connectedCallback() {}
    disconnectedCallback() {}
}
