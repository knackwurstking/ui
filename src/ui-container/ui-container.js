import { html } from "../js";

export class UIContainer extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-container")) {
            customElements.define("ui-container", UIContainer);
        }
    };

    static defaultAttributes = {};

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.ui = {};

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
                    display: block;
                    width: 100%;
                    max-width: 65rem;
                    margin: 0 auto !important;
                    padding: var(--ui-spacing);
                }
            </style>

            <slot></slot>
        `;

        for (const [k, v] of Object.entries(UIContainer.defaultAttributes)) {
            if (!this.hasAttribute(k) && v !== null) {
                this.setAttribute(k, v);
            }
        }
    }

    render() { }
}
