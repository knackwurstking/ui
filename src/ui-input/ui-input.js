import { CleanUp, Events } from "../js";
import { UISecondary } from "../ui-text";

/**
 * @typedef {import(".").UIInputEvents} UIInputEvents
 * @typedef {import(".").UIInputTypes} UIInputTypes
 * @typedef {import(".").UIInputTypeValues} UIInputTypeValues
 */

const t = document.createElement("template");
t.innerHTML = `
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
        <input>
    </div>
`;

/**
 * @template {UIInputEvents} E
 * @template {UIInputTypes} T
 */
class UI {
    /**
     * @param {UIInput} root
     */
    constructor(root) {
        /**
         * @private
         * @type {UIInput}
         */
        this.root = root;

        /**
         * @type {Events<E>}
         */
        this.events = new Events();

        /**
         * @type {HTMLInputElement}
         */
        this.input = this.root.shadowRoot.querySelector("input");
        this.input.type = this.root.getAttribute("type") || "text";

        this.input.oninput = () =>
            this.events.dispatch("input", this.value);

        this.input.onchange = () =>
            this.events.dispatch("change", this.value);
    }

    /**
     * @param {string | null} v
     */
    set title(v) {
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
    }

    get title() {
        return this.root.querySelector(`[slot="title"]`)?.innerHTML || null;
    }

    /**
     * @param {UIInputTypes} value
     */
    set type(value) {
        this.input.type = value
    }

    /**
     * @returns {UIInputTypes}
     */
    get type() {
        // @ts-expect-error
        return this.input.type || "text";
    }

    /**
     * @param {UIInputTypeValues[T]} value
     */
    set value(value) {
        // @ts-expect-error
        this.input.value = value
    }

    /**
     * @returns {UIInputTypeValues[T]}
     */
    get value() {
        switch (this.input.type) {
            case "number":
                // @ts-expect-error
                return !!this.input.value ? new Number(this.input.value) : NaN;
            default:
                // @ts-expect-error
                return this.input.value;
        }
    }

    /**
     * @param {string} value
     */
    set placeholder(value) {
        this.input.placeholder = value
    }

    /**
     * @returns {string}
     */
    get placeholder() {
        return this.input.placeholder;
    }

    /**
     * @param {boolean} state
     */
    set invalid(state) {
        this.input.ariaInvalid = state ? "" : null;
    }

    /**
     * @returns {boolean}
     */
    get invalid() {
        return this.input.ariaInvalid !== null
    }

    /**
     * @param {UIInputTypeValues[T]} n
     */
    set min(n) {
        // @ts-ignore-error
        this.input.min = n;
    }

    /**
     * @returns {UIInputTypeValues[T]}
     */
    get min() {
        switch (this.input.type) {
            case "number":
                // @ts-ignore-error
                return !!this.input.min ? new Number(this.input.min) : NaN;
            default:
                // @ts-ignore-error
                return this.input.min;
        }
    }

    /**
     * @param {UIInputTypeValues[T]} n
     */
    set max(n) {
        // @ts-ignore-error
        this.input.max = n;
    }

    /**
     * @returns {UIInputTypeValues[T]}
     */
    get max() {
        switch (this.input.type) {
            case "number":
                // @ts-ignore-error
                return !!this.input.max ? new Number(this.input.max) : NaN;
            default:
                // @ts-ignore-error
                return this.input.max;
        }
    }
}

/**
 * @template {UIInputEvents} E
 * @template {UIInputTypes} T
 * @extends {HTMLElement}
 */
export class UIInput extends HTMLElement {

    static register = () => {
        if (!customElements.get("ui-input")) {
            console.debug("register web component: ui-input");
            customElements.define("ui-input", UIInput);
        }
    };

    static observedAttributes = [
        "title",
        "type", "value",
        "placeholder",
        "invalid",
        "min", "max",
    ];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(t.content.cloneNode(true));

        this.cleanup = new CleanUp();
        /** @type {UI<UIInputEvents & E, T>} */
        this.ui = new UI(this);
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
                this.ui.title = newValue;
                break;

            case "type":
                if (newValue === null) {
                    this.ui.type = "text";
                } else {
                    // @ts-expect-error
                    this.ui.type = newValue;
                }
                break;

            case "value":
                this.ui.value = this.parseNewValue(newValue);
                break;

            case "placeholder":
                if (newValue === null) {
                    this.ui.placeholder = "";
                } else {
                    this.ui.placeholder = newValue;
                }
                break;

            case "invalid":
                this.ui.invalid = newValue !== null;
                break;

            case "min":
                this.ui.min = this.parseNewValue(newValue);
                break;

            case "max":
                this.ui.max = this.parseNewValue(newValue)
                break;
        }
    }

    /**
     * @private
     * @param {string | null} value
     * @returns {UIInputTypeValues[T]}
     */
    parseNewValue(value) {
        switch (this.ui.type) {
            case "number":
                // @ts-expect-error
                return !!value ? new Number(value) : NaN;
            default:
                // @ts-expect-error
                return value || "";
        }
    }
}
