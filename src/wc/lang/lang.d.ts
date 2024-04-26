export class Lang extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    data: Data;
    attributeChangedCallback(name: any, _oldValue: any, newValue: any): void;
    /** @returns {import("./lang-type").LangType} */
    getFallbackElement(): import("./lang-type").LangType;
    #private;
}
declare class Data {
    /** @type {import("./lang-type").LangType | null} */
    langType: import("./lang-type").LangType | null;
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