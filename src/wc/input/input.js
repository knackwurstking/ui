/**
 * @typedef {{
 * }} InputEvents
 *
 * @typedef {(
 *  | "text"
 *  | "number"
 * )} InputTypes
 */

import { Events } from "../../js/events";

const t = document.createElement("template");
t.innerHTML = `
    <style>
        .container {
        }
    </style>

    <div class="container">
        <div class="title"></div>
        <input>
    </div>
`;

/**
 * @template {InputEvents} T
 */
class UI {
    constructor() {
        /** @type {Events<T>} */
        this.events = new Events();

        /** @type {HTMLInputElement} */
        this.input;
    }
}

/**
 * @template {InputEvents} T
 * @extends {HTMLElement}
 */
export class Input extends HTMLElement {

    static register = customElements.define("ui-input", Input);
    static observedAttributes = ["type", "value", "placeholder", "invalid", "min", "max"];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(t.content.cloneNode(true));

        /** @type {UI<InputEvents & T>} */
        this.ui = new UI();
        this.create();
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
                    this.ui.input.type = "text";
                } else {
                    this.ui.input.type = newValue;
                }
                break;
            case "value":
                if (newValue === null) {
                    this.ui.input.value = "";
                } else {
                    this.ui.input.value = newValue;
                }
                break;
            case "placeholder":
                if (newValue === null) {
                    this.ui.input.placeholder = "";
                } else {
                    this.ui.input.placeholder = newValue;
                }
                break;
            case "invalid":
                this.ui.input.ariaInvalid = newValue;
                break;
            case "min":
                if (newValue === null) {
                    this.ui.input.min = "";
                } else {
                    this.ui.input.min = newValue;
                }
                break;
            case "max":
                if (newValue === null) {
                    this.ui.input.max = "";
                } else {
                    this.ui.input.max = newValue;
                }
                break;
        }
    }

    /** @private */
    create() {
        this.ui.input = this.shadowRoot.querySelector("input");
        this.ui.input.type = this.getAttribute("type") || "text";
        // TODO: Add/Forward basic events like "oninput", "onchange"
    }
}
