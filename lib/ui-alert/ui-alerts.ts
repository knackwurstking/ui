import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { UIAlert } from "./ui-alert";
import { CleanUpFunction } from "../global";
import { UIFlexGrid } from "../ui-flex-grid";

@customElement("ui-alerts")
export class UIAlerts extends LitElement {
    static get styles() {
        return css`
            :host {
                display: block;

                z-index: 999;
                position: fixed !important;
                right: 0;
                bottom: 0;
                width: fit-content;
                max-width: 100%;
                height: fit-content;
                max-height: 100%;

                background: transparent;

                overflow: auto;
            }

            ui-flex-grid {
                padding: 0;
            }

            ui-flex-grid:has(> *) {
                padding: var(--ui-spacing);
            }
        `;
    }

    protected render() {
        return html`
            <ui-flex-grid class="container" gap="0.25rem">
                <slot></slot>
            </ui-flex-grid>
        `;
    }

    addAlert(alert: UIAlert): CleanUpFunction {
        const container =
            this.shadowRoot?.querySelector<UIFlexGrid>(".container");

        if (!!container) container.append(alert);

        return () => this.removeAlert(alert);
    }

    removeAlert(alert: UIAlert) {
        const container =
            this.shadowRoot?.querySelector<UIFlexGrid>(".container");

        if (!!container) container.removeChild(alert);
    }
}
