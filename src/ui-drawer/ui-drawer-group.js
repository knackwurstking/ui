import { CleanUp } from "../js";
import { UIDrawerGroupItem } from "./ui-drawer-group-item";

const template = document.createElement("template");
template.innerHTML = `
    <style>
        ul {
            list-style: none;
            padding: var(--ui-spacing);
            overflow: hidden;
        }

        ul:not([title]) ui-drawer-group-item.title {
            display: none;
        }
    </style>

    <ul>
        <slot name="title"></slot>

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
        this.root = root

        this.outside = this.root.querySelector(".outside");
        this.aside = this.root.shadowRoot.querySelector("aside");
    }

    get title() {
        return this.root.getAttribute("title") || null;
    }

    set title(value) {
        if (!!value) {
            this.root.setAttribute("title", value);
        } else {
            this.root.removeAttribute("title");
        }
    }
}

export class UIDrawerGroup extends HTMLElement {

    static register = () => {
        UIDrawerGroupItem.register();

        if (!customElements.get("ui-drawer-group")) {
            customElements.define("ui-drawer-group", UIDrawerGroup);
        }
    };

    static observedAttributes = ["title"];

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
                    this.setTitle(newValue);
                } else {
                    this.removeTitle();
                }
                break;
        }
    }

    /**
     * @private
     * @param {string} value
     */
    setTitle(value) {
        let item = this.querySelector(`ui-drawer-group-item[slot="title"]`);
        if (!item) {
            item = new UIDrawerGroupItem();
            item.slot = "title";
        }

        item.innerHTML = `
            <h4>${value}</h4>
        `;
        this.appendChild(item);
    }

    /**
     * @private
     */
    removeTitle() {
        const title = this.querySelector(`span[slot="title"]`);
        if (!!title) {
            this.removeChild(title);
        }
    }
}
