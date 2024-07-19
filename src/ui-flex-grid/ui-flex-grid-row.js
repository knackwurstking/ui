import { CleanUp, html, css } from "../js";

const defaultGap = "0";

export class UIFlexGridRow extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-flex-grid-row")) {
            customElements.define("ui-flex-grid-row", UIFlexGridRow);
        }
    };

    static observedAttributes = ["gap"];

    shadowCSS = ({ gap = defaultGap }) => css`
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
        this.render();

        this.ui = {
            /** @private */
            root: this,

            cleanup: new CleanUp(),

            attr: {
                gap: defaultGap,
            },

            getGap() {
                return this.attr.gap;
            },

            /**
             * @param {string | null} value
             */
            setGap(value) {
                this.attr.gap = value || defaultGap;
                this.root.render({ ...this.attr });
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
            case "gap":
                this.ui.setGap(newValue);
                break;
        }
    }

    render({ gap = defaultGap } = {}) {
        this.shadowRoot.innerHTML = `
            <style>${this.shadowCSS({ gap }).trim()}</style>
            ${this.shadowTemplate().trim()}
        `;
    }
}
