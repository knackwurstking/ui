import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

const defaultGap = "0.25rem";

/**
 * @element ui-flex-grid-row
 *
 * @slot
 */
@customElement("ui-flex-grid-row")
class UIFlexGridRow extends LitElement {
    @property({ type: String, attribute: "gap", reflect: true })
    gap: string = defaultGap;

    @property({ type: String, attribute: "justify", reflect: true })
    justify?: string;

    @property({ type: String, attribute: "align", reflect: true })
    align?: string;

    @property({ type: Boolean, attribute: "wrap", reflect: true })
    wrap?: boolean;

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: row;
                flex-flow: row var(--_wrap, nowrap);

                justify-content: var(--_justify);
                align-items: var(--_align);

                width: 100%;
                min-height: fit-content;

                gap: var(--_gap, 0.25rem);
            }
        `;
    }

    protected render() {
        return html`<slot></slot>`;
    }

    attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
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
                if (value === null) this.style.removeProperty("--_wrap");
                else this.style.setProperty(`--_wrap`, "wrap");
                break;
        }
    }
}

export default UIFlexGridRow;
