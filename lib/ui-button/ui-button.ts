import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { CleanUpFunction } from "../global";
import { ripple } from "../utils";

export type UIButtonColor = "primary" | "secondary" | "destructive";
export type UIButtonVariant = "full" | "outline" | "ghost";

@customElement("ui-button")
export class UIButton extends LitElement {
    private rippleCleanUp: CleanUpFunction | null = null;

    @property({ type: Boolean, attribute: "ripple" })
    ripple: Boolean = false;

    static get styles() {
        return css`
            :host {
                display: flex;
                align-items: center;
                justify-content: center;

                position: relative;

                padding: var(--ui-spacing) calc(var(--ui-spacing) * 2.5);

                outline: none;
                border: 1px solid currentColor;
                border-radius: var(--ui-radius);

                user-select: none;
                overflow: hidden;
                cursor: pointer;

                text-transform: capitalize;
                font-size: 1.1rem;
                font-weight: 450;
                font-family: var(--ui-fontFamily);
                font-variation-settings: var(--ui-button-fontVariation);
            }

            :host([variant="full"]) {
                border: none;
            }

            :host([variant="full"][color="primary"]) {
                background-color: var(--ui-primary);
                color: var(--ui-primary-fg);
            }

            :host([variant="full"][color="secondary"]) {
                background-color: var(--ui-secondary);
                color: var(--ui-secondary-fg);
            }

            :host([variant="full"][color="destructive"]) {
                background-color: var(--ui-destructive);
                color: var(--ui-destructive-fg);
            }

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

            :host([variant="ghost"]) {
                border-color: transparent;
                background-color: transparent;
                font-weight: 900;
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

            :host([disabled]),
            :host([disabled]:hover),
            :host([disabled]:active) {
                background-color: transparent;
                opacity: 0.25;
                cursor: default;
                pointer-events: none;
            }
        `;
    }

    protected render() {
        this.setAttribute("role", "button");
        return html`<slot></slot>`;
    }

    attributeChangedCallback(
        name: string,
        _old: string | null,
        value: string | null,
    ): void {
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

    // TODO: Find out how to do this with lit
    public get color(): string | null {
        return this.getAttribute("color") || null;
    }

    public set color(value: UIButtonColor | null) {
        if (!value) {
            this.removeAttribute("color");
            return;
        }

        this.setAttribute("color", value);
    }

    public get variant(): string | null {
        return this.getAttribute("variant") || null;
    }

    public set variant(value: UIButtonVariant | null) {
        if (!value) {
            this.removeAttribute("variant");
            return;
        }

        this.setAttribute("variant", value);
    }

    public get disabled() {
        return this.hasAttribute("disabled");
    }

    public set disabled(state: boolean) {
        if (!state) {
            this.removeAttribute("disabled");
            return;
        }

        this.setAttribute("disabled", "");
    }
}
