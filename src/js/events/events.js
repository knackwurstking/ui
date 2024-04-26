
/**
 * @template Key=string
 * @template Data=any
 */
export default class Events {
    /**
     * @type {any}
     */
    #listeners = {};

    /**
     * @param {Key} key
     * @param {Data} data
     */
    dispatchWithData(key, data) {
        if (data === undefined) throw `data is undefined!`;

        if (!!this.#listeners[key]) {
            for (const listener of this.#listeners[key]) {
                listener(data);
            }
        }

        return this;
    }

    /**
     * @param {Key} key
     * @param {((data: Data) => void|Promise<void>) | null} listener
     * @returns {() => void} clean up function
     */
    addListener(key, listener) {
        if (typeof listener !== "function")
            throw `invalid event listener passed for "${key}" event!`;

        if (!this.#listeners[key]) {
            this.#listeners[key] = [];
        }

        this.#listeners[key].push(listener);

        return () => {
            this.removeListener(key, listener);
        };
    }

    /**
     * @param {Key} key
     * @param {((data: Data) => void|Promise<void>)} listener
     */
    removeListener(key, listener) {
        if (!this.#listeners[key])
            throw `no listeners found for ${key}, there is nothing to delete`;

        let match = false;
        let index = 0;
        for (const l of this.#listeners[key]) {
            if (l === listener) {
                this.#listeners[key].splice(index, 1);
                match = true;
            }
            index++;
        }

        if (!match)
            throw `listener not found for ${key}, there is nothing to delete`;

        return this;
    }
}
