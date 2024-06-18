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

        .container:has(input[aria-invalid]) {
            border-color: hsl(var(--ui-destructive-bgColor));
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
                let el = this.root.querySelector(`[slot="title"]`);

                if (v === null && !!el) {
                    this.root.removeChild(el);
                    el = null;
                }

                if (!el) {
                    el = new UISecondary();
                    el.slot = "title";
                    this.root.appendChild(el);
                }

                el.innerHTML = v || "";
            },

            getTitle() {
                return (
                    this.root.querySelector(`[slot="title"]`)?.innerHTML || null
                );
            },

            /**
             * @param {UIInputTypes} value
             */
            setType(value) {
                this.input.value = value;
            },

            /**
             * @returns {UIInputTypes}
             */
            getType() {
                // @ts-expect-error
                return this.input.type || "text";
            },

            /**
             * @param {UIInputTypeValues[T]} value
             */
            setValue(value) {
                this.input.value = value.toString();
            },

            /**
             * @returns {UIInputTypeValues[T]}
             */
            getValue() {
                switch (this.input.type) {
                    case "number":
                        // @ts-expect-error
                        return !!this.input.value
                            ? new Number(this.input.value)
                            : NaN;
                    default:
                        // @ts-expect-error
                        return this.input.value;
                }
            },

            /**
             * @param {string | null} value
             */
            setPlaceholder(value) {
                this.input.placeholder = value || "";
            },

            /**
             * @returns {string}
             */
            getPlaceholder() {
                return this.input.placeholder;
            },

            /**
             * @param {boolean} state
             */
            setInvalid(state) {
                this.input.ariaInvalid = state ? "" : null;
            },

            /**
             * @returns {boolean}
             */
            getInvalid() {
                return this.input.ariaInvalid !== null;
            },

            /**
             * @param {UIInputTypeValues[T]} n
             */
            setMin(n) {
                // @ts-expect-error
                this.input.min = n;
            },

            /**
             * @returns {UIInputTypeValues[T]}
             */
            getMin() {
                switch (this.input.type) {
                    case "number":
                        // @ts-expect-error
                        return !!this.input.min
                            ? new Number(this.input.min)
                            : NaN;
                    default:
                        // @ts-expect-error
                        return this.input.min;
                }
            },

            /**
             * @param {UIInputTypeValues[T]} n
             */
            setMax(n) {
                // @ts-expect-error
                this.input.max = n;
            },

            /**
             * @returns {UIInputTypeValues[T]}
             */
            getMax() {
                switch (this.input.type) {
                    case "number":
                        // @ts-ignore-error
                        return !!this.input.max
                            ? new Number(this.input.max)
                            : NaN;
                    default:
                        // @ts-ignore-error
                        return this.input.max;
                }
            },
        };
    }

    connectedCallback() {}
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
                this.ui.setTitle(newValue);
                break;

            case "type":
                if (newValue === null) {
                    this.ui.setType("text");
                } else {
                    // @ts-expect-error
                    this.ui.setType(newValue);
                }
                break;

            case "value":
                this.ui.setValue(this.parseNewValue(newValue));
                break;

            case "placeholder":
                if (newValue === null) {
                    this.ui.setPlaceholder(null);
                } else {
                    this.ui.setPlaceholder(newValue);
                }
                break;

            case "invalid":
                this.ui.setInvalid(newValue !== null);
                break;

            case "min":
                this.ui.setMin(this.parseNewValue(newValue));
                break;

            case "max":
                this.ui.setMax(this.parseNewValue(newValue));
                break;
        }
    }

    /**
     * @private
     * @param {string | null} value
     * @returns {UIInputTypeValues[T]}
     */
    parseNewValue(value) {
        switch (this.ui.getType()) {
            case "number":
                // @ts-expect-error
                return !!value ? new Number(value) : NaN;
            default:
                // @ts-expect-error
                return value || "";
        }
    }
}
