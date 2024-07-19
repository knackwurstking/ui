import { CleanUp, html, css } from "../js";

export class UIFlexGridItem extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-flex-grid-item")) {
            customElements.define("ui-flex-grid-item", UIFlexGridItem);
        }
    };

    static observedAttributes = ["flex"];

    static defaultFlex = "1";

    /**
     * @param {Object} options
     * @param {string} options.flex
     */
    shadowCSS = ({ flex }) => css`
        :host {
            flex: ${flex};
        }
    `;

    shadowTemplate = () => html`<slot></slot>`;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.ui = {
            /** @private */
            root: this,

            cleanup: new CleanUp(),

            shadowAttr: {
                flex: UIFlexGridItem.defaultFlex,
            },

            getFlex() {
                return this.shadowAttr.flex;
            },

            /**
             * @param {string | null} value
             */
            setFlex(value) {
                this.shadowAttr.flex = value || UIFlexGridItem.defaultFlex;
                this.root.shadowRender({ ...this.shadowAttr });
            },
        };

        this.shadowRender({ ...this.ui.shadowAttr });
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
            case "flex":
                this.ui.setFlex(newValue);
                break;
        }
    }

    /**
     * @param {Object} options
     * @param {string} options.flex
     */
    shadowRender({ flex }) {
        this.shadowRoot.innerHTML = `
            <style>${this.shadowCSS({ flex }).trim()}</style>
            ${this.shadowTemplate().trim()}
        `;
    }
}
