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

export default UIDrawerGroupItem;
