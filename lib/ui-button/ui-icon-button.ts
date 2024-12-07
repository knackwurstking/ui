import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { CleanUpFunction } from "../global";
import { ripple } from "../utils";

export type UIIconButtonColor = "primary" | "secondary" | "destructive";

/**
 * @element ui-icon-button
 *
 * @slot
 */
@customElement("ui-icon-button")
class UIIconButton extends LitElement {
    @property({ type: String, attribute: "color", reflect: true })
    color?: UIIconButtonColor;

    @property({ type: Boolean, attribute: "ghost" })
    ghost: Boolean = false;

    @property({ type: Boolean, attribute: "disabled" })
    disabled: Boolean = false;

    @property({ type: Boolean, attribute: "ripple" })
    ripple: Boolean = false;

    role: string | null = "button";

    private rippleCleanUp: CleanUpFunction | null = null;

    static get styles() {
        return css`
            :host {
                border: 1px solid currentColor;
            }

            :host([ghost]) {
                border-color: transparent !important;
                box-shadow: none;
            }

            :host([color="primary"]) {
                color: var(--ui-primary);
                border-color: var(--ui-primary));
            }

            :host([color="secondary"]) {
                color: var(--ui-secondary);
                border-color: var(--ui-secondary);
            }

            :host([color="destructive"]) {
                color: var(--ui-destructive);
                border-color: var(--ui-destructive);
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
        return html`<ui-svg><slot></slot></ui-svg>`;
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

export default UIIconButton;
