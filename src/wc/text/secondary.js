import { html } from "../../js/utils";

const innerHTML = html`
<style>
    :host {
        font-size: 0.9rem;
        font-family: var(--ui-secondary-fontFamily);
        font-variation-settings: var(--ui-secondary-fontVariation);
    }
</style>

<slot></slot>
`

export class Secondary extends HTMLElement {

    static register = () => customElements.define("ui-secondary", Secondary)

    constructor() {
        super();
        this.attachShadow({ mode: "open" })
        this.shadowRoot.innerHTML = innerHTML
    }
}
