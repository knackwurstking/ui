import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("ui-secondary")
export class UISecondary extends LitElement {
    protected render() {
        return html`
            <ui-text size="0.9rem" casl="1" mono="0" slnt="-15">
                <slot></slot>
            </ui-text>
        `;
    }
}
