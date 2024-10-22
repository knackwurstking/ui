import { css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * **Tag**: `ui-lang-type`
 *
 * **Attributes**:
 *  - name: `string`
 *  - href: `string`
 *  - fallback: `boolean`
 */
@customElement("ui-lang-type")
class UILangType extends LitElement {
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

export default UILangType;
