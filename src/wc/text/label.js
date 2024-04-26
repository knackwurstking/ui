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

export class Label extends HTMLElement {
    /** @type {HTMLElement | null} */
    #input = null;
    #running = false;
    #onClick = async () => (!!this.#input) && this.#input.click();
    #onInputClick = async (ev) => ev.stopPropagation();
    /** @type {() => void} */
    #removeRipple;

    static register = () => customElements.define("ui-label", Label);
    static observedAttributes = ["ripple"];

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "ripple":
                if (newValue !== null) this.enableRipple()
                else this.disableRipple()
                break
        }
    }

    enableRipple() {
        if (!!this.#removeRipple) return;
        this.removeRipple = ripple.create(this);
        this.style.cursor = "pointer";
        this.#startInputHandling()
    }

    disableRipple() {
        if (!!this.#removeRipple) this.#removeRipple()
        this.#stopInputHandling()
    }

    #startInputHandling() {
        if (this.#running) return;

        this.#input = this.querySelector("input")
        if (!!this.#input) {
            this.addEventListener("click", this.#onClick)
            this.#input.addEventListener("click", this.#onInputClick)
        }

        this.#running = true;
    }

    #stopInputHandling() {
        if (!!this.#input) {
            this.removeEventListener("click", this.#onClick)
            this.#input.removeEventListener("click", this.#onInputClick)
        }

        this.#running = false;
    }
}
