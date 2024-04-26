import { ripple } from "../../js";

const template = document.createElement("template");
template.innerHTML = `
<style>
    :host {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 2.5em;
        height: 2.5em;
        padding: var(--spacing);
        border: var(--border-width) var(--border-style) hsl(var(--border));
        border-radius: var(--radius);
        outline: none;
        overflow: hidden;
        font-family: var(--font-family);
        cursor: pointer;
        user-select: none;
    }

    :host([ghost]) {
        border-color: transparent !important;
        box-shadow: none;
    }

    :host([color="primary"]) {
        color: hsl(var(--primary));
        border-color: hsl(var(--primary));
    }

    :host([color="secondary"]) {
        color: hsl(var(--secondary));
        border-color: hsl(var(--secondary));
    }

    :host([color="destructive"]) {
        color: hsl(var(--destructive));
        border-color: hsl(var(--destructive));
    }

    /* :disabled */

    :host(:disabled),
    :host(:disabled:hover),
    :host(:disabled:active) {
        opacity: 0.25;
        cursor: default;
    }
</style>

<slot></slot>
`;

export class IconButton extends HTMLElement {
    /** @type {() => void} */
    #removeRipple;

    static register = () => customElements.define("ui-icon-button", IconButton)
    static observedAttributes = ["no-ripple"]

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        if (!this.hasAttribute("no-ripple") && !this.#removeRipple) {
            this.enableRipple()
        }
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "no-ripple":
                if (newValue !== null) this.disableRipple()
                else this.enableRipple()
                break
        }
    }

    enableRipple() {
        if (!!this.#removeRipple) return;
        this.#removeRipple = ripple.create(this, { centered: true });
    }

    disableRipple() {
        if (!!this.#removeRipple) this.#removeRipple()
    }
}
