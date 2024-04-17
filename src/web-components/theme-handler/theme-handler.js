export class ThemeHandler extends HTMLElement {
    constructor() {
        super();

        /** @type {{ name: string; href: string } | null} */
        this.currentTheme = null;

        /** @type {{ [key: string]: string }} */
        this.themes = {};

        /** @type {MediaQueryList | null} */
        this._media = null;
    }

    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    connectedCallback() {
        this._media = window.matchMedia("(prefers-color-scheme: dark)");
        this.mediaChangeHandler(this._media);
        if (this.hasAttribute("auto")) {
            this._media.addEventListener("change", this.mediaChangeHandler);
        }
    }

    /**
     * Runs when the element is removed from the DOM
     */
    disconnectedCallback() {
        if (!!this._media && !!this.mediaChangeHandler) {
            this._media.removeEventListener("change", this.mediaChangeHandler);
            this._media = null;
        }
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
     * @param {"dark" | "light"} mode
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
     * @param {MediaQueryListEvent | MediaQueryList} ev
     */
    mediaChangeHandler(ev) {
        if (ev.matches) {
            document.body.setAttribute("data-theme", "dark");
        } else {
            document.body.setAttribute("data-theme", "light");
        }
    }
}
