import { Events } from "../js";
import { UISecondary } from "../ui-text";

/**
 * @typedef UIInputEvents
 * @type {{
 *  input: string;
 *  change: string;
 * }}
 *
 * @typedef UIInputTypes
 * @type {(
 *  | "text"
 *  | "search"
 *  | "number"
 *  | "month"
 *  | "date"
 *  | "email"
 * )}
 */

/**
 * @template {UIInputEvents} E
 * @extends {HTMLElement}
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
        this.attachShadow({ mode: "open" });

        this.ui = {
            root: this,

            /** @type {Events<E>} */
            events: new Events(),

            get title() {
                return this.root.getAttribute("title");
            },

            set title(value) {
                if (!value) {
                    this.root.removeAttribute("title");
                    return;
                }

                this.root.setAttribute("title", value);
            },

            get type() {
                return this.root.getAttribute("type");
            },

            set type(value) {
                if (!value) {
                    this.root.removeAttribute("type");
                    return;
                }

                this.root.setAttribute("type", value);
            },

            get value() {
                return this.root.shadowRoot.querySelector("input").value;
            },

            set value(value) {
                this.root.shadowRoot.querySelector("input").value = value;
            },

            get placeholder() {
                return this.root.getAttribute("placeholder");
            },

            set placeholder(value) {
                if (!value) {
                    this.root.removeAttribute("placeholder");
                    return;
                }

                this.root.setAttribute("placeholder", value);
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
                return this.root.shadowRoot.querySelector("input").min;
            },

            set min(value) {
                this.root.shadowRoot.querySelector("input").min = value;
            },

            get max() {
                return this.root.shadowRoot.querySelector("input").max;
            },

            set max(value) {
                this.root.shadowRoot.querySelector("input").max = value;
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

        this.shadowRender();
        this.render();
    }

    shadowRender() {
        this.shadowRoot.innerHTML = `
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
                    accent-color: var(--ui-primary-bgColor);
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
                    border-color: var(--ui-primary-bgColor);
                }

                :host([invalid]) .container {
                    border-color: var(--ui-destructive-bgColor);
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

        const input = this.shadowRoot.querySelector("input");
        input.type = this.getAttribute("type") || "text";

        input.oninput = () => {
            this.ui.events.dispatch("input", input.value);
        };

        input.onchange = () => {
            this.ui.events.dispatch("change", input.value);
        };
    }

    render() { }

    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "title":
                this.setTitle(newValue);
                break;

            case "type":
                this.setType(newValue);
                break;

            case "value":
                this.setValue(newValue);
                break;

            case "placeholder":
                this.setPlaceholder(newValue);
                break;

            case "invalid":
                this.setInvalid(newValue);
                break;

            case "min":
                this.setMin(newValue);
                break;

            case "max":
                this.setMax(newValue);
                break;
        }
    }

    /**
     * @param {string | null} title
     */
    setTitle(title) {
        let el = this.querySelector(`[slot="title"]`);

        if (!title && !!el) {
            this.removeChild(el);
        }

        if (!title) return;

        if (!el) {
            el = new UISecondary();
            el.slot = "title";
            this.appendChild(el);
        }

        el.innerHTML = title;
    }

    /**
     * @param {string | null} type
     */
    setType(type) {
        this.shadowRoot.querySelector("input")
            .type = type !== null ? type : "";
    }

    /**
     * @param {string | null} value
     */
    setValue(value) {
        this.shadowRoot.querySelector("input").value = value;
    }

    /**
     * @param {string | null} placeholder
     */
    setPlaceholder(placeholder) {
        this.shadowRoot.querySelector("input")
            .placeholder = placeholder || "";
    }

    /**
     * @param {string | null} invalid
     */
    setInvalid(invalid) {
        this.shadowRoot.querySelector("input")
            .ariaInvalid = invalid;
    }

    /**
     * @param {string | null} min
     */
    setMin(min) {
        this.shadowRoot.querySelector("input")
            .min = min;
    }

    /**
     * @param {string | null} max
     */
    setMax(max) {
        this.shadowRoot.querySelector("input")
            .max = max;
    }
}
