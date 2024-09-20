import { html } from "../utils";

export class UIAlerts extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-alerts")) {
            customElements.define("ui-alerts", UIAlerts);
        }
    };

    constructor() {
        super();

        this.ui = {
            root: this,

            /**
             * @param {import("./ui-alert").UIAlert} alert
             */
            add(alert) {
                const container =
                    this.root.shadowRoot.querySelector(".alerts-container");

                container.append(alert);

                return () => this.remove(alert);
            },

            /**
             * @param {import("./ui-alert").UIAlert} alert
             */
            remove(alert) {
                const alertContainer = alert.parentElement;
                if (!alertContainer) return;
                if (!alertContainer.parentElement) return;
                alertContainer.parentElement.removeChild(alertContainer);
            },
        };

        this.shadowRender();
    }

    shadowRender() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = html`
            <style>
                :host {
                    display: block;
                    position: fixed !important;
                    z-index: 999;

                    background: none !important;

                    padding: var(--ui-spacing);

                    overflow: auto;
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                    scroll-behavior: smooth;
                }

                :host(::-webkit-scrollbar) {
                    display: none;
                }

                ui-flex-grid {
                    align-items: flex-end;
                }
            </style>

            <style class="position">
                :host {
                    right: 0;
                    bottom: 0;
                }
            </style>

            <style class="size">
                :host {
                    width: fit-content;
                    max-width: 100%;
                    height: fit-content;
                    max-height: 100%;
                }
            </style>

            <ui-flex-grid class="alerts-container" gap="0.25rem">
                <!-- TODO: Just debugging here... -->
                <ui-alert message="Test Alert"></ui-alert>
                <ui-alert message="Test Alert" variant="info"></ui-alert>
                <ui-alert message="Test Alert" variant="error"></ui-alert>
            </ui-flex-grid>
        `;
    }

    connectedCallback() {}
    disconnectedCallback() {}
}
