import { CleanUp, Events, createRipple, html } from "../js";

/**
 * @typedef {import(".").UIIconButtonColor} UIIconButtonColor
 *
 * @typedef UIIconButtonEvents
 * @type {{
 *  click: UIIconButton;
 * }}
 */

export class UIIconButton extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-icon-button")) {
            customElements.define("ui-icon-button", UIIconButton);
        }
    };

    static observedAttributes = ["no-ripple"];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.renderCleanUp = new CleanUp();
        this.removeRippleCallback = null;

        this.ui = {
            root: this,

            /**
             * @type {Events<UIIconButtonEvents>}
             */
            events: new Events(),

            get noRipple() {
                return this.root.hasAttribute("no-ripple");
            },

            set noRipple(state) {
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

                this.root.setAttribute("ghost", "")
            },

            get disabled() {
                return this.root.hasAttribute("disabled");
            },

            set disabled(state) {
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
                }

                :host([ghost]) {
                    border-color: transparent !important;
                    box-shadow: none;
                    font-weight: 900;
                }

                :host([color="primary"]) {
                    color: var(--ui-primary-bgColor);
                    border-color: var(--ui-primary-bgColor);
                }

                :host([color="secondary"]) {
                    color: var(--ui-secondary-bgColor);
                    border-color: var(--ui-secondary-bgColor);
                }

                :host([color="destructive"]) {
                    color: var(--ui-destructive-bgColor);
                    border-color: var(--ui-destructive-bgColor);
                }

                /* :disabled */

                :host([disabled]),
                :host([disabled]:hover),
                :host([disabled]:active) {
                    opacity: 0.25;
                    cursor: default;
                    pointer-events: none;
                }
            </style>

            <ui-svg>
                <slot></slot>
            </ui-svg>
        `;
    }

    render() {
        this.renderCleanUp.run();
        this.setAttribute("role", "button");

        const handler = async () =>
            this.ui.events.dispatch("click", this);

        this.renderCleanUp.add(
            () => this.removeEventListener("click", handler),
        );

        this.addEventListener("click", handler);
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
                    if (typeof this.removeRippleCallback !== "function") {
                        this.removeRippleCallback = createRipple(
                            this, { centered: true },
                        );
                    }
                }

                break;
        }
    }
}
