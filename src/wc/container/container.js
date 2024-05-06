import { html } from "../../js/utils";

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

export class Container extends HTMLElement {

    static register = () => customElements.define("ui-container", Container)

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = innerHTML;
    }
}
