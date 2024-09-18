import { Events } from "../utils";

/**
 * HTML: `ui-lang`
 *
 * Attributes:
 *  - **current**: `string`
 *
 * Slots:
 *  - \* from type `UILangType`
 */
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
            root: this,

            /**
             * @type {{
             *  [key: string]: {
             *      [key: string]: string;
             *  };
             * }}
             */
            data: {},

            /**
             * @type {Events<{ "change": import(".").UILangType}>}
             */
            events: new Events(),

            get current() {
                return this.root.getAttribute("current");
            },

            set current(value) {
                this.root.setCurrent(value || "");
            },

            /** @returns {import(".").UILangType} */
            fallback() {
                return this.root.querySelector("ui-lang-type[fallback]");
            },

            /**
             * @param {string} group
             * @param {string} key
             */
            get(group, key) {
                return this.data?.[group]?.[key] || null;
            },
        };

        this.shadowRender();
    }

    shadowRender() {}
    connectedCallback() {}
    disconnectedCallback() {}

    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "current":
                this.ui.current = newValue;
                break;
        }
    }

    /**
     * @private
     * @param {string} name
     */
    async setCurrent(name) {
        /** @type {import(".").UILangType} */
        const l =
            this.querySelector(`ui-lang-type[name="${name}"]`) ||
            this.ui.fallback();

        if (!l) return;
        if (!l.ui.href) throw `Missing href attribute!`;

        try {
            this.ui.data = await (await fetch(l.ui.href)).json();
        } catch (err) {
            console.error(err);
        }

        this.ui.events.dispatch("change", l);
    }
}
