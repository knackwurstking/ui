// TODO: Convert to typescript
import { globalStylesToShadowRoot, html } from "../utils";

/**
 * HTML: `ui-container`
 *
 * Slots:
 *  - __\*__
 */
export class UIContainer extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-container")) {
            console.debug(`[ui] Register "ui-container" component`);
            customElements.define("ui-container", UIContainer);
        }
    };

    constructor() {
        super();
        this.ui = {};
        this.#renderUIContainer();
    }

    #renderUIContainer() {
        this.attachShadow({ mode: "open" });
        globalStylesToShadowRoot(this.shadowRoot);

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
    }

    connectedCallback() {}
    disconnectedCallback() {}
}

UIContainer.register();
