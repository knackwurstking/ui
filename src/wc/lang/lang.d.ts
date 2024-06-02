export class Lang extends HTMLElement {
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
declare class UI {
    /** @param {Lang} root */
    constructor(root: Lang);
    /** @type {import("./lang-type").LangType | null} */
    langType: import("./lang-type").LangType | null;
    set current(v: string);
    get current(): string;
    /** @returns {import("./lang-type").LangType} */
    getFallbackElement(): import("./lang-type").LangType;
    /**
     * @param {import("./lang-type").LangType} langType
     * @param {{
     *  [key: string]: {
     *      [key: string]: string;
     *  };
     * }} data
     */
    "new"(langType: import("./lang-type").LangType, data: {
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
     * @param {(langType: import("./lang-type").LangType | null) => void|Promise<void>} callback
     * @param {boolean} [trigger] - this will run the callback first
     * @returns {() => void} clean up function
     */
    on(key: "change", callback: (langType: import("./lang-type").LangType | null) => void | Promise<void>, trigger?: boolean): () => void;
    #private;
}
export {};
