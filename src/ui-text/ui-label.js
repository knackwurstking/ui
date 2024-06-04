import { CleanUp, ripple } from "../js";
import { html } from "../js/utils";

const innerHTML = html`
<style>
    :host {
        position: relative !important;
        display: flex !important;
        flex-direction: row;
        width: 100%;
        padding: var(--ui-spacing);
        border-radius: var(--ui-radius);
    }

    :host > .text {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        margin-right: var(--ui-spacing);
    }

    :host > .input {
        display: flex;
        align-items: center;
        justify-content: flex-end;
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
    /** @type {UILabel} */
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

    /** @param {UILabel} root */
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
        this.startInputHandling()
    }

    disableRipple() {
        if (!!this.#removeRipple) this.#removeRipple()
        this.stopInputHandling()
    }

    /**
     * @private
     */
    startInputHandling() {
        if (this.#running) return;

        this.#root.addEventListener("click", this.#onClick);

        this.getInputSlot().forEach(el => {
            el.addEventListener("click", this.#onInputClick)
        });

        this.#running = true;
    }

    /**
     * @private
     */
    stopInputHandling() {
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
export class UILabel extends HTMLElement {

    static register = () => {
        console.debug("register web component: ui-label");
        customElements.define("ui-label", UILabel);
    };

    static observedAttributes = ["ripple", "secondary", "primary"];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = innerHTML;

        this.cleanup = new CleanUp();
        this.ui = new UI(this)
    }

    connectedCallback() { }
    disconnectedCallback() {
        this.cleanup.run();
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
