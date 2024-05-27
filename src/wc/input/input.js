/**
 * @typedef {{
 * }} InputEvents
 *
 * @typedef {(
 *  | "text"
 *  | "number"
 *  | "month"
 *  | "date"
 * )} InputTypes
 *
 * @typedef {{
 *  text: string;
 *  number: number;
 *  month: string;
 *  date: string;
 * }} InputTypeValues
 */

import { Events } from "../../js/events";

const t = document.createElement("template");
t.innerHTML = `
    <style>
        .container {
            width: 100%;
            border: none;
            border-bottom: 1px solid var(--ui-borderColor);
            transition: border-color 0.25s linear;
        }
    </style>

    <div class="container">
        <div class="title"></div>
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
    }

    /**
     * @param {T} value
     */
    set type(value) {
        this.input.type = value
    }

    /**
     * @returns {T}
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
        "type", "value",
        "placeholder",
        "invalid",
        "min", "max"
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
            case "type":
                if (newValue === null) {
                    // @ts-expect-error
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
