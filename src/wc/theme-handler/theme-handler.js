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

    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    connectedCallback() {
        if (this.hasAttribute("auto")) {
            this.#media = window.matchMedia("(prefers-color-scheme: dark)");
            this.removeMode()
            this.mediaChangeHandler(this.#media);
            this.#media.addEventListener("change", this.mediaChangeHandler);
        } else {
            if (!!this.#media) {
                this.#media.removeEventListener("change", this.mediaChangeHandler);
                this.#media = null;
            }

            const mode = this.getAttribute("mode");
            if (["dark", "light"].includes(mode)) {
                // @ts-ignore
                this.setMode(mode);
            }
        }
    }

    /**
     * Runs when the element is removed from the DOM
     */
    disconnectedCallback() {
        if (!!this.#media) {
            this.#media.removeEventListener("change", this.mediaChangeHandler);
            this.#media = null;
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
     * @param {HTMLElement} element
     */
    removeMode(element = document.body) {
        element.removeAttribute("data-theme");
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
