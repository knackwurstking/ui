import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

const defaultGap = "0";

/**
 * **Tag**: `ui-flex-grid-row`
 *
 * **Attributes**:
 *  - gap: `string` [default: "0"]
 *  - justify: `string`
 *  - align: `string`
 *  - wrap: `string`
 *
 * **Slots**:
 *  - ""
 */
@customElement("ui-flex-grid-row")
export class UIFlexGridRow extends LitElement {
    @property({ type: String, attribute: "gap" })
    gap: string = defaultGap;

    @property({ type: String, attribute: "justify" })
    justify?: string;

    @property({ type: String, attribute: "align" })
    align?: string;

    @property({ type: String, attribute: "wrap" })
    wrap?: string;

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-flow: row var(--_wrap, nowrap);
                justify-content: var(--_justify);
                align-items: var(--_align);

                width: 100%;
            }

            :host > ::slotted(*) {
                margin: 0 var(--_gap, 0) !important;
            }

            :host > ::slotted(*:first-child) {
                margin-left: 0 !important;
            }

            :host > ::slotted(*:last-child) {
                margin-right: 0 !important;
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
            case "gap":
                if (!value) this.style.removeProperty("--_gap");
                else this.style.setProperty(`--_gap`, value || defaultGap);
                break;

            case "justify":
                if (!value) this.style.removeProperty("--_justify");
                else this.style.setProperty(`--_justify`, value || "");
                break;

            case "align":
                if (!value) this.style.removeProperty("--_align");
                else this.style.setProperty(`--_align`, value || "");
                break;

            case "wrap":
                if (!value) this.style.removeProperty("--_wrap");
                else this.style.setProperty(`--_wrap`, value || "");
                break;
        }
    }
}
