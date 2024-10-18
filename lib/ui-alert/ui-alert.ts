import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

export type UIAlertVariant = "info" | "warning" | "error";

/**
 * **Tag**: ui-alert
 *
 * **Attributes**:
 *  - variant: `"info" | "warning" | "error"`
 *  - message: `string`
 */
@customElement("ui-alert")
export class UIAlert extends LitElement {
    @property({ type: String, attribute: "variant", reflect: true })
    variant: UIAlertVariant = "info";

    @property({ type: String, attribute: "message" })
    message: string = "";

    static get styles() {
        return css`
            :host {
                position: relative;

                flex: 1;
                display: block;

                border-radius: var(--ui-radius);
                border: 1px solid hsl(var(--ui-hsl-borderColor));

                padding: var(--ui-spacing);

                width: 28rem;
                max-width: 100%;

                cursor: pointer;
            }

            :host([variant="info"]) {
                background-color: hsl(var(--ui-hsl-info));
                color: hsl(var(--ui-hsl-info-text));
            }

            :host([variant="warning"]) {
                background-color: hsl(48, 100%, 50%);
                background-color: hsl(var(--ui-hsl-warning));
                color: hsl(var(--ui-hsl-warning-text));
            }

            :host([variant="error"]) {
                background-color: hsl(var(--ui-hsl-error));
                color: hsl(var(--ui-hsl-error-text));
            }

            ui-text {
                flex-grow: 1;
            }
        `;
    }

    protected render() {
        return html`
            <ui-text style="font-size: 0.9rem;">${this.message}</ui-text>
        `;
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);
        this.addEventListener("click", () => {
            if (!this.parentElement) return;
            this.parentElement.removeChild(this);
        });
    }
}
