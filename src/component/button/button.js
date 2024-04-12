import * as base from "../base";

/**
 * @typedef ButtonOptions
 * @type {{
 *  text?: string;
 *  html?: string;
 *  variant?: "full" | "outline" | "ghost";
 *  color?: "primary" | "secondary" | "destructive";
 * }}
 */

// TODO: Add ripple
export default class Button extends base.Base {
  /**
   * @param {import("../base").BaseOptions & ButtonOptions} options
   */
  constructor(options = base.defaultOptions) {
    options = { ...base.defaultOptions, ...(options || {}) };
    super("button", options);

    this.element.classList.add("ui-button");
    this.element.classList.add(options.variant || "full");
    this.element.classList.add(options.color || "primary");

    if (!!options.text) this.element.innerHTML = options.text;
    if (!!options.html) this.element.innerHTML = options.html;
  }

  /** @returns {HTMLButtonElement} */
  get element() {
    // @ts-ignore
    return super.element;
  }
}
