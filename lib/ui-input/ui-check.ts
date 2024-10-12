import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ui-check")
export class UICheck extends LitElement {
    @property({ type: Boolean, attribute: "checked" })
    checked: boolean = false;

    static get styles() {
        return css`
            input {
                display: inline-block;

                height: 1.5rem;
                width: 1.5rem;

                padding: var(--ui-spacing) calc(var(--ui-spacing) * 2);

                border: 1px solid hsl(var(--ui-hsl-primary));
                border-radius: var(--ui-radius);

                accent-color: hsl(var(--ui-hsl-primary));
                color: hsl(var(--ui-hsl-fg));
                background-color: transparent;

                box-shadow: none;
                outline: none;
                cursor: pointer;

                transition: border-color 0.25s linear;
            }

            input:disabled {
                cursor: default;
                user-select: none;
            }
        `;
    }

    protected render() {
        this.setAttribute("role", "checkbox");

        return html`
            <input type="checkbox"></input>
        `;
    }

    attributeChangedCallback(
        name: string,
        _old: string | null,
        value: string | null,
    ): void {
        super.attributeChangedCallback(name, _old, value);

        switch (name) {
            case "checked":
                if (this.shadowRoot) {
                    this.shadowRoot.querySelector("input")!.checked =
                        value !== null;
                }
                break;
        }
    }

    click() {
        this.shadowRoot?.querySelector("input")!.click();
    }
}
