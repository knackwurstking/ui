import { Events, html, ripple } from "../utils";

/**
 * @typedef {import("./ui-button").UIButton_Color} UIIconButton_Color
 *
 * @typedef UIIconButton_Events
 * @type {{
 *  click: UIIconButton;
 * }}
 */

/**
 * HTML: `ui-icon-button`
 *
 * Attribute:
 *  - color: "primary" | "secondary" | "destructive"
 *  - ghost
 *  - noripple
 *  - disabled
 *
 * Slots:
 *  - *
 */
export class UIIconButton extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-icon-button")) {
            customElements.define("ui-icon-button", UIIconButton);
        }
    };

    static observedAttributes = ["noripple"];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        /** @type {import("../utils").Ripple | null} */
        this.ripple = null;

        this.ui = {
            root: this,

            /**
             * @type {Events<UIIconButton_Events>}
             */
            events: new Events(),

            get noripple() {
                return !this.root.ripple;
            },

            set noripple(state) {
                if (!state) {
                    if (!!this.root.ripple) this.root.ripple.destroy();
                    this.root.ripple = ripple.create(this.root);
                    return;
                }

                if (!!this.root.ripple) {
                    this.root.ripple.destroy();
                    this.root.ripple = null;
                }
            },

            get color() {
                return this.root.getAttribute("color");
            },

            set color(value) {
                if (!value) {
                    this.root.removeAttribute("color");
                    return;
                }

                this.root.setAttribute("color", value);
            },

            get ghost() {
                return this.root.hasAttribute("ghost");
            },

            set ghost(state) {
                if (!state) {
                    this.root.removeAttribute("ghost");
                    return;
                }

                this.root.setAttribute("ghost", "");
            },

            get disabled() {
                return this.root.hasAttribute("disabled");
            },

            set disabled(state) {
                if (!state) {
                    this.root.removeAttribute("disabled");
                    return;
                }

                this.root.setAttribute("disabled", "");
            },
        };

        this.shadowRender();
    }

    shadowRender() {
        this.shadowRoot.innerHTML = html`
            <style>
                * {
                    box-sizing: border-box;
                }

                :host {
                    display: block;
                    position: relative;
                    width: 2.5rem;
                    height: 2.5rem;
                    padding: calc(var(--ui-spacing) / 2);
                    border: 1px solid currentColor;
                    border-radius: var(--ui-radius);
                    outline: none;
                    overflow: hidden;
                    cursor: pointer;
                    user-select: none;
                    font-size: 1.1rem;
                    font-weight: 450;
                    font-family: var(--ui-fontFamily);
                    font-variation-settings: var(--ui-button-fontVariation);
                    transition: color 0.5s linear;
                }

                :host([ghost]) {
                    border-color: transparent !important;
                    box-shadow: none;
                    font-weight: 900;
                }

                :host([color="primary"]) {
                    color: var(--ui-primary);
                    border-color: var(--ui-primary);
                }

                :host([color="secondary"]) {
                    color: var(--ui-secondary);
                    border-color: var(--ui-secondary);
                }

                :host([color="destructive"]) {
                    color: var(--ui-destructive);
                    border-color: var(--ui-destructive);
                }

                /* :disabled */

                :host([disabled]),
                :host([disabled]:hover),
                :host([disabled]:active) {
                    opacity: 0.25;
                    cursor: default;
                    pointer-events: none;
                }

                ui-svg {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            </style>

            <ui-svg>
                <slot></slot>
            </ui-svg>
        `;

        if (typeof this.ripple !== "function") {
            this.ripple = ripple.create(this, { centered: true });
        }

        this.addEventListener("click", () => {
            this.ui.events.dispatch("click", this);
        });
    }

    connectedCallback() {
        this.setAttribute("role", "button");
    }

    disconnectedCallback() {}

    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "noripple":
                this.ui.noripple = newValue !== null;
                break;
        }
    }
}
