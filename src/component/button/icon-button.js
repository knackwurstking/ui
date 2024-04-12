import { Base } from "../base";

export default class IconButton extends Base {
  /**
   * @param {Object} option
   * @param {string} option.icon - will be added to the innerHTML
   * @param {"primary" | "secondary" | "destructive"} option.color
   * @param {boolean} option.ghost
   * @param {ElementCreationOptions | null | undefined} option.elementCreationOptions
   * @param {string} option.className
   * @param {{ [key: string]: string }} option.attributes
   */
  constructor({ icon = "", color = "primary", ghost = false, elementCreationOptions = null, className = "", attributes = {} }) {
    super("button", elementCreationOptions)

    this.element.className = className || ""
    this.element.classList.add("ui-icon-button")
    this.element.classList.add(color)
    if (ghost) this.element.classList.add("ghost")

    for (const [k, v] of Object.entries(attributes)) {
      this.element.setAttribute(k, v)
    }

    this.element.innerHTML = icon
  }

  /** @returns {HTMLButtonElement} */
  get element() {
    // @ts-ignore
    return super.element
  }
}
