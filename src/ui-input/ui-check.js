import { html } from "../utils";

/**
 * HTML: `ui-check`
 *
 * Attributes:
 *  - **primary**: `string`
 *  - **secondary**: `string`
 *  - **checked**: `boolean`
 */
export class UICheck extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-check")) {
            customElements.define("ui-check", UICheck);
        }
    };

    static observedAttributes = ["primary", "secondary", "value", "checked"];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.ui = {
            /**
             * @type {import("../ui-text").UILabel | null}
             */
            label: null,

            /**
             * @type {HTMLInputElement | null}
             */
            input: null,

            get primary() {
                return this.label.ui.primary;
            },

            set primary(value) {
                this.label.ui.primary = value;
            },

            get secondary() {
                return this.label.ui.secondary;
            },

            set secondary(value) {
                this.label.ui.secondary = value;
            },

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
      <ui-label ripple>
        <input slot="input" type="checkbox"></input>
      </ui-label>
    `;

        this.ui.label = this.shadowRoot.querySelector("ui-label");
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
            case "primary":
                this.ui.primary = nV;
                break;

            case "secondary":
                this.ui.primary = nV;
                break;

            case "checked":
                this.ui.checked = nV !== null;
                break;
        }
    }
}
