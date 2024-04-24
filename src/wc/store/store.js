import { Events } from "../../js/events";

class Data {
    #events;
    #store;

    /** @param {Store} store */
    constructor(store) {
        this.#store = store;

        this.#events = new Events();

        this.localStoragePrefix = "";
        this.enableLocalStorage = false;
    }

    /**
     * @param {string} key
     */
    get(key) {
        return this.#store.stores[key];
    }

    /**
     * @param {string} key
     * @param {any} data
     * @param {boolean} [useDataAsFallback] Use data as fallback, if nothing found in the browsers `localStorage`
     * `this.enableLocalStorage` flag needs to be set to `true` for this to work
     */
    set(key, data, useDataAsFallback = false) {
        if (useDataAsFallback && this.enableLocalStorage) {
            // TODO: get data from the localStorage, always using json
            this.#store.stores[key] =
                JSON.parse(
                    localStorage.getItem(this.localStoragePrefix + key) ||
                    "null",
                ) || data;
        } else {
            this.#store.stores[key] = data;
        }

        if (this.enableLocalStorage) {
            localStorage.setItem(key, JSON.stringify(this.#store.stores[key]));
        }

        this.#events.dispatchWithData(key, this.#store.stores[key]);
    }

    /**
     * @param {string} key
     * @param {(data: any) => any} callback
     */
    update(key, callback) {
        if (typeof callback !== "function") {
            throw `callback is not a function`;
        }

        this.set(key, callback(this.#store.stores[key]));
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

export class Store extends HTMLElement {
    constructor() {
        super();

        this.data = new Data(this);

        /** @type {{ [key: string]: any }} */
        this.stores = {};
    }

    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    connectedCallback() {
        if (this.hasAttribute("enable-local-storage")) {
            this.data.enableLocalStorage = true;
        }

        if (this.hasAttribute("local-storage-prefix")) {
            this.data.localStoragePrefix = this.getAttribute(
                "local-storage-prefix",
            );
        }
    }
}
