import { Events } from "../../js/events";

class UI {
    /** @type {Lang} */
    #root

    /**
     * @type {Events<{ "change": import("./lang-type").LangType}>}
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

    /** @param {Lang} root */
    constructor(root) {
        this.#root = root
        this.#events = new Events()

        /** @type {import("./lang-type").LangType | null} */
        this.langType = null;
    }

    /** @returns {import("./lang-type").LangType} */
    getFallbackElement() {
        return this.#root.querySelector("ui-lang-type[fallback]")
    }

    /**
     * @param {import("./lang-type").LangType} langType
     * @param {{
     *  [key: string]: {
     *      [key: string]: string;
     *  };
     * }} data
     */
    new(langType, data) {
        this.langType = langType
        this.#data = data;
        this.#events.dispatchWithData("change", this.langType)
    }

    /**
     * @param {string} group
     * @param {string} key
     */
    get(group, key) {
        return this.#data?.[group][key]
    }

    /**
     * @param {"change"} key
     * @param {(langType: import("./lang-type").LangType | null) => void|Promise<void>} callback
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

        return this.#events.addListener(key, callback);
    }
}


export class Lang extends HTMLElement {

    static register = () => customElements.define("ui-lang", Lang);
    static observedAttributes = ["current"]

    constructor() {
        super();

        this.ui = new UI(this)
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "current":
                if (newValue !== null) this.#loadLanguage(newValue)
                break
        }
    }

    /** @param {string} name */
    async #loadLanguage(name) {
        /** @type {import("./lang-type").LangType} */
        const next =
            this.querySelector(`ui-lang-type[name="${name}"]`) ||
            this.ui.getFallbackElement();

        if (!next) return;
        if (!next.ui.href) throw `Missing href attribute!`;

        const request = await fetch(next.ui.href)
        this.ui.new(next, await request.json())
    }
}
