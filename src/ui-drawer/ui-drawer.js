import { CleanUp, Events, html, css } from "../js";

/**
 * @typedef UIDrawerEvents
 * @type {{
 *  open: UIDrawer,
 *  close: UIDrawer,
 * }}
 */

export class UIDrawer extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-drawer")) {
            customElements.define("ui-drawer", UIDrawer);
        }
    };

    static observedAttributes = ["open"];

    shadowCSS = () => {
        return css`
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
                background-color: var(--ui-backdrop-bgColor);
                -webkit-backdrop-filter: var(--ui-backdropFilter);
                backdrop-filter: var(--ui-backdropFilter);

                left: 0;

                transition: none;
            }

            aside {
                position: absolute;
                z-index: 150;
                top: 0;
                left: -100%;
                width: 20rem; /* TODO: Get drawer width from attr (render) */
                max-width: 100%;
                height: 100%;

                overflow-x: hidden;
                overflow-y: auto;
                scroll-behavior: smooth;

                -ms-overflow-style: none;
                scrollbar-width: none;

                background-color: var(--ui-card-bgColor);
                color: var(--ui-card-color);

                /*
                background-color: var(--ui-backdrop-bgColor);
                -webkit-backdrop-filter: var(--ui-backdropFilter);
                backdrop-filter: var(--ui-backdropFilter);
                */

                border-right: 1px solid var(--ui-card-borderColor);

                transition: left 0.5s ease;
            }

            aside::-webkit-scrollbar {
                display: none;
            }

            :host([open]) aside {
                left: 0;
            }
        `;
    };

    shadowTemplate = () => html`
        <aside>
            <slot></slot>
        </aside>
    `;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.ui = {
            /** @private */
            root: this,

            cleanup: new CleanUp(),

            /**
             * @type {Events<UIDrawerEvents>}
             */
            events: new Events(),

            getOpen() {
                return this.root.hasAttribute("open");
            },

            /**
             * @param {boolean} state
             */
            setOpen(state) {
                if (state) {
                    this.root.setAttribute("open", "");
                } else {
                    this.root.removeAttribute("open");
                }
            },
        };

        this.shadowRender();
    }

    disconnectedCallback() {
        this.ui.cleanup.run();
    }

    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "open":
                if (newValue !== null) {
                    this.ui.events.dispatch("open", this);
                } else {
                    this.ui.events.dispatch("close", this);
                }
                break;
        }
    }

    shadowRender() {
        this.shadowRoot.innerHTML = `
            <style>${this.shadowCSS().trim()}</style>
            ${this.shadowTemplate().trim()}
        `;

        const aside = this.shadowRoot.querySelector("aside");

        this.addEventListener("click", () => {
            this.ui.setOpen(false);
        })

        aside.addEventListener("click", (ev) => {
            ev.stopPropagation();
        });
    }
}
