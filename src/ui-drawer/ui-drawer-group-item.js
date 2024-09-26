import { html } from "../utils";

/**
 * HTML: `ui-drawer-group-item`
 *
 * Slots:
 *  - __\*__
 */
export class UIDrawerGroupItem extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-drawer-group-item")) {
            customElements.define("ui-drawer-group-item", UIDrawerGroupItem);
        }
    };

    constructor() {
        super();
        this.ui = {};
        this.#renderUIDrawerGroupItem();
    }

    #renderUIDrawerGroupItem() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = html`
            <style>
                * {
                    box-sizing: border-box;
                }

                :host {
                    display: block;
                    width: 100%;
                }

                li {
                    padding: var(--ui-spacing) calc(var(--ui-spacing) * 1.5);
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    width: 100%;
                }

                ::slotted(*) {
                    width: 100%;
                }
            </style>

            <li>
                <slot></slot>
            </li>
        `;
    }

    connectedCallback() {}
    disconnectedCallback() {}
}
