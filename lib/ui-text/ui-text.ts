import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * @element ui-text
 *
 * @slot - Any kind of text
 */
@customElement("ui-text")
class UIText extends LitElement {
    @property({ type: Number, attribute: "family", reflect: true })
    family: string = "var(--ui-fontFamily)";

    @property({ type: Number, attribute: "size", reflect: true })
    size: string = "var(--ui-fontSize)";

    /**
     * Range between 0 - 1
     */
    @property({ type: Number, attribute: "mono", reflect: true })
    mono: number = 0;

    /**
     * Range between 0 - 1
     */
    @property({ type: Number, attribute: "casl", reflect: true })
    casl: number = 1;

    @property({ type: Number, attribute: "wght", reflect: true })
    wght: number = 400;

    /**
     * Range between -15 - 0
     */
    @property({ type: Number, attribute: "slnt", reflect: true })
    slnt: number = 0;

    /**
     * Range between 0 / 0.5 / 1
     */
    @property({ type: Number, attribute: "crsv", reflect: true })
    crsv: number = 0.5;

    static get styles() {
        return css`
            :host {
                display: inline-block;
                overflow-wrap: anywhere;

                font-family: var(--_family) !important;
                font-size: var(--_size) !important;
                font-variation-settings:
                    "MONO" var(--_mono),
                    "CASL" var(--_casl),
                    "wght" var(--_wght),
                    "slnt" var(--_slnt),
                    "CRSV" var(--_crsv) !important;
            }
        `;
    }

    protected render() {
        this.style.setProperty("--_family", this.family);
        this.style.setProperty("--_size", this.size);
        this.style.setProperty("--_mono", this.mono.toString());
        this.style.setProperty("--_casl", this.casl.toString());
        this.style.setProperty("--_wght", this.wght.toString());
        this.style.setProperty("--_slnt", this.slnt.toString());
        this.style.setProperty("--_crsv", this.crsv.toString());

        return html`<slot></slot>`;
    }
}

export default UIText;
