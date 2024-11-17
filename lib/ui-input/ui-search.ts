import { svg, UIIconButton } from "..";
import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * @element ui-search
 *
 * @fires input
 * @fires change
 * @fires storage Triggered after storage data loaded
 */
@customElement("ui-search")
class UISearch extends LitElement {
    @property({ type: String, attribute: "title", reflect: true })
    title: string = "";

    @property({ type: String, attribute: "value" })
    value: string = "";

    @property({ type: String, attribute: "placeholder", reflect: true })
    placeholder: string = "";

    @property({ type: Boolean, attribute: "invalid", reflect: true })
    invalid: boolean = false;

    @property({ type: Boolean, attribute: "no-submit", reflect: true })
    noSubmit: boolean = false;

    @property({ type: Boolean, attribute: "storage", reflect: true })
    storage: boolean = false;

    @property({ type: String, attribute: "storage-prefix", reflect: true })
    storagePrefix: string = "";

    @property({ type: String, attribute: "storage-key", reflect: true })
    storageKey: string = "";

    role = "search";

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
                position: relative;
                width: 100%;

                border: none;
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
                margin-right: 2.5rem;
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

                font-size: 0.9rem;
                font-family: var(--ui-fontFamily);
                font-variation-settings: var(--ui-input-fontVariation);
            }

            ui-secondary.title ~ input {
                padding-top: 0;
            }

            :host(:not([no-submit])) input {
                width: calc(100% - 2rem);
            }

            ui-icon-button {
                position: absolute;
                top: 0;
                right: 0;
                height: 100%;

                display: flex;
                justify-content: center;
                align-items: center;

                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }

            :host([no-submit]) ui-icon-button {
                display: none;
            }
        `;
    }

    protected render() {
        return html`
            <div class="container has-backdrop-blur">
                ${!!this.title
                    ? html`<ui-secondary class="title"> ${this.title} </ui-secondary>`
                    : ``}

                <input
                    name="search"
                    type="search"
                    value="${this.value}"
                    @keydown=${(ev: KeyboardEvent) => {
                        if (this.noSubmit || ev.key !== "Enter") return;
                        // Trigger submit button click
                        this.shadowRoot
                            ?.querySelector<UIIconButton>(`ui-icon-button[name="submit"]`)
                            ?.click();
                    }}
                    @input=${(ev: Event) => {
                        // Pass value down to the LitElement
                        this.value = (ev.currentTarget as HTMLInputElement).value;

                        // Store value to localStorage
                        if (this.storage) {
                            localStorage.setItem(this.storagePrefix + this.storageKey, this.value);
                        }

                        if (this.noSubmit) this.dispatchEvent(new Event("change"));
                    }}
                />

                <ui-icon-button
                    name="submit"
                    for="search"
                    ghost
                    ripple
                    @click=${() => {
                        this.dispatchEvent(new Event("change"));
                    }}
                >
                    ${svg.smoothieLineIcons.search}
                </ui-icon-button>
            </div>
        `;
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);

        if (this.storage) {
            const value = localStorage.getItem(this.storagePrefix + this.storageKey) || this.value;

            this.value = value;
            this.dispatchEvent(new Event("storage"));
        }
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

export default UISearch;
