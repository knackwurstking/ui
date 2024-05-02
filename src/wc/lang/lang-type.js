class UI {
    /** @type {LangType} */
    #root

    /**
    * @param {LangType} root
    */
    constructor(root) {
        this.#root = root
    }

    get name() {
        return this.#root.getAttribute("name")
    }

    set name(value) {
        this.#root.setAttribute("name", value)
    }

    get href() {
        return this.#root.getAttribute("href")
    }

    set href(value) {
        this.#root.setAttribute("href", value)
    }

    get fallback() {
        return this.#root.hasAttribute("fallback")
    }

    set fallback(state) {
        if (!!state) {
            this.#root.setAttribute("fallback", "")
        } else {
            this.#root.removeAttribute("fallback")
        }
    }
}

export class LangType extends HTMLElement {

    static register = () => customElements.define("ui-lang-type", LangType);

    constructor() {
        super();

        this.ui = new UI(this)
    }
}
