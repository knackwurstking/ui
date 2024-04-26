/**
 * @typedef _Events
 * @type {{
 *  [key: string]: any;
 * }}
 */
/**
 * @template {_Events} T
 */
export default class Events<T extends _Events> {
    /**
     * @template {keyof T} K
     * @param {K} key
     * @param {T[K]} data
     */
    dispatchWithData<K extends keyof T>(key: K, data: T[K]): this;
    /**
     * @template {keyof T} K
     * @param {K} key
     * @param {((data: T[K]) => void|Promise<void>) | null} listener
     * @returns {() => void} clean up function
     */
    addListener<K_1 extends keyof T>(key: K_1, listener: (data: T[K_1]) => void | Promise<void>): () => void;
    /**
     * @template {keyof T} K
     * @param {K} key
     * @param {((data: T[K]) => void|Promise<void>)} listener
     */
    removeListener<K_2 extends keyof T>(key: K_2, listener: (data: T[K_2]) => void | Promise<void>): this;
    #private;
}
export type _Events = {
    [key: string]: any;
};
