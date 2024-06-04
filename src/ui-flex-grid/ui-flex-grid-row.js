import { CleanUp } from "../js";
import { html } from "../js/utils";

const defaultGap = "0"

const innerHTML = html`
<style></style>
<slot></slot>
`;

class UI {
    /**
     * @param {UIFlexGridRow} root
     */
    constructor(root) {
        /**
         * @private
         * @type {UIFlexGridRow}
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

export class UIFlexGridRow extends HTMLElement {

    static register = () => {
        console.debug("register web component: ui-flex-grid-row");
        customElements.define("ui-flex-grid-row", UIFlexGridRow);
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
                flex-flow: row nowrap;
                position: relative !important;
                width: 100%;
            }

            :host ::slotted(ui-flex-grid-item) {
                margin: 0 ${gap} !important;
            }

            :host ::slotted(ui-flex-grid-item:first-child) {
                margin-left: 0 !important;
            }

            :host ::slotted(ui-flex-grid-item:last-child) {
                margin-right: 0 !important;
            }
        `
    }
}

UIFlexGridRow.register();
