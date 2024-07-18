import { CleanUp, html, css } from "../js";

const defaultGap = "0";

export class UIFlexGrid extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-flex-grid")) {
            customElements.define("ui-flex-grid", UIFlexGrid);
        }
    };

    static observedAttributes = ["gap"];

    css = ({ gap = defaultGap }) => css`
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

    template = () => html`<slot></slot>`;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.ui = {
            /**
             * @private
             */
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

        this.render();
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
            <style>${this.css({ gap }).trim()}</style>
            ${this.template().trim()}
        `;
    }
}
