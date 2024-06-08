import { CleanUp } from "../js";

const template = document.createElement("template");
template.innerHTML = `
    <style>
        li {
            padding: var(--ui-spacing) calc(var(--ui-spacing) * 1.5);
            border: none;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
        }
    </style>

    <li>
        <slot></slot>
    </li>
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

export class UIDrawerGroupItem extends HTMLElement {

    static register = () => {
        if (!customElements.get("ui-drawer-group-item")) {
            customElements.define("ui-drawer-group-item", UIDrawerGroupItem);
        }
    };

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.cleanup = new CleanUp();
        this.ui = new UI(this);
    }

    connectedCallback() { }

    disconnectedCallback() {
        this.cleanup.run();
    }
}
