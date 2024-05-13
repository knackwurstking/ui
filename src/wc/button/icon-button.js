import { ripple } from "../../js";
import { html } from "../../js/utils";

// {{{ innerHTML

const innerHTML = html`
<style>
    :host {
        display: flex !important;
        align-items: center;
        justify-content: center;
        position: relative !important;
        width: 2rem;
        height: 2rem;
        padding: calc(var(--ui-spacing) / 2);
        border: 1px solid currentColor;
        border-radius: var(--ui-icon-button-radius);
        outline: none;
        overflow: hidden;
        cursor: pointer;
        user-select: none;
    }

    :host([ghost]) {
        border-color: transparent !important;
        box-shadow: none;
    }

    :host([color="primary"]) {
        color: var(--ui-primary-bgColor);
        border-color: var(--ui-primary-bgColor);
    }

    :host([color="secondary"]) {
        color: var(--ui-secondary-bgColor);
        border-color: var(--ui-secondary-bgColor);
    }

    :host([color="destructive"]) {
        color: var(--ui-destructive-bgColor);
        border-color: var(--ui-destructive-bgColor);
    }

    /* :disabled */

    :host([disabled]),
    :host([disabled]:hover),
    :host([disabled]:active) {
        opacity: 0.25;
        cursor: default;
        pointer-events: none;
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

    disable() {
        this.#root.setAttribute("disabled", "");
    }

    enable() {
        this.#root.removeAttribute("disabled");
    }

    enableRipple() {
        if (!!this.removeRipple) return;
        this.removeRipple = ripple.create(this.#root, { centered: true });
        this.#root.removeAttribute("no-ripple");
    }

    disableRipple() {
        if (!this.removeRipple) return;

        this.removeRipple();
        this.removeRipple = null
        this.#root.setAttribute("no-ripple", "");
    }
}

export class IconButton extends HTMLElement {
    static register = () => customElements.define("ui-icon-button", IconButton)
    static observedAttributes = ["no-ripple"]

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = innerHTML;

        this.ui = new UI(this)
    }

    connectedCallback() {
        if (!this.hasAttribute("no-ripple") && !this.ui.removeRipple) {
            this.ui.enableRipple()
        }
    }

    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "no-ripple":
                if (newValue !== null) this.ui.disableRipple();
                else this.ui.enableRipple();
                break;
        }
    }
}
