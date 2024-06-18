import { Events } from "../js";

/**
 *
 * @typedef {import(".").UIStoreEvents} UIStoreEvents
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

        this.ui = {
            /** @private */
            root: this,

            /**
             * @type {any}
             */
            stores: {},

            /**
             * @type {Events<T>}
             */
            events: new Events(),

            getLocalStoragePrefix() {
                return this.root.getAttribute("local-storage-prefix");
            },

            /**
             * @param {string | null} prefix
             */
            setLocalStoragePrefix(prefix) {
                if (prefix === null) {
                    this.root.removeAttribute("local-storage-prefix");
                    return;
                }

                this.root.setAttribute("local-storage-prefix", prefix);
            },

            getEnableLocalStorage() {
                return this.root.hasAttribute("enable-local-storage");
            },

            /**
             * @param {boolean} state
             */
            setEnableLocalStorage(state) {
                if (!state) {
                    this.root.removeAttribute("enable-local-storage");
                    return;
                }

                this.root.setAttribute("enable-local-storage", "");
            },

            /**
             * @template {keyof T} K
             * @param {K} key
             * @returns {T[K]}
             */
            get(key) {
                return this.stores[key];
            },

            /**
             * @template {keyof T} K
             * @param {K} key
             * @param {T[K]} data
             * @param {boolean} [useDataAsFallback] Use data as fallback, if nothing found in the browsers `localStorage`
             * `this.enableLocalStorage` flag needs to be set to `true` for this to work
             */
            set(key, data, useDataAsFallback = false) {
                if (useDataAsFallback && this.enableLocalStorage) {
                    const sData = JSON.parse(
                        localStorage.getItem(
                            this.localStoragePrefix + key.toString(),
                        ) || "null",
                    );
                    this.stores[key] =
                        sData === null || sData === undefined ? data : sData;
                } else {
                    this.stores[key] = data;
                }

                if (this.enableLocalStorage) {
                    localStorage.setItem(
                        this.localStoragePrefix + key.toString(),
                        JSON.stringify(this.stores[key]),
                    );
                }

                this.events.dispatch(key, this.stores[key]);
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

                this.set(key, callback(this.stores[key]));
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
    }
}
