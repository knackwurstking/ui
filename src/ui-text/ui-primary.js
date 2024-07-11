import { CleanUp, html } from "../js";

const content = html`
    <style>
        :host {
            font-size: 1.1rem;
            font-family: var(--ui-fontFamily);
            font-variation-settings: var(--ui-text-primary-fontVariation);
        }
    </style>

    <slot></slot>
`;

export class UIPrimary extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-primary")) {
            customElements.define("ui-primary", UIPrimary);
        }
    };

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = content;

        this.ui = {
            cleanup: new CleanUp(),
        };
    }

    connectedCallback() {}
    disconnectedCallback() {
        this.ui.cleanup.run();
    }
}
