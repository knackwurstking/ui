import { globalStylesToShadowRoot, html } from "../utils";

/**
 * HTML: `ui-svg`
 *
 * Slots:
 *  - __\*__ from type svg
 */
export class UISvg extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-svg")) {
            console.debug(`[ui] Register "ui-svg" component`);
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
        globalStylesToShadowRoot(this.shadowRoot);

        this.shadowRoot.innerHTML = html`
            <style>
                :host {
                    display: block;

                    position: relative;
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

UISvg.register();
