import { Events, createRipple, html } from "../js";

// NOTE: UIButtonColor and *Variant types not used anymore
/**
 * @typedef UIButtonColor
 * @type {(
 *  | "primary"
 *  | "secondary"
 *  | "destructive"
 * )}
 *
 * @typedef UIButtonVariant
 * @type {(
 *  | "full"
 *  | "outline"
 *  | "ghost"
 * )}
 *
 * @typedef UIButtonEvents
 * @type {{
 *  click: UIButton;
 * }}
 */

export class UIButton extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-button")) {
            customElements.define("ui-button", UIButton);
        }
    };

    static observedAttributes = ["no-ripple"];

    static defaultAttributes = {
        /** @type {string | null} */
        color: null,
        /** @type {string | null} */
        disabled: null,
        /** @type {string | null} */
        noRipple: null,
        /** @type {string | null} */
        variant: null,
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.removeRippleCallback = null;

        this.ui = {
            root: this,

            /**
             * @type {Events<UIButtonEvents>}
             */
            events: new Events(),

            get noRipple() {
                return this.root.hasAttribute("no-ripple");
            },

            set noRipple(state) {
                if (!state) {
                    state = !!UIButton.defaultAttributes.noRipple;
                }

                if (!state) {
                    this.root.removeAttribute("no-ripple");
                    return;
                }

                this.root.setAttribute("no-ripple", "");
            },

            get color() {
                return this.root.getAttribute("color");
            },

            set color(value) {
                if (!value) {
                    value = UIButton.defaultAttributes.color;
                }

                if (!value) {
                    this.root.removeAttribute("color");
                    return;
                }

                this.root.setAttribute("color", value);
            },

            get variant() {
                return this.root.getAttribute("variant");
            },

            set variant(value) {
                if (!value) {
                    value = UIButton.defaultAttributes.variant;
                }

                if (!value) {
                    this.root.removeAttribute("variant");
                    return;
                }

                this.root.setAttribute("variant", value);
            },

            get disabled() {
                return this.root.hasAttribute("disabled");
            },

            set disabled(state) {
                if (!state) {
                    state = !!UIButton.defaultAttributes.disabled;
                }

                if (!state) {
                    this.root.removeAttribute("disabled");
                    return;
                }

                this.root.setAttribute("disabled", "")
            },
        };

        this.shadowRender();
        this.render();
    }

    shadowRender() {
        this.shadowRoot.innerHTML = html`
            <style>
                * {
                    box-sizing: border-box;
                }

                :host {
                    display: flex !important;
                    align-items: center;
                    justify-content: center;
                    position: relative !important;
                    padding: var(--ui-spacing) calc(var(--ui-spacing) * 2.5);
                    border: 1px solid currentColor;
                    border-radius: var(--ui-radius);
                    overflow: hidden;
                    text-transform: capitalize;
                    cursor: pointer;
                    outline: none;
                    user-select: none;
                    font-size: 1.1rem;
                    font-weight: 450;
                    font-family: var(--ui-fontFamily);
                    font-variation-settings: var(--ui-button-fontVariation);
                }

                :host([variant="full"]) {
                    border: none;
                }

                :host([variant="full"][color="primary"]) {
                    background-color: var(--ui-primary-bgColor);
                    color: var(--ui-primary-color);
                }

                :host([variant="full"][color="secondary"]) {
                    background-color: var(--ui-secondary-bgColor);
                    color: var(--ui-secondary-color);
                }

                :host([variant="full"][color="destructive"]) {
                    background-color: var(--ui-destructive-bgColor);
                    color: var(--ui-destructive-color);
                }

                :host([variant="outline"]) {
                    border-color: currentColor;
                    background-color: transparent;
                }

                :host([variant="outline"][color="primary"]) {
                    color: var(--ui-primary-bgColor);
                }

                :host([variant="outline"][color="secondary"]) {
                    color: var(--ui-secondary-bgColor);
                }

                :host([variant="outline"][color="destructive"]) {
                    color: var(--ui-destructive-bgColor);
                }

                :host([variant="ghost"]) {
                    border-color: transparent;
                    background-color: transparent;
                    font-weight: 900;
                }

                :host([variant="ghost"][color="primary"]) {
                    color: var(--ui-primary-bgColor);
                }

                :host([variant="ghost"][color="secondary"]) {
                    color: var(--ui-secondary-bgColor);
                }

                :host([variant="ghost"][color="destructive"]) {
                    color: var(--ui-destructive-bgColor);
                }

                :host([disabled]),
                :host([disabled]:hover),
                :host([disabled]:active) {
                    background-color: transparent;
                    opacity: 0.25;
                    cursor: default;
                    pointer-events: none;
                }
            </style>

            <slot></slot>
        `;

        for (const [k, v] of Object.entries(UIButton.defaultAttributes)) {
            if (!this.hasAttribute(k) && v !== null) {
                this.setAttribute(k, v);
            }
        }
    }

    render() {
        this.setAttribute("role", "button");

        this.addEventListener("click", async () => {
            this.ui.events.dispatch("click", this);
        });
    }

    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "no-ripple":
                if (newValue !== null) {
                    if (typeof this.removeRippleCallback === "function") {
                        this.removeRippleCallback();
                        this.removeRippleCallback = null;
                    }
                } else {
                    if (typeof this.removeRippleCallback === "function") {
                        this.removeRippleCallback = createRipple(
                            this, { centered: true },
                        );
                    }
                }

                break;
        }
    }
}
