import { ripple } from "../../js";

// {{{ Content Template

const template = document.createElement("template");
template.innerHTML = `
<style>
    :host {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 2rem;
        height: 2rem;
        padding: calc(var(--spacing) / 2);
        border: var(--border-width) var(--border-style) hsl(var(--border));
        border-radius: var(--radius);
        outline: none;
        overflow: hidden;
        font-size: 1.1rem;
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

// }}}

class UI {
    /** @type {IconButton} */
    #root

    /** @param {IconButton} root */
    constructor(root) {
        this.#root = root

        /** @type {(() => void) | null} */
        this.removeRipple = null;
    }

    enableRipple() {
        if (!!this.removeRipple) return;
        this.removeRipple = ripple.create(this.#root, { centered: true });
    }

    disableRipple() {
        if (!!this.removeRipple) this.removeRipple()
        this.removeRipple = null
    }
}

export class IconButton extends HTMLElement {
    static register = () => customElements.define("ui-icon-button", IconButton)
    static observedAttributes = ["no-ripple"]

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.ui = new UI(this)
    }

    connectedCallback() {
        if (!this.hasAttribute("no-ripple") && !this.ui.removeRipple) {
            this.ui.enableRipple()
        }
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "no-ripple":
                if (newValue !== null) this.ui.disableRipple()
                else this.ui.enableRipple()
                break
        }
    }
}
