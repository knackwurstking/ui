import { html } from "../js";

const innerHTML = html`
<style>
    :host {
        display: none;
        align-items: center;

        padding: var(--ui-spacing);
        padding-right: 2rem;

        height: calc(1em * var(--ui-lineHeight) + var(--ui-spacing) * 2);

        white-space: nowrap;
        text-overflow: ellipsis;

        transition: background-color 0.25s linear, color 0.25s linear;

        overflow: hidden;
    }
</style>

<slot></slot>
`

class UI {
    /** @type {UISelectOption} */
    #root

    /** @param {UISelectOption} root */
    constructor(root) {
        this.#root = root
    }

    get value() {
        return this.#root.getAttribute("value")
    }

    set value(value) {
        this.#root.setAttribute("value", value)
    }

    get selected() {
        return this.#root.hasAttribute("selected")
    }

    set selected(state) {
        if (!state) {
            this.#root.removeAttribute("selected")
        } else {
            this.#root.setAttribute("selected", "")
        }
    }
}

export class UISelectOption extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-select-option")) {
            customElements.define("ui-select-option", UISelectOption);
        }
    };

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = innerHTML;
        this.setAttribute("role", "button");

        this.ui = new UI(this);
    }
}
