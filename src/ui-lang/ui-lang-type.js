/**
 * HTML: `ui-lang-type`
 *
 * Attributes:
 *  - **name**: `string`
 *  - **href**: `string`
 *  - **fallback**: `boolean`
 */
export class UILangType extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-lang-type")) {
            customElements.define("ui-lang-type", UILangType);
        }
    };

    constructor() {
        super();

        this.ui = {
            root: this,

            get name() {
                return this.root.getAttribute("name");
            },

            set name(value) {
                if (!value) {
                    this.root.removeAttribute("name");
                    return;
                }

                this.root.setAttribute("name", value);
            },

            get href() {
                return this.root.getAttribute("href");
            },

            set href(value) {
                if (!value) {
                    this.root.removeAttribute("href");
                    return;
                }

                this.root.setAttribute("href", value);
            },

            get fallback() {
                return this.root.hasAttribute("fallback");
            },

            set fallback(value) {
                if (!value) {
                    this.root.removeAttribute("fallback");
                    return;
                }

                this.root.setAttribute("fallback", "");
            },
        };

        this.shadowRender();
    }

    shadowRender() {}
    connectedCallback() {}
    disconnectedCallback() {}
}
