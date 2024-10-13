import { svg, UISelectOption } from "..";
import { customElement, property } from "lit/decorators.js";
import { css, html, LitElement } from "lit";

/**
 * @event change
 */
@customElement("ui-select")
export class UISelect extends LitElement {
    @property({ type: Boolean, attribute: "open", reflect: true })
    open: boolean = false;

    @property({ type: Boolean, attribute: "keep-open", reflect: true })
    keepOpen: boolean = false;

    static get styles() {
        return css`
            * {
                box-sizing: border-box;
            }

            :host {
                --ui-bg: "transparent";

                position: relative;
                display: block;

                width: 100%;
                height: calc(
                    1em * var(--ui-lineHeight) + var(--ui-spacing) * 2
                );
                transition: height 0.25s ease;

                background-color: hsl(var(--ui-hsl-bg));
                color: hsl(var(--ui-hsl-input-text));

                border: 1px solid hsl(var(--ui-hsl-borderColor));
                border-radius: var(--ui-radius);

                line-height: 1.15;

                overflow: hidden;

                font-size: 0.9rem;
                font-family: var(--ui-fontFamily);
                font-variation-settings: var(--ui-select-fontVariation);
            }

            :host([open]) {
                height: calc(
                    (1em * var(--ui-lineHeight) + var(--ui-spacing) * 2) *
                        var(--items-length)
                );
            }

            :host(:not([open]))
                .options:has(> ::slotted(ui-select-option[selected])) {
                display: block;
            }

            .options {
                cursor: pointer;
                display: none;
                display: flex;
                flex-direction: column;
                min-height: 100%;
            }

            :host([open]) .options {
                display: block;
            }

            .icon {
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 0;
                right: 0;
                width: 2.5rem;
                height: 100%;
                color: hsl(var(--ui-hsl-primary));
            }

            :host([open]) .icon {
                display: none;
            }

            ::slotted(ui-select-option) {
                display: flex;
            }

            :host([open]) ::slotted(ui-select-option[selected]) {
                background-color: hsl(var(--ui-hsl-primary));
                color: hsl(var(--ui-hsl-primary-text));
            }

            :host([open]) ::slotted(ui-select-option:not([selected]):hover) {
                background-color: hsla(var(--ui-hsl-text), 0.1);
            }

            :host(:not([open])) ::slotted(ui-select-option:not([selected])) {
                display: none;
            }
        `;
    }

    protected render() {
        const optionsClickHandler = this.optionsClickHandler.bind(this);

        return html`
            <div
                class="options"
                @click=${async (ev: Event) => {
                    if (this.keepOpen) return await optionsClickHandler(ev);

                    // Toggle open
                    this.open = !this.open;

                    if (this.open) {
                        // Handle open
                        ev.stopPropagation();
                        this.addEventListener("click", optionsClickHandler);
                    } else {
                        // Handle close
                        this.removeEventListener("click", optionsClickHandler);
                    }
                }}
            >
                <div class="icon">
                    <ui-svg>${svg.smoothieLineIcons.chevronDown}</ui-svg>
                </div>

                <slot></slot>
            </div>
        `;
    }

    private async optionsClickHandler(ev: Event) {
        ev.composedPath().forEach((child) => {
            if (!(child instanceof UISelectOption)) return;

            // Deselect all opitons
            [...this.querySelectorAll("ui-select-option")].forEach((c) =>
                c.removeAttribute("selected"),
            );

            // Finally select the cicked option
            child.setAttribute("selected", "");

            // And dispatch a "change" event
            this.dispatchEvent(new Event("change"));
        });
    }

    public options(): UISelectOption[] {
        return [...this.children].filter((c) => c instanceof UISelectOption);
    }

    public selected(): UISelectOption | null {
        return this.options().find((options) => options.selected) || null;
    }
}
