import svg from "../svg"

const template = document.createElement("template")

template.innerHTML = `
<style>
    :host {
        padding: var(--spacing);
        padding-right: 2.5em;
        transition: background-color 0.25s linear;
    }

    :host(.selected) {
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-fg));
    }

    :host(:not(.selected):hover) {
        background-color: hsl(var(--fg), 0.1);
    }

    :host(:not(.selected)) {
        display: none;
    }
</style>

<slot></slot>
`

export class SelectOption extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    connectedCallback() {
        // TODO: Read attributes "value" and "selected"
    }

    /**
     * Runs when the element is removed from the DOM
     */
    disconnectedCallback() { }
}
