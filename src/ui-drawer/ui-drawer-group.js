import { html } from "../js";

export class UIDrawerGroup extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-drawer-group")) {
            customElements.define("ui-drawer-group", UIDrawerGroup);
        }
    };

    static observedAttributes = ["title"];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // TODO: Fold and Unfold Group (optional)
        this.ui = {
            /** @private */
            root: this,

            get title() {
                return this.root.getAttribute("title");
            },

            set title(value) {
                if (!value) {
                    this.root.removeAttribute("title");
                    return;
                }

                this.root.setAttribute("title", value);
            },
        };

        this.shadowRender();
    }

    shadowRender() {
        this.shadowRoot.innerHTML = html`
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
    }

    connectedCallback() { }
    disconnectedCallback() { }

    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "title":
                this.setGroupTitle(newValue)
                break;
        }
    }

    /**
     * @param {string | null} title
     */
    setGroupTitle(title) {
        let item = this.shadowRoot.querySelector(
            `.ui-drawer-group-title`,
        );

        if (!title) {
            item.classList.remove("visible");
            return;
        }

        item.classList.add("visible");
        item.innerHTML = `
            <span
                style="
                    font-size: 1.5rem;
                    font-weight: 600;
                    font-variation-settings: var(--ui-heading-fontVariation);
                "
            >
                ${title}
            </span>
        `;
    }
}
