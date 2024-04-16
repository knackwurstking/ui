import * as base from "../base";
import innerHTML from "./select-html.js";

/**
 * @typedef SelectItem
 * @type {{
 *  value: string,
 *  label: string,
 *  selected?: boolean
 * }}
 *
 * @typedef SelectOptions
 * @type {{
 *  items?: SelectItem[];
 *  onchange?: ((item: SelectItem) => void|Promise<void>) | null
 * }}
 */

export default class Select extends base.Base {
    /** @type {SelectItem[]} */
    #items;

    /**
     * @param {import("../base").BaseOptions & SelectOptions} options
     */
    constructor(options = null) {
        // TODO: add always open option
        options = { ...base.defaultOptions, ...(options || {}) };
        super("div", options);

        this.element.classList.add("ui-input");
        this.element.classList.add("ui-input-select");
        this.innerHTML = innerHTML;

        // Need to always set/update the items length (--items-length)
        this.setItems(options.items || []);
        this.onchange = options.onchange || null;
    }

    getItems() {
        return [...this.#items];
    }

    /**
     * @param {SelectItem[]} items
     */
    setItems(items) {
        this.#items = items;
        this.#renderItems();
        return this.#setProps();
    }

    async #renderItems() {
        // Append items to ".ui-input-select-options" (always passing the class ".ui-input-select-option" to all items)
        const container = this.element.querySelector(
            ".ui-input-select-options",
        );

        while (container.children.length > 1)
            container.removeChild(container.lastChild);

        this.#items.forEach((item) => {
            const el = document.createElement("div");
            el.className = "ui-input-select-option no-user-select";
            if (!!item.selected) el.classList.add("selected");
            else el.classList.remove("selected");
            el.innerHTML = `<span>${item.label}</span>`;

            container.appendChild(el);

            el.onclick = ({ currentTarget }) => {
                this.#items.forEach((_item) => {
                    if (_item.value === item.value) {
                        _item.selected = true;
                        if (!!this.onchange) this.onchange(_item);
                    } else {
                        _item.selected = false;
                    }
                });

                // @ts-ignore
                [...currentTarget.parentElement.children].forEach((child) => {
                    child.classList.remove("selected");
                });
                // @ts-ignore
                currentTarget.classList.add("selected");
            };
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
