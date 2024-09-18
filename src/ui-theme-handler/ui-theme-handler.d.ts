/**
 * @typedef UIThemeHandler_Mode
 * @type {"dark" | "light" | null}
 */
/**
 * HTML: `ui-theme-handler`
 *
 * Attributes:
 *  - **mode**: "dark" | "light"
 *  - **auto**: `boolean`
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
    /** @private */
    private mode;
    ui: {
        root: this;
        auto: boolean;
        mode: string;
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
    shadowRender(): void;
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
     * @param {string | null} value
     * @param {HTMLElement} target
     */
    setMode(value: string | null, target?: HTMLElement): void;
}
export type UIThemeHandler_Mode = "dark" | "light" | null;
