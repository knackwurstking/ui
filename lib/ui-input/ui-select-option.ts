import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * **Tag**: `ui-select-option`
 *
 * **Attributes**:
 *  - value: `string`
 *  - selected: `boolean`
 *
 * **Slots**:
 *  - ""
 */
@customElement("ui-select-option")
export class UISelectOption extends LitElement {
    @property({ type: String, attribute: "value", reflect: true })
    value: string = "";

    @property({ type: Boolean, attribute: "selected", reflect: true })
    selected: boolean = false;

    static get styles() {
        return css`
            :host {
                display: none;
                align-items: center;

                padding: var(--ui-spacing);
                padding-right: 2.5rem;

                height: calc(1em * var(--ui-lineHeight) + var(--ui-spacing) * 2);

                font-variation-settings: var(--ui-input-fontVariation);
                color: hsl(var(--ui-hsl-input-text));

                white-space: nowrap;
                text-overflow: ellipsis;

                overflow: hidden;

                transition:
                    background-color 0.25s linear,
                    color 0.25s linear;
            }
        `;
    }

    protected render() {
        this.setAttribute("role", "button");
        return html`<slot></slot>`;
    }
}
