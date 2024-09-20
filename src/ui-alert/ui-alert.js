import { UIFlexGridItem } from "../ui-flex-grid";
import { css, html } from "../utils";

/**
 * HTML: `ui-alert`
 *
 * Attributes:
 *  - **message**: `string`
 *  - **variant**: `info` | `error`
 */
export class UIAlert extends UIFlexGridItem {
    static register = () => {
        if (!customElements.get("ui-alert")) {
            customElements.define("ui-alert", UIAlert);
        }
    };

    static get observedAttributes() {
        return ["message", "variant", ...super.observedAttributes];
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

        this.styleVariants = {
            info: css`
                :host {
                    color: var(--ui-card-fg);
                    background-color: var(--ui-card);
                }
            `,

            error: css`
                :host {
                    color: var(--ui-destructive-fg);
                    background-color: var(--ui-destructive);
                }
            `,
        };

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

            /**
             * @param {string} value
             */
            set message(value) {
                const container =
                    this.root.shadowRoot.querySelector("ui-primary");
                container.innerHTML = value || "";
            },

            get variant() {
                return this.root.getAttribute("variant");
            },

            /**
             * @param {"info" | "error"} value
             */
            set variant(value) {
                if (!value) {
                    this.root.removeAttribute("variant");
                    return;
                }

                this.root.setAttribute("variant", value);
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
                    position: relative !important;
                    padding: var(--ui-spacing);
                    border-radius: var(--ui-radius);
                    border: 1px solid var(--ui-borderColor);
                    padding: var(--ui-spacing);

                    width: 28rem;
                    max-width: calc(100% - var(--ui-spacing) * 2);
                }
            </style>

            <style class="variant"></style>

            <ui-primary style="font-size: 0.9rem;"></ui-primary>
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

            case "variant":
                this.shadowRoot.querySelector("style.variant").innerHTML =
                    // @ts-ignore
                    this.styleVariants[newValue] || "";
        }
    }
}
