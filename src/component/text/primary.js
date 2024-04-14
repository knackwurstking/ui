import * as base from "../base";

/**
 * @typedef PrimaryOptions
 * @type {{
 *  text?: string;
 *  html?: string;
 * }}
 */

export default class Primary extends base.Base {
  /**
   * @param {import("../base").BaseOptions & PrimaryOptions} options
   */
  constructor(options = null) {
    options = { ...base.defaultOptions, ...(options || {}) };
    super("label", options);

    this.element.classList.add("ui-text-primary");

    if (options.text) this.element.innerText = options.text;
    if (options.html) this.element.innerHTML = options.html;
  }
}
