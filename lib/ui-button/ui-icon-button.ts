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
    tabIndex: number = 0;

    private rippleCleanUp: CleanUpFunction | null = null;

    static get styles() {
        return css`
            :host {
                text-transform: capitalize;

                font-size: 1.1rem;
                font-family: var(--ui-fontFamily);
                font-variation-settings:
                    "MONO" var(--ui-mon),
                    "CASL" var(--ui-casl),
                    "wght" 450,
                    "slnt" var(--ui-slnt),
                    "CRSV" var(--ui-crsv);

                display: flex;
                align-items: center;
                justify-content: center;

                -ms-user-select: none;
                -moz-user-select: none;
                -webkit-user-select: none;
                user-select: none;

                overflow: hidden;

                cursor: pointer;

                border: 1px solid currentColor;
                border-radius: var(--ui-radius);

                padding: calc(var(--ui-spacing) / 2);

                width: 2.5rem;
                height: 2.5rem;
            }

            :host([color="primary"]) {
                color: var(--ui-primary);
                border-color: var(--ui-primary);
            }

            :host([color="secondary"]) {
                color: var(--ui-secondary);
                border-color: var(--ui-secondary);
            }

            :host([color="destructive"]) {
                color: var(--ui-destructive);
                border-color: var(--ui-destructive);
            }

            :host([ghost]) {
                border-color: transparent;
            }

            :host > ::slotted(*) {
                width: 100%;
                height: 100%;

                display: flex !important;
                align-items: center;
                justify-content: center;
            }
        `;
    }

    protected render() {
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

export default UIIconButton;
