import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * @element ui-stack-layout-page
 *
 * @slot
 */
@customElement("ui-stack-layout-page")
class UIStackLayoutPage extends LitElement {
    @property({ type: String, attribute: "name", reflect: true })
    name: string = "";

    static get styles() {
        return css`
            :host {
                display: block;

                position: absolute !important;
                top: 0;
                right: 0;
                bottom: 0;
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

export default UIStackLayoutPage;
