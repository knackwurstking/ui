import { Events } from "../../js/events";

export class Store extends HTMLElement {
    #events;

    constructor() {
        super();

        this.#events = new Events();
        /** @type {{ [key: string]: any }} */
        this.stores = {};
        this.localStoragePrefix = "";
        this.enableLocalStorage = false;
    }

    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    connectedCallback() {
        if (this.hasAttribute("enable-local-storage")) {
            this.enableLocalStorage = true;
        }

        if (this.hasAttribute("local-storage-prefix")) {
            this.localStoragePrefix = this.getAttribute("local-storage-prefix");
        }
    }

    /**
     * Runs when the element is removed from the DOM
     */
    disconnectedCallback() {}

    /**
     * @param {string} key
     */
    get(key) {
        return this.stores[key];
    }

    /**
     * @param {string} key
     * @param {any} data
     * @param {boolean} [useDataAsFallback]
     */
    set(key, data, useDataAsFallback = false) {
        if (useDataAsFallback) {
            // TODO: get data from the localStorage, always using json
            this.stores[key] =
                JSON.parse(
                    localStorage.getItem(this.localStoragePrefix + key) ||
                        "null",
                ) || data;
        } else {
            this.stores[key] = data;
        }

        if (this.enableLocalStorage) {
            localStorage.setItem(key, JSON.stringify(this.stores[key]));
        }

        this.#events.dispatchWithData(key, this.stores[key]);
    }

    /**
     * @param {string} key
     * @param {(data: any) => any} callback
     */
    update(key, callback) {
        if (typeof callback !== "function") {
            throw `callback is not a function`;
        }

        this.set(key, callback(this.stores[key]));
    }

    /**
     * @param {string} key
     * @param {(data: any) => void|Promise<void>} callback
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

        return this.#events.addListener(key, callback);
    }
}
