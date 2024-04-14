import * as base from "../base";

/**
 * @typedef SecondaryOptions
 * @type {{
 *  text?: string;
 *  html?: string;
 * }}
 */

export default class Secondary extends base.Base {
  /**
   * @param {import("../base").BaseOptions & SecondaryOptions} options
   */
  constructor(options = null) {
    options = { ...base.defaultOptions, ...(options || {}) };
    super("label", options);

    this.element.classList.add("ui-text-secondary");

    if (options.text) this.element.innerText = options.text;
    if (options.html) this.element.innerHTML = options.html;
  }
}
