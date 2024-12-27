import { Events } from "../events";

export class Store<T extends { [key: string]: any }> {
    public prefix: string = "";
    public events: Events<T> = new Events();

    private data: { [key: string]: any } = {};

    constructor(prefix: string) {
        this.prefix = prefix;
    }

    public get<K extends keyof T>(key: K, skipStore: boolean = false): T[K] | undefined {
        if (!skipStore) {
            const item = localStorage.getItem(`${this.prefix}${key as string}`);
            if (item !== null) return JSON.parse(item);
        }

        if (!this.data.hasOwnProperty(key)) {
            return undefined;
        }

        return this.data[key as string];
    }

    // TODO: ...
    public set<K extends keyof T>(
        key: K,
        data: T[K],
        /**
         * Use the given "data" as fallback data. The (`<ui-store storage>`)
         * "storage" flag needs to be set for this.
         */
        fallback: boolean = false,
        skipStore: boolean = false,
    ): void {
        if (fallback) {
            let item = null;
            if (!skipStore) {
                item = localStorage.getItem(`${this.prefix}${key as string}`);
            } else {
                item = null;
            }

            if (item !== null) {
                this.data[key as string] = JSON.parse(item);
            } else if (!this.data.hasOwnProperty(key)) {
                this.data[key as string] = data;
            }
        } else {
            this.data[key as string] = data;
        }

        if (!skipStore) {
            localStorage.setItem(
                `${this.prefix}${key as string}`,
                JSON.stringify(this.data[key as string]),
            );
        }

        this.events.dispatch(key, this.data[key as string]);
    }

    // TODO: ...
    update() {}

    // TODO: ...
    listen() {}
}
