import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * @element ui-select-option
 *
 * @slot
 */
@customElement("ui-select-option")
class UISelectOption extends LitElement {
    @property({ type: String, attribute: "value", reflect: true })
    value: string = "";

    @property({ type: Boolean, attribute: "selected", reflect: true })
    selected: boolean = false;

    role = "button";

    static get styles() {
        return css`
            :host {
                --_lineHeight: var(--_lineHeight, 1.25);
                line-height: var(--_lineHeight) !important;

                display: none;
                align-items: center;

                padding: var(--ui-spacing);
                padding-right: 2.5rem;

                height: calc(1em * var(--_lineHeight) + var(--ui-spacing) * 2);

                color: var(--ui-input-text);

                font-variation-settings:
                    "MONO" 1,
                    "CASL" var(--ui-casl),
                    "wght" 375,
                    "slnt" var(--ui-slnt),
                    "CRSV" var(--ui-crsv);

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
        return html`<slot></slot>`;
    }
}

export default UISelectOption;
