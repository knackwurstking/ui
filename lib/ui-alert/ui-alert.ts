import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

export type UIAlertVariant = "info" | "warning" | "error";

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
                display: content;

                border-radius: var(--ui-radius);
                border: 1px solid hsl(var(--ui-hsl-borderColor));

                padding: var(--ui-spacing);

                width: 28rem;
                max-width: 100%;

                background-color: hsl(var(--ui-hsl-card));
                color: hsl(var(--ui-hsl-card-fg));

                cursor: pointer;
            }

            :host([variant="info"]) {
                background-color: hsla(
                    var(--ui-hsl-backdrop),
                    var(--ui-backdrop-alpha)
                );

                -webkit-backdrop-filter: var(--ui-backdropFilter);
                backdrop-filter: var(--ui-backdropFilter);
            }

            :host([variant="warning"]) {
                background-color: hsl(48, 100%, 50%);

                -webkit-backdrop-filter: var(--ui-backdropFilter);
                backdrop-filter: var(--ui-backdropFilter);
            }

            :host([variant="error"]) {
                background-color: hsl(var(--ui-hsl-destructive));
                color: hsl(var(--ui-hsl-destructive-fg));

                -webkit-backdrop-filter: var(--ui-backdropFilter);
                backdrop-filter: var(--ui-backdropFilter);
            }

            ui-primary {
                flex-grow: 1;
            }
        `;
    }

    protected render() {
        return html`
            <ui-primary style="font-size: 0.9rem;">${this.message}</ui-primary>
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
