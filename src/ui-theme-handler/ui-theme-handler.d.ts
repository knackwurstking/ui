/**
 * @typedef UIThemeHandlerMode
 * @type {"dark" | "light" | null}
 */
export class UIThemeHandler extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    ui: {
        /**
         * @private
         * @type {MediaQueryList | null}
         */
        media: MediaQueryList | null;
        /**
         * @type {{ name: string; href: string } | null}
         */
        currentTheme: {
            name: string;
            href: string;
        } | null;
        /**
         * @type {{ [key: string]: string }}
         */
        themes: {
            [key: string]: string;
        };
        /**
         * @param {HTMLElement} [element]
         */
        getMode(element?: HTMLElement): string;
        /**
         * @param {UIThemeHandlerMode} mode
         * @param {HTMLElement} [element]
         */
        setMode(mode: UIThemeHandlerMode, element?: HTMLElement): void;
        /**
         * @private
         * @param {MediaQueryListEvent | MediaQueryList} ev
         */
        mediaChangeHandler: (ev: MediaQueryListEvent | MediaQueryList) => void;
        getAuto(): boolean;
        /**
         * @param {boolean} state
         * @param {HTMLElement} [element]
         */
        setAuto(state: boolean, element?: HTMLElement): void;
        /**
         * @param {string} name
         * @param {string} href
         */
        addTheme(name: string, href: string): void;
        /**
         * @param {string} name
         */
        setTheme(name: string): void;
    };
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
}
export type UIThemeHandlerMode = "dark" | "light" | null;
