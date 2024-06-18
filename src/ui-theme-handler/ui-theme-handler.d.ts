/**
 * @typedef {import(".").UIMode} UIMode
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
        enableAutoMode(): void;
        disableAutoMode(): void;
        /**
         * @param {string} name
         * @param {string} href
         */
        addTheme(name: string, href: string): void;
        /**
         * @param {string} name
         */
        loadTheme(name: string): void;
        /**
         * @param {MediaQueryListEvent | MediaQueryList} ev
         */
        mediaChangeHandler(ev: MediaQueryListEvent | MediaQueryList): void;
        /**
         * @param {HTMLElement} element
         */
        removeMode(element?: HTMLElement): void;
        /**
         * @param {UIMode} mode
         * @param {HTMLElement} element
         */
        setMode(mode: UIMode, element?: HTMLElement): void;
        /**
         * @private
         */
        removeMedia(): void;
    };
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
}
export type UIMode = import(".").UIMode;
