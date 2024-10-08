import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ui-text")
export class UIText extends LitElement {
    /**
     * Range between 0 - 1
     */
    @property({ type: Number, attribute: "casl" })
    casl: number = 1;

    /**
     * Range between 0 - 1
     */
    @property({ type: Number, attribute: "mono" })
    mono: number = 0;

    /**
     * Range between -15 - 0
     */
    @property({ type: Number, attribute: "slnt" })
    slnt: number = 0;

    @property({ type: Number, attribute: "size" })
    size: string = "var(--ui-fontSize)";

    @property({ type: Number, attribute: "family" })
    family: string = "var(--ui-fontFamily)";

    static get styles() {
        return css`
            :host {
                display: inline-block;
                overflow-wrap: anywhere;

                font-size: var(--ui-text-size, var(--ui-fontSize));
                font-family: var(--ui-text-family, var(--ui-fontFamily));
                font-variation-settings:
                    "CASL" var(--ui-text-casl, 1),
                    "MONO" var(--ui-text-mono, 0),
                    "slnt" var(--ui-text-slnt, 0);
            }
        `;
    }

    render() {
        return html` <slot></slot> `;
    }

    attributeChangedCallback(
        name: string,
        _old: string | null,
        value: string | null,
    ): void {
        super.attributeChangedCallback(name, _old, value);

        switch (name) {
            case "casl":
            case "mono":
            case "slnt":
            case "size":
            case "family":
                if (value === null) {
                    this.style.removeProperty(`--ui-text-${name}`);
                    return;
                }
                this.style.setProperty(`--ui-text-${name}`, value);
                break;
        }
    }
}
