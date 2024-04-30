const template = document.createElement("template")

template.innerHTML = `
<style>
    :host {
        font-size: 110%;
    }
</style>

<slot></slot>
`

export class Primary extends HTMLElement {

    static register = () => customElements.define("ui-primary", Primary)

    constructor() {
        super();
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}
