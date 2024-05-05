import { ripple } from "../../js";

// {{{ innerHTML

const innerHTML = `
<style>
    :host {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
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
        background-color: hsl(var(--ui-primary-bgColor));
        color: hsl(var(--ui-primary-color));
    }

    :host([variant="full"][color="secondary"]) {
        background-color: hsl(var(--ui-secondary-bgColor));
        color: hsl(var(--ui-secondary-color));
    }

    :host([variant="full"][color="destructive"]) {
        background-color: hsl(var(--ui-destructive-bgColor));
        color: hsl(var(--ui-destructive-color));
    }

    :host([variant="outline"]) {
        border-color: currentColor;
        background-color: transparent;
    }

    :host([variant="outline"][color="primary"]) {
        color: hsl(var(--ui-primary-bgColor));
    }

    :host([variant="outline"][color="secondary"]) {
        color: hsl(var(--ui-secondary-bgColor));
    }

    :host([variant="outline"][color="destructive"]) {
        color: hsl(var(--ui-destructive-bgColor));
    }

    :host([variant="ghost"]) {
        border-color: transparent;
        background-color: transparent;
    }

    :host([variant="ghost"][color="primary"]) {
        color: hsl(var(--ui-primary-bgColor));
    }

    :host([variant="ghost"][color="secondary"]) {
        color: hsl(var(--ui-secondary-bgColor));
    }

    :host([variant="ghost"][color="destructive"]) {
        color: hsl(var(--ui-destructive-bgColor));
    }

    :host(:disabled),
    :host(:disabled:hover),
    :host(:disabled:active) {
        background-color: transparent;
        opacity: 0.25;
        cursor: default;
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

    enableRipple() {
        if (!!this.removeRipple) return;
        this.removeRipple = ripple.create(this.#root, { centered: true });
    }

    disableRipple() {
        if (!!this.removeRipple) this.removeRipple()
        this.removeRipple = null
    }
}

export class Button extends HTMLElement {

    static register = () => customElements.define("ui-button", Button)
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
                if (newValue !== null) this.ui.disableRipple()
                else this.ui.enableRipple()
                break
        }
    }
}
