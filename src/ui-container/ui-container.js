import { CleanUp, html } from "../js";

const content = html`
    <style>
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
    </style>

    <slot></slot>
`;

export class UIContainer extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-container")) {
            customElements.define("ui-container", UIContainer);
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
