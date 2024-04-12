export default class Base {
  /** @type {HTMLElement} */
  #root

  /**
  * @param {any} tagName
  * @param {ElementCreationOptions} options
  */
  constructor(tagName, options = null) {
    this.#root = document.createElement(tagName, options)
  }

  get element() {
    return this.#root
  }

  get innerHTML() {
    return this.#root.innerHTML
  }

  set innerHTML(value) {
    this.#root.innerHTML = value
  }

  get innerText() {
    return this.#root.innerText
  }

  set innerText(value) {
    this.#root.innerText = value
  }
}
