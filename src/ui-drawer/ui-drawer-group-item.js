import { CleanUp, html } from "../js";

const content = html`
    <style>
        * {
            box-sizing: border-box;
        }

        li {
            padding: var(--ui-spacing) calc(var(--ui-spacing) * 1.5);
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
        }

        ::slotted(*) {
            width: 100%;
        }
    </style>

    <li>
        <slot></slot>
    </li>
`;

export class UIDrawerGroupItem extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-drawer-group-item")) {
            customElements.define("ui-drawer-group-item", UIDrawerGroupItem);
        }
    };

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = content;

        this.cleanup = new CleanUp();
        this.ui = {
            /** @private */
            root: this,

            /**
             * @returns {boolean}
             */
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

    connectedCallback() { }

    disconnectedCallback() {
        this.cleanup.run();
    }
}
