import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ui-spinner")
export class UISpinner extends LitElement {
    @property({ type: Boolean, attribute: "nobg" })
    nobg: boolean = false;

    static get styles() {
        return css`
            :host {
                position: absolute !important;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
            }

            .background {
                display: var(--ui-spinner_bgDisplay, "block");

                z-index: 999;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;

                background-color: var(--ui-backdrop);
                -webkit-backdrop-filter: var(--ui-backdropFilter);
                backdrop-filter: var(--ui-backdropFilter);
            }

            .spinner {
                content: "";
                box-sizing: border-box;

                z-index: 1000;
                position: absolute;
                top: 50%;
                left: 50%;
                width: 2.5rem;
                height: 2.5rem;

                margin-top: -1.25rem;
                margin-left: -1.25rem;

                border: 2px solid var(--ui-borderColor);
                border-top-color: var(--ui-primary);
                border-radius: 50%;

                animation: spinner 0.6s linear infinite;
            }

            @keyframes spinner {
                to {
                    transform: rotate(360deg);
                }
            }
        `;
    }

    protected render() {
        return html`
            <div class="background"></div>
            <div class="spinner"></div>
        `;
    }

    attributeChangedCallback(
        name: string,
        _old: string | null,
        value: string | null,
    ): void {
        super.attributeChangedCallback(name, _old, value);

        switch (name) {
            case "nobg":
                this.style.setProperty(
                    `--ui-spinner_bgDisplay`,
                    value !== null ? "none" : "block",
                );
                break;
        }
    }
}
