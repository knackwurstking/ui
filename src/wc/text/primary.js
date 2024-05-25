import { html } from "../../js/utils";

const innerHTML = html`
<style>
    :host {
        font-size: 1.1rem;
        font-family: var(--ui-fontFamily);
        font-variation-settings: var(--ui-text-primary-fontVariation);
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
