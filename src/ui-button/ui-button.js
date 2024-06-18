import { CleanUp, Events, createRipple, html } from "../js";

/**
 * @typedef {import(".").UIButtonColor} UIButtonColor
 * @typedef {import(".").UIButtonVariant} UIButtonVariant
 *
 * @typedef UIButtonEvents
 * @type {{
 *  click: UIButton;
 * }}
 */

const content = html`
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

export class UIButton extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-button")) {
            customElements.define("ui-button", UIButton);
        }
    };
    static observedAttributes = ["no-ripple", "color"];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = content;

        this.setAttribute("role", "button");

        this.cleanup = new CleanUp();
        this.ui = {
            /** @private */
            root: this,

            /**
             * @type {Events<UIButtonEvents>}
             */
            events: new Events(),

            /**
             * @private
             * @type {(() => void) | null}
             */
            removeRipple: null,

            /**
             * @returns {UIButtonColor}
             */
            getColor() {
                // @ts-expect-error
                return this.root.getAttribute("color");
            },

            /**
             * @param {UIButtonColor} value
             */
            setColor(value) {
                this.root.setAttribute("color", value);
            },

            /**
             * @returns {UIButtonVariant}
             */
            getVariant() {
                // @ts-expect-error
                return this.root.getAttribute("variant");
            },

            /**
             * @param {UIButtonVariant} value
             */
            setVariant(value) {
                this.root.setAttribute("variant", value);
            },

            disable() {
                this.root.setAttribute("disabled", "");
            },

            enable() {
                this.root.removeAttribute("disabled");
            },

            enableRipple() {
                if (!!this.removeRipple) return;
                this.removeRipple = createRipple(this.root, { centered: true });
                this.root.removeAttribute("no-ripple");
            },

            disableRipple() {
                if (!this.removeRipple) return;

                this.removeRipple();
                this.removeRipple = null;
                this.root.setAttribute("no-ripple", "");
            },
        };
    }

    connectedCallback() {
        if (!this.hasAttribute("no-ripple") && !this.ui.removeRipple) {
            this.ui.enableRipple();
        }

        this.bindClickEvent();
    }

    disconnectedCallback() {
        this.cleanup.run();
    }

    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "no-ripple":
                if (newValue !== null) this.ui.disableRipple();
                else this.ui.enableRipple();
                break;
            case "color":
                if (newValue !== null) {
                    if (
                        ["primary", "secondary", "destructive"].includes(
                            newValue,
                        )
                    ) {
                        this.style.color = null;
                    } else {
                        this.style.color = newValue;
                    }
                }
                break;
        }
    }

    /**
     * @private
     */
    bindClickEvent() {
        const onClick = async () => {
            this.ui.events.dispatch("click", this);
        };
        this.addEventListener("click", onClick);
        this.cleanup.add(() => {
            this.removeEventListener("click", onClick);
        });
    }
}
