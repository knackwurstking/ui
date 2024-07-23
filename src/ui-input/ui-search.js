import { Events } from "../js";
import svgSearch from "../svg/smoothie-line-icons/search";
import { UISecondary } from "../ui-text";

/**
 * @typedef UISearchEvents
 * @type {{
 *  input: string;
 *  change: string;
 *  submit: string;
 * }}
 */

/**
 * @template {UISearchEvents} E
 * @extends {HTMLElement}
 */
export class UISearch extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-search")) {
            customElements.define("ui-search", UISearch);
        }
    };

    static observedAttributes = [
        "title",
        "value",
        "placeholder",
        "invalid",
        "nosubmit",
        //"storage",
        //"storageprefix",
        //"storagekey",
    ];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.ui = {
            root: this,

            /** @type {Events<E>} */
            events: new Events(),

            /**
             * @param {FocusOptions | null} [options]
             */
            focus(options = null) {
                this.root.shadowRoot.querySelector("input").focus(options);
            },

            blur() {
                this.root.shadowRoot.querySelector("input").blur();
            },

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

            get nosubmit() {
                return this.root.hasAttribute("nosubmit");
            },

            set nosubmit(state) {
                if (!state) {
                    this.root.removeAttribute("nosubmit");
                    return;
                }

                this.root.setAttribute("nosubmit", "");
            },

            get storage() {
                return this.root.hasAttribute("storage");
            },

            set storage(state) {
                if (!state) {
                    this.root.removeAttribute("storage");
                    return;
                }

                this.root.setAttribute("storage", "");
            },

            get storageprefix() {
                return this.root.getAttribute("storageprefix");
            },

            set storageprefix(value) {
                if (!value) {
                    this.root.removeAttribute("storageprefix");
                    return;
                }

                this.root.setAttribute("storageprefix", value);
            },

            get storagekey() {
                return this.root.getAttribute("storagekey");
            },

            set storagekey(value) {
                if (!value) {
                    this.root.removeAttribute("storagekey");
                    return;
                }

                this.root.setAttribute("storagekey", value);
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

                :host(:not([nosubmit])) input {
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
                <ui-icon-button name="submit" ghost>${svgSearch}</ui-icon-button>
            </div>
        `;

        /** @type {import("../ui-button").UIIconButton} */
        const submit = this.shadowRoot.querySelector(`[name="submit"]`);

        const input = this.shadowRoot.querySelector("input");
        input.type = "search";

        input.addEventListener("keydown", async (ev) => {
            if (this.ui.nosubmit) return;

            if (ev.key === "Enter") {
                submit.click();
            }
        });

        /** @type {NodeJS.Timeout | null} */
        let timeout = null;
        input.addEventListener("input", async () => {
            if (this.ui.storage) {
                if (timeout !== null) {
                    clearTimeout(timeout);
                }

                timeout = setTimeout(() => {
                    localStorage.setItem(
                        (this.ui.storageprefix || "") + this.ui.storagekey,
                        input.value,
                    );
                    timeout = null;
                }, 250);
            }

            this.ui.events.dispatch("input", input.value);
        });

        input.addEventListener("change", async () => {
            this.ui.events.dispatch("change", input.value);
        });

        this.shadowRoot.querySelector("ui-icon-button")
            .addEventListener("click", () => {
                this.ui.events.dispatch("submit", input.value);
            });
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
                break

            case "value":
                this.setValue(newValue);
                break;

            case "placeholder":
                this.setPlaceholder(newValue);
                break;

            case "invalid":
                this.setInvalid(newValue);
                break;

            case "nosubmit":
                this.setNoSubmit(newValue);
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
     * @param {string | null} nosubmit
     */
    setNoSubmit(nosubmit) {
        /** @type {import("../ui-button").UIIconButton} */
        const submit = this.shadowRoot.querySelector(`[name="submit"]`);

        if (nosubmit === null) {
            submit.style.display = "none";
            return;
        }

        submit.style.display = null;
    }
}
