import { html } from "../js";

const content = html`
    <style>
        :host {
            display: none;
            align-items: center;

            padding: var(--ui-spacing);
            padding-right: 2.5rem;

            height: calc(1em * var(--ui-lineHeight) + var(--ui-spacing) * 2);

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

/**
 * Observed Attributes:
 *  - **value**    - [type: string]
 *  - **selected** - [type: flag]
 */
export class UISelectOption extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-select-option")) {
            customElements.define("ui-select-option", UISelectOption);
        }
    };

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = content;

        this.setAttribute("role", "button");

        this.ui = {
            /** @private */
            root: this,

            getValue() {
                return this.root.getAttribute("value");
            },

            /**
             * @param {string | null} value
             */
            setValue(value) {
                if (value === null) {
                    this.root.removeAttribute("value");
                    return;
                }

                this.root.setAttribute("value", value);
            },

            getSelected() {
                return this.root.hasAttribute("selected");
            },

            /**
             * @param {boolean} state
             */
            setSelected(state) {
                if (!state) {
                    this.root.removeAttribute("selected");
                    return;
                }

                this.root.setAttribute("selected", "");
            },
        };
    }
}
