/**
 * @typedef Modes
 * @type {"dark" | "light"}
 */
export class ThemeHandler {
    /** @type {{ name: string; href: string } | null} */
    currentTheme: {
        name: string;
        href: string;
    } | null;
    /** @type {{ [key: string]: string }[]} */
    themes: {
        [key: string]: string;
    }[];
    /** @type {MediaQueryList | null} */
    _media: MediaQueryList | null;
    _mediaChangeHandler: (ev: any) => void;
    addTheme(name: any, href: any): this;
    loadTheme(name: any): this;
    /**
     * @param {Modes} mode
     * @param {HTMLElement} element
     */
    setMode(mode: Modes, element?: HTMLElement): void;
    start(): this;
    stop(): this;
}
export type Modes = "dark" | "light";
