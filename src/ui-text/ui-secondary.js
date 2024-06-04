import { CleanUp, html } from "../js";

const innerHTML = html`
<style>
    :host {
        font-size: 0.9rem;
        font-family: var(--ui-fontFamily);
        font-variation-settings: var(--ui-text-secondary-fontVariation);
    }
</style>

<slot></slot>
`

export class UISecondary extends HTMLElement {

    static register = () => {
        console.debug("register web component: ui-secondary");
        customElements.define("ui-secondary", UISecondary);
    };

    constructor() {
        super();
        this.attachShadow({ mode: "open" })
        this.shadowRoot.innerHTML = innerHTML

        this.cleanup = new CleanUp();
    }

    connectedCallback() { }
    disconnectedCallback() {
        this.cleanup.run();
    }
}
