/**
 * @template {{ [key: string]: any }} T
 * @extends {HTMLElement}
 */
export class UIStore<T extends {
    [key: string]: any;
}> extends HTMLElement {
    static register: () => void;
    constructor();
    /**
     * @type {any}
     */
    stores: any;
    ui: {
        root: this;
        /**
         * @type {Events<T>}
         */
        events: Events<T>;
        storage: boolean;
        storageprefix: string;
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
    shadowRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
import { Events } from "../utils";
