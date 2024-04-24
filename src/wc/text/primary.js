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
}
