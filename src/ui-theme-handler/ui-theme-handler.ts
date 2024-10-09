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
                this.handleAuto();
                break;

            case "mode":
                this.handleMode();
                break;

            case "theme":
                this.handleTheme();
                break;
        }
    }

    private handleAuto(): void {
        const target: HTMLElement = document.body;

        // TODO: Enable/Disable auto mode
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

    private handleMode(): void {
        const target: HTMLElement = document.body;

        // TODO: Set mode
        this.mode = value;
        if (!this.mode) {
            target.removeAttribute("data-theme");
        } else {
            target.setAttribute("data-theme", value);
        }
    }

    private handleTheme(): void {
        const target: HTMLElement = document.head;
        const prefixPath: string = "/themes";

        target.querySelectorAll(`link.theme`).forEach((child) => {
            target.removeChild(child);
        });

        const link = document.createElement("link");
        {
            link.classList.add("theme");
            link.rel = "stylesheet";
            link.href = `${prefixPath}/${this.theme || defaultTheme}.css`;
        }
        target.appendChild(link);
    }
}
