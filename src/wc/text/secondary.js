const template = document.createElement("template")

template.innerHTML = `
<style>
    :host {
        font-size: 0.9em;
        font-weight: 300;
        font-style: italic;
    }
</style>

<slot></slot>
`

export class Secondary extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    connectedCallback() { }

    /**
     * Runs when the element is removed from the DOM
     */
    disconnectedCallback() { }
}
