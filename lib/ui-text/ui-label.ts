import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { CleanUpFunction, ripple } from "..";

/**
 * **Tag**: `ui-label`
 *
 * **Attributes**:
 *  - primary: `string`
 *  - secondary: `string`
 *  - ripple: `boolean`
 *
 * **Slots**:
 *  - ""
 */
@customElement("ui-label")
class UILabel extends LitElement {
    private rippleCleanUp: CleanUpFunction | null = null;

    private clickHandler = async (ev: Event) => {
        if (!ev.currentTarget) return;

        const container = ev.currentTarget as HTMLElement;
        ([...container.children] as HTMLElement[]).forEach((child) => {
            child.click();
        });
    };

    private childClickHandler = async (ev: Event) => {
        ev.stopPropagation();
    };

    @property({ type: String, attribute: "primary", reflect: true })
    primary?: string;

    @property({ type: String, attribute: "secondary", reflect: true })
    secondary?: string;

    @property({ type: Boolean, attribute: "ripple", reflect: true })
    ripple: boolean = false;

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
            }

            :host > div {
                display: flex;
                flex-direction: row;

                position: relative;
                width: 100%;

                padding: var(--ui-spacing);

                border-radius: var(--ui-radius);
            }

            :host > div > span:nth-child(1) {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;

                margin-right: var(--ui-spacing);
            }

            :host > div > span:nth-child(2) {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: center;
            }
        `;
    }

    protected render() {
        return html`
            <div>
                <span>
                    ${!!this.primary
                        ? html`<ui-primary>${this.primary}</ui-primary>`
                        : ``}
                    ${!!this.secondary
                        ? html`<ui-secondary>${this.secondary}</ui-secondary>`
                        : ``}
                </span>

                <span>
                    <slot></slot>
                </span>
            </div>
        `;
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);

        if (this.ripple) this.enableRipple();
        else this.disableRipple();
    }

    attributeChangedCallback(
        name: string,
        _old: string | null,
        value: string | null,
    ): void {
        super.attributeChangedCallback(name, _old, value);

        switch (name) {
            case "ripple":
                if (this.ripple) {
                    this.enableRipple();
                } else {
                    this.disableRipple();
                }
        }
    }

    private async enableRipple() {
        if (!!this.rippleCleanUp) return;

        const container = this.shadowRoot?.querySelector<HTMLElement>(`div`);
        if (!container) {
            // Component isn't rendered yet!
            return;
        }

        this.rippleCleanUp = ripple.create(container);

        this.role = "button";
        this.style.cursor = "pointer";

        this.addEventListener("click", this.clickHandler);
        ([...this.children] as HTMLElement[]).forEach((child) => {
            child.addEventListener("click", this.childClickHandler);
        });
    }

    private async disableRipple() {
        if (!this.rippleCleanUp) return;

        this.style.cursor = "default";
        this.role = null;

        this.rippleCleanUp();
        this.rippleCleanUp = null;

        this.removeEventListener("click", this.clickHandler);
        ([...this.children] as HTMLElement[]).forEach((child) => {
            child.removeEventListener("click", this.childClickHandler);
        });
    }
}

export { UILabel };
