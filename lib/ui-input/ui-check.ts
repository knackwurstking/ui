import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * **Tag**: `ui-check`
 *
 * **Attributes**:
 *  - checked: `boolean`
 *
 * **Events**:
 *  - "input"
 *  - "change"
 */
@customElement("ui-check")
class UICheck extends LitElement {
    @property({ type: Boolean, attribute: "checked", reflect: true })
    checked: boolean = false;

    role = "checkbox";

    static get styles() {
        return css`
            :host {
                border-radius: var(--ui-radius);
            }

            input {
                display: inline-block;

                height: 1.5rem;
                width: 1.5rem;

                padding: var(--ui-spacing) calc(var(--ui-spacing) * 2);

                border: 1px solid hsl(var(--ui-hsl-primary));
                border-radius: var(--ui-radius);

                accent-color: hsl(var(--ui-hsl-primary));
                color: hsl(var(--ui-hsl-text));
                background-color: transparent;

                box-shadow: none;
                outline: none;
                cursor: pointer;

                transition: border-color 0.25s linear;
            }

            input:disabled {
                cursor: default;
                user-select: none;
            }
        `;
    }

    protected render() {
        return html`
            <input
                type="checkbox"
                ?checked=${this.checked}

                @input=${() => {
                    this.checked = !this.checked;
                }}

                @change=${() => {
                    this.dispatchEvent(new Event("change", {}));
                }}
            ></input>
        `;
    }

    public click(): void {
        super.click();
        this.shadowRoot!.querySelector<HTMLInputElement>(`input`)!.checked =
            this.checked = !this.checked;
    }
}

export default UICheck;
