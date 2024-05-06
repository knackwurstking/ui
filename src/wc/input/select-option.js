import { html } from "../../js/utils"

const innerHTML = html`
<style>
    :host {
        display: none;
        align-items: center;

        padding: var(--ui-spacing);
        padding-right: 2rem;

        height: calc(1em * var(--ui-line-height) + var(--ui-spacing) * 2);

        white-space: nowrap;
        text-overflow: ellipsis;

        transition: background-color 0.25s linear, color 0.25s linear;

        overflow: hidden;
    }
</style>

<slot></slot>
`

class UI {
    /** @type {SelectOption} */
    #root

    /** @param {SelectOption} root */
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

export class SelectOption extends HTMLElement {
    static register = () => customElements.define("ui-select-option", SelectOption);

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = innerHTML;

        this.ui = new UI(this);
    }
}
