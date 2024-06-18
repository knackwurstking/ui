/**
 * @typedef {import(".").UILangType} UILangType
 */
export class UILang extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    ui: {
        /** @private */
        root: this;
        /**
         * @private
         * @type {Events<{ "change": UILangType}>}
         */
        events: Events<{
            "change": UILangType;
        }>;
        /**
         * @type {{
         *  [key: string]: {
         *      [key: string]: string;
         *  };
         * }}
         */
        data: {
            [key: string]: {
                [key: string]: string;
            };
        };
        /**
         *@type {UILangType | null}
         */
        langType: UILangType | null;
        getCurrent(): string;
        /**
         * @param {string | null} v
         */
        setCurrent(v: string | null): void;
        /**
         * @returns {UILangType}
         */
        getFallbackElement(): UILangType;
        /**
         * @param {UILangType} langType
         * @param {{
         *  [key: string]: {
         *      [key: string]: string;
         *  };
         * }} data
         */
        "new"(langType: UILangType, data: {
            [key: string]: {
                [key: string]: string;
            };
        }): void;
        /**
         * @param {string} group
         * @param {string} key
         */
        get(group: string, key: string): string;
        /**
         * @param {"change"} key
         * @param {(langType: UILangType | null) => void|Promise<void>} callback
         * @param {boolean} [trigger] - this will run the callback first
         * @returns {() => void} clean up function
         */
        on(key: "change", callback: (langType: UILangType | null) => void | Promise<void>, trigger?: boolean): () => void;
    };
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    /**
     * @private
     * @param {string} name
     */
    private loadLanguage;
}
export type UILangType = import(".").UILangType;
import { Events } from "../js";
