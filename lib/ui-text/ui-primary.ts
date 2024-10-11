import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("ui-primary")
export class UIPrimary extends LitElement {
    protected render() {
        return html`
            <ui-text size="1.1rem" casl="1" mono="0" slnt="0">
                <slot></slot>
            </ui-text>
        `;
    }
}
