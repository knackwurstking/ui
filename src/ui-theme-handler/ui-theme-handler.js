/**
 * @typedef UIThemeHandlerMode
 * @type {"dark" | "light" | null}
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

        this.ui = {
            /**
             * @private
             * @type {MediaQueryList | null}
             */
            media: null,

            /**
             * @type {{ name: string; href: string } | null}
             */
            currentTheme: null,

            /**
             * @type {{ [key: string]: string }}
             */
            themes: {},

            /**
             * @param {HTMLElement} [element]
             */
            getMode(element = document.body) {
                return element.getAttribute("data-theme");
            },

            /**
             * @param {UIThemeHandlerMode} mode
             * @param {HTMLElement} [element]
             */
            setMode(mode, element = document.body) {
                switch (mode) {
                    case "dark":
                        element.setAttribute("data-theme", mode);
                        break;
                    case "light":
                        element.setAttribute("data-theme", mode);
                        break;
                    default:
                        element.removeAttribute("data-theme");
                }
            },

            /**
             * @private
             * @param {MediaQueryListEvent | MediaQueryList} ev
             */
            mediaChangeHandler: (ev) => {
                if (ev.matches) {
                    document.body.setAttribute("data-theme", "dark");
                } else {
                    document.body.setAttribute("data-theme", "light");
                }
            },

            getAuto() {
                return !!this.media;
            },

            /**
             * @param {boolean} state
             * @param {HTMLElement} [element]
             */
            setAuto(state, element = document.body) {
                if (!state) {
                    if (!this.media) return;

                    this.media.removeEventListener(
                        "change",
                        this.mediaChangeHandler,
                    );

                    this.media = null;
                    return;
                }

                this.setMode(null, element);

                if (!!this.media) {
                    this.mediaChangeHandler(this.media);
                    return;
                }

                this.media = window.matchMedia("(prefers-color-scheme: dark)");
                this.media.addEventListener("change", this.mediaChangeHandler);
                this.mediaChangeHandler(this.media);
            },

            /**
             * @param {string} name
             * @param {string} href
             */
            addTheme(name, href) {
                this.themes[name] = href;
            },

            /**
             * @param {string} name
             */
            setTheme(name) {
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
                this.ui.setAuto(newValue !== null);
                break;
            case "mode":
                // @ts-expect-error
                this.ui.setMode(newValue);
                break;
        }
    }
}
