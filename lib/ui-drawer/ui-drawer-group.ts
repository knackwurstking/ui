import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { svg } from "..";

const defaultGap = "0";

/**
 * @element ui-drawer-group
 *
 * @fires fold
 * @fires unfold
 *
 * @slot
 */
@customElement("ui-drawer-group")
class UIDrawerGroup extends LitElement {
    @property({ type: String, attribute: "title", reflect: true })
    title: string = "";

    @property({ type: String, attribute: "gap" })
    gap: string = defaultGap;

    @property({ type: Boolean, attribute: "open", reflect: true })
    open: boolean = false;

    @property({ type: Boolean, attribute: "no-fold", reflect: true })
    noFold: boolean = false;

    static get styles() {
        return css`
            * {
                box-sizing: border-box;
            }

            :host {
                display: block;
                margin: 0;
                list-style: none;
                padding: var(--ui-spacing);
                overflow: hidden;
            }

            .fold {
                display: flex;
                position: relative;
                border-radius: var(--ui-radius);
                cursor: pointer;
            }

            :host([no-fold]) .fold {
                display: none;
            }

            .fold .icon {
                transition: transform 0.25s ease;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            :host(:not([open])) .fold .icon {
                transform: rotate(-90deg);
            }

            :host(:not([open])):host(:not([no-fold])) ::slotted(*) {
                display: none !important;
            }
        `;
    }

    protected render() {
        return html`
            <ui-flex-grid gap="${this.gap}">
                <ui-drawer-group-item
                    class="fold"
                    role="button"
                    @click=${async () => {
                        this.open = !this.open;
                        setTimeout(() => {
                            if (this.open)
                                this.dispatchEvent(new Event("unfold"));
                            else this.dispatchEvent(new Event("fold"));
                        });
                    }}
                >
                    <ui-flex-grid-row>
                        <ui-flex-grid-item
                            align="center"
                            style="padding-right: var(--ui-spacing);"
                        >
                            <ui-heading level="4">${this.title}</ui-heading>
                        </ui-flex-grid-item>

                        <ui-flex-grid-item class="icon" align="center" flex="0">
                            <ui-svg style="width: 2.5rem; height: 2.5rem;">
                                ${svg.smoothieLineIcons.chevronDown}
                            </ui-svg>
                        </ui-flex-grid-item>
                    </ui-flex-grid-row>
                </ui-drawer-group-item>

                <slot></slot>
            </ui-flex-grid>
        `;
    }
}

export default UIDrawerGroup;
