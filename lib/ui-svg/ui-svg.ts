import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * **Tag**: `ui-svg`
 *
 * **Slots**:
 *  - ""
 */
@customElement("ui-svg")
class UISvg extends LitElement {
    static get styles() {
        return css`
            :host {
                display: inline-block;
                color: inherit;
            }

            ::slotted(*) {
                width: 100%;
                height: 100%;
            }
        `;
    }

    protected render() {
        return html` <slot></slot> `;
    }
}

export { UISvg };
