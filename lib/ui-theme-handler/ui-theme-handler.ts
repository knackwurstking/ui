import { css, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

export type UIThemeHandlerTheme = "original" | "gruvbox";
export type UIThemeHandlerMode = "dark" | "light" | null;

/**
 * **Tag**: `ui-theme-handler`
 *
 * **Attributes**:
 *  - auto: `boolean`
 *  - mode: `"dark" | "light"`
 *  - theme: `"original" | "gruvbox"`
 */
@customElement("ui-theme-handler")
class UIThemeHandler extends LitElement {
    @property({ type: Boolean, attribute: "auto", reflect: true })
    auto: boolean = false;

    @property({ type: String, attribute: "mode", reflect: true })
    mode: UIThemeHandlerMode | null = null;

    @property({ type: String, attribute: "theme", reflect: true })
    theme: UIThemeHandlerTheme = "original";

    @property({ type: String, attribute: "themes-path", reflect: true })
    themesPath: string = "/themes";

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

    static get styles() {
        return css`
            :host {
                display: none;
            }
        `;
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        if (!this.hasAttribute("theme")) this.handleTheme();
    }

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
            console.debug(`[ui][ui-theme-handler] Disable auto mode`);
            if (!this.media) return;
            this.media.removeEventListener("change", this.mediaHandler);
            this.media = null;
            return;
        }

        this.mode = null;
        console.debug(`[ui][ui-theme-handler] Enable auto mode`);

        if (!!this.media) {
            this.mediaHandler(this.media);
            return;
        }

        this.media = window.matchMedia("(prefers-color-scheme: dark)");
        this.media.addEventListener("change", this.mediaHandler);
        this.mediaHandler(this.media);
    }

    private handleMode(): void {
        console.debug(`[ui][ui-theme-handler] Set mode ${this.mode}`);

        if (!this.mode) {
            this.target.removeAttribute("data-theme");
        } else {
            this.target.setAttribute("data-theme", this.mode);
        }
    }

    private handleTheme(): void {
        const target: HTMLElement = document.head;

        console.debug(
            `[ui][ui-theme-handler] Load theme from "${this.themesPath}/${this.theme}"`,
        );

        target.querySelectorAll(`link.theme`).forEach((child) => {
            target.removeChild(child);
        });

        const link = document.createElement("link");
        {
            link.classList.add("theme");
            link.rel = "stylesheet";
            link.href = `${this.themesPath}/${this.theme}.css`;
        }
        target.appendChild(link);
    }
}

export default UIThemeHandler;
