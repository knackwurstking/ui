import { CleanUp, Events, html } from "../js";
import { SvgSearch } from "../svg";
import { UIIconButton } from "../ui-button";
import { UISecondary } from "../ui-text";

/**
 * @typedef {import(".").UISearchEvents} UISearchEvents
 */

const content = html`
    <style>
        * {
            box-sizing: border-box;
        }

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
            position: relative;
            width: 100%;
            border: none;
            border: 1px solid var(--ui-borderColor);
            border-radius: var(--ui-radius);
            transition: border-color 0.25s linear;
            background-color: var(--ui-backdrop-bgColor);
            backdrop-filter: var(--ui-backdropFilter);
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

        ui-icon-button {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    </style>

    <div class="container">
        <slot name="title"></slot>
        <input type="search" />
        <ui-icon-button ghost>
            <svg-search></svg-search>
        </ui-icon-button>
    </div>
`;

/**
 * @template {UISearchEvents} E
 */
class UI {
    /**
     * @param {UISearch} root
     */
    constructor(root) {
        /**
         * @private
         * @type {UISearch}
         */
        this.root = root;

        /**
         * @type {Events<E>}
         */
        this.events = new Events();

        /**
         * @type {UIIconButton}
         */
        this.submit = this.root.shadowRoot.querySelector("ui-icon-button");
        this.submit.ui.events.on("click", () => {
            this.events.dispatch("submit", this.value);
        });

        /**
         * @type {HTMLInputElement}
         */
        this.input = this.root.shadowRoot.querySelector("input");
        this.input.type = "text";
        this.input.onkeydown = (ev) => {
            if (ev.key === "Enter") {
                this.submit.click();
            }
        };
    }

    /**
     * @param {string | null} value
     */
    set title(value) {
        if (value === null) {
            this.root.removeAttribute("title");
        } else {
            this.root.setAttribute("title", value);
        }
    }

    get title() {
        return this.root.getAttribute("title");
    }

    set value(value) {
        this.input.value = value;
    }

    get value() {
        return this.input.value;
    }

    /**
     * @param {string} value
     */
    set placeholder(value) {
        this.input.placeholder = value;
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
        if (state) {
            this.root.setAttribute("invalid", "");
        } else {
            this.root.removeAttribute("invalid");
        }
    }

    /**
     * @returns {boolean}
     */
    get invalid() {
        return this.input.ariaInvalid !== null;
    }
}

/**
 * @template {UISearchEvents} E
 * @extends {HTMLElement}
 */
export class UISearch extends HTMLElement {
    static register = () => {
        UISecondary.register();
        UIIconButton.register();
        SvgSearch.register();

        if (!customElements.get("ui-search")) {
            customElements.define("ui-search", UISearch);
        }
    };

    static observedAttributes = ["title", "value", "placeholder", "invalid"];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = content;

        this.cleanup = new CleanUp();

        this.ui = {
            // TODO: Continue here...
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
                let el = this.querySelector(`[slot="title"]`);

                if (newValue === null && !!el) {
                    this.removeChild(el);
                    el = null;
                }

                if (!el) {
                    el = new UISecondary();
                    el.slot = "title";
                    this.appendChild(el);
                }

                el.innerHTML = newValue || "";
                break;

            case "value":
                this.ui.value = newValue || "";
                break;

            case "placeholder":
                if (newValue === null) {
                    this.ui.placeholder = "";
                } else {
                    this.ui.placeholder = newValue;
                }
                break;

            case "invalid":
                this.ui.input.ariaInvalid = newValue !== null ? "" : null;
                break;
        }
    }
}
