const template = document.createElement("template")

template.innerHTML = `
<style>
    :host {
        display: none;
        padding: var(--spacing);
        padding-right: 2rem;
        transition: background-color 0.25s linear;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: calc(1em * var(--line-height) + var(--spacing) * 2)
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

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.ui = new UI(this)
    }
}
