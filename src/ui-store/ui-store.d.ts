/**
 * @typedef {import("../js/events/events")._Events} UIStoreEvents
 */
/**
 * @template {UIStoreEvents} T
 * @extends {HTMLElement}
 */
export class UIStore<T extends UIStoreEvents> extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    constructor();
    ui: {
        /** @private */
        root: this;
        /**
         * @type {boolean}
         */
        useStorage: boolean;
        /**
         * @type {string | null}
         */
        storagePrefix: string | null;
        /**
         * @type {any}
         */
        stores: any;
        /**
         * @type {Events<T>}
         */
        events: Events<T>;
        /**
         * @template {keyof T} K
         * @param {K} key
         * @returns {T[K]}
         */
        get<K extends keyof T>(key: K): T[K];
        /**
         * @template {keyof T} K
         * @param {K} key
         * @param {T[K]} data
         * @param {boolean} [useDataAsFallback] Use data as fallback, if nothing found in the browsers `localStorage`
         * `this.enableLocalStorage` flag needs to be set to `true` for this to work
         */
        set<K extends keyof T>(key: K, data: T[K], useDataAsFallback?: boolean): void;
        /**
         * @template {keyof T} K
         * @param {K} key
         * @param {(data: T[K]) => any} callback
         */
        update<K extends keyof T>(key: K, callback: (data: T[K]) => any): void;
        /**
         * @template {keyof T} K
         * @param {K} key
         * @param {(data: T[K]) => void|Promise<void>} callback
         * @param {boolean} [trigger] - this will run the callback first
         * @returns {() => void} clean up function
         */
        on<K extends keyof T>(key: K, callback: (data: T[K]) => void | Promise<void>, trigger?: boolean): () => void;
    };
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
}
export type UIStoreEvents = import("../js/events/events")._Events;
import { Events } from "../js";
