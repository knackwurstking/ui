import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * @element ui-label
 *
 * @slot - An input elements
 */
@customElement("ui-label")
class UILabel extends LitElement {
    @property({ type: String, attribute: "primary", reflect: true })
    primary?: string;

    @property({ type: String, attribute: "secondary", reflect: true })
    secondary?: string;

    static get styles() {
        return css`
            :host {
                display: block;
            }

            :host > div {
                display: flex;
                flex-direction: row;

                position: relative;
                width: 100%;

                padding: var(--ui-spacing);

                border-radius: var(--ui-radius);
            }

            :host > div > span:nth-child(1) {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;

                margin-right: var(--ui-spacing);
            }

            :host > div > span:nth-child(2) {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: center;
            }
        `;
    }

    protected render() {
        return html`
            <div>
                <span>
                    ${!!this.primary ? html`<ui-primary>${this.primary}</ui-primary>` : ``}
                    ${!!this.secondary ? html`<ui-secondary>${this.secondary}</ui-secondary>` : ``}
                </span>

                <span>
                    <slot></slot>
                </span>
            </div>
        `;
    }
}

export default UILabel;
