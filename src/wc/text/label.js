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
    #running = false;
    #onClick = async () => {
        if (!!this.input) {
            this.input.click();
        }
    };

    #onInputClick = async (/** @type {Event} */ev) => {
        ev.stopPropagation();
    };

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        /** @type {HTMLInputElement} */
        this.input = null
    }

    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    connectedCallback() {
        // Enable / Disable ripple
        if (this.hasAttribute("ripple")) {
            ripple.create(this);
            this.style.cursor = "pointer";
            this.#startInputHandling()
        } else {
            this.#stopInputHandling()
        }
    }

    /**
     * Runs when the element is removed from the DOM
     */
    disconnectedCallback() {
        this.#stopInputHandling()
    }

    #startInputHandling() {
        if (this.#running) return;

        this.input = this.querySelector("input")
        if (!!this.input) {
            this.addEventListener("click", this.#onClick)
            this.input.addEventListener("click", this.#onInputClick)
        }

        this.#running = true;
    }

    #stopInputHandling() {
        if (!!this.input) {
            this.removeEventListener("click", this.#onClick)
            this.input.removeEventListener("click", this.#onInputClick)
        }

        this.#running = false;
    }
}
