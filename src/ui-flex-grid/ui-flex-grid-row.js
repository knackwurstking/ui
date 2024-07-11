import { CleanUp } from "../js";

const defaultGap = "0";

const content = `
    <style></style>
    <slot></slot>
`;

export class UIFlexGridRow extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-flex-grid-row")) {
            customElements.define("ui-flex-grid-row", UIFlexGridRow);
        }
    };

    static observedAttributes = ["gap"];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = content;

        this.ui = {
            /** @private */
            root: this,

            cleanup: new CleanUp(),

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
        this.ui.cleanup.run();
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
                flex-flow: row nowrap;
                position: relative !important;
                width: 100%;
            }

            :host > ::slotted(*) {
                margin: 0 ${gap} !important;
            }

            :host > ::slotted(*:first-child) {
                margin-left: 0 !important;
            }

            :host > ::slotted(*:last-child) {
                margin-right: 0 !important;
            }
        `;
    }
}
