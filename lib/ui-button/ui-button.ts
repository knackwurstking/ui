import { html, LitElement } from "lit";
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
