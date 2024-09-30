import { css, globalStylesToShadowRoot, html } from "../utils";

/**
 * HTML: `ui-flex-grid-item`
 *
 * Attributes:
 *  - __flex__: *string* [default: 1]
 *
 * Slots:
 *  - __\*__
 */
export class UIFlexGridItem extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-flex-grid-item")) {
            console.debug(`[ui] Register "ui-flex-grid-item" component`);
            customElements.define("ui-flex-grid-item", UIFlexGridItem);
        }
    };

    static observedAttributes = ["flex"];

    constructor() {
        super();

        /** @private */
        this.flex = "1";

        this.ui = {
            root: this,

            get flex() {
                return this.root.flex;
            },

            set flex(value) {
                this.root.flex = value || "1";
                const style =
                    this.root.shadowRoot.querySelector(`style[name="flex"]`);
                style.textContent = css`
                    :host {
                        flex: ${this.root.flex};
                    }
                `;
            },
        };

        this.#renderUIFlexGridItem();
    }

    #renderUIFlexGridItem() {
        this.attachShadow({ mode: "open" });
        globalStylesToShadowRoot(this.shadowRoot);

        this.shadowRoot.innerHTML = html`
            <style>
                * {
                    box-sizing: border-box;
                }

                :host {
                    display: content;
                }

                ::slotted(*) {
                    flex-grow: 1;
                }
            </style>

            <style name="flex">
                :host {
                    flex: 1;
                }
            </style>

            <slot></slot>
        `;
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
            case "flex":
                this.ui.flex = newValue;
                break;
        }
    }
}

UIFlexGridItem.register();
