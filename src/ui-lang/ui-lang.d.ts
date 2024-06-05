export class UILang extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    ui: UI;
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
/**
 * @typedef {import(".").UILangType} UILangType
 */
declare class UI {
    /** @param {UILang} root */
    constructor(root: UILang);
    /** @type {UILangType | null} */
    langType: UILangType | null;
    set current(v: string);
    get current(): string;
    /** @returns {UILangType} */
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
    #private;
}
export {};
