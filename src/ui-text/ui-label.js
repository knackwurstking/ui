import { ripple, html, globalStylesToShadowRoot } from "../utils";

/**
 * HTML: `ui-label`
 *
 * Attributes:
 *  - __primary__: *string*
 *  - __secondary__: *string*
 *  - __ripple__: *boolean* - this enables click forwarding
 *
 * Slots:
 *  - __input__ - input slot get click forwarding
 *  - __\*__
 */
export class UILabel extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-label")) {
            console.debug(`[ui] Register "ui-label" component`);
            customElements.define("ui-label", UILabel);
        }
    };

    static observedAttributes = ["ripple", "secondary", "primary"];

    constructor() {
        super();

        /**
         * @type {import("../utils").Ripple | null}
         */
        this.ripple = null;

        /** @private */
        this.running = false;

        /** @private */
        this.onClick = async () => {
            this.ui.inputSlot.forEach((/**@type {HTMLElement}*/ child) => {
                child.click();
            });
        };

        /** @private */
        this.onInputClick = async (
            /** @type{MouseEvent & { currentTarget: Element }} */ ev,
        ) => {
            ev.stopPropagation();
        };

        this.ui = {
            root: this,

            get ripple() {
                return this.root.running;
            },

            set ripple(state) {
                if (!state) {
                    this.root.disableRipple();
                    return;
                }

                this.root.enableRipple();
            },

            get primary() {
                return this.root.shadowRoot.querySelector("ui-primary")
                    .innerHTML;
            },

            set primary(value) {
                this.root.shadowRoot.querySelector("ui-primary").innerHTML =
                    value || "";
            },

            get secondary() {
                return this.root.shadowRoot.querySelector("ui-secondary")
                    .innerHTML;
            },

            set secondary(value) {
                this.root.shadowRoot.querySelector("ui-secondary").innerHTML =
                    value || "";
            },

            get inputSlot() {
                return [...this.root.querySelectorAll(`[slot="input"]`)];
            },
        };

        this.#renderUILabel();
    }

    #renderUILabel() {
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = html`
            <style>
                * {
                    box-sizing: border-box;
                }

                :host {
                    display: flex !important;
                    flex-direction: row;

                    position: relative;
                    width: 100%;

                    padding: var(--ui-spacing);

                    border-radius: var(--ui-radius);
                }

                :host > .text {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    margin-right: var(--ui-spacing);
                }

                :host > .input {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    align-items: center;
                }
            </style>

            <span class="text">
                <ui-primary></ui-primary>
                <ui-secondary></ui-secondary>
            </span>

            <span class="input">
                <slot name="input"></slot>
                <slot></slot>
            </span>
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
            case "ripple":
                this.ui.ripple = newValue !== null;
                break;

            case "primary":
                this.ui.primary = newValue;
                break;

            case "secondary":
                this.ui.secondary = newValue;
                break;
        }
    }

    enableRipple() {
        if (!!this.ripple) return;
        this.ripple = ripple.create(this);
        this.style.cursor = "pointer";

        // Enable input handler
        if (this.running) return;

        this.addEventListener("click", this.onClick);

        const inputSlot = [...this.querySelectorAll(`[slot="input"]`)];
        inputSlot.forEach((el) => {
            el.addEventListener("click", this.onInputClick);
        });

        this.running = true;
    }

    disableRipple() {
        if (!this.running) return;
        if (!!this.ripple) this.ripple.destroy();

        // Disable input handler
        this.removeEventListener("click", this.onClick);

        this.ui.inputSlot.forEach((el) => {
            el.removeEventListener("click", this.onInputClick);
        });

        this.running = false;
    }
}

UILabel.register();
