/**
 * @typedef Modes
 * @type {"system" | "dark" | "light"}
 */

export class ThemeHandler {
  constructor() {
    /** @type {{ name: string; href: string } | null} */
    this.currentTheme = null;

    /** @type {{ [key: string]: string }[]} */
    this.themes = {};

    /** @type {MediaQueryList | null} */
    this._media = null;
    this._mediaChangeHandler = (ev) => {
      if (document.body.getAttribute("data-theme") === "system") {
        console.warn(
          `data-theme is set to "system", need to manually remove this for auto handling`,
        );
        return;
      }

      if (ev.matches) {
        document.body.setAttribute("data-theme", "dark");
      } else {
        document.body.setAttribute("data-theme", "light");
      }
    };
  }

  addTheme(name, href) {
    this.themes[name] = href;

    return this;
  }

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

    return this;
  }

  /**
   * @param {Modes} mode
   * @param {HTMLElement} element
   */
  setMode(mode, element = document.body) {
    switch (mode) {
      case "system":
        element.setAttribute("data-theme", mode);
        break;
      case "dark":
        element.setAttribute("data-theme", mode);
        break;
      case "light":
        element.setAttribute("data-theme", mode);
        break;
    }
  }

  start() {
    if (!!this._media) {
      this.stop();
    }

    this._media = window.matchMedia("(prefers-color-scheme: dark)");
    this._mediaChangeHandler(this._media);
    this._media.addEventListener("change", this._mediaChangeHandler);

    return this;
  }

  stop() {
    if (!!this._media && !!this._mediaChangeHandler) {
      this._media.removeEventListener("change", this._mediaChangeHandler);
      this._media = null;
    }

    return this;
  }
}
