import svgChevronDown from "../../svg/smoothie-line-icons/chevron-down";

import { Events, globalStylesToShadowRoot, html } from "../utils";
import { UISelectOption } from "./ui-select-option";

/**
 * @typedef UISelect_Events
 * @type {{
 *  "change": UISelectOption;
 * }} UISelect_Events
 */

/**
 * HTML: `ui-select`
 *
 * Attributes:
 *  - __open__: *boolean*
 *
 * Slots:
 *  - __\*__ - from type `UISelectOption`
 */
export class UISelect extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-select")) {
            console.debug(`[ui] Register "ui-select" component`);
            customElements.define("ui-select", UISelect);
        }
    };

    static observedAttributes = ["open"];

    constructor() {
        super();

        this.open = false;

        this.ui = {
            root: this,

            /**
             *  @type {Events<UISelect_Events>}
             */
            events: new Events(),

            get open() {
                return this.root.open;
            },

            set open(state) {
                this.root.open = state;

                if (!state) {
                    this.root.removeAttribute("open");
                } else {
                    this.root.setAttribute("open", "");
                }

                this.root.style.setProperty(
                    "--items-length",
                    `${this.root.children.length || 1}`,
                );
            },

            /**
             * @returns {UISelectOption[]}
             */
            options() {
                // @ts-ignore
                return [...this.root.children].filter(
                    (child) => child instanceof UISelectOption,
                );
            },

            /**
             * @returns {UISelectOption | null}
             */
            selected() {
                try {
                    return (
                        this.options().find(
                            (/** @type {UISelectOption} */ option) =>
                                option.ui.selected,
                        ) || null
                    );
                } catch {
                    return null;
                }
            },
        };

        this.#renderUISelect();
    }

    #renderUISelect() {
        this.attachShadow({ mode: "open" });
        globalStylesToShadowRoot(this.shadowRoot);

        this.shadowRoot.innerHTML = html`
            <style>
                * {
                    box-sizing: border-box;
                }

                :host {
                    --ui-bg: "transparent";

                    position: relative !important;
                    display: block !important;

                    width: 100%;
                    height: calc(
                        1em * var(--ui-lineHeight) + var(--ui-spacing) * 2
                    );
                    transition: height 0.25s ease;

                    background-color: var(--ui-bg);
                    color: var(--ui-fg);

                    border: 1px solid var(--ui-borderColor);
                    border-radius: var(--ui-radius);

                    line-height: 1.15;

                    overflow: hidden;

                    font-size: 0.9rem;
                    font-family: var(--ui-fontFamily);
                    font-variation-settings: var(--ui-select-fontVariation);
                }

                .options {
                    cursor: pointer;
                    display: none;
                    display: flex;
                    flex-direction: column;
                    min-height: 100%;
                }

                .icon {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 2.5rem;
                    height: 100%;
                    color: var(--ui-primary);
                }

                ::slotted(ui-select-option) {
                    display: flex;
                }

                :host([open]) {
                    height: calc(
                        (1em * var(--ui-lineHeight) + var(--ui-spacing) * 2) *
                            var(--items-length)
                    );
                }

                :host([open]) .options {
                    display: block;
                }

                :host([open]) .icon {
                    display: none;
                }

                :host([open]) ::slotted(ui-select-option[selected]) {
                    background-color: var(--ui-primary);
                    color: var(--ui-primary-fg);
                }

                :host([open])
                    ::slotted(ui-select-option:not([selected]):hover) {
                    background-color: hsla(
                        var(--ui-fg-h),
                        var(--ui-fg-s),
                        var(--ui-fg-l),
                        0.1
                    );
                }

                :host(:not([open]))
                    .options:has(> ::slotted(ui-select-option[selected])) {
                    display: block;
                }

                :host(:not([open]))
                    ::slotted(ui-select-option:not([selected])) {
                    display: none;
                }
            </style>

            <div class="options">
                <div class="icon"><ui-svg>${svgChevronDown}</ui-svg></div>

                <slot></slot>
            </div>
        `;

        /**
         * @param {Event} ev
         */
        const onClick = (ev) => {
            /**
             * @param {MouseEvent | PointerEvent} ev
             */
            const onClickOption = async (ev) => {
                (ev.composedPath() || []).forEach((child) => {
                    if (child instanceof UISelectOption) {
                        [...this.querySelectorAll("ui-select-option")].forEach(
                            (c) => c.removeAttribute("selected"),
                        );

                        child.setAttribute("selected", "");
                        this.ui.events.dispatch("change", child);
                    }
                });
            };

            this.ui.open = !this.ui.open;
            if (this.ui.open) {
                ev.stopPropagation();
                this.addEventListener("click", onClickOption);
            } else {
                setTimeout(() =>
                    this.removeEventListener("click", onClickOption),
                );
            }
        };

        const options = this.shadowRoot.querySelector(".options");
        options.addEventListener("click", onClick);
    }

    connectedCallback() {}
    disconnectedCallback() {}

    /**
     * @param {string} n
     * @param {string | null} _oV
     * @param {string | null} nV
     */
    attributeChangedCallback(n, _oV, nV) {
        switch (n) {
            case "open":
                const state = nV !== null;
                if (state !== this.ui.open) {
                    this.ui.open = state;
                }
                break;
        }
    }
}

UISelect.register();
