import { CleanUp, Events, html } from "../js";
import { UISecondary } from "../ui-text";

/**
 * @typedef {import(".").UIInputEvents} UIInputEvents
 * @typedef {import(".").UIInputTypes} UIInputTypes
 * @typedef {import(".").UIInputTypeValues} UIInputTypeValues
 */

const content = html`
    <style>
        :host {
            display: block;
            position: relative;
            width: 100%;
        }

        input {
            width: calc(100% - var(--ui-spacing) * 4);
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
            border-bottom: 1px solid var(--ui-borderColor);
            border-radius: 0;
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

/**
 * @template {UIInputEvents} E
 * @template {UIInputTypes} T
 * @extends {HTMLElement}
 */
export class UIInput extends HTMLElement {
    static register = () => {
        UISecondary.register();

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
        this.shadowRoot.innerHTML = content;

        this.cleanup = new CleanUp();
        this.ui = {
            /** @private */
            root: this,

            input: (() => {
                /** @type {HTMLInputElement} */
                const input = this.shadowRoot.querySelector("input");

                input.type = this.getAttribute("type") || "text";

                input.oninput = () =>
                    this.ui.events.dispatch("input", this.ui.getValue());

                input.onchange = () =>
                    this.ui.events.dispatch("change", this.ui.getValue());

                return input;
            })(),

            /**
             * @type {Events<E>}
             */
            events: new Events(),

            /**
             * @param {string | null} v
             */
            setTitle(v) {
                if (v === null) {
                    this.root.removeAttribute("title");
                    return;
                }

                this.root.setAttribute("title", v);
            },

            getTitle() {
                return this.root.getAttribute("title");
            },

            /**
             * @param {UIInputTypes | null} value
             */
            setType(value) {
                if (value === null) {
                    this.root.removeAttribute("type");
                    return;
                }

                this.root.setAttribute("type", value);
            },

            /**
             * @returns {UIInputTypes}
             */
            getType() {
                // @ts-expect-error
                return this.root.getAttribute("type") || "text";
            },

            /**
             * @param {UIInputTypeValues[T] | null} value
             */
            setValue(value) {
                if (value === null) {
                    this.root.removeAttribute("value");
                    return;
                }

                this.root.setAttribute("value", value.toString());
            },

            /**
             * @returns {UIInputTypeValues[T]}
             */
            getValue() {
                const value = this.input.value;

                switch (this.getType()) {
                    case "number":
                        // @ts-expect-error
                        return !!value ? parseFloat(value) : NaN;
                    default:
                        // @ts-expect-error
                        return value;
                }
            },

            /**
             * @param {string | null} value
             */
            setPlaceholder(value) {
                if (value === null) {
                    this.root.removeAttribute("placeholder");
                    return;
                }

                this.root.setAttribute("placeholder", value);
            },

            /**
             * @returns {string}
             */
            getPlaceholder() {
                return this.root.getAttribute("placeholder");
            },

            /**
             * @param {boolean} state
             */
            setInvalid(state) {
                if (state === null || state === false) {
                    this.root.removeAttribute("invalid");
                    return;
                }

                this.root.setAttribute("invalid", "");
            },

            /**
             * @returns {boolean}
             */
            getInvalid() {
                return this.root.hasAttribute("invalid");
            },

            /**
             * @param {UIInputTypeValues[T] | null} n
             */
            setMin(n) {
                if (n === null) {
                    this.root.removeAttribute("min");
                    return;
                }

                this.root.setAttribute("min", n.toString());
            },

            /**
             * @returns {UIInputTypeValues[T]}
             */
            getMin() {
                const min = this.root.getAttribute("min");

                switch (this.input.type) {
                    case "number":
                        // @ts-expect-error
                        return !!min ? parseFloat(min) : NaN;
                    default:
                        // @ts-expect-error
                        return min;
                }
            },

            /**
             * @param {UIInputTypeValues[T] | null} n
             */
            setMax(n) {
                if (n === null) {
                    this.root.removeAttribute("max");
                }

                this.root.setAttribute("max", n.toString());
            },

            /**
             * @returns {UIInputTypeValues[T]}
             */
            getMax() {
                const max = this.root.getAttribute("max");

                switch (this.input.type) {
                    case "number":
                        // @ts-ignore-error
                        return !!max ? parseFloat(max) : NaN;
                    default:
                        // @ts-ignore-error
                        return max;
                }
            },
        };
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
            case "title":
                let el = this.querySelector(`[slot="title"]`);

                if (newValue === null && !!el) {
                    this.removeChild(el);
                    el = null;
                }

                if (newValue === null) {
                    return;
                }

                if (!el) {
                    el = new UISecondary();
                    el.slot = "title";
                    this.appendChild(el);
                }

                el.innerHTML = newValue;
                break;

            case "type":
                this.ui.input.type = newValue || "text";
                break;

            case "value":
                this.ui.input.value = (newValue || "").toString();
                break;

            case "placeholder":
                this.ui.input.placeholder = newValue || "";
                break;

            case "invalid":
                this.ui.input.ariaInvalid = newValue;
                break;

            case "min":
                this.ui.input.min = newValue || "";
                break;

            case "max":
                this.ui.input.max = newValue || "";
                break;
        }
    }

    /**
     * @param {FocusOptions | null} [options]
     */
    focus(options = null) {
        this.shadowRoot.querySelector("input").focus(options);
    }

    blur() {
        this.shadowRoot.querySelector("input").blur();
    }
}
