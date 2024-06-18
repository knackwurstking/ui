import { CleanUp, html } from "../js";
import { UIPrimary } from "../ui-text";
import { UIDrawerGroupItem } from "./ui-drawer-group-item";

const content = html`
    <style>
        * {
            box-sizing: border-box;
        }

        ul {
            list-style: none;
            padding: var(--ui-spacing);
            overflow: hidden;
        }

        ui-drawer-group-item:not(.visible) {
            display: none;
        }
    </style>

    <ul>
        <ui-drawer-group-item class="ui-drawer-group-title">
        </ui-drawer-group-item>

        <slot></slot>
    </ul>
`;

class UI {
    /**
     * @param {UIDrawerGroup} root
     */
    constructor(root) {
        /**
         * @private
         */
        this.root = root;
    }
}

export class UIDrawerGroup extends HTMLElement {
    static register = () => {
        UIDrawerGroupItem.register();
        UIPrimary.register();

        if (!customElements.get("ui-drawer-group")) {
            customElements.define("ui-drawer-group", UIDrawerGroup);
        }
    };

    static observedAttributes = ["title"];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = content;

        this.cleanup = new CleanUp();
        this.ui = {
            getTitle: () => {
                return this.getAttribute("title") || null;
            },

            /**
             * @param {string} value
             */
            setTitle: (value) => {
                let item = this.shadowRoot.querySelector(
                    `.ui-drawer-group-title`,
                );
                item.classList.add("visible");
                item.innerHTML = `
                    <span
                        style="
                            font-size: 1.5rem;
                            font-weight: 600;
                            font-variation-settings: var(--ui-heading-fontVariation);
                        "
                    >
                        ${value}
                    </span>
                `;
            },

            removeTitle() {
                const item = this.root.shadowRoot.querySelector(
                    `.ui-drawer-group-title`,
                );
                item.classList.remove("visible");
            },
        };
    }

    connectedCallback() {}
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
            case "title":
                if (newValue === "") {
                    this.removeAttribute("title");
                } else if (newValue !== null) {
                    this.ui.setTitle(newValue);
                } else {
                    this.ui.removeTitle();
                }
                break;
        }
    }
}
