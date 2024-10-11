import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Events } from "../utils";
import { CleanUpFunction } from "../global";

@customElement("ui-store")
export class UIStore<T extends { [key: string]: any }> extends LitElement {
    private data: { [key: string]: any } = {};
    public events: Events<T> = new Events();

    @property({ type: Boolean, attribute: "storage" })
    storage: boolean = false;

    @property({ type: String, attribute: "storage-prefix" })
    storagePrefix: string = "";

    public getData<K extends keyof T>(key: K): T[K] | undefined {
        if (this.storage) {
            const item = localStorage.getItem(
                `${this.storagePrefix}${key as string}`,
            );
            if (item !== null) return JSON.parse(item);
        }

        if (!this.data.hasOwnProperty(key)) {
            return undefined;
        }

        return this.data[key as string];
    }

    public setData<K extends keyof T>(
        key: K,
        data: T[K],
        /**
         * Use the given "data" as fallback data. The (`<ui-store storage>`)
         * "storage" flag needs to be set for this.
         */
        useDataAsFallback: boolean = false,
    ): void {
        if (useDataAsFallback && this.storage) {
            const storageItem = localStorage.getItem(
                `${this.storagePrefix}${key as string}`,
            );
            if (storageItem !== null) {
                this.data[key as string] = JSON.parse(storageItem);
            } else if (!this.data.hasOwnProperty(key))
                this.data[key as string] = data;
        } else {
            this.data[key as string] = data;
        }

        if (this.storage) {
            localStorage.setItem(
                `${this.storagePrefix}${key as string}`,
                JSON.stringify(this.data[key as string]),
            );
        }

        this.events.dispatch(key, this.data[key as string]);
    }

    public updateData<K extends keyof T>(
        key: K,
        callback: (data: T[K]) => T[K],
    ): void {
        const data = this.getData(key);
        if (data === undefined) {
            throw new Error(`"${key as string}" not found, use \`setData\``);
        }

        this.setData(key, callback(data));
    }

    /**
     * This function is just a wrapper for `this.events.addListener(key, data)`,
     * but with an option to trigger the callback once.
     */
    public addListener<K extends keyof T>(
        key: K,
        callback: (data: T[K]) => void | Promise<void>,
        trigger: boolean = false,
    ): CleanUpFunction {
        if (trigger) {
            const data = this.getData(key);
            if (data !== undefined) {
                setTimeout(() => callback(data));
            }
        }

        return this.events.addListener(key, callback);
    }
}
