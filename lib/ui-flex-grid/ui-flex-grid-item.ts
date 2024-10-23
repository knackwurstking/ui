import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

const defaultFlex = 1;

/**
 * @element ui-flex-grid-item
 *
 * @slot
 */
@customElement("ui-flex-grid-item")
class UIFlexGridItem extends LitElement {
    @property({ type: Number, attribute: "flex" })
    flex: number = defaultFlex;

    @property({ type: String, attribute: "justify" })
    justify?: string;

    @property({ type: String, attribute: "align" })
    align?: string;

    static get styles() {
        return css`
            :host {
                flex: var(--_flex, ${defaultFlex});
                display: flex;
                justify-content: var(--_justify);
                align-items: var(--_align);
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

            case "justify":
                if (!value) this.style.removeProperty("--_justify");
                else this.style.setProperty(`--_justify`, value || "");
                break;

            case "align":
                if (!value) this.style.removeProperty("--_align");
                else this.style.setProperty(`--_align`, value || "");
                break;
        }
    }
}
export default UIFlexGridItem;
