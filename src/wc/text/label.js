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
    <ui-primary></ui-primary>
    <ui-secondary></ui-secondary>
</span>

<span class="input">
    <slot name="input"></slot>
    <slot></slot>
</span>
`

class UI {
    /** @type {Label} */
    #root;

    #running = false;

    #onClick = async () => {
        // @ts-expect-error
        [...this.#root.querySelectorAll(`[slot="input"]`)].forEach(child => child.click());
    };

    #onInputClick = async (/** @type{MouseEvent & { currentTarget: Element }} */ ev) => {
        ev.stopPropagation();
    };

    /** @type {() => void} */
    #removeRipple;

    /** @param {Label} root */
    constructor(root) {
        this.#root = root
    }

    get primary() {
        return this.#root.getAttribute("primary")
    }

    set primary(value) {
        this.#root.setAttribute("primary", value)
    }

    get secondary() {
        return this.#root.getAttribute("secondary")
    }

    set secondary(value) {
        this.#root.setAttribute("secondary", value)
    }

    getInputSlot() {
        return [...this.#root.querySelectorAll(`[slot="input"]`)]
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

        this.#root.addEventListener("click", this.#onClick);

        this.getInputSlot().forEach(el => {
            el.addEventListener("click", this.#onInputClick)
        });

        this.#running = true;
    }

    #stopInputHandling() {
        this.#root.removeEventListener("click", this.#onClick);

        [...this.#root.querySelectorAll(`[slot="input"]`)].forEach(el => {
            el.removeEventListener("click", this.#onInputClick)
        });

        this.#running = false;
    }
}

/**
 * Special slots in use
 *  - **input**
 */
export class Label extends HTMLElement {

    static register = () => customElements.define("ui-label", Label);
    static observedAttributes = ["ripple", "secondary", "primary"];

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.ui = new UI(this)
    }

    /**
    * @param {string} name
    * @param {string | null} _oldValue
    * @param {string | null} newValue
    */
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "ripple":
                if (newValue !== null) this.ui.enableRipple()
                else this.ui.disableRipple()
                break
            case "primary":
                this.shadowRoot.querySelector("ui-primary").innerHTML = newValue || ""
                break
            case "secondary":
                this.shadowRoot.querySelector("ui-secondary").innerHTML = newValue || ""
                break
        }
    }
}
