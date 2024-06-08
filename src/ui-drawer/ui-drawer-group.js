import { CleanUp } from "../js";
import { UIDrawerGroupItem } from "./ui-drawer-group-item";

const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host(:not([title])) ui-drawer-group-item.title {
            display: none;
        }
    </style>

    <ui-drawer-group-item class="title">
        <h3>
            <slot name="title"></slot>
        </h3>
    </ui-drawer-group-item>

    <slot></slot>
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

export class UIDrawerGroup extends HTMLUListElement {

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
        let span = this.querySelector(`span[slot="title"]`);
        if (!span) {
            const span = document.createElement("span");
            span.slot = "title";
        }

        span.innerHTML = value;
        this.appendChild(span);
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
