const template = document.createElement("template")

template.innerHTML = `
<style>
    :host {
        font-size: 0.9rem;
        font-family: var(--font-family);
        font-variation-settings:
            "CASL" 1,
            "MONO" 0,
            "slnt" -15;
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
