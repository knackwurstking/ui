import { Events, globalStylesToShadowRoot, html, ripple } from "../utils";

/**
 * @typedef UIButton_Color
 * @type {(
 *  | "primary"
 *  | "secondary"
 *  | "destructive"
 * )}
 *
 * @typedef UIButton_Variant
 * @type {(
 *  | "full"
 *  | "outline"
 *  | "ghost"
 * )}
 *
 * @typedef UIButton_Events
 * @type {{
 *  click: MouseEvent & { currentTarget: UIButton };
 * }}
 */

/**
 * HTML: `ui-button`
 *
 * Attribute:
 *  - __variant__: *"ghost" | "outline" | "full"*
 *  - __color__: *"primary" | "secondary" | "destructive"*
 *  - __noripple__: *boolean*
 *  - __disabled__: *boolean*
 *
 * Slots:
 *  - __\*__
 */
export class UIButton extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-button")) {
            customElements.define("ui-button", UIButton);
        }
    };

    static observedAttributes = ["noripple"];

    constructor() {
        super();

        /** @type {import("../utils").Ripple | null} */
        this.ripple = null;

        this.ui = {
            root: this,

            /**
             * @type {Events<UIButton_Events>}
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
                // @ts-expect-error
                return this.root.getAttribute("color");
            },

            /**
             * @param {UIButton_Color} value
             */
            set color(value) {
                if (!value) {
                    this.root.removeAttribute("color");
                    return;
                }

                this.root.setAttribute("color", value);
            },

            get variant() {
                // @ts-expect-error
                return this.root.getAttribute("variant");
            },

            /**
             * @param {UIButton_Variant} value
             */
            set variant(value) {
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
                    this.root.removeAttribute("disabled");
                    return;
                }

                this.root.setAttribute("disabled", "");
            },
        };

        this.#renderUIButton();
    }

    #renderUIButton() {
        this.attachShadow({ mode: "open" });
        globalStylesToShadowRoot(this.shadowRoot);

        this.shadowRoot.innerHTML = html`
            <style>
                * {
                    box-sizing: border-box;
                }

                :host {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    position: relative;

                    padding: var(--ui-spacing) calc(var(--ui-spacing) * 2.5);

                    outline: none;
                    border: 1px solid currentColor;
                    border-radius: var(--ui-radius);

                    user-select: none;
                    overflow: hidden;
                    cursor: pointer;

                    text-transform: capitalize;
                    font-size: 1.1rem;
                    font-weight: 450;
                    font-family: var(--ui-fontFamily);
                    font-variation-settings: var(--ui-button-fontVariation);
                }

                :host([variant="full"]) {
                    border: none;
                }

                :host([variant="full"][color="primary"]) {
                    background-color: var(--ui-primary);
                    color: var(--ui-primary-fg);
                }

                :host([variant="full"][color="secondary"]) {
                    background-color: var(--ui-secondary);
                    color: var(--ui-secondary-fg);
                }

                :host([variant="full"][color="destructive"]) {
                    background-color: var(--ui-destructive);
                    color: var(--ui-destructive-fg);
                }

                :host([variant="outline"]) {
                    border-color: currentColor;
                    background-color: transparent;
                }

                :host([variant="outline"][color="primary"]) {
                    color: var(--ui-primary);
                }

                :host([variant="outline"][color="secondary"]) {
                    color: var(--ui-secondary);
                }

                :host([variant="outline"][color="destructive"]) {
                    color: var(--ui-destructive);
                }

                :host([variant="ghost"]) {
                    border-color: transparent;
                    background-color: transparent;
                    font-weight: 900;
                }

                :host([variant="ghost"][color="primary"]) {
                    color: var(--ui-primary);
                }

                :host([variant="ghost"][color="secondary"]) {
                    color: var(--ui-secondary);
                }

                :host([variant="ghost"][color="destructive"]) {
                    color: var(--ui-destructive);
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

        if (typeof this.ripple !== "function") {
            this.ripple = ripple.create(this);
        }

        this.addEventListener("click", (ev) => {
            // @ts-expect-error
            this.ui.events.dispatch("click", ev);
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
