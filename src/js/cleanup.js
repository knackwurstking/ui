export class CleanUp {
    constructor() {
        /**
         * @type {((() => void|Promise<void>) | null)[]}
         */
        this.callbacks = [];
    }

    /**
     * @param {(() => void|Promise<void>)[]} cb
     */
    add(...cb) {
        this.callbacks.push(...cb);
    }

    run() {
        for (let i = 0; i < this.callbacks.length; i++) {
            if (this.callbacks[i] !== null) {
                try {
                    this.callbacks[i]();
                    this.callbacks[i] = null;
                } catch (err) {
                    console.error("cleanup error:", err);
                }
            }
        }

        this.callbacks = this.callbacks.filter((cb) => cb !== null);
    }
}
