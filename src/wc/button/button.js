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
        padding: var(--ui-spacing) calc(var(--ui-spacing) * 2.5);
        border: 1px solid currentColor;
        border-radius: var(--ui-button-radius);
        overflow: hidden;
        text-transform: capitalize;
        cursor: pointer;
        outline: none;
        user-select: none;
    }

    :host([variant="full"]) {
        border: none;
    }

    :host([variant="full"][color="primary"]) {
        background-color: var(--ui-primary-bgColor);
        color: var(--ui-primary-color);
    }

    :host([variant="full"][color="secondary"]) {
        background-color: var(--ui-secondary-bgColor);
        color: var(--ui-secondary-color);
    }

    :host([variant="full"][color="destructive"]) {
        background-color: var(--ui-destructive-bgColor);
        color: var(--ui-destructive-color);
    }

    :host([variant="outline"]) {
        border-color: currentColor;
        background-color: transparent;
    }

    :host([variant="outline"][color="primary"]) {
        color: var(--ui-primary-bgColor);
    }

    :host([variant="outline"][color="secondary"]) {
        color: var(--ui-secondary-bgColor);
    }

    :host([variant="outline"][color="destructive"]) {
        color: var(--ui-destructive-bgColor);
    }

    :host([variant="ghost"]) {
        border-color: transparent;
        background-color: transparent;
    }

    :host([variant="ghost"][color="primary"]) {
        color: var(--ui-primary-bgColor);
    }

    :host([variant="ghost"][color="secondary"]) {
        color: var(--ui-secondary-bgColor);
    }

    :host([variant="ghost"][color="destructive"]) {
        color: var(--ui-destructive-bgColor);
    }

    :host([disabled]),
    :host([disabled]:hover),
    :host([disabled]:active) {
        background-color: transparent;
        opacity: 0.25;
        cursor: default;
        pointer-events: none;
    }
</style>

<slot></slot>
`;

// }}}

class UI {
    /** @type {Button} */
    #root

    /** @param {Button} root */
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

export class Button extends HTMLElement {

    static register = () => customElements.define("ui-button", Button)
    static observedAttributes = ["no-ripple"]

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = innerHTML;
        this.setAttribute("role", "button");

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
                if (newValue !== null) this.ui.disableRipple()
                else this.ui.enableRipple()
                break
        }
    }
}
