// TODO: Convert to typescript
import { globalStylesToShadowRoot, html } from "../utils";

/**
 * HTML: `ui-app-bar`
 *
 * Attributes:
 *  - __position__: *"top" | "bottom"*
 *
 * Slots:
 *  - __left__
 *  - __center__
 *  - __right__
 */
export class UIAppBar extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-app-bar")) {
            console.debug(`[ui] Register "ui-app-bar" component`);
            customElements.define("ui-app-bar", UIAppBar);
        }
    };

    constructor() {
        super();

        this.ui = {
            root: this,

            get leftSlot() {
                return [...this.root.querySelectorAll(`[slot="left"]`)];
            },

            get centerSlot() {
                return [...this.root.querySelectorAll(`[slot="center"]`)];
            },

            get rightSlot() {
                return [...this.root.querySelectorAll(`[slot="right"]`)];
            },

            get position() {
                // @ts-expect-error
                return this.root.getAttribute("position");
            },

            /**
             * @param {"top" | "bottom"} value
             */
            set position(value) {
                if (!value) {
                    this.root.removeAttribute("position");
                    return;
                }

                this.root.setAttribute("position", value);
            },
        };

        this.#renderUIAppBar();
    }

    #renderUIAppBar() {
        this.classList.add("has-backdrop-blur");

        this.attachShadow({ mode: "open" });
        globalStylesToShadowRoot(this.shadowRoot);

        this.shadowRoot.innerHTML = html`
            <style>
                * {
                    box-sizing: border-box;
                }

                :host {
                    display: block;
                    width: 100%;
                    overflow: hidden;
                    padding: calc(var(--ui-spacing) / 2);
                }

                :host([position="top"]),
                :host([position="bottom"]) {
                    z-index: 100;
                    position: absolute !important;
                    left: 0;
                    right: 0;
                    height: var(--ui-app-bar-height);
                }

                :host([position="top"]) {
                    top: 0;
                    border-bottom: 1px solid var(--ui-borderColor);
                }

                :host([position="bottom"]) {
                    bottom: 0;
                    border-top: 1px solid var(--ui-borderColor);
                }

                :host > ui-flex-grid-row {
                    width: 100%;
                    height: 100%;
                    align-items: center;
                    justify-content: space-between;
                }

                :host > ui-flex-grid-row > * {
                    height: 100%;
                }

                :host > ui-flex-grid-row > *:nth-child(1),
                :host > ui-flex-grid-row > *:nth-child(3) {
                    width: fit-content;
                }

                :host > ui-flex-grid-row > [slot="left"] {
                    margin-left: 0 !important;
                }

                :host > ui-flex-grid-row > [slot="center"] {
                    width: 100%;
                }

                :host > ui-flex-grid-row > [slot="right"] {
                    margin-right: 0 !important;
                    justify-content: flex-end;
                }
            </style>

            <ui-flex-grid-row gap="0.25rem">
                <ui-flex-grid-row gap="0.25rem" align="center">
                    <slot name="left"></slot>
                </ui-flex-grid-row>

                <ui-flex-grid-row
                    gap="0.25rem"
                    style="overflow: hidden;"
                    align="center"
                >
                    <slot name="center"></slot>
                </ui-flex-grid-row>

                <ui-flex-grid-row gap="0.25rem" align="center">
                    <slot name="right"></slot>
                </ui-flex-grid-row>
            </ui-flex-grid-row>
        `;
    }

    connectedCallback() {}
    disconnectedCallback() {}
}

UIAppBar.register();
