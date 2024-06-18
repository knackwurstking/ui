import { CleanUp } from "../js";

const defaultGap = "0";

const content = `
    <style></style>
    <slot></slot>
`;

export class UIFlexGrid extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-flex-grid")) {
            customElements.define("ui-flex-grid", UIFlexGrid);
        }
    };

    static observedAttributes = ["gap"];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = content;

        this.cleanup = new CleanUp();
        this.ui = {
            /** @private */
            root: this,

            getGap() {
                return this.root.getAttribute("gap") || defaultGap;
            },

            /**
             * @param {string | null} value
             */
            setGap(value) {
                if (value === null) {
                    this.root.removeAttribute("gap");
                } else {
                    this.root.setAttribute("gap", value);
                }
            },
        };

        this.updateStyle();
    }

    connectedCallback() {}
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
            case "gap":
                this.updateStyle({ gap: newValue || defaultGap });
                break;
        }
    }

    /**
     * @private
     * @param {Object} attributes
     * @param {string} [attributes.gap]
     */
    updateStyle({ gap = defaultGap } = {}) {
        this.shadowRoot.querySelector("style").textContent = `
            :host {
                display: flex !important;
                flex-flow: column nowrap;
                position: relative !important;
                width: 100%;
                height: fit-content;
            }

            :host > ::slotted(*) {
                margin: ${gap} 0 !important;
            }

            :host > ::slotted(*:first-child) {
                margin-top: 0 !important;
            }

            :host > ::slotted(*:last-child) {
                margin-bottom: 0 !important;
            }
        `;
    }
}
