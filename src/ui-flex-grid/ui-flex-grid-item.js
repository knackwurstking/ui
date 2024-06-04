import { CleanUp } from "../js";
import { html } from "../js/utils";

const defaultFlex = "1"

const innerHTML = html`
<style></style>
<slot></slot>
`;

class UI {
    /**
     * @param {UIFlexGridItem} root
     */
    constructor(root) {
        /**
         * @private
         * @type {UIFlexGridItem}
         */
        this.root = root;
    }

    get flex() {
        if (!this.root.hasAttribute("flex")) {
            return defaultFlex;
        }

        return this.root.getAttribute("flex");
    }

    set flex(v) {
        if (v === null) {
            this.root.removeAttribute("flex");
        } else {
            this.root.setAttribute("flex", v);
        }
    }
}

export class UIFlexGridItem extends HTMLElement {

    static register = () => {
        console.debug("register web component: ui-flex-grid-item");
        customElements.define("ui-flex-grid-item", UIFlexGridItem)
    };

    static observedAttributes = ["flex"]

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
            case "flex":
                this.updateStyle({ flex: newValue || defaultFlex })
                break
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
        `
    }
}
