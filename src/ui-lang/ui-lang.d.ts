/**
 * HTML: `ui-lang`
 *
 * Attributes:
 *  - current: string
 *
 * Slots:
 *  - * from type `UILangType`
 */
export class UILang extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    ui: {
        root: this;
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
         * @type {Events<{ "change": import(".").UILangType}>}
         */
        events: Events<{
            "change": import(".").UILangType;
        }>;
        current: string;
        /** @returns {import(".").UILangType} */
        fallback(): import(".").UILangType;
        /**
         * @param {string} group
         * @param {string} key
         */
        get(group: string, key: string): string;
    };
    shadowRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
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
    private setCurrent;
    data: Promise<any>;
}
import { Events } from "../utils";
