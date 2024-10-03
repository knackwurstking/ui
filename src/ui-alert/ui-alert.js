import { UIFlexGridItem } from "../ui-flex-grid";
import { css, html } from "../utils";

/**
 * @typedef {"info" | "error"} UIAlert_Variants
 *
 * @typedef {{
 *  message: string;
 *  variant: UIAlert_Variants;
 * }} UIAlert_Options
 */

/**
 * HTML: `ui-alert`
 *
 * Attributes:
 *  - __message__: *string*
 *  - __variant__: *info | error*
 */
export class UIAlert extends UIFlexGridItem {
    static register = () => {
        if (!customElements.get("ui-alert")) {
            console.debug(`[ui] Register "ui-alert" component`);
            customElements.define("ui-alert", UIAlert);
        }
    };

    static get observedAttributes() {
        return ["message", "variant", ...super.observedAttributes];
    }

    /**
     * @param {UIAlert_Options} [options]
     */
    constructor(options = null) {
        super();

        /**
         * @type {{
         *  info: string;
         *  error: string;
         * }}
         */
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
            ...this.ui,
            root: this,

            /**
             * @param {UIAlert_Options | null} options
             */
            set(options) {
                if (!options) return;
                this.message = options.message;
                this.variant = options.variant;
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
                // @ts-expect-error
                return this.root.getAttribute("variant");
            },

            /**
             * @param {UIAlert_Variants} value
             */
            set variant(value) {
                if (!value) {
                    this.root.removeAttribute("variant");
                    return;
                }

                this.root.setAttribute("variant", value);
            },
        };

        this.#renderUIAlert();
        if (!!options) this.ui.set(options);
    }

    #renderUIAlert() {
        this.shadowRoot.removeChild(this.shadowRoot.querySelector("slot"));
        this.shadowRoot.innerHTML += html`
            <style>
                :host {
                    position: relative !important;

                    border-radius: var(--ui-radius);
                    border: 1px solid var(--ui-borderColor);

                    padding: var(--ui-spacing);

                    width: 28rem;
                    max-width: 100%;
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
                if (newValue !== "info" && newValue !== "error") return;
                this.shadowRoot.querySelector("style.variant").innerHTML =
                    this.styleVariants[newValue] || "";
        }
    }
}

UIAlert.register();
