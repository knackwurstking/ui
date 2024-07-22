import { CleanUp, html, css } from "../js";

// TODO: Continue here...
export class UIFlexGrid extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-flex-grid")) {
            customElements.define("ui-flex-grid", UIFlexGrid);
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

    shadowTemplate = () => html`<slot></slot>`;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.ui = {
            /**
             * @private
             */
            root: this,

            cleanup: new CleanUp(),

            shadowAttr: {
                gap: UIFlexGrid.defaultGap,
            },

            getGap() {
                return this.shadowAttr.gap;
            },

            /**
             * @param {string | null} value
             */
            setGap(value) {
                this.shadowAttr.gap = value || UIFlexGrid.defaultGap;
                this.root.shadowRender({ ...this.shadowAttr });
            },
        };

        this.shadowRender({ ...this.ui.shadowAttr });
    }

    connectedCallback() { }
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
