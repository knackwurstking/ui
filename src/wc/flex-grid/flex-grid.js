import { html } from "../../js/utils";

const defaultGap = "0"

const innerHTML = html`
<style></style>
<slot></slot>
`;

export class FlexGrid extends HTMLElement {

    static register = () => customElements.define("ui-flex-grid", FlexGrid);
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
                display: flex;
                flex-flow: column nowrap;
                position: relative;
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
