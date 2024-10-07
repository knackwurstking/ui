/**
 * @typedef UIThemeHandler_Mode
 * @type {"dark" | "light" | null}
 *
 * @typedef UIThemeHandler_Theme
 * @type {"original" | "gruvbox"}
 */
/**
 * HTML: `ui-theme-handler`
 *
 * Attributes:
 *  - __mode__: *"dark" | "light"*
 *  - __auto__: *boolean*
 */
export class UIThemeHandler extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    /**
     * @type {((ev: MediaQueryListEvent | MediaQueryList) => void|Promise<void>) | null}
     */
    mediaHandler: ((ev: MediaQueryListEvent | MediaQueryList) => void | Promise<void>) | null;
    /**
     * @type {{ [key: string]: string }}
     */
    themes: {
        [key: string]: string;
    };
    /**
     * @type {{ name: string; href: string } | null}
     */
    currentTheme: {
        name: string;
        href: string;
    } | null;
    /**
     * @private
     * @type {UIThemeHandler_Mode}
     */
    private mode;
    /**
     * @private
     * @type {UIThemeHandler_Theme}
     */
    private theme;
    ui: {
        root: this;
        auto: boolean;
        mode: UIThemeHandler_Mode;
        theme: UIThemeHandler_Theme;
        /**
         * @param {string} themeName
         * @param {string} href
         */
        add(themeName: string, href: string): void;
        /**
         * @param {string} themeName
         */
        set(themeName: string): void;
    };
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    /**
     * @param {boolean} state
     * @param {HTMLElement} target
     */
    setAuto(state: boolean, target?: HTMLElement): void;
    media: MediaQueryList;
    /**
     * @param {UIThemeHandler_Mode} value
     * @param {HTMLElement} target
     */
    setMode(value: UIThemeHandler_Mode, target?: HTMLElement): void;
    /**
     * @param {UIThemeHandler_Theme} value
     * @param {HTMLElement} target
     */
    setTheme(value: UIThemeHandler_Theme, target?: HTMLElement): void;
}
export type UIThemeHandler_Mode = "dark" | "light" | null;
export type UIThemeHandler_Theme = "original" | "gruvbox";
