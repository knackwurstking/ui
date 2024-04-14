/**
 * @typedef BaseOptions
 * @type {{
 *  id?: string;
 *  className?: string;
 *  style?: { [key: string]: string };
 *  elementCreationOptions?: ElementCreationOptions | null | undefined;
 *  attributes?: { [key: string]: string };
 * }}
 */

/**
 *@type {BaseOptions}
 */
export const defaultOptions = {
  id: "",
  className: "",
  style: {},
  elementCreationOptions: null,
  attributes: {},
};

export default class Base {
  /** @type {HTMLElement} */
  #root;

  /**
   * @param {any} tagName
   * @param {BaseOptions | null} options
   */
  constructor(tagName, options = null) {
    options = { ...defaultOptions, ...(options || {}) };
    this.#root = document.createElement(
      tagName,
      options.elementCreationOptions,
    );

    this.#root.className = options.className;
    this.#root.id = options.id;

    Object.entries(options.style).forEach(
      ([k, v]) => (this.element.style[k] = v),
    );
    Object.entries(options.attributes).forEach(([k, v]) =>
      this.element.setAttribute(k, v),
    );
  }

  get element() {
    return this.#root;
  }

  get innerHTML() {
    return this.#root.innerHTML;
  }

  set innerHTML(value) {
    this.#root.innerHTML = value;
  }

  get innerText() {
    return this.#root.innerText;
  }

  set innerText(value) {
    this.#root.innerText = value;
  }
}
