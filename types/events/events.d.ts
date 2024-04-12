export default class Events {
    /** @type {{[key: string]: ((data: any) => void|Promise<void>)[]}} */
    listeners: {
        [key: string]: ((data: any) => void | Promise<void>)[];
    };
    /**
     * @param {string} key
     * @param {any} data
     */
    dispatchWithData(key: string, data: any): this;
    /**
     * @param {string} key
     * @param {((data: any) => void|Promise<void>) | null} listener
     * @returns {() => void} clean up function
     */
    addListener(key: string, listener: ((data: any) => void | Promise<void>) | null): () => void;
    /**
     * @param {string} key
     * @param {((data: any) => void|Promise<void>)} listener
     */
    removeListener(key: string, listener: ((data: any) => void | Promise<void>)): this;
}
