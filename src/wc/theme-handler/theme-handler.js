/**
 * @typedef Mode
 * @type {"dark" | "light"}
 */

export class ThemeHandler extends HTMLElement {
    /** @type {MediaQueryList | null} */
    #media = null;

    constructor() {
        super();

        /** @type {{ name: string; href: string } | null} */
        this.currentTheme = null;

        /** @type {{ [key: string]: string }} */
        this.themes = {};
    }

    /** @type {boolean} state */
    set auto(state) {
        if (state) {
            this.setAttribute("auto", "");
            this.#removeMode()

            if (!!this.#media) {
                this.mediaChangeHandler(this.#media)
                return
            }

            this.#media = window.matchMedia("(prefers-color-scheme: dark)");
            this.#media.addEventListener("change", this.mediaChangeHandler);
            this.mediaChangeHandler(this.#media);
        } else {
            this.removeAttribute("auto");
            this.#removeMedia()
        }
    }

    get auto() {
        return this.hasAttribute("auto");
    }

    /** @param {string} mode */
    set mode(mode) {
        this.setAttribute("mode", mode)
        this.#setMode(mode);
    }

    get mode() {
        return this.getAttribute("mode");
    }

    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    connectedCallback() {
        if (this.auto) {
            this.auto = this.auto
        } else {
            this.#removeMedia()
            this.mode = this.mode
        }
    }

    /**
     * Runs when the element is removed from the DOM
     */
    disconnectedCallback() {
        this.#removeMedia()
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
                document.removeChild(link);
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
    #removeMode(element = document.body) {
        element.removeAttribute("data-theme");
    }

    /**
     * @param {string} mode
     * @param {HTMLElement} element
     */
    #setMode(mode, element = document.body) {
        switch (mode) {
            case "dark":
                element.setAttribute("data-theme", mode);
                break;
            case "light":
                element.setAttribute("data-theme", mode);
                break;
        }
    }

    #removeMedia() {
        if (!!this.#media) {
            this.#media.removeEventListener("change", this.mediaChangeHandler);
            this.#media = null;
        }
    }
}
