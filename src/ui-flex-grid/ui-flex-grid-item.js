import { CleanUp, html } from "../js";

const defaultFlex = "1";

const content = html`
    <style></style>
    <slot></slot>
`;

export class UIFlexGridItem extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-flex-grid-item")) {
            customElements.define("ui-flex-grid-item", UIFlexGridItem);
        }
    };

    static observedAttributes = ["flex"];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = content;

        this.cleanup = new CleanUp();
        this.ui = {
            /** @private */
            root: this,

            getFlex() {
                if (!this.root.hasAttribute("flex")) {
                    return defaultFlex;
                }

                return this.root.getAttribute("flex");
            },

            /**
             * @param {string | null} value
             */
            setFlex(value) {
                if (value === null) {
                    this.root.removeAttribute("flex");
                } else {
                    this.root.setAttribute("flex", value);
                }
            },
        };

        this.updateStyle();
    }

    connectedCallback() { }
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
            case "flex":
                this.updateStyle({ flex: newValue || defaultFlex });
                break;
        }
    }

    /**
     * @private
     * @param {Object} attributes
     * @param {string} [attributes.flex]
     */
    updateStyle({ flex = defaultFlex } = {}) {
        this.shadowRoot.querySelector("style").textContent = `
            :host {
                flex: ${flex};
            }
        `;
    }
}
