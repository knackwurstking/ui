import { ripple } from "../../js"
import { html } from "../../js/utils";

const innerHTML = html`
<style>
    :host {
        position: relative;
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: var(--ui-spacing);
        border-radius: var(--ui-radius);
    }

    :host > .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: fit-content;
        width: 100%;
        margin-right: var(--ui-spacing);
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
        this._startInputHandling()
    }

    disableRipple() {
        if (!!this.#removeRipple) this.#removeRipple()
        this._stopInputHandling()
    }

    _startInputHandling() {
        if (this.#running) return;

        this.#root.addEventListener("click", this.#onClick);

        this.getInputSlot().forEach(el => {
            el.addEventListener("click", this.#onInputClick)
        });

        this.#running = true;
    }

    _stopInputHandling() {
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
        this.shadowRoot.innerHTML = innerHTML;

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
