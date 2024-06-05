import { CleanUp, html } from "../js";

const innerHTML = html`
<style>
    :host {
        display: block;
        width: 100%;
        max-width: 65rem;
        margin: 0 auto !important;
        padding: var(--ui-spacing);
    }
</style>

<slot></slot>
`;

export class UIContainer extends HTMLElement {

    static register = () => {
        if (!customElements.get("ui-container")) {
            console.debug("register web component: ui-container");
            customElements.define("ui-container", UIContainer)
        }
    };

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = innerHTML;

        this.cleanup = new CleanUp();
    }

    connectedCallback() { }
    disconnectedCallback() {
        this.cleanup.run();
    }
}
