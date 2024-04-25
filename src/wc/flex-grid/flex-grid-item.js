const template = document.createElement("template");
template.innerHTML = `
<style></style>
<slot></slot>
`;

export class FlexGridItem extends HTMLElement {
    /** @type {string | null} */
    #flex = null

    static register = () => customElements.define("ui-flex-grid-item", FlexGridItem)
    static observedAttributes = ["flex"]

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.#updateStyle()
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "flex":
                this.flex = newValue
                break
        }
    }

    get flex() {
        return this.#flex || "1"
    }

    set flex(value) {
        this.#flex = value
        this.#updateStyle()
    }

    #updateStyle() {
        this.shadowRoot.querySelector("style").textContent = `
            :host {
                flex: ${this.flex};
            }
        `
    }
}
