import { CleanUp, html } from "../js";

const defaultGap = "0"

const innerHTML = html`
<style></style>
<slot></slot>
`;

class UI {
    /**
     * @param {UIFlexGrid} root
     */
    constructor(root) {
        /**
         * @private
         * @type {UIFlexGrid}
         */
        this.root = root;
    }

    get gap() {
        return this.root.getAttribute("gap") || defaultGap;
    }

    set gap(v) {
        if (v === null) {
            this.root.removeAttribute("gap");
        } else {
            this.root.setAttribute("gap", v);
        }
    }
}

export class UIFlexGrid extends HTMLElement {

    static register = () => {
        if (!customElements.get("ui-flex-grid")) {
            console.debug("register web component: ui-flex-grid");
            customElements.define("ui-flex-grid", UIFlexGrid);
        }
    };

    static observedAttributes = ["gap"]

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = innerHTML;

        this.cleanup = new CleanUp();
        this.ui = new UI(this);

        this.updateStyle()
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
            case "gap":
                this.updateStyle({ gap: newValue || defaultGap })
                break
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

            :host ::slotted(ui-flex-grid-item),
            :host ::slotted(ui-flex-grid-row) {
                margin: ${gap} 0 !important;
            }

            :host ::slotted(ui-flex-grid-row:first-child) {
                margin-top: 0 !important;
            }

            :host ::slotted(ui-flex-grid-row:last-child) {
                margin-bottom: 0 !important;
            }
        `
    }
}
