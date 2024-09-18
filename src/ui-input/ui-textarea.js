import { Events, html } from "../utils";
import { UISecondary } from "../ui-text";

/**
 * @typedef UITextarea_Events
 * @type {{
 *  input: string;
 *  change: string;
 * }}
 */

/**
 * HTML: `ui-textarea`
 *
 * Attributes:
 *  - **title**: `string`
 *  - **value**: `string`
 *  - **palceholder**: `string`
 *  - **rows**: `number`
 *  - **cols**: `number`
 *  - **invalid**: `boolean`
 *
 * Slots:
 *  - **title**
 *
 * @template {UITextarea_Events} [E=UITextarea_Events]
 */
export class UITextarea extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-textarea")) {
            customElements.define("ui-textarea", UITextarea);
        }
    };

    static observedAttributes = [
        "title",
        "value",
        "placeholder",
        "invalid",
        "rows",
        "cols",
    ];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.ui = {
            root: this,

            /** @type {Events<E>} */
            events: new Events(),

            /** @type {HTMLTextAreaElement | null} */
            textarea: null,

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

            get value() {
                return this.textarea.value;
            },

            set value(value) {
                this.textarea.value = value;
            },

            get placeholder() {
                return this.textarea.placeholder;
            },

            set placeholder(value) {
                this.textarea.placeholder = value || "";
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

            get rows() {
                return this.textarea.rows;
            },

            set rows(value) {
                this.textarea.rows = value;
            },

            get cols() {
                return this.textarea.cols;
            },

            set cols(value) {
                this.textarea.cols = value;
            },

            /**
             * @param {FocusOptions | null} [options]
             */
            focus(options = null) {
                this.root.shadowRoot.querySelector("textarea").focus(options);
            },

            blur() {
                this.root.shadowRoot.querySelector("textarea").blur();
            },
        };

        this.shadowRender();
    }

    shadowRender() {
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

                textarea {
                    resize: none;
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
                    height: 100%;
                    border: none;
                    border: 1px solid var(--ui-borderColor);
                    border-radius: var(--ui-radius);
                    transition: border-color 0.25s linear;
                }

                .container:has(textarea:focus) {
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
                <textarea></textarea>
            </div>
        `;

        this.ui.textarea = this.shadowRoot.querySelector("textarea");

        this.ui.textarea.oninput = () => {
            this.ui.events.dispatch("input", this.ui.textarea.value);
        };

        this.ui.textarea.onchange = () => {
            this.ui.events.dispatch("change", this.ui.textarea.value);
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

            case "value":
                this.ui.value = newValue;
                break;

            case "placeholder":
                this.ui.placeholder = newValue;
                break;

            case "invalid":
                this.ui.textarea.ariaInvalid = newValue !== null ? "" : null;
                break;

            case "rows":
                this.ui.rows = newValue !== null ? parseFloat(newValue) : null;
                break;

            case "cols":
                this.ui.cols = newValue !== null ? parseFloat(newValue) : null;
                break;
        }
    }
}
