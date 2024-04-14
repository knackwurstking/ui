import * as base from "../base";
import innerHTML from "./select-html.js";

/**
 * @typedef CheckboxOptions
 * @type {{
 *  items?: { value: string, label: string }[];
 * }}
 */

export default class Select extends base.Base {
  /** @type {{ value: string, label: string }[]} */
  #items;

  /**
   * @param {import("../base").BaseOptions & CheckboxOptions} options
   */
  constructor(options = null) {
    options = { ...base.defaultOptions, ...(options || {}) };
    super("div", options);

    this.element.classList.add("ui-input");
    this.element.classList.add("ui-input-select");
    // TODO: handle class "open" - just add open/close methods
    this.innerHTML = innerHTML;

    // NOTE: need to always set/update the items length (--items-length)
    this.setItems(options.items || []);
  }

  getItems() {
    return [...this.#items];
  }

  /**
   * @param {{ value: string, label: string }[]} items
   */
  setItems(items) {
    this.#items = items;
    this.#renderItems();
    return this.#setProps();
  }

  async #renderItems() {
    // Append itemss to ".ui-input-select-options" (always passing the class ".ui-input-select-option" to all items)
    this.#items.forEach((i) => {
      const el = document.createElement("div");

      el.className = "ui-input-select-option no-user-select";
      el.innerHTML = `<span>${i.label}</span>`;

      el.onclick = ({ currentTarget }) => {
        // @ts-ignore
        [...currentTarget.parentElement.children].forEach(
          (/** @type {Element} */ child, i) => {
            if (i === 0) return; // the first item is the icon (chevron down)
            child.classList.remove("selected");
          },
        );

        // @ts-ignore
        currentTarget.classList.add("slected");
      };

      this.element.querySelector(".ui-input-select-options").appendChild(el);
    });

    return this;
  }

  #setProps() {
    this.element.style.setProperty(
      "--items-length",
      (this.#items || []).length.toString(),
    );

    return this;
  }
}
