import svg from "../svg"

const template = document.createElement("template")

template.innerHTML = `
<style>
    :host {
        display: none;
        padding: var(--spacing);
        padding-right: 2.5em;
        transition: background-color 0.25s linear;
    }
</style>

<slot></slot>
`

export class SelectOption extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.type = "ui-select-option"
    }

    get value() {
        return this.getAttribute("value") || "";
    }

    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    connectedCallback() {
    }

    /**
     * Runs when the element is removed from the DOM
     */
    disconnectedCallback() { }
}
