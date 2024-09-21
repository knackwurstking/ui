import { html } from "../utils";

/**
 * HTML: `ui-secondary`
 *
 * Slots:
 *  - __\*__
 */
export class UISecondary extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-secondary")) {
            customElements.define("ui-secondary", UISecondary);
        }
    };

    constructor() {
        super();
        this.ui = {};
        this.#renderUISecondary();
    }

    #renderUISecondary() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = html`
            <style>
                :host {
                    display: inline-block;
                    font-size: 0.9rem;
                    font-family: var(--ui-fontFamily);
                    font-variation-settings: var(
                        --ui-text-secondary-fontVariation
                    );
                    overflow-wrap: anywhere;
                }
            </style>

            <slot></slot>
        `;
    }

    connectedCallback() {}
    disconnectedCallback() {}
}
