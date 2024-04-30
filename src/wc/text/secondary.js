const template = document.createElement("template")

template.innerHTML = `
<style>
    :host {
        font-size: 85%;
        font-style: italic;
    }
</style>

<slot></slot>
`

export class Secondary extends HTMLElement {

    static register = () => customElements.define("ui-secondary", Secondary)

    constructor() {
        super();
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}
