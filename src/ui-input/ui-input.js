import { Events, html } from "../utils";
import { UISecondary } from "../ui-text";

/**
 * @typedef UIInput_Events
 * @type {{
 *  input: string;
 *  change: string;
 * }}
 */

/**
 * HTML: `ui-input`
 *
 * Attributes:
 *  - __title__: *string*
 *  - __type__: *string*
 *  - __value__: *string*
 *  - __placeholder__: *string*
 *  - __min__: *string*
 *  - __max__: *string*
 *  - __invalid__: *boolean*
 *
 * Slots:
 *  - __title__
 *
 * @template {UIInput_Events} [E=UIInput_Events]
 */
export class UIInput extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-input")) {
            customElements.define("ui-input", UIInput);
        }
    };

    static observedAttributes = [
        "title",
        "type",
        "value",
        "placeholder",
        "invalid",
        "min",
        "max",
    ];

    constructor() {
        super();

        this.ui = {
            root: this,

            /** @type {Events<E>} */
            events: new Events(),

            /** @type {HTMLInputElement | null} */
            input: null,

            get title() {
                return this.root.getAttribute("title");
            },

            set title(value) {
                let el = this.root.querySelector(`[slot="title"]`);

                if (!value && !!el) {
                    this.root.removeChild(el);
                }

                if (!value) return;

                if (!el) {
                    el = new UISecondary();
                    el.slot = "title";
                    this.root.appendChild(el);
                }

                el.innerHTML = value;
            },

            get type() {
                return this.input.type;
            },

            set type(value) {
                this.input.type = value || "";
            },

            get value() {
                return this.input.value;
            },

            set value(value) {
                this.input.value = value;
            },

            get placeholder() {
                return this.input.placeholder;
            },

            set placeholder(value) {
                this.input.placeholder = value || "";
            },

            get invalid() {
                return this.root.hasAttribute("invalid");
            },

            set invalid(state) {
                if (!state) {
                    this.root.removeAttribute("invalid");
                    return;
                }

                this.root.setAttribute("invalid", "");
            },

            get min() {
                return this.input.min;
            },

            set min(value) {
                this.input.min = value;
            },

            get max() {
                return this.input.max;
            },

            set max(value) {
                this.input.max = value;
            },

            /**
             * @param {FocusOptions | null} [options]
             */
            focus(options = null) {
                this.root.shadowRoot.querySelector("input").focus(options);
            },

            blur() {
                this.root.shadowRoot.querySelector("input").blur();
            },
        };

        this.#renderUIInput();
    }

    #renderUIInput() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = html`
            <style>
                * {
                    box-sizing: border-box;
                }

                :host {
                    display: block;
                    position: relative;
                    width: 100%;
                    height: fit-content;
                }

                input {
                    width: 100%;
                    display: block;
                    margin: 0;
                    padding: var(--ui-spacing) calc(var(--ui-spacing) * 2);
                    border: none !important;
                    border-radius: inherit;
                    outline: none !important;
                    font-size: 0.9rem;
                    font-family: var(--ui-fontFamily);
                    font-variation-settings: var(--ui-input-fontVariation);
                    accent-color: var(--ui-primary);
                    background-color: transparent !important;
                }

                .container {
                    width: 100%;
                    border: none;
                    border: 1px solid var(--ui-borderColor);
                    border-radius: var(--ui-radius);
                    transition: border-color 0.25s linear;
                }

                .container:has(input:focus) {
                    border-color: var(--ui-primary);
                }

                :host([invalid]) .container {
                    border-color: var(--ui-destructive);
                }

                ::slotted([slot="title"]) {
                    display: block;
                    padding: 0 var(--ui-spacing);
                    user-select: none;
                    transform: translateY(calc(var(--ui-spacing) / 2));
                }
            </style>

            <div class="container">
                <slot name="title"></slot>
                <input />
            </div>
        `;

        this.ui.input = this.shadowRoot.querySelector("input");
        this.ui.input.type = this.getAttribute("type") || "text";

        this.ui.input.oninput = () => {
            this.ui.events.dispatch("input", this.ui.input.value);
        };

        this.ui.input.onchange = () => {
            this.ui.events.dispatch("change", this.ui.input.value);
        };
    }

    connectedCallback() {}
    disconnectedCallback() {}

    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "title":
                this.ui.title = newValue;
                break;

            case "type":
                this.ui.type = newValue;
                break;

            case "value":
                this.ui.value = newValue;
                break;

            case "placeholder":
                this.ui.placeholder = newValue;
                break;

            case "invalid":
                this.ui.input.ariaInvalid = newValue !== null ? "" : null;
                break;

            case "min":
                this.ui.min = newValue;
                break;

            case "max":
                this.ui.max = newValue;
                break;
        }
    }
}
