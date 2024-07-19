import { CleanUp, css, html } from "../js";

export class UISecondary extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-secondary")) {
            customElements.define("ui-secondary", UISecondary);
        }
    };

    css = () => css`
        :host {
            font-size: 0.9rem;
            font-family: var(--ui-fontFamily);
            font-variation-settings: var(--ui-text-secondary-fontVariation);
        }
    `;

    template = () => html`<slot></slot>`;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.ui = {
            cleanup: new CleanUp(),
        };

        this.render();
    }

    connectedCallback() {}
    disconnectedCallback() {
        this.ui.cleanup.run();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css().trim()}</style>
            ${this.template().trim()}
        `;
    }
}
