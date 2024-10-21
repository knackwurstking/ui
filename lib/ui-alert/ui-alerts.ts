import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { CleanUpFunction } from "../global";
import { UIFlexGrid } from "../ui-flex-grid";
import { UIAlert } from "./ui-alert";

/**
 * **Tag**: `ui-alerts`
 *
 * **Slots**:
 *  - "": Takes `ui-alert` components
 */
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

                border-radius: var(--ui-radius);

                overflow: auto;

                /* Disable touch actions and pointer events */

                pointer-events: none;

                -ms-touch-action: none;
                touch-action: none;
            }

            ui-flex-grid {
                padding: var(--ui-spacing);
            }

            ::slotted(*) {
                pointer-events: auto;

                -ms-touch-action: auto;
                touch-action: auto;
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

    public addAlert(alert: UIAlert): CleanUpFunction {
        const container =
            this.shadowRoot?.querySelector<UIFlexGrid>(".container");

        if (!!container) container.append(alert);

        return () => this.removeAlert(alert);
    }

    public removeAlert(alert: UIAlert) {
        const container =
            this.shadowRoot?.querySelector<UIFlexGrid>(".container");

        if (!!container) container.removeChild(alert);
    }
}
