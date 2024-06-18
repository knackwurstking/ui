export class UILangType extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-lang-type")) {
            customElements.define("ui-lang-type", UILangType);
        }
    };

    constructor() {
        super();

        this.ui = {
            /** @private */
            root: this,

            getName() {
                return this.root.getAttribute("name");
            },

            /**
             * @param {string | null} value
             */
            setName(value) {
                if (value === null) {
                    this.root.removeAttribute("name");
                    return;
                }

                this.root.setAttribute("name", value);
            },

            getHref() {
                return this.root.getAttribute("href");
            },

            /**
             * @param {string | null} value
             */
            setHref(value) {
                if (value === null) {
                    this.root.removeAttribute("href");
                    return;
                }

                this.root.setAttribute("href", value);
            },

            getFallback() {
                return this.root.hasAttribute("fallback");
            },

            /**
             * @param {boolean} state
             */
            setFallback(state) {
                if (!state) {
                    this.root.removeAttribute("fallback");
                    return;
                }

                this.root.setAttribute("fallback", "");
            },
        };
    }
}
