import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * @element ui-drawer-group-item
 *
 * @slot
 */
@customElement("ui-drawer-group-item")
class UIDrawerGroupItem extends LitElement {
    static get styles() {
        return css`
            * {
                box-sizing: border-box;
            }

            :host {
                width: 100%;

                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
            }

            ::slotted(*) {
                width: 100%;
            }
        `;
    }

    protected render(): unknown {
        return html`<slot></slot>`;
    }
}

export default UIDrawerGroupItem;
