import { svg, UIIconButton } from "..";
import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * @event {UISearch} storage - Triggered after storage data loaded
 * @event {UISearch} submit - Triggered if submit button clicked (if "no-submit" property not set)
 */
@customElement("ui-search")
export class UISearch extends LitElement {
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

    @property({ type: String, attribute: "storagePrefix", reflect: true })
    storagePrefix: string = "";

    @property({ type: String, attribute: "storageKey", reflect: true })
    storageKey: string = "";

    static get styles() {
        return css`
            * {
                box-sizing: border-box;
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
                user-select: none;
                transform: translateY(calc(var(--ui-spacing) / 2));
            }

            input {
                display: block;

                width: 100%;

                margin: 0;
                padding: var(--ui-spacing) calc(var(--ui-spacing) * 2);

                accent-color: var(--ui-primary);
                background-color: transparent;

                outline: none;
                border: none;
                border-radius: inherit;

                font-size: 0.9rem;
                font-family: var(--ui-fontFamily);
                font-variation-settings: var(--ui-input-fontVariation);
            }

            :host(:not([no-submit])) input {
                width: calc(100% - 2rem);
            }

            ui-icon-button {
                position: absolute;
                top: 0;
                right: 0;
                height: 100%;

                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }

            :host([no-submit]) ui-icon-button {
                display: none;
            }
        `;
    }

    protected render() {
        console.debug(
            `[ui][ui-search] Render component with value "${this.value}"`,
        );

        let timeout: NodeJS.Timeout | null = null;

        return html`
            <div class="container has-backdrop-blur">
                <ui-secondary class="title"></ui-secondary>

                <input
                    name="search"
                    type="search"
                    ?value="${this.value}"
                    @keydown=${(ev: KeyboardEvent) => {
                        if (this.noSubmit || ev.key !== "Enter") return;
                        // Trigger submit button click
                        this.shadowRoot
                            ?.querySelector<UIIconButton>(
                                `ui-icon-button[name="submit"]`,
                            )
                            ?.click();
                    }}
                    @input=${(ev: Event) => {
                        // Pass value down to the LitElement
                        this.value = (
                            ev.currentTarget as HTMLInputElement
                        ).value;

                        // Store value to localStorage
                        if (!this.storage) return;

                        if (timeout !== null) clearTimeout(timeout);
                        timeout = setTimeout(() => {
                            localStorage.setItem(
                                this.storagePrefix + this.storageKey,
                                this.value,
                            );
                            timeout = null;
                        }, 250);
                    }}
                    @change=${() => {
                        // Forward the "change" event to the LitElement
                        this.dispatchEvent(new Event("change"));
                    }}
                />

                <ui-icon-button
                    name="submit"
                    for="search"
                    ghost
                    @click=${() => {
                        this.dispatchEvent(new Event("submit"));
                    }}
                >
                    ${svg.smoothieLineIcons}
                </ui-icon-button>
            </div>
        `;
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);

        if (!this.value && this.storage) {
            const value =
                localStorage.getItem(this.storagePrefix + this.storageKey) ||
                "";
            this.value = value;
            this.dispatchEvent(new CustomEvent("storage", { detail: this }));
        }
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
