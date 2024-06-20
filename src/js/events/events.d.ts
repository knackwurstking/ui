/**
 * @typedef {import(".")._Events} _Events
 */
/**
 * @template {_Events} T
 */
export default class Events<T extends _Events> {
    /**
     * @template {keyof T} K
     * @param {K} key
     * @param {((data: T[K]) => void|Promise<void>) | null} listener
     * @returns {() => void} clean up function
     */
    on<K extends keyof T>(key: K, listener: ((data: T[K]) => void | Promise<void>) | null): () => void;
    /**
     * @template {keyof T} K
     * @param {K} key
     * @param {((data: T[K]) => void|Promise<void>)} listener
     */
    off<K extends keyof T>(key: K, listener: ((data: T[K]) => void | Promise<void>)): this;
    /**
     * @template {keyof T} K
     * @param {K} key
     * @param {T[K]} data
     */
    dispatch<K extends keyof T>(key: K, data: T[K]): this;
    #private;
}
export type _Events = import(".")._Events;
