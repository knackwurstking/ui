import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ripple, svg } from "..";

/**
 * TODO:
 *  - On unfold group, do auto scroll
 *
 * **Tag**: ui-drawer-group
 *
 * **Attributes**:
 *  - title: `string`
 *  - open: `boolean` - _Will be ignored if "no-fold" is set_
 *  - no-fold: `boolean`
 *
 * **Slots**:
 *  - \*
 */
@customElement("ui-drawer-group")
export class UIDrawerGroup extends LitElement {
    @property({ type: String, attribute: "title", reflect: true })
    title: string = "";

    @property({ type: Boolean, attribute: "open", reflect: true })
    open: boolean = false;

    @property({ type: Boolean, attribute: "no-fold", reflect: true })
    noFold: boolean = false;

    static get styles() {
        return css`
            * {
                box-sizing: border-box;
            }

            ul {
                margin: 0;
                list-style: none;
                padding: var(--ui-spacing);
                overflow: hidden;
            }

            ul .fold {
                display: flex;
                position: relative;
                border-radius: var(--ui-radius);
                cursor: pointer;
            }

            ul :host([no-fold]) .fold {
                display: none;
            }

            ul .fold .title:not(.visible) {
                display: none;
            }

            ul .fold .icon {
                transition: transform 0.25s ease;
            }

            :host(:not([open])) ul .fold .icon {
                transform: rotate(-90deg);
            }

            :host(:not([open])):host(:not([no-fold])) ::slotted(*) {
                display: none !important;
            }
        `;
    }

    protected render() {
        return html`
            <ul>
                <ui-drawer-group-item
                    class="fold"
                    role="button"
                    @click=${() => {
                        this.open = !this.open;
                    }}
                >
                    <ui-flex-grid-row>
                        <ui-flex-grid-item class="title">
                            <h3>${this.title}</h3>
                        </ui-flex-grid-item>

                        <ui-flex-grid-item class="icon" flex="0">
                            <ui-svg style="width: 2.5rem; height: 2.5rem;">
                                ${svg.smoothieLineIcons.chevronDown}
                            </ui-svg>
                        </ui-flex-grid-item>
                    </ui-flex-grid-row>
                </ui-drawer-group-item>

                <slot></slot>
            </ul>
        `;
    }

    protected updated(_changedProperties: PropertyValues): void {
        ripple.create(this.shadowRoot!.querySelector(`.fold`)!);
    }
}
