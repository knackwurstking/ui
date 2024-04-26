/**
 * @template Key=string
 * @template Data=any
 */
export default class Events<Key, Data> {
    /**
     * @param {Key} key
     * @param {Data} data
     */
    dispatchWithData(key: Key, data: Data): this;
    /**
     * @param {Key} key
     * @param {((data: Data) => void|Promise<void>) | null} listener
     * @returns {() => void} clean up function
     */
    addListener(key: Key, listener: ((data: Data) => void | Promise<void>) | null): () => void;
    /**
     * @param {Key} key
     * @param {((data: Data) => void|Promise<void>)} listener
     */
    removeListener(key: Key, listener: ((data: Data) => void | Promise<void>)): this;
    #private;
}
