import { CleanUp } from "../js";
import { UIPrimary, UISecondary } from "../ui-text";
import { UIDrawerGroupItem } from "./ui-drawer-group-item";

const template = document.createElement("template");
template.innerHTML = `
    <style>
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

    /**
     * @param {string} value
     */
    setTitle(value) {
        let item = this.root.shadowRoot.querySelector(`.ui-drawer-group-title`);
        item.classList.add("visible");
        item.innerHTML = `
            <h3>${value}</h3>
        `;
    }

    removeTitle() {
        const item = this.root.shadowRoot.querySelector(`.ui-drawer-group-title`);
        item.classList.remove("visible");
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
                    this.ui.setTitle(newValue);
                } else {
                    this.ui.removeTitle();
                }
                break;
        }
    }
}
