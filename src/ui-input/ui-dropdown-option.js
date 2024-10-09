import { globalStylesToShadowRoot, html } from "../utils";

export class UIDropdownOption extends HTMLLIElement {
    static register = () => {
        if (customElements.get("ui-dropdown-option")) {
            console.debug(`[ui] Register "ui-dropdown-option" component`);
            customElements.define("ui-dropdown-option", UIDropdownOption);
        }
    };

    constructor() {
        super();

        this.ui = {
            root: this,

            get value() {
                return this.root.getAttribute("value");
            },

            set value(value) {
                this.root.setAttribute("value", value);
            },
        };

        this.#renderUIDropdownOption();
    }

    #renderUIDropdownOption() {
        this.attachShadow({ mode: "open" });
        globalStylesToShadowRoot(this.shadowRoot);

        this.shadowRoot.innerHTML = html` <a href="#"><slot></slot></a> `;
    }
}

UIDropdownOption.register();
