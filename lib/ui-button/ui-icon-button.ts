import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { CleanUpFunction } from "../global";
import { ripple } from "../utils";

export type UIIconButtonColor = "primary" | "secondary" | "destructive";

/**
 * **Tag**: `ui-icon-button`
 *
 * **Attributes**:
 *  - color: `"primary" | "secondary" | "destructive"`
 *  - ghost: `boolean`
 *  - disabled: `boolean`
 *  - ripple: `boolean`
 *
 * **Slots**:
 *  - ""
 */
@customElement("ui-icon-button")
export class UIIconButton extends LitElement {
    private rippleCleanUp: CleanUpFunction | null = null;

    @property({ type: String, attribute: "color", reflect: true })
    color?: UIIconButtonColor;

    @property({ type: Boolean, attribute: "ghost" })
    ghost: Boolean = false;

    @property({ type: Boolean, attribute: "disabled" })
    disabled: Boolean = false;

    @property({ type: Boolean, attribute: "ripple" })
    ripple: Boolean = false;

    static get styles() {
        return css`
            :host {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                position: relative;
                width: 2.5rem;
                height: 2.5rem;
                padding: calc(var(--ui-spacing) / 2);
                border: 1px solid currentColor;
                border-radius: var(--ui-radius);
                outline: none;
                overflow: hidden;
                cursor: pointer;
                user-select: none;
                font-size: 1.1rem;
                font-weight: 450;
                font-family: var(--ui-fontFamily);
                font-variation-settings: var(--ui-button-fontVariation);
                transition: color 0.5s linear;
            }

            :host([ghost]) {
                border-color: transparent !important;
                box-shadow: none;
                font-weight: 900;
            }

            :host([color="primary"]) {
                color: hsl(var(--ui-hsl-primary));
                border-color: hsl(var(--ui-hsl-primary));
            }

            :host([color="secondary"]) {
                color: hsl(var(--ui-hsl-secondary));
                border-color: hsl(var(--ui-hsl-secondary));
            }

            :host([color="destructive"]) {
                color: hsl(var(--ui-hsl-destructive));
                border-color: hsl(var(--ui-hsl-destructive));
            }

            /* :disabled */

            :host([disabled]),
            :host([disabled]:hover),
            :host([disabled]:active) {
                opacity: 0.25;
                cursor: default;
                pointer-events: none;
            }

            ui-svg {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `;
    }

    protected render() {
        this.setAttribute("role", "button");
        return html`<slot></slot>`;
    }

    attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
        super.attributeChangedCallback(name, _old, value);

        switch (name) {
            case "ripple":
                if (this.rippleCleanUp !== null) {
                    this.rippleCleanUp();
                    this.rippleCleanUp = null;
                }

                if (value !== null) {
                    this.rippleCleanUp = ripple.create(this);
                }

                break;
        }
    }
}
