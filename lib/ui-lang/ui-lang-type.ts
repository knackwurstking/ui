import { css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * @attribute {string} name
 * @attribute {string} href
 * @attribute {boolean} fallback
 */
@customElement("ui-lang-type")
export class UILangType extends LitElement {
    @property({ type: String, attribute: "name", reflect: true })
    name: string = "";

    @property({ type: String, attribute: "href", reflect: true })
    href: string = "";

    @property({ type: Boolean, attribute: "fallback", reflect: true })
    fallback: boolean = false;

    static get styles() {
        return css`
            :host {
                display: none;
            }
        `;
    }
}
