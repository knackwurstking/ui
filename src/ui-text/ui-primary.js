import { html } from "../utils";

/**
 * HTML: `ui-primary`
 *
 * Slots:
 *  - __\*__
 */
export class UIPrimary extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-primary")) {
            customElements.define("ui-primary", UIPrimary);
        }
    };

    constructor() {
        super();
        this.ui = {};
        this.#renderUIPrimary();
    }

    #renderUIPrimary() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = html`
            <style>
                :host {
                    display: inline-block;
                    font-size: 1.1rem;
                    font-family: var(--ui-fontFamily);
                    font-variation-settings: var(
                        --ui-text-primary-fontVariation
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
