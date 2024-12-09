import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

const defaultGap = "0";

/**
 * @element ui-flex-grid
 *
 * @slot
 */
@customElement("ui-flex-grid")
class UIFlexGrid extends LitElement {
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
                display: flex !important;
                flex-direction: column !important;
                flex-flow: column var(--_wrap, nowrap);
                justify-content: var(--_justify);
                align-items: var(--_align);

                position: relative;
                width: 100%;
                height: fit-content;

                gap: var(--_gap);
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
                if (!value) this.style.removeProperty("--_wrap");
                else this.style.setProperty(`--_wrap`, value || "");
                break;
        }
    }
}

export default UIFlexGrid;
