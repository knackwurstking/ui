import { CleanUp, html, createRipple } from "../js";
import { UIPrimary } from "./ui-primary";
import { UISecondary } from "./ui-secondary";

const content = html`
    <style>
        * {
            box-sizing: border-box;
        }

        :host {
            position: relative !important;
            display: flex !important;
            flex-direction: row;
            width: 100%;
            padding: var(--ui-spacing);
            border-radius: var(--ui-radius);
        }

        :host > .text {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            margin-right: var(--ui-spacing);
        }

        :host > .input {
            display: flex;
            align-items: center;
            justify-content: flex-end;
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

/**
 * Observed Attributes:
 *  - **primary**   - [type: string]
 *  - **secondary**   - [type: string]
 *  - **ripple**    - [type: flag]
 *
 * Special Slots:
 *  - **input** - click handling if "ripple" flag is set
 */
export class UILabel extends HTMLElement {
    static register = () => {
        UIPrimary.register();
        UISecondary.register();

        if (!customElements.get("ui-label")) {
            customElements.define("ui-label", UILabel);
        }
    };
    static observedAttributes = ["ripple", "secondary", "primary"];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = content;

        this.ui = {
            /** @private */
            root: this,

            cleanup: new CleanUp(),

            /** @private */
            running: false,

            /**
             * @private
             * @type {(() => void|Promise<void>) | null}
             */
            removeRipple: null,

            /** @private */
            onClick: async () => {
                this.ui.getInputSlot().forEach((child) => child.click());
            },

            /** @private */
            onInputClick: async (
                /** @type{MouseEvent & { currentTarget: Element }} */ ev,
            ) => {
                ev.stopPropagation();
            },

            getPrimary() {
                return this.root.getAttribute("primary");
            },

            /**
             * @param {string | null} value
             */
            setPrimary(value) {
                if (value === null) {
                    this.root.removeAttribute("primary");
                    return;
                }

                this.root.setAttribute("primary", value);
            },

            getSecondary() {
                return this.root.getAttribute("secondary");
            },

            /**
             * @param {string | null} value
             */
            setSecondary(value) {
                if (value === null) {
                    this.root.removeAttribute("secondary");
                    return;
                }

                this.root.setAttribute("secondary", value);
            },

            /**
             * @returns {HTMLElement[]}
             */
            getInputSlot() {
                // @ts-ignore
                return [...this.root.querySelectorAll(`[slot="input"]`)];
            },

            enableRipple() {
                if (!!this.removeRipple) return;
                this.removeRipple = createRipple(this.root);
                this.root.style.cursor = "pointer";
                this.startInputHandling();
            },

            disableRipple() {
                if (!!this.removeRipple) this.removeRipple();
                this.stopInputHandling();
            },

            /** @private */
            startInputHandling() {
                if (this.running) return;

                this.root.addEventListener("click", this.onClick);

                this.getInputSlot().forEach((el) => {
                    el.addEventListener("click", this.onInputClick);
                });

                this.running = true;
            },

            /**
             * @private
             */
            stopInputHandling() {
                this.root.removeEventListener("click", this.onClick);

                this.getInputSlot().forEach((el) => {
                    el.removeEventListener("click", this.onInputClick);
                });

                this.running = false;
            },
        };
    }

    connectedCallback() {}
    disconnectedCallback() {
        this.ui.cleanup.run();
    }

    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "ripple":
                if (newValue !== null) this.ui.enableRipple();
                else this.ui.disableRipple();
                break;
            case "primary":
                this.shadowRoot.querySelector("ui-primary").innerHTML =
                    newValue || "";
                break;
            case "secondary":
                this.shadowRoot.querySelector("ui-secondary").innerHTML =
                    newValue || "";
                break;
        }
    }
}
