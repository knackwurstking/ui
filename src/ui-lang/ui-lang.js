import { Events } from "../js";

/**
 * @typedef {import(".").UILangType} UILangType
 */

class UI {
    /** @type {UILang} */
    #root

    /**
     * @type {Events<{ "change": UILangType}>}
     */
    #events

    /**
     * @type {{
     *  [key: string]: {
     *      [key: string]: string;
     *  };
     * }}
     */
    #data

    /** @param {UILang} root */
    constructor(root) {
        this.#root = root
        this.#events = new Events()

        /** @type {UILangType | null} */
        this.langType = null;
    }

    get current() {
        return this.#root.getAttribute("current");
    }

    set current(v) {
        if (v === null) {
            this.#root.removeAttribute("current");
        } else {
            this.#root.setAttribute("current", v);
        }
    }

    /** @returns {UILangType} */
    getFallbackElement() {
        return this.#root.querySelector("ui-lang-type[fallback]")
    }

    /**
     * @param {UILangType} langType
     * @param {{
     *  [key: string]: {
     *      [key: string]: string;
     *  };
     * }} data
     */
    new(langType, data) {
        this.langType = langType
        this.#data = data;
        this.#events.dispatch("change", this.langType)
    }

    /**
     * @param {string} group
     * @param {string} key
     */
    get(group, key) {
        return this.#data?.[group]?.[key] || null;
    }

    /**
     * @param {"change"} key
     * @param {(langType: UILangType | null) => void|Promise<void>} callback
     * @param {boolean} [trigger] - this will run the callback first
     * @returns {() => void} clean up function
     */
    on(key, callback, trigger = false) {
        if (typeof callback !== "function") {
            throw `callback is not a function`;
        }

        if (trigger) {
            callback(this.langType);
        }

        return this.#events.on(key, callback);
    }
}


export class UILang extends HTMLElement {

    static register = () => {
        if (!customElements.get("ui-lang")) {
            customElements.define("ui-lang", UILang);
        }
    };

    static observedAttributes = ["current"]

    constructor() {
        super();

        this.ui = new UI(this)
    }

    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "current":
                if (newValue !== null) this.loadLanguage(newValue)
                break
        }
    }

    /**
     * @private
     * @param {string} name
     */
    async loadLanguage(name) {
        /** @type {UILangType} */
        const next =
            this.querySelector(`ui-lang-type[name="${name}"]`) ||
            this.ui.getFallbackElement();

        if (!next) return;
        if (!next.ui.href) throw `Missing href attribute!`;

        const request = await fetch(next.ui.href)
        this.ui.new(next, await request.json())
    }
}
