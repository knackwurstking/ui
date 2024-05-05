const innerHTML = `
<style>
    :host {
        font-size: 1.10rem;
        font-family: var(--font-family);
        font-variation-settings:
            "CASL" 1,
            "MONO" 0,
            "slnt" 0;
    }
</style>

<slot></slot>
`

export class Primary extends HTMLElement {

    static register = () => customElements.define("ui-primary", Primary)

    constructor() {
        super();
        this.attachShadow({ mode: "open" })
        this.shadowRoot.innerHTML = innerHTML
    }
}
