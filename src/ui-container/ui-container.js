import { CleanUp, html, css } from "../js";

export class UIContainer extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-container")) {
            customElements.define("ui-container", UIContainer);
        }
    };

    shadowCSS = () => css`
        * {
            box-sizing: border-box;
        }

        :host {
            display: block;
            width: 100%;
            max-width: 65rem;
            margin: 0 auto !important;
            padding: var(--ui-spacing);
        }
    `;

    shadowTemplate = () => html` <slot></slot> `;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.ui = {
            cleanup: new CleanUp(),
        };

        this.shadowRender();
    }

    connectedCallback() {}
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
