import { CleanUp, html, css } from "../js";

// TODO: Continue here...
export class UIDrawerGroupItem extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-drawer-group-item")) {
            customElements.define("ui-drawer-group-item", UIDrawerGroupItem);
        }
    };

    shadowCSS = () => css`
        * {
            box-sizing: border-box;
        }

        li {
            padding: var(--ui-spacing) calc(var(--ui-spacing) * 1.5);
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
        }

        ::slotted(*) {
            width: 100%;
        }
    `;

    shadowTemplate = () => html`
        <li>
            <slot></slot>
        </li>
    `;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.ui = {
            cleanup: new CleanUp(),
        };

        this.shadowRender();
    }

    connectedCallback() { }

    disconnectedCallback() {
        this.ui.cleanup.run();
    }

    shadowRender() {
        this.shadowRoot.innerHTML = `
            <style>${this.shadowCSS().trim()}</style>
            ${this.shadowTemplate().trim()}
        `;
    }
}
