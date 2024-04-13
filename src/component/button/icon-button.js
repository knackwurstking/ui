import * as base from "../base";

/**
 * @typedef IconButtonOptions
 * @type {{
 *  icon?: string;
 *  ghost?: boolean;
 *  color?: "primary" | "secondary" | "destructive";
 * }}
 */

// TODO: Add ripple
export default class IconButton extends base.Base {
  /**
   * @param {import("../base").BaseOptions & IconButtonOptions} options
   */
  constructor(options = {}) {
    options = { ...base.defaultOptions, ...(options || {}) };
    super("button", options);

    this.element.classList.add("ui-icon-button");
    this.element.classList.add(options.color || "primary");
    if (!!options.ghost) this.element.classList.add("ghost");

    if (!!options.icon) this.element.innerHTML = options.icon;
  }

  /** @returns {HTMLButtonElement} */
  get element() {
    // @ts-ignore
    return super.element;
  }
}
