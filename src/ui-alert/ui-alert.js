import { UIFlexGridItem } from "../ui-flex-grid";
import { UIPrimary } from "../ui-text";
import { html } from "../utils";

/**
 * HTML: `ui-alert`
 */
export class UIAlert extends UIFlexGridItem {
    static register = () => {
        if (!customElements.get("ui-alert")) {
            customElements.define("ui-alert", UIAlert);
        }
    };

    static get observedAttributes() {
        return ["message", ...super.observedAttributes];
    }

    /**
     * @param {object} [options]
     * @param {string} options.message
     */
    constructor(options = null) {
        super();

        /**
         * @type {HTMLElement}
         */
        this.messageContainer = null;

        this.ui = {
            root: this,
            ...this.ui,

            /**
             * @param {object} options
             * @param {string} options.message
             */
            set({ message }) {
                this.root.messageContainer.innerHTML = message;
            },

            get message() {
                return this.root.shadowRoot.querySelector("ui-primary")
                    .innerHTML;
            },

            set message(value) {
                const container =
                    this.root.shadowRoot.querySelector("ui-primary");
                container.innerHTML = value || "";
            },
        };

        if (!!options) this.ui.set(options);
    }

    shadowRender() {
        super.shadowRender();

        this.shadowRoot.removeChild(this.shadowRoot.querySelector("slot"));
        this.shadowRoot.innerHTML += html`
            <style>
                :host {
                    padding: var(--ui-spacing);

                    /** TODO: just debugging here... */
                    background-color: var(--ui-card);
                    color: var(--ui-card-fg);
                    border: 1px solid var(--ui-card-borderColor);
                    border-radius: var(--ui-card-radius);
                    padding: var(--ui-spacing);
                }
            </style>

            <ui-primary></ui-primary>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }

    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        super.attributeChangedCallback(name, _oldValue, newValue);
        switch (name) {
            case "message":
                this.ui.message = newValue;
                break;
        }
    }
}
