import { CleanUp, Events, html } from "../js";

/**
 * @typedef UIDrawerEvents
 * @type {{
 *  open: UIDrawer,
 *  close: UIDrawer,
 * }}
 */

const zIndex = 150;
const content = html`
    <style>
        * {
            box-sizing: border-box;
        }

        :host {
            display: block;

            position: absolute !important;
            z-index: ${zIndex};
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;

            overflow: hidden;

            transition: left 0s ease 0.5s;
        }

        :host([open]) {
            background-color: var(--ui-backdrop-bgColor);
            backdrop-filter: var(--ui-backdropFilter);

            left: 0;

            transition: none;
        }

        aside {
            position: absolute;
            z-index: ${zIndex};
            top: 0;
            left: -100%;
            width: 18em;
            max-width: 100%;
            height: 100%;

            overflow-x: hidden;
            overflow-y: auto;

            -ms-overflow-style: none;
            scrollbar-width: none;

            /*
            background-color: var(--ui-card-bgColor);
            color: var(--ui-card-color);
            */
            border-right: 1px solid var(--ui-card-borderColor);
            background-color: var(--ui-backdrop-bgColor);
            backdrop-filter: var(--ui-backdropFilter);

            transition: left 0.5s ease;
        }

        :host([open]) aside {
            left: 0;
        }
    </style>

    <aside>
        <slot></slot>
    </aside>
`;

export class UIDrawer extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-drawer")) {
            customElements.define("ui-drawer", UIDrawer);
        }
    };

    static observedAttributes = ["open"];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = content;

        this.cleanup = new CleanUp();
        this.ui = {
            /** @private */
            root: this,

            aside: this.shadowRoot.querySelector("aside"),

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
    }

    connectedCallback() {
        const onClick = (/** @type {MouseEvent} */ ev) => {
            ev.stopPropagation();
            this.ui.setOpen(false);
        };

        const onClickAside = (/** @type {MouseEvent} */ ev) => {
            ev.stopPropagation();
        };

        this.addEventListener("click", onClick);
        this.ui.aside.addEventListener("click", onClickAside);

        this.cleanup.add(() => {
            this.ui.aside.removeEventListener("click", onClickAside);
            this.removeEventListener("click", onClick);
        });
    }

    disconnectedCallback() {
        this.cleanup.run();
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
                    this.classList.add("open");
                    this.ui.events.dispatch("open", this);
                } else {
                    this.classList.remove("open");
                    this.ui.events.dispatch("close", this);
                }
                break;
        }
    }
}
