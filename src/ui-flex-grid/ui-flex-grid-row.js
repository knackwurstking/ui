import { CleanUp, html, css } from "../js";

export class UIFlexGridRow extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-flex-grid-row")) {
            customElements.define("ui-flex-grid-row", UIFlexGridRow);
        }
    };

    static observedAttributes = ["gap"];

    static defaultGap = "0";

    /**
     * @param {Object} options
     * @param {string} options.gap
     */
    shadowCSS = ({ gap }) => css`
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

    shadowTemplate = () => html`<slot></slot>`;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.ui = {
            /** @private */
            root: this,

            cleanup: new CleanUp(),

            shadowAttr: {
                gap: UIFlexGridRow.defaultGap,
            },

            getGap() {
                return this.shadowAttr.gap;
            },

            /**
             * @param {string | null} value
             */
            setGap(value) {
                this.shadowAttr.gap = value || UIFlexGridRow.defaultGap;
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
            case "gap":
                this.ui.setGap(newValue);
                break;
        }
    }

    /**
     * @param {Object} options
     * @param {string} options.gap
     */
    shadowRender({ gap }) {
        this.shadowRoot.innerHTML = `
            <style>${this.shadowCSS({ gap }).trim()}</style>
            ${this.shadowTemplate().trim()}
        `;
    }
}
