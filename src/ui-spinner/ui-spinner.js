import { CleanUp, html, css } from "../js";

export class UISpinner extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-spinner")) {
            customElements.define("ui-spinner", UISpinner);
        }
    };

    shadowCSS = () => css`
        :host {
            position: absolute;
            width: 100%;
            height: 100%;
        }

        .background {
            z-index: 999;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: var(--ui-backdrop-bgColor);
            -webkit-backdrop-filter: var(--ui-backdropFilter);
            backdrop-filter: var(--ui-backdropFilter);
        }

        .spinner {
            z-index: 1000;
            content: "";
            box-sizing: border-box;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 2.5rem;
            height: 2.5rem;
            margin-top: -1.25rem;
            margin-left: -1.25rem;
            border-radius: 50%;
            border: 2px solid var(--ui-borderColor);
            border-top-color: var(--ui-primary-bgColor);
            animation: spinner 0.6s linear infinite;
        }

        @keyframes spinner {
            to {
                transform: rotate(360deg);
            }
        }
    `;

    shadowTemplate = () => html`
        <div class="background"></div>
        <div class="spinner"></div>
    `;

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
            <style>${this.shadowCSS().trim()}</style>
            ${this.shadowTemplate().trim()}
        `;
    }
}
