import { CleanUp, html } from "../js";

const content = html`
    <style>
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
    </style>

    <div class="background"></div>
    <div class="spinner"></div>
`;

export class UISpinner extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-spinner")) {
            customElements.define("ui-spinner", UISpinner);
        }
    };

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = content;

        this.cleanup = new CleanUp();
        this.ui = {};
    }

    connectedCallback() { }
    disconnectedCallback() {
        this.cleanup.run();
    }
}
