import { Events } from "../js";
import { UILangType } from "./ui-lang-type";

export class UILang extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-lang")) {
            customElements.define("ui-lang", UILang);
        }
    };

    static observedAttributes = ["current"];

    constructor() {
        super();

        this.ui = {
            /** @private */
            root: this,

            /**
             * @private
             * @type {Events<{ "change": UILangType}>}
             */
            events: new Events(),

            /**
             * @type {{
             *  [key: string]: {
             *      [key: string]: string;
             *  };
             * }}
             */
            data: {},

            /**
             *@type {UILangType | null}
             */
            langType: null,

            getCurrent() {
                return this.root.getAttribute("current");
            },

            /**
             * @param {string | null} v
             */
            setCurrent(v) {
                if (v === null) {
                    this.root.removeAttribute("current");
                    return;
                }

                this.root.setAttribute("current", v);
            },

            /**
             * @returns {UILangType}
             */
            getFallbackElement() {
                return this.root.querySelector("ui-lang-type[fallback]");
            },

            /**
             * @param {UILangType} langType
             * @param {{
             *  [key: string]: {
             *      [key: string]: string;
             *  };
             * }} data
             */
            new(langType, data) {
                this.langType = langType;
                this.data = data;
                this.events.dispatch("change", this.langType);
            },

            /**
             * @param {string} group
             * @param {string} key
             */
            get(group, key) {
                return this.data?.[group]?.[key] || null;
            },

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

                return this.events.on(key, callback);
            },
        };
    }

    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "current":
                if (newValue !== null) this.loadLanguage(newValue);
                break;
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
        if (!next.ui.getHref()) throw `Missing href attribute!`;

        const request = await fetch(next.ui.getHref());
        this.ui.new(next, await request.json());
    }
}
