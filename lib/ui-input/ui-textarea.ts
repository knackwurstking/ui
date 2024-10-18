import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

/**
 * **Tag**: ui-textarea
 *
 * **Attributes**:
 *  - title: `string`
 *  - vlaue: `string`
 *  - placeholder: `string`
 *  - invalid: `boolean`
 *  - rows: `number`
 *  - cols: `number`
 *
 * **Events**:
 *  - input
 *  - change
 *
 * **Public Mehtods**:
 *  - `focus(...)`
 *  - `blur()`
 *  - `click()`
 */
@customElement("ui-textarea")
export class UITextarea extends LitElement {
    @property({ type: String, attribute: "title", reflect: true })
    title: string = "";

    @property({ type: String, attribute: "value" })
    value: string = "";

    @property({ type: String, attribute: "placeholder", reflect: true })
    placeholder: string = "";

    @property({ type: Boolean, attribute: "invalid", reflect: true })
    invalid: boolean = false;

    @property({ type: Number, attribute: "rows", reflect: true })
    rows?: number;

    @property({ type: Number, attribute: "cols", reflect: true })
    cols?: number;

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
            }

            .container {
                width: 100%;
                height: 100%;
                border: none;
                border: 1px solid hsl(var(--ui-hsl-borderColor));
                border-radius: var(--ui-radius);
                transition: border-color 0.25s linear;
            }

            .container:has(textarea:focus) {
                border-color: hsl(var(--ui-hsl-primary));
            }

            :host([invalid]) .container {
                border-color: hsl(var(--ui-hsl-destructive));
            }

            ui-secondary.title {
                display: block;
                padding: 0 var(--ui-spacing);
                user-select: none;
                transform: translateY(calc(var(--ui-spacing) / 2));
            }

            textarea {
                resize: none;
                width: 100%;
                display: block;
                margin: 0;
                padding: var(--ui-spacing) calc(var(--ui-spacing) * 2);
                border: none;
                border-radius: inherit;
                outline: none;
                font-size: 0.9rem;
                font-family: var(--ui-fontFamily);
                font-variation-settings: var(--ui-input-fontVariation);
                accent-color: hsl(var(--ui-hsl-primary));
                background-color: transparent;
                color: hsl(var(--ui-hsl-input-text));
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

                <textarea
                    placeholder=${this.placeholder}
                    .value=${this.value}
                    rows=${ifDefined(this.rows)}
                    cols=${ifDefined(this.cols)}
                    @input=${(ev: Event) => {
                        this.value = (
                            ev.currentTarget as HTMLTextAreaElement
                        ).value;
                    }}
                    @change=${() => {
                        this.dispatchEvent(new Event("change"));
                    }}
                ></textarea>
            </div>
        `;
    }

    public focus(options?: FocusOptions): void {
        super.focus(options);
        this.shadowRoot!.querySelector<HTMLInputElement>(`textarea`)!.focus(
            options,
        );
    }

    public blur(): void {
        super.blur();
        this.shadowRoot!.querySelector(`textarea`)!.blur();
    }

    public click(): void {
        super.click();
        this.focus();
    }
}
