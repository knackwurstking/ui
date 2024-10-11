import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ui-stack-layout")
export class UIStackLayoutPage extends LitElement {
    @property({ type: String, attribute: "name" })
    name: string = "";

    static get styles() {
        return css`
            :host {
                display: block;

                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                opacity: 0;

                transition: opacity 0.5s ease;
                animation: fade-in 0.5s;
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
        `;
    }

    protected render() {
        return html`<slot></slot>`;
    }
}
