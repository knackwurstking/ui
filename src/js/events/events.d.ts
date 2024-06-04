/**
 * @typedef {import(".")._Events} _Events
 */
/**
 * @template {_Events} T
 */
export default class Events<T extends import(".")._Events> {
    /**
     * @template {keyof T} K
     * @param {K} key
     * @param {((data: T[K]) => void|Promise<void>) | null} listener
     * @returns {() => void} clean up function
     */
    on<K extends keyof T>(key: K, listener: (data: T[K]) => void | Promise<void>): () => void;
    /**
     * @template {keyof T} K
     * @param {K} key
     * @param {((data: T[K]) => void|Promise<void>)} listener
     */
    off<K_1 extends keyof T>(key: K_1, listener: (data: T[K_1]) => void | Promise<void>): this;
    /**
     * @template {keyof T} K
     * @param {K} key
     * @param {T[K]} data
     */
    dispatch<K_2 extends keyof T>(key: K_2, data: T[K_2]): this;
    #private;
}
export type _Events = import(".")._Events;
