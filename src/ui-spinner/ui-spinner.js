import { html } from "../utils";

/**
 * HTML: `ui-spinner`
 *
 * Attributes:
 *  - nobg
 */
export class UISpinner extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-spinner")) {
            customElements.define("ui-spinner", UISpinner);
        }
    };

    static observedAttributes = ["nobg"];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.ui = {
            root: this,

            get nobg() {
                return this.root.hasAttribute("nobg");
            },

            set nobg(state) {
                /** @type {HTMLElement} */
                const el = this.root.shadowRoot.querySelector(".background");

                if (!state) {
                    el.style.display = null;
                    return;
                }

                el.style.display = "none";
            },
        };

        this.shadowRender();
    }

    shadowRender() {
        this.shadowRoot.innerHTML = html`
            <style>
                :host {
                    position: absolute !important;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                }

                .background {
                    z-index: 999;
                    position: absolute !important;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background-color: var(--ui-backdrop);
                    -webkit-backdrop-filter: var(--ui-backdropFilter);
                    backdrop-filter: var(--ui-backdropFilter);
                }

                .spinner {
                    z-index: 1000;
                    content: "";
                    box-sizing: border-box;
                    position: absolute !important;
                    top: 50%;
                    left: 50%;
                    width: 2.5rem;
                    height: 2.5rem;
                    margin-top: -1.25rem;
                    margin-left: -1.25rem;
                    border-radius: 50%;
                    border: 2px solid var(--ui-borderColor);
                    border-top-color: var(--ui-primary);
                    animation: spinner 0.6s linear infinite;
                }

                @keyframes spinner {
                    to {
                        transform: rotate(360deg);
                    }
                }
            </style>

            <div class="background"></div>
            <div class="spinner"></div>
        `;
    }

    connectedCallback() {}
    disconnectedCallback() {}

    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "nobg":
                this.ui.nobg = newValue !== null;
                break;
        }
    }
}
