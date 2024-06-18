// TODO: Continue here...
class UI {
    /** @type {UILangType} */
    #root;

    /**
     * @param {UILangType} root
     */
    constructor(root) {
        this.#root = root;
    }

    get name() {
        return this.#root.getAttribute("name");
    }

    set name(value) {
        this.#root.setAttribute("name", value);
    }

    get href() {
        return this.#root.getAttribute("href");
    }

    set href(value) {
        this.#root.setAttribute("href", value);
    }

    get fallback() {
        return this.#root.hasAttribute("fallback");
    }

    set fallback(state) {
        if (!!state) {
            this.#root.setAttribute("fallback", "");
        } else {
            this.#root.removeAttribute("fallback");
        }
    }
}

export class UILangType extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-lang-type")) {
            customElements.define("ui-lang-type", UILangType);
        }
    };

    constructor() {
        super();

        this.ui = new UI(this);
    }
}
