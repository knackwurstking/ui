import { css, globalStylesToShadowRoot, html } from "../utils";

/**
 * HTML: `ui-flex-grid`
 *
 * Attributes:
 *  - __gap__: *string*
 *
 * Slots:
 *  - __\*__
 */
export class UIFlexGrid extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-flex-grid")) {
            console.debug(`[ui] Register "ui-flex-grid" component`);
            customElements.define("ui-flex-grid", UIFlexGrid);
        }
    };

    static observedAttributes = ["gap"];

    constructor() {
        super();

        /** @private */
        this.gap = "0";

        this.ui = {
            root: this,

            get gap() {
                return this.root.gap;
            },

            set gap(value) {
                this.root.gap = value || "0";
                const style =
                    this.root.shadowRoot.querySelector(`style[name="gap"]`);
                style.textContent = css`
                    :host > ::slotted(*) {
                        margin: ${this.root.gap} 0 !important;
                    }
                `;
            },
        };

        this.#renderUIFlexGrid();
    }

    #renderUIFlexGrid() {
        this.attachShadow({ mode: "open" });
        globalStylesToShadowRoot(this.shadowRoot);

        this.shadowRoot.innerHTML = html`
            <style>
                * {
                    box-sizing: border-box;
                }

                :host {
                    display: flex !important;
                    flex-flow: column nowrap;

                    position: relative;
                    width: 100%;
                    height: fit-content;
                }
            </style>

            <style name="gap">
                :host > ::slotted(*) {
                    margin: 0 0 !important;
                }
            </style>

            <style>
                :host > ::slotted(*:first-child) {
                    margin-top: 0 !important;
                }

                :host > ::slotted(*:last-child) {
                    margin-bottom: 0 !important;
                }
            </style>

            <slot></slot>
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
            case "gap":
                this.ui.gap = newValue;
                break;
        }
    }
}

UIFlexGrid.register();
