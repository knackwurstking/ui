import { Events, globalStylesToShadowRoot, html } from "../utils";

/**
 * @typedef UIDrawer_Events
 * @type {{
 *  open: null,
 *  close: null,
 * }}
 */

/**
 * HTML: `ui-drawer`
 *
 * Attributes:
 *  - __open__: *boolean*
 *
 * Slots:
 *  - __\*__
 */
export class UIDrawer extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-drawer")) {
            customElements.define("ui-drawer", UIDrawer);
        }
    };

    constructor() {
        super();

        this.ui = {
            root: this,

            /**
             * @type {Events<UIDrawer_Events>}
             */
            events: new Events(),

            get open() {
                return this.root.hasAttribute("open");
            },

            set open(state) {
                if (!state) {
                    this.root.removeAttribute("open");
                    this.events.dispatch("close", null);
                    return;
                }

                history.pushState(null, "ui-drawer", location.href);
                this.root.setAttribute("open", "");
                this.events.dispatch("open", null);
            },
        };

        this.#renderUIDrawer();
    }

    #renderUIDrawer() {
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

                    position: absolute !important;
                    z-index: 150;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;

                    overflow: hidden;

                    transition: left 0s ease 0.5s;
                }

                :host([open]) {
                    left: 0;
                    transition: none;
                }

                aside {
                    position: absolute;
                    z-index: 150;
                    top: 0;
                    left: -100%;
                    width: var(--ui-drawer-width, fit-content);
                    max-width: calc(100% - 2.5rem);
                    height: 100%;

                    overflow-x: hidden;
                    overflow-y: auto;

                    border-right: 1px solid var(--ui-card-borderColor);

                    transition: left 0.5s ease;
                }

                :host([open]) aside {
                    left: 0;
                }
            </style>

            <aside class="has-backdrop-blur no-scrollbar">
                <slot></slot>
            </aside>
        `;

        this.shadowRoot
            .querySelector("aside")
            .addEventListener("click", (ev) => ev.stopPropagation());

        this.addEventListener("click", () => (this.ui.open = false));
    }

    connectedCallback() {
        this.setAttribute("role", "button");
    }

    disconnectedCallback() {}
}
