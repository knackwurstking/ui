import { html } from "../utils";

/**
 * HTML: `ui-check`
 *
 * Attributes:
 *  - **checked**: `boolean`
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
            <input slot="input" type="checkbox"></input>
        `;

        this.ui.input = this.shadowRoot.querySelector("input");
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
}
