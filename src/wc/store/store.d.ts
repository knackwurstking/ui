/**
 * @template {_Events} T
 * @extends {HTMLElement}
 */
export class Store<T extends import("../../js/events/events")._Events> extends HTMLElement {
    static register: () => void;
    constructor();
    /** @type {UI<T>} */
    ui: UI<T>;
}
export type _Events = import("../../js/events/events")._Events;
/**
 *
 * @typedef {import("../../js/events/events")._Events} _Events
 */
/**
 * @template {_Events} T
 */
declare class UI<T extends import("../../js/events/events")._Events> {
    /**
     * @param {Store} root
     */
    constructor(root: Store<any>);
    /**
     * @type {events.Events<T>}
     */
    events: events.Events<T>;
    set localStoragePrefix(prefix: string);
    get localStoragePrefix(): string;
    set enableLocalStorage(state: boolean);
    get enableLocalStorage(): boolean;
    /**
     * @param {keyof T} key
     */
    get(key: keyof T): any;
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
    update<K_1 extends keyof T>(key: K_1, callback: (data: T[K_1]) => any): void;
    /**
     * @template {keyof T} K
     * @param {K} key
     * @param {(data: T[K]) => void|Promise<void>} callback
     * @param {boolean} [trigger] - this will run the callback first
     * @returns {() => void} clean up function
     */
    on<K_2 extends keyof T>(key: K_2, callback: (data: T[K_2]) => void | Promise<void>, trigger?: boolean): () => void;
    #private;
}
import { events } from "../../js";
export {};
