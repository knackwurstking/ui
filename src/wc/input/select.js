import { SelectOption } from "./select-option"
import { Events } from "../../js/events";

/**
 * @typedef {{
 *  "change": SelectOption;
 * }} SelectEvents
 */

// {{{ Content Template

const template = document.createElement("template")

template.innerHTML = `
<style>
    * {
        box-sizing: border-box;
    }

    :host {
        --items-length: 0;
        position: relative; 
        display: block;
        width: 100%;
        height: calc(1em * var(--line-height) + var(--spacing) * 2);
        border: var(--border-width) var(--border-style) hsl(var(--border));
        border-radius: var(--radius);
        transition: height 0.25s ease;
        line-height: 1.15;
        overflow: hidden;
    }

    .options {
        cursor: pointer;
        display: none;
        display: flex;
        flex-direction: column;
        min-height: 100%;
    }

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
        width: 2.5rem;
        height: 100%;
        color: hsl(var(--primary));
    }

    ::slotted(ui-select-option) {
        display: flex;
    }

    :host(.open) {
        height: calc((1em * var(--line-height) + var(--spacing) * 2) * var(--items-length));
    }

    :host(.open) .options {
        display: block;
    }

    :host(.open) .icon {
        display: none;
    }

    :host(.open) ::slotted(ui-select-option[selected]) {
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-fg));
    }

    :host(.open) ::slotted(ui-select-option:not([selected]):hover) {
        background-color: hsl(var(--fg), 0.1);
    }

    :host(:not(.open)) .options:has(> ::slotted(ui-select-option[selected])) {
        display: block;
    }

    :host(:not(.open)) ::slotted(ui-select-option:not([selected])) {
        display: none;
    }
</style>

<div class="options">
    <div class="icon"><ui-icon-chevron-down></ui-icon-chevron-down></div>

    <slot></slot>
</div>
`

// }}}

class UI {
    constructor() {
        /** @type {Events<SelectEvents>} */
        this.events = new Events();
    }
}

export class Select extends HTMLElement {
    /** @param {MouseEvent | PointerEvent} ev */
    #onClick = async (ev) => { // {{{
        (ev.composedPath() || []).forEach(child => {
            if (child instanceof SelectOption) {
                [...this.querySelectorAll("ui-select-option")].forEach(c =>
                    c.removeAttribute("selected")
                );

                child.setAttribute("selected", "");
                this.ui.events.dispatch("change", child)
            }
        });
    } // }}}

    static register = () => customElements.define("ui-select", Select)

    constructor() { // {{{
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.cleanup = []

        /** @type {UI} */
        this.ui = new UI();
    } // }}}

    connectedCallback() { // {{{
        const options = this.shadowRoot.querySelector(".options");
        const cb = this.onClickOptions.bind(this);
        options.addEventListener("click", cb);
        this.cleanup.push(() => {
            this.removeEventListener("click", cb);
            options.removeEventListener("click", this.onClickOptions);
        });


        this.style.setProperty("--items-length",
            this.querySelectorAll("ui-select-option").length.toString());
    } // }}}

    disconnectedCallback() { // {{{
        this.cleanup.forEach(fn => fn());
        this.cleanup = [];
    } // }}}

    /**
     * @private
     * @param {Event} ev
     */
    async onClickOptions(ev) { // {{{
        if (this.classList.toggle("open")) {
            ev.stopPropagation()
            this.addEventListener("click", this.#onClick)
        } else {
            setTimeout(() =>
                this.removeEventListener("click", this.#onClick)
            )
        }
    } // }}}

}
