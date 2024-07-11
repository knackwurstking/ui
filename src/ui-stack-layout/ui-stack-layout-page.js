import { CleanUp, html } from "../js";

const innerHTML = html`
    <style>
        :host {
            display: block !important;
            position: absolute !important;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            animation: fade-in 0.5s;
            transition: opacity 0.5s ease;
        }

        :host(:last-child) {
            opacity: 1;
        }

        @keyframes fade-in {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
    </style>

    <slot></slot>
`;

export class UIStackLayoutPage extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-stack-layout-page")) {
            customElements.define("ui-stack-layout-page", UIStackLayoutPage);
        }
    };

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = innerHTML;

        this.ui = {
            /** @private */
            root: this,

            cleanup: new CleanUp(),

            getName() {
                return this.root.getAttribute("name");
            },

            /**
             * @param {string | null} value
             */
            setName(value) {
                if (value === null) {
                    this.root.removeAttribute("name");
                }

                this.root.setAttribute("name", value);
            },
        };
    }

    connectedCallback() {}
    disconnectedCallback() {
        this.ui.cleanup.run();
    }
}
