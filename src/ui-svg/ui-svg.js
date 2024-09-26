import { html } from "../utils";

/**
 * HTML: `ui-svg`
 *
 * Slots:
 *  - __\*__ from type svg
 */
export class UISvg extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-svg")) {
            customElements.define("ui-svg", UISvg);
        }
    };

    constructor() {
        super();
        this.ui = {};
        this.#renderUISvg();
    }

    #renderUISvg() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = html`
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 100%;
                    color: inherit;
                }

                ::slotted(svg) {
                    width: 100%;
                    height: 100%;
                }
            </style>

            <slot></slot>
        `;
    }

    connectedCallback() {}
    disconnectedCallback() {}
}
