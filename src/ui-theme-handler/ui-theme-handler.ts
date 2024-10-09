import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

const defaultTheme: UIThemeHandlerThemes = "gruvbox";

export type UIThemeHandlerThemes = "original" | "gruvbox";
export type UIThemeHandlerModes = "dark" | "light" | null;

@customElement("ui-theme-handler")
export class UIThemeHandler extends LitElement {
    private get target(): HTMLElement {
        return document.body;
    }

    private media: MediaQueryList | null = null;

    private get mediaHandler() {
        return (ev: MediaQueryListEvent | MediaQueryList) => {
            if (ev.matches) {
                this.target.setAttribute("data-theme", "dark");
            } else {
                this.target.setAttribute("data-theme", "light");
            }
        };
    }

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
        if (!this.auto) {
            if (!this.media) return;
            this.media.removeEventListener("change", this.mediaHandler);
            this.media = null;
            return;
        }

        this.mode = null;

        if (!!this.media) {
            this.mediaHandler(this.media);
            return;
        }

        this.media = window.matchMedia("(prefers-color-scheme: dark)");
        this.media.addEventListener("change", this.mediaHandler);
        this.mediaHandler(this.media);
    }

    private handleMode(): void {
        if (!this.mode) {
            this.target.removeAttribute("data-theme");
        } else {
            this.target.setAttribute("data-theme", this.mode);
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
