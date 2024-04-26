const template = document.createElement("template");

template.innerHTML = `
<style></style>
<slot></slot>
`;

export class FlexGrid extends HTMLElement {
    /** @type {string | null} */
    #gap = "0"

    static register = () => customElements.define("ui-flex-grid", FlexGrid);
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
                break
        }
    }

    #updateStyle() {
        this.shadowRoot.querySelector("style").textContent = `
            :host {
                --gap: ${this.#gap};
                display: flex;
                flex-flow: column nowrap;
                position: relative;
                width: 100%;
                height: fit-content;
            }

            :host ::slotted(ui-flex-grid-row) {
                margin: var(--gap) 0;
            }

            :host ::slotted(ui-flex-grid-row:first-child) {
                margin-top: 0;
            }

            :host ::slotted(ui-flex-grid-row:last-child) {
                margin-bottom: 0;
            }
        `
    }
}
