import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { CleanUpFunction } from "../global";
import { ripple } from "../utils";

export type UIButtonColor = "primary" | "secondary" | "destructive";
export type UIButtonVariant = "full" | "outline" | "ghost";

/**
 * @element ui-button
 *
 * @slot
 */
@customElement("ui-button")
class UIButton extends LitElement {
    @property({ type: String, attribute: "color", reflect: true })
    color?: UIButtonColor;

    @property({ type: String, attribute: "variant", reflect: true })
    variant?: UIButtonVariant;

    @property({ type: Boolean, attribute: "disabled" })
    disabled: Boolean = false;

    @property({ type: Boolean, attribute: "ripple" })
    ripple: Boolean = false;

    role: string | null = "button";

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

                display: inline-flex;
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

                padding: var(--ui-spacing) calc(var(--ui-spacing) * 2.5);
            }

            :host {
                padding: calc(var(--ui-spacing) / 2);
                width: 2.5rem;
                height: 2.5rem;
            }

            /* Button Styles: no variant */

            :host([color]) {
                border-color: transparent;
            }

            :host([color="primary"]) {
                background-color: var(--ui-primary);
                color: var(--ui-primary-text);
            }

            :host([color="secondary"]) {
                background-color: var(--ui-secondary);
                color: var(--ui-secondary-text);
            }

            :host([color="destructive"]) {
                background-color: var(--ui-destructive);
                color: var(--ui-destructive-text);
            }

            /* Button Styles: variant: "full" */

            :host([variant="full"]) {
                border-color: transparent;
            }

            :host([variant="full"][color="primary"]) {
                background-color: var(--ui-primary);
                color: var(--ui-primary-text);
            }

            :host([variant="full"][color="secondary"]) {
                background-color: var(--ui-secondary);
                color: var(--ui-secondary-text);
            }

            :host([variant="full"][color="destructive"]) {
                background-color: var(--ui-destructive);
                color: var(--ui-destructive-text);
            }

            /* Button Styles: variant: "outline" */

            :host([variant="outline"]) {
                border-color: currentColor;
                background-color: transparent;
            }

            :host([variant="outline"][color="primary"]) {
                color: var(--ui-primary);
            }

            :host([variant="outline"][color="secondary"]) {
                color: var(--ui-secondary);
            }

            :host([variant="outline"][color="destructive"]) {
                color: var(--ui-destructive);
            }

            /* Button Styles: variant: "ghost" */

            :host([variant="ghost"]) {
                border-color: transparent;
                background-color: transparent;
            }

            :host([variant="ghost"][color="primary"]) {
                color: var(--ui-primary);
            }

            :host([variant="ghost"][color="secondary"]) {
                color: var(--ui-secondary);
            }

            :host([variant="ghost"][color="destructive"]) {
                color: var(--ui-destructive);
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

export default UIButton;
