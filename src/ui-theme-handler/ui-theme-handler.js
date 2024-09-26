/**
 * @typedef UIThemeHandler_Mode
 * @type {"dark" | "light" | null}
 */

/**
 * HTML: `ui-theme-handler`
 *
 * Attributes:
 *  - __mode__: *"dark" | "light"*
 *  - __auto__: *boolean*
 */
export class UIThemeHandler extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-theme-handler")) {
            customElements.define("ui-theme-handler", UIThemeHandler);
        }
    };

    static observedAttributes = ["auto", "mode"];

    constructor() {
        super();

        /**
         * @type {((ev: MediaQueryListEvent | MediaQueryList) => void|Promise<void>) | null}
         */
        this.mediaHandler = null;

        /**
         * @type {{ [key: string]: string }}
         */
        this.themes = {};

        /**
         * @type {{ name: string; href: string } | null}
         */
        this.currentTheme = null;

        /** @private */
        this.mode = "";

        this.ui = {
            root: this,

            get auto() {
                return !!this.root.media;
            },

            set auto(value) {
                this.root.setAuto(value);
            },

            get mode() {
                return this.root.mode;
            },

            set mode(value) {
                this.root.setMode(value);
            },

            /**
             * @param {string} themeName
             * @param {string} href
             */
            add(themeName, href) {
                this.root.themes[themeName] = href;
            },

            /**
             * @param {string} themeName
             */
            set(themeName) {
                if (!this.root.themes[themeName]) {
                    throw `theme "${themeName}" is missing in this.themes`;
                }

                if (this.root.currentTheme?.name == themeName) {
                    return;
                }

                {
                    const link = document.getElementById("theme");
                    if (!!link) {
                        document.head.removeChild(link);
                        this.root.currentTheme = null;
                    }
                }

                const link = document.createElement("link");

                link.id = "theme";
                link.rel = "stylesheet";
                link.href = this.root.themes[themeName];

                document.head.appendChild(link);
                this.root.currentTheme = {
                    name: themeName,
                    href: this.root.themes[themeName],
                };
            },
        };
    }

    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "auto":
                this.ui.auto = newValue !== null;
                break;

            case "mode":
                this.ui.mode = newValue;
                break;
        }
    }

    /**
     * @param {boolean} state
     * @param {HTMLElement} target
     */
    setAuto(state, target = document.body) {
        if (!state) {
            if (!this.media) return;

            this.media.removeEventListener("change", this.mediaHandler);

            this.media = null;
            this.mediaHandler = null;
            return;
        }

        this.setMode(null, target);

        if (!!this.media) {
            this.mediaHandler(this.media);
            return;
        }

        /**
         * @param {MediaQueryListEvent | MediaQueryList} ev
         */
        this.mediaHandler = (ev) => {
            if (ev.matches) {
                target.setAttribute("data-theme", "dark");
            } else {
                target.setAttribute("data-theme", "light");
            }
        };

        this.media = window.matchMedia("(prefers-color-scheme: dark)");
        this.media.addEventListener("change", this.mediaHandler);
        this.mediaHandler(this.media);
    }

    /**
     * @param {string | null} value
     * @param {HTMLElement} target
     */
    setMode(value, target = document.body) {
        this.mode = value;
        if (!this.mode) {
            target.removeAttribute("data-theme");
        } else {
            target.setAttribute("data-theme", value);
        }
    }
}
