import { css, html } from "../js";
import { CleanUp } from "../js/cleanup";

export class UISvg extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-svg")) {
            customElements.define("ui-svg", UISvg);
        }
    };

    shadowCSS = () => css`
        :host {
            width: 100%;
            height: 100%;
            color: inherit;
        }

        svg {
            width: 100%;
            height: 100%;
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
