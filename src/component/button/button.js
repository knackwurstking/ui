import { Base } from "../base"

export default class Button extends Base {
  /**
   * @param {Object} option
   * @param {"full" | "outline" | "ghost"} option.variant
   * @param {"primary" | "secondary" | "destructive"} option.color
   * @param {ElementCreationOptions | null | undefined} option.elementCreationOptions
   * @param {string} option.className
   * @param {{ [key: string]: string }} option.attributes
   */
  constructor({ variant = "full", color = "primary", elementCreationOptions = null, className = "", attributes = {} }) {
    super("button", elementCreationOptions)

    this.element.className = className || ""
    this.element.classList.add("ui-button")
    this.element.classList.add(variant)
    this.element.classList.add(color)

    for (const [k, v] of Object.entries(attributes)) {
      this.element.setAttribute(k, v)
    }
  }

  /** @returns {HTMLButtonElement} */
  get element() {
    // @ts-ignore
    return super.element
  }
}
