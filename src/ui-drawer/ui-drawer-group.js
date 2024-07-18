import { CleanUp, html, css } from "../js";

export class UIDrawerGroup extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-drawer-group")) {
            customElements.define("ui-drawer-group", UIDrawerGroup);
        }
    };

    static observedAttributes = ["title"];

    css = () => css`
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
    `;

    template = () => html`
        <ul>
            <ui-drawer-group-item class="ui-drawer-group-title">
            </ui-drawer-group-item>

            <slot></slot>
        </ul>
    `;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();

        // TODO: Fold and Unfold Group (optional)
        this.ui = {
            /** @private */
            root: this,

            cleanup: new CleanUp(),

            getTitle() {
                return this.root.getAttribute("title") || null;
            },

            /**
             * @param {string} value
             */
            setTitle(value) {
                let item = this.root.shadowRoot.querySelector(
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
        this.ui.cleanup.run();
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

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css().trim()}</style>
            ${this.template().trim()}
        `;
    }
}
