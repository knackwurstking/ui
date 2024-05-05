const innerHTML = `
<style>
    :host {
        font-size: 1.1rem;
        font-family: var(--ui-primary-fontFamily);
        font-variation-settings: var(--ui-primary-fontVariation);
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
