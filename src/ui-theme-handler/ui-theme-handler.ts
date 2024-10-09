// TODO: Convert to typescript and rewrite to Lit component

import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

const defaultTheme: UIThemeHandlerThemes = "gruvbox";

export type UIThemeHandlerThemes = "original" | "gruvbox";
export type UIThemeHandlerModes = "dark" | "light" | null;

@customElement("ui-theme-handler")
export class UIThemeHandler extends LitElement {
    @property()
    auto: boolean = false;

    @property()
    mode: UIThemeHandlerModes | null = null;

    @property()
    theme: UIThemeHandlerThemes = defaultTheme;

    attributeChangedCallback(
        name: string,
        _old: string | null,
        value: string | null,
    ): void {
        super.attributeChangedCallback(name, _old, value);

        switch (name) {
            case "auto":
                // TODO: Enable/Disable auto mode
                break;

            case "mode":
                // TODO: Set mode
                break;

            case "theme":
                // TODO: Set theme
                break;
        }
    }
}

/**
 * HTML: `ui-theme-handler`
 *
 * Attributes:
 *  - __mode__: *"dark" | "light"*
 *  - __auto__: *boolean*
 */
export class _UIThemeHandler extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-theme-handler")) {
            console.debug(`[ui] Register "ui-theme-handler" component`);
            customElements.define("ui-theme-handler", UIThemeHandler);
        }
    };

    static observedAttributes = ["auto", "mode", "theme"];

    constructor() {
        super();

        /**
         * @type {((ev: MediaQueryListEvent | MediaQueryList) => void|Promise<void>) | null}
         */
        this.mediaHandler = null;

        /**
         * @type {{ name: string; href: string } | null}
         */
        this.currentTheme = null;

        /**
         * @private
         * @type {UIThemeHandler_Mode}
         */
        this.mode = null;

        /**
         * @private
         * @type {UIThemeHandler_Theme}
         */
        this.theme = defaultTheme;

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

            /**
             * @param {UIThemeHandler_Mode} value
             */
            set mode(value) {
                this.root.setMode(value);
            },

            get theme() {
                return this.root.theme;
            },

            /**
             * @param {UIThemeHandler_Theme} value
             */
            set theme(value) {
                this.root.theme = value;
                this.root.setTheme(value || defaultTheme);
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
                // @ts-expect-error
                this.ui.mode = newValue;
                break;

            case "theme":
                // @ts-expect-error
                this.ui.theme = newValue;
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
     * @param {UIThemeHandler_Mode} value
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

    /**
     * @param {UIThemeHandler_Theme | null} value
     * @param {object} options
     * @param {HTMLElement} [options.target]
     * @param {string} [options.prefixPath]
     */
    setTheme(value, options = null) {
        options = {
            target: document.head,
            prefixPath: "/themes",
            ...(options || {}),
        };

        options.target
            .querySelectorAll(`link.theme`)
            .forEach((child) => options.target.removeChild(child));

        const link = document.createElement("link");
        link.classList.add("theme");
        link.rel = "stylesheet";
        link.href = `${options.prefixPath}/${value || defaultTheme}.css`;

        options.target.appendChild(link);
    }
}
