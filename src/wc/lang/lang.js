import { Events } from "../../js/events";

class Data {
    #events
    /**
     * @type {{
     *  [key: string]: {
     *      [key: string]: string;
     *  };
     * }}
     */
    #data

    constructor() {
        this.#events = new Events()

        /** @type {import("./lang-type").LangType | null} */
        this.langType = null;
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
    constructor() {
        super();

        this.data = new Data()
    }

    set current(name) {
        this.setAttribute("current", name)
        this.#loadLanguage(name)
    }

    get current() {
        return this.getAttribute("current")
    }

    /** @returns {import("./lang-type").LangType} */
    get fallback() {
        return this.querySelector("ui-lang-type[fallback]")
    }

    connectedCallback() {
        this.current = this.current
    }

    /** @param {string} name */
    async #loadLanguage(name) {
        /** @type {import("./lang-type").LangType} */
        const next =
            this.querySelector(`ui-lang-type[name="${name}"]`) ||
            this.fallback;

        if (!next) return;
        if (!next.href) throw `Missing href attribute!`;

        const request = await fetch(next.href)
        this.data.new(next, await request.json())
    }
}
