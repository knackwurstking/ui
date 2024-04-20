const template = document.createElement("template")

template.innerHTML = `
<style>
    :host {
        font-size: 1.1em;
        font-weight: normal;
    }
</style>

<slot></slot>
`

export class Primary extends HTMLElement {
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
