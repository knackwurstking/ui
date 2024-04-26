import { ripple } from "../../js"

const template = document.createElement("template")

template.innerHTML = `
<style>
    :host {
        position: relative;
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: calc(var(--spacing) / 4) calc(var(--spacing) / 2);
        border-radius: var(--radius);
    }

    :host > .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: fit-content;
        width: 100%;
        margin-right: var(--spacing);
    }

    :host > .input {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        min-width: fit-content;
        width: 100%;
    }
</style>

<span class="text">
    <slot name="primary"></slot>
    <slot name="secondary"></slot>
</span>

<span class="input">
    <slot name="input"></slot>
</span>

<slot></slot>
`

class UI {
    /** @type {Label} */
    #root;

    /** @type {HTMLElement | null} */
    #input = null;

    #running = false;
    #onClick = async () => (!!this.#input) && this.#input.click();
    #onInputClick = async (ev) => ev.stopPropagation();
    /** @type {() => void} */
    #removeRipple;

    /** @param {Label} root */
    constructor(root) {
        this.#root = root
    }

    enableRipple() {
        if (!!this.#removeRipple) return;
        this.removeRipple = ripple.create(this.#root);
        this.#root.style.cursor = "pointer";
        this.#startInputHandling()
    }

    disableRipple() {
        if (!!this.#removeRipple) this.#removeRipple()
        this.#stopInputHandling()
    }

    #startInputHandling() {
        if (this.#running) return;

        this.#input = this.#root.querySelector("input")
        if (!!this.#input) {
            this.#root.addEventListener("click", this.#onClick)
            this.#input.addEventListener("click", this.#onInputClick)
        }

        this.#running = true;
    }

    #stopInputHandling() {
        if (!!this.#input) {
            this.#root.removeEventListener("click", this.#onClick)
            this.#input.removeEventListener("click", this.#onInputClick)
        }

        this.#running = false;
    }
}

export class Label extends HTMLElement {

    static register = () => customElements.define("ui-label", Label);
    static observedAttributes = ["ripple"];

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.ui = new UI(this)
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "ripple":
                if (newValue !== null) this.ui.enableRipple()
                else this.ui.disableRipple()
                break
        }
    }
}
