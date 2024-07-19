import { CleanUp, html, css } from "../js";

export class UIPrimary extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-primary")) {
            customElements.define("ui-primary", UIPrimary);
        }
    };

    shadowCSS = () => css`
        :host {
            font-size: 1.1rem;
            font-family: var(--ui-fontFamily);
            font-variation-settings: var(--ui-text-primary-fontVariation);
        }
    `;

    shadowTemplate = () => html`<slot></slot>`;

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
