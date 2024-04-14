import * as ripple from "../../ripple";
import * as base from "../base";
import Primary from "./primary";
import Secondary from "./secondary";

/**
 * @typedef LabelOptions
 * @type {{
 *  input?: base.Base;
 *  primary?: string;
 *  secondary?: string;
 *  ripple?: import("../../ripple").RippleOptions | boolean | null;
 * }}
 */

export default class Label extends base.Base {
  #primary;
  #secondary;
  #input;

  /** @type {ripple.RippleOptions} */
  #ripple;

  /**
   * @param {import("../base").BaseOptions & LabelOptions} options
   */
  constructor(options = null) {
    options = { ...base.defaultOptions, ...(options || {}) };
    super("label", options);

    this.element.classList.add("ui-text-label");

    this.#primary = null;
    this.#secondary = null;
    if (options.primary) {
      this.#primary = new Primary({ text: options.primary });
      this.element.appendChild(this.#primary.element);
    }
    if (options.secondary) {
      this.#secondary = new Secondary({ text: options.primary });
      this.element.appendChild(this.#secondary.element);
    }

    this.#input = null;
    if (options.input) {
      this.#input = options.input;
      this.element.appendChild(this.#input.element);
    }

    this.#ripple = !options.ripple
      ? options.ripple === undefined
        ? {} // Using default settings (if undefined)
        : null
      : options.ripple === true
        ? {} // Using default settings (if true)
        : options.ripple;
    ripple.create(this.element, this.#ripple);
  }

  getPrimary() {
    return this.#primary;
  }

  getSecondary() {
    return this.#secondary;
  }

  getInput() {
    return this.#input;
  }
}
