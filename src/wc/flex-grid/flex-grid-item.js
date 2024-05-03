const defaultFlex = "1"

const template = document.createElement("template");
template.innerHTML = `
<style></style>
<slot></slot>
`;

export class FlexGridItem extends HTMLElement {
    static register = () => customElements.define("ui-flex-grid-item", FlexGridItem)
    static observedAttributes = ["flex"]

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._updateStyle()
    }

    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "flex":
                this._updateStyle({ flex: newValue || defaultFlex })
                break
        }
    }

    /**
     * @param {Object} attributes
     * @param {string} [attributes.flex]
     */
    _updateStyle({ flex = defaultFlex } = {}) {
        this.shadowRoot.querySelector("style").textContent = `
            :host {
                flex: ${flex};
            }
        `
    }
}
