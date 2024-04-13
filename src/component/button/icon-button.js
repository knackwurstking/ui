import * as ripple from "../../ripple";
import * as base from "../base";

/**
 * @typedef IconButtonOptions
 * @type {{
 *  icon?: string;
 *  ghost?: boolean;
 *  color?: "primary" | "secondary" | "destructive";
 *  ripple?: import("../../ripple").RippleOptions | boolean | null;
 * }}
 */

export default class IconButton extends base.Base {
  /** @type {ripple.RippleOptions} */
  #ripple;

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

    this.#ripple = !options.ripple
      ? options.ripple === undefined
        ? { centered: true } // Using default settings (if undefined)
        : null
      : options.ripple === true
        ? { centered: true } /// Using default settings (if true)
        : options.ripple;
    ripple.create(this.element, this.#ripple);
  }

  get ripple() {
    return this.#ripple;
  }

  /**
   * @param {ripple.RippleOptions | false | null} ripple
   */
  set ripple(ripple) {
    this.#ripple = !ripple ? null : ripple;
  }

  /** @returns {HTMLButtonElement} */
  get element() {
    // @ts-ignore
    return super.element;
  }
}
