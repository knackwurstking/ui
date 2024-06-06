/**
 * @template {UIStoreEvents} T
 * @extends {HTMLElement}
 */
export class UIStore<T extends import("../js/events")._Events> extends HTMLElement {
    static register: () => void;
    constructor();
    /** @type {UI<T>} */
    ui: UI<T>;
}
export type UIStoreEvents = import(".").UIStoreEvents;
/**
 *
 * @typedef {import(".").UIStoreEvents} UIStoreEvents
 */
/**
 * @template {UIStoreEvents} T
 */
declare class UI<T extends import("../js/events")._Events> {
    /**
     * @param {UIStore} root
     */
    constructor(root: UIStore<any>);
    /**
     * @type {Events<T>}
     */
    events: Events<T>;
    set localStoragePrefix(prefix: string);
    get localStoragePrefix(): string;
    set enableLocalStorage(state: boolean);
    get enableLocalStorage(): boolean;
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
    set<K_1 extends keyof T>(key: K_1, data: T[K_1], useDataAsFallback?: boolean): void;
    /**
     * @template {keyof T} K
     * @param {K} key
     * @param {(data: T[K]) => any} callback
     */
    update<K_2 extends keyof T>(key: K_2, callback: (data: T[K_2]) => any): void;
    /**
     * @template {keyof T} K
     * @param {K} key
     * @param {(data: T[K]) => void|Promise<void>} callback
     * @param {boolean} [trigger] - this will run the callback first
     * @returns {() => void} clean up function
     */
    on<K_3 extends keyof T>(key: K_3, callback: (data: T[K_3]) => void | Promise<void>, trigger?: boolean): () => void;
    #private;
}
import { Events } from "../js";
export {};