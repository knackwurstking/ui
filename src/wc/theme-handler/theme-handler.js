/**
 * @typedef Mode
 * @type {"dark" | "light"}
 */

class UI {
    /** @type {MediaQueryList | null} */
    #media = null;

    constructor() {
        /** @type {{ name: string; href: string } | null} */
        this.currentTheme = null;

        /** @type {{ [key: string]: string }} */
        this.themes = {};
    }

    enableAutoMode() {
        this.removeMode()

        if (!!this.#media) {
            this.mediaChangeHandler(this.#media)
            return
        }

        this.#media = window.matchMedia("(prefers-color-scheme: dark)");
        this.#media.addEventListener("change", this.mediaChangeHandler);
        this.mediaChangeHandler(this.#media);
    }

    disableAutoMode() {
        this.removeMedia()
    }

    /**
     * @param {string} name
     * @param {string} href
     */
    addTheme(name, href) {
        this.themes[name] = href;
    }

    /**
     * @param {string} name
     */
    loadTheme(name) {
        if (!this.themes[name]) {
            throw `theme "${name}" is missing in this.themes`;
        }

        if (this.currentTheme?.name == name) {
            return;
        }

        {
            const link = document.getElementById("theme");
            if (!!link) {
                document.head.removeChild(link);
                this.currentTheme = null;
            }
        }

        const link = document.createElement("link");

        link.id = "theme";
        link.rel = "stylesheet";
        link.href = this.themes[name];

        document.head.appendChild(link);
        this.currentTheme = { name, href: this.themes[name] };
    }

    /**
     * @param {MediaQueryListEvent | MediaQueryList} ev
     */
    mediaChangeHandler(ev) {
        if (ev.matches) {
            document.body.setAttribute("data-theme", "dark");
        } else {
            document.body.setAttribute("data-theme", "light");
        }
    }

    /**
     * @param {HTMLElement} element
     */
    removeMode(element = document.body) {
        element.removeAttribute("data-theme");
    }

    /**
     * @param {string} mode
     * @param {HTMLElement} element
     */
    setMode(mode, element = document.body) {
        switch (mode) {
            case "dark":
                element.setAttribute("data-theme", mode);
                break;
            case "light":
                element.setAttribute("data-theme", mode);
                break;
        }
    }

    /**
     * @private
     */
    removeMedia() {
        if (!!this.#media) {
            this.#media.removeEventListener("change", this.mediaChangeHandler);
            this.#media = null;
        }
    }
}

export class ThemeHandler extends HTMLElement {

    static register = () => customElements.define("ui-theme-handler", ThemeHandler)
    static observedAttributes = ["auto", "mode"]

    constructor() {
        super();

        this.ui = new UI()
    }

    /**
     * @param {string} name
     * @param {string | null} _oldValue 
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "auto":
                if (newValue !== null) this.ui.enableAutoMode();
                else this.ui.disableAutoMode();
                break;
            case "mode":
                if (newValue !== null) this.ui.setMode(newValue);
                else this.ui.removeMode()
                break;
        }
    }
}
