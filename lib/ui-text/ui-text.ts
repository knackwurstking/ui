import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * **Tag**: `ui-text`
 *
 * **Attributes**:
 *  - casl: `number`
 *  - mono: `number`
 *  - slnt: `number`
 *  - size: `string`
 *  - family: `string`
 *
 * **Slots**:
 *  - ""
 */
@customElement("ui-text")
class UIText extends LitElement {
    /**
     * Range between 0 - 1
     */
    @property({ type: Number, attribute: "casl", reflect: true })
    casl: number = 1;

    /**
     * Range between 0 - 1
     */
    @property({ type: Number, attribute: "mono", reflect: true })
    mono: number = 0;

    /**
     * Range between -15 - 0
     */
    @property({ type: Number, attribute: "slnt", reflect: true })
    slnt: number = 0;

    @property({ type: Number, attribute: "size", reflect: true })
    size: string = "var(--ui-fontSize)";

    @property({ type: Number, attribute: "family", reflect: true })
    family: string = "var(--ui-fontFamily)";

    static get styles() {
        return css`
            :host {
                display: inline-block;
                overflow-wrap: anywhere;

                font-size: var(--ui-text_size, var(--ui-fontSize));
                font-family: var(--ui-text_family, var(--ui-fontFamily));
                font-variation-settings:
                    "CASL" var(--ui-text_casl, 1),
                    "MONO" var(--ui-text_mono, 0),
                    "slnt" var(--ui-text_slnt, 0);
            }
        `;
    }

    protected render() {
        return html`<slot></slot>`;
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
                    this.style.removeProperty(`--ui-text_${name}`);
                    return;
                }
                this.style.setProperty(`--ui-text_${name}`, value);
                break;
        }
    }
}

export { UIText };
