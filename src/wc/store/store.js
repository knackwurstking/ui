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
            const sData = JSON.parse(localStorage.getItem(this.localStoragePrefix + key) || "null");
            this.#store.stores[key] = (sData === null || sData === undefined) ? data : sData
        } else {
            this.#store.stores[key] = data;
        }

        if (this.enableLocalStorage) {
            localStorage.setItem(this.localStoragePrefix + key, JSON.stringify(this.#store.stores[key]));
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

    static register = () => customElements.define("ui-store", Store);
    static observedAttributes = ["local-storage-prefix", "enable-local-storage"];

    constructor() {
        super();

        this.data = new Data(this);

        /** @type {{ [key: string]: any }} */
        this.stores = {};
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "local-storage-prefix":
                this.data.localStoragePrefix = newValue !== null ? newValue : "";
                break
            case "enable-local-storage":
                this.data.enableLocalStorage = newValue !== null
                break
        }
    }
}
