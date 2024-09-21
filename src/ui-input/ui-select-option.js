import { html } from "../utils";

/**
 * HTML: `ui-select-option`
 *
 * Attributes:
 *  - __value__: *string*
 *  - __selected__: *boolean*
 *
 * Slots:
 *  - __\*__
 */
export class UISelectOption extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-select-option")) {
            customElements.define("ui-select-option", UISelectOption);
        }
    };

    constructor() {
        super();

        this.ui = {
            root: this,

            get value() {
                return this.root.getAttribute("value");
            },

            set value(value) {
                if (!value) {
                    this.root.removeAttribute("value");
                    return;
                }

                this.root.setAttribute("value", value);
            },

            get selected() {
                return this.root.hasAttribute("selected");
            },

            set selected(value) {
                if (!value) {
                    this.root.removeAttribute("selected");
                    return;
                }

                this.root.setAttribute("selected", "");
            },
        };

        this.#renderUISelectOption();
    }

    #renderUISelectOption() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = html`
            <style>
                :host {
                    display: none;
                    align-items: center;

                    padding: var(--ui-spacing);
                    padding-right: 2.5rem;

                    height: calc(
                        1em * var(--ui-lineHeight) + var(--ui-spacing) * 2
                    );

                    white-space: nowrap;
                    text-overflow: ellipsis;

                    transition:
                        background-color 0.25s linear,
                        color 0.25s linear;

                    overflow: hidden;
                }
            </style>

            <slot></slot>
        `;
    }

    connectedCallback() {
        this.setAttribute("role", "button");
    }

    disconnectedCallback() {}
}
