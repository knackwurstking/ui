// TODO: Convert to typescript
import svgSearch from "../svg/smoothie-line-icons/search";

import { Events, globalStylesToShadowRoot, html } from "../utils";
import { UISecondary } from "../ui-text";

/**
 * @typedef UISearch_Events
 * @type {{
 *  input: string;
 *  storage: string;
 *  submit: string;
 * }}
 */

/**
 * HTML: `ui-search`
 *
 * Attributes:
 *  - __title__: *string*
 *  - __value__: *string*
 *  - __placeholder__: *string*
 *  - __invalid__: *boolean*
 *  - __nosubmit__: *boolean*
 *  - __storage__: *boolean*
 *  - __storageprefix__: *string*
 *  - __storagekey__: *string*
 *
 * Slots:
 *  - __title__
 *
 * @template {UISearch_Events} [E=UISearch_Events]
 */
export class UISearch extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-search")) {
            console.debug(`[ui] Register "ui-search" component`);
            customElements.define("ui-search", UISearch);
        }
    };

    static observedAttributes = [
        "title",
        "value",
        "placeholder",
        "invalid",
        "nosubmit",
        "storagekey",
    ];

    constructor() {
        super();

        this.storagekey = "";

        this.ui = {
            root: this,

            /** @type {Events<E>} */
            events: new Events(),

            /** @type {HTMLInputElement | null} */
            input: null,

            /** @type {import("../ui-button").UIIconButton} */
            submit: this.querySelector(`[name="submit"]`),

            get title() {
                return this.root.querySelector(`[slot="title"]`).innerHTML;
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
                return this.input.value;
            },

            set value(value) {
                this.input.value = value;
            },

            get placeholder() {
                return this.input.placeholder;
            },

            set placeholder(value) {
                this.input.placeholder = value || "";
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
                return this.submit.style.display === "none";
            },

            set nosubmit(state) {
                if (!state) {
                    this.submit.style.display = null;
                    return;
                }

                this.submit.style.display = "none";
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
                return this.root.storagekey;
            },

            set storagekey(value) {
                this.root.storagekey = value;

                if (!this.storage) return;

                this.value =
                    localStorage.getItem(
                        this.storageprefix + this.root.storagekey,
                    ) || "";

                this.events.dispatch("storage", this.value);
            },

            /**
             * @param {FocusOptions | null} [options]
             */
            focus(options = null) {
                this.root.shadowRoot.querySelector("input").focus(options);
            },

            blur() {
                this.root.shadowRoot.querySelector("input").blur();
            },
        };

        this.#renderUISearch();
    }

    #renderUISearch() {
        this.attachShadow({ mode: "open" });
        globalStylesToShadowRoot(this.shadowRoot);

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

                input {
                    display: block;

                    width: 100%;

                    margin: 0;
                    padding: var(--ui-spacing) calc(var(--ui-spacing) * 2);

                    accent-color: var(--ui-primary);
                    background-color: transparent;

                    outline: none;
                    border: none;
                    border-radius: inherit;

                    font-size: 0.9rem;
                    font-family: var(--ui-fontFamily);
                    font-variation-settings: var(--ui-input-fontVariation);
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
                }

                .container:has(input:focus) {
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

                ui-icon-button {
                    position: absolute;
                    top: 0;
                    right: 0;
                    height: 100%;

                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }
            </style>

            <div class="container has-backdrop-blur">
                <slot name="title"></slot>
                <input type="search" />
                <ui-icon-button name="submit" ghost
                    >${svgSearch}</ui-icon-button
                >
            </div>
        `;

        /** @type {import("../ui-button").UIIconButton} */
        this.ui.submit = this.shadowRoot.querySelector(`[name="submit"]`);
        this.ui.input = this.shadowRoot.querySelector("input");
        this.ui.input.type = "search";

        this.ui.input.addEventListener("keydown", async (ev) => {
            if (this.ui.nosubmit) return;

            if (ev.key === "Enter") {
                this.ui.submit.click();
            }
        });

        // @ts-ignore
        /** @type {NodeJS.Timeout | null} */
        let timeout = null;
        this.ui.input.addEventListener("input", async () => {
            if (this.ui.storage) {
                if (timeout !== null) {
                    clearTimeout(timeout);
                }

                timeout = setTimeout(() => {
                    localStorage.setItem(
                        this.ui.storageprefix + this.ui.storagekey,
                        this.ui.input.value,
                    );
                    timeout = null;
                }, 250);
            }

            this.ui.events.dispatch("input", this.ui.input.value);
        });

        this.shadowRoot
            .querySelector("ui-icon-button")
            .addEventListener("click", () => {
                this.ui.events.dispatch("submit", this.ui.input.value);
            });
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
                this.ui.input.ariaInvalid = newValue !== null ? "" : null;
                break;

            case "nosubmit":
                this.ui.nosubmit = newValue !== null;
                break;

            case "storagekey":
                this.ui.storagekey = newValue;
                break;
        }
    }
}

UISearch.register();
