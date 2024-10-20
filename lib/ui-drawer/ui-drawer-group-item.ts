import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * **Tag**: `ui-drawer-group-item`
 *
 * **Slots**:
 *  - ""
 */
@customElement("ui-drawer-group-item")
export class UIDrawerGroupItem extends LitElement {
    static get styles() {
        return css`
            * {
                box-sizing: border-box;
            }

            :host {
                display: block;
                width: 100%;
            }

            li {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;

                width: 100%;

                padding: var(--ui-spacing) calc(var(--ui-spacing) * 1.5);
            }

            ::slotted(*) {
                width: 100%;
            }
        `;
    }

    protected render(): unknown {
        return html`<li><slot></slot></li>`;
    }
}
