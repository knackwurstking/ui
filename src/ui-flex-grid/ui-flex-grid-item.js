import { CleanUp, html, css } from "../js";

const defaultFlex = "1";

export class UIFlexGridItem extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-flex-grid-item")) {
            customElements.define("ui-flex-grid-item", UIFlexGridItem);
        }
    };

    static observedAttributes = ["flex"];

    css = ({ flex = defaultFlex }) => css`
        :host {
            flex: ${flex};
        }
    `;

    template = () => html`<slot></slot>`;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();

        this.ui = {
            /** @private */
            root: this,

            cleanup: new CleanUp(),

            attr: {
                flex: defaultFlex,
            },

            getFlex() {
                return this.attr.flex;
            },

            /**
             * @param {string | null} value
             */
            setFlex(value) {
                this.attr.flex = value || defaultFlex;
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
            case "flex":
                this.ui.setFlex(newValue);
                break;
        }
    }

    render({ flex = defaultFlex } = {}) {
        this.shadowRoot.innerHTML = `
            <style>${this.css({ flex }).trim()}</style>
            ${this.template().trim()}
        `;
    }
}
