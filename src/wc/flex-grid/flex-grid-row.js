const template = document.createElement("template");
template.innerHTML = `
<style></style>
<slot></slot>
`;

export class FlexGridRow extends HTMLElement {
    /** @type {string | null} */
    #gap = "0"

    static register = () => customElements.define("ui-flex-grid-row", FlexGridRow)
    static observedAttributes = ["gap"]

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
            case "gap":
                this.#gap = newValue !== null ? newValue : "0"
                this.#updateStyle()
                break
        }
    }

    #updateStyle() {
        this.shadowRoot.querySelector("style").textContent = `
            :host {
                --row-gap: ${this.#gap};
                display: flex;
                flex-flow: row nowrap;
                position: relative;
                width: 100%;
            }

            :host ::slotted(ui-flex-grid-item) {
                margin: 0 var(--row-gap);
            }

            :host ::slotted(ui-flex-grid-item:first-child) {
                margin-left: 0;
            }

            :host ::slotted(ui-flex-grid-item:last-child) {
                margin-right: 0;
            }
        `
    }
}
