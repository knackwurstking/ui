import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("ui-app-bar-item")
export class UIAppBarItem extends LitElement {
    static get styles() {
        return css``; // TODO: ...
    }

    protected render() {
        return html`<slot></slot>`;
    }
}

/**
 * HTML: `ui-app-bar-item`
 *
 * Slots:
 *  - __\*__
 *
 * @template {HTMLElement} T
 */
export class _UIAppBarItem extends HTMLElement {
    constructor() {
        super();

        this.ui = {
            root: this,

            /**
             * @returns {T}
             */
            get child() {
                return this.root.querySelector("*");
            },

            /**
             * @param {string | null} [value]
             */
            show(value = null) {
                this.root.style.display = value;
            },

            hide() {
                this.root.style.display = "none";
            },
        };

        this.#renderUIAppBarItem();
    }

    #renderUIAppBarItem() {
        this.attachShadow({ mode: "open" });
        globalStylesToShadowRoot(this.shadowRoot);

        this.shadowRoot.innerHTML = html`
            <style>
                * {
                    box-sizing: border-box;
                }

                :host {
                    display: content;
                    flex: 1;
                }

                ::slotted(*) {
                    flex-grow: 1;
                }
            </style>
        `;
    }
}
