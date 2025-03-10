import { CleanUpFunction, Events } from "../events";

export interface StoreOptions {
    skipStore?: boolean;
}

export class Store<T extends { [key: string]: any }> {
    public prefix: string = "";

    private events: Events<T> = new Events();
    private data: { [key: string]: any } = {};

    constructor(prefix: string) {
        this.prefix = prefix;
    }

    public delete<K extends keyof T>(key: K, options?: StoreOptions | null) {
        if (!options?.skipStore) {
            localStorage.removeItem(`${this.prefix}${key as string}`);
        }

        delete this.data[key as string];
    }

    public get<K extends keyof T>(key: K, options?: StoreOptions | null): T[K] | undefined {
        if (!options?.skipStore) {
            const item = localStorage.getItem(`${this.prefix}${key as string}`);
            if (item !== null) return JSON.parse(item);
        }

        if (!this.data.hasOwnProperty(key)) {
            return undefined;
        }

        return this.data[key as string];
    }

    public set<K extends keyof T>(
        key: K,
        data: T[K],
        /**
         * Use the given "data" as fallback data. The (`<ui-store storage>`)
         * "storage" flag needs to be set for this.
         */
        fallback: boolean = false,
        options?: StoreOptions | null,
    ): void {
        if (fallback) {
            let item = null;
            if (!options?.skipStore) {
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

        if (!options?.skipStore) {
            localStorage.setItem(
                `${this.prefix}${key as string}`,
                JSON.stringify(this.data[key as string]),
            );
        }

        this.events.dispatch(key, this.data[key as string]);
    }

    public update<K extends keyof T>(
        key: K,
        callback: (data: T[K]) => T[K],
        options?: StoreOptions | null,
    ): void {
        const data = this.get(key, options);
        if (data === undefined) {
            throw new Error(`"${key as string}" not found, use \`set\``);
        }

        this.set(key, callback(data), false, options);
    }

    public listen<K extends keyof T>(
        key: K,
        callback: (data: T[K]) => void | Promise<void>,
        triggerOnce: boolean = false,
        options?: StoreOptions | null,
    ): CleanUpFunction {
        if (triggerOnce) {
            const data = this.get(key, options);
            if (data !== undefined) {
                setTimeout(() => callback(data));
            }
        }

        return this.events.addListener(key, callback);
    }
}
