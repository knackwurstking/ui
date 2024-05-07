import { html } from "../../js/utils";

const defaultGap = "0"

const innerHTML = html`
<style></style>
<slot></slot>
`;

export class FlexGridRow extends HTMLElement {

    static register = () => customElements.define("ui-flex-grid-row", FlexGridRow)
    static observedAttributes = ["gap"]

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = innerHTML;
        this._updateStyle()
    }

    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "gap":
                this._updateStyle({ gap: newValue || defaultGap })
                break
        }
    }

    /**
     * @param {Object} attributes
     * @param {string} [attributes.gap]
     */
    _updateStyle({ gap = defaultGap } = {}) {
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
