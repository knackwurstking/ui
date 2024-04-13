import * as ripple from "../../ripple";
import * as base from "../base";

/**
 * @typedef ButtonOptions
 * @type {{
 *  text?: string;
 *  html?: string;
 *  variant?: "full" | "outline" | "ghost";
 *  color?: "primary" | "secondary" | "destructive";
 *  ripple?: import("../../ripple").RippleOptions | false | null;
 * }}
 */

export default class Button extends base.Base {
  /** @type {ripple.RippleOptions} */
  #ripple;

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

    this.#ripple = !options.ripple
      ? options.ripple === undefined
        ? {}
        : null
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
