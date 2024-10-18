import { css as CSS, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

const defaultFlex = 1;

/**
 * **Tag**: ui-flex-grid-item
 *
 * **Attributes**:
 *  flex: `number` [default: 1]
 *
 * **Slots**:
 *  \*
 */
@customElement("ui-flex-grid-item")
export class UIFlexGridItem extends LitElement {
    @property({ type: Number, attribute: "flex" })
    flex: number = defaultFlex;

    static get styles() {
        return CSS`
            :host {
                flex: var(--_flex, ${defaultFlex});
                display: flex;
            }

            ::slotted(*) {
                flex-grow: 1;
            }
        `;
    }

    protected render() {
        return html`<slot></slot>`;
    }

    attributeChangedCallback(
        name: string,
        _old: string | null,
        value: string | null,
    ): void {
        super.attributeChangedCallback(name, _old, value);

        switch (name) {
            case "flex":
                this.style.setProperty(
                    `--_flex`,
                    value || defaultFlex.toString(),
                );
                break;
        }
    }
}
