import * as base from "../base";

/**
 * @typedef LabelOptions
 * @type {{
 *  input?: Element;
 *  primary?: string;
 *  secondary?: string;
 * }}
 */

export default class Label extends base.Base {
  /**
   * @param {import("../base").BaseOptions & LabelOptions} options
   */
  constructor(options = null) {
    options = { ...base.defaultOptions, ...(options || {}) };
    super("label", options);

    this.element.classList.add("ui-text-label");

    if (options.primary) {
      // ...
    }
    if (options.secondary) {
      // ...
    }

    if (options.input) {
      // ...
    }
  }
}
