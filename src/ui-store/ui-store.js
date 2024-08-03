import { Events } from "../js";

/**
 * @typedef {import("../js/events/events")._Events} UIStoreEvents
 */

/**
 * @template {UIStoreEvents} T
 * @extends {HTMLElement}
 */
export class UIStore extends HTMLElement {
  static register = () => {
    if (!customElements.get("ui-store")) {
      customElements.define("ui-store", UIStore);
    }
  };

  constructor() {
    super();

    /**
     * @type {any}
     */
    this.stores = {};

    this.ui = {
      root: this,

      /**
       * @type {Events<T>}
       */
      events: new Events(),

      get storage() {
        return this.root.hasAttribute("storage");
      },

      set storage(value) {
        if (!value) {
          this.root.removeAttribute("storage");
          return;
        }

        this.root.setAttribute("storage", "");
      },

      get storageprefix() {
        return this.root.getAttribute("storageprefix");
      },

      set storageprefix(value) {
        if (!value) {
          this.root.removeAttribute("storageprefix");
          return;
        }

        this.root.setAttribute("storageprefix", value);
      },

      /**
       * @template {keyof T} K
       * @param {K} key
       * @returns {T[K]}
       */
      get(key) {
        return this.root.stores[key];
      },

      /**
       * @template {keyof T} K
       * @param {K} key
       * @param {T[K]} data
       * @param {boolean} [useDataAsFallback] Use data as fallback, if nothing found in the browsers `localStorage`
       * `this.enableLocalStorage` flag needs to be set to `true` for this to work
       */
      set(key, data, useDataAsFallback = false) {
        if (useDataAsFallback && this.storageprefix) {
          const sData = JSON.parse(
            localStorage.getItem((this.storageprefix || "") + key.toString()) ||
              "null",
          );
          this.root.stores[key] =
            sData === null || sData === undefined ? data : sData;
        } else {
          this.root.stores[key] = data;
        }

        if (this.storage) {
          localStorage.setItem(
            (this.storageprefix || "") + key.toString(),
            JSON.stringify(this.root.stores[key]),
          );
        }

        this.events.dispatch(key, this.root.stores[key]);
      },

      /**
       * @template {keyof T} K
       * @param {K} key
       * @param {(data: T[K]) => any} callback
       */
      update(key, callback) {
        if (typeof callback !== "function") {
          throw `callback is not a function`;
        }

        this.set(key, callback(this.root.stores[key]));
      },

      /**
       * @template {keyof T} K
       * @param {K} key
       * @param {(data: T[K]) => void|Promise<void>} callback
       * @param {boolean} [trigger] - this will run the callback first
       * @returns {() => void} clean up function
       */
      on(key, callback, trigger = false) {
        if (typeof callback !== "function") {
          throw `callback is not a function`;
        }

        if (trigger) {
          callback(this.get(key));
        }

        return this.events.on(key, callback);
      },
    };

    this.shadowRender();
  }

  shadowRender() {}
  connectedCallback() {}
  disconnectedCallback() {}
}
