import { html } from "../../js/utils";

const innerHTML = html`
<style>
    :host {
        display: block;
        position: relative;
    }

    :host(:before) {
        content: '';
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2.5rem;
        height: 2.5rem;
        margin-top: -1.25rem;
        margin-left: -1.25rem;
        border-radius: 50%;
        border: 2px solid hsl(var(--border));
        border-top-color: hsl(var(--primary));
        animation: spinner .6s linear infinite;
    }

    @keyframes spinner {
        to {transform: rotate(360deg);}
    }
</style>
`

export class Spinner extends HTMLElement {

    static register = () => customElements.define("ui-spinner", Spinner);

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = innerHTML;
    }
}
