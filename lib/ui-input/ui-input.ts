import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * **Tag**: `ui-input`
 *
 * **Attributes**:
 *  - title: `string`
 *  - type: `string`
 *  - value: `string`
 *  - placeholder: `string`
 *  - invalid: `boolean`
 *  - min: `string`
 *  - max: `string`
 *
 * **Events**:
 *  - "input"
 *  - "change"
 */
@customElement("ui-input")
export class UIInput extends LitElement {
    @property({ type: String, attribute: "title", reflect: true })
    title: string = "";

    @property({ type: String, attribute: "type", reflect: true })
    type: string = "";

    @property({ type: String, attribute: "value" })
    value: string = "";

    @property({ type: String, attribute: "placeholder", reflect: true })
    placeholder: string = "";

    @property({ type: Boolean, attribute: "invalid", reflect: true })
    invalid: boolean = false;

    @property({ type: String, attribute: "min", reflect: true })
    min: string = "";

    @property({ type: String, attribute: "max", reflect: true })
    max: string = "";

    role = "input";

    static get styles() {
        return css`
            * {
                box-sizing: border-box;
            }

            ::selection {
                background-color: hsl(var(--ui-hsl-primary));
                color: hsl(var(--ui-hsl-primary-text));
            }

            :host {
                display: block;

                position: relative;
                width: 100%;
                height: fit-content;

                border-radius: var(--ui-radius);
            }

            .container {
                width: 100%;

                border: 1px solid hsl(var(--ui-hsl-borderColor));
                border-radius: var(--ui-radius);

                transition: border-color 0.25s linear;
            }

            .container:has(input:focus) {
                border-color: hsl(var(--ui-hsl-primary));
            }

            :host([invalid]) .container {
                border-color: hsl(var(--ui-hsl-destructive));
            }

            ui-secondary.title {
                display: block;
                padding: 0 var(--ui-spacing);
                font-size: 0.85rem;
            }

            input {
                display: block;

                width: 100%;

                margin: 0;
                padding: var(--ui-spacing) calc(var(--ui-spacing) * 2);

                accent-color: hsl(var(--ui-hsl-primary));
                background-color: transparent;
                color: hsl(var(--ui-hsl-input-text));

                outline: none;
                border: none;
                border-radius: inherit;

                font-size: 0.95rem;
                font-family: var(--ui-fontFamily);
                font-variation-settings: var(--ui-input-fontVariation);
            }

            ui-secondary.title ~ input {
                padding-top: 0;
            }
        `;
    }

    protected render() {
        return html`
            <div class="container">
                ${!!this.title
                    ? html`
                          <ui-secondary class="title">
                              ${this.title}
                          </ui-secondary>
                      `
                    : ``}
                <input
                    type="${this.type}"
                    value="${this.value}"
                    placeholder="${this.placeholder}"
                    min="${this.min}"
                    max="${this.max}"
                    @input=${(ev: Event) => {
                        this.value = (
                            ev.currentTarget as HTMLInputElement
                        ).value;
                    }}
                    @change=${() => {
                        this.dispatchEvent(new Event("change"));
                    }}
                />
            </div>
        `;
    }

    public focus(options?: FocusOptions): void {
        super.focus(options);
        this.shadowRoot!.querySelector<HTMLInputElement>(`input`)!.focus(
            options,
        );
    }

    public blur(): void {
        super.blur();
        this.shadowRoot!.querySelector(`input`)!.blur();
    }

    public click(): void {
        super.click();
        this.focus();
    }
}
