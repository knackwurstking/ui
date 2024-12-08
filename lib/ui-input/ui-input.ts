import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * @element ui-input
 *
 * @fires input
 * @fires change
 */
@customElement("ui-input")
class UIInput extends LitElement {
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
                background-color: var(--ui-primary);
                color: var(--ui-primary-text);
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

                border: 1px solid var(--ui-borderColor);
                border-radius: var(--ui-radius);

                transition: border-color 0.25s linear;
            }

            .container:has(input:focus) {
                border-color: var(--ui-primary);
            }

            :host([invalid]) .container {
                border-color: var(--ui-destructive);
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

                accent-color: var(--ui-primary);
                background-color: transparent;
                color: var(--ui-input-text);

                outline: none;
                border: none;
                border-radius: inherit;

                font-size: 0.95rem;
                font-family: var(--ui-fontFamily);
                font-variation-settings:
                    "MONO" 1,
                    "CASL" var(--ui-casl),
                    "wght" 375,
                    "slnt" var(--ui-slnt),
                    "CRSV" var(--ui-crsv);
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
                    ? html` <ui-secondary class="title"> ${this.title} </ui-secondary> `
                    : ``}
                <input
                    type="${this.type}"
                    value="${this.value}"
                    placeholder="${this.placeholder}"
                    min="${this.min}"
                    max="${this.max}"
                    @input=${(ev: Event) => {
                        this.value = (ev.currentTarget as HTMLInputElement).value;
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
        this.shadowRoot!.querySelector<HTMLInputElement>(`input`)!.focus(options);
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

export default UIInput;
