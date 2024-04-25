/**
 * @typedef Mode
 * @type {"dark" | "light"}
 */
export class ThemeHandler extends HTMLElement {
    /** @type {{ name: string; href: string } | null} */
    currentTheme: {
        name: string;
        href: string;
    } | null;
    /** @type {{ [key: string]: string }} */
    themes: {
        [key: string]: string;
    };
    /** @type {boolean} state */
    set auto(state: boolean);
    get auto(): boolean;
    /** @param {string} mode */
    set mode(mode: string);
    get mode(): string;
    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    connectedCallback(): void;
    /**
     * Runs when the element is removed from the DOM
     */
    disconnectedCallback(): void;
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
    #private;
}
export type Mode = "dark" | "light";
