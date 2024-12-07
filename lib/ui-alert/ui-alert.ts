import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

export type UIAlertVariant = "info" | "warning" | "error";

/**
 * @element ui-alert
 */
@customElement("ui-alert")
class UIAlert extends LitElement {
    @property({ type: String, attribute: "variant", reflect: true })
    variant: UIAlertVariant = "info";

    @property({ type: String, attribute: "message" })
    message: string = "";

    role = "button";

    static get styles() {
        return css`
            :host {
                position: relative;

                flex: 1;
                display: block;

                border-radius: var(--ui-radius);
                border: 1px solid var(--ui-borderColor);

                padding: var(--ui-spacing);

                width: 28rem;
                max-width: 100%;

                cursor: pointer;
            }

            :host([variant="info"]) {
                background-color: var(--ui-info);
                color: var(--ui-info-text));
            }

            :host([variant="warning"]) {
                background-color: hsl(48, 100%, 50%);
                background-color: var(--ui-warning);
                color: var(--ui-warning-text);
            }

            :host([variant="error"]) {
                background-color: var(--ui-error);
                color: var(--ui-error-text);
            }

            ui-text {
                flex-grow: 1;
            }
        `;
    }

    protected render() {
        return html` <ui-text style="font-size: 0.9rem;">${this.message}</ui-text> `;
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);
        this.addEventListener("click", () => {
            if (!this.parentElement) return;
            this.parentElement.removeChild(this);
        });
    }
}

export default UIAlert;
