import { html } from "../js";

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

        this.shadowRender();
        this.render();
    }

    shadowRender() {
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

    render() { }
}
