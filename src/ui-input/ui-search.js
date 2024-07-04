import { CleanUp, Events, html } from "../js";
import { SvgSearch } from "../svg";
import { UIIconButton } from "../ui-button";
import { UISecondary } from "../ui-text";

/**
 * @typedef UISearchEvents
 * @type {{
 *  input: string;
 *  change: string;
 *  submit: string;
 * }}
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

        :host(:not([no-submit])) input {
            width: calc(100% - 2rem);
        }

        .container {
            position: relative;
            width: 100%;
            border: none;
            border: 1px solid var(--ui-borderColor);
            border-radius: var(--ui-radius);
            transition: border-color 0.25s linear;
            background-color: var(--ui-backdrop-bgColor);
            -webkit-backdrop-filter: var(--ui-backdropFilter);
            backdrop-filter: var(--ui-backdropFilter);
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

    static observedAttributes = [
        "title",
        "value",
        "placeholder",
        "invalid",
        "no-submit",
        "use-storage",
        "storage-prefix",
    ];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = content;

        this.cleanup = new CleanUp();

        this.ui = {
            /** @private */
            root: this,

            /**
             * @type {boolean}
             */
            useStorage: false,

            /**
             * @type {string | null}
             */
            storagePrefix: null,

            submit: (() => {
                /** @type {UIIconButton} */
                const submit = this.shadowRoot.querySelector("ui-icon-button");

                submit.ui.events.on("click", () => {
                    this.ui.events.dispatch("submit", this.ui.getValue());
                });

                return submit;
            })(),

            input: (() => {
                /** @type {HTMLInputElement} */
                const input = this.shadowRoot.querySelector("input");
                input.type = "text";

                input.onkeydown = async (ev) => {
                    if (!this.ui.hasSubmit()) return;
                    if (ev.key === "Enter") this.ui.submit.click();
                };

                input.oninput = async () => {
                    if (this.ui.useStorage) {
                        if (timeout !== null) {
                            clearTimeout(timeout);
                        }

                        timeout = setTimeout(() => {
                            localStorage.setItem(
                                (this.ui.storagePrefix || "") +
                                    this.ui.getKey(),
                                input.value,
                            );
                            timeout = null;
                        }, 250);
                    }

                    this.ui.events.dispatch("input", input.value);
                };

                /**
                 * @type {NodeJS.Timeout | null}
                 */
                let timeout = null;

                input.onchange = async () =>
                    this.ui.events.dispatch("change", input.value);

                return input;
            })(),

            /** @type {Events<E>} */
            events: new Events(),

            /**
             *  @param {string | null} value
             */
            setKey(value) {
                if (value === null) {
                    this.root.removeAttribute("key");
                    this.setValue("");
                    return;
                }

                this.root.setAttribute("key", value);
                this.setValue(
                    localStorage.getItem(this.storagePrefix + this.getKey()),
                );
            },

            getKey() {
                return this.root.getAttribute("key") || "";
            },

            hasSubmit() {
                return !!this.submit.parentElement;
            },

            disableSubmit() {
                if (this.hasSubmit()) {
                    this.submit.parentElement.removeChild(this.submit);
                }
            },

            enableSubmit() {
                if (!this.hasSubmit()) return;
                const container =
                    this.root.shadowRoot.querySelector(".container");
                container.appendChild(this.submit);
            },

            /**
             * @param {string | null} value
             */
            setTitle(value) {
                if (value === null) {
                    this.root.removeAttribute("title");
                } else {
                    this.root.setAttribute("title", value);
                }
            },

            getTitle() {
                return this.root.getAttribute("title");
            },

            /**
             * @param {string | null} value
             */
            setValue(value) {
                this.input.value = value || "";
            },

            getValue() {
                return this.input.value;
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
                    this.root.setAttribute("invalid", "");
                    return;
                }

                this.root.removeAttribute("invalid");
            },

            /**
             * @returns {boolean}
             */
            getInvalid() {
                return this.root.hasAttribute("invalid");
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
                this.ui.setValue(newValue);
                break;

            case "placeholder":
                this.ui.input.placeholder = newValue || "";
                break;

            case "invalid":
                this.ui.input.ariaInvalid = newValue !== null ? "" : null;
                break;

            case "no-submit":
                if (newValue !== null) {
                    this.ui.disableSubmit();
                } else {
                    this.ui.enableSubmit();
                }
                break;

            case "use-storage":
                this.ui.useStorage = newValue !== null;
                break;

            case "storage-prefix":
                this.ui.storagePrefix = newValue;
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
