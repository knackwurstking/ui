import { globalStylesToShadowRoot, html } from "../utils";

export class UIDropdown extends HTMLDetailsElement {
    static register = () => {
        if (customElements.get("ui-dropdown")) {
            console.debug(`[ui] Register "ui-dropdown" component`);
            customElements.define("ui-dropdown", UIDropdown);
        }
    };

    static observedAttributes = ["title"];

    constructor() {
        super();

        this.ui = {
            root: this,

            get title() {
                return this.root.shadowRoot.querySelector(`summary`).innerText;
            },

            set title(value) {
                this.root.shadowRoot.querySelector(`summary`).innerText =
                    value || "";
            },

            options() {
                return this.root.shadowRoot.querySelectorAll(
                    `[slot="options"]`,
                );
            },
        };

        this.#renderUIDropdown();
    }

    #renderUIDropdown() {
        this.attachShadow({ mode: "open" });
        globalStylesToShadowRoot(this.shadowRoot);

        this.shadowRoot.innerHTML = html`
            <style></style>

            <summary></summary>
            <ul>
                <slot name="options"></slot>
            </ul>
        `;
    }

    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "title":
                this.ui.title = newValue;
                break;
        }
    }
}
UIDropdown.register();
