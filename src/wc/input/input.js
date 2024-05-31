import { Secondary } from "..";
import { Events } from "../../js/events";

/**
 * @typedef {{
 *  input: string | number;
 *  change: string | number;
 * }} InputEvents
 *
 * @typedef {(
 *  | "text"
 *  | "number"
 *  | "month"
 *  | "date"
 *  | "email"
 * )} InputTypes
 *
 * @typedef {{
 *  text: string;
 *  number: number;
 *  month: string;
 *  date: string;
 *  email: string;
 * }} InputTypeValues
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
 * @template {InputEvents} E
 * @template {InputTypes} T
 */
class UI {
    /**
     * @param {Input} root
     */
    constructor(root) {
        /**
         * @private
         * @type {Input}
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
        let el = this.root.shadowRoot.querySelector(`[slot="title"]`);

        if (v === null && !!el) {
            this.root.removeChild(el);
        }

        if (!el) {
            el = new Secondary();
            el.slot = "title";
            this.root.appendChild(el);
        }

        el.innerHTML = v || "";
    }

    get title() {
        return this.root.querySelector(`[slot="title"]`)?.innerHTML || null;
    }

    /**
     * @param {InputTypes} value
     */
    set type(value) {
        this.input.type = value
    }

    /**
     * @returns {InputTypes}
     */
    get type() {
        // @ts-expect-error
        return this.input.type || "text";
    }

    /**
     * @param {InputTypeValues[T]} value
     */
    set value(value) {
        // @ts-expect-error
        this.input.value = value
    }

    /**
     * @returns {InputTypeValues[T]}
     */
    get value() {
        switch (this.input.type) {
            case "number":
                // @ts-expect-error
                return new Number(this.input.value);
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
     * @param {InputTypeValues[T]} n
     */
    set min(n) {
        // @ts-ignore-error
        this.input.min = n;
    }

    /**
     * @returns {InputTypeValues[T]}
     */
    get min() {
        switch (this.input.type) {
            case "number":
                // @ts-ignore-error
                return new Number(this.input.min);
            default:
                // @ts-ignore-error
                return this.input.min;
        }
    }

    /**
     * @param {InputTypeValues[T]} n
     */
    set max(n) {
        // @ts-ignore-error
        this.input.max = n;
    }

    /**
     * @returns {InputTypeValues[T]}
     */
    get max() {
        switch (this.input.type) {
            case "number":
                // @ts-ignore-error
                return new Number(this.input.max);
            default:
                // @ts-ignore-error
                return this.input.max;
        }
    }
}

/**
 * @template {InputEvents} E
 * @template {InputTypes} T
 * @extends {HTMLElement}
 */
export class Input extends HTMLElement {

    static register = () => customElements.define("ui-input", Input);
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

        /** @type {UI<InputEvents & E, T>} */
        this.ui = new UI(this);
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
     * @returns {InputTypeValues[T]}
     */
    parseNewValue(value) {
        switch (this.ui.type) {
            case "number":
                // @ts-expect-error
                return new Number(value);
            default:
                // @ts-expect-error
                return value || "";
        }
    }
}