import { Events, html } from "../utils";

/**
 * @typedef UICheck_Events
 * @type {{
 *  change: boolean;
 *  input: boolean;
 * }}
 */

/**
 * HTML: `ui-check`
 *
 * Attributes:
 *  - **checked**: `boolean`
 *
 * @template {UICheck_Events} [E=UICheck_Events]
 */
export class UICheck extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-check")) {
            customElements.define("ui-check", UICheck);
        }
    };

    static observedAttributes = ["checked"];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.ui = {
            /** @type {Events<E>} */
            events: new Events(),

            /**
             * @type {HTMLInputElement | null}
             */
            input: null,

            get checked() {
                return this.input.checked;
            },

            set checked(value) {
                this.input.checked = value;
            },
        };

        this.shadowRender();
    }

    shadowRender() {
        this.shadowRoot.innerHTML = html`
            <style>
                input {
                    --ui-bg: "transparent";

                    display: inline-block;
                    height: 1.5rem;
                    width: 1.5rem;
                    border: 1px solid var(--ui-primary);
                    border-radius: var(--ui-radius);
                    transition: border-color 0.25s linear;
                    background-color: var(--ui-bg);
                    color: var(--ui-fg);
                    box-shadow: none;
                    outline: none;
                    padding: var(--ui-spacing) calc(var(--ui-spacing) * 2);
                    accent-color: var(--ui-primary);
                    cursor: pointer;
                    accent-color: var(--ui-primary);
                }

                input:disabled {
                    cursor: default;
                    user-select: none;
                }
            </style>

            <input slot="input" type="checkbox"></input>
        `;

        this.ui.input = this.shadowRoot.querySelector("input");

        this.ui.input.onchange = () => {
            this.ui.events.dispatch("change", this.ui.checked);
        };

        this.ui.input.oninput = () => {
            this.ui.events.dispatch("input", this.ui.checked);
        };
    }

    connectedCallback() {}
    disconnectedCallback() {}

    /**
     * @param {string} name
     * @param {string | null} _oV
     * @param {string | null} nV
     */
    attributeChangedCallback(name, _oV, nV) {
        switch (name) {
            case "checked":
                this.ui.checked = nV !== null;
                break;
        }
    }

    click() {
        this.ui.input.click();
    }
}
