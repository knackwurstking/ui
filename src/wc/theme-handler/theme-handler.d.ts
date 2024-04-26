export class ThemeHandler extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    ui: UI;
    attributeChangedCallback(name: any, _oldValue: any, newValue: any): void;
}
export type Mode = "dark" | "light";
/**
 * @typedef Mode
 * @type {"dark" | "light"}
 */
declare class UI {
    /** @type {{ name: string; href: string } | null} */
    currentTheme: {
        name: string;
        href: string;
    } | null;
    /** @type {{ [key: string]: string }} */
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
     * @param {string} mode
     * @param {HTMLElement} element
     */
    setMode(mode: string, element?: HTMLElement): void;
    #private;
}
export {};
