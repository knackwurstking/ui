import { CleanUp } from "../js";

const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            padding: var(--ui-spacing) calc(var(--ui-spacing) * 1.5);
            border: none;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
        }
    </style>

    <slot></slot>
`;

class UI {
    /**
     * @param {UIDrawerGroupItem} root
     */
    constructor(root) {
        /**
         * @private
         */
        this.root = root

        this.outside = this.root.querySelector(".outside");
        this.aside = this.root.shadowRoot.querySelector("aside");
    }

    get open() {
        return this.root.hasAttribute("open");
    }

    set open(state) {
        if (state) {
            this.root.setAttribute("open", "");
        } else {
            this.root.removeAttribute("open");
        }
    }
}

export class UIDrawerGroupItem extends HTMLLIElement {

    static register = () => {
        if (!customElements.get("ui-drawer-group-item")) {
            customElements.define("ui-drawer-group-item", UIDrawerGroupItem);
        }
    };

    static observedAttributes = ["open"];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.cleanup = new CleanUp();
        this.ui = new UI(this);
    }

    connectedCallback() {
        this.ui.outside.addEventListener("click", (ev) => {
            ev.stopPropagation();
            this.ui.open = false;
        });

        this.ui.aside.addEventListener("click", (ev) => {
            ev.stopPropagation();
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
                    this.ui.outside.classList.add("open");
                } else {
                    this.ui.outside.classList.remove("open");
                }
                break;
        }
    }
}
