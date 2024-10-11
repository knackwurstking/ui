import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

const defaultGap = "0";

@customElement("ui-flex-grid")
export class UIFlexGrid extends LitElement {
    @property({ type: String, attribute: "gap" })
    gap: string = defaultGap;

    @property({ type: String, attribute: "justify" })
    justify?: string;

    @property({ type: String, attribute: "align" })
    align?: string;

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-flow: column nowrap;
                justify-content: var(--_justify);
                align-items: var(--_align);

                position: relative;
                width: 100%;
                height: fit-content;
            }

            :host > ::slotted(*) {
                margin: var(--_gap, 0) 0 !important;
            }

            :host > ::slotted(*:first-child) {
                margin-top: 0 !important;
            }

            :host > ::slotted(*:last-child) {
                margin-bottom: 0 !important;
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
                this.style.setProperty(`--_gap`, value || defaultGap);
                break;

            case "justify":
                this.style.setProperty(`--_justify`, value || "");
                break;

            case "align":
                this.style.setProperty(`--_align`, value || "");
                break;
        }
    }
}
