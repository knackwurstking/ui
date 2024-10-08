// TODO: Convert to typescript
/**
 * HTML: `ui-lang-type`
 *
 * Attributes:
 *  - __name__: *string*
 *  - __href__: *string*
 *  - __fallback__: *boolean*
 */
export class UILangType extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-lang-type")) {
            console.debug(`[ui] Register "ui-lang-type" component`);
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
    }

    connectedCallback() {}
    disconnectedCallback() {}
}

UILangType.register();
