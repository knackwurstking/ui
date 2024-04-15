export default class Events {
    /** @type {{[key: string]: ((data: any) => void|Promise<void>)[]}} */
    listeners;

    constructor() {
        this.listeners = {};
    }

    /**
     * @param {string} key
     * @param {any} data
     */
    dispatchWithData(key, data) {
        if (!!this.listeners[key]) {
            for (const listener of this.listeners[key]) {
                listener(data);
            }
        }

        return this;
    }

    /**
     * @param {string} key
     * @param {((data: any) => void|Promise<void>) | null} listener
     * @returns {() => void} clean up function
     */
    addListener(key, listener) {
        if (typeof listener !== "function")
            throw `invalid event listener passed for "${key}" event!`;

        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }

        this.listeners[key].push(listener);

        return () => {
            this.removeListener(key, listener);
        };
    }

    /**
     * @param {string} key
     * @param {((data: any) => void|Promise<void>)} listener
     */
    removeListener(key, listener) {
        if (!this.listeners[key]) return this;

        let index = 0;
        for (const l of this.listeners[key]) {
            if (l === listener) {
                this.listeners[key].splice(index, 1);
            }
            index++;
        }

        return this;
    }
}
